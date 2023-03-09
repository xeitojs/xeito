import { XeitoComponent, Component, State, html } from '../../../packages/core/index';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  @State() count: number = 0;
  @State() nullValue: any = null;

  render() {
    return html`
      <h1>Xeito default playground</h1>
      <button @click=${()=>this.count++}>Count is: ${this.count}</button>
    `;
  }

}
