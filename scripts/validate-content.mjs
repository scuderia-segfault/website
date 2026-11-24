// Checks all content files (including drafts) before a build:
// required fields, ids, dates, enums, referenced images and links between items.
import {
  collections,
  crossReferenceProblems,
  isPublished,
  readCollection,
  readData,
  validateCollection,
} from './lib/content.mjs';

const problems = [];
const published = {};
let count = 0;

for (const name of Object.keys(collections)) {
  const items = await readCollection(name);
  problems.push(...(await validateCollection(name, items)));
  published[name] = items.filter(isPublished);
  count += items.length;
}
problems.push(...crossReferenceProblems(published));

// JSON lists in content/data/: unique, well-formed ids.
for (const name of ['videos', 'archive', 'sponsors', 'results']) {
  const items = await readData(name);
  const pattern = name === 'videos' ? /^[A-Za-z0-9_-]{11}$/ : /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const ids = new Set();
  for (const item of items) {
    if (typeof item.id !== 'string' || !pattern.test(item.id)) {
      problems.push(`content/data/${name}.json: invalid id ${JSON.stringify(item.id)}`);
    }
    if (ids.has(item.id)) problems.push(`content/data/${name}.json: duplicate id ${item.id}`);
    ids.add(item.id);
    count++;
  }
}

const site = await readData('site');
for (const key of ['linkedin', 'github', 'university']) {
  if (new URL(site[key]).protocol !== 'https:')
    problems.push(`content/data/site.json: ${key} must be https`);
}

if (problems.length) {
  console.error(`Content problems:\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Validated ${count} content records and official network links.`);
