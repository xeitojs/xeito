import { exec } from 'child_process';

const args = process.argv.slice(2);
const type = args[0];

const bump = (type, param, cb) => {

  let cmd = `npm version --commit-hooks false --git-tag-version false ${type}`;
  if (param) cmd += ` ${param}`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    cb();
  });
};

bump(type, null,  () => {
  bump(type, '--workspaces', () => {
    console.log('done');
  });
});
