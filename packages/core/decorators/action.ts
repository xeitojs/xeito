import { ActionMetadata } from "../interfaces/action-metadata";

export function Action(actionMetadata: ActionMetadata) {

  if (!actionMetadata.selector) throw new Error('Action selector is required');

  return function _ActionDecorator<T extends {new(...args: any[]): {}}>(constructor: T) {

    (constructor as any).selector = actionMetadata.selector;
    return class ActionClass extends constructor {

      selector: string = actionMetadata.selector;

      update(element: any, ...args: any[]) {
        this['setup'](element, ...args);
      }

      clean() {
        this['cleanup'] && this['cleanup']();
      }

    }

  }
}
