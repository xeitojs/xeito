import { intro, text, isCancel, select, note, spinner } from "@clack/prompts";
import color from "picocolors";
import fs from "fs";
import degit from "degit";
import emoji from "node-emoji";

export class NewProject {

  args;
  program;

  projectName;

  static config() {
    return {
      name: 'new',
      aliases: ['n'],
      description: 'Create a new project',
      usage: 'xeito new <project-name>',
    }
  }

  constructor(args, program) {
    this.args = args;
    this.program = program;

    intro(color.inverse('Creating a new Xeito Project'));
    this.start();
  }

  start() {
    // Check if a project name was provided
    if (!this.args._[1]) {
      this.promptName();
    } else {
      this.projectName = this.args._[1];
      this.createProject();
    }
  }

  async createProject() {
    // Check if there is a folder with the same name
    if (fs.existsSync(this.projectName)) {
      this.program.closingError('There is already a folder with the same name');
    }

    const template = await this.selectTemplate();

    this.logBlock(emoji.emojify(':rocket: ') + color.bgYellow(color.black('Creating project...')));
    await this.degitBase(this.projectName);
    await this.degitTemplate(this.projectName, template);

    // Modify xeito.config.json file
    const config = JSON.parse(fs.readFileSync(this.projectName + '/xeito.config.json', 'utf8'));
    config.name = this.projectName;
    fs.writeFileSync(this.projectName + '/xeito.config.json', JSON.stringify(config, null, 2));

    this.logBlock(emoji.emojify(':tada: ') + color.green('Project created successfully!'));

    let noteContent = '';
    noteContent += `${color.bold(color.blue('Run the following commands to start the project:'))}\n`;
    noteContent += `${color.bold('cd ' + this.projectName + ' ')}\n`;
    noteContent += `${color.bold('npm install ')}\n`;
    noteContent += `${color.bold('npm start ')}\n`;
    note(noteContent, emoji.emojify(':arrow_forward: ') + 'Next steps');
  }

  async promptName() {
    const name = await text({
      message: 'Project Name',
      placeholder: 'xeito-project',
      validate: (value) => {
        if (!value) return 'Please provide a project name';
        // Check if the name is valid
        if (!value.match(/^[a-zA-Z0-9-]+$/)) return 'Invalid project name';
      }
    });

    if (isCancel(name) || !name) {
      this.program.closingError('Please provide a project name');
    } else {
      this.projectName = name;
      this.createProject();
    }
  }

  selectTemplate() {
    return new Promise(async (resolve) => {
      const template = await select({
        message: 'Select a template',
        options: [
          { label: 'Default', value: 'blank', hint: 'Just the basics' },
          { label: 'Services Example', value: 'service-example', hint: 'Basic example with a service' },
        ]
      });
  
      if (isCancel(template) || !template) {
        this.program.closingError('Please select a template');
      } else {
        resolve(template)
      }
    })
  }

  degitBase(name) {
    return new Promise((resolve, reject) => {
      const repoURL = 'xeitojs/xeito-starters/templates';
      
      this.logBlock(emoji.emojify(':twisted_rightwards_arrows: ') + color.blue('Downloading base project...'));
      const emitter = degit(repoURL + '/base', { cache: false });
      emitter.clone(name)
        .then(() => {
          this.logBlock(emoji.emojify(':white_check_mark: ') + color.green('Base project created'));
          resolve();
        })
        .catch((err) => {
          this.program.closingError('Error creating project');
          console.log(err);
        });
    });
  }

  degitTemplate(name, template) {
    return new Promise((resolve, reject) => {
      const repoURL = 'xeitojs/xeito-starters/templates';
      
      this.logBlock(emoji.emojify(':twisted_rightwards_arrows: ') + color.blue('Applying template...'));
      const emitter = degit(repoURL + '/' + template , { cache: false, force: true });
      emitter.clone(name)
        .then(() => {
          this.logBlock(emoji.emojify(':white_check_mark: ') + color.green('Template applied'));
          resolve();
        })
        .catch((err) => {
          this.program.closingError('Error applying template');
          console.log(err);
        });
    });
  }

  logBlock(text) {
    const sp = spinner();
    sp.start(text);
    sp.stop(text);
  }

}