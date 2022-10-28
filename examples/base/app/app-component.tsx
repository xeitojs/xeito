import { Xeito, Component } from "../../../packages/core";
import { Router } from "../../../packages/router";
import { Page1 } from "./pages/page1";
import { Page2 } from "./pages/page2";

@Component()
export class AppComponent {
  
  public routerConfig = {
    routes: [
      {
        path: '/',
        redirectTo: '/page1',
      },
      {
        path: '/page1',
        component: Page1,
      },
      {
        path: '/page2',
        component: Page2,
      },
    ]
  }

  render() {
    return (
    //  <Router routerConfig={this.routerConfig} />
    <Page1></Page1>
    );
  }

}
