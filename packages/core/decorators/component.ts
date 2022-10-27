import { ComponentData } from "../interfaces/component-data";

export function Component() {
  
  return function _DecoratorName<T extends {new(...args: any[]): {}}>(constr: T) {
    
    // Mark the component as a xeito component
    constr.prototype.xeitoComponent = true;

    // Create the component's properties
    constr.prototype.props = constr.prototype.props || {};
    constr.prototype.emitterListeners = constr.prototype.emitterListeners || {};
    constr.prototype.children = constr.prototype.children || [];
    constr.prototype.id = constr.prototype.id || null;

    return class extends constr {
      constructor(...args: any) {

        // Assign component data
        const componentData: ComponentData = args[0] || {};
        constr.prototype.props = componentData.props || {};
        constr.prototype.children = componentData.children || {};
        constr.prototype.emitterListeners = componentData.emitterListeners || {};

        // Call the original constructor
        super(componentData);
      }
    }
  }

}
