import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import chalk from 'chalk';
import nodePath from 'path';
import { kebabCase, pascalCase, camelCase } from 'case-anything';

export function createPipe(nameOrPath) {

  let name;
  let path;

  // Check if name is a path
  if (nameOrPath.includes('/')) {
    const pathParts = nameOrPath.split('/');
    name = pathParts.pop();
    path = nameOrPath.replace(name, '');
  } else {
    name = nameOrPath;
    path = '.';
  }

  // Turn name to pascal case (e.g. my-pipe | myPipe -> MyPipe)
  name = pascalCase(name);

  // If the name doesnt end with Pipe, add it
  if (!name.endsWith('Pipe')) {
    name = name + 'Pipe';
  }

  // Notify user
  console.log(emoji.emojify(':rocket: -'), chalk.blueBright('Creating pipe: ' + name + '...'));

  // Read template  
  const loadTemplate = (path) => fs.readFileSync(new URL(path, import.meta.url));
  const pipeTemplate = loadTemplate('../../templates/pipe');

  // Compile template
  const template = Handlebars.compile(pipeTemplate.toString());
  const output = template({
    className: pascalCase(name),
    selectorName: camelCase(name)
  });

  // Get app root from .xeitorc
  const xeitorc = JSON.parse(fs.readFileSync('.xeitorc'));
  const creationPath = xeitorc.appRoot + '/' + path;

  // Create pipe and its folder
  fs.mkdirSync(nodePath.normalize(creationPath), { recursive: true });
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(name) + '.ts'), output);

  console.log(
    emoji.emojify(':sparkles: -'), 
    chalk.green(
      'Pipe created successfully at ' + 
      nodePath.normalize(creationPath + '/' + kebabCase(name) + '.ts')
    )
  );

}
