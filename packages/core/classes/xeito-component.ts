import { ActionResult } from '../interfaces/action-result';
import { Hole, render, Renderable } from '../';
import { XeitoInternals } from '../interfaces/xeito-internals';
import { isClient } from '../functions/is-client';
import { ComponentProps, ComponentSlots } from '../interfaces/component-data';

let _HTMLElement;
if (typeof window !== 'undefined') {
  _HTMLElement = HTMLElement;
} else {
  _HTMLElement = class HTMLElement {};
}

export class XeitoComponent extends _HTMLElement {
  
  /**
  * Xeito internals object
  * Will be populated by the @Component decorator 
  * with the component's metadata
  */
  private _XeitoInternals: XeitoInternals = {};
  
  private _DOMRoot: HTMLElement | ShadowRoot;
  public _template: Node | typeof Hole | Renderable | string;
  private _state: Map<string, any> = new Map();
  private _watchers: Map<string, string[]> = new Map();

  // Action controls
  private _IActionIndex: number = -1;
  private _actionInstances: any[] = [];

  // Pipe controls
  private _IPipeIndex: number = -1;
  private _pipeInstances: any[] = [];

  // Store controls
  private _stores: Map<string, any> = new Map();
  private _storeSubscriptions: Map<string, any> = new Map();

  // Dirty flag to manage batched updates
  private _dirty: boolean = false;
  
  /**
  * Global properties object (will be populated by the parent component or the Xeito instance)
  */
  public $global: Record<string, any>;
  
  /**
  * Slot Content
  * Will be populated by the constructor
  * It will contain the slotted content of the component
  * eg: <xeito-component><div slot="header">Header</div></xeito-component>
  * $slots.header will contain the div element
  * This can be accessed inside the render method
  * eg: html`<div>${this.$slots.header}</div>`
  */
  public $slots: ComponentSlots = {default: []};

  /**
   * Constructor props
   * Will be populated by the constructor with the props received from the parent component
   * This is used during SSR component initialization
   */
  private _constructorProps: Record<string, any> = {};
  
  constructor(componentProps?: ComponentProps, slots?: ComponentSlots) {
    super();
    
    // Set the default _XeitoInternals object as received from the decorator
    this._XeitoInternals = Object.assign({}, this.constructor.prototype._XeitoInternals);
    
    // Set the slotted content
    if (isClient()) this.$slots = this.getSlotContent();
    if (!isClient()) this.$slots = slots;

    // Set the constructor props
    this._constructorProps = componentProps || {};
    
    // Set the global property
    this.$global = this._XeitoInternals.global;
    
    // Assign the children global
    this.assignChildrenGlobal();

    // Assign pending watchers (set in the constructor by the @Watch decorator)
    const pendingWatchers = this.constructor.prototype._pendingWatchers;
    if (pendingWatchers) this._watchers = pendingWatchers;

    /** 
    * Set the root element to render the template in
    * If the component is not rendered in the client, set the root element as a string constructor
    */
    let DOMRoot: typeof _HTMLElement | String = this;
    if (!isClient()) DOMRoot = String;

    // Set the DOMRoot
    this._DOMRoot = DOMRoot;

    // Call the onInit method
    this.onInit();
  }

  /**
  * Native connectedCallback
  * Will be called when the component is connected to the DOM
  * 
  */
  connectedCallback() {
    // Wait for the global object to be populated
    // This avoids mounting the component on SSR markup before the app is bootstrapped
    if (this.$global) {
      // Call the onWillMount method
      this.onWillMount();
  
      // Bind the methods to the class instance
      this.bindMethods();
  
      // Render the component for the first time
      this._update();
  
      // Update props with the constructor props
      Object.keys(this._constructorProps).forEach((prop: string) => {
        this.setProp(prop, this._constructorProps[prop]);
      });
  
      // Call the onDidMount method
      this.onDidMount();
    }
  }
  
  /**
  * Get the slotted content of the component
  * @returns { Record<string, any> } Slot content object
  */
  private getSlotContent(): ComponentSlots {
    const slotContent: ComponentSlots = {
      default: []
    };
    const children: ChildNode[] = Array.from(this.childNodes);
    
    if (children) {
      for(let child in children) {
        const childEl = children[child] as Element | Node;
        
        if (childEl.nodeType === Node.TEXT_NODE || childEl.nodeType === Node.COMMENT_NODE) {
          slotContent.default.push(childEl);
        } else {
          const slot = (childEl as Element).getAttribute('slot');
          if (slot) {
            if (!slotContent[slot]) slotContent[slot] = [];
            slotContent[slot].push(childEl);
          } else {
            if (!slotContent.default) slotContent.default = [];
            slotContent.default.push(childEl);
          }
        }
      }
    }
    
    return slotContent;
  }
  
  /**
  * Assign children global
  * Assigns the global property to the children of the component
  */
  private assignChildrenGlobal() {
    this._XeitoInternals.imports?.forEach((child: typeof XeitoComponent) => {
      child.prototype._XeitoInternals.global = this.$global;
    });
  }
  
  /**
  * Bind methods
  * Binds the methods of the component to the component itself
  * This is done to avoid having to wrap the methods in arrow functions
  * eg: onClick={this.onClick} instead of onClick={() => this.onClick()}
  * NOTE: Arrow functions are still required to pass data to the method or native events
  * eg: onClick={() => this.onClick(data)} or onClick={(e) => this.onClick(e)}
  */
  private bindMethods() {
    const methods = Object.getOwnPropertyNames(this.constructor.prototype);
    methods.forEach((method: string) => {
      if (method !== 'constructor' && method !== 'render' && typeof this[method] === 'function') {
        this[method] = this[method].bind(this);
      }
    });
  }

  /**
  * Request an update of the component
  * This will schedule an update of the template (batching updates by using a promise)
  */
  requestUpdate() {
    if (!this._dirty) {
      this._dirty = true;
      queueMicrotask(() => {
        this._update();
        this._dirty = false;
      });
    }
  }

  /**
   * Force an update of the component (no batching)
   * This will update the template immediately without batching
   * This should be used with caution as it can cause performance issues
   */
  forceUpdate() {
    this._update();
  }

  /**
   * Update the component
   * This will render the template and update the DOM
   * It will also reset the pipe index before rendering
   */
  private _update() {
    // Reset the pipe index
    this._IPipeIndex = -1;
    // Reset the action index
    this._IActionIndex = -1;

    // Render the template
    this._template = render(this._DOMRoot, this.render() as Renderable);
  }

  /**
   * Sets a state value and triggers an update if needed
   * @param key Key of the state to set
   * @param value Value to set
   * @param triggerUpdate Whether to trigger an update or not
   */
  setState(key: string, value: any) {

    // Check if the state has been set before to avoid unnecessary updates
    if (this._state.has(key)) {

      // Check if the value is the same as the current one to avoid unnecessary updates
      if (this._state.get(key) === value) return;

      // Set the state
      this._state.set(key, value);

      // Trigger the watchers for the key is there are any
      this._watchers.get(key)?.forEach((watcher: string) => {
        this[watcher]({ name: key, value });
      });

      this.requestUpdate();
    } else {
      // If the state hasn't been set before, set it
      this._state.set(key, value);
    }

    
  }

  /**
   * Returns the value of a state key
   * @param key Key of the state to get
   * @returns Value of the state key
   */
  getState(key: string): any {
    return this._state.get(key)
  }

  /**
   * Sets a prop value and triggers an update
   * Synthax sugar for setState to make it more intuitive in the decorator
   * @param key Key of the prop to set
   * @param value Value to set
   */
  setProp(key: string, value: any) {
    this.setState(key, value);
  }

  /**
   * Returns the value of a prop key
   * @param key Key of the prop to get
   * @returns Value of the prop key
   */
  getProp(key: string): any {
    // Check if there is a value stored in the state map
    const value = this._state.get(key);
    if (value === undefined) {
      // If there isn't, check if there is an attribute with the same name
      const attr = this.getAttribute(key);
      if (attr) {
        // If there is, set the prop value to the attribute value
        this.setProp(key, attr);
        return attr;
      } else {
        // If there isn't, return undefined
        return undefined;
      }
    } else {
      // If there is, return the value
      return value;
    }
  }

  /**
   * Sets a store and subscribes to it to trigger updates when it changes
   * @param key Key of the property that contains the store
   * @param store The store to set
   */
  setStore(key: string, store: any) {
    // Check if there is a store already set for the key
    if (this._stores.has(key)) {
      // If there is, unsubscribe from it
      this._storeSubscriptions.get(key)?.unsubscribe();
    }
    
    // Create a new subscription to the store
    const subscription = store.subscribe(() => {
      // We get a value upon subscription
      if (!this._stores.has(key)) {
        // If the store hasn't been set before, set it (without requesting an update)
        this._stores.set(key, store);
      } else {
        // If the store has been set before, request an update
        this.requestUpdate();
      }
    });

    this._storeSubscriptions.set(key, subscription);
  }

  /**
   * Returns the store for the given key
   * @param key Key of the property that contains the store
   * @returns The store
   */
  getStore(key: string): any {
    return this._stores.get(key);
  }

  /**
  * Use method (Use an action inside the component)
  * The '$use' method is used to provide actions to the template
  * Actions have to be provided in the Component decorator options
  * eg: @Component({ actions: [Action1, Action2] })
  * Actions can be used in the template by using the '$use' method
  * Actions receive the parent element as the first argument
  * eg: <div>${this.$use('action1', arg1, arg2)}</div>
  * @param selector 
  * @param args 
  * @returns 
  */
  $use(selector: string, ...args: any[]): ActionResult | void {
    return (e: HTMLElement) => {
      // Increment the action index (used to keep track of the actions as they are called by the template)
      this._IActionIndex++;
      // Check if the action has been instantiated
      if (this._actionInstances[this._IActionIndex]) {
        // If it has, call the clean method and update method
        this._actionInstances[this._IActionIndex].clean();
        return this._actionInstances[this._IActionIndex].update(e.parentElement, ...args);
      } else {
        // If it hasn't, find the action and instantiate it

        // Check if the selector is a local action
        let action = this._XeitoInternals.actions?.find((action: any) => action.selector === selector);
        if (!action) {
          // Check if the selector is a global action
          action = this.$global.actions?.find((action: any) => action.selector === selector);
        }

        if (action) {
          // Instantiate the action
          this._actionInstances[this._IActionIndex] = new action();
          // Return the value
          return this._actionInstances[this._IActionIndex].update(e.parentElement, ...args);
        } else {
          throw new Error(`Action '${selector}' not found in component '<${this._XeitoInternals.selector}>', did you forget to add it to the actions array or install the plugin?`);
        } 
      }
    }
  }

  /**
   * Pipe method (Use a pipe inside the component)
   * The '$pipe' method is used to provide pipes to the template
   * Pipes have to be provided in the Component decorator options
   * eg: @Component({ pipes: [Pipe1, Pipe2] })
   * Pipes can be used in the template like:
   * <div>${this.$pipe('pipe1', 'value1')}</div>
   * <div>${this.$pipe('pipe2', 'value2', 'value3')}</div> 
   * @param selector 
   * @param args 
   * @returns 
   */
  $pipe(selector: string, ...args: any[]): any {
    return (()=>{
      // Increment the pipe index (used to keep track of the pipes as they are called by the template)
      this._IPipeIndex++;
      // Check if the pipe has been instantiated
      if (this._pipeInstances[this._IPipeIndex]) {
        // If it has, call the update and return the value
        return this._pipeInstances[this._IPipeIndex].update(...args);
      } else {
        // If it hasn't, find the pipe and instantiate it

        // Check if the selector is a local pipe
        let pipe = this._XeitoInternals.pipes?.find((pipe: any) => pipe.selector === selector);
        if (!pipe) {
          // Check if the selector is a global pipe
          pipe = this.$global.pipes?.find((pipe: any) => pipe.selector === selector);
        }

        if (pipe) {
          // Instantiate the pipe
          this._pipeInstances[this._IPipeIndex] = new pipe();
          // Call the update and return the value
          return this._pipeInstances[this._IPipeIndex].update(...args);
        } else {
          throw new Error(`Pipe '${selector}' not found in component '<${this._XeitoInternals.selector}>', did you forget to add it to the pipes array or install the plugin?`);
        }
      }
    })();
  }
  
  /**
  * Native attributeChangedCallback
  * Calls the onChanges method and requests an update of the component
  * @param name 
  * @param oldValue 
  * @param newValue 
  */
  attributeChangedCallback(this: any, name: string, oldValue: string, newValue: string) {
    // Set the prop
    this.setProp(name, newValue);
  }
  
  /**
  * Native disconnectedCallback
  * Calls the onWillUnmount method
  */
  disconnectedCallback() {
    this.onUnmount();

    // Clean the actions and pipes
    this._actionInstances.forEach((action: any) => action.clean());
    this._pipeInstances.forEach((pipe: any) => pipe.clean());
    // Unsubscribe from the stores
    this._storeSubscriptions.forEach((subscription: any) => subscription.unsubscribe());
  }
  
  /**
  * Render method desgin to be overriden by the user
  */
  render(): typeof Hole | void {}
  
  /**
   * Lifecycle methods desgin to be overriden by the user
   * onInit: Called when the component is initialized (constructor)
   * onWillMount: Called before the first render (connectedCallback)
   * onDidMount: Called after the first render (connectedCallback)
   * onUnmount: Called when the component is unmounted (disconnectedCallback)
   */
  onInit(): any {}
  onWillMount(): any {}
  onDidMount(): any {}
  onUnmount(): any {}
}
