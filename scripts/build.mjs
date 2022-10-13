import { buildCLI } from "./build-cli.mjs";
import { buildCore } from "./build-core.mjs";
import { buildInjection } from "./build-injection.mjs";
import { buildRouter } from "./build-router.mjs";

console.log('------------------------------');
await buildCore();
await buildInjection();
await buildRouter();
// buildCLI(); // Disabled for now since CLI is not ready yet

process.exit(0);