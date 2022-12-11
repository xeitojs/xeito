import { XeitoComponent, Component, html, Prop, State, Global } from '@xeito/core';
import type { XeitoRouter } from "../interfaces/xeito-router";

@Component({
  selector: 'router-link'
})
export class RouterLink extends XeitoComponent {
  
  @Global() router: XeitoRouter;
  @Prop() to: string;
  @Prop() state: Record<any, any>;

  handleClick(event: Event) {
    event.preventDefault();

    let url = this.to;
    if (!url) url = this.getAttribute('to');
    if (!url) url = this.getAttribute('href');
    if (!url) console.warn('No URL provided to router-link');

    this.router.push(this.router.createHref(this.to), this.state);
  }

  render() {
    return html`
      <a href="${this.to}" @click="${this.handleClick}">
        ${this.slotContent.default}
      </a>
    `;
  }
}
