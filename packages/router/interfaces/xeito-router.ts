import { ReadStore } from '@xeito/store';
import { Location, Update } from 'history';
import { RouteParams } from './route-params';

export interface XeitoRouter {
  routeUpdate: ReadStore<Update>;
  routeParams: ReadStore<RouteParams>;
  location: ReadStore<Location>;
  push: (path: string, state?: any) => void;
  replace: (path: string, state?: any) => void;
  go: (n: number) => void;
  back: () => void;
  forward: () => void;
  createHref: (path: string) => string;
}
