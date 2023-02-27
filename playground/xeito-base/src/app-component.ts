import { XeitoComponent, Component, State, html } from "@xeito/core";

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  @State() count: number = 0;

  render() {
    return html`
      <h1>Xeito default playground</h1>
      <button @click=${()=>this.count++}>Count is: ${this.count}</button>
    `;
  }

}
