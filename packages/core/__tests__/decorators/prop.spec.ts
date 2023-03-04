import { describe, expect, test } from "vitest";
import { Prop } from "../../decorators/prop";

describe('@Prop() decorator', () => {
  
  test('@Prop() returns a decorator function', () => {
    expect(Prop).toBeInstanceOf(Function);
  })

  test('@Prop() should decorate the property', () => {
      
    // Mock class
    class TestC {
      testKey: any;
      props: any = {};
      setProp(key, value) {
        this.props[key] = value;
      }
      getProp(key) {
        return this.props[key];
      }
    }
  
    // Decorate the property
    Prop()(TestC.prototype, 'testKey');
  
    // Create an instance
    const c = new TestC();
  
    // Get the value (should be undefined)
    expect(c.testKey).toBeUndefined();

    // Set the value
    c.testKey = 'test';

    // Get the value
    expect(c.testKey).toBe('test');
  
  })

})
