import { BehaviorSubject, Subject } from 'rxjs';
import { Route } from "./route";

export interface RouterInternal {
  routeUpdate: Subject<any>;
  routes: Route[];
  params: Subject<any>;
  previousRoute: BehaviorSubject<Route>;
  pathAccumulator: BehaviorSubject<string>;
}
