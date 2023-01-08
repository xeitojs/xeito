import { XeitoComponent, Component, html, State } from '../../packages/core';

@Component({
  selector: 'app-root',
})
export class AppComponent extends XeitoComponent {

  @State() var1: string;
  @State() var2: string;
    
  onDidMount() {
    setInterval(() => {
      //this.var1 = Math.random().toString();
      //this.var2 = Math.random().toString();
    }, 1000);
  }

  render() {
    return html`
      <h1>Hello World!</h1>
      <p>var1: ${this.var1}</p>
      <p>var2: ${this.var2}</p>
    `;
  }

}
