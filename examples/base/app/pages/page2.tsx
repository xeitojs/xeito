import { Xeito, Component, State } from "../../../../packages/core";
import { RouterView, XeitoRouter } from "../../../../packages/router";

@Component()
export class Page2 {

  @State() superCount: number = 0;

  nav() {
    XeitoRouter.push('/page1');
  }

  onCreate() {
    console.log('On create page 2');
  }

  onDestroy() {
    console.log('On destroy page 2');
  }

  superClick() {
    this.superCount++;
  }

  render() {
    return (
      <div>
        <p>Page 2 works</p>

        <button onclick={()=> this.nav()}>Page 1</button>
        <button onclick={()=> this.superClick()}>Super count is: {this.superCount}</button>

        <p>Router View Container:</p>
        <div style={{
          border: '1px solid black',
          padding: '10px'
        }}>
          <RouterView />
        </div>
      </div>
    );
  }

}
