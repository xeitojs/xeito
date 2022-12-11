import { Emitter } from "../classes/emitter";
import { EventConfig } from "../interfaces/event-config";

/**
 * Event Decorator
 * Used to decorate a property on a class to create a new Event Emitter
 * The Event Emitter is a class that contains a single method: emit
 * 
 * This decorator wraps the property with a getter/setter that returns a new Event Emitter
 * @param eventConfig 
 * @returns 
 */
export function Event(eventConfig?: EventConfig) {

  return function _EventDecorator(target: any, key: string) {

    const config = eventConfig ?? {};
    config.name = config.name ?? key;

    Object.defineProperty(target, key, {
      get: function() {
        return new Emitter(this, config);
      },
      set: function(value: any) {
        throw new Error(`Cannot set property '${key}' of '${target.constructor.name}' to '${value}' because it's an EventEmitter`);
      }
    });

  }
  
}
