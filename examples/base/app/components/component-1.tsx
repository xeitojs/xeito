import { Xeito, Component, Emitter, State } from "../../../../packages/core";
import { Emit } from "../../../../packages/core/decorators/emit";
import { Prop } from "../../../../packages/core/decorators/prop";
import { Component2 } from "./component2";

@Component()
export class Component1 {

  @Prop() sampleProp: number;;
  @Emit() customEvent: Emitter<number> = new Emitter<number>();
  @State() counter: number = 0;
  @State() counter2: number = 0;

  private timeout;

  constructor() {
    this.counter = this.sampleProp;
  }

  send() {
    this.customEvent.emit(Math.random());
  }

  increase() {
    this.counter2++;
  }

  onCreate() {
    //console.log('Component 1 created');
    //this.timeout = setInterval(() => {
    //  this.counter++;
    //}, 1000);
  }

  onDestroy() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <div className={`component1`}>
        <p>Component 1 works and counter is: {this.counter}</p>
        <p>Counter2: {this.counter2}</p>
        <p>{this['id'] ?? 'No id'}</p>
        <button onclick={() => this.send()}>Send!</button>
        <button onclick={() => this.increase()}>Increase!</button>
      </div>
    );
  }

}