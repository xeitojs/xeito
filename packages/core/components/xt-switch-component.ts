import { html } from "uhtml";
import { XeitoComponent } from "../classes/xeito-component";
import { Component } from "../decorators/component";
import { Prop } from "../decorators/prop";
import { State } from "../decorators/state";
import { Watch } from "../decorators/watch";

/**
 * The switch component
 * @example
 * <xt-switch .of=${value}>
 *  <div slot="1">1</div>
 *  <div slot="2">2</div>
 * </xt-switch>
 */
@Component({
  selector: 'xt-switch',
})
export class XtSwitchComponent extends XeitoComponent {

  @Prop() of: any;
  
  private parsedContent = {
    default: [],
  };

  onWillMount() {
    this.parseContent();
  }

  parseContent() {
    const children = Array.from(this.children);
    children.forEach((child: any) => {
      const condition = child.case;
      if (condition && condition !== 'default') {
        this.parsedContent[condition] = child;
      } else {
        this.parsedContent.default.push(child);
      }
    });
  }

  render() {
    return html`
      ${this.parsedContent[this.of] || this.parsedContent.default}
    `;
  }

}
