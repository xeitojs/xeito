import { AttributeChanges } from "../interfaces/attribute-changes";

/**
 * Property decorator
 * Allows the user to define a custom attribute in the component tag
 * The property value will be set to the received attribute value
 */
export function Prop() {

  return function _PropDecorator (target: any, key: string) {

    Object.defineProperty(target, key, {
      get() {
        return this.getProp(key);
      },
      set(value: any) {
        const oldValue = this.getProp(key)

        if (oldValue === value) return;

        // Set the new value in the props object
        this.setProp(key, value);
      }
    });

    // Update observed attributes
    const observedAttributes = target.constructor.observedAttributes || [];
    if (!observedAttributes.includes(key)) {
      observedAttributes.push(key);
      target.constructor.observedAttributes = observedAttributes;
    } else {
      console.warn(`Attribute '${key}' is already observed in component '<${target._XeitoInternals.selector}>'.`);
    }

  }

}
