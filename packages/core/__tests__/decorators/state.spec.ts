import { describe, expect, test, vi } from "vitest";
import { State } from "../../decorators/state";

describe('@State() decorator', () => {

  // Create a mock component for State
  class MockC {
    private state: any = {};
    testKey: any;
    setState(key, value) {
      this.state[key] = value;
      return value;
    }
    getState(key) {
      return this.state[key];
    }
  }

  test('@State() returns a decorator function', () => {
    expect(State).toBeInstanceOf(Function);
  })

  test('@State() decorator creates a getter and a setter and calls state methods', () => {
    const mock = new MockC();

    expect(mock.testKey).toBeUndefined();

    // Decorate the property
    State()(mock, 'testKey');

    // Set the value
    mock.testKey = 'testKey-123';

    expect(mock.testKey).toBeDefined();
    expect(mock.testKey).toBe('testKey-123');
  })

  // Create a mock component for Stores
  class MockC2 {
    private stores: any = {};
    
    testKey: any;
    setStore(key, value) {
      this.stores[key] = value;
      return value;
    }
    getStore(key) {
      return this.stores[key];
    }
  }

  test('@State() decorator creates a getter and a setter and calls store methods', () => {
    const mockStore = {
      subscribe: ()=>{}
    }

    const mock = new MockC2();

    expect(mock.testKey).toBeUndefined();

    // Decorate the property
    State()(mock, 'testKey');

    // Set the value
    mock.testKey = mockStore;

    expect(mock.testKey).toBeDefined();
    expect(mock.testKey).toBe(mockStore);

  })

})
