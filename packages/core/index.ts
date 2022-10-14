import { createElement } from "./functions/create-element";
import { digestUpdate } from "./functions/digest-update";
import { render } from "./functions/render";

// Export core module
export const Xeito = {
  createElement: createElement,
  render: render,
  digestUpdate: digestUpdate
}

// Export core decorators
export { Component } from "./decorators/component";
export { State } from "./decorators/state";

// Export types
export type { VNode } from "snabbdom";