
export function Emit() {

  let emitterInstance: HiddenEmitter<any>;

  return function (target: any, key: string) {
    Object.defineProperty(target, key, {
      get: function () {
        return emitterInstance;
      },
      set: function (value) {
        const emitterListener = this['emitterListeners']?.[key];
        if (!emitterInstance) {
          emitterInstance = new HiddenEmitter(emitterListener);
        }
      },
      enumerable: true,
      configurable: true,
    });
  }

}

class HiddenEmitter<T> {

  private listener: (value: T) => void;

  constructor(listener: (value: T) => void) {
    this.listener = listener;
  }

  public emit(value: T) {
    this.listener(value);
  }

}
