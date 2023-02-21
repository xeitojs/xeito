import { GenerateType } from "./generate.js";

export class GenerateAction {

  args;
  program;

  IgenerateType;

  static config() {
    return {
      name: 'generate action',
      aliases: ['g a'],
      description: 'Generate a new action',
      usage: 'xeito generate action <a>',
    }
  }

  constructor(args, program) {
    this.args = args;
    this.program = program;
    this.IgenerateType = new GenerateType(args, program, false);

    this.start();
  }

  start() {
    // Check if a action name was provided
    if (!this.args._[2]) {
      this.IgenerateType.promptName('action');
    } else {
      this.IgenerateType.generate('action', this.args._[2]);
    }
  }

}