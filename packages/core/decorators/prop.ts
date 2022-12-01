/**
 * Property decorator
 * Allows the user to define a custom attribute in the component tag
 * The property value will be set to the received attribute value
 */
export function Prop() {

  return function _PropDecorator (target: any, key: string) {
    const name = key;
    const type = Reflect.getMetadata('design:type', target, key).name;

    Object.defineProperty(target, key, {
      get: function() {
        const attributeValue = this.getAttribute(name);
        switch(type) {
          case 'Number':
            return Number(attributeValue);
          case 'Boolean':
            return attributeValue === 'true' ? true : false;
          case 'Date':
            return new Date(attributeValue);
          default:
            return attributeValue;
        }
      },
      set: function(value) {
        return this.setAttribute(name, value);
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
