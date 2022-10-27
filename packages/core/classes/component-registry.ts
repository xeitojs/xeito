import { VNodeChildren, VNodeData } from "snabbdom";
import { getComponentData } from "../functions/get-component-data";
import { ComponentData } from "../interfaces/component-data";
import { RefRegistry } from "./ref-registry";
import { nanoid } from 'nanoid';

export class ComponentRegistry {

  private static readonly componentMap = new Map<string, any>();

  /**
   * Checks if a component is registered in the registry
   * - If it is, it returns the component's instance
   * - If it isn't, it creates a new instance of the component and registers it before returning it
   * It also assigns a unique id to the component upon instantiation
   * @param sel 
   * @param data 
   * @param children 
   * @returns Component instance
   */
  public static registerComponent(sel: string | any, data: VNodeData = {}, ...children: VNodeChildren[]) {
    // Check if the component is already registered
    if (sel.id && this.componentMap.has(sel.id)) {
      return this.componentMap.get(sel.id);
    } else {
      const componentInstance = this.createComponentInstance(sel, data, ...children);
      this.componentMap.set(componentInstance.id, componentInstance);
      return componentInstance;
    }
  }

  public static updateComponentInstance(component: any) {
    this.componentMap.set(component.id, component);
  }

  /**
   * Creates a new component instance using the component's constructor and its data
   * @param sel 
   * @param data 
   * @param children 
   * @returns Component instance
   */
  private static createComponentInstance(sel: string | any, data: VNodeData = {}, ...children: VNodeChildren[]): any {
    // Create the component's data object
    const componentData: ComponentData = getComponentData(data, children);
    // Instantiate the component with its data
    const component = new sel(componentData);
    // Set id
    component.id = nanoid();
  
    // Render the component
    component._vNode = component.render();
    
    // Pass the component's data to the component
    component._vNode.data = data || {};

    // Attach component hooks
    component._vNode.data.hook = {
      init: () => {
        component.beforeCreate && component.beforeCreate();
      },
      insert: (vNode) => {
        // Register component ref if it has one
        if (this.validateRefName(componentData.props.ref)) {
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
        if (this.validateRefName(componentData.props.ref)) {
          RefRegistry.removeRef(componentData.props.ref);
        }
      }
    };

    // Return the component's instance
    return component;
  }

  /**
   * Validates a ref name
   * It's public so that it can be used by createElement in default vNodes
   * @param refName 
   * @returns 
   */
  public static validateRefName(refName: string): boolean {
    if (refName && typeof refName === 'string' && refName.length > 0) {
      return true;
    }
    return false;
  }


}