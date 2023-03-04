import { describe, expect, test } from "vitest";
import {
  render,
  html,
  svg,
  Hole
} from '../index';

describe('uhtml', () => {

  test('uhtml re-exports are defined', () => {
    expect(render).toBeDefined();
    expect(html).toBeDefined();
    expect(svg).toBeDefined();
    expect(Hole).toBeDefined();
  })

  test('html function creates a Hole', () => {
    const hole = html`<div>Hello World</div>`;
    expect(hole).toBeInstanceOf(Hole);
  })

  test('svg function creates a Hole', () => {
    const hole = svg`<div>Hello World</div>`;
    expect(hole).toBeInstanceOf(Hole);
  })

  test('render function renders a Hole', () => {
    const hole = html`<div>Hello World</div>`;
    const node = document.createElement('div');
    render(node, hole);
    expect(node.innerHTML).toBe('<div>Hello World</div>');
  })

});
