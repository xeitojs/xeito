import { build } from "vite";
import path from "path";
import { fileURLToPath } from 'url';
import typescript from '@rollup/plugin-typescript';

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const buildInjection = () => {
  return new Promise(async (resolve, reject) => {
    console.log('Building injection...');
    resolve(await build({
      root: "packages/injection",
      base: "/dist",
      outDir: "packages/injection/dist",
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
            "@xeito/core"
          ],
        },
        sourcemap: true,
      },
      plugins: [
        typescript({
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          declaration: true,
          declarationDir: path.resolve(__dirname, '../packages/injection/dist'),
          sourceMap: true,
          include: ["packages/injection/**/*.ts"],
          exclude: ["node_modules", "packages/injection/dist"],
          outDir: path.resolve(__dirname, '../packages/injection/dist/'),
        })
      ]
    }));
  });
};

