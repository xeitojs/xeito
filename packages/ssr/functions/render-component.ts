import { XeitoComponent } from "@xeito/core";
import { ComponentSlots } from "@xeito/core";

export async function renderComponent(component: typeof XeitoComponent, props: Record<string, any>, content: ComponentSlots) {
  const instance = new component(props, content);
  await instance.connectedCallback();

  let template = instance._template as string;
  template = `
    <${instance['_XeitoInternals'].selector} ${Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(' ').trim()}>
      ${template}
    </${instance['_XeitoInternals'].selector}>
  `;

  return template;
}
