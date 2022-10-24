import { Xeito, Component } from "../../../packages/core/";
import { RefRegistry } from "../../../packages/core/classes/ref-registry";
import { Ref } from "../../../packages/core/decorators/ref";
import { RouterView } from "../../../packages/router/";
import { RouterLink } from "../../../packages/router/components/router-link";

@Component()
export class Page1 {
  
  @Ref() sampleRef!: HTMLElement;

  onCreate() {
    console.log(this.sampleRef);
  }

  render() {
    return (
      <div className="page1">
        <p ref="sampleRef">
          <span style={{marginRight: '10px'}}>Page 1 works</span>
          <RouterLink to='/page2'>
            <button>Page 2 (absolute)</button>
          </RouterLink>
        </p>

        <p>Link:</p>
        <RouterLink to='/page1/page2'>
          <button>Page 2</button>
        </RouterLink>
        <RouterLink to='/page1/page3'>
          <button>Page 3</button>
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
