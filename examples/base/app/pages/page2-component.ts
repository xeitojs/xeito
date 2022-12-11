import { Component, html } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";

@Component({
  selector: 'page-2'
})
export class Page2Component extends XeitoComponent {

  render() {
    return html`
      <h1>Page 2</h1>
    `;
  }

}
