import { describe, expect, test } from "vitest";
import { Action } from "../../decorators/action";

describe('@Action() decorator', () => {

  test('@Action() returns a decorator function', () => {
    expect(Action).toBeInstanceOf(Function);
  })

  test('@Action() decorator returns a class with action methods', () => {

    // Mock action
    class TestA {
      setup() {}
      cleanup() {}
    }

    // Decorate the class
    const A = Action({selector: 'testA'})(TestA);

    // Create an instance
    const a = new A();

    // Check if the instance has the action methods
    expect(a.update).toBeInstanceOf(Function);
    expect(a.clean).toBeInstanceOf(Function);
  })

});
