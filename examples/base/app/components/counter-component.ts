import { Component, html, State } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";
import { Inject } from "../../../../packages/injection/dist";
import { GreetService } from "../services/greet-service";

@Component({
  selector: 'app-counter'
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
        <button @click=${this.increment}>Count is: ${this.count}</button>
      </div>
    `;
  }

}
