
/**
 * A guard is a function that can be run before a route is rendered.
 * It can be used to check if a user is logged in, for example.
 * If the guard returns false, the route will not be rendered.
 * If it returns a string, the user will be redirected to that path.
 * If it returns a promise, the route will wait for the promise to resolve
 * before deciding what to do.
 */
export interface RouterGuard {
  (path: string) : boolean | string | Promise<boolean | string>;
}
