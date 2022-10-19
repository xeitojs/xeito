import { RouterGuard } from "./router-guard";

/**
 * Basic route interface.
 */
export interface Route {

  path: string;
  component?: any;
  children?: Route[];
  guards?: RouterGuard[];
  redirectTo?: string;

}
