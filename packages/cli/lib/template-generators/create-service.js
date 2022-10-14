import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import chalk from 'chalk';

export function createService(nameOrPath) {

  let name;
  let path;

  console.log(emoji.emojify(':rocket: -'), chalk.green('Creating service...'));

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
  const serviceTemplate = loadTemplate('../../templates/service');

  const template = Handlebars.compile(serviceTemplate.toString());
  const output = template({ componentName: name });

  // Create service and its folder
  fs.mkdirSync(path, { recursive: true });
  fs.writeFileSync(path + '/' + kebabCase(serviceName(name)) + '.ts', output);

  console.log(emoji.emojify(':sparkles: - '), chalk.green('Service created successfully!'));
};

const serviceName = string => {
  // Remove service from the name if it exists
  if (string.toLowerCase().includes('service')) {
    string = string.replace('Service', '');
  }

  // Add it at the end with camel case
  return string[0].toLowerCase() + string.slice(1) + 'Service';
}
  

const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();