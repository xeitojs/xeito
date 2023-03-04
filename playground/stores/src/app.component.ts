import { XeitoComponent, Component, html, State } from "../../../packages/core";
import { ReadStore, WriteStore, DerivedStore } from '../../../packages/store';

@Component({
  selector: 'app-root',
})
export class AppComponent extends XeitoComponent {

  writeStore1 = new WriteStore(0);
  writeStore2 = new WriteStore(0);

  @State() readStore1 = new ReadStore(this.writeStore1, (set) => {
    const timer = setInterval(() => {
      set(Math.floor(Math.random() * 1000));
    }, 1000);

    return () => clearInterval(timer);
  });

  @State() derivedStore = new DerivedStore([this.writeStore1, this.writeStore2], (values) => {
    console.log(values);
    return values[0] + values[1];
  }, 0);

  render() {
    return html`
      <h1>Hello, Xeito!</h1>
      <p>Store 1: ${this.readStore1.value}</p>
      <p>Derived Store: ${this.derivedStore.value}</p>

      <button @click=${() => this.writeStore1.set(this.writeStore1.value + 1)}>Increment Store 1</button>
      <button @click=${() => this.writeStore2.set(this.writeStore2.value + 1)}>Increment Store 2</button>
    `;
  }

}
