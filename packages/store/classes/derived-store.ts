import { Subscription } from "../interfaces/subscription";
import { ReadStore } from "./read-store";

export class DerivedStore<T> {

  private _value: T;
  private _listeners: Set<(value: T) => void> = new Set();
  private _callback: any;
  private _killCallback: () => void | undefined;

  private _stores: ReadStore<any>[] = [];
  private _subscriptions: Subscription[] = [];
  private _values: any[] = [];

  constructor(
    stores: ReadStore<any>|ReadStore<any>[], 
    callback: (value: any | any[], set: (value?: T) => void) => any | (() => void),
    initialValue?: T
  ) {
    // Set the initial value and callback
    this._value = initialValue;
    this._callback = callback;  

    // If the stores argument is not an array, make it an array
    this._stores = Array.isArray(stores) ? stores : [stores];

    // Subscribe to all the stores
    this._stores.forEach((store, index) => {
      this._subscriptions.push(store.subscribe((value: any) => {
        this._values[index] = value;
        // Only run the callback if all the stores have values
        if (this._values.length === this._stores.length) this.runCallback();
      }));
    });

    this.runCallback();
  }

  public get value(): T {
    return this._value;
  }

  public subscribe(listener: (values: any | any[]) => void) {
    // Call the listener with the current value
    listener(this._value);

    // Add the listener to the set of listeners
    this._listeners.add(listener);

    // Return a subscription object
    return {
      unsubscribe: () => {
        // Remove the listener from the set of listeners
        this._listeners.delete(listener);
        if (this._listeners.size === 0) {
          this._killCallback && this._killCallback();
        }
      }
    } as Subscription;
  }

  private set(value: any) {
    // Set the value
    this._value = value;
    // Call all the listeners with the new value
    this._listeners.forEach(listener => listener(this._value));
  }

  private runCallback() {
    if (this._killCallback) this._killCallback();

    let values = this._values;
    if (this._stores.length === 1) values = this._values[0];
    if (this._callback) {
      const callbackResult = this._callback(values, this.set.bind(this));

      if (callbackResult) {
        if (typeof callbackResult === "function") {
          this._killCallback = callbackResult;
        } else {
          this.set(callbackResult);
        }
      }
    }
  }

}
