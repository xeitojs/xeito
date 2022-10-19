import { Xeito, Component } from "@xeito/core";
import { XeitoRouter } from "../classes/xeito-router";

interface RouterLinkProps {
  to: string;
  replace?: boolean;
  children?: any
}

@Component()
export class RouterLink {

  private to: string;
  private replace: boolean;
  private children: any;

  constructor({to, replace, children}: RouterLinkProps) {
    this.to = XeitoRouter.createHref(to);
    this.replace = replace;
    this.children = children;
  }

  handleClick(event) {
    event.preventDefault();
    if (!this.replace) {
      XeitoRouter.push(this.to);
    } else {
      XeitoRouter.replace(this.to);
    }
  }

  render() {
    return (
      <a href={this.to} onclick={(event) => this.handleClick(event)}>{this.children}</a>
    );
  }

}
