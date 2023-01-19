
export interface Updater {
  (value: any, set: Function): any | Function;
}
