import { PropMetadata } from "../interfaces/prop-metadata";
import { State } from "./state";

/**
 * Property decorator
 * 
 * Syntactic sugar for the state decorator that always sets the prop metadata to true
 */
export function Prop(propMetadata?: PropMetadata) {

  return function _PropDecorator (target: any, key: string) {

    // Set the prop metadata to true
    let metadata = {...propMetadata};
    metadata.prop = true;

    // The prop decorator will always call the state decorator on the same property
    // This is because the prop decorator is just syntactic sugar for the state decorator
    State(metadata)(target, key);

  }

}
