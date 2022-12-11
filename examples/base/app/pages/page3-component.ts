import { Component, html } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";

@Component({
  selector: 'page-3'
})
export class Page3Component extends XeitoComponent {

  render() {
    return html`
      <h1>Page 3</h1>

      <router-slot></router-slot>
    `;
  }

}
