import { describe, expect, test, vi } from "vitest";
import { Action } from "../../decorators/action";

describe('@Action() decorator', () => {

  test('@Action() returns a decorator function', () => {
    expect(Action).toBeInstanceOf(Function);
  })

  test('@Action() decorator throws an error if the selector is not defined', () => {
    expect(() => Action({selector:null})(class {})).toThrowError();
  })

  test('@Action() decorator returns a class with action methods', () => {

    const updateFn = vi.fn();
    const cleanupFn = vi.fn();
    // Mock action
    class TestA {
      setup() {
        updateFn();
      }
      cleanup() {
        cleanupFn();
      }
    }

    // Decorate the class
    const A = Action({selector: 'testA'})(TestA);

    // Create an instance
    const a = new A();

    // Check if the instance has the action methods
    expect(a.update).toBeInstanceOf(Function);
    expect(a.clean).toBeInstanceOf(Function);

    expect(a.update(document.createElement('div'))).toBeUndefined();
    expect(updateFn).toHaveBeenCalled();
    expect(a.clean()).toBeUndefined();
    expect(cleanupFn).toHaveBeenCalled();
  })

});
