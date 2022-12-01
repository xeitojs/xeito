import { render } from '../index';
import { XeitoComponent } from "./xeito-component";

export class Xeito {

  private _rootComponent: XeitoComponent;
  private _rootElement: HTMLElement;

  constructor (rootComponent: any) {
    this._rootComponent = new rootComponent();
  }

  public bootstrap(rootElement: HTMLElement) {
    this._rootElement = rootElement;
    render(this._rootElement, this._rootComponent);
  }

}
