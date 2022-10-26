import { Xeito, Component } from "../../../packages/core";
import { RouterView, XeitoRouter } from "../../../packages/router";

@Component()
export class Page2 {

  nav() {
    XeitoRouter.push('/page1');
  }

  render() {
    return (
      <div>
        <p>Page 2 works</p>

        <button onclick={()=> this.nav()}>Page 1</button>

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
