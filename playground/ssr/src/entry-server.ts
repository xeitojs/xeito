import { renderToString } from '../../../packages/ssr';
import { app } from './main';

export async function render() {
  return await renderToString(app);
}
