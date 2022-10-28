import {Parcel} from '@parcel/core';

const args = process.argv.slice(2);
const demo = args[0];

const bundler = new Parcel({
  entries: [`./examples/${demo}/index.html`],
  defaultConfig: '@parcel/config-default',
  serveOptions: {
    port: 1234,
  },
});

console.log(`Running ./examples/${demo}/index.html demo...`);

console.log('Starting dev server...');

bundler.watch((error, buildEvent) => {
  if (error) {
    console.error(error);
    return;
  }

  if (buildEvent.type === 'buildSuccess') {
    console.log(`Server running at http://localhost:1234`);
  } else {
    console.log(buildEvent);
  }
});
