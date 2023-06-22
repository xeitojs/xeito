import { decorateStore } from "../functions/decorate-store";
import { StateMetadata } from "../interfaces/state-metadata";

/**
 * State decorator
 * Wraps the state property with a Proxy or a getter/setter
 * This way we can detect when the state changes and trigger a re-render
 */
export function State(stateMetadata?: StateMetadata) {
  
  return function _StateDecorator(target: any, key: string) {

    /**
     * Define the property in the target object
     */
    Object.defineProperty(target, key, {
      get() {
        return stateMetadata?.prop ? this.getProp(key) : this.getState(key);
      },
      set(value: any) {
        if (value?.subscribe instanceof Function) {
          decorateStore(this, key, value);
        } else {
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
