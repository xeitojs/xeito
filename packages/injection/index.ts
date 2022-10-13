import 'reflect-metadata';

// Check if Reflect metadata is available
if (typeof Reflect === 'undefined' || typeof Reflect.getMetadata === 'undefined') {
  throw new Error('reflect-metadata shim is required when using class decorators');
}

// Export all the classes
export { Container } from './classes/container';
export { Registry } from './classes/registry';

// Export all the decorators
export { Inject } from './decorators/inject';
export { Injectable } from './decorators/injectable';
