// Checks the built site in dist/: local links and assets, anchors, duplicate ids,
// draft exclusion, BibTeX exports, figure provenance and membership groups.
import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { collections, isPublished, MEMBER_GROUPS, readCollection } from './lib/content.mjs';
import { fromRoot } from './lib/paths.mjs';

const dist = fromRoot('dist');

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => (e.isDirectory() ? listFiles(resolve(dir, e.name)) : resolve(dir, e.name))),
  );
  return nested.flat();
}

const htmlFiles = (await listFiles(dist)).filter((p) => p.endsWith('.html'));
const docs = new Map(await Promise.all(htmlFiles.map(async (p) => [p, await readFile(p, 'utf8')])));

let links = 0;
for (const [file, html] of docs) {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(ids.length, new Set(ids).size, `Duplicate IDs: ${file}`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(?:https?:|mailto:|data:|\/\/)/.test(value)) continue;
    const [path, fragment] = value.split('#');
    const target = path ? resolve(dirname(file), decodeURIComponent(path.split('?')[0])) : file;
    assert(target.startsWith(dist), `Link escapes dist: ${value} in ${file}`);
    await access(target);
    links++;
    if (fragment && docs.has(target)) {
      assert(docs.get(target).includes(`id="${fragment}"`), `Missing anchor ${value} in ${file}`);
    }
  }
}

// Every collection must be non-empty and no draft may be published.
const content = {};
for (const name of Object.keys(collections)) content[name] = await readCollection(name);
for (const name of ['projects', 'members', 'publications', 'theses']) {
  assert(content[name].some(isPublished), `No published ${name}`);
}
const pagePath = {
  projects: (id) => `projects/${id}.html`,
  theses: (id) => `work/${id}.html`,
  news: (id) => `news/${id}/index.html`,
  blog: (id) => `blog/${id}/index.html`,
};
for (const [name, path] of Object.entries(pagePath)) {
  for (const item of content[name].filter((i) => !isPublished(i))) {
    assert(!docs.has(resolve(dist, path(item.id))), `Draft published: ${item.file}`);
  }
}
const membersPage = docs.get(resolve(dist, 'members.html'));
for (const m of content.members.filter((i) => !isPublished(i))) {
  assert(!membersPage.includes(`id="${m.id}"`), `Draft published: ${m.file}`);
}
console.log(
  `Checked ${htmlFiles.length} HTML pages, ${links} local links/assets, collection IDs and draft exclusion.`,
);

const publications = content.publications.filter(isPublished);
for (const pub of publications) {
  const bib = await readFile(resolve(dist, 'citations', `${pub.id}.bib`), 'utf8');
  assert(bib.includes('title = {'), `Missing BibTeX title: ${pub.id}`);
  if (pub.thumbnail) {
    assert(pub.thumbnailSource && pub.thumbnailPage > 0, `Missing figure provenance: ${pub.id}`);
    await access(resolve(dist, pub.thumbnail));
  }
}
for (const pub of content.publications.filter((i) => !isPublished(i))) {
  await assert.rejects(
    access(resolve(dist, 'citations', `${pub.id}.bib`)),
    `Draft published: ${pub.file}`,
  );
}
assert(
  content.members.every((m) => MEMBER_GROUPS.includes(m.status)),
  'Unknown membership group',
);
console.log(
  `Checked ${publications.length} BibTeX exports, figure provenance and membership groups.`,
);
