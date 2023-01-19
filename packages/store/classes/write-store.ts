import { Subscription } from "../interfaces/subscription";
import { Updater } from "../interfaces/updater";
import { Store } from "./store";

/**
 * WriteStore is a store that can only be written to
 * The set method is available
 * @example
 * const store = new WriteStore(0);
 * store.update((value) => value + 1); // Increment the value
 * store.set(0); // Update the value to 0
 */
export class WriteStore<T> extends Store<T> {

  constructor(initialValue: T, updater?: Updater) {
    super();
    // Set the initial value and store the updater
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

  /**
   * Override the set method to make it public
   * @param value Value to set
   */
  public set(value: T) {
    super.set(value);
  }

  /**
   * Changes the updater of the store
   * @param updater Updater function
   */
  update(updater: Updater) {
    this._updater = updater;
    this.callUpdater(this._value);
  }

}
