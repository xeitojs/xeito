import { XeitoComponent, Component, html, State } from '../../packages/core';
import { CounterComponent } from './counter-component';

@Component({
  selector: 'app-root',
  imports: [
    CounterComponent
  ]
})
export class AppComponent extends XeitoComponent {
    
  @State() count: number = 0;

  render() {
    return html`
      <h1>Hello World!</h1>
      <button @click=${()=>this.count++}>Count is: ${this.count}</button>
    `;
  }

}
