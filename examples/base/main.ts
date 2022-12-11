import { Xeito } from '../../packages/core';
import { XeitoRouterPlugin } from '../../packages/router/classes/xeito-router-plugin';
import { AppComponent } from './app/app-component';
import { Page1Component } from './app/pages/page1-component';
import { Page2Component } from './app/pages/page2-component';
import { Page3Component } from './app/pages/page3-component';

const app = new Xeito(AppComponent);

app.usePlugin(XeitoRouterPlugin, {
  routes: [
    {
      path: '/page1/:id?',
      component: Page1Component,
      guards: [],
      children: [
        {
          path: '/page3/:page3Id?',
          component: Page3Component,
          children: [
            {
              path: '/page2',
              component: Page2Component
            }
          ]
        }
      ]
    },
    {
      path: '/page2',
      component: Page2Component
    },
    {
      path: '/',
      redirectTo: '/page1'
    }
  ]
});
app.bootstrap('#app');
