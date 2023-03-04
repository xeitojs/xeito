import { describe, expect, test } from "vitest";
import { Global } from "../../decorators/global";

describe('@Global decorator', () => {
  
  test('@Global() returns a decorator function', () => {
    expect(Global).toBeInstanceOf(Function);
  })

  test('@Global() should decorate the property', () => {

    // Mock class
    class TestC {
      _XeitoInternals: any = {selector: 'test-c'}
      testKey: any;
    }

    // Decorate the property
    Global()(TestC.prototype, 'testKey');

    // Create an instance
    const c = new TestC();

    // Get the value (should warning because the global object is not attached to the component)
    expect(c.testKey).toBeUndefined();

    // Attach the global object
    c['global'] = {properties: {testKey: 'test'}}
    
    // Get a property from the global object
    expect(c.testKey).toBe('test');

  })

})
