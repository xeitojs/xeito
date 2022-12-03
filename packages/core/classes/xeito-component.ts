import { AttributeChanges } from '../interfaces/attribute-changes';
import { ActionResult } from '../interfaces/action-result';
import { Hole } from 'uhtml';

export class XeitoComponent extends HTMLElement {

  /**
   * Render method desgin to be overriden by the user
   */
  render(): Hole | void {}

  /**
   * On mount method desgined to be overriden by the user
   * Gets called when the component is mounted (connectedCallback)
   */
  onCreate() {}

  /**
   * On destroy method desgined to be overriden by the user
   * Gets called when the component is destroyed (disconnectedCallback)
   */
  onDestroy() {}

  /**
   * On changes method desgin to be overriden by the user
   * Gets called when an attribute changes (attributeChangedCallback)
   * @param { AttributeChanges } changes Attribute changes object
   */
  onChanges(changes: AttributeChanges) {}

  /**
   * Native attributeChangedCallback
   * Calls the onChanges method and requests an update of the component
   * @param name 
   * @param oldValue 
   * @param newValue 
   */
  attributeChangedCallback(this: any, name: string, oldValue: string, newValue: string) {

    const type = typeof this[name];
    
    switch(type) {
      case 'number':
        oldValue = Number(oldValue) as any;
        newValue = Number(newValue) as any;
        break;
      case 'boolean':
        oldValue = oldValue === 'true' ? true : false as any;
        newValue = newValue === 'true' ? true : false as any;
        break;
    }

    const changes: AttributeChanges = { name, oldValue, newValue };
    this.onChanges(changes);
    this.requestUpdate();
  }

  /**
   * Native connectedCallback
   * Calls the onMount method
   */
  connectedCallback() {
    this.onMount();
  }

  /**
   * Native disconnectedCallback
   * Calls the onDestroy method
   */
  disconnectedCallback() {
    this.onDestroy();
  }

  /**
   * Request an update of the component
   * Designed to be overriden by the @Component decorator at runtime
   */
  requestUpdate() {}

  /**
   * Use an action inside the component
   * Designed to be overriden by the @Component decorator at runtime
   * @param selector 
   * @param args 
   */
  use(selector: string, ...args: any[]): ActionResult | void {}
  
}
