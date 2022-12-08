import { Xeito } from "./xeito";

export class XeitoPlugin {

  private _xeito: Xeito;

  constructor(xeito: Xeito) {
    this._xeito = xeito;
  }

  /**
   * Install method called by Xeito when the plugin is registered
   * Designed to be overriden by the plugin author
   * @param {any} options The options passed to the plugin when it was registered
   */
  public install(options?: any) {}

  /**
   * Register a global action that can be used in any component
   * @param {string} selector The selector of the action
   * @param {any} action The action function
   */
  public registerGlobalAction(selector: string, action: any) {
    this._xeito.global.actions[selector] = action;
  }

  /**
   * Register a global property that can be used in any component
   * @param {string} selector The selector of the property
   * @param {any} property The property value
   */
  public registerGlobalProperty(selector: string, property: any) {
    this._xeito.global.properties[selector] = property;
  }

  /**
   * Register a global component that can be used in any component without importing it
   */
  public registerGlobalComponent(component: any) {
    // Check if the component extends XeitoElement
    if (!component.prototype.attachShadow) {
      throw new Error(`Invalid component, did you forget to extend XeitoElement in global component?`);
    }

    // Check if the component has the _XeitoInternals property (added by the @Component decorator)
    if (!component.prototype._XeitoInternals) {
      throw new Error(`Invalid component, did you forget to add the @Component decorator in global component?`);
    }

    // Add the component to the global components array
    this._xeito.global.components.push(component);
  }

}
