import { describe, expect, test, vi } from "vitest";
import { DerivedStore } from "../../classes/derived-store";
import { ReadStore } from "../../classes/read-store";
import { WriteStore } from "../../classes/write-store";

describe('DerivedStore', () => {

  test('DerivedStore should be a class', ()=> {
    expect(DerivedStore).toBeInstanceOf(Function);
  })

  test('DerivedStore should have the required methods/properties', () => {
    const rStore = new ReadStore(1);
    const store = new DerivedStore(rStore, ()=>{});
    expect(store).toHaveProperty('value');
    expect(store).toHaveProperty('subscribe');
  })

  test('DerivedStore should call the subscribe method of the dependency store', () => {
    const rStore = new ReadStore(1);
    const rStoreSubscribeSpy = vi.spyOn(rStore, 'subscribe');

    const store = new DerivedStore(rStore, ()=>{});
    expect(rStoreSubscribeSpy).toBeCalledTimes(1);
  })

  test('DerivedStore should pass the dependency value to the updater function', () => {
    const rStore = new ReadStore(1);
    const store = new DerivedStore(rStore, (value) => {
      expect(value).toBe(1);
    });
  })

  test('DerivedStore should emit the initial value upon subscription', () => {
    const rStore = new ReadStore(1);
    const store = new DerivedStore(rStore, (value) => {
      return value;
    });

    const listener = vi.fn((value: number) => {
      expect(value).toBe(1);
    })

    store.subscribe(listener);

    expect(listener).toBeCalledTimes(1);
  })

  test('DerivedStore should call listeners when dependencies change', () => {
    const wStore = new WriteStore(1);
    const store = new DerivedStore(wStore, (value) => {
      return value;
    });

    const listener = vi.fn();

    store.subscribe(listener);

    expect(listener).toBeCalledTimes(1);

    wStore.set(2);

    expect(listener).toBeCalledTimes(2);

  })

  test('DerivedStore subscription can be unsubscribed', () => {
    const wStore = new WriteStore(1);
    const store = new DerivedStore(wStore, (value) => {
      return value;
    });

    const listener = vi.fn();

    const subscription = store.subscribe(listener);

    expect(listener).toBeCalledTimes(1);

    subscription.unsubscribe();

    wStore.set(2);

    expect(listener).toBeCalledTimes(1);
  })

})
