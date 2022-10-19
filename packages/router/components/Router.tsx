import { Xeito, Component, State } from '@xeito/core';
import { XeitoRouter } from '../classes/xeito-router';
import { findCurrentRoute } from '../functions/find-current-route';
import { RouterConfig } from '../interfaces/router-config';
import { PendingTree } from '../utils/pending-tree';
import { createBrowserHistory } from 'history';
import { processRedirects } from '../functions/process-redirects';
import { processGuards } from '../functions/process-guards';
import { formatRouterConfig } from '../utils/format-router-config';

interface RouterProps {
  routerConfig: RouterConfig;
}

@Component()
export class Router {
  	
  @State() currentPage: any;

  private routerConfig: RouterConfig;

  constructor({ routerConfig }: RouterProps) {
    this.routerConfig = formatRouterConfig(routerConfig);
    
    // Initialize the router history with the given strategy
    XeitoRouter.initializeHistory(this.routerConfig.options?.strategy || 'browser');

    // Listen to the history changes
    XeitoRouter.routeUpdate$.subscribe((update) => {
      this.routeUpdated();
    });

    // Check the initial route
    this.routeUpdated();
    
  }

  async routeUpdated() {
    // Remove the current page
    this.currentPage = null;

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
        this.currentPage = <currentRoute.component />;
      }

    } else {
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

