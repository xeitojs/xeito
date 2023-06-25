import { describe, expect, test, vi } from "vitest";
import { Watch } from "../../decorators/watch";
import { State } from "../../decorators/state";
import { XeitoComponent } from "../../classes/xeito-component";
import { Component } from "../../decorators/component";

describe('@Watch() decorator', () => {

  test('@Watch() returns a decorator function', () => {
    expect(Watch).toBeInstanceOf(Function);
  })

  test('@Watch() should decorate the property', () => {

    // Mock class
    class TestC extends XeitoComponent{
      watcherMethod() {}
    }

    // Decorate the method
    Watch('testKey')(TestC.prototype, 'watcherMethod', {value: TestC.prototype.watcherMethod});

    // Create an instance
    const c = new TestC();

    expect(c['_watchers']).toBeDefined();
    expect(c['_watchers'].get('testKey')).toBeDefined();

  })

  test('@Watch() decorated method should be called when updating related property', () => {
    // Mock class
    class TestC extends XeitoComponent {
      testValue = 0;
      watcherMethod() {}
    }

    // Decorate the class to turn it into a component
    Component({selector: 'test-c'})(TestC);

    // Decorate the propery to turn it into a state
    State()(TestC.prototype, 'testValue');

    // Decorate the method
    Watch('testValue')(TestC.prototype, 'watcherMethod', {value: TestC.prototype.watcherMethod});

    // Create an instance
    const c = new TestC();

    // Overwrite the update method to prevent errors
    c['_update'] = () => {};

    // Spy on the method (vitest api)
    vi.spyOn(c, 'watcherMethod');

    // Update the property
    c.testValue = 1;

    // Expect the method to have been called
    expect(c.watcherMethod).toHaveBeenCalled();
  })

});
