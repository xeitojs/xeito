
export function Global() {

  return function _GlobalDecorator(target: any, key: string) {

    Object.defineProperty(target, key, {
      get: function() {
        if (!this.global) {
          console.warn(`
            Cannot get the value of the global property '${key}' from component <${this._XeitoInternals.selector}>.
            The global object is not attached to the component.
            Did you try to get the value of the global property from the constructor?
            If so, you should get the value from the onCreate() hook instead.
          `)
        }
        return this.global?.properties[key];
      },
      set: function(value) {
        console.warn(`Cannot set the value of the global property '${key}' from a component.`);
      }
    });

  }

}
