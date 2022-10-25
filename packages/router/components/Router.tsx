import { Xeito, Component, State } from '@xeito/core';
import { XeitoRouter } from '../classes/xeito-router';
import { findCurrentRoute } from '../functions/find-current-route';
import { RouterConfig } from '../interfaces/router-config';
import { PendingTree } from '../utils/pending-tree';
import { processRedirects } from '../functions/process-redirects';
import { processGuards } from '../functions/process-guards';
import { formatRouterConfig } from '../utils/format-router-config';
import { Subscription } from 'rxjs';

interface RouterProps {
  routerConfig: RouterConfig;
}

@Component()
export class Router {
  	
  @State() currentPage: any;

  private routerConfig: RouterConfig;

  private previousPath: string;

  private routeUpdateSubscription: Subscription;

  constructor({ routerConfig }: RouterProps) {
    this.routerConfig = formatRouterConfig(routerConfig);
    
    // Initialize the router history with the given strategy
    XeitoRouter.initializeHistory(this.routerConfig.options?.strategy || 'browser');

    this.onCreate();
  }

  onCreate() {
    // Listen to the history changes
    this.routeUpdateSubscription?.unsubscribe();
    this.routeUpdateSubscription = XeitoRouter.routeUpdate$
      .subscribe((update) => {
        this.routeUpdated();
      });
    this.routeUpdated();
  }

  onDestroy() {
    this.routeUpdateSubscription.unsubscribe();
  }

  async routeUpdated() {
    // Reset the pending tree
    PendingTree.setNextRoute(null);
    PendingTree.setTreePathAccumulator(null);

    // Find the current route
    const currentRoute = findCurrentRoute(this.routerConfig.routes, window.location.pathname);

    if (currentRoute) {
      const routeRedirectsResult = processRedirects(currentRoute);
      const routeGuardsResult = await processGuards(currentRoute);

      if (routeRedirectsResult && routeGuardsResult) {
        
        PendingTree.setNextRoute(currentRoute);
        PendingTree.setTreePathAccumulator(currentRoute.path);

        if (this.previousPath !== currentRoute.path) {
          // Clear the current page
          this.currentPage = null;
          
          // Set the current page
          this.previousPath = currentRoute.path;
          
          this.currentPage = Xeito.createElement(currentRoute.component, null);
        } else {
          // Update the current page
          this.currentPage = Xeito.createElement(currentRoute.component, null);
        }

      }

    } else {
      PendingTree.setNextRoute(null);
      PendingTree.setTreePathAccumulator(null);
      this.currentPage = null;
      this.currentPage = (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <h1>404</h1>
          <p>Page not found</p>
        </div>
      );
    }
  }

  public render() {
    return (
      <div className='router-root'>
        { this.currentPage }
      </div>
    )
  }

}

declare function __decorate(decorator, target): any;

