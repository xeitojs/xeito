import { build } from "vite";
import path from "path";
import { fileURLToPath } from 'url';
import typescript from '@rollup/plugin-typescript';

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const buildCore = () => {
  return new Promise(async (resolve, reject) => {
    console.log('Building core...');
    resolve(await build({
      root: "packages/core",
      base: "/dist",
      outDir: "packages/core/dist",
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
            "@xeito/injection",
            "reflect-metadata", 
            "uhtml", 
            "rxjs",
          ],
        },
        sourcemap: true,
      },
      plugins: [
        typescript({
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          declaration: true,
          declarationDir: path.resolve(__dirname, '../packages/core/dist'),
          sourceMap: true,
          include: ["packages/core/**/*.ts"],
          exclude: ["node_modules", "packages/core/dist"],
          outDir: path.resolve(__dirname, '../packages/core/dist/'),
        })
      ]
    }));
  });
};

