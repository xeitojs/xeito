import { Xeito } from "@xeito/core";
import { History, createBrowserHistory, createHashHistory, Location } from "history";
import { State } from "../../core/decorators/state";
import { RouteData } from "../interfaces/route-data";
import { RouterConfig } from "../interfaces/router-config";
import { RouterOptions } from "../interfaces/router-options";

@Component()
export class Router {

  private routerConfig: RouterConfig;

  private history: History;

  @State() private currentRoute: any;

  constructor({routerConfig}: {routerConfig: RouterConfig}) {
    this.routerConfig = routerConfig;
    this.startRouter()
  }

  /**
   * Start the router
   */
  startRouter() {
    this.history = this.initializeHistory(this.routerConfig.options);

    // Listen for route changes
    const unlisten = this.history.listen(({location}: {location: Location}) => {
      this.handleRouteChange(location);
    });

    // Handle the initial route
    this.handleRouteChange(this.history.location);
  }

  /**
   * Initialize the history object based on the router options
   * @param {RouterOptions} options 
   * @returns 
   */
  initializeHistory(options: RouterOptions) {
    if (options.mode === 'hash') {
      return createHashHistory();
    }
    return createBrowserHistory();
  }

  handleRouteChange(location: Location) {
    const pathName = location.pathname;

    // Find the route that matches the current path
    const matchedRoute = this.routerConfig.routes.find((route) => {
      return route.matcher(pathName);
    });

    if (matchedRoute) {
      // Run route guards
      if (this.execRouteGuards(matchedRoute)) {
        // Render the component
        this.currentRoute = matchedRoute.component;
      }
    }

    // Handle route redirects
    if (matchedRoute?.redirectTo) {
      // Run route guards
      if (this.execRouteGuards(matchedRoute)) {
        const routeData = matchedRoute.matcher(pathName);
        const params = routeData.params;
        
        // Replace the route params with the actual values
        for(const key in params) {
          matchedRoute.redirectTo = matchedRoute.redirectTo.replace(`:${key}`, params[key]);
        }

        // Redirect to the new route
        this.history.replace(matchedRoute.redirectTo);
      }
    }
  }

  navigateToRoute(path: string) {
  }

  redirectToRoute(path: string) {
    this.history.push(path);
  }

  /**
   * Runs the route guards for the given route and returns true if all guards pass
   * @param {RouteData} route  
   * @returns 
   */
  execRouteGuards(route: RouteData): boolean {
    let canActivate = true;
    if (route.guards) {
      route.guards.forEach((guard) => {
        if (!guard()) {
          canActivate = false;
        }
      });
    }
    return canActivate;
  }


  render() {
    return this.currentRoute;
  }

}