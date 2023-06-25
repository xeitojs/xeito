import { html } from "@xeito/core";
import { HTMLElement, Node } from 'node-html-parser';

export async function getSlotContent(element: HTMLElement) {
  const slotContent: Record<string, any> = {
    default: ''
  };
  const children: Node[] = Array.from(element.childNodes);
  
  if (children) {
    for(let child in children) {
      const childEl = children[child] as any;

      if (childEl.getAttribute?.('slot')) {
        const slot = (childEl as any)?.getAttribute?.('slot');
        if (slot) {
          if (!slotContent[slot]) slotContent[slot] = '';
          slotContent[slot] += childEl.toString();
        } else {
          slotContent.default += childEl.toString();
        }
      } else {
        slotContent.default += childEl.toString();
      }
    }
  }
  
  const entries = Object.entries(slotContent);
  for(const entry of entries) {
    const [key, value] = entry;
    slotContent[key] = await html([value] as any);
  }

  return slotContent;
}
