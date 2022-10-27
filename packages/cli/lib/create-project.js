import degit from 'degit';
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import emoji from 'node-emoji';
import rimraf from 'rimraf';

export async function createProject(name) {

  // Check if we have a name
  if (!name) {
    // console.log(emoji.emojify(':x: -'), chalk.red('You must specify a project name'));
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        validate: (value) => {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a project name';
          }
        }
      }
    ]);

    name = answers.name;
  }

  // Check if the name is valid
  if (!name.match(/^[a-zA-Z0-9-]+$/)) {
    console.log(emoji.emojify(':x: -'), chalk.red('Invalid project name'));
    return;
  }

  // Check if there is a folder with the same name
  if (fs.existsSync(name)) {
    console.log(emoji.emojify(':x: -'), chalk.red('There is already a folder with the same name'));
    return;
  }

  // Ask for the project template
  inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select a template',
      choices: [
        'blank',
        'services-example',
        // 'complete-example' // Disabled for now because the template doesn't exist
      ]
    }
  ]).then((answers) => {
    console.log(emoji.emojify(':rocket: -'), chalk.bgYellow.black('Creating project...'));
    degitBase(name)
      .then(() => {
        degitTemplate(name, answers.template) 
          .then(() => {
            // Delete .gitkeep files
            rimraf.sync(name + '/**/.gitkeep');
            
            console.log(emoji.emojify(':tada: -'), chalk.bgGreen.black('Project ready!'));
            // Next steps
            console.log(''); // Empty line
            console.log(emoji.emojify(':arrow_forward: -'), chalk.blue('Run the following commands to start the project:'));
            console.log(''); // Empty line
            console.log('    ', chalk.inverse.bold(' cd ' + name + ' '));
            console.log(''); // Empty line
            console.log('    ', chalk.inverse.bold(' npm install '));
            console.log(''); // Empty line
            console.log('    ', chalk.inverse.bold(' npm start '));
            console.log(''); // Empty line
          });
      });
  });
  

}

function degitBase(name) {
  return new Promise((resolve, reject) => {
    const repoURL = 'aerotoad/xeito-starters/templates';

    console.log(emoji.emojify(':twisted_rightwards_arrows: -'), chalk.blue('Downloading base project...'));
    const emitter = degit(repoURL + '/base', { cache: false });
    emitter.clone(name)
      .then(() => {
        console.log(emoji.emojify(':white_check_mark: -'), chalk.green('Base project created'));
        resolve();
      })
      .catch((err) => {
        console.log(emoji.emojify(':x: -'), chalk.red('Error creating project'));
        console.log(err);
      });
  });
}

function degitTemplate(name, template) {
  return new Promise((resolve, reject) => {
    const repoURL = 'aerotoad/xeito-starters/templates';

    console.log(emoji.emojify(':twisted_rightwards_arrows: -'), chalk.blue('Applying template...'));
    const emitter = degit(repoURL + '/' + template , { cache: false, force: true });
    emitter.clone(name)
      .then(() => {
        console.log(emoji.emojify(':white_check_mark: -'), chalk.green('Template applied'));
        resolve();
      })
      .catch((err) => {
        console.log(emoji.emojify(':x: -'), chalk.red('Error applying template'));
        console.log(err);
        process.exit(1);
      });
  });
}