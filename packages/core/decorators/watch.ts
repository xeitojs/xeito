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

    const currentWatchers = target.constructor.prototype._pendingWatchers || new Map();
    const methodName = key;
    
    propertyNames.forEach(propertyName => {
      if (!currentWatchers.has(propertyName)) currentWatchers.set(propertyName, []);
      const watchers = currentWatchers.get(propertyName);
      watchers.push(methodName);
      currentWatchers.set(propertyName, watchers);
    });

    target.constructor.prototype._pendingWatchers = currentWatchers;
  }

}
