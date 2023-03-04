import { describe, expect, test, vi } from "vitest";
import { Pipe } from "../../decorators/pipe";

describe('@Pipe() decorator', () => {

  test('@Pipe() returns a decorator function', () => {
    expect(Pipe).toBeInstanceOf(Function);
  })

  test('@Pipe() decorator throws an error if the selector is not defined', () => {
    expect(() => Pipe({selector:null})(class {})).toThrowError();
  })

  test('@Pipe() decorator returns a class with pipe methods', () => {

    const transformFn = vi.fn();
    const destroyFn = vi.fn();
    // Mock pipe
    class TestP {
      transform(value) {
        transformFn();
        return value;
      }
      destroy() {
        destroyFn();
      }
    }

    // Decorate the class
    const P = Pipe({selector: 'testP'})(TestP);

    // Create an instance
    const p = new P();

    // Check if the instance has the pipe methods
    expect(p.update).toBeInstanceOf(Function);
    expect(p.clean).toBeInstanceOf(Function);
    
    expect(p.update('test'), null).toBe('test');
    expect(transformFn).toHaveBeenCalled();

    expect(p.clean()).toBeUndefined();
    expect(destroyFn).toHaveBeenCalled();
    
  })

});
