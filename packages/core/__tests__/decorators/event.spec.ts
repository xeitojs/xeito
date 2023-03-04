import { describe, expect, test } from "vitest";
import { Event } from "../../decorators/event";
import { Emitter } from "../../classes/emitter";

describe('@Event() decorator', () => {
  
  test('@Event() returns a decorator function', () => {
    expect(Event).toBeInstanceOf(Function);
  })

  test('@Event() creates a getter and a setter', () => {

    // Create mock component
    class TestC {
      testKey: any;
    }

    // Decorate the property
    Event()(TestC.prototype, 'testKey');

    // Create an instance
    const c = new TestC();

    // Get the value
    expect(c.testKey).toBeDefined();
    expect(c.testKey).toBeInstanceOf(Emitter);

    // Try to set the value (should throw an error)
    expect(() => c.testKey = 'test').toThrowError();

  })

});
