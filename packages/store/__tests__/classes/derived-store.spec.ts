import { describe, expect, test, vi } from "vitest";
import { DerivedStore } from "../../classes/derived-store";
import { ReadStore } from "../../classes/read-store";

describe('DerivedStore', () => {

  test('DerivedStore should be a class', ()=> {
    expect(DerivedStore).toBeInstanceOf(Function);
  })

  test('DerivedStore should have the required methods/properties', () => {
    const rStore = new ReadStore(1);
    const store = new DerivedStore(rStore, ()=>{});
    expect(store).toHaveProperty('value');
    expect(store).toHaveProperty('subscribe');
    expect(store).toHaveProperty('set');
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

})
