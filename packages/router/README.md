<h1 align="center">Xeito - Harness the power of the web.</h1>

<p align="center">
  <img src="https://xeito.dev/images/logo_gradient.svg" alt="xeito-logo" width="150px" height="150px"/>
  <br><br>
  <i>Xeito is a typescript framework for building web applications</i>
  <br>
</p>

<p align="center">
  <a href="https://xeito.dev/xeito-docs/"><strong>Xeito Documentation</strong></a>
  <br>
</p>

<p align="center">
  <a href="https://www.npmjs.com/@xeito/core">
    <img src="https://img.shields.io/npm/v/@xeito/core.svg?logo=npm&logoColor=fff&label=NPM+package&color=f59e0b" alt="Xeito on npm" />
  </a>
  &nbsp;
  <a href="https://github.com/aerotoad/xeito/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/aerotoad/xeito" alt="License" />
  </a>
</p>

<hr>

## Xeito Router

This is the Router library for Xeito Framework.
Provides a simple yet powerful router for web applications built with Xeito.

To find the full documentation and more links go to the main [README file](https://github.com/aerotoad/xeito).

<hr>

## Exports:

### Classes:
- `XeitoRouterPlugin`: The Router Plugin class, intented to be registered in a Xeito application.

Example:
```typescript
import { Xeito } from '@xeito/core';
import { XeitoRouterPlugin } from '@xeito/router';
import { AppComponent } from './app-component.ts';

const app = new Xeito(AppComponent);
app.usePlugin(XeitoRouterPlugin, {
  routes: [
    {
      path: '/',
      component: HomeComponent,
    },
    {
      path: '/about',
      component: AboutComponent,
    },
  ],
});

app.bootstrap();
```

### Components:
- `RouterSlot`: The component that renders the current route component (and nested views).
- `RouterLink`: Helper component to create links from the template.

### Interfaces
- `Route`: The interface for injectable metadata (decorator).
- `RouteGuard`: The interface for route guards.
- `RouterOptions`: The interface for the Router Plugin options (see example above).
- `XeitoRouter`: The interface for the XeitoRouter *global property*
