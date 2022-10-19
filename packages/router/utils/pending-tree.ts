import { Route } from "../interfaces/route";

export class PendingTree {

  private static _treePathAccumulator: string;
  private static _nextRoute: Route | null = null;

  public static getNextRoute() {
    return this._nextRoute;
  }

  public static setNextRoute(route: Route) {
    this._nextRoute = route;
  }

  public static getTreePathAccumulator() {
    return this._treePathAccumulator;
  }

  public static setTreePathAccumulator(path: string) {
    this._treePathAccumulator = path;
  }

}
