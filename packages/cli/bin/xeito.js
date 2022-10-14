#! /usr/bin/env node

process.title = 'xeito';
process.on('unhandledRejection', function(r) { process.stderr.write(String(r)); process.exit(1); });

import { initialize } from '../lib/index.js';
initialize();