import { text, isCancel, select, outro } from "@clack/prompts";
import emoji from "node-emoji";
import { createComponent } from "./generators/create-component.js";
import { createService } from "./generators/create-service.js";
import { createAction } from "./generators/create-action.js";
import { createPipe } from "./generators/create-pipe.js";

export class GenerateType {

  args;
  program;

  validTypes = ['component', 'service', 'action', 'pipe'];

  static config() {
    return {
      name: 'generate',
      aliases: ['g'],
      description: 'Generate a new resource',
      usage: 'xeito generate <type> <name>',
    }
  }

  constructor(args, program, shouldStart = true) {
    this.args = args;
    this.program = program;
    if (shouldStart) this.start();
  }

  start() {
    this.promptType();
  }

  async promptType() {
    const type = await select({
      message: 'What do you want to generate?',
      options: [
        { label: `${emoji.emojify(':package:')} Component`, value: 'component' },
        { label: `${emoji.emojify(':syringe:')} Service`, value: 'service' },
        { label: `${emoji.emojify(':minidisc:')} Action`, value: 'action' },
        { label: `${emoji.emojify(':nut_and_bolt:')} Pipe`, value: 'pipe' },
        { label: `${emoji.emojify(':x:')} Cancel & Exit`, value: 'cancel' }
      ],
    });

    if (isCancel(type) || !type) {
      this.program.closingError('You must provide a type to generate');
    }

    if (type === 'cancel') {
      outro('Cancelled');
      process.exit(0);
    }

    this.promptName(type);
  }

  async promptName(type) {
    const name = await text({
      message: 'What is the name of the ' + type + '?',
      placeholder: 'my-' + type
    });

    if (isCancel(name) || !name) {
      this.program.closingError('You must provide a name for the ' + type);
    }

    this.generate(type, name);
  }

  generate(type, name) {
    switch(type) {
      case 'component':
        createComponent(name);
        break;
      case 'service':
        createService(name);
        break;
      case 'action':
        createAction(name);
        break;
      case 'pipe':
        createPipe(name);
        break;
    }
  }

}