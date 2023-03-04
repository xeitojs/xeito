import { describe, expect, test } from "vitest";
import { Pipe } from "../../decorators/pipe";

describe('@Pipe() decorator', () => {

  test('@Pipe() returns a decorator function', () => {
    expect(Pipe).toBeInstanceOf(Function);
  })

  test('@Pipe() decorator returns a class with pipe methods', () => {

    // Mock pipe
    class TestP {}

    // Decorate the class
    const P = Pipe({selector: 'testP'})(TestP);

    // Create an instance
    const p = new P();

    // Check if the instance has the pipe methods
    expect(p.update).toBeInstanceOf(Function);
    expect(p.clean).toBeInstanceOf(Function);
  })

});
