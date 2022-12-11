import { Component, html } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";
import { Global } from "../../../../packages/core/decorators/global";
import type { XeitoRouter } from "../../../../packages/router/interfaces/xeito-router";

@Component({
  selector: 'page-1'
})
export class Page1Component extends XeitoComponent {

  @Global() router: XeitoRouter;

  render() {
    return html`
      <h1>Page 1</h1>

      <router-link .to="${'/page2'}" .state=${{data: 'superdata'}}>
        <span>Page2</span>
        <span slot="button">-></span>
      </router-link>


      <p>Stuff underneath</p>

      <router-slot></router-slot>
    `;
  }

}
