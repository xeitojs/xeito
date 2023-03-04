import { describe, expect, test, vi } from "vitest";
import { WriteStore } from "../../classes/write-store";

describe('WriteStore', () => {

  test('WriteStore should be a class', ()=> {
    expect(WriteStore).toBeInstanceOf(Function);
  })

  test('WriteStore should have the required methods/properties', () => {
    const store = new WriteStore();
    expect(store).toHaveProperty('value');
    expect(store).toHaveProperty('subscribe');
    expect(store).toHaveProperty('set');
    expect(store).toHaveProperty('update');
  })

  test('WriteStore should emit the initial value upon subscription', () => {
    const store = new WriteStore(1);
    
    const listener = vi.fn((value: number) => {
      expect(value).toBe(1);
    })

    store.subscribe(listener);

    expect(listener).toBeCalledTimes(1);
  });

  test('WriteStore should receive an updater function', () => {
    const store = new WriteStore(1, (set) => {
      set(2);
      return () => {};
    });

    const listener = vi.fn((value: number) => {
      expect(value).toBe(2);
    })

    store.subscribe(listener);

    expect(listener).toBeCalledTimes(1);
  });

  test('WriteStore should call the cleanup function only when there are no more listeners', () => {
    const cleanupSpy = vi.fn(() => {});

    const store = new WriteStore(1, () => {
      return cleanupSpy;
    });

    const subscription = store.subscribe(() => {});

    expect(cleanupSpy).toBeCalledTimes(0);

    subscription.unsubscribe();

    expect(cleanupSpy).toBeCalledTimes(1);
  })

  test('WriteStore should call a listener when the value is set', () => {
    const store = new WriteStore(1);
    const listener = vi.fn();
    store.subscribe(listener);
    expect(listener).toBeCalledTimes(1);
    store.set(2);
    expect(listener).toBeCalledTimes(2);
  })

  test('WriteStore should call the update function when calling the update method', () => {
    const store = new WriteStore(1);
    const updateSpy = vi.fn((value) => value + 1);
    store.update(updateSpy);
    expect(updateSpy).toBeCalledTimes(1);
  })

  test('WriteStore should call a listener when the value is updated', () => {
    const store = new WriteStore(1);
    const listener = vi.fn();
    store.subscribe(listener);
    expect(listener).toBeCalledTimes(1);
    store.update((value) => value + 1);
    expect(listener).toBeCalledTimes(2);
  })

  test('WriteStore should return an object with an unsubscribe method', () => {
    const store = new WriteStore(1);
    const subscription = store.subscribe(() => {});
    expect(subscription).toHaveProperty('unsubscribe');
    expect(subscription.unsubscribe).toBeInstanceOf(Function);
  })

})
