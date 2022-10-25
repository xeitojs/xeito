import { VNodeChildren, VNodeData } from "snabbdom";
import { ComponentData } from "../interfaces/component-data";

/**
 * Returns the component's data from its props and children
 * It separates the props from the emitter listeners
 * @param {vNodeData} data 
 * @param {VNodeChildren[]} children 
 * @returns 
 */
export function getComponentData(data: VNodeData, children: VNodeChildren[]): ComponentData {

  // Initialize data if it's undefined
  data = data ?? {};

  const props = {};
  const emitterListeners = {};

  // Separate props from event listeners
  for(let key in data) {
    if (key.startsWith('on:')) {
      const event = key.substring(3);
      emitterListeners[event] = data[key];
    } else {
      props[key] = data[key];
    }
  }

  // Return component data
  return {
    props,
    children,
    emitterListeners
  };

}
