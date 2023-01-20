import { Component, html, Prop, State } from "../../../../packages/core";
import type { ElementRef } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";
import { Ref } from "../../../../packages/core/decorators/ref";
import { GreetService } from "../services/greet-service";
import { Inject } from "../../../../packages/injection";

@Component({
  selector: 'app-counter',
  shadow: true
})
export class CounterComponent extends XeitoComponent {

  @Inject() greetService: GreetService;
  @State() count: number = 0;
  @State() arrayValue = [1, 2, 3];
  @Ref() elementRef: ElementRef;

  @Prop() name: any;

  onWillMount() {
    //console.log(this.greetService.greet('Xeito'));
  }

  onChanges(changes: any) {
    console.log(this.name)
  }

  increment() {
    this.count++;
  }

  addElement() {
    this.arrayValue = [...this.arrayValue, this.arrayValue.length + 1];
  }

  render() {
    return html`
      <style>
        .custom-button { 
          background-color: #2b2b2b;
          color: #fff;
          border: 0;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        }
        .custom-button:hover {
          background-color: #1b1b1b;
          box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.8);
        }
      </style>
      <div ref=${this.elementRef}>
        <p>Counter component: ${this.name.value}</p>
        ${this.arrayValue.map((item) => html`<p>${item}</p>`)}
        <button class="custom-button" @click=${this.increment}>Count is: ${this.count}</button>
        <button class="custom-button" @click=${this.addElement}>Add item to array</button>
      </div>
    `;
  }

}
