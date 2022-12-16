import { Component, html, State } from "../../../../packages/core";
import { XeitoComponent } from "../../../../packages/core/classes/xeito-component";
import { Global } from "../../../../packages/core/decorators/global";
import type { XeitoRouter } from "../../../../packages/router/interfaces/xeito-router";
import { CounterComponent } from "../components/counter-component";
import { UppercasePipe } from "../pipes/uppercase-pipe";

@Component({
  selector: 'page-1',
  imports: [
    CounterComponent
  ],
  pipes: [
    UppercasePipe
  ]
})
export class Page1Component extends XeitoComponent {

  @Global() router: XeitoRouter;
  @State() params: string = 'initial value';

  @State() stringToTriggerPipe: string = 'sample text';
  private holder: string;

  onCreate() {
    console.dir(this);
  }

  goToRoot() {
    this.router.push('/page1');
  }

  goToPage3() {
    this.router.push(`/page1/${this.params}/page3`);
  }

  render() {
    return html`
      <h1 @click=${this.goToRoot} style="cursor:pointer">Page 1</h1>

      <router-link .to="${'/page2'}" .state=${{data: 'superdata'}} class="no-link">
        <span>Page2</span>
        <span slot="button">-></span>
      </router-link>

      <br>
      <input type="text" @input=${(e)=>this.params = e.target.value} value=${this.params}>
      <button @click=${this.goToPage3}>Go to page 3</button>

      <br>
      <input type="text" @input=${(e)=>this.stringToTriggerPipe = e.target.value} value=${this.stringToTriggerPipe}>

      <p>${this.pipe('uppercase', this.stringToTriggerPipe, {data: 'somedata'})}</p>
      <p>${this.pipe('uppercase', 'fixed string', {data: 'somedata'})}</p>

      <app-counter />

      <router-slot></router-slot>
    `;
  }

}
