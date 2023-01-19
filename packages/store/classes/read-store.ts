import { Subscription } from "../interfaces/subscription";
import { Updater } from "../interfaces/updater";
import { Store } from "./store";

/**
 * ReadStore is a store that can only be read from
 * The set method is not available
 * It relies on the updater function to update the value
 * @example
 * const store = new ReadStore(0, (set) => {
 *  const interval = setInterval(() => {
 *   set((value) => value + 1); // Increment the value
 *  }, 1000);
 *  return () => clearInterval(interval); // Return a function to clear the interval
 * });
 */
export class ReadStore<T> extends Store<T> {

  constructor(initialValue: T, updater?: Updater) {
    super();
    this._value = initialValue;
    this._updater = updater;
  }

  /**
   * Override the subscribe method
   * @param listener Listener function
   * @returns Subscription
   */
  public subscribe(listener: Function): Subscription {
    if (this._complete) return; // Don't subscribe if the store is complete
    // If the store has not been started, call the updater
    if (!this._started) {
      this._started = true; // Set the started flag to true
      this.callUpdater(this._value); // Call the updater with the initial value
    }
    // Return a subscription
    return super.subscribe(listener);
  }

}
