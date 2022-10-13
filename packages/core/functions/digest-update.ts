import { domPatcher } from "../utils/dom-patcher";

/**
 * 
 * @param component Component class
 */
 export function digestUpdate (component: any) {
  if (component._vNode) {
    component._vNode = domPatcher(component._vNode, component.render());
  }
}