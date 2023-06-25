import { Component, XeitoComponent, html } from "@xeito/core";

@Component({
  selector: 'app-slotter',
})
export class SlotterComponent extends XeitoComponent {

  render() {
    return html`
      <div style="display:flex;">
        <div class="slot-start" style="width: 15%">
          ${this.$slots.start}
        </div>
        <div class="slot-default" style="flex-grow: 1">
          ${this.$slots.default}
        </div>
        <div class="slot-end" style="width: 15%">
          ${this.$slots.end}
        </div>
      </div>
    `;
  }

}
