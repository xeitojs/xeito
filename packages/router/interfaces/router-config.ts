import { Route } from "./route";
import { RouterOptions } from "./router-options";

export interface RouterConfig {
  routes: Route[];
  options?: RouterOptions;
}
