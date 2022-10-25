export function Prop() {

  return function (target: any, propertyKey: string) {
    // Create getter
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this['props']?.[propertyKey];
      },
      enumerable: true,
      configurable: true
    });

  }
  
}
