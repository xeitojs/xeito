import { ActionMetadata } from "../interfaces/action-metadata";

export function Action(actionMetadata: ActionMetadata) {
  return function(target: any) {
    target.selector = actionMetadata.selector;
  }
}
