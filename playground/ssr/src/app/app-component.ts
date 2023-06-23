import { XeitoComponent, Component, State, html } from '@xeito/core';
import { CounterComponent } from './counter-component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent]
})
export class AppComponent extends XeitoComponent {

  @State() count: number = 5;

  render() {
    return html`
      <h1>Xeito default playground</h1>
      <app-counter></app-counter>
      <app-counter count=${this.count}></app-counter>
      <app-counter .count=${this.count}></app-counter>
    `;
  }

}
