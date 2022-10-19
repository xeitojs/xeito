import { Xeito, Component } from "../../../packages/core/";
import { RouterView } from "../../../packages/router/";
import { RouterLink } from "../../../packages/router/components/router-link";

@Component()
export class Page1 {

  render() {
    return (
      <div>
        <p>Page1 works</p>

        <p>Link:</p>
        <RouterLink to='/page2'>
          <button>Page 2</button>
        </RouterLink>

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
