import { describe, expect, test } from "vitest";
import { Registry } from "../../classes/registry";
import { Injectable } from "../../decorators/injectable";

describe('@Injectable() decorator', () => {

  test('@Injectable should return a decorator function', () => {
    expect(Injectable).toBeInstanceOf(Function);
    expect(Injectable({selector: 'a'})).toBeInstanceOf(Function);
  })

  test('@Injectable should register a service in the registry', () => {
    class S1 {}

    Injectable({selector: 's1'})(S1);
    expect(Registry.serviceExists('s1')).toBe(true);
  })

})
