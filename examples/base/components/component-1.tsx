import { Xeito, Component, Emitter, State } from "../../../packages/core";
import { Emit } from "../../../packages/core/decorators/emit";
import { Prop } from "../../../packages/core/decorators/prop";

@Component()
export class Component1 {

  @Prop() sampleProp: number;;
  @Emit() customEvent: Emitter<number> = new Emitter<number>();
  @State() counter: number = 0;

  private timeout;

  constructor() {
    this.counter = this.sampleProp;
  }

  send() {
    this.customEvent.emit(Math.random());
  }

  onCreate() {
    this.timeout = setInterval(() => {
      this.counter++;
    }, 1000);
  }

  onDestroy() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <div className="component1">
        <p>Component 1 works and counter is: {this.counter}</p>
        <p>{this['id']}</p>
        <button onclick={() => this.send()}>Send!</button>
      </div>
    );
  }

}