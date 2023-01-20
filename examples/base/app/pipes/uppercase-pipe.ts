import { Pipe } from "@xeito/core/decorators/pipe";

@Pipe({
  selector: 'uppercase'
})
export class UppercasePipe {
  
  transform(value: string) {
    // Uppercase every other letter of the string
    let str = '';
    for (let i = 0; i < value.length; i++) {
      if (i % 2 === 0) {
        str += value.charAt(i).toUpperCase();
      } else {
        str += value.charAt(i);
      }
    }
    return str;
  }

  destroy() {}

}
