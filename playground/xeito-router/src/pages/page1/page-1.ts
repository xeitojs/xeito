import { Component, XeitoComponent, html, State } from "@xeito/core";

@Component({
  selector: 'page-1'
})
export class Page1 extends XeitoComponent {

  @State() count: number = 0;

  render() {
    return html`
      <div>
        <h1>Page 1</h1>

        <router-slot/>
      </div>
    `;
  }

}
