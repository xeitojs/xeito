import { Pipe } from "../decorators/pipe";

@Pipe({
  selector: 'xtSwitch'
})
export class XtSwitch {

  private _previousValue: any = null;
  private _previousResult: HTMLElement | string | any = null;

  transform(
    value: any,
    cases: Array<[any, ()=> HTMLElement | string | any]>
  ) {
    let result: HTMLElement | string | any;

    if (this._previousValue === null) result = this.computeNewResult(value, cases);
    else if (this._previousValue === value) result = this._previousResult;
    else result = this.computeNewResult(value, cases);

    this._previousValue = value;
    this._previousResult = result;

    return result;
  }

  computeNewResult(
    value: any,
    cases: Array<[any, ()=> HTMLElement | string | any]>
  ) {
    const result = cases?.find(([condition]) => condition === value);
    if (result) return result[1]();
    return null;
  }

}
