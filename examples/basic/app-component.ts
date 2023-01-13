import { Watch } from '@xeito/core/decorators/watch';
import { XeitoComponent, Component, html, State } from '../../packages/core';
import type { WatchUpdate } from '../../packages/core/interfaces/watch-update';
import { CounterComponent } from './counter-component';

@Component({
  selector: 'app-root',
  imports: [
    CounterComponent
  ]
})
export class AppComponent extends XeitoComponent {
    
  @State() $count = 0;
  @State() $name = 'John Doe';
  @State() $age = 30;

  @State() color: string = 'color: red';

  @Watch('$count', '$name')
  watchCount(update: WatchUpdate) {
    if (update.name === '$count') {
      console.log('count changed', update.value);
      this.color = 'color: #' + Math.floor(Math.random()*16777215).toString(16);
    }
    if (update.name === '$name') {
      console.log('name changed', update.value);
    }
  }

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  render() {
    return html`
      <h1 style=${this.color}>Hello World!</h1>
      <div>
        <button @click=${()=> this.$count++}>Count is: ${this.$count}</button>
        <button @click=${()=> this.$name = this.makeid(5) + ' ' + this.makeid(5)}>Name is: ${this.$name}</button>
      </div>
    `;
  }

}

//<counter-component count="7"></counter-component>
//<counter-component .count=${9}></counter-component>