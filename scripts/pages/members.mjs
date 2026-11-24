import { esc, html, when } from '../lib/html.mjs';
import { filters, hero, image, initials, source } from '../lib/components.mjs';
import { memberAuthors } from '../lib/publications.mjs';

const GROUPS = [
  ['Active Team', 'The crew developing, testing and racing our cars right now.'],
  [
    'Associated Members',
    'Part of the Scuderia community, contributing expertise and support alongside other commitments.',
  ],
  ['Alumni', 'The people who built the team.'],
];

/** Sort key: postdocs, PhD students, master's, bachelor's, then everyone else. */
function seniority(member, theses) {
  const thesisType = member.thesis ? theses.find((w) => w.id === member.thesis)?.type || '' : '';
  const text = `${member.bio || ''} ${thesisType}`;
  if (/post-?doc/i.test(text)) return 0;
  if (/\bphd\b|doctoral/i.test(text)) return 1;
  if (/master/i.test(text)) return 2;
  if (/bachelor/i.test(text)) return 3;
  return 4;
}

const surname = (m) => m.name.trim().split(/\s+/).pop();

const portrait = (m) =>
  m.image
    ? image(m.image, m.name)
    : html`<div class="portrait-initials" role="img" aria-label="${esc(m.name)}">${esc(initials(m.name, /[\s-]+/))}</div>`;

function memberCard(m, { publications, members }) {
  const authored = publications.filter((p) =>
    memberAuthors(p, members).some((author) => author.id === m.id),
  );
  const search = [m.name, m.bio, ...m.topics, ...m.contributions].join(' ').toLowerCase();
  const scholarSearch = `https://scholar.google.com/scholar?q=${encodeURIComponent(`${m.name} TU Wien`)}`;
  return html`
    <article class="member-card filter-item" id="${m.id}" data-category="${m.status}" data-search="${esc(search)}">
      <div class="portrait">
        ${portrait(m)}
        <span>${m.status}</span>
      </div>
      <div class="member-copy">
        <h2>${esc(m.name)}</h2>
        ${m.bio && html`<p class="member-bio">${esc(m.bio)}</p>`}
        ${when(
          m.contributions.length,
          () => html`
            <h3>Contributions</h3>
            <ul>${m.contributions.map((t) => html`<li>${esc(t)}</li>`)}</ul>
          `,
        )}
        ${when(
          m.topics.length,
          () => html`
            <h3>Research interests</h3>
            <div class="tags">${m.topics.map((t) => html`<span>${esc(t)}</span>`)}</div>
          `,
        )}
        ${when(
          authored.length,
          () => html`
            <details>
              <summary>Research outputs (${authored.length})</summary>
              <ul>${authored.map((p) => html`<li><a href="research.html#${p.id}">${esc(p.title)}</a></li>`)}</ul>
            </details>
          `,
        )}
        <div class="member-links">
          ${m.linkedin && source(m.linkedin, 'LinkedIn')}
          ${m.thesis && html`<a class="source-link" href="work/${esc(m.thesis)}.html">Thesis topic</a>`}
          ${m.scholar !== false && source(m.scholar || scholarSearch, m.scholar ? 'Google Scholar' : 'Scholar search')}
          ${m.source && source(m.source, 'Team profile')}
          ${m.contributionSources?.length > 1 && source(m.contributionSources[1], 'Contribution record')}
        </div>
        <small class="photo-credit">${esc(m.credit)}</small>
      </div>
    </article>
  `;
}

export default function membersPage(ctx) {
  const { page, members, theses } = ctx;
  const order = (a, b) =>
    seniority(a, theses) - seniority(b, theses) ||
    surname(a).localeCompare(surname(b), 'de') ||
    a.name.localeCompare(b.name, 'de');
  const groupNames = GROUPS.map(([group]) => group);

  const body = html`
    ${hero('OUR TEAM', 'Meet Our Team', 'Meet our active team, associated members and alumni, their research interests and the work they have contributed.')}
    <section class="wrap collection" data-filter-scope>
      ${filters(groupNames, 'Group')}
      ${GROUPS.map(
        ([group, intro]) => html`
          <section class="member-group">
            <div class="member-group-heading">
              <h2>${group}</h2>
              <p>${intro}</p>
            </div>
            <div class="member-grid">
              ${members
                .filter((m) => m.status === group)
                .sort(order)
                .map((m) => memberCard(m, ctx))}
            </div>
          </section>
        `,
      )}
    </section>
  `;
  return [{ path: 'members.html', html: page('Members & alumni', body, { active: 'members' }) }];
}
