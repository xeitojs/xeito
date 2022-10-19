import { Route } from "../interfaces/route";
import { RouterConfig } from "../interfaces/router-config";

export function formatRouterConfig(routerConfig: RouterConfig): RouterConfig {

  let routes = routerConfig.routes;

  // If the routes property is not an array, throw an error
  if (!Array.isArray(routes)) {
    throw new Error("The routes property must be an array");
  }

  // If the routes property is an empty array, throw an error
  if (routes.length === 0) {
    throw new Error("The routes property must not be an empty array");
  }
  
  // Remove single slashes
  routes = removeEmptySlash(routes);

  /**
   * Substituting the wildcard * for the regex (.*) in the route and its children
   * is a temporary solution until the wildcard is implemented consistently by path-to-regexp
   * [See:]{@link https://github.com/pillarjs/path-to-regexp/pull/270}
   */
  routes = substituteWildcard(routes);
  
  // Return the formatted router config
  routerConfig.routes = routes;
  return routerConfig;

}

/**
 * Recursively removes all the single slashes from the route and its children
 * @param {Route[]} routes Routes to remove the single slashes from
 */
function removeEmptySlash(routes: Route[]): Route[] {
  routes.forEach(route => {
    if (route.path === '/') route.path = '';
    else if (route.path === '/*') route.path = '*';
    if (route.children) removeEmptySlash(route.children);
  });
  return routes;
}

/**
 * Recursively substitutes the wildcard * for the regex (.*) in the route and its children
 * @param {Route[]} routes Routes to substitute the wildcard * for the regex (.*) in
 */
function substituteWildcard(routes: Route[]): Route[] {
  routes.forEach(route => {
    if (route.path === '*') route.path = '(.*)';
    else if (route.path.includes('*')) route.path = route.path.replace('*', '(.*)');

    if (route.children) substituteWildcard(route.children);
  });
  return routes;
}
