import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import color from 'picocolors';
import nodePath from 'path';
import { kebabCase, pascalCase } from 'case-anything';
import { getXeitoConfig } from '../../../utils/get-xeito-config.js';
import { intro, outro } from '@clack/prompts';

export async function createComponent(nameOrPath) {

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
  intro(emoji.emojify(':rocket: ') + color.blue(`Creating component ${name}...`));

  // Read template  
  const loadTemplate = (path) => fs.readFileSync(new URL(path, import.meta.url));
  const componentTemplate = loadTemplate('../templates/component');

  // Compile template
  const template = Handlebars.compile(componentTemplate.toString());
  const output = template({ 
    className: name, 
    selectorName: kebabCase('app-' + name),
    stylesPath: kebabCase(name)
  });

  // Get creation path from xeito.config.json
  const xeitoConfig = getXeitoConfig();
  let creationPath = '';
  if (xeitoConfig.base) {
    creationPath = xeitoConfig.base + '/' + path;
  } else {
    creationPath = path;
  }
  
  // Create component and its folder
  fs.mkdirSync(nodePath.normalize(creationPath + '/' + kebabCase(nameWithoutComponent)), { recursive: true });
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(nameWithoutComponent) + '/' + kebabCase(name) + '.ts'), output);

  // Create styles file
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(nameWithoutComponent) + '/' + kebabCase(name) + '.module.scss'), '');

  outro(
    emoji.emojify(':sparkles: ') +
    color.green('Component created successfully at: ') +
    color.blue(
      nodePath.normalize(creationPath + '/' + kebabCase(nameWithoutComponent) + '/' + kebabCase(name) + '.ts')
    )
  );

};
