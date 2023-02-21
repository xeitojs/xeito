import { ComponentMetadata } from '../interfaces/component-metadata';
import { validateSelector, ValidateSelectorResult } from './../functions/validate-selector';

export function Component(componentMetadata: ComponentMetadata) {

  return function ComponentDecorator(constructor: any) {

    // Validate the selector
    if (!componentMetadata.selector) {
      throw new Error('Component selector is required');
    }

    const result: ValidateSelectorResult = validateSelector(componentMetadata.selector);
    if (!result.isValid) {
      throw new Error(`Component selector '${componentMetadata.selector}' is invalid: ${result.message}`);
    } else {
      if (result.message) {
        console.warn(`Component selector '${componentMetadata.selector}' is not recommended: ${result.message}`);
      }
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
      shadow: componentMetadata.shadow ?? false,
      DOMRoot: null,
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
