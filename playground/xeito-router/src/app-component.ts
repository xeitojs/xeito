import { XeitoComponent, Component, html } from '../../../packages/core/index';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  render() {
    return html`
      <router-slot />
    `;
  }

}
