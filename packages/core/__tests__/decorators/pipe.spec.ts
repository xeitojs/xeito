import { describe, expect, test, vi } from "vitest";
import { Pipe } from "../../decorators/pipe";

describe('@Pipe() decorator', () => {

  test('@Pipe() returns a decorator function', () => {
    expect(Pipe).toBeInstanceOf(Function);
  })

  test('@Pipe() decorator throws an error if the selector is not defined', () => {
    expect(() => Pipe({selector:null})(class {})).toThrowError();
  })

  // Create a mock pipe to test the decorator
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

  test('@Pipe() decorator returns a class with pipe methods', () => {
    // Check if the instance has the pipe methods
    expect(p.update).toBeInstanceOf(Function);
    expect(p.clean).toBeInstanceOf(Function);
    
    expect(p.update('test'), null).toBe('test');
    expect(transformFn).toHaveBeenCalled();

    expect(p.clean()).toBeUndefined();
    expect(destroyFn).toHaveBeenCalled();

    // Reset the mocks
    transformFn.mockReset();
    destroyFn.mockReset();
  })

  test('@Pipe() decorator only triggers the transform if a primitive value has changed', () => {
    expect(p.update('test'), null).toBe('test');
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();

    expect(p.update('test'), null).toBe('test');
    expect(transformFn).not.toHaveBeenCalled();

    expect(p.update('test2'), null).toBe('test2');
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();
  })

  test('@Pipe() decorator only triggers the transform method if an array value has changed', () => {
    expect(p.update([1,2,3]), null).toEqual([1,2,3]);
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();

    expect(p.update([1,2,3]), null).toEqual([1,2,3]);
    expect(transformFn).not.toHaveBeenCalled();

    // Test with different array length
    expect(p.update([1,2,3,4]), null).toEqual([1,2,3,4]);
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();

    // Test with different array items
    expect(p.update(['a','b','c']), null).toEqual(['a','b','c']);
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();

    expect(p.update(['a','b','c']), null).toEqual(['a','b','c']);
    expect(transformFn).not.toHaveBeenCalled();
  })

  test('@Pipe() decorator always triggers the transform method if the value is an object', () => {
    expect(p.update({a:1}), null).toEqual({a:1});
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();

    expect(p.update({a:1}), null).toEqual({a:1});
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();
  });

  test('@Pipe() decorator triggers the transform method if the arguments have changed', () => {
    expect(p.update('test', 1, 2, 3), null).toBe('test');
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();

    expect(p.update('test', 1, 2, 3), null).toBe('test');
    expect(transformFn).not.toHaveBeenCalled();
    transformFn.mockReset();

    // Test with different length
    expect(p.update('test', 1, 2, 3, 4), null).toBe('test');
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();

    // Test with different arguments
    expect(p.update('test', 5, 6, 7, 8), null).toBe('test');
    expect(transformFn).toHaveBeenCalled();
    transformFn.mockReset();
  });

});
