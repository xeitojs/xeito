import { ComponentRegistry } from "../classes/component-registry";
import { domPatcher } from "../utils/dom-patcher";

/**
 * Re-renders a component and updates its instance in the registry
 * @param component Component class
 */
 export function digestUpdate (component: any) {
  if (component?._vNode) {
    component._vNode = domPatcher(component._vNode, component.render());
    ComponentRegistry.updateComponentInstance(component);
  }
}