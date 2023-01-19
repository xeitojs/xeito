
class Stream<T> {

  _listeners: Set<Function> = new Set<Function>();
  _value: T;
  _updater: Updater<T>;
  _cancelUpdater: Function | void;
  _started: boolean = false;

  constructor (value: T, updater?: Updater<T>) {
    this._value = value;
    if (updater) {
      this._updater = updater;
    }
  }

  public subscribe(listener: Function): Subscription {
    this._listeners.add(listener);
    if (this._value) listener(this._value);

    return {
      unsubscribe: () => {
        this._listeners.delete(listener);
        if (this._listeners.size === 0) {
          this._started = false;
          this._cancelUpdater && this._cancelUpdater();
        }
      }
    } as Subscription;
  }

  get value(): T {
    return this._value;
  }

}

export class ReadStream<T> extends Stream<T> {

  private set(newValue: T) {
    this._value = newValue;
    this._listeners.forEach((listener) => listener(this._value));
  }

  public override subscribe(listener: Function): Subscription {
    const subscription: Subscription = super.subscribe(listener);
    if (!this._started) {
      this._started = true;
      if (this._updater) {
        this._cancelUpdater = this._updater(this._value, this.set.bind(this));
      }
    }
    return subscription;
  }

}

export class WriteStream<T> extends Stream<T> {
  
  public set(newValue: T) {
    this._value = newValue;
    this._listeners.forEach((listener) => listener(this._value));
  }

  public update(updater: Updater<T>) {
    this._updater = updater;
    this._cancelUpdater = this._updater(this._value, this.set.bind(this));
  }

  public override subscribe(listener: Function): Subscription {
    const subscription: Subscription = super.subscribe(listener);
    if (!this._started) {
      this._started = true;
      if (this._updater) {
        this._cancelUpdater = this._updater(this._value, this.set.bind(this));
      }
    }
    return subscription;
  }

}

export class MixedStream<T> extends Stream<T> {

  _updater: MixedUpdater<any> | any;
  private _streams: Stream<T>[];
  private _values: any[] = [];
  private _subscriptions: Subscription[] = [];

  constructor(streams: Stream<any>[] | Stream<any>, updater: MixedUpdater<any>, initialValue?: T) {
    super(initialValue);
    this._streams = Array.isArray(streams) ? streams : [streams];
    this._values = this._streams.map((stream) => stream.value);

    this._streams.forEach((stream, index) => {
      this._subscriptions[index] = stream.subscribe((value: any) => {
        this._values[index] = value;
        this._updater && this._updater(this._values, this.set.bind(this));
      });
    });

    this._updater = updater;
    this._updater(this._values, this.set.bind(this));
  }

  private set(newValue: T) {
    Promise.resolve().then(() => {
      this._value = newValue;
      this._listeners.forEach((listener) => listener(this._value));
    });
  }

  public override subscribe(listener: Function): Subscription {
    this._listeners.add(listener);
    if (this._value) listener(this._value);

    const subscription: Subscription = {
      unsubscribe: () => {
        this._listeners.delete(listener);
        if (this._listeners.size === 0) {
          this._started = false;
          this._updater = null;
          this._subscriptions.forEach((subscription) => subscription.unsubscribe());
        }
      }
    };
    return subscription;
  }

}


export interface Subscription {
  unsubscribe: Function;
}

export interface Updater<T> {
  (value: T, set?: (newValue: T) => void): Function | void;
}

export interface MixedUpdater<T> {
  (streams: Array<any> | any, set?: (newValue: T) => void): void;
}