import { describe, expect, test, vi } from "vitest";
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

  test('@Inject should warn if we try to set the value manually', () => {
    class S3 {}

    // Register mock service
    Injectable({selector: 's3'})(S3);

    // Create mock component
    class C3 {
      s3: S3;
    }

    // Decorate property with @Inject
    Inject()(C3.prototype, 's3');

    // Create instance of mock component
    const c3 = new C3();

    // Check if property is set
    expect(c3.s3).toBeInstanceOf(S3);

    const warn = vi.fn();
    console.warn = warn;
    // Try to set the value manually
    c3.s3 = 'test';

    // Check that the property is still set
    expect(c3.s3).toBeInstanceOf(S3);
    // Check that the warning was called
    expect(warn).toBeCalledTimes(1);
  })

})
