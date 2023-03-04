import { describe, expect, test, vi } from "vitest";
import { Watch } from "../../decorators/watch";

describe('@Watch() decorator', () => {

  test('@Watch() returns a decorator function', () => {
    expect(Watch).toBeInstanceOf(Function);
  })

  test('@Watch() should decorate the property', () => {

    // Mock class
    class TestC {
      watcherMethod() {}
    }
    
    expect(new TestC()['_watchers']).toBeUndefined();

    // Decorate the method
    Watch('testKey')(TestC.prototype, 'watcherMethod', {value: TestC.prototype.watcherMethod});

    // Create an instance
    const c = new TestC();

    expect(c['_watchers']).toBeDefined();
    expect(c['_watchers'].get('testKey')).toBeDefined();

  })

});
