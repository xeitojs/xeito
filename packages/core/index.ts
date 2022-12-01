import { createElement } from "./functions/create-element";
import { digestUpdate } from "./functions/digest-update";

import { render, html, svg, Hole, Renderable, TemplateFunction } from 'uhtml';

// Export core decorators
export { Component } from "./decorators/component";
export { State } from "./decorators/state";

/**
 * Re-export uhtml
 * Allows the user to use uhtml directly from the xeito module
 * uhtml is a library to build declarative and reactive UI via template literals tags.
 * {@link https://github.com/WebReflection/uhtml}
 * Xeito uses uhtml to render the component template and update the DOM
 * Created by @WebReflection All credits to him
 */
export { render, html, svg, Hole };
export type { Renderable, TemplateFunction };