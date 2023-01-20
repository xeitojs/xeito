import { Action } from "@xeito/core";

@Action({
  selector: 'log-value-action'
})
export class LogValueAction {

  setup(element: any, ...args: any[]) {
    //console.log(element, ...args);
  }

  cleanup() {}

}