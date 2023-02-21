import minimist from "minimist";
import Table from "cli-table";
import figlet from "figlet";
import color from 'picocolors';
import { outro } from '@clack/prompts';
import emoji from 'node-emoji';

export class Program {

  _name = '';
  _description = '';
  _version = '';
  _commands = [];
  _routes = [];

  constructor({ name, description, version, routes }) {
    this._name = name;
    this._description = description;
    this._version = version;
    this._routes = routes;

    this._commands = this.#flattenRoutes(routes);

    this.#start();
  }

  #flattenRoutes(routes, commands = []) {
    routes.forEach(route => {
      if (route.command) commands.push(route.command);
      if (route.children) {
        this.#flattenRoutes(route.children, commands);
      }
    });
    return commands;
  }

  #start() {
    const args = minimist(process.argv.slice(2));

    if (args._.length === 0 || args._.includes('help') || args.h || args.help) {
      this.#showHelp();
      return;
    }

    this.#browse(this._routes, args);
  }

  #browse(routes, args) {
    const route = this.#findRoute(this._routes, args._);
    if (!route) {
      this.#showHelp();
      return;
    }
    this.#useCommand(route.command, args);
  }

  #findRoute(routes, args, argPosition = 0) {
    let route = this.#findRouteForCurrentArg(routes, args[argPosition]);
    if (!route) {
      return null;
    }

    if (route.children && args.length > 1) {
      let childRoute = this.#findRoute(route.children, args, argPosition + 1);
      if (childRoute) {
        route = childRoute;
      }
    }

    return route;
  }

  #findRouteForCurrentArg(routes, arg) {
    return routes.find(route => {
      return route.name.includes(arg);
    });
  }

  #useCommand(command, args) {
    new command(args, this);
  }

  async #showHelp() {
    // Header
    const header = await this.#createHeader(this._name);
    console.log(color.blue(header));
    console.log(this._name);
    console.log(`Version: ${this._version}`);
    console.log(this._description);
    console.log('');

    // Usage
    console.log(`Usage: ${this._name.toLowerCase()} [command] [options]`);
    console.log('Available commands: ');

    const table = new Table({
      head: [
        color.blue('Command'), 
        color.blue('Description'), 
        color.blue('Aliases'),
        color.blue('Usage')
      ]
    });

    // Commands tables
    this._commands.forEach(command => {
      if (command.config) {
        table.push([
          command.config().name || '', 
          command.config().description || '', 
          command.config()?.aliases?.join(', ') || '',
          command.config()?.usage || ''
        ]);
      }
    });

    console.log(table.toString());

    process.exit(0);
  }

  #createHeader(string) {
    return new Promise((resolve) => {
      figlet(string, (err, data) => {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          resolve(null);
        }
        resolve(data);
      });
    })
  }

  // Public methods
  
  navigate(route) {
    this.#browse(this._routes, {_:route.split(' ')});
  }

  closingError(message, close = true) {
    outro(
      emoji.emojify(':x: ') +
      color.red(message)
    );
    if (close) process.exit(1);
  }

  closingSuccess(message, close = false) {
    outro(
      emoji.emojify(':white_check_mark: ') + 
      color.green(message)
    );
    if (close) process.exit(0);
  }


}
