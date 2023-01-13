import { render, html, svg, Hole, Renderable, TemplateFunction } from 'uhtml';

// Export Xeito Application Class
export { Xeito } from './classes/xeito';

// Export the Xeito Component Class
export { XeitoComponent } from './classes/xeito-component';

// Export the Xeito Plugin Class
export { XeitoPlugin } from './classes/xeito-plugin';

// Export core decorators
export { Action } from './decorators/action';
export { Component } from './decorators/component';
export { Event } from './decorators/event';
export { Global } from './decorators/global';
export { Pipe } from './decorators/pipe';
export { Prop } from './decorators/prop';
export { Ref } from './decorators/ref';
export { State } from './decorators/state';

// Export core interfaces
export type { Emitter } from './classes/emitter';
export type { ActionMetadata } from './interfaces/action-metadata';
export type { ActionResult } from './interfaces/action-result';
export type { ComponentMetadata } from './interfaces/component-metadata';
export type { ElementRef } from './interfaces/element-ref';
export type { EventConfig } from './interfaces/event-config';
export type { PipeMetadata } from './interfaces/pipe-metadata';
export type { PropChange } from './interfaces/prop-change';
export type { WatchUpdate } from './interfaces/watch-update';
export type { XeitoGlobal } from './interfaces/xeito-global';
export type { XeitoInternals } from './interfaces/xeito-internals';

/**
 * Re-export uhtml
 * Allows the user to use uhtml directly from the xeito module
 * uhtml is a library to build declarative and reactive UI via template literals tags.
 * {@link https://github.com/WebReflection/uhtml}
 * Xeito uses uhtml to render the component template and update the DOM
 * Created by @WebReflection - All credits to them
 */
export { render, html, svg, Hole };
export type { Renderable, TemplateFunction };