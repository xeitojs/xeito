import { decorateStore } from "../functions/decorate-store";
import { StateMetadata } from "../interfaces/state-metadata";

/**
 * State decorator
 * 
 * Wraps the state property with a getter/setter
 * It also adds the property to the observed attributes of the component if the state is also a prop
 * This allows to listen to changes in the state and trigger updates in the component
 */
export function State(stateMetadata?: StateMetadata) {
  
  return function _StateDecorator(target: any, key: string) {

    /**
     * Define the property in the target object
     */
    Object.defineProperty(target, key, {
      get() {
        const value = stateMetadata?.prop ? this.getProp(key) : this.getState(key);
        return stateMetadata?.transform ? stateMetadata.transform(value) : value;
      },
      set(value: any) {
        // If the value is a Store (has a subscribe method), decorate it to listen to changes
        if (value?.subscribe instanceof Function) {
          decorateStore(this, key, value);
        } else {
          // If the value is not a Store, set it as a normal property
          stateMetadata?.prop ? this.setProp(key, value) : this.setState(key, value);
        }
      },
      enumerable: false,
      configurable: true
    });


    // If the state is also a prop, add it to the observed attributes of the component to listen to changes
    if (stateMetadata?.prop) {
      const observedAttributes = target.constructor.observedAttributes || [];
      if (!observedAttributes.includes(key)) {
        observedAttributes.push(key);
        target.constructor.observedAttributes = observedAttributes;
      } else {
        console.warn(`Attribute '${key}' is already observed in component '<${target._XeitoInternals.selector}>'.`);
      }
    }
  }
}
