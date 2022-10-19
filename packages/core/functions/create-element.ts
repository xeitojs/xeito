import { h, VNode, VNodeChildren, VNodeData } from "snabbdom";
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
      return component._vNode;
    } else {
      throw new Error(`Error rendering component: The component must be decorated with @Component`);
    }
  }

  const {props, events, styles, attrs, dataset} = separateProps(data);

  return h(sel, {props, on: events, style: styles, attrs, dataset}, flattenChildren(children));

}