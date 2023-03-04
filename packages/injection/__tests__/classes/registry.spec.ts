import { describe, expect, test, vi } from "vitest";
import { Registry } from "../../classes/registry";

describe('Injection registry', () => {

  // The registry has only static methods, so we can't instantiate it
  // We can only test the methods
  test('Registry class exists', () => {
    expect(Registry).toBeDefined();
  })

  test('Registry class has required methods', () => {
    expect(Registry.registerService).toBeInstanceOf(Function);
    expect(Registry.getService).toBeInstanceOf(Function);
    expect(Registry.serviceExists).toBeInstanceOf(Function);
  });

  test('Registry can register a service', () => {
    const service = {};
    Registry.registerService('test', service);
    expect(Registry.serviceExists('test')).toBe(true);
  });

  test('Registry can get a service', () => {
    const service = {};
    Registry.registerService('test1', service);
    expect(Registry.getService('test1')).toBe(service);
  });

  test('Registry throws an error if the service is not found', () => {
    expect(() => Registry.getService('randomUndefined')).toThrow();
  });

  test('Registry can overwrite a service', () => {
    const service = {name: 's1'};
    Registry.registerService('test2', service);
    const service2 = {name: 's2'};

    // We expect it to warn the user that the service is being overwritten
    const warn = vi.fn();
    console.warn = warn;

    Registry.registerService('test2', service2);
    expect(Registry.getService('test2')).toHaveProperty('name', 's2');
    expect(warn).toHaveBeenCalled();
  });

  test('Registry can check if a service exists', () => {
    const service = {};
    Registry.registerService('test3', service);
    expect(Registry.serviceExists('test3')).toBe(true);
  });

})
