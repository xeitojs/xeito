// @vitest-environment node

import { Component, Xeito, XeitoComponent, html } from "@xeito/core";
import { describe, expect, test } from "vitest";
import { renderToString } from "../../functions/render-to-string";

describe('renderToString', () => {

  test('should render an app to string', async () => {

    // Create a mock componnent 
    class TestC extends XeitoComponent {
      render() {
        return html`<div>Hello world!</div>`;
      }
    }

    // Decorate the component
    Component({selector: 'test-c'})(TestC);

    // Create a mock app
    const app = new Xeito(TestC);

    // Render the app to string
    let htmlString = await renderToString(app);

    // Remove the spaces
    htmlString = htmlString.replace(/\s/g, '');
    
    // Check the result
    expect(htmlString).toBe('<test-c><div>Hello world!</div></test-c>'.replace(/\s/g, ''));

  });

});
