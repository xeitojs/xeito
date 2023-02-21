import { GenerateType } from "./generate.js";

export class GeneratePipe {

  args;
  program;

  IgenerateType;

  static config() {
    return {
      name: 'generate pipe',
      aliases: ['g p'],
      description: 'Generate a new pipe',
      usage: 'xeito generate pipe <name>',
    }
  }

  constructor(args, program) {
    this.args = args;
    this.program = program;
    this.IgenerateType = new GenerateType(args, program, false);

    this.start();
  }

  start() {
    // Check if a pipe name was provided
    if (!this.args._[2]) {
      this.IgenerateType.promptName('pipe');
    } else {
      this.IgenerateType.generate('pipe', this.args._[2]);
    }
  }

}