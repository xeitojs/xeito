import { html } from "uhtml";
import { XeitoComponent } from "../classes/xeito-component";
import { Component } from "../decorators/component";
import { Prop } from "../decorators/prop";

@Component({
  selector: 'xt-if'
})
export class XtIfComponent extends XeitoComponent {

  @Prop() when: boolean;

  render() {
    return html`
      ${this.when ? html`
        <div>${this.slotContent.default}</div>
      `: null}
      ${!this.when ? html`
        <div>${this.slotContent.else}</div>
      `: null}
    `;
  }

}
