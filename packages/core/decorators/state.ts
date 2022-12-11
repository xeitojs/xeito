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
      get: function() {
        // Return the state
        return this._XeitoInternals.state[key];
      },
      set: function(value) {

        // If the value is an object, wrap it with a Proxy
        if (typeof value === 'object') {
          const proxy = new Proxy(value, {
            deleteProperty: () => {
              delete target[key];
              this.requestUpdate();
              return true;
            },
            set: (target, key, value) => {
              target[key] = value;
              this.requestUpdate();
              return true;
            }
          })
          this._XeitoInternals.state[key] = proxy;
        } else {
          // If the value is not an object, just set it and trigger a re-render
          this._XeitoInternals.state[key] = value;
          this.requestUpdate();
        }
      },
      enumerable: true,
      configurable: true
    });

  }
}
