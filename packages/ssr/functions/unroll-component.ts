import { XeitoComponent } from "@xeito/core";
import { renderComponent } from "./render-component";
import { getSlotContent } from "./get-slot-content";
import { parse } from 'node-html-parser';

export async function unrollComponent(component: typeof XeitoComponent, props = {}, slotContent = {}) {
  const internals = component.prototype['_XeitoInternals'];
  const imports = internals.imports;

  const renderResult = await renderComponent(component, props, slotContent);

  if (imports.length === 0) {
    return renderResult;
  }

  const selectors = imports.map((component) => component.prototype['_XeitoInternals'].selector);
  
  const root = parse(renderResult);

  for(const selector of selectors) {
    const elements = root.querySelectorAll(selector);
    for(const element of elements) {
      const component = imports.find((component) => component.prototype['_XeitoInternals'].selector === selector);
      const props = element.attributes;
      const slotContent = await getSlotContent(element);

      const replacement = await unrollComponent(component, props, slotContent);
      element.replaceWith(replacement);
    }
  }

  return root.toString();
}
