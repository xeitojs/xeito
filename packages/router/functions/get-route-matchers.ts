import { match } from "path-to-regexp";
import { Route } from "../interfaces/route";

/**
 * Get the matchers for a route.
 * @param {Route} route Route to get matchers for.
 * @param {string} currentBasePath Current base path to prepend to route path.
 * @param acc Accumulator for matchers. 
 * @returns 
 */
export function getRouteMatchers (
  route?: Route,
  currentBasePath?: string, 
  acc?: Array<any>
): Array<any> {

  if (!route) return acc || [];

  if (!acc) acc = [];
  
  if (!currentBasePath) currentBasePath = '';

  const { path, children } = route;

  const basePath = currentBasePath + path;

  acc.push(match(basePath));

  if (children) {
    children.forEach(child => {
      getRouteMatchers(child, basePath, acc);
    });
  }

  return acc;
};
