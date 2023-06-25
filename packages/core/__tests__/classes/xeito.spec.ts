import { html } from '../../';
import { describe, expect, test } from 'vitest';
import { Xeito } from '../../classes/xeito';
import { XeitoComponent } from '../../classes/xeito-component';
import { Component } from '../../decorators/component';

describe('Xeito Application Class', () => {
 
  test('Xeito class exists', () => {
    expect(Xeito).toBeDefined();
  })

  test('Xeito class can be instantiated', () => {
    const xeito = new Xeito({});
    expect(xeito).toBeInstanceOf(Xeito);
  })

  test('Xeito class has required methods', () => {
    const xeito = new Xeito({});
    
    expect(xeito.bootstrap).toBeInstanceOf(Function);
    expect(xeito.usePlugin).toBeInstanceOf(Function);
  });

  test('Xeito class can be bootstrapped', () => {
    
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

    // Mock component
    class C extends XeitoComponent {
      render() {
        return html`<div>Test</div>`
      }
    }
    Component({ selector: 'c-test' })(C);

    const xeito = new Xeito(C);
    xeito.bootstrap('#root');

    const componentInstance = document.querySelector('#root').children[0];

    expect(componentInstance).toBeInstanceOf(C);
    expect(componentInstance.innerHTML).toBe('<div>Test</div>');
  });

});