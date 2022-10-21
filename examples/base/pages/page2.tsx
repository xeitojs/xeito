import { Xeito, Component } from "../../../packages/core";
import { RouterView } from "../../../packages/router";

@Component()
export class Page2 {

  render() {
    return (
      <div>
        <p>Page 2 works</p>

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
