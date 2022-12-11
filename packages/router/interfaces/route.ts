
export interface Route {

  path: string;
  component: any;
  children?: Route[];
  redirectTo?: string;
  guards?: any[];

}
