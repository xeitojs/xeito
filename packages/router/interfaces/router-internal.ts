import { WriteStore } from '@xeito/store';
import { Route } from "./route";

export interface RouterInternal {
  routeUpdate: WriteStore<any>;
  routes: Route[];
  params: WriteStore<any>;
  previousRoute: WriteStore<Route>;
  pathAccumulator: WriteStore<string>;
  history: any;	
}
