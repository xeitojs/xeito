import { h, VNode, VNodeChildren, VNodeData } from "snabbdom";
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

      // Create the component's data object
      const componentData: ComponentData = getComponentData(data, children);

      // Instantiate the component with its data
      const component = new sel(componentData);

      // Render the component
      component._vNode = component.render();

      // Attach component hooks
      component._vNode.data.hook = {
        init: () => {
          component.beforeCreate && component.beforeCreate();
        },
        insert: (vNode) => {
          // Register component ref if it has one
          if (validateRefName(componentData.props.ref)) {
            RefRegistry.registerRef(componentData.props.ref, vNode.elm);
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
          if (validateRefName(componentData.props.ref)) {
            RefRegistry.removeRef(componentData.props.ref);
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