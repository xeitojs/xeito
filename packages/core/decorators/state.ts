import { digestUpdate } from "../functions/digest-update";

export function State() {
  return function (target: any, key: string) {
    let previousValue = target[key];

    Object.defineProperty(target, key, {
      get: function () {
        return previousValue;
      },
      set: function (value) {
        previousValue = value;
        digestUpdate(this);
      },
      enumerable: true,
      configurable: true,
    });
  }
}
