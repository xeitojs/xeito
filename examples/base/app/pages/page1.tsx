import { Xeito, Component, State } from "../../../../packages/core";
import { Ref } from "../../../../packages/core/decorators/ref";
import { RouterView, XeitoRouter } from "../../../../packages/router";
import { Component1 } from "../components/component-1";
import { Service1 } from "../components/service-1";
import { Service2 } from "../components/service-2";
import { Inject } from "../../../../packages/injection";

@Component()
export class Page1 {

  name: string = 'Page 1';

  @Ref() sampleRef!: HTMLElement;
  @State() greeted: string;
  @State() superCount: number = 0;

  @Ref() refComponent1: HTMLElement;
  @Ref() refComponent2: HTMLElement;

  @Inject() service1: Service1;
  @Inject() service2: Service2;

  constructor() {}

  onCreate() {
    console.log('Page 1 created');

    //this.service1.say();
    //this.service2.say();
  }

  greet(value?: string) {
    console.log(value);
    this.greeted = value;
    // console.log(this.greeted);
  }

  nav () {
    XeitoRouter.push('/page2');
  }

  superClick() {
    this.superCount++;
  }

  render() {
    return (
      <div>
        <p>{this['id'] ? this['id'] : 'no id'}</p>
        <p key="0123982039480">Page 1 works! {this.greeted}</p>
        <button onclick={() => this.nav()}>page2</button>
        <button onclick={()=> this.superClick()}>Super count is: {this.superCount}</button>
        <br />
        <Component1 on:customEvent={(e) => this.greet(e) } sampleProp={56} />
        <Component1 on:customEvent={(e) => this.greet(e) } sampleProp={80} />
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
