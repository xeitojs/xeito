import { Command } from 'commander';
import fs from 'fs';
import { createProject } from './create-project.js';
import { generateFiles } from './generate.js';

export function initialize() {

  const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
  const packageJSON = loadJSON('../package.json');

  const program = new Command('xeito');
  
  program.command('version')
    .alias('v')
    .description('Show version')
    .action(() => {
      console.log(packageJSON.version);
    });

  program.command('new [projectName]')
    .description('Create a new project')
    .action((name) => {
      createProject(name);
    });

  program.command('generate [type] [name]')
    .alias('g')
    .description('Generate a new component or service')
    .action((type, name) => {
      generateFiles(type, name);
    });
  

  program.parse();
}