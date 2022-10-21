import { Xeito, Component, State } from "@xeito/core";
import { Subscription } from "rxjs";
import { XeitoRouter } from "../classes/xeito-router";
import { findCurrentChildRoute } from "../functions/find-current-child-route";
import { processGuards } from "../functions/process-guards";
import { processRedirects } from "../functions/process-redirects";
import { Route } from "../interfaces/route";
import { PendingTree } from "../utils/pending-tree";

@Component()
export class RouterView {

  private currentRoute!: Route;
  private currentPath!: string;
  private previousPath!: string;
  private routeUpdateSubscription!: Subscription;
  @State() private currentPage: any;

  constructor() {}

  onInit() {
    this.currentRoute = PendingTree.getNextRoute();
    this.currentPath = PendingTree.getTreePathAccumulator();

    this.handleRouteView();

    this.routeUpdateSubscription = XeitoRouter.routeUpdate$
      .subscribe(() => {
        this.handleRouteView();
      });
  }

  // Destroy the subscription when the component is destroyed
  onDestroy() {
    this.routeUpdateSubscription.unsubscribe(); 
  }

  async handleRouteView() {
    const children = this.currentRoute.children ?? [];
    const currentChildRoute = findCurrentChildRoute(children, window.location.pathname, this.currentPath);

    if (currentChildRoute) {
      const routeRedirectsResult = processRedirects(currentChildRoute, this.currentPath);
      const routeGuardsResult = await processGuards(currentChildRoute, this.currentPath);

      if (routeRedirectsResult && routeGuardsResult) {
        PendingTree.setNextRoute(currentChildRoute);
        PendingTree.setTreePathAccumulator(this.currentPath + currentChildRoute.path);

        if (this.previousPath !== currentChildRoute.path) {
          // Clear the current page
          this.currentPage = null;

          // Set the current page
          this.previousPath = currentChildRoute.path;
          this.currentPage = <currentChildRoute.component />;
        }
      } else {
        PendingTree.setNextRoute(null);
        PendingTree.setTreePathAccumulator(null);
        this.currentPage = null;
        this.handleRouteView();
      }
    } else {
      PendingTree.setNextRoute(null);
      PendingTree.setTreePathAccumulator(null);
      this.currentPage = null;
    }
  }

  // Render children
  public render() {
    return (
      <div className='router-view'>
        { this.currentPage }
      </div>
    )
  }
  
}
