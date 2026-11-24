// News and blog: index pages, one page per Markdown post and the Unit XIII topic page.
import { esc, html, when } from '../lib/html.mjs';
import { image, repositoryList, storyCard } from '../lib/components.mjs';

const UNIT_TAG = 'Unit XIII';
const UNIT_TOPIC = 'topics/unit-xiii.html';

const INTRO = {
  news: {
    title: 'News',
    eyebrow: 'NEWS',
    heading: 'News:<br><em>Race Reports and Team Updates</em>',
    text: 'Race reports and updates from Scuderia Segfault since 2020.',
  },
  blog: {
    title: 'Blog',
    eyebrow: 'BLOG',
    heading: 'Blog:<br><em>Engineering Notes from the Team</em>',
    text: 'Build logs and engineering notes from our race cars.',
  },
};

function postCards(posts, unitPosts, prefix = '') {
  return posts.map(
    (post) => html`
      <article class="feature blog-card">
        ${post.cover && html`<a class="card-image" href="${prefix}${post.id}/index.html">${image(`../${prefix}${post.cover}`, post.title)}</a>`}
        <div>
          <p>${esc(post.date)}</p>
          <h3><a href="${prefix}${post.id}/index.html">${esc(post.title)}</a></h3>
          <p>${esc(post.summary || '')}</p>
          ${unitPosts.includes(post) && html`<a class="text-link" href="${prefix}${UNIT_TOPIC}">${UNIT_TAG}</a>`}
        </div>
      </article>
    `,
  );
}

function postPage(kind, post, page) {
  const body = html`
    <section class="section container">
      <p><a href="../index.html">${INTRO[kind].title}</a></p>
      <article class="post">
        <p>${esc(post.date)}</p>
        <h1>${esc(post.title)}</h1>
        ${post.author && html`<p>By ${esc(post.author)}</p>`}
        ${post.html}
        ${repositoryList(post.repositories)}
      </article>
    </section>
  `;
  return page(post.title, body, { prefix: '../../' });
}

const archiveSection = (archive) => html`
  <section class="section wrap">
    <div class="section-heading">
      <div>
        <span class="eyebrow">ARCHIVE / 2020–2026</span>
        <h2>The Team Archive</h2>
      </div>
    </div>
    <div class="story-grid">${archive.map((n) => storyCard(n, '../', esc(n.date)))}</div>
  </section>
`;

function collectionPages(kind, posts, { page, archive }) {
  const intro = INTRO[kind];
  const unitPosts = kind === 'blog' ? posts.filter((post) => post.tags?.includes(UNIT_TAG)) : [];

  const postList = html`
    <section class="section wrap">
      ${when(unitPosts.length, () => html`<p><a class="text-link" href="${UNIT_TOPIC}">Topic: ${UNIT_TAG}</a></p>`)}
      <div class="features">${postCards(posts, unitPosts)}</div>
    </section>
  `;
  const noPosts =
    kind === 'blog' &&
    html`<section class="section wrap"><p>The first engineering notes are on their way. Explore our <a class="text-link" href="../research.html">research projects</a> in the meantime.</p></section>`;

  const index = html`
    <section class="page-intro wrap">
      <span class="eyebrow">${intro.eyebrow}</span>
      <h1>${intro.heading}</h1>
      <p>${intro.text}</p>
    </section>
    ${posts.length ? postList : noPosts}
    ${kind === 'news' && archiveSection(archive)}
  `;

  const pages = [
    { path: `${kind}/index.html`, html: page(intro.title, index, { prefix: '../', active: kind }) },
    ...posts.map((post) => ({
      path: `${kind}/${post.id}/index.html`,
      html: postPage(kind, post, page),
    })),
  ];

  if (unitPosts.length) {
    const topic = html`
      <section class="page-intro wrap">
        <a class="text-link" href="../index.html">All blog posts</a>
        <h1>Unit XIII <em>Build Log</em></h1>
        <p>Hardware, motor control and testing notes from our Serpent build.</p>
      </section>
      <section class="section wrap"><div class="features">${postCards(unitPosts, unitPosts, '../')}</div></section>
    `;
    pages.push({
      path: `${kind}/${UNIT_TOPIC}`,
      html: page(`${UNIT_TAG} build log`, topic, { prefix: '../../' }),
    });
  }
  return pages;
}

export default function postPages(ctx) {
  return [...collectionPages('news', ctx.news, ctx), ...collectionPages('blog', ctx.blog, ctx)];
}
