import { EventConfig } from "../interfaces/event-config";

/**
 * Event Emitter class
 * Used by the Event decorator to return a new Event Emitter when the property is accessed
 * The event emitter contains only a single method: emit
 * The emit method will dispatch a new CustomEvent with the given name and detail
 * The EventConfig is set by the decorator based on the user configuration or the reflected metadata
 */
export class Emitter {

  constructor(
    private clazz: any,
    private eventConfig: EventConfig
  ) {}

  emit(value: any) {
    // Create a new event with the given name and options
    const event = new CustomEvent(this.eventConfig.name as string, {
      detail: value,
      composed: this.eventConfig.composed,
      bubbles: this.eventConfig.bubbles ?? true,
      cancelable: this.eventConfig.cancelable
    });

    // Dispatch the event from the target element
    this.clazz.dispatchEvent(event);
  }
}
