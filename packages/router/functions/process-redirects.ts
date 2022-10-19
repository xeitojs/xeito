import { XeitoRouter } from "../classes/xeito-router";
import { Route } from "../interfaces/route";

export function processRedirects(route: Route, currentPath?: string): boolean {
  
  // If the route has a redirect property, redirect to the route
  if (route.redirectTo) {
    let redirectPath = route.redirectTo;
    if (currentPath) redirectPath = currentPath + redirectPath;

    XeitoRouter.replace(redirectPath);

    // Return false to stop the route from being rendered
    return false;
  }
  
  // Continue to the route
  return true;
}