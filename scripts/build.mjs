import { buildCLI } from "./build-cli.mjs";
import { buildCore } from "./build-core.mjs";
import { buildInjection } from "./build-injection.mjs";
import { buildRouter } from "./build-router.mjs";
import { buildStore } from "./build-store.mjs";

console.log('------------------------------');
await buildCore();
await buildInjection();
await buildRouter();
await buildStore();
// buildCLI(); // Disabled - CLI doesn't need building/bundling

process.exit(0);