import { LogValueAction } from './../actions/log-value-action';
import { Component, html } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";

@Component({
  selector: 'page-2',
  actions: [LogValueAction]
})
export class Page2Component extends XeitoComponent {

  render() {
    return html`
      <h1>
        ${this.use('log-value-action', 'Hello World')}
        Page 2
      </h1>
    `;
  }

}
