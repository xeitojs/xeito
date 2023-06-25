import { Hole } from "uhtml";

export interface ComponentProps {
  [key: string]: any;
}

export interface ComponentSlots {
  default: string | typeof Hole | any;
  [key: string]: string | typeof Hole | any;
}
