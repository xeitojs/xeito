import { describe, expect, test } from "vitest";
import { Inject } from "../../decorators/inject";
import { Injectable } from "../../decorators/injectable";

describe('@Inject() decorator', () => {

  test('@Inject should return a decorator function', () => {
    expect(Inject).toBeInstanceOf(Function);
    expect(Inject()).toBeInstanceOf(Function);
  })

  test('@Inject should retrieve a service from the registry based on name property', () => {
    class S1 {}

    // Register mock service
    Injectable({selector: 's1'})(S1);

    // Create mock component
    class C1 {
      s1: S1;
    }

    // Decorate property with @Inject
    Inject()(C1.prototype, 's1');

    // Create instance of mock component
    const c1 = new C1();

    // Check if property is set
    expect(c1.s1).toBeInstanceOf(S1);
  });

  test('@Inject should retrieve a service from the registry based on arbitrary name', () => {
    class S2 {}

    // Register mock service
    Injectable({selector: 's2'})(S2);

    // Create mock component
    class C2 {
      invalidName: S2;
    }

    // Decorate property with @Inject (passing arbitrary name)
    Inject('s2')(C2.prototype, 'invalidName');

    // Create instance of mock component
    const c2 = new C2();

    // Check if property is set
    expect(c2.invalidName).toBeInstanceOf(S2);

  })

})
