import { VNodeData } from "snabbdom";

/**
 * Separates the props and events from the data object
 * @param {VNodeData} data Attributes and events
 * @returns {any, any} Props and events
 */
export function separateProps (data: VNodeData): {props: any, events: any, styles: any, attrs: any, dataset: any} {
  const props = {};
  const events = {};
  const styles = {};
  const attrs = {};
  const dataset = {};

  for(let key in data) {
    if (key.startsWith('on')) {
      const event = key.substring(2).toLowerCase();
      events[event] = data[key];
    } 
    else if (key.startsWith('style')) {
      Object.assign(styles, data[key]);
    }
    else if(key.startsWith('attrs')) {
      Object.assign(attrs, data[key]);
    }
    else if(key.startsWith('dataset')) {
      Object.assign(dataset, data[key]);
    }
    else {
      props[key] = data[key];
    }
  }

  return {props, events, styles, attrs, dataset};
}
