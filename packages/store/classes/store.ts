import { Subscription } from "../interfaces/subscription";
import { Updater } from "../interfaces/updater";

/**
 * Base class for all stores
 */
export class Store<T> {

  protected _value: T = null                       // The current of the store
  protected _listeners: Set<Function> = new Set()  // List of listeners
  protected _updater: Updater | undefined;         // The updater function
  protected _endUpdater: Function | undefined;     // The end updater function (returned by the updater function)
  protected _complete: boolean = false;            // Whether the store is complete or not

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
    if (this._complete) return; // If the store is complete, we don't update it
    // Update the value
    this._value = value;
    // Call all the listeners with the new value
    this._listeners.forEach((listener) => listener(this._value));
  }

  /**
   * Complete method
   * Completes the store, preventing it from being updated 
   * Calls the end updater if it exists
   */
  public complete(): void {
    this._complete = true;
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
    // If the store has a value, call the listener with the value
    if (this._value !== null) listener(this._value);
    
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
   * @param updater Updater function
   */
  protected callUpdater(updater: Updater) {
    const updaterResult = updater(this._value, this.set.bind(this));
    if (typeof updaterResult === "function") {
      this._endUpdater = updaterResult;
    } else if (updaterResult !== undefined) {
      this.set(updaterResult);
    }
  }
  
}
