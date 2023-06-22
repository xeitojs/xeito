import { Pipe } from "../decorators/pipe";

@Pipe({
  selector: 'xtFor'
})
export class XtFor {

  transform(data: any[], callback: (item: any, index?: number) => Array<HTMLElement | string | any>) {
    return data.map((item, index) => callback(item, index));
  }

}
