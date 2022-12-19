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
        this.setState(key, value);
      },
      enumerable: true,
      configurable: true
    });

  }
}
