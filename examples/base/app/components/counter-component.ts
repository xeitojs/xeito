import { Component, html, State } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";

@Component({
  selector: 'app-counter'
})
export class CounterComponent extends XeitoComponent {

  @State() count: number = 0;

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
