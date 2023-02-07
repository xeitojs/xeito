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
        ${this.slotContent.default}
      `: null}
      ${!this.when && this.slotContent.else ? html`
        ${this.slotContent.else}
      `: null}
    `;
  }

}
