import rimraf from "rimraf";
import fs from "fs";

// Get all the packages in the packages folder
const packages = fs.readdirSync("packages");

// For each package, delete the dist folder
packages.forEach((pkg) => {
  rimraf.sync(`packages/${pkg}/dist`);
});