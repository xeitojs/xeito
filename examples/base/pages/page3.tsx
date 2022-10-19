import { Xeito, Component } from "../../../packages/core"; 
import { RouterView } from "../../../packages/router";

@Component()
export class Page3 {
  
  render() {
    return (
      <div>
        <p>Page 3 works</p>

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
