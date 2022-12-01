export function State() {
  
  return function _StateDecorator(target: any, key: string) {
    
    Object.defineProperty(target, key, {
      get: function() {
        return this._XeitoInternals.state[key];
      },
      set: function(value) {
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
          this._XeitoInternals.state[key] = value;
          this.requestUpdate();
        }
      },
      enumerable: true,
      configurable: true
    });

  }
}
