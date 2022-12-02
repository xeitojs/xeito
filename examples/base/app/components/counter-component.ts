import { Component, html, State } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";
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
})
export class CounterComponent extends XeitoComponent {

  @Inject() greetService: GreetService;

  @State() count: number = 0;

  constructor() {
    super();
  }

  increment() {
    this.count++;
  }

  render() {
    return html`
      <div>
        <p>Counter component</p>
        <button class="custom-button" @click=${this.increment}>Count is: ${this.count}</button>
      </div>
    `;
  }

}
