import { Prop, XeitoComponent } from "@xeito/core";
import { Component, html } from "@xeito/core";

@Component({
  selector: 'app-counter',
})
export class CounterComponent extends XeitoComponent {

  @Prop() count: number = 0;

  render() {
    return html`
      <button @click=${()=>this.count++}>Count is: ${this.count}</button>
    `;
  }

}
