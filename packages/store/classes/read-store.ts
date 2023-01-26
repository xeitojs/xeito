import { Subscription } from "../interfaces/subscription";

export class ReadStore<T> {

  protected _value: T;
  protected _listeners: Set<(value: T) => void> = new Set();
  protected _callback: (set: (value: any) => void) => () => void;
  protected _killCallback: () => void | undefined;

  constructor(value?: T, callback?: (set: (value: any) => void) => () => void) {
    this._value = value;
    this._callback = callback;
  }

  public get value(): T {
    return this._value;
  }

  /**
   * Sets the value of the store and calls all the listeners
   * @param value The new value
   */
  protected set(value: T) {
    // Set the value
    this._value = value;
    // Call all the listeners with the new value
    this._listeners.forEach(listener => listener(this._value));
  }

  /**
   * Subscribe to the store
   * @param listener A function that takes the current value and returns the new value
   * @returns A subscription object with an unsubscribe method
   */
  public subscribe(listener: (value: T) => void): Subscription {
    
    // If there are no listeners, call the callback if it exists
    if (this._listeners.size === 0) {
      this._killCallback = this._callback && this._callback(this.set.bind(this));
    }

    // Call the listener with the current value
    listener(this._value);

    // Add the listener to the set of listeners
    this._listeners.add(listener);

    // Return a subscription object
    return {
      unsubscribe: () => {
        // Remove the listener from the set of listeners
        this._listeners.delete(listener);

        // If there are no more listeners, call the callback killer if it exists
        if (this._listeners.size === 0) {
          this._killCallback && this._killCallback();
        }
      }
    } as Subscription;
  }

}
