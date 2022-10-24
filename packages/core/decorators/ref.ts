import { RefRegistry } from "../classes/ref-registry";

export function Ref() {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, {
      get: function () {
        return RefRegistry.getRef(key);
      },
      enumerable: true,
      configurable: true,
    });
  }
}