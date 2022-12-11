import { ElementRef } from "../interfaces/element-ref";

/**
 * Ref decorator
 * It only returns an object of type ElementRef which is just an object with a current property
 * The current property is the element reference that gets popuplated upon rendering
 * 
 * User could achieve the same result with an empty object declaration
 * But this decorator is more readable than having an empty object declaration in the class
 * 
 * @returns {PropertyDecorator}
 */
export function Ref() {

  return function _RefDecorator(target: any, key: any) {

    // Previous value of the property
    let _val: ElementRef = target[key] ?? {};

    Object.defineProperty(target, key, {
      get: function() {
        return _val;
      },
      set: function(value) {
        _val = value;
      }
    })
    
  }

}
