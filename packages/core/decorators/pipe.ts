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
        // Throw an error if the pipe does not implement the transform method
        if (!this['transform']) throw new Error('Pipe must implement transform method');

        // If the previous value is null or undefined, trigger the update
        if (value === null || this.previousValue === undefined) {
          return this.triggerUpdate(value, ...args);
        }

        // Check equality between the previous value and the new value with Object.is
        if (!Object.is(value, this.previousValue)) {
          // Check if the value is an array
          if (Array.isArray(value)) {
            // Check if both arrays are the same

            // Length check
            if (value.length !== this.previousValue.length) {
              return this.triggerUpdate(value, ...args);
            }

            // Check each item
            const equalArrays = value.every((item, index) => {
              // Check if the item is a function
              if (typeof item === 'function') {
                return item.toString() === this.previousValue[index].toString();
              }
              return Object.is(item, this.previousValue[index]);
            })

            if (!equalArrays) return this.triggerUpdate(value, ...args);
          } else {
            // If the value is not an array, we trigger the update with the new value
            return this.triggerUpdate(value, ...args);
          }
        }

        console.log('Same value, checking arguments')

        // If the value is the same, we perform the array check with the arguments
        if (this.previousArgs === null || args === undefined) {
          console.log('No previous args')
          return this.triggerUpdate(value, ...args);
        }

        // Check equality between the previous arguments and the new argument
        // Length check
        if (args.length !== this.previousArgs.length) {
          console.log('Different args length')
          return this.triggerUpdate(value, ...args);
        }

        // Check each item
        const equalArgs = args.every((arg, index) => {
          // Check if the arg is a function 
          if (typeof arg === 'function') {
            return arg.toString() === this.previousArgs[index].toString()
          };
          return Object.is(arg, this.previousArgs[index]);
        })
        if (!equalArgs) return this.triggerUpdate(value, ...args);

        // If the value and the arguments are the same, we return the previous result
        return this.previousResult;
      }
      
      triggerUpdate(value: any, ...args: any[]) {
        this.previousValue = value;
        this.previousArgs = args;
        this.previousResult = this['transform'](value, ...args);
        return this.previousResult;
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
