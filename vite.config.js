import { defineConfig } from 'vite';
import { resolve, relative } from 'node:path';
import { readdirSync } from 'node:fs';
const root = import.meta.dirname;
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    if (['node_modules', 'dist', '.git', '.idea'].includes(entry.name)) return [];
    const path = resolve(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}
export default defineConfig({
  base: './',
  build: { rollupOptions: { input: Object.fromEntries(htmlFiles(root).map(path => [relative(root, path).replaceAll('\\', '/'), path])) } },
});
