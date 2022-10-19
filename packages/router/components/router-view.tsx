import { Xeito, Component, State } from "@xeito/core";
import { findCurrentChildRoute } from "../functions/find-current-child-route";
import { processGuards } from "../functions/process-guards";
import { processRedirects } from "../functions/process-redirects";
import { Route } from "../interfaces/route";
import { PendingTree } from "../utils/pending-tree";

@Component()
export class RouterView {

  private currentRoute: Route;
  private currentPath: string;
  @State() private currentPage: any;

  constructor() {
    this.currentRoute = PendingTree.getNextRoute();
    this.currentPath = PendingTree.getTreePathAccumulator();

    this.handleRouteView();
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
        this.currentPage = <currentChildRoute.component />;
      } else {
        PendingTree.setNextRoute(null);
        PendingTree.setTreePathAccumulator(null);
        this.currentPage = null;
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
