import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import chalk from 'chalk';
import nodePath from 'path';

export function createComponent(nameOrPath) {

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

  // Capitalize first letter
  name = name[0].toUpperCase() + name.slice(1);

  // Check if the name ends with component (remove it if it does)
  if (name.endsWith('Component')) {
    name = name.replace('Component', '');
  }

  // Notify user
  console.log(emoji.emojify(':rocket: -'), chalk.green('Creating component: ' + name + '...'));

  // Read template  
  const loadTemplate = (path) => fs.readFileSync(new URL(path, import.meta.url));
  const componentTemplate = loadTemplate('../../templates/component');

  // Compile template
  const template = Handlebars.compile(componentTemplate.toString());
  const output = template({ componentName: name, componentStyles: kebabCase(name), componentSelector: 'app-' + kebabCase(name) });

  // Get app root from .xeitorc
  const xeitorc = JSON.parse(fs.readFileSync('.xeitorc'));
  const creationPath = xeitorc.appRoot + '/' + path;
  
  // Create component and its folder
  fs.mkdirSync(nodePath.normalize(creationPath + '/' + kebabCase(name)), { recursive: true });
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(name) + '/' + kebabCase(name) + '-component' + '.ts'), output);

  // Create styles file
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(name) + '/' + kebabCase(name) + '-component' + '.module.scss'), '');

  console.log(
    emoji.emojify(':sparkles: -'), 
    chalk.green(
      'Component created successfully at ' + 
      nodePath.normalize(creationPath + '/' + kebabCase(name) + '/' + kebabCase(name) + '-component' + '.ts')
    )
  );

};

const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();
