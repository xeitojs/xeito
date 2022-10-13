export function Component() {

  return function (target) {

    target.prototype.xeitoComponent = true;
    target.prototype.VNode = target.prototype.VNode || null;

  }

}
