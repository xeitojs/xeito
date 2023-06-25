// @vitest-environment node

import { describe, expect, test } from "vitest";
import { html, XeitoComponent, Component } from "@xeito/core";
import { renderComponent } from "../../functions/render-component";

describe('renderComponent', () => {

  test('should render a component', async () => {

    // Mock a component
    class TestComponent extends XeitoComponent {
      render() {
        return html`
          <div>
            <p>Test</p>
          </div>
        `;
      }
    }

    // Decorate the component
    Component({selector: 'test-c'})(TestComponent);
    // Forcibly assign the global object to allow initial render
    TestComponent.prototype['_XeitoInternals'] = {...TestComponent.prototype['_XeitoInternals'], global: {}};

    // Render the component
    const component = await renderComponent(TestComponent, {}, {default: []});

    // Trim whitespaces and newlines of the rendered component
    const renderedComponent = component.trim().replace(/\s+/g, '');

    expect(renderedComponent).toBe('<test-c><div><p>Test</p></div></test-c>');
  });

});