import { Pipe } from "../decorators/pipe";

@Pipe({
  selector: 'xtWhen'
})
export class XtWhen {

  private _previousCondition: boolean | null = null;
  private _previousResult: HTMLElement | string | any = null;

  transform(
    condition: boolean,
    trueCase: () => HTMLElement | string | any,
    falseCase?: () => HTMLElement | string | any
  ) {
    let result: HTMLElement | string | any;

    if (this._previousCondition === null) result = this.computeNewResult(condition, trueCase, falseCase);
    else if (this._previousCondition === condition) result = this._previousResult;
    else result = this.computeNewResult(condition, trueCase, falseCase);
    
    this._previousCondition = condition;
    this._previousResult = result;

    return result;
  }

  computeNewResult(
    condition: boolean,
    trueCase: () => HTMLElement | string | any,
    falseCase?: () => HTMLElement | string | any
  ) {
    return condition ? trueCase() : falseCase ? falseCase() : null;
  }

}
