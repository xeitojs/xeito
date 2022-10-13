import { domPatcher } from './../utils/dom-patcher';
import { VNode } from "snabbdom";

let rootVNode: VNode;

/**
 * Renders a virtual node into the DOM
 * @param {VNode | Element | DocumentFragment} oldVnode Original virtual node
 * @param {VNode} vnode New virtual node 
 */
export function render (oldVnode: VNode | Element | DocumentFragment, vnode: VNode): void {
  
  if (!rootVNode) {
    rootVNode = oldVnode as VNode;
  }

  rootVNode = domPatcher(oldVnode, vnode);
}