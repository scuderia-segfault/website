// Loads and validates the site content.
//
// Content that people add regularly lives in one file per item (like Astro or Eleventy
// "content collections"): the file name is the id and the URL slug, the metadata is YAML.
//   content/projects/<id>.md       YAML front matter + Markdown description
//   content/theses/<id>.md         YAML front matter + Markdown sections
//   content/blog/<id>.md           YAML front matter + Markdown article
//   content/news/<id>.md           YAML front matter + Markdown article
//   content/members/<id>.yml       YAML only
//   content/publications/<id>.yml  YAML only
// Small lists that rarely change (cars, results, sponsors, videos, archive, site links)
// stay as JSON files in content/data/.
import { access, readFile, readdir } from 'node:fs/promises';
import { extname } from 'node:path';
import YAML from 'yaml';
import { fromRoot } from './paths.mjs';

export const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const MEMBER_GROUPS = ['Active Team', 'Associated Members', 'Alumni'];
export const PUBLICATION_TYPES = [
  'Journal',
  'Conference',
  'Workshop',
  'Preprint',
  'Book chapter',
  'Thesis',
  'Other',
];
export const THESIS_STATUSES = ['Open', 'In progress', 'Topic proposal', 'Closed'];

const byOrderThenId = (a, b) =>
  (a.order ?? Infinity) - (b.order ?? Infinity) || a.id.localeCompare(b.id);

const postFields = {
  title: 'string',
  date: 'date',
  draft: 'boolean',
  author: 'string?',
  summary: 'string?',
  cover: 'string?',
  tags: 'string[]?',
  repositories: 'object[]?',
};

/**
 * Collection definitions. `fields` lists the fields the templates rely on:
 * a trailing `?` marks an optional field. Other fields are kept and passed through.
 */
export const collections = {
  projects: {
    dir: 'content/projects',
    ext: '.md',
    template: 'project.md',
    fields: {
      title: 'string',
      draft: 'boolean',
      order: 'number?',
      subtitle: 'string?',
      period: 'string',
      category: 'string',
      status: 'string',
      image: 'string',
      imageCaption: 'string',
      summary: 'string',
      people: 'string[]',
      keywords: 'string[]',
      videos: 'string[]',
      sources: 'object[]',
      parentId: 'string?',
    },
    files: (p) => [p.image, ...(p.photos ?? []).map((photo) => `uploads/${photo.file}`)],
    sort: byOrderThenId,
  },
  theses: {
    dir: 'content/theses',
    ext: '.md',
    template: 'thesis.md',
    fields: {
      title: 'string',
      draft: 'boolean',
      order: 'number?',
      type: 'string',
      summary: 'string',
      status: THESIS_STATUSES,
      project: 'string?',
      topics: 'string[]',
      tasks: 'string[]',
      background: 'string[]',
      subject: 'string',
      source: 'string',
      sourceLabel: 'string?',
      contact: 'string?',
    },
    sort: byOrderThenId,
  },
  members: {
    dir: 'content/members',
    ext: '.yml',
    template: 'member.yml',
    fields: {
      name: 'string',
      draft: 'boolean',
      order: 'number?',
      status: MEMBER_GROUPS,
      bio: 'string?',
      image: 'string?',
      credit: 'string?',
      topics: 'string[]',
      contributions: 'string[]',
      contributionSources: 'string[]?',
      thesis: 'string?',
    },
    files: (m) => [m.image],
    sort: byOrderThenId,
  },
  publications: {
    dir: 'content/publications',
    ext: '.yml',
    template: 'publication.yml',
    fields: {
      title: 'string',
      draft: 'boolean',
      year: 'number',
      type: PUBLICATION_TYPES,
      citation: 'string',
      url: 'string',
      authors: 'string[]',
      venue: 'string?',
      racing: 'boolean?',
      thumbnail: 'string?',
      aliases: 'string[]?',
    },
    files: (p) => [p.thumbnail],
    // Newest first, then alphabetically by id.
    sort: (a, b) => b.year - a.year || a.id.localeCompare(b.id),
  },
  news: {
    dir: 'content/news',
    ext: '.md',
    template: 'news.md',
    fields: postFields,
    files: (p) => [p.cover],
    sort: (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id),
  },
  blog: {
    dir: 'content/blog',
    ext: '.md',
    template: 'blog.md',
    fields: postFields,
    files: (p) => [p.cover],
    sort: (a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id),
  },
};

/** Splits a Markdown file into YAML front matter and body. */
export function parseFrontMatter(raw, file) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing front matter between --- lines`);
  return { data: parseYaml(match[1], file) ?? {}, body: match[2] };
}

function parseYaml(source, file) {
  try {
    return YAML.parse(source);
  } catch (error) {
    throw new Error(`${file}: invalid YAML: ${error.message}`);
  }
}

const isValidDate = (value) =>
  typeof value === 'string' &&
  DATE_PATTERN.test(value) &&
  !Number.isNaN(Date.parse(value)) &&
  new Date(value).toISOString().slice(0, 10) === value;

function checkField(value, rule) {
  if (Array.isArray(rule)) return rule.includes(value) || `must be one of: ${rule.join(', ')}`;
  const optional = rule.endsWith('?');
  const type = optional ? rule.slice(0, -1) : rule;
  if (value === undefined || value === null) return optional || 'is required';
  switch (type) {
    case 'string':
      return typeof value === 'string' || 'must be text';
    case 'number':
      return typeof value === 'number' || 'must be a number';
    case 'boolean':
      return typeof value === 'boolean' || 'must be true or false';
    case 'date':
      return isValidDate(value) || 'must be a date written as "YYYY-MM-DD" (in quotes)';
    case 'string[]':
      return (
        (Array.isArray(value) && value.every((v) => typeof v === 'string')) ||
        'must be a list of texts'
      );
    case 'object[]':
      return (
        (Array.isArray(value) && value.every((v) => v && typeof v === 'object')) ||
        'must be a list of entries'
      );
    default:
      throw new Error(`Unknown field rule: ${rule}`);
  }
}

/** Reads every item of a collection, including drafts. Throws on malformed files. */
export async function readCollection(name) {
  const def = collections[name];
  const names = (await readdir(fromRoot(def.dir)).catch(() => []))
    .filter((f) => extname(f) === def.ext)
    .sort();
  const items = [];
  for (const fileName of names) {
    const file = `${def.dir}/${fileName}`;
    const raw = await readFile(fromRoot(file), 'utf8');
    const id = fileName.slice(0, -def.ext.length);
    if (def.ext === '.md') {
      const { data, body } = parseFrontMatter(raw, file);
      items.push({ ...data, id, body, file });
    } else {
      items.push({ ...parseYaml(raw, file), id, file });
    }
  }
  return items.sort(def.sort);
}

/** Returns a list of human-readable problems for one collection. */
export async function validateCollection(name, items) {
  const def = collections[name];
  const problems = [];
  for (const item of items) {
    if (!ID_PATTERN.test(item.id)) {
      problems.push(`${item.file}: file name must use only a-z, 0-9 and single hyphens`);
    }
    for (const [field, rule] of Object.entries(def.fields)) {
      const result = checkField(item[field], rule);
      if (result !== true) problems.push(`${item.file}: "${field}" ${result}`);
    }
    if (!item.draft && def.files) {
      for (const path of def.files(item).filter(Boolean)) {
        if (/^https?:/.test(path)) continue;
        try {
          await access(fromRoot('public', path));
        } catch {
          problems.push(`${item.file}: file public/${path} does not exist`);
        }
      }
    }
  }
  return problems;
}

/** Problems that involve more than one collection, such as links between items. */
export function crossReferenceProblems({ projects, theses, members, publications }) {
  const problems = [];
  const has = (list, id) => list.some((item) => item.id === id);
  for (const p of projects) {
    if (p.parentId && !has(projects, p.parentId)) {
      problems.push(`${p.file}: parentId "${p.parentId}" is not a published project`);
    }
  }
  for (const w of theses) {
    if (w.project && !has(projects, w.project)) {
      problems.push(`${w.file}: project "${w.project}" is not a published project`);
    }
  }
  for (const m of members) {
    if (m.thesis && !has(theses, m.thesis)) {
      problems.push(`${m.file}: thesis "${m.thesis}" is not a published thesis`);
    }
  }
  const anchors = new Set();
  for (const pub of publications) {
    for (const anchor of [pub.id, ...(pub.aliases ?? [])]) {
      if (anchors.has(anchor)) problems.push(`${pub.file}: id or alias "${anchor}" is used twice`);
      anchors.add(anchor);
    }
    if (pub.thumbnail && !(pub.thumbnailSource && pub.thumbnailPage > 0)) {
      problems.push(`${pub.file}: a thumbnail needs thumbnailSource and thumbnailPage`);
    }
  }
  return problems;
}

/** Reads a JSON file from content/data/. */
export async function readData(name) {
  return JSON.parse(await readFile(fromRoot(`content/data/${name}.json`), 'utf8'));
}

const today = () => new Date().toISOString().slice(0, 10);

/** Published means: not a draft and, for dated posts, not scheduled in the future (UTC). */
export const isPublished = (item) => !item.draft && !(item.date && item.date > today());

/**
 * Loads everything the build needs. Drafts and scheduled posts are left out unless
 * `includeDrafts` is set (local preview only). Throws if any content is invalid.
 */
export async function loadContent({ includeDrafts = false } = {}) {
  const all = {};
  const problems = [];
  for (const name of Object.keys(collections)) {
    all[name] = await readCollection(name);
    problems.push(...(await validateCollection(name, all[name])));
  }
  const published = Object.fromEntries(
    Object.entries(all).map(([name, items]) => [
      name,
      includeDrafts ? items : items.filter(isPublished),
    ]),
  );
  problems.push(...crossReferenceProblems(published));
  if (problems.length) {
    throw new Error(`Content problems:\n- ${problems.join('\n- ')}`);
  }
  const [videos, archive, results, cars, sponsors, site] = await Promise.all(
    ['videos', 'archive', 'results', 'cars', 'sponsors', 'site'].map(readData),
  );
  return { ...published, all, videos, archive, results, cars, sponsors, site };
}
