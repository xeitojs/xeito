import { Route } from "./route";

export interface RouterOptions {

  // The routes to be used by the router
  routes: Route[];

  // The strategy to be used by the router
  strategy?: 'hash' | 'browser' | 'memory';

}
