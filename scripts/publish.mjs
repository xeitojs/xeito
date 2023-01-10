import { exec } from 'child_process';

const publish = (cb) => {

  const cmd = 'npm publish --workspaces=packages'

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
    cb();
  });
};

publish(() => {
  console.log('done');
});
