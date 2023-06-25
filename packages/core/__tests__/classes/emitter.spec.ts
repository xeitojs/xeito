import { describe, expect, test } from "vitest";
import { Emitter } from "../../classes/emitter";

describe('Emitter Class', () => {

  test('A new emitter can be created', () => {
    const E = new Emitter({} as any, {});
    expect(E).toBeInstanceOf(Emitter);
  })

  test('An emitter has the required methods', () => {
    const E = new Emitter({} as any, {});
    expect(E.emit).toBeInstanceOf(Function);
  });

  test('An emitter calls the dispatchEvent of the component', () => {
    // Create a mock class to handle the event dispatch
    class MockComponent extends HTMLElement {
      dispatchEvent(event: CustomEvent) {
        expect(event).toBeInstanceOf(CustomEvent);
        return true;
      }
    }
    // Create a new emitter
    const E = new Emitter(new MockComponent(), {
      name: 'test'
    });

    // Emit the event
    E.emit('test');
  });

});
