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
export { Ref } from "./decorators/ref";

// Export types
export type { VNode } from "snabbdom";
export type { ComponentData } from "./interfaces/component-data";

// Export classes
export { Emitter } from "./classes/emitter";
