import { build } from "vite";
import path from "path";
import { fileURLToPath } from 'url';
import typescript from '@rollup/plugin-typescript';

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export const buildRouter = () => {
  return new Promise(async (resolve, reject) => {
    console.log('Building router...');
    resolve(await build({
      root: "packages/router",
      base: "/dist",
      outDir: "packages/router/dist",
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
            "@xeito/core",
            "@xeito/injection",
            "@xeito/store",
            "history",
            "path-to-regexp",
            "rxjs"
          ],
        },
        sourcemap: true,
      },
      plugins: [
        typescript({
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          declaration: true,
          declarationDir: path.resolve(__dirname, '../packages/router/dist'),
          sourceMap: true,
          include: ["packages/router/**/*.ts"],
          exclude: ["node_modules", "packages/router/dist"],
          outDir: path.resolve(__dirname, '../packages/router/dist/'),
        })
      ]
    }));
  });
};

