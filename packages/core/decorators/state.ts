/**
 * State decorator
 * Wraps the state property with a Proxy or a getter/setter
 * This way we can detect when the state changes and trigger a re-render
 */
export function State() {
  
  return function _StateDecorator(target: any, key: string) {
    
    /**
     * Define the property in the target object
     */
    Object.defineProperty(target, key, {
      get() {
        return this.getState(key);
      },
      set(value: any) {
        // If the value is an object, we need to wrap it with a Proxy
        // This way we can detect when the object changes and trigger a re-render
        if (typeof value === 'object') {
          const handler = {
            set: (target: any, prop: string, value: any) => {
              target[prop] = value;
              this.requestUpdate();
              return true;
            },
            construct: (target: any, args: any) => {
              return new target(...args);
            },
            deleteProperty: (target: any, prop: string) => {
              delete target[prop];
              this.requestUpdate();
              return true;
            }
          }
          this.setState(key, new Proxy(value, handler));
        } else {
          // If the value is not an object, just set it and trigger a re-render
          this.setState(key, value);
        }
      },
      enumerable: true,
      configurable: true
    });

  }
}
