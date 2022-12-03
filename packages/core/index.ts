import 'reflect-metadata';
import { render, html, svg, Hole, Renderable, TemplateFunction } from 'uhtml';

// Export Xeito Application Class
export { Xeito } from './classes/xeito';

// Export core decorators
export { Component } from './decorators/component';
export { State } from './decorators/state';
export { Prop } from './decorators/prop';
export { Event } from './decorators/event';
export { Ref } from './decorators/ref';

// Export core interfaces
export type { ComponentMetadata } from './interfaces/component-metadata';
export type { ElementRef } from './interfaces/element-ref';
export type { AttributeChanges } from './interfaces/attribute-changes';
export type { ActionResult } from './interfaces/action-result';
export type { EventConfig } from './interfaces/event-config';

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