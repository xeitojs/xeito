// @vitest-environment node

import { describe, expect, test } from "vitest";
import { parse } from 'node-html-parser';
import { getSlotContent } from "../../functions/get-slot-content";
import { render, html } from "@xeito/core";

describe('getSlotContent', () => {

  test('should get the slot content of a component', async () => {
    let content = render(String, html`
      <test-c id="federico">
        <div slot="start">
          <p>Start</p>
        </div>
        <div slot="end">
          <p>End</p>
          <p>End2</p>
        </div>
        <p>Default</p>
      </test-c>
    `);
    const element = parse(content).childNodes[0];
    
    const slotContent = await getSlotContent(element as any);

    expect(slotContent.default).not.toBeUndefined();
    expect(render(String, slotContent.default)).toBe('<p>Default</p>');

    expect(slotContent.start).not.toBeUndefined();
    expect(render(String, slotContent.start)).toBe('<div slot="start"><p>Start</p></div>');

    expect(slotContent.end).not.toBeUndefined();
    expect(render(String, slotContent.end)).toBe('<div slot="end"><p>End</p><p>End2</p></div>');
  });

});