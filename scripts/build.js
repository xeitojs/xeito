import { exec } from 'child_process';
import rimraf from 'rimraf';

const argv = process.argv.slice(2);

let _prod = false;
if (argv.includes('--prod')) _prod = true;

const getTsupCommand = (packageDir) => {
  const command = `tsup-node packages/${packageDir}/index.ts --sourcemap --outDir=packages/${packageDir}/dist --dts --format=esm`;
  if (_prod) return `${command} --minify`;
  return command;
}

const runTsup = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      console.log(stdout);
      console.error(stderr);
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve();
    });
  });
}

async function main() {

  console.log('Building core...');
  rimraf.sync('packages/core/dist');
  await runTsup(getTsupCommand('core'));
  
  console.log('Building injection...');
  rimraf.sync('packages/injection/dist');
  await runTsup(getTsupCommand('injection'));

  console.log('Building router...');
  rimraf.sync('packages/router/dist');
  await runTsup(getTsupCommand('router'));

  console.log('Building store...');
  rimraf.sync('packages/store/dist');
  await runTsup(getTsupCommand('store'));

}
main();
