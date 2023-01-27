import { Hole, html } from "uhtml";
import { XeitoComponent } from "../classes/xeito-component";
import { Component } from "../decorators/component";
import { Prop } from "../decorators/prop";
import { Watch } from "../decorators/watch";


@Component({
  selector: 'xt-for'
})
export class XtForComponent extends XeitoComponent {

  @Prop() of: any[];
  @Prop() each: (item: any, index: number) => Hole;

  listTemplate: Hole[];

  onWillMount() {
    this.computeTemplate();
  }

  @Watch('of')
  itemsChanged() {
    this.computeTemplate();
  }

  computeTemplate() {
    this.listTemplate = this.of.map((item: any, index: number) => {
      return this.each(item, index);
    });
  }

  render() {
    return html`
      ${
        this.listTemplate
      }
    `;
  }

}
