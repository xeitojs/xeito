import { Component, html, Prop, State } from "../../../../packages/core";
import type { ElementRef } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";
import { Ref } from "../../../../packages/core/decorators/ref";
import { Inject } from "../../../../packages/injection/dist";
import { GreetService } from "../services/greet-service";

@Component({
  selector: 'app-counter',
  styles: [
    `.custom-button { 
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
    }`,
  ],
  shadow: false
})
export class CounterComponent extends XeitoComponent {

  //@Inject() greetService: GreetService;
  @State() count: number = 0;
  @State() arrayValue = [1, 2, 3];
  //@Ref() elementRef: ElementRef;

  onCreate() {
    console.dir(this);
  }

  increment() {
    this.count++;
    this.arrayValue.push(this.arrayValue.length + 1);
  }

  render() {
    return html`
      <div>
        <p>Counter component</p>
        ${this.arrayValue?.map((item) => html`<p>${item}</p>`)}
        <button class="custom-button" @click=${this.increment}>Count is: ${this.count}</button>
      </div>
    `;
  }

}
