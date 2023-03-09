import { XeitoComponent, Component, html, State } from '../../../packages/core/index';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  @State() show: boolean = true;

  onWillMount() {
    setInterval(() => {
      this.show = !this.show;
    }, 1000)
  }

  render() {
    return html`
      <xt-if .when=${this.show}>
        <h1>App Component</h1>
      </xt-if>
      <router-slot />
    `;
  }

}
