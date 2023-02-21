import { GenerateType } from "./generate.js";

export class GenerateComponent {

  args;
  program;

  IgenerateType;

  static config() {
    return {
      name: 'generate component',
      aliases: ['g c'],
      description: 'Generate a new component',
      usage: 'xeito generate component <name>',
    }
  }

  constructor(args, program) {
    this.args = args;
    this.program = program;
    this.IgenerateType = new GenerateType(args, program, false);

    this.start();
  }

  start() {
    // Check if a component name was provided
    if (!this.args._[2]) {
      this.IgenerateType.promptName('component');
    } else {
      this.IgenerateType.generate('component', this.args._[2]);
    }
  }

}