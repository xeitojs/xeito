import { Xeito } from "@xeito/core";
import { unrollComponent } from "./unroll-component";

export async function renderToString(app: any) {

  // Prepare the Xeito instance for server side rendering
  app.prepareSSR();
  
  // Get the root component
  const rootComponent = app.global.components[0];

  return await unrollComponent(rootComponent);
}
