// Pages for the reports imported from the legacy team website (content/data/archive.json).
import { esc, html, when } from '../lib/html.mjs';
import { formatDate, galleryImage, heading, source, videoCard } from '../lib/components.mjs';

function storyPage(n, { page, videos }) {
  const date = formatDate(n.date);
  const [cover, ...gallery] = n.gallery;
  const body = html`
    <div class="wrap breadcrumb"><a href="../news/index.html">News archive</a> / ${date}</div>
    <section class="story-heading wrap">
      <span class="eyebrow">${date}</span>
      <h1>${esc(n.title)}</h1>
      ${source(n.source, 'Report on our legacy website')}
    </section>
    ${cover && html`<div class="wrap story-cover">${galleryImage(cover, '../')}</div>`}
    <section class="prose article-prose wrap">${n.body}</section>
    ${when(
      n.videos?.length,
      () => html`
        <section class="section wrap">
          ${heading('VIDEOS', 'Videos from This Event')}
          <div class="video-grid">${videos.filter((v) => n.videos.includes(v.id)).map(videoCard)}</div>
        </section>
      `,
    )}
    ${when(
      gallery.length,
      () => html`
        <section class="section wrap">
          ${heading('GALLERY', 'Event Gallery')}
          <div class="gallery">${gallery.map((g) => galleryImage(g, '../'))}</div>
        </section>
      `,
    )}
  `;
  return page(n.title, body, { prefix: '../', active: 'news', description: n.summary });
}

export default function storyPages(ctx) {
  return ctx.archive.map((n) => ({ path: `stories/${n.id}.html`, html: storyPage(n, ctx) }));
}
