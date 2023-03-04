import { describe, expect, test } from "vitest";
import { XeitoComponent } from "../../classes/xeito-component";

describe('Xeito Component', () => {

  // Create a new Component extending XeitoComponent
  const C = class extends XeitoComponent {};

  // Patch the _XeitoInternals object to the class (Replacing the decorator)
  C.prototype['_XeitoInternals'] = {
    selector: 'c-test',
    actions: [],
    pipes: [],
    imports: [],
    services: [],
    shadow: false,
    DOMRoot: null,
    template: null,
    global: null
  }

  test('A new component can be created by extending Xeito Component', () => {

    // Check if the component is an instance of XeitoComponent
    expect(new C()).toBeInstanceOf(XeitoComponent);
  });

  test('A component can be registered in the customElements registry', () => {  
    // Register the component in the customElements registry
    customElements.define('c-test', C);
  
    // Check if the component is registered
    expect(customElements.get('c-test')).toBe(C);
  });

  test('A component can be created using the document.createElement method', () => {
    // Create a new element using the document.createElement method
    const element = document.createElement('c-test');

    // Check if the element is an instance of XeitoComponent
    expect(element).toBeInstanceOf(XeitoComponent);
  });

  test('A component has the required methods', () => {
    const element = new C();

    // Check if the element has the HTMLElement methods
    expect(element.connectedCallback).toBeInstanceOf(Function);
    expect(element.disconnectedCallback).toBeInstanceOf(Function);
    expect(element.attributeChangedCallback).toBeInstanceOf(Function);

    // Check if the element has the XeitoComponent methods
    expect(element.render).toBeInstanceOf(Function);
    expect(element.setState).toBeInstanceOf(Function);
    expect(element.getState).toBeInstanceOf(Function);
    expect(element.setProp).toBeInstanceOf(Function);
    expect(element.getProp).toBeInstanceOf(Function);
    expect(element.requestUpdate).toBeInstanceOf(Function);
    expect(element.forceUpdate).toBeInstanceOf(Function);
  });

  test('A component can be interacted with from the DOM', () => {

    const container = document.createElement('div');
    container.innerHTML = '<c-test></c-test>';

    const element = container.querySelector('c-test');
    expect(element).toBeInstanceOf(XeitoComponent);
    expect(element).toBeInstanceOf(C);
  })

  test('A component`s state can be updated', () => {
    const element = new C();

    // Check if the state is empty
    expect(element.getState('test')).toBeUndefined();

    // Set the state
    element.setState('test', 'testValue');

    // Check if the state is updated
    expect(element.getState('test')).toEqual('testValue');
  });

  test('A component`s prop can be updated', () => {
    const element = new C();

    // Check if the prop is empty
    expect(element.getProp('test')).toBeUndefined();

    // Set the prop
    element.setProp('test', 'testValue');

    // Check if the prop is updated
    expect(element.getProp('test')).toEqual('testValue');
  });

  test('A component`s state store can be updated', () => {
    const element = new C();

    // Check if the state store is empty
    expect(element.getStore('test')).toBeUndefined();

    // Set the state store
    element.setState('test', ()=>{});

    // Check if the state store is updated
    expect(element.getState('test')).toBeInstanceOf(Function);
  });

});
