// Theses and student projects: overview (theses.html) and one page per topic (work/<id>.html).
import { esc, html } from '../lib/html.mjs';
import { filters, hero, source } from '../lib/components.mjs';

const TEAM_EMAIL = 'scuderia-segfault@tuwien.ac.at';
const STATUS_CLASS = { Open: 'is-open', 'In progress': 'is-progress' };

function thesisCard(w) {
  const search = [w.title, w.summary, ...w.topics].join(' ').toLowerCase();
  return html`
    <article class="work-card filter-item" data-category="${esc(w.type)}" data-state="${esc(w.status)}" data-search="${esc(search)}">
      <div class="work-card-meta">
        <span>${esc(w.type)}</span>
        <span class="work-status ${STATUS_CLASS[w.status] ?? ''}">${esc(w.status)}</span>
      </div>
      <h3><a href="work/${w.id}.html">${esc(w.title)}</a></h3>
      <p>${esc(w.summary)}</p>
      <div class="tags">${w.topics.map((t) => html`<span>${esc(t)}</span>`)}</div>
      <a class="text-link" href="work/${w.id}.html">Topic, expectations & contact</a>
    </article>
  `;
}

function thesisPage(w, { page, projects }) {
  const project = projects.find((p) => p.id === w.project);
  const mailto = `mailto:${esc(w.contact || TEAM_EMAIL)}?subject=${encodeURIComponent(w.subject)}`;
  const body = html`
    <div class="wrap breadcrumb"><a href="../theses.html">Theses & project work</a> / ${esc(w.type)}</div>
    ${hero(`${esc(w.type)} / ${esc(w.status)}`, esc(w.title), esc(w.summary))}
    <section class="section wrap work-detail">
      <aside>
        <span class="work-status">${esc(w.status)}</span>
        <h2>Contact</h2>
        <a class="source-link" href="${mailto}">Email the team</a>
        <h2>Research context</h2>
        ${project && html`<a class="source-link" href="../projects/${project.id}.html">${esc(project.title)}</a>`}
        <p>${source(w.source, w.sourceLabel || 'Source material')}</p>
      </aside>
      <div class="prose">
        <h2>Tasks</h2>
        <ul>${w.tasks.map((t) => html`<li>${esc(t)}</li>`)}</ul>
        <h2>What You Bring</h2>
        <ul>${w.background.map((t) => html`<li>${esc(t)}</li>`)}</ul>
        ${w.html}
        <h2>Interested?</h2>
        <p>Tell us your study program, experience and approximate timeline. We will discuss the concrete question, feasibility and supervision with you.</p>
        <a class="button dark" href="${mailto}">Discuss this topic</a>
      </div>
    </section>
  `;
  return page(w.title, body, { prefix: '../', active: 'work' });
}

export default function thesesPages(ctx) {
  const { page, theses } = ctx;
  const body = html`
    ${hero('OPEN WORK', 'Theses and Projects:<br><em>Work on a Real Race Car</em>', 'Write your thesis on a real autonomous race car. Find directions for master’s and bachelor’s theses, student projects and research work.')}
    <section class="wrap collection" data-filter-scope>
      ${filters([...new Set(theses.map((w) => w.type))], 'Type')}
      <div class="work-grid">${theses.filter((w) => w.status !== 'Closed').map(thesisCard)}</div>
      <div class="work-general">
        <h2>Looking for a PhD or another research role?</h2>
        <p>Contact the team about current possibilities around AIDA and autonomous systems. Explore the AIDA PhD call above or contact the team about further opportunities.</p>
        <a class="button dark" href="mailto:${TEAM_EMAIL}?subject=Research%20opportunity%20enquiry">Ask about research opportunities</a>
      </div>
    </section>
  `;
  return [
    {
      path: 'theses.html',
      html: page('Open work, theses & student projects', body, { active: 'work' }),
    },
    ...theses.map((w) => ({ path: `work/${w.id}.html`, html: thesisPage(w, ctx) })),
  ];
}
