import { Injectable } from "../../../../packages/injection/dist";

@Injectable()
export class Service2 {

  say() {
    console.log("Service 2 says hello!");
  }

}