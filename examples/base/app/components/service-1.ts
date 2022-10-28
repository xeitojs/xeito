import { Injectable } from "../../../../packages/injection/dist";

@Injectable()
export class Service1 {

  say() {
    console.log("Service 1 says hello!");
  }

}