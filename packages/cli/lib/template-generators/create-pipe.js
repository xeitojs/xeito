import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import chalk from 'chalk';
import nodePath from 'path';

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

  // If the name is suffixed with "Pipe", remove it
  if (name.endsWith('Pipe')) {
    name = name.replace('Pipe', '');
  }

  // Notify user
  console.log(emoji.emojify(':rocket: -'), chalk.green('Creating pipe: ' + pipeName(name) + '...'));

  // Read template  
  const loadTemplate = (path) => fs.readFileSync(new URL(path, import.meta.url));
  const pipeTemplate = loadTemplate('../../templates/pipe');

  // Compile template
  const template = Handlebars.compile(pipeTemplate.toString());
  const output = template({
    pipeSelector: kebabCase(pipeName(name)),
    pipeName: pipeName(name)
  });

  // Get app root from .xeitorc
  const xeitorc = JSON.parse(fs.readFileSync('.xeitorc'));
  const creationPath = xeitorc.appRoot + '/' + path;

  // Create pipe and its folder
  fs.mkdirSync(nodePath.normalize(creationPath), { recursive: true });
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(name) + '-pipe' + '.ts'), output);

  console.log(
    emoji.emojify(':sparkles: -'), 
    chalk.green(
      'Pipe created successfully at ' + 
      nodePath.normalize(creationPath + '/' + kebabCase(name) + '-pipe' + '.ts')
    )
  );

}

const pipeName = string => {
  let pascal = pascalCase(string);
  if (!pascal.endsWith('Pipe')) {
    pascal = pascal + 'Pipe';
  }
  return pascal;
}

const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();

const pascalCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('');
