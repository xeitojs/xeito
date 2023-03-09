import { Component, XeitoComponent, html, State } from "@xeito/core";

@Component({
  selector: 'page-3'
})
export class Page3 extends XeitoComponent {

  @State() count: number = 0;

  render() {
    return html`
      <div>
        <h1>Page 3</h1>

        <router-slot/>
      </div>
    `;
  }

}
