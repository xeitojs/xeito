import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import chalk from 'chalk';

export function createComponent(nameOrPath) {

  let name;
  let path;

  console.log(emoji.emojify(':rocket: -'), chalk.green('Creating component...'));

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

  const loadTemplate = (path) => fs.readFileSync(new URL(path, import.meta.url));
  const componentTemplate = loadTemplate('../../templates/component');

  const template = Handlebars.compile(componentTemplate.toString());
  const output = template({ componentName: name, componentStyles: kebabCase(name) });

  // Create component and its folder
  fs.mkdirSync(path + '/' + kebabCase(name), { recursive: true });
  fs.writeFileSync(path + '/' + kebabCase(name) + '/' + kebabCase(name) + '.tsx', output);

  // Create styles file
  fs.writeFileSync(path + '/' + kebabCase(name) + '/' + kebabCase(name) + '.module.scss', '');

  console.log(emoji.emojify(':sparkles: - '), chalk.green('Component created successfully!'));

};

const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();
