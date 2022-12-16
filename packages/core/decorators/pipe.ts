import { PipeMetadata } from "../interfaces/pipe-metadata";

export function Pipe(pipeMetadata: PipeMetadata) {

  if (!pipeMetadata.selector) throw new Error('Pipe selector is required');
  
  return function _PipeDecorator<T extends {new(...args: any[]): {}}>(constructor: T) {
    
    (constructor as any).selector = pipeMetadata.selector;
    return class PipeClass extends constructor {

      selector: string = pipeMetadata.selector;
      previousValue: any;

      update(value: any, ...args: any[]) {
        if (value !== this.previousValue) {
          this.previousValue = value;
          return this['transform'](value, ...args);
        }
      }

    }
  }

}
