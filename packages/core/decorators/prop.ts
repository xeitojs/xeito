import { AttributeChanges } from "../interfaces/attribute-changes";

/**
 * Property decorator
 * Allows the user to define a custom attribute in the component tag
 * The property value will be set to the received attribute value
 */
export function Prop() {

  return function _PropDecorator (target: any, key: string) {
    const name = key;

    Object.defineProperty(target, key, {
      get: function() {
        return this._props[name];
      },
      set: function(value) {
        const oldValue = this._props[name];

        if (oldValue === value) return;
        
        // Set the new value in the props object
        this.setProp(name, value);
      }
    });

    // Update observed attributes
    const observedAttributes = target.constructor.observedAttributes || [];
    if (!observedAttributes.includes(name)) {
      observedAttributes.push(name);
      target.constructor.observedAttributes = observedAttributes;
    } else {
      console.warn(`Attribute '${name}' is already observed in component '<${target._XeitoInternals.selector}>'.`);
    }

  }

}
