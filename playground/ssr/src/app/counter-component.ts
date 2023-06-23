import { XeitoComponent } from "@xeito/core";
import { Component, State, html } from "@xeito/core";

@Component({
  selector: 'app-counter',
})
export class CounterComponent extends XeitoComponent {

  @State() count: number = 0;

  render() {
    return html`
      <button @click=${()=>this.count++}>Count is: ${this.count}</button>
    `;
  }

}
