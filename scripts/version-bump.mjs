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

const getNextVersion = (version, type) => {
  switch(type) {
    case 'major':
      return `${parseInt(version.split('.')[0]) + 1}.0.0`;
    case 'minor':
      return `${version.split('.')[0]}.${parseInt(version.split('.')[1]) + 1}.0`;
    case 'patch':
      return `${version.split('.')[0]}.${version.split('.')[1]}.${parseInt(version.split('.')[2]) + 1}`;
    default:
      return version;
  }
}

// Bump version in the dependencies of all packages
const bumpDependencies = () => {
  const packages = getPackages();
  packages.forEach((pkg) => {
    const packageJson = JSON.parse(fs.readFileSync(pkg, 'utf8'));
    packageJson.dependencies = packageJson.dependencies || {};
    for(const dependency in packageJson.dependencies) {
      if(dependency.startsWith('@xeito')) {
        packageJson.dependencies[dependency] = `^${getNextVersion(packageJson.version, type)}`;
      }
    }
    fs.writeFileSync(pkg, JSON.stringify(packageJson, null, 2));
  });
}

// Bump version in the dependencies of all packages
bumpDependencies();

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
