import { describe, test, expect } from 'vitest';
import { Component } from '../../decorators/component';

describe('@Component() decorator', () => {

  // Create a test component
  const D = Component({selector: 'test-c'});
  const C = D(class TestC {});
  
  test('@Component() returns a decorator function', () => {
    expect(D).toBeInstanceOf(Function);
  })
  
  test('@Component() decorator function returns a class', () => {
    expect(C).toBeInstanceOf(Function);
  })
  
  test('@Component() decorator must register a custom element', () => {
    expect(customElements.get('test-c')).toBe(C);
  })
  
  test('@Component() decorator function returns a class with a _XeitoInternals', () => {
    expect(new C()._XeitoInternals).toBeDefined();
    expect(new C()._XeitoInternals).toBeInstanceOf(Object);
    expect(new C()._XeitoInternals).toHaveProperty('selector');
    expect(new C()._XeitoInternals.selector).toBe('test-c');
  })
})
