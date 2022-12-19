import { ComponentMetadata } from '../interfaces/component-metadata';

export function Component(componentMetadata: ComponentMetadata) {

  return function ComponentDecorator(constructor: any) {

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
      selector: componentMetadata.selector,
      actions: componentMetadata.actions || [],
      pipes: componentMetadata.pipes || [],
      imports: componentMetadata.imports || [],
      services: componentMetadata.services || [],
      shadow: componentMetadata.shadow || false,
      DOMRoot: null,
      styles: componentStyles,
      template: null,
      global: null
    }

    /**
     * Register the component in the customElements registry
     */
    if (!customElements.get(componentMetadata.selector)) {
      customElements.define(componentMetadata.selector, constructor);
    } else {
      console.warn(`Component '${componentMetadata.selector}' already registered`);
    }
    
    // Return the new ComponentClass
    return constructor;
  }

}
