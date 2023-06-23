import { XeitoComponent } from "@xeito/core";

export async function renderComponent(component: typeof XeitoComponent, props: Record<string, any>, content: Record<string, string>) {
  const instance = new component({ props: props, slotContent: content });

  // Turn the state map into a JSON string
  const state = Object.fromEntries(instance['_state']);

  await instance.connectedCallback();
  let template = instance._template as string;

  template = `
    <${instance['_XeitoInternals'].selector} ${Object.entries(props).map(([key, value]) => `${key}="${value}"`).join(' ')} hydrate="true">
      ${template}
      <script type="application/json">
        ${JSON.stringify(state)}
      </script>
    </${instance['_XeitoInternals'].selector}>
  `;
  return template;
}
