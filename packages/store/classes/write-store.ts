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

    // If the store has an updater, we start it
    if (this._updater) {
      this.callUpdater(this._updater);
    }
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
    this.callUpdater(this._updater);
  }

}
