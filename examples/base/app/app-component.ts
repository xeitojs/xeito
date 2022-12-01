import { Component, html } from '../../../packages/core';
import { XeitoComponent } from '../../../packages/core/classes/xeito-component';
import { CounterComponent } from './components/counter-component';

@Component({
  selector: 'app-root',
  imports: [
    CounterComponent
  ]
})
export class AppComponent extends XeitoComponent {

  render() {
    return html`
      <h1>Hello World</h1>
      <app-counter></app-counter>
    `;
  }

}