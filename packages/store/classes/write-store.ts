import { ReadStore } from "./read-store";

export class WriteStore<T> extends ReadStore<T> {

  constructor(value?: T, callback?: (set: (value: any) => void) => () => void) {
    super(value, callback);
  }

  /**
   * Override the set method to make it public
   * @param value The new value
   */
  public set(value: T) {
    super.set(value);
  }

  /**
   * Update method
   * This method takes a callback function that takes the current value and returns the new value
   * @param callback A function that takes the current value and returns the new value
   */
  update(callback?: (value: T) => T) {
    this.set(callback(this._value));
  }

}
