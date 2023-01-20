import type { Subscription } from "../interfaces/subscription";
import { Updater } from "../interfaces/updater";
import { Store } from "./store";

/**
 * MixedStore is a store that depends on other stores
 * @example
 * const store1 = new WriteStore(0);
 * const store2 = new WriteStore(0);
 * const store = new MixedStore([store1, store2], ([value1, value2], set) => {
 *  set(value1 + value2);
 * });
 */
export class MixedStore<T> extends Store<T> {

  private _stores: Store<T>[] = [];
  private _values: any[] = [];
  private _subscriptions: Subscription[] = [];
  
  constructor(stores: Store<T>[] | Store<T>, updater: Updater, initialValue?: T) {
    super();
    this._value = initialValue;
    this._updater = updater;

    // Turn the stores into an array if it's not already
    if (Array.isArray(stores)) {
      this._stores = stores;
    } else {
      this._stores = [stores];
    }

    this.createSubscriptions();
  }

  /**
   * Creates subscriptions for each store
   */
  private createSubscriptions() {
    this._stores.forEach((store: Store<any>, index: number) => {
      this._values[index] = store.value; // Get the initial values of the stores
      this._subscriptions.push(store.subscribe((value: any) => {
        this._values[index] = value;
        
        if (this._started) {
          // Convert the values array to a single value if there is only one store
          const values = this._stores.length === 1 ? this._values[0] : this._values;
          this.callUpdater(values);
        }
      }));
    });
  }

  /**
   * Override the complete method to unsubscribe from all stores
   */
  public complete() {
    super.complete();
  }

  /**
   * Override the subscribe method
   */
  public subscribe(listener: Function): Subscription {
    // If the store has not been started, call the updater
    if (!this._started) {
      this._started = true; // Set the started flag to true
      // Convert the values array to a single value if there is only one store
      const values = this._values.length === 1 ? this._values[0] : this._values;
      this.callUpdater(values);
    }
    // Return a subscription
    return super.subscribe(listener);
  }
}
