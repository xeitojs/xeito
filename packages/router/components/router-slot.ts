import { XeitoComponent, Component, html, Global } from '@xeito/core';
import { Update } from 'history';
import { match } from 'path-to-regexp';
import { processGuards } from '../functions/process-guards';
import { Route } from '../interfaces/route';
import type { RouterInternal } from '../interfaces/router-internal';
import type { XeitoRouter } from '../interfaces/xeito-router';

@Component({
  selector: 'router-slot'
})
export class RouterSlot extends XeitoComponent {

  @Global() router: XeitoRouter;
  @Global() routerInternal: RouterInternal;

  component: XeitoComponent;
  historySubscription: any;

  onDidMount(): void {
    // Subscribe to route updates
    this.historySubscription = this.routerInternal.history.listen((update: Update) => {
      this.routerInternal.pathAccumulator.set('');
      this.routerInternal.previousRoute.set({children: this.routerInternal.routes} as any);
      this.handleRouteUpdate();
    });

    // Handle initial route
    this.handleRouteUpdate();
  }

  async handleRouteUpdate() {
    this.router.location.subscribe(() => {});
    const currentURL = this.router.location.value.pathname;

    const previousRoute = this.routerInternal.previousRoute.value;

    let matchedRoute;

    // Make sure the children exist to prevent runtime errors while rendering
    if (previousRoute.children) {

      for(let route of previousRoute.children) {
        let routePath = `${this.routerInternal.pathAccumulator.value ?? ''}${route.path}`;

        const fn = match(routePath, { decode: decodeURIComponent, end: false });
        const result = fn(currentURL);

        if (result) {
          matchedRoute = route;

          // Update the params if the route is the last matched route
          const fullFn = match(routePath, { decode: decodeURIComponent, end: true });
          const matched = fullFn(currentURL);
          if (matched && matched.path === currentURL) {
            this.routerInternal.params.set(result.params);
          }

          break;
        }
      }
    }

    if (matchedRoute) {

      let shouldContinue = true;

      if (matchedRoute.redirectTo) {
        this.router.replace(matchedRoute.redirectTo);
        return;
      }

      if (matchedRoute.guards && matchedRoute.guards.length > 0) {
        shouldContinue = await processGuards(matchedRoute, this.router);
      }

      if (shouldContinue) {
        this.routerInternal.previousRoute.set(matchedRoute);
        this.routerInternal.pathAccumulator.set(this.routerInternal.pathAccumulator.value + matchedRoute.path);
        this.handleRoute(matchedRoute);
      }
    }
  }

  handleRoute(route: Route | null) {
    if (route) {
      // Handle route
      this.component = new route.component();
    } else {
      // Handle 404
      this.component = null;
    }
    
    this.innerHTML = '';
    this.append(this.component);
  }

  onUnmount(): void {
    this.historySubscription && this.historySubscription();
  }

  render() {
    return html``;
  }

}
