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
export { Watch } from './decorators/watch';

// Export core pipes
export { XtSwitch } from './pipes/xt-switch';
export { XtWhen } from './pipes/xt-when';
export { XtFor } from './pipes/xt-for';

// Export core interfaces
export type { Emitter } from './classes/emitter';
export type { ActionMetadata } from './interfaces/action-metadata';
export type { ActionResult } from './interfaces/action-result';
export type { ComponentMetadata } from './interfaces/component-metadata';
export type { ElementRef } from './interfaces/element-ref';
export type { EventConfig } from './interfaces/event-config';
export type { PipeMetadata } from './interfaces/pipe-metadata';
export type { WatchUpdate } from './interfaces/watch-update';
export type { XeitoGlobal } from './interfaces/xeito-global';
export type { XeitoInternals } from './interfaces/xeito-internals';
export type { ComponentSlots } from './interfaces/component-data';
export type { ComponentProps } from './interfaces/component-data';

// Export util functions
export { isClient } from './functions/is-client';

/**
 * Re-export uhtml
 * Allows the user to use uhtml directly from the xeito module
 * uhtml is a library to build declarative and reactive UI via template literals tags.
 * {@link https://github.com/WebReflection/uhtml}
 * Xeito uses uhtml to render the component template and update the DOM
 * Created by @WebReflection - All credits to them
 */
let uhtml;
(async () => {
  try {
    // Check if this is a browser environment
    if (typeof window !== 'undefined') {
      // Import uhtml
      uhtml = import('uhtml');
    } else {
      // Import uhtml-ssr
      uhtml = import('uhtml-ssr');
    }
  } catch (error) {
    throw new Error(error);
  }
})();

// Export uhtml for SSR and browser
export const { html, svg, render, ssr, Hole } = await uhtml;
export type { Renderable, TemplateFunction } from 'uhtml';
