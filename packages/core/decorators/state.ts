import { ComponentRegistry } from './../classes/component-registry';
import { digestUpdate } from "../functions/digest-update";

export function State() {
  return function (target: any, key: string) {
    
    Object.defineProperty(target, key, {
      get: function () {
        return this._state?.[key];
      },
      set: function (value) {
        const _state = this._state || {};
        this._state = { ..._state, [key]: value };
        digestUpdate(this);
      },
      enumerable: true,
      configurable: true,
    });
  }
}
