import { intro, text, isCancel, select, note, spinner, log } from "@clack/prompts";
import color from "picocolors";
import fs from "fs";
import degit from "degit";
import emoji from "node-emoji";
import axios from "axios";

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

    log.step(emoji.emojify(':rocket: ') + color.bgYellow(color.black('Creating project...')));
    await this.degitProject(this.projectName, template);

    // Modify xeito.config.json file
    const config = JSON.parse(fs.readFileSync(this.projectName + '/xeito.config.json', 'utf8'));
    config.name = this.projectName;
    fs.writeFileSync(this.projectName + '/xeito.config.json', JSON.stringify(config, null, 2));

    // Modify package.json file
    const packageJSON = JSON.parse(fs.readFileSync(this.projectName + '/package.json', 'utf8'));
    packageJSON.name = this.projectName;
    fs.writeFileSync(this.projectName + '/package.json', JSON.stringify(packageJSON, null, 2));

    log.info(emoji.emojify(':tada: ') + color.green('Project created successfully!'));

    let noteContent = '';
    noteContent += `${color.bold(color.blue('Run the following commands to start the project:'))}\n`;
    noteContent += `${color.bold('cd ' + this.projectName + ' ')}\n`;
    noteContent += `${color.bold('npm install ')}\n`;
    noteContent += `${color.bold('npm run dev ')}\n`;
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

      // Load available templates from xeito-starters repo
      let response;
      try {
        response = await axios.get('https://api.github.com/repos/xeitojs/xeito-starters/contents/templates');
      } catch (error) {
        console.error(error);
        process.exit(1);
      }

      const availableTemplates = response.data.map((item) => item.name);

      const template = await select({
        message: 'Select a template',
        options: availableTemplates.map((name) => {
          const readableName = name.split('-').join(' ');
          return {
            label: readableName.charAt(0).toUpperCase() + readableName.slice(1),
            value: name
          }
        })
      });
  
      if (isCancel(template) || !template) {
        this.program.closingError('Please select a template');
      } else {
        resolve(template)
      }
    })
  }

  degitProject(projectName, templateName) {
    return new Promise((resolve, reject) => {
      const repoURL = 'xeitojs/xeito-starters/templates';

      log.info(emoji.emojify(':twisted_rightwards_arrows: ') + color.blue('Downloading base project...'));
      const emitter = degit(repoURL + '/' + templateName, { cache: false });
      emitter.clone(projectName)
        .then(() => {
          log.info(emoji.emojify(':white_check_mark: ') + color.green('Base project created'));
          resolve();
        })
        .catch((err) => {
          this.program.closingError('Error creating project');
          console.log(err);
        });
    });
  }

}