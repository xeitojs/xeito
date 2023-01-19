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

    if (this._updater) {
      this.callUpdater(this._updater);
    }
  }

}
