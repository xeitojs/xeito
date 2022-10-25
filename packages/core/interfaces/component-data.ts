import { VNodeChildren } from "snabbdom";

/**
 * Component data
 * It contains the component's props, children and emitter listeners.
 * It's passed to the component's constructor
 * @interface ComponentData
 */
export interface ComponentData {
  props?: Record<string, any>;
  children?: VNodeChildren[];
  emitterListeners?: Record<string, Function>;
}
