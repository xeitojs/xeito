import { ESLint } from "eslint";

const eslint = new ESLint({
  baseConfig: {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    ignorePatterns: ["node_modules", "dist", "coverage", "__tests__"],
  },
});

(async () => {
  const formatter = await eslint.loadFormatter("stylish");

  console.log("Linting core...");
  // Blob to load al the ts files excluding the test files
  const results = await eslint.lintFiles(["packages/core/**/*.ts"]);
  console.log(formatter.format(results));

  console.log('Linting injection...');
  const injectionResults = await eslint.lintFiles(['packages/injection/**/*.ts']);
  console.log(formatter.format(injectionResults));

  console.log('Linting store...');
  const storeResults = await eslint.lintFiles(['packages/store/**/*.ts']);
  console.log(formatter.format(storeResults));

  console.log('Linting router...');
  const routerResults = await eslint.lintFiles(['packages/router/**/*.ts']);
  console.log(formatter.format(routerResults));
})();