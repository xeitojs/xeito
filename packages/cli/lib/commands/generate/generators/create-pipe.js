import Handlebars from 'handlebars';
import fs from 'fs';
import emoji from 'node-emoji';
import color from 'picocolors';
import nodePath from 'path';
import { kebabCase, pascalCase, camelCase } from 'case-anything';
import { getXeitoConfig } from '../../../utils/get-xeito-config.js';
import { intro, outro } from '@clack/prompts';

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
  intro(emoji.emojify(':rocket: ') + color.blue(`Creating pipe ${name}...`));

  // Read template  
  const loadTemplate = (path) => fs.readFileSync(new URL(path, import.meta.url));
  const pipeTemplate = loadTemplate('../templates/pipe');

  // Compile template
  const template = Handlebars.compile(pipeTemplate.toString());
  const output = template({
    className: pascalCase(name),
    selectorName: camelCase(name)
  });

  // Get creation path from xeito.config.json
  const xeitoConfig = getXeitoConfig();
  let creationPath = '';
  if (xeitoConfig.base) {
    creationPath = xeitoConfig.base + '/' + path;
  } else {
    creationPath = path;
  }

  // Create pipe and its folder
  fs.mkdirSync(nodePath.normalize(creationPath), { recursive: true });
  fs.writeFileSync(nodePath.normalize(creationPath + '/' + kebabCase(name) + '.ts'), output);

  outro(
    emoji.emojify(':sparkles: ') +
    color.green('Pipe created successfully at: ') +
    color.blue(
      nodePath.normalize(creationPath + '/' + kebabCase(name) + '.ts')
    )
  );

}
