import { Component, XeitoComponent, html, State } from "@xeito/core";

@Component({
  selector: 'page-2'
})
export class Page2 extends XeitoComponent {

  @State() count: number = 0;

  render() {
    return html`
      <div>
        <h1>Page 2</h1>

        <router-slot/>
      </div>
    `;
  }

}
