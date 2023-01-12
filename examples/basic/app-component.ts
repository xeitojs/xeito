import { XeitoComponent, Component, html, State } from '../../packages/core';
import { CounterComponent } from './counter-component';

@Component({
  selector: 'app-root',
  imports: [
    CounterComponent
  ]
})
export class AppComponent extends XeitoComponent {
    
  onDidMount() {

  }

  render() {
    return html`
      <h1>Hello World!</h1>
      <div>
        <counter-component count="7"></counter-component>
        <counter-component .count=${9}></counter-component>
      </div>
    `;
  }

}
