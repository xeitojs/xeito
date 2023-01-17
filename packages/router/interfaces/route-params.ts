
/**
 * Parameters of a route.
 * eg: /user/:id/:name -> { id: '1', name: 'John' }
 */
export interface RouteParams {
  [key: string]: string;
}
