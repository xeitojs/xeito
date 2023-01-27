import { render } from '../index';
import { XeitoGlobal } from '../interfaces/xeito-global';
import { XeitoPlugin } from './xeito-plugin';
import { XtForComponent } from '../components/xt-for-component';
import { XtIfComponent } from '../components/xt-if-component';
import { XtSwitchComponent } from '../components/xt-switch-component';
import { XeitoGlobalConfig } from '../interfaces/xeito-global-config';

export class Xeito {

  private _rootElement: HTMLElement;
  private plugins: Array<XeitoPlugin> = [];

  public global: XeitoGlobal = {
    properties: {},
    components: [],
    actions: [],
    pipes: [],
    styleSheets: [],
    config: {shadow: true},
  };

  constructor (rootComponent: any, globalConfig?: XeitoGlobalConfig) {
    // Add the root component to the global components array
    this.global.components.push(rootComponent);

    // If global config is provided, add it to the global config
    if (globalConfig) this.global.config = globalConfig;

    // Register default global components
    this.global.components.push(XtForComponent);
    this.global.components.push(XtIfComponent);
    this.global.components.push(XtSwitchComponent);
  }

  /**
   * 
   * @param rootElement The root element to render the root component in (can be a string selector)
   */
  public bootstrap(rootElement: HTMLElement | string) {
    let element: HTMLElement | Element | string = rootElement;

    // Check if the root element is a string selector and get the element
    if (typeof rootElement === 'string') {
      element = document.querySelector(rootElement);
    }
    
    // Set the root element
    this._rootElement = element as HTMLElement;

    // Attach the global object to all the global components
    this.attachGlobal();

    // Render the root component
    render(this._rootElement, new (this.global.components[0] as any)());
  }

  /**
   * Register a plugin to the Xeito instance
   * @param plugin The plugin class to register
   * @param options The options to pass to the plugin install method
   */
  public usePlugin(plugin: any, options?: any) {
    const pluginInstance = new plugin(this);
    pluginInstance.install(options);
    this.plugins.push(pluginInstance);
  }

  /**
   * 
   */
  public useStyleSheet(styleSheet: CSSStyleSheet) {
    this.global.styleSheets.push(styleSheet);
  }

  /**
   * Attaches the global object to all the global components
   * Including the root component (which is a global component)
   * This is called during the bootstrap process
   */
  private attachGlobal() {
    this.global.components.forEach((component: any) => {
      component.prototype._XeitoInternals.global = this.global;
    });
  }

}
