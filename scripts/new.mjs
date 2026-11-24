// Creates a new content file from a template in content/templates/.
//
//   npm run new -- <type> <id> "Title" [--date YYYY-MM-DD]
//
// Types: project, thesis, blog, news, member, publication. The new file is a draft
// (draft: true) and an existing file is never overwritten.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { collections, ID_PATTERN } from './lib/content.mjs';
import { fromRoot } from './lib/paths.mjs';

const TYPES = {
  project: 'projects',
  thesis: 'theses',
  blog: 'blog',
  news: 'news',
  member: 'members',
  publication: 'publications',
};

const usage = `Usage: npm run new -- <type> <id> "Title" [--date YYYY-MM-DD]

  <type>   ${Object.keys(TYPES).join(', ')}
  <id>     file name and address: lower-case letters, digits and hyphens, e.g. race-update
  "Title"  title of the item (for a member: the full name)

Examples:
  npm run new -- blog first-race "Our first race"
  npm run new -- project lidar-mapping "LiDAR mapping"
  npm run new -- member jane-doe "Jane Doe"`;

function fail(message) {
  console.error(`${message}\n\n${usage}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const dateIndex = args.indexOf('--date');
const date = dateIndex >= 0 ? args.splice(dateIndex, 2)[1] : new Date().toISOString().slice(0, 10);
const [type, id, ...titleWords] = args;
const title = titleWords.join(' ').trim();

if (!TYPES[type]) fail(type ? `Unknown type "${type}".` : 'Missing type.');
if (!ID_PATTERN.test(id ?? '')) fail(`Invalid id "${id ?? ''}".`);
if (!title) fail('Missing title.');
if (
  !/^\d{4}-\d{2}-\d{2}$/.test(date ?? '') ||
  Number.isNaN(Date.parse(date)) ||
  new Date(date).toISOString().slice(0, 10) !== date
) {
  fail('Use a valid date: --date YYYY-MM-DD');
}

const collection = collections[TYPES[type]];
const template = await readFile(fromRoot('content/templates', collection.template), 'utf8');
// JSON strings are valid YAML strings, so quotes and colons in the title are safe.
const output = template
  .replaceAll('{{title}}', JSON.stringify(title))
  .replaceAll('{{date}}', date)
  .replaceAll('{{year}}', date.slice(0, 4))
  .replaceAll('{{id}}', id);

const file = `${collection.dir}/${id}${collection.ext}`;
await mkdir(dirname(fromRoot(file)), { recursive: true });
try {
  await writeFile(fromRoot(file), output, { flag: 'wx' });
} catch (error) {
  if (error.code === 'EEXIST') fail(`${file} already exists. Choose another id.`);
  throw error;
}
console.log(`Created draft: ${file}
Next: fill in the fields, preview with "npm run dev:drafts", and set "draft: false" once approved.`);
