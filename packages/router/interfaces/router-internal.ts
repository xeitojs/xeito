import { BehaviorSubject, Subject } from 'rxjs';
import { Route } from "./route";

export interface RouterInternal {
  routes: Route[];
  params: Subject<any>;
  previousRoute: BehaviorSubject<Route>;
  pathAccumulator: BehaviorSubject<string>;
}
