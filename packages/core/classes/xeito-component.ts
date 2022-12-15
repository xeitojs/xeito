import { AttributeChanges } from '../interfaces/attribute-changes';
import { ActionResult } from '../interfaces/action-result';
import { Hole, render, Renderable } from 'uhtml';

export class XeitoComponent extends HTMLElement {
  
  /**
  * Xeito internals object
  * Will be populated by the @Component decorator 
  * with the component's metadata
  */
  private _XeitoInternals: Record<string, any> = {};
  
  private _DOMRoot: HTMLElement | ShadowRoot;
  private _template: Node | Hole | Renderable;
  private _state: Record<string, any> = {};
  private _props: Record<string, any> = {};
  
  /**
  * Global properties object (will be populated by the parent component or the Xeito instance)
  */
  global: Record<string, any>;
  
  /**
  * Slot Content
  * Will be populated by the constructor
  * It will contain the slotted content of the component
  * eg: <xeito-component><div slot="header">Header</div></xeito-component>
  * slotContent.header will contain the div element
  * This can be accessed inside the render method
  * eg: html`<div>${this.slotContent.header}</div>`
  */
  slotContent: Record<string, any> = {};
  
  constructor() {
    super();
    
    // Set the default _XeitoInternals object as received from the decorator
    this._XeitoInternals = Object.assign({}, this.constructor.prototype._XeitoInternals);
    
    // Set the slotted content
    this.slotContent = this.getSlotContent();
    
    // Set the global property
    this.global = this._XeitoInternals.global;
    
    // Assign the children global
    this.assignChildrenGlobal();
    
    // Bind the methods to the class instance
    this.bindMethods();
    
    /** 
    * Set the root element to render the template in
    * If it's a shadow root, create a shadow root
    * If it's not a shadow root, use the element itself (default)
    */
    let DOMRoot: HTMLElement | ShadowRoot = this;
    if (this._XeitoInternals.shadow === true) {
      this.attachShadow({ mode: 'open' });
      DOMRoot = this.shadowRoot as ShadowRoot;
    }
    // Set the DOMRoot in the _XeitoInternals
    this._DOMRoot = DOMRoot;
    
    // Render the template for the first time
    this._template = render(this._DOMRoot, this.render() as Renderable);
    
    // Add the styles to the DOM
    if (this._XeitoInternals.styles) {
      const style = document.createElement('style');
      style.textContent = this._XeitoInternals.styles;
      this._DOMRoot.appendChild(style);
    }
    
    this.onWillCreate();
  }
  
  /**
  * Get the slotted content of the component
  * @returns { Record<string, any> } Slot content object
  */
  private getSlotContent() {
    const slotContent: Record<string, any> = {
      default: []
    };
    const children: any[] = Array.from(this.childNodes);
    
    if (children) {
      for(let child in children) {
        const childEl = children[child] as Element | Node;
        
        if (childEl.nodeType === Node.TEXT_NODE || childEl.nodeType === Node.COMMENT_NODE) {
          slotContent.default.push(childEl);
        } else {
          const slot = (childEl as Element).getAttribute('slot');
          if (slot) {
            if (!slotContent[slot]) slotContent[slot] = [];
            slotContent[slot].push(childEl);
          } else {
            if (!slotContent.default) slotContent.default = [];
            slotContent.default.push(childEl);
          }
        }
      }
    }
    
    return slotContent;
  }
  
  /**
  * Assign children global
  * Assigns the global property to the children of the component
  */
  private assignChildrenGlobal() {
    this._XeitoInternals.children?.forEach((child: typeof XeitoComponent) => {
      child.prototype._XeitoInternals.global = this.global;
    });
  }
  
  /**
  * Bind methods
  * Binds the methods of the component to the component itself
  * This is done to avoid having to wrap the methods in arrow functions
  * eg: onClick={this.onClick} instead of onClick={() => this.onClick()}
  * NOTE: Arrow functions are still required to pass data to the method or native events
  * eg: onClick={() => this.onClick(data)} or onClick={(e) => this.onClick(e)}
  */
  private bindMethods() {
    const methods = Object.getOwnPropertyNames(this.constructor.prototype);
    methods.forEach((method: string) => {
      if (method !== 'constructor' && method !== 'render' && typeof this[method] === 'function') {
        this[method] = this[method].bind(this);
      }
    });
  }

  /**
  * Request an update of the component
  */
  requestUpdate() {
    if (this._template) {
      // Use requestAnimationFrame to avoid multiple updates in the same frame
      window.requestAnimationFrame(() => {
        this._template = render(this._DOMRoot, this.render() as Renderable);
      });
    }
  }

  /**
   * Sets a state value and triggers an update if needed
   * @param key Key of the state to set
   * @param value Value to set
   * @param triggerUpdate Whether to trigger an update or not
   */
  setState(key: string, value: any, triggerUpdate: boolean = true) {
    // Check if the value is the same as the current one to avoid unnecessary updates
    if (this._state[key] === value) return;

    // Set the state
    this._state[key] = value;

    // Trigger an update if needed
    if (triggerUpdate) this.requestUpdate();
  }

  /**
   * Returns the value of a state key
   * @param key Key of the state to get
   * @returns Value of the state key
   */
  getState(key: string): any {
    return this._state[key];
  }

  /**
   * Sets a prop value and triggers an update if needed
   * @param key Key of the prop to set
   * @param value Value to set
   */
  setProp(key: string, value: any, triggerUpdate: boolean = true) {
    // Create a new changes object
    const changes: AttributeChanges = { name: key, oldValue: this._props[key], newValue: value };
    // Call the onChanges hook
    this.onChanges(changes);

    // Set the prop
    this._props[key] = value;

    // Trigger an update if needed
    if (triggerUpdate) this.requestUpdate();
  }

  /**
   * Returns the value of a prop key
   * @param key Key of the prop to get
   * @returns Value of the prop key
   */
  getProp(key: string): any {
    return this._props[key];
  }

  /**
  * Use method (Use an action inside the component)
  * The 'use' method is used to provide actions to the template
  * Actions have to be provided in the Component decorator options
  * eg: @Component({ actions: [Action1, Action2] })
  * @param selector 
  * @param args 
  * @returns 
  */
  use(selector: string, ...args: any[]): ActionResult | void {
    return (e: HTMLElement) => {
      // Check if the selector is a local action
      let action = this._XeitoInternals.actions.find((action: any) => action.selector === selector);
      if (!action) {
        // Check if the selector is a global action
        action = this.global.actions.find((action: any) => action.selector === selector);
      }
      
      if (action) {
        return new action(e.parentElement, ...args);
      } else {
        throw new Error(`Action '${selector}' not found in component '<${this._XeitoInternals.selector}>', did you forget to add it to the actions array or install the plugin?`);
      }
    }
  }
  
  /**
  * Native attributeChangedCallback
  * Calls the onChanges method and requests an update of the component
  * @param name 
  * @param oldValue 
  * @param newValue 
  */
  attributeChangedCallback(this: any, name: string, oldValue: string, newValue: string) {
    
    //const type = typeof this[name];
    //
    //switch(type) {
    //  case 'number':
    //  oldValue = Number(oldValue) as any;
    //  newValue = Number(newValue) as any;
    //  break;
    //  case 'boolean':
    //  oldValue = oldValue === 'true' ? true : false as any;
    //  newValue = newValue === 'true' ? true : false as any;
    //  break;
    //}
    
    // Set the prop
    this.setProp(name, newValue);
  }
  
  /**
  * Native connectedCallback
  * Calls the onMount method
  */
  connectedCallback() {
    this.onCreate();
  }
  
  /**
  * Native disconnectedCallback
  * Calls the onDestroy method
  */
  disconnectedCallback() {
    this.onDestroy();
  }
  
  /**
  * Render method desgin to be overriden by the user
  */
  render(): Hole | void {}
  
  onWillCreate() {}
  
  /**
  * On mount method desgined to be overriden by the user
  * Gets called when the component is mounted (connectedCallback)
  */
  onCreate() {}
  
  /**
  * On destroy method desgined to be overriden by the user
  * Gets called when the component is destroyed (disconnectedCallback)
  */
  onDestroy() {}
  
  /**
  * On changes method desgin to be overriden by the user
  * Gets called when an attribute changes (attributeChangedCallback)
  * @param { AttributeChanges } changes Attribute changes object
  */
  onChanges(changes: AttributeChanges) {}
  
  
}
