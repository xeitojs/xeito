import { Subscription } from "../interfaces/subscription";
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
      this._subscriptions.push(store.subscribe((value: any) => {
        this._values[index] = value;
        this.handleUpdater(this._updater);
      }));
    });
  }

  /**
   * Override the complete method to unsubscribe from all stores
   */
  public complete() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
    super.complete();
  }

  private handleUpdater(updater: Updater) {
    let values = this._values.length === 1 ? this._values[0] : this._values;
    const updaterResult = updater(values, this.set.bind(this));
    if (typeof updaterResult === 'function') {
      this._endUpdater = updaterResult;
    } else if (updaterResult !== undefined) {
      this.set(updaterResult);
    }
  }
}
