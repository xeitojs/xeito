import { Command } from 'commander';
import { createComponent } from './template-generators/create-component.js';
import { createService } from './template-generators/create-service.js';
import { createAction } from './template-generators/create-action.js';
import { createPipe } from './template-generators/create-pipe.js';
import emoji from 'node-emoji';
import chalk from 'chalk';
import inquirer from 'inquirer';

export function generateFiles(type, name) {
  const program = new Command('xeito');

  program.command('component [componentName]')
    .alias('c')
    .description('Create a new component')
    .action((name) => {
      if (!name) {
        getGeneratorName('Component')
          .then((name) => {
            createComponent(name);
          })
          .catch(() => {return})
      } else {
        if (validateName(name)) {
          createComponent(name);
        } else {
          return;
        }
      }
    });

  program.command('service [serviceName]')
    .alias('s')
    .description('Create a new service')
    .action((name) => {
      if (!name) {
        getGeneratorName('Service')
          .then((name) => {
            createService(name);
          })
          .catch(() => {return})
      } else {
        if (validateName(name)) {
          createService(name);
        } else {
          return;
        }
      }
    });

  program.command('action [actionName]')
    .alias('a')
    .description('Create a new action')
    .action((name) => {
      if (!name) {
        getGeneratorName('Action')
          .then((name) => {
            createAction(name);
          })
          .catch(() => {return})
      } else {
        if (validateName(name)) {
          createAction(name);
        } else {
          return;
        }
      }
    });

  program.command('pipe [pipeName]')
    .alias('p')
    .description('Create a new pipe')
    .action((name) => {
      if (!name) {
        getGeneratorName('Pipe')
          .then((name) => {
            createPipe(name);
          })
          .catch(() => {return})
      } else {
        if (validateName(name)) {
          createPipe(name);
        } else {
          return;
        }
      }
    });


  program.command('choose', { isDefault: true, hidden: true })
  .action(() => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select a type',
        choices: [
          {
            name: `${emoji.emojify(':package:')} component`,
            value: 'component'
          },
          {
            name: `${emoji.emojify(':syringe:')} service`,
            value: 'service'
          },
          {
            name: `${emoji.emojify(':minidisc:')} action`,
            value: 'action'
          },
          {
            name: `${emoji.emojify(':nut_and_bolt:')} pipe`,
            value: 'pipe'
          },
          {
            name: `${emoji.emojify(':x:')} Cancel & Exit`,
            value: 'cancel'
          }
        ]
      }
    ]).then((answers) => {
      console.log(answers.type)
      if (answers.type === 'component') {

        getGeneratorName('Component').then((answers) => {
          createComponent(name);
        }).catch(() => {return})

      } else if (answers.type === 'service') {

        getGeneratorName('Service').then((name) => {
          createService(name);
        }).catch(() => {return})

      } else if (answers.type === 'action') {

        getGeneratorName('Action').then((name) => {
          createAction(name);
        }).catch(() => {return})

      } else if (answers.type === 'pipe') {

        getGeneratorName('Pipe').then((name) => {
          createPipe(name);
        }).catch(() => {return})

      } else if (answers.type === 'cancel') {
        console.log(emoji.emojify(':x: -'), chalk.red('Cancelled'));
        process.exit(0);
      }
    
    });
  });

  let args;
  if (type) args = [type];
  if (name) args.push(name);

  program.parse(args, {
    from: 'user'
  });
}

function getGeneratorName(type) {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: `${type} name: `
      }
    ]).then((answers) => {
      // Validate the name
      if (!validateName(answers.name)) {
        reject();
      } else {
        resolve(answers.name);
      }
    });
  });
}

function validateName(name) {
  if (!name) {
    console.log(emoji.emojify(':x: -'), chalk.red('Invalid name'));
    return false;
  } else if (!name.match(/^[a-zA-Z0-9-\/]+$/)) {
    console.log(emoji.emojify(':x: -'), chalk.red('Invalid name'));
    return false;
  } else {
    return true;
  }
}

/**
 * 
`${emoji.emojify(':box:')} component`,
          `${emoji.emojify('')} service`,
          `${emoji.emojify('')} action`,
          `${emoji.emojify('')} pipe`,
          `${emoji.emojify(':x:')} cancel & exit`



 */