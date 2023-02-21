import path from 'path';
import fs from 'fs';

export const getXeitoConfig = () => {
  let xeitoConfig = {};
  // Check if xeito.config.json exists
  if (fs.existsSync(path.normalize(process.cwd() + '/xeito.config.json'))) {
    // Read xeito.config.json
    xeitoConfig = JSON.parse(fs.readFileSync(path.normalize(process.cwd() + '/xeito.config.json')));
  }

  return xeitoConfig;
};
