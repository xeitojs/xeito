import { Watch } from "@xeito/core/decorators/watch";
import { Component, html, Prop, XeitoComponent } from "../../packages/core";

@Component({
  selector: 'counter-component',
})
export class CounterComponent extends XeitoComponent {

  @Prop() count: number = 0;

  @Watch('count')
  watchCount(update) {
    console.log('count changed', update.value);
  }

  render() {
    return html`
      <button @click=${() => this.count++}>
        Count is: ${this.count}
      </button>
    `;
  }

}
