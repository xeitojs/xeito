import { describe, expect, test, vi } from "vitest";
import { ReadStore } from "../../classes/read-store";

describe('ReadStore', () => {

  test('ReadStore should be a class', ()=> {
    expect(ReadStore).toBeInstanceOf(Function);
  })

  test('ReadStore should have the required methods/properties', () => {
    const store = new ReadStore();
    expect(store).toHaveProperty('value');
    expect(store).toHaveProperty('subscribe');
  })

  test('ReadStore should emit the initial value upon subscription', () => {
    const store = new ReadStore(1);
    
    const listener = vi.fn((value: number) => {
      expect(value).toBe(1);
    })

    store.subscribe(listener);

    expect(listener).toBeCalledTimes(1);
  })

  test('ReadStore should receive an updater function', () => {
    const store = new ReadStore(1, (set) => {
      set(2);
      return () => {};
    });

    const listener = vi.fn((value: number) => {
      expect(value).toBe(2);
    })

    store.subscribe(listener);

    expect(listener).toBeCalledTimes(1);
  })

  test('ReadStore should call the cleanup function only when there are no more listeners', () => {
    const cleanupSpy = vi.fn(() => {});

    const store = new ReadStore(1, () => {
      return cleanupSpy;
    });

    const subscription = store.subscribe(() => {});

    expect(cleanupSpy).toBeCalledTimes(0);

    subscription.unsubscribe();

    expect(cleanupSpy).toBeCalledTimes(1);
  })

  test('ReadStore should return an object with an unsubscribe method', () => {
    const store = new ReadStore(1);
    const subscription = store.subscribe(() => {});
    expect(subscription).toHaveProperty('unsubscribe');
    expect(subscription.unsubscribe).toBeInstanceOf(Function);
  })

});
