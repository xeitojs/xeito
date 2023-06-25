import { XeitoComponent, Component, State, html } from '@xeito/core';
import { CounterComponent } from './counter-component';
import { SlotterComponent } from './slotter-component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent, SlotterComponent]
})
export class AppComponent extends XeitoComponent {

  @State() count: number = 5;

  @State() serverDate: number = new Date().getTime();

  render() {
    return html`
      <h1>Xeito SSR playground</h1>
      <app-counter></app-counter>
      <app-counter count=${this.count}></app-counter>
      <app-counter .count=${this.count}></app-counter>
      <br>
      <app-slotter>
        <p>Default slot content</p>
        <p slot="start">Start slot content</p>
        <p slot="end">End slot content</p>
      </app-slotter>
    `;
  }

}
