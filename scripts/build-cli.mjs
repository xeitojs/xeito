import { build } from "vite";
import path from "path";
import { fileURLToPath } from 'url';
import typescript from '@rollup/plugin-typescript';

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const buildCLI = () => {
  return new Promise(async (resolve, reject) => {
    console.log('Building CLI...');
    resolve(await build({
      root: "packages/cli",
      base: "/dist",
      outDir: "packages/cli/dist",
      mode: "production",
      build: {
        target: "es2015",
        lib: {
          entry: "index.ts",
          name: "core",
          formats: ["es"],
          fileName: (format) => `index.js`,
        },
        rollupOptions: {
          external: [
            "chalk",
            "commander",
            "degit",
            "handlebars",
            "inquirer",
            "node-emoji",
            "rimraf"
          ],
        },
        sourcemap: true,
      },
      plugins: [
        typescript({
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          declaration: true,
          declarationDir: path.resolve(__dirname, '../packages/cli/dist'),
          sourceMap: true,
          include: ["packages/cli/**/*.ts"],
          exclude: ["node_modules", "packages/cli/dist"],
          outDir: path.resolve(__dirname, '../packages/cli/dist/'),
        })
      ]
    }));
  });
};
