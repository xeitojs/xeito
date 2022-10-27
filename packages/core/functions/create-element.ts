import { h, VNode, VNodeChildren, VNodeData } from "snabbdom";
import { ComponentRegistry } from "../classes/component-registry";
import { RefRegistry } from "../classes/ref-registry";
import { ComponentData } from "../interfaces/component-data";
import { flattenChildren } from "./flatten-children";
import { getComponentData } from "./get-component-data";
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
      const component = ComponentRegistry.registerComponent(sel, data, ...children);
      return component._vNode;
    } else {
      throw new Error(`Error rendering component: The component must be decorated with @Component`);
    }
  }
  
  // Register ref if it has one
  const hooks = {} as any;
  if (ComponentRegistry.validateRefName(data?.ref)) {
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