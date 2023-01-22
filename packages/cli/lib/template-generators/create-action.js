import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import chalk from 'chalk';
import nodePath from 'path';

export function createAction(nameOrPath) {

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

  // Turn name to pascal case (e.g. my-action | myAction -> MyAction)
  name = pascalCase(name);

  // If the name is suffixed with "Action", remove it
  if (name.endsWith('Action')) {
    name = name.replace('Action', '');
  }

  // Notify user
  console.log(emoji.emojify(':rocket: -'), chalk.green('Creating action: ' + actionName(name) + '...'));

  // Read template  
  const loadTemplate = (path) => fs.readFileSync(new URL(path, import.meta.url));
  const actionTemplate = loadTemplate('../../templates/action');

  // Compile template
  const template = Handlebars.compile(actionTemplate.toString());
  const output = template({
    actionSelector: kebabCase(actionName(name)),
    actionName: actionName(name)
  });

  // Get app root from .xeitorc
  const xeitorc = JSON.parse(fs.readFileSync('.xeitorc'));
  const creationPath = xeitorc.appRoot + '/' + path;

  // Create action and its folder
  fs.mkdirSync(nodePath.normalize(creationPath), { recursive: true });
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(name) + '-action' + '.ts'), output);

  console.log(
    emoji.emojify(':sparkles: -'), 
    chalk.green(
      'Action created successfully at ' + 
      nodePath.normalize(creationPath + '/' + kebabCase(name) + '-action' + '.ts')
    )
  );

}

const actionName = string => {
  let pascal = pascalCase(string);
  if (!pascal.endsWith('Action')) {
    pascal = pascal + 'Action';
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
