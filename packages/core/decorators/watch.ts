/**
 * Decorator for watching changes to reactive properties.
 * Must be applied to a method of a component class.
 * This decorator adds a setter to gain access to the instance.
 * Then it adds the method to the list of watchers for the given property.
 * The setter is removed after the first call and replaced with the original method.
 * @param propertyNames Names of properties to watch for changes. (must be decorated with @State)
 * 
 * Usage example:
 * @Watch('count', 'name')
 * watchCount(update: WatchUpdate) {
 *  // This method will be called when the value of the 'count' or 'name' property changes
 * }
 */
export function Watch(...propertyNames: string[]) {

  return function _WatchDecorator(target: any, key: string, descriptor: any) {
    
    Object.defineProperty(target, key, {
      set() {
        if (!this._watchers) this._watchers = new Map();

        propertyNames.forEach(propertyName => {
          if (!this._watchers.has(propertyName)) this._watchers.set(propertyName, []);
          this._watchers.get(propertyName).push(key);
        });

        Object.defineProperty(target, key, {
          value: descriptor.value,
        });
      }
    });

    target[key] = descriptor.value;
  }

}
