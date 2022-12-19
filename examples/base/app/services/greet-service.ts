import { Injectable } from "../../../../packages/injection";

@Injectable({
  selector: 'greetService'
})
export class GreetService {

  greet(name: string) {
    return `Hello ${name}`;
  }

}