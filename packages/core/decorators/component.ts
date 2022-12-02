import { render, Renderable } from '../index';
import { ComponentMetadata } from '../interfaces/component-metadata';
import { XeitoComponent } from './../classes/xeito-component';

export function Component(componentMetadata: ComponentMetadata) {

  return function ComponentDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {

    /**
     * Bind all methods to the class instance
     * This allows to use the methods in the template without the need to bind them or use arrow functions
     * NOTE: Arrow functions are still required to pass data to the method
     * eg: 
     *  @click=${this.method} method will receive the event as parameter
     *  @click=${(e: CustomEvent) => this.method(e, 'data')} method will receive the event and the data as parameters
     */
    let keys = Reflect.ownKeys(constructor.prototype);

    keys.forEach((key: string | symbol) => {
      // Skip constructor
      if (key === 'constructor') return;
      if (key === 'render') return;

      const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, key);
      
      // Only bind methods
      if (typeof descriptor?.value === 'function') {
        Object.defineProperty(constructor.prototype, key, bindMethod(constructor, key, descriptor));
      }

    });

    /**
     * Handle component-specific styles
     */
     let componentStyles;
     if (componentMetadata.styles) {
       componentStyles = componentMetadata.styles.join(' ');
     }

    /**
     * Add the default _XeitoInternals object to the class
     */
    constructor.prototype._XeitoInternals = {
      DOMRoot: null,
      selector: componentMetadata.selector,
      styles: componentStyles,
      template: null,
      actions: componentMetadata.actions || [],
      state: {},
      props: {}
    }

    // Extend the XeitoComponent class for the ComponentClass to inherit the methods
    interface ComponentClass extends XeitoComponent {}

    // Create a new ComponentClass that extends the original class
    class ComponentClass extends constructor {
      
      // Set the _XeitoInternals
      private _XeitoInternals = constructor.prototype._XeitoInternals;

      constructor(...args: any[]) {
        super(...args);

        if (!this.attachShadow) {
          throw new Error(`Invalid component, did you forget to extend XeitoElement in component '<${this._XeitoInternals.selector}>'?`);
        }

        /** 
         * Set the root element to render the template in
         * If it's a shadow root, create a shadow root
         * If it's not a shadow root, use the element itself
         */
        let DOMRoot: HTMLElement | ShadowRoot;
        if (componentMetadata.shadow !== false) {
          this.attachShadow({ mode: 'open' });
          DOMRoot = this.shadowRoot as ShadowRoot;
        } else {
          DOMRoot = this;
        }
        // Set the DOMRoot in the _XeitoInternals
        this._XeitoInternals.DOMRoot = DOMRoot;

        // Render the template for the first time
        this._XeitoInternals.template = render(this._XeitoInternals.DOMRoot, this.render() as Renderable);

        // Add the styles to the DOM
        if (this._XeitoInternals.styles) {
          const style = document.createElement('style');
          style.textContent = this._XeitoInternals.styles;
          this._XeitoInternals.DOMRoot.appendChild(style);
        }
      }

      requestUpdate() {
        if (this._XeitoInternals.template) {
          this._XeitoInternals.template = render(this._XeitoInternals.DOMRoot, this.render() as Renderable);
        }
      }

      /**
       * Override the 'use' method from the XeitoComponent class
       * The 'use' method is used to provide actions to the template
       * Actions have to be provided in the Component decorator options
       * eg: @Component({ actions: [Action1, Action2] })
       * @param selector 
       * @param args 
       * @returns 
       */
      use(selector: string, ...args: any[]) {
        return (e: HTMLElement) => {
          const action = this._XeitoInternals.actions.find((action: any) => action.selector === selector);
          if (action) {
            return new action(e.parentElement, ...args);
          } else {
            throw new Error(`Action '${selector}' not found in component '<${this._XeitoInternals.selector}>', did you forget to add it to the actions array?`);
          }
        }
      }
    }

    /**
     * Register the component in the customElements registry
     */
    if (!customElements.get(componentMetadata.selector)) {
      customElements.define(componentMetadata.selector, ComponentClass);
    } else {
      console.warn(`Component '${componentMetadata.selector}' already registered`);
    }
    
    // Return the new ComponentClass
    return ComponentClass;
  }

}

/**
 * Genreates a new descriptor for the property that will bind the method to the class instance
 * 
 * Based on auto-bind by andreypopp {@link https://github.com/andreypopp/autobind-decorator}
 * All credit goes to him
 * 
 * @param target The class that contains the property
 * @param key The name of the property
 * @param descriptor The property descriptor
 * @returns New property descriptor
 */
function bindMethod(target: any, key: string | symbol, descriptor: Record<any, any>): Record<any, any> {
	let _fn = descriptor.value;

	// In IE11 calling Object.defineProperty has a side-effect of evaluating the
	// getter for the property which is being replaced. This causes infinite
	// recursion and an "Out of stack space" error.
	let definingProperty = false;

	return {
		configurable: true,
		get() {
			// eslint-disable-next-line no-prototype-builtins
			if (definingProperty || this === target.prototype || this.hasOwnProperty(key) ||
        typeof _fn !== 'function') {
				return _fn;
			}

			const boundFn = _fn.bind(this);
			definingProperty = true;
			Object.defineProperty(this, key, {
				configurable: true,
				get() {
					return boundFn;
				},
				set(value) {
					_fn = value;
					delete this[key];
				}
			});
			definingProperty = false;
			return boundFn;
		},
		set(value: any) {
			_fn = value;
		}
	};
}
