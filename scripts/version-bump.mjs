import { exec } from 'child_process';
import standardVersion from 'commit-and-tag-version';

const args = process.argv.slice(2);
const type = args[0];
const shouldCommit = args[1] === 'commit';

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

    console.log('Version updated');
    
    console.log('Generating changelog...');
    standardVersion({
      skip: {
        bump: true,
        commit: !shouldCommit,
      }
    });

  });
});