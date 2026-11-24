// Small building blocks shared by several pages.
import { esc, html, when } from './html.mjs';

/** Lazy-loaded image. `eager` marks the main image of a page instead. */
export const image = (src, alt, cls = '', eager = false) =>
  html`<img class="${cls}" src="${esc(src)}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

/** External link styled as a small source reference. */
export const source = (url, label = 'Source') =>
  html`<a class="source-link" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`;

/** "01 Jun 2026" from "2026-06-01". */
export const formatDate = (date) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

/** Two-letter initials for people without a photo. */
export const initials = (name, separator = ' ') =>
  name
    .split(separator)
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

/** Page introduction with the animated track in the background. `title` may contain HTML. */
export const hero = (eyebrow, title, description) => html`
  <section class="page-intro wrap">
    <canvas class="intro-motion" data-racing-canvas="background" aria-hidden="true"></canvas>
    <div class="eyebrow">${eyebrow}</div>
    <h1>${title}</h1>
    <p>${description}</p>
  </section>
`;

/** Section heading with an eyebrow label and an optional link on the right. */
export const heading = (eyebrow, title, link = '', label = 'Explore all') => html`
  <div class="section-heading">
    <div>
      <span class="eyebrow">${eyebrow}</span>
      <h2>${title}</h2>
    </div>
    ${link && html`<a class="text-link" href="${link}">${label}</a>`}
  </div>
`;

/** Search box and dropdowns used by the filterable lists (see assets/site.js). */
export function filters(categories, label = 'Category', years = []) {
  const allLabel = label === 'Category' ? 'categories' : `${label.toLowerCase()}s`;
  return html`
    <div class="filters">
      <label class="search-field">
        <span>Search</span>
        <input type="search" data-search-input placeholder="Search titles, topics, people…">
      </label>
      <label>
        <span>${label}</span>
        <select data-category-select>
          <option value="">All ${allLabel}</option>
          ${categories.map((c) => html`<option>${esc(c)}</option>`)}
        </select>
      </label>
      ${when(
        years.length > 0,
        () => html`
          <label>
            <span>Year</span>
            <select data-year-select>
              <option value="">All years</option>
              ${years.map((y) => html`<option>${y}</option>`)}
            </select>
          </label>
        `,
      )}
      <p class="result-count" aria-live="polite"></p>
    </div>
    <p class="empty-results" hidden>No matching results. Try another search or filter.</p>
  `;
}

/** List of code repositories with descriptions. */
export function repositoryList(repositories = [], title = 'Repositories') {
  if (!repositories.length) return '';
  return html`
    <section>
      <h2>${esc(title)}</h2>
      <ul>
        ${repositories.map(
          (repo) => html`
            <li>
              <a class="text-link" href="${esc(repo.url)}" target="_blank" rel="noopener">${esc(repo.label)}</a>
              <p>${esc(repo.description)}</p>
            </li>
          `,
        )}
      </ul>
    </section>
  `;
}

/** Card for the project grids. `pre` is the path prefix back to the site root. */
export function projectCard(p, pre = '') {
  const search = [p.title, p.subtitle, p.summary, p.category, ...p.people].join(' ').toLowerCase();
  return html`
    <article class="project-card filter-item" data-category="${esc(p.category)}" data-search="${esc(search)}">
      <a href="${pre}projects/${p.id}.html" class="card-image">${image(pre + p.image, p.imageCaption)}</a>
      <div class="card-meta">
        <span>${esc(p.category)}</span>
        <span>${esc(p.period)}</span>
      </div>
      <h3><a href="${pre}projects/${p.id}.html">${esc(p.title)}</a></h3>
      <p>${esc(p.summary)}</p>
    </article>
  `;
}

/** YouTube video card; the player loads only after a click (see assets/site.js). */
export const videoCard = (v) => html`
  <article class="video-card filter-item" data-category="${v.category}" data-search="${esc(v.title.toLowerCase())}">
    <button class="video-launch" data-video="${v.id}" data-title="${esc(v.title)}" aria-label="Play ${esc(v.title)}">
      ${image(`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`, v.title)}
      <span class="play">▶</span>
      <span class="video-kind">${esc(v.category)}</span>
    </button>
    <h3>${esc(v.title)}</h3>
    <div class="video-links">${source(v.url, 'YouTube')}${source(v.source, 'Original context')}</div>
  </article>
`;

/** Card linking to a story from the legacy team archive. */
export const storyCard = (n, pre = '', date = formatDate(n.date)) => html`
  <article class="story-card">
    <a class="card-image" href="${pre}stories/${n.id}.html">${n.gallery[0] && image(pre + n.gallery[0].image, n.gallery[0].alt)}</a>
    <p class="card-meta">${date}</p>
    <h3><a href="${pre}stories/${n.id}.html">${esc(n.title)}</a></h3>
  </article>
`;

/** Photo with caption and credit. */
export const galleryImage = (g, pre = '') => html`
  <figure>
    ${image(pre + g.image, g.alt)}
    <figcaption>${esc(g.alt)} <span>${esc(g.credit)}</span></figcaption>
  </figure>
`;
