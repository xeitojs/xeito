import { match } from 'path-to-regexp';
import { RouterOptions } from './../interfaces/router-options';
import { RouterConfig } from './../interfaces/router-config';
import { RouteData } from '../interfaces/route-data';

export function createRouterConfig (routes: RouteData[], options?: RouterOptions): RouterConfig {

  // Add matcher to routes
  routes.forEach(route => {
    route.matcher = match(route.path);
  });


  // Initialize default options if not provided
  if (!options) {
    options = {
      mode: 'history'
    };
  }

  // Return router config
  return {
    routes,
    options
  }
}
