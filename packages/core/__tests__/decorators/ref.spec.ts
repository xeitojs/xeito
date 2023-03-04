import { describe, expect, test } from "vitest";
import { Ref } from "../../decorators/ref";

describe('@Ref() decorator', () => {
  
  test('@Ref() returns a decorator function', () => {
    expect(Ref).toBeInstanceOf(Function);
  })

  test('@Ref() should decorate the property', () => {
        
    // Mock class
    class TestC {
      testKey: any = {current: {}};
    }
    
    // Decorate the property
    Ref()(TestC.prototype, 'testKey');
    
    // Create an instance
    const c = new TestC();
    
    expect(c.testKey).toBeDefined();
    
  })

})
