import { Xeito, Component } from "@xeito/core";
import { History } from "history";
import { appHistory } from "../functions/app-history";

@Component()
export class RouterLink {

  private to: string;
  private children: any;

  constructor({to, children}: {to: string, children: any}) {
    this.to = appHistory.createHref(to);
    this.children = children;
  }


  handleClick(event) {
    event.preventDefault();
    appHistory.push(this.to);
  }

  render() {
    return (
      <a href={this.to} onClick={(event)=> this.handleClick(event)}>{this.children}</a>
    )
  }

}
