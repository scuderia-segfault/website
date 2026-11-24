import { esc, html, when } from '../lib/html.mjs';
import { filters, heading, hero, image, projectCard } from '../lib/components.mjs';
import { memberAuthors, publicationCatalogue } from '../lib/publications.mjs';

// Shown as large cards; all other top-level projects go into "more projects".
const FEATURED_PROJECTS = ['aida', 'nimble-ai', 'unit-xiii'];

function featuredProject(p, { projects, memberByName, relatedPublications }) {
  const themes = projects.filter((theme) => theme.parentId === p.id);
  const team = p.people
    .slice(0, 3)
    .map(memberByName)
    .filter((m) => m?.image);
  return html`
    <article class="research-project-feature">
      <a class="research-project-photo" href="projects/${p.id}.html">
        ${image(p.image, p.imageCaption)}
        <span>${esc(p.status)}</span>
      </a>
      <div class="research-project-copy">
        <span class="eyebrow">${esc(p.period)}</span>
        <h3><a href="projects/${p.id}.html">${esc(p.title)}</a></h3>
        <p>${esc(p.summary)}</p>
        ${themes.map((theme) => html`<p><a class="text-link" href="projects/${esc(theme.id)}.html">${esc(theme.title)}</a></p>`)}
        <div class="project-mini-team">
          ${team.map((m) => html`<a href="members.html#${m.id}" title="${esc(m.name)}">${image(m.image, m.name)}</a>`)}
          <span>${p.people.length} people · ${relatedPublications(p).length} linked outputs</span>
        </div>
        <a class="button outline" href="projects/${p.id}.html">Project, team & results</a>
      </div>
    </article>
  `;
}

/** Racing publications first; other work by team members in a collapsible section. */
function catalogue(publications, members) {
  const racing = publications.filter((p) => p.racing);
  const other = publications.filter((p) => !p.racing);
  return html`
    ${publicationCatalogue(racing, members)}
    ${when(
      other.length > 0,
      () => html`
        <details class="further-research">
          <summary>
            <span>Further Research by Team Members</span>
            <span>${other.length} publications <b>＋</b></span>
          </summary>
          ${publicationCatalogue(other, members)}
        </details>
      `,
    )}
  `;
}

export default function researchPage(ctx) {
  const { page, projects, publications, members } = ctx;
  const featured = projects.filter((p) => FEATURED_PROJECTS.includes(p.id));
  const further = projects.filter((p) => !p.parentId && !FEATURED_PROJECTS.includes(p.id));
  const authors = members.filter((m) =>
    publications.some((p) => memberAuthors(p, members).some((x) => x.id === m.id)),
  );

  const body = html`
    ${hero('RESEARCH', 'Projects and Publications:<br><em>Our Research Record</em>', 'The projects, people and published work behind our autonomous race cars.')}
    <nav class="wrap research-jump" aria-label="Research sections">
      <a href="#projects">Projects <span>${featured.length + further.length}</span></a>
      <a href="#publications">Publications <span>${publications.length}</span></a>
    </nav>
    <section class="section wrap" id="projects">
      ${heading('FEATURED', 'Featured Projects')}
      <div class="research-feature-grid">${featured.map((p) => featuredProject(p, ctx))}</div>
      <details class="further-projects">
        <summary>Explore ${further.length} more projects & research collections <span>＋</span></summary>
        <div class="project-grid">${further.map((p) => projectCard(p))}</div>
      </details>
    </section>
    <section class="wrap collection research-publications" id="publications" data-filter-scope>
      ${heading('PUBLICATIONS', 'Publications and Theses')}
      ${filters([...new Set(publications.map((p) => p.type))], 'Type', [...new Set(publications.map((p) => p.year))])}
      <label class="author-filter">
        <span>Team author</span>
        <select data-author-select>
          <option value="">All team authors</option>
          ${authors.map((m) => html`<option value="${m.id}">${esc(m.name)}</option>`)}
        </select>
      </label>
      <div class="publication-catalogue">${catalogue(publications, members)}</div>
    </section>
  `;

  const research = page('Research: projects & publications', body, {
    active: 'research',
    bodyClass: 'publications-page research-page',
  });
  // projects.html and publications.html are kept as aliases so old links keep working.
  return ['research.html', 'projects.html', 'publications.html'].map((path) => ({
    path,
    html: research,
  }));
}
