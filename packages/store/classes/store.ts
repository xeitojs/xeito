import { Subscription } from "../interfaces/subscription";
import { Updater } from "../interfaces/updater";

/**
 * Base class for all stores
 */
export class Store<T> {

  protected _value: T | undefined = undefined;     // The current of the store
  protected _listeners: Set<Function> = new Set()  // List of listeners
  protected _updater: Updater | undefined;         // The updater function
  protected _endUpdater: Function | undefined;     // The end updater function (returned by the updater function)
  protected _started: boolean = false;             // Whether the store has started or not
  protected _set: boolean = false;                // Whether the store has been set for the first time or not

  /**
   * Value getter
   * @returns The current value of the store
   * @example
   * const store = new Store(0);
   * store.value; // 0
   */
  public get value(): T {
    return this._value;
  }

  /**
   * Set method (can be made private by subclasses like ReadStore or MixedStore)
   * @param value The new value of the store
   */
  protected set(value: T): void {
    this._set = true;
    // Update the value
    this._value = value;
    // Call all the listeners with the new value
    this._listeners.forEach((listener) => listener(this._value));
  }

  /**
   * Complete method
   * Calls the end updater if it exists
   */
  public complete(): void {
    this._endUpdater && this._endUpdater();
  }

  /**
   * Adds a listener to the store and return a Subscription object
   * @param listener Listener function to call when the store is updated
   * @returns Subscription object
   */
  public subscribe(listener: Function): Subscription {
    // Add the listener to the list
    this._listeners.add(listener);
    // Call the listener with the value
    this._set && listener(this._value);
    
    // Return a Subscription object
    return {
      unsubscribe: () => {
        this._listeners.delete(listener);
        if (this._listeners.size === 0) {
          this.complete();
        }
      }
    } as Subscription;
  }

  /**
   * Checks if the updater result is a function or a value
   * If it's a function, we store it as the end updater
   * If it's a value, we set the store with it
   * @param value The value to be passed to the updater
   */
  protected callUpdater(value: any | any[]) {
    if (this._updater) {
      // Call the end updater if it exists
      this._endUpdater && this._endUpdater();
      // Call the updater
      const updaterResult = this._updater(value, this.set.bind(this));

      // If the updater result is a function, we store it as the end updater
      if (typeof updaterResult === "function") {
        this._endUpdater = updaterResult;
      } else if (updaterResult !== undefined) {
        // If the updater result is a value, we set the store with it
        this.set(updaterResult);
      }
    }
  }
  
}
