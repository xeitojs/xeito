
export function decorateStore(clazz, key, store) {
  // Call the set store method of the class
  clazz.setStore(key, store);

  // Define the property in the target object
  // It doesn't have a setter to avoid overriding the store
  Object.defineProperty(clazz, key, {
    get() {
      return clazz.getStore(key);
    },
    enumerable: true,
    configurable: true
  });
}
