import standardVersion from 'commit-and-tag-version';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const args = process.argv.slice(2);
const type = args[0];
const shouldCommit = args[1] === 'commit';
const noChangelog = args[2] === 'no-changelog';

// Get all package.json files inside of packages
const getPackages = () => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const packages = fs.readdirSync(path.resolve(__dirname, '../packages'));
  return packages.map((pkg) => {
    return path.resolve(__dirname, `../packages/${pkg}/package.json`);
  });
}

// Create bumpFiles object array
let filesToBump = getPackages();
filesToBump.push('package.json');
filesToBump = filesToBump.map((filename) => {
  return {
    filename: filename,
    type: 'json',
  }
});

// Run Standard Version
standardVersion({
  releaseAs: type,
  skip: {
    commit: !shouldCommit,
    tag: !shouldCommit,
    changelog: noChangelog,
  },
  bumpFiles: filesToBump
});
