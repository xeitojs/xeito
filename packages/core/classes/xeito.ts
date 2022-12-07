import { BehaviorSubject } from 'rxjs';
import { render } from '../index';
import { XeitoComponent } from "./xeito-component";

export class Xeito {

  private _rootComponent: XeitoComponent | any;
  private _rootElement: HTMLElement;

  public globalProperties: Record<string, any> = {};

  constructor (rootComponent: any) {
    // Set the root component
    this._rootComponent = rootComponent;
  }

  public bootstrap(rootElement: HTMLElement) {
    // Set the root element
    this._rootElement = rootElement;

    // Set the Xeito instance on the root component
    this._rootComponent.prototype._XeitoInternals.xeitoGlobal = this.globalProperties;

    // Render the root component
    render(this._rootElement, new this._rootComponent());
  }

  public registerPlugin(plugin: any, options?: any) {
    // Check if plugin has an install method
    if (plugin.install) {
      plugin.install(this, options);
    }
  }

}
