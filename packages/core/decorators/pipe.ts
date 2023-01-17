import { PipeMetadata } from "../interfaces/pipe-metadata";

export function Pipe(pipeMetadata: PipeMetadata) {

  if (!pipeMetadata.selector) throw new Error('Pipe selector is required');
  
  return function _PipeDecorator<T extends {new(...args: any[]): {}}>(constructor: T) {
    
    (constructor as any).selector = pipeMetadata.selector;
    return class PipeClass extends constructor {

      selector: string = pipeMetadata.selector;
      previousValue: any;
      previousArgs: any[];
      previousResult: any;

      update(value: any, ...args: any[]) {
        if (value !== this.previousValue || args !== this.previousArgs) {
          this.previousValue = value;
          this.previousArgs = args;
          this.previousResult = this['transform'](value, ...args);
          return this.previousResult;
        } else {
          return this.previousResult;
        }
      }

      clean() {
        this.previousValue = null;
        this.previousArgs = null;
        this.previousResult = null;
        this['destroy'] && this['destroy']();
      }

    }
  }

}
