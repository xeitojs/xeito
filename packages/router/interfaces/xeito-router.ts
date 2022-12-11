import { Location, Update } from 'history';
import { Observable } from 'rxjs';

export interface XeitoRouter {
  routeUpdate: Observable<Update>;
  params: Observable<any>;
  location: () => Location;
  push: (path: string, state?: any) => void;
  replace: (path: string, state?: any) => void;
  go: (n: number) => void;
  back: () => void;
  forward: () => void;
  createHref: (path: string) => string;
}
