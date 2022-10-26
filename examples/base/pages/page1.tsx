import { Xeito, Component, State } from "../../../packages/core/";
import { Ref } from "../../../packages/core/decorators/ref";
import { RouterView, XeitoRouter } from "../../../packages/router/";
import { RouterLink } from "../../../packages/router/components/router-link";
import { Component1 } from "../components/component-1";

@Component()
export class Page1 {
  
  @Ref() sampleRef!: HTMLElement;
  @State() greeted: string;

  constructor() {}

  onCreate() {}

  greet(value?: string) {
    console.log(`Hello ${value}!`);
    this.greeted = value;
  }

  nav () {
    XeitoRouter.push('/page2');
  }

  render() {
    return (
      <div>
        <p>Page 1 works! {this.greeted}</p>
        <button onclick={() => {this.nav()}}>page2</button>
        <br />
        <Component1 key={123444} on:customEvent={(e) => this.greet(e) } sampleProp={56} />
        <div>
        <Component1 key={23452353} on:customEvent={(e) => this.greet(e) } sampleProp={80} />
        </div>
      </div>
    //  <div className="page1">
    //    <p ref="sampleRef">
    //      <span style={{marginRight: '10px'}}>Page 1 works</span>
    //      <RouterLink to='/page2'>
    //        <button>Page 2 (absolute)</button>
    //      </RouterLink>
    //    </p>
    //  
    //    <p>Link:</p>
    //    <RouterLink to='/page1/page2'>
    //      <button>Page 2</button>
    //    </RouterLink>
    //    <RouterLink to='/page1/page3'>
    //      <button>Page 3</button>
    //    </RouterLink>
    //    

    //    <p>Router View Container:</p>
    //    <div style={{
    //      border: '1px solid black',
    //      padding: '10px'
    //    }}>
    //      <RouterView />
    //    </div>
    //  </div>
    );
  }

}
