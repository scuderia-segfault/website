import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Repository root (the folder that contains package.json). */
export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

/** Resolves a path relative to the repository root. */
export const fromRoot = (...parts) => resolve(root, ...parts);

/** Writes a file relative to the repository root, creating folders as needed. */
export async function writeOutput(path, contents) {
  const target = fromRoot(path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
}
