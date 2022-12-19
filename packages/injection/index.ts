
/**
 * Injection module for Xeito Framework
 * Can be used to inject services into components
 * eg: @Inject() greetService: GreetService; (Decorator will use the property name as service name to look for)
 * eg: @Inject('greetService') greetService: GreetService; (Decorator will use the string as service name to look for)
 * 
 * To create a service, use the Injectable decorator
 * eg: @Injectable({ selector: 'greetService' }) export class GreetService { ... }
 */

// Export core class (Registry)
export { Registry } from './classes/registry';

// Export decorators
export { Injectable } from './decorators/injectable';
export { Inject } from './decorators/inject';

// Export interfaces
export type { InjectableMetadata } from './interfaces/injectable-metadata';
