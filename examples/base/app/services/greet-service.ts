import { Injectable } from "../../../../packages/injection";

@Injectable()
export class GreetService {

  greet(name: string) {
    return `Hello ${name}`;
  }

}