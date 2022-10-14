import { Command } from 'commander';
import { createComponent } from './template-generators/create-component.js';
import { createService } from './template-generators/create-service.js';
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
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Component name: ',
            validate: (value) => {
              if (!value.match(/^[a-zA-Z0-9-\/]+$/)) {
                return 'Invalid component name';
              }
              return true;
            }
          }
        ]).then((answers) => {
          createComponent(answers.name);
        });
      } else {
        // Validate the name
        if (!name.match(/^[a-zA-Z0-9-\/]+$/)) {
          console.log(emoji.emojify(':x: -'), chalk.red('Invalid component name'));
          return;
        }
        createComponent(name);
      }
    });

  program.command('service [serviceName]')
    .alias('s')
    .description('Create a new service')
    .action((name) => {
      if (!name) {
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Service name: ',
            validate: (value) => {
              if (!value.match(/^[a-zA-Z0-9-\/]+$/)) {
                return 'Invalid service name';
              }
              return true;
            }
          }
        ]).then((answers) => {
          createService(answers.name);
        });
      } else {
        // Validate the name
        if (!name.match(/^[a-zA-Z0-9-\/]+$/)) {
          console.log(emoji.emojify(':x: -'), chalk.red('Invalid service name'));
          return;
        }
        createService(name);
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
          'component',
          'service'
        ]
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name: '
      }
    ]).then((answers) => {
      if (answers.type === 'component') {
        // Validate the name it can include a path
        if (!answers.name.match(/^[a-zA-Z0-9-\/]+$/)) {
          console.log(emoji.emojify(':x: -'), chalk.red('Invalid component name'));
          return;
        }
        createComponent(answers.name);
      } else if (answers.type === 'service') {
        // Validate the name
        if (!answers.name.match(/^[a-zA-Z0-9-\/]+$/)) {
          console.log(emoji.emojify(':x: -'), chalk.red('Invalid service name'));
          return;
        }
        createService(answers.name);
      }
    });
  });

  let args;
  if (type) args = [type];
  if (name) args.push(name);

  program.parse(args,{
    from: 'user'
  });
}


