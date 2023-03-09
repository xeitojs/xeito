import { XeitoRouterPlugin } from './../../../packages/router/classes/xeito-router-plugin';
import { AppComponent } from './app-component';
import { Xeito } from '../../../packages/core/index';
import { Page1 } from './pages/page1/page-1';
import { Page2 } from './pages/page2/page-2';
import { Page3 } from './pages/page3/page-3';

const app = new Xeito(AppComponent);
app.usePlugin(XeitoRouterPlugin, {
  routes: [
    {
      path: '/',
      redirectTo: '/page1'
    },
    {
      path: '/page1',
      component: Page1,
      children: [
        {
          path: '/',
          redirectTo: '/page1/page2'
        },
        {
          path: '/page2',
          component: Page2
        },
        {
          path: '/page3',
          component: Page3
        }
      ]
    },
    {
      path: '/page2',
      component: Page2
    },
    {
      path: '/page3',
      component: Page3
    },
  ]
})

app.bootstrap('#app');
