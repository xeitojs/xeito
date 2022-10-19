import { Xeito, Component } from '../../packages/core';
import { Router } from '../../packages/router/';
import { Page1 } from './pages/page1';
import { Page2 } from './pages/page2';
import { Page3 } from './pages/page3';

@Component()
export class Main {

  public routerConfig = {
    routes: [
      {
        path: '/',
        redirectTo: '/page1',
      },
      {
        path: '/page1',
        component: Page1
      },
      {
        path: '/page2',
        component: Page2,
      },
      {
        path: '/page3',
        component: Page3,
      },
    ]
  }

  constructor() {}

  render() {
    return (
      <Router routerConfig={this.routerConfig} />
    );
  }

}

Xeito.render(document.getElementById('root'), <Main />);