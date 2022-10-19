import { Route } from "../interfaces/route";
import { getRouteMatchers } from "./get-route-matchers";

/**
 * Find the current route based on the current path.
 * @param {Route[]} routes Routes to search. 
 * @param {string} path Path to search for.
 * @returns { Route | null } The route that matches the path or null if no route matches.
 */

export function findCurrentRoute (routes: Route[], path: string): Route | null {
  const matchedRoute = routes.find((route: Route) => {
    
    const matcher = getRouteMatchers(route).find((matcher: any) => {
      const match = matcher(path);
      if (match) {
        return true;
      }
    });

    return matcher ? true : false;
  });

  return matchedRoute || null;

}
