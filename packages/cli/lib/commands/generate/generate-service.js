import { GenerateType } from "./generate.js";

export class GenerateService {

  args;
  program;

  IgenerateType;

  static config() {
    return {
      name: 'generate service',
      aliases: ['g s'],
      description: 'Generate a new service',
      usage: 'xeito generate service <name>',
    }
  }

  constructor(args, program) {
    this.args = args;
    this.program = program;
    this.IgenerateType = new GenerateType(args, program, false);

    this.start();
  }

  start() {
    // Check if a service name was provided
    if (!this.args._[2]) {
      this.IgenerateType.promptName('service');
    } else {
      this.IgenerateType.generate('service', this.args._[2]);
    }
  }

}