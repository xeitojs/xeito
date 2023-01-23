import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import chalk from 'chalk';
import nodePath from 'path';
import { kebabCase, pascalCase } from 'case-anything';

export function createComponent(nameOrPath) {

  let name;
  let nameWithoutComponent;
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

  // Turn name to pascal case (e.g. my-component | myComponent -> MyComponent)
  name = pascalCase(name);

  // If the name doesnt end with Component, add it
  if (!name.endsWith('Component')) {
    name = name + 'Component';
  }

  // Remove Component from name to get the name without component (for path creation)
  nameWithoutComponent = name.replace('Component', '');

  // Notify user
  console.log(emoji.emojify(':rocket: -'), chalk.green('Creating component: ' + name + '...'));

  // Read template  
  const loadTemplate = (path) => fs.readFileSync(new URL(path, import.meta.url));
  const componentTemplate = loadTemplate('../../templates/component');

  // Compile template
  const template = Handlebars.compile(componentTemplate.toString());
  const output = template({ 
    className: name, 
    selectorName: kebabCase('app-' + name),
    stylesPath: kebabCase(name)
  });

  // Get app root from .xeitorc
  const xeitorc = JSON.parse(fs.readFileSync('.xeitorc'));
  const creationPath = xeitorc.appRoot + '/' + path;
  
  // Create component and its folder
  fs.mkdirSync(nodePath.normalize(creationPath + '/' + kebabCase(nameWithoutComponent)), { recursive: true });
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(nameWithoutComponent) + '/' + kebabCase(name) + '.ts'), output);

  // Create styles file
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(nameWithoutComponent) + '/' + kebabCase(name) + '.module.scss'), '');

  console.log(
    emoji.emojify(':sparkles: -'), 
    chalk.green(
      'Component created successfully at ' + 
      nodePath.normalize(creationPath + '/' + kebabCase(nameWithoutComponent) + '/' + kebabCase(name) + '.ts')
    )
  );

};
