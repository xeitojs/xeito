import { h, VNode, VNodeChildren, VNodeData } from "snabbdom";
import { RefRegistry } from "../classes/ref-registry";
import { flattenChildren } from "./flatten-children";
import { separateProps } from "./separate-props";

/**
 * Creates a virtual node
 * @param sel Component class or tag name
 * @param data Component props
 * @param children Component children
 * @returns {VNode} Virtual node
 */
export function createElement (sel: string | any, data: VNodeData = {}, ...children: VNodeChildren[]): VNode {

  if (sel.prototype) {
    if (sel.prototype.xeitoComponent) {

      const componentProps = data ?? {};
      componentProps.children = children;

      const component = new sel(componentProps);
      component._vNode = component.render();

      // Attach component hooks
      component._vNode.data.hook = {
        insert: (vNode) => {
          // Register component ref if it has one
          if (validateRefName(componentProps.ref)) {
            RefRegistry.registerRef(componentProps.ref, vNode.elm);
          }
          // Call component onInsert hook
          component.onCreate && component.onCreate();
        },
        update: () => {
          component.onUpdate && component.onUpdate();
        },
        destroy: () => {
          component.onDestroy && component.onDestroy();

          // Remove component ref if it has one
          if (validateRefName(componentProps.ref)) {
            RefRegistry.removeRef(componentProps.ref);
          }
        }
      };

      // Return the component's virtual node
      return component._vNode;
    } else {
      throw new Error(`Error rendering component: The component must be decorated with @Component`);
    }
  }
  
  // Register ref if it has one
  const hooks = {} as any;
  if (validateRefName(data?.ref)) {
    hooks.insert = (vNode) => {
      RefRegistry.registerRef(data?.ref, vNode.elm);
    };
    hooks.destroy = () => {
      RefRegistry.removeRef(data?.ref);
    };
  }

  const {props, events, styles, attrs, dataset} = separateProps(data);

  return h(sel, {props, on: events, style: styles, attrs, dataset, hook: hooks}, flattenChildren(children));

}

function validateRefName(refName: string): boolean {
  if (refName && typeof refName === 'string' && refName.length > 0) {
    return true;
  }
  return false;
}