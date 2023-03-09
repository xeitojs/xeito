import { defineConfig } from 'vite';
import xeito from '@xeito/vite-plugin-xeito';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [xeito(), Inspect()]
})
