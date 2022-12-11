import { Component, html, State } from '../../../packages/core';
import { XeitoComponent } from '../../../packages/core/classes/xeito-component';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  render() {
    return html`
      <router-slot></router-slot>
    `;
  }

}