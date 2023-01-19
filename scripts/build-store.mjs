import { build } from "vite";
import path from "path";
import { fileURLToPath } from 'url';
import typescript from '@rollup/plugin-typescript';

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const buildStore = () => {
  return new Promise(async (resolve, reject) => {
    console.log('Building Store...');
    resolve(await build({
      root: "packages/store",
      base: "/dist",
      outDir: "packages/store/dist",
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
          external: [],
        },
        sourcemap: true,
      },
      plugins: [
        typescript({
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          declaration: true,
          declarationDir: path.resolve(__dirname, '../packages/store/dist'),
          sourceMap: true,
          include: ["packages/store/**/*.ts"],
          exclude: ["node_modules", "packages/store/dist"],
          outDir: path.resolve(__dirname, '../packages/store/dist/'),
        })
      ]
    }));
  });
};