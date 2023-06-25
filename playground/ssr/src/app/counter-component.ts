import { Prop, Watch, XeitoComponent } from "@xeito/core";
import { Component, html } from "@xeito/core";

@Component({
  selector: 'app-counter',
})
export class CounterComponent extends XeitoComponent {

  @Prop() count: number = 0;

  @Watch('count')
  onCountChange() {
    console.log('count changed', this.count)
  }

  render() {
    return html`
      <button @click=${()=>this.count++}>Count is: ${this.count}</button>
    `;
  }

}
