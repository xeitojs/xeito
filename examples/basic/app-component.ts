import { XeitoComponent, Component, html, State } from '../../packages/core';
import { MixedStore } from '../../packages/store/classes/mixed-store';
import { ReadStore } from '../../packages/store/classes/read-store';
import { WriteStore } from '../../packages/store/classes/write-store';
import { CounterComponent } from './counter-component';

@Component({
  selector: 'app-root',
  imports: [
    CounterComponent
  ]
})
export class AppComponent extends XeitoComponent {
    
  @State() counter = new WriteStore(0);
  @State() derived = new MixedStore(this.counter, (counter) => counter * 2);

  readCounter = new WriteStore(1);
  readCounter2 = new WriteStore(0);

  custom = new MixedStore([this.readCounter, this.readCounter2], ([one, two]) => {
    return one + two;
  });

  sub = this.custom.subscribe((val) => console.log(val));

  reset() {
    this.readCounter2.set(this.readCounter2.value + 1)
    this.counter.set(0);
  }

  increment() {
    this.counter.update(n => n + 1);
  }

  decrement() {
    this.counter.update(n => n - 1);
  }

  render() {
    return html`
      <h1>Hello World!</h1>
      <h2>The count is: ${this.counter.value}</h2>
      <p>Derived: ${this.derived.value}</p>
      <div>
        <button @click=${this.reset}>Reset</button>
        <button @click=${this.decrement}>-</button>
        <button @click=${this.increment}>+</button>
      </div>
    `;
  }

}
