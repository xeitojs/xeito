import { Component, html, State } from '../../../packages/core';
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
      <router-link to="/">
        <h1>App</h1>
      </router-link>
      <router-slot />
    `;
  }

}