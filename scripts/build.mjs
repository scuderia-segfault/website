// Generates every HTML page of the site from content/ and writes them, pretty-printed,
// to the repository root (index.html, ...) and to the generated folders listed below.
// Vite then bundles these pages into dist/ (see vite.config.js).
import { readdir, rm } from 'node:fs/promises';
import { marked } from 'marked';
import { loadContent } from './lib/content.mjs';
import { formatHtml } from './lib/html.mjs';
import { layout } from './lib/layout.mjs';
import { fromRoot, writeOutput } from './lib/paths.mjs';
import { bibtex, publicationRow } from './lib/publications.mjs';
import cars from './pages/cars.mjs';
import home from './pages/home.mjs';
import join from './pages/join.mjs';
import media from './pages/media.mjs';
import members from './pages/members.mjs';
import posts from './pages/posts.mjs';
import projects from './pages/projects.mjs';
import racing from './pages/racing.mjs';
import research from './pages/research.mjs';
import sponsors from './pages/sponsors.mjs';
import stories from './pages/stories.mjs';
import theses from './pages/theses.mjs';
import unitXii from './pages/unit-xii.mjs';

// Folders that contain only generated pages. They are emptied on every build so that
// removed items and new drafts do not stay online.
const GENERATED_DIRS = ['news', 'blog', 'stories', 'projects', 'work'];
const CITATIONS_DIR = 'public/citations';

// `node scripts/build.mjs --drafts` also builds drafts, for a local preview only.
const includeDrafts = process.argv.includes('--drafts');
const content = await loadContent({ includeDrafts }).catch((error) => {
  console.error(error.message);
  process.exit(1);
});
if (includeDrafts) console.warn('Preview build: drafts and scheduled posts are included.');

// Markdown bodies become HTML. Only trusted team content is used: Markdown may contain HTML.
for (const item of [...content.projects, ...content.theses, ...content.news, ...content.blog]) {
  item.html = marked.parse(item.body ?? '');
}

const ctx = {
  ...content,
  page: (title, body, options = {}) => layout(title, body, { ...options, site: content.site }),
  memberByName: (name) => content.members.find((m) => m.name === name),
  /** Publications whose title contains one of the project's keywords. */
  relatedPublications: (project) =>
    content.publications.filter((pub) =>
      project.keywords.some((k) => pub.title.toLowerCase().includes(k.toLowerCase())),
    ),
  pubRow: (pub, pre = '') => publicationRow(pub, pre, content.members),
};

const pages = [
  home,
  research,
  projects,
  members,
  media,
  stories,
  racing,
  cars,
  join,
  sponsors,
  unitXii,
  theses,
  posts,
].flatMap((render) => render(ctx));

// BibTeX files: one per published publication; stale files are removed.
const bibFiles = new Set(content.publications.map((pub) => `${pub.id}.bib`));
for (const file of await readdir(fromRoot(CITATIONS_DIR)).catch(() => [])) {
  if (file.endsWith('.bib') && !bibFiles.has(file)) await rm(fromRoot(CITATIONS_DIR, file));
}
for (const pub of content.publications)
  await writeOutput(`${CITATIONS_DIR}/${pub.id}.bib`, bibtex(pub));

// Format everything first, so a failing build leaves the previous output in place.
const formatted = await Promise.all(
  pages.map(async ({ path, html }) => ({ path, html: await formatHtml(html, fromRoot(path)) })),
);
for (const dir of GENERATED_DIRS) await rm(fromRoot(dir), { recursive: true, force: true });
for (const { path, html } of formatted) await writeOutput(path, html);

console.log(
  `Generated ${pages.length} pages: ${content.projects.length} projects, ` +
    `${content.publications.length} publications, ${content.members.length} people, ` +
    `${content.theses.length} theses and topics, ${content.news.length} news and ` +
    `${content.blog.length} blog posts, ${content.archive.length} archive stories.`,
);
