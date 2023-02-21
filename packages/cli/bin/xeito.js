#! /usr/bin/env node

import { Program } from "../framework/classes/program.js";
import { NewProject } from "../lib/commands/new-project/new-project.js";
import { GenerateType } from '../lib/commands/generate/generate.js'
import { GeneratePipe } from "../lib/commands/generate/generate-pipe.js";
import { GenerateService } from "../lib/commands/generate/generate-service.js";
import { GenerateComponent } from "../lib/commands/generate/generate-component.js";
import { GenerateAction } from "../lib/commands/generate/generate-action.js";
import fs from 'fs';

process.title = 'xeito';
process.on('unhandledRejection', function(r) { process.stderr.write(String(r)); process.exit(1); });

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const packageJSON = loadJSON('../package.json');

const app = new Program({
  name: "Xeito",
  description: 'Xeito CLI tool.\nThe fastest way to create a new Xeito project and generate components, services, pipes and actions',
  version: packageJSON.version,
  routes: [
    {
      name: ['new', 'n'],
      command: NewProject
    },
    {
      name: ['generate', 'g'],
      command: GenerateType,
      children: [
        {
          name: ['component', 'c'],
          command: GenerateComponent
        },
        {
          name: ['service', 's'],
          command: GenerateService
        },
        {
          name: ['pipe', 'p'],
          command: GeneratePipe
        },
        {
          name: ['action', 'a'],
          command: GenerateAction
        }
      ]
    }
  ]
});