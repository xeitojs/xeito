import { Location, Update } from 'history';
import { RouteParams } from './route-params';

export interface XeitoRouter {
  onRouteUpdate: (callback: (update: Update) => void) => Function;
  getRouteParams: () => RouteParams;
  getLocation: () => Location;
  push: (path: string, state?: any) => void;
  replace: (path: string, state?: any) => void;
  go: (n: number) => void;
  back: () => void;
  forward: () => void;
  createHref: (path: string) => string;
}
