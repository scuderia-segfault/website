import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { layout, image } from './layout.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function page(title, body, depth) { return layout(title, body, {prefix:'../'.repeat(depth), active:title === 'News' ? 'news' : title === 'Blog' ? 'blog' : ''}); }
// All validation happens before replacing generated output.
const archive = JSON.parse(await readFile(resolve(root, 'content/data/archive.json'), 'utf8'));
const collections = [];
for (const kind of ['news', 'blog']) {
  const posts = [];
  for (const file of (await readdir(resolve(root, 'content', kind))).filter(f => f.endsWith('.md'))) {
    const raw = await readFile(resolve(root, 'content', kind, file), 'utf8');
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!match) throw new Error(`${kind}/${file}: missing JSON metadata between --- lines`);
    const meta = JSON.parse(match[1]);
    if (typeof meta.title !== 'string' || !meta.title.trim() || !/^\d{4}-\d{2}-\d{2}$/.test(meta.date) || Number.isNaN(Date.parse(meta.date)) || new Date(meta.date).toISOString().slice(0,10) !== meta.date || typeof meta.draft !== 'boolean') throw new Error(`${kind}/${file}: title, date (YYYY-MM-DD), draft (boolean) required`);
    const slug = file.slice(0,-3);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid filename: ${file}`);
    if (meta.draft || meta.date > new Date().toISOString().slice(0,10)) continue;
    posts.push({...meta, slug, body: marked.parse(match[2])});
  }
  posts.sort((a,b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  collections.push({kind, posts});
}
for (const {kind, posts} of collections) {
  const out = resolve(root, kind);
  await rm(out, {recursive:true, force:true});
  await mkdir(out, {recursive:true});
  const title = kind === 'news' ? 'News' : 'Blog';
  const archived = kind === 'news' ? `<section class="section wrap"><div class="section-heading"><div><span class="eyebrow">FROM THE PADDOCK / 2020–2026</span><h2>The team archive.</h2></div></div><div class="story-grid">${archive.map(n=>`<article class="story-card"><a class="card-image" href="../stories/${n.id}.html">${n.gallery[0]?image('../'+n.gallery[0].image,n.gallery[0].alt):''}<span class="image-arrow">↗</span></a><p class="card-meta">${escape(n.date)}</p><h3><a href="../stories/${n.id}.html">${escape(n.title)}</a></h3></article>`).join('')}</div></section>` : '';

  const cards = posts.map(post => `<article class="feature blog-card">${post.cover?`<a class="card-image" href="${post.slug}/index.html">${image('../'+post.cover,post.title)}</a>`:''}<div><p>${escape(post.date)}</p><h3><a href="${post.slug}/index.html">${escape(post.title)}</a></h3><p>${escape(post.summary || '')}</p></div></article>`).join('');
  await writeFile(resolve(out, 'index.html'), page(title, `<section class="page-intro wrap"><span class="eyebrow">SCUDERIA SEGFAULT / JOURNAL</span><h1>${title === 'News' ? 'From the <em>paddock.</em>' : 'Notes from the <em>lab.</em>'}</h1><p>${title === 'News' ? 'Race reports, team updates and a growing archive of our work.' : 'Small updates, engineering notes and things we learn along the way.'}</p></section>${cards ? `<section class="section wrap"><div class="features">${cards}</div></section>` : kind === 'blog' ? '<section class="section wrap"><p>The first engineering notes are on their way. Explore our <a class="text-link" href="../research.html">research projects ↗</a> in the meantime.</p></section>' : ''}${archived}`, 1));
  for (const post of posts) {
    await mkdir(resolve(out, post.slug), {recursive:true});
    // Render the shared shell first, so article-relative links and image URLs stay intact.
    const article = `<section class="section container"><p><a href="../index.html">← ${title}</a></p><article class="post"><p>${escape(post.date)}</p><h1>${escape(post.title)}</h1>${post.author ? `<p>By ${escape(post.author)}</p>` : ''}${post.body}</article></section>`;
    await writeFile(resolve(out, post.slug, 'index.html'), page(post.title, 'CONTENT_PLACEHOLDER', 2).replace('CONTENT_PLACEHOLDER', article));
  }
  console.log(`${kind}: ${posts.length} published posts`);
}
