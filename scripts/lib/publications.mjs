// Publication rows, the grouped catalogue, author matching and BibTeX export.
import { esc, html } from './html.mjs';
import { image } from './components.mjs';

const normalize = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

/** True if an author string such as "M. Lechner" or "Lechner M" refers to `name`. */
function nameMatches(author, name) {
  const parts = name.split(' ');
  const surname = parts.at(-1);
  const first = parts[0];
  const clean = normalize(author);
  if (clean.includes(normalize(name)) || clean === normalize(surname + first)) return true;
  const initials = first
    .split('-')
    .map((x) => normalize(x)[0])
    .join('');
  return [
    normalize(surname) + initials,
    initials + normalize(surname),
    normalize(surname) + initials[0],
    initials[0] + normalize(surname),
  ].includes(clean);
}

/** Team members who appear among the authors of `pub` (matched by name or alias). */
export function memberAuthors(pub, members) {
  const authors = pub.authors?.length ? pub.authors : [pub.authorsText || pub.citation];
  return members.filter((m) =>
    authors.some((author) =>
      [m.name, ...(m.aliases || [])].some((name) => nameMatches(author, name)),
    ),
  );
}

function authorText(pub, members, pre) {
  const authors = pub.authors?.length ? pub.authors : [];
  if (!authors.length) {
    return esc(pub.authorsText || pub.citation.split(/\(20\d\d\)/)[0].slice(0, 260));
  }
  const names = authors.map((name) => {
    const m = memberAuthors({ authors: [name] }, members)[0];
    return m
      ? html`<a class="author-link" href="${pre}members.html#${m.id}">${esc(name)}</a>`
      : esc(name);
  });
  if (names.length <= 4) return names.join(', ');
  return html`${names.slice(0, 4).join(', ')}<details class="more-authors"><summary>and ${names.length - 4} more authors</summary><span>${names.slice(4).join(', ')}</span></details>`;
}

const VENUE_BADGES = [
  [/Neural Information|NeurIPS/i, 'NeurIPS'],
  [/International Conference on Robotics|ICRA/i, 'ICRA'],
  [/IEEE Access/i, 'ACCESS'],
  [/Nature Machine Intelligence/i, 'NMI'],
  [/AAAI/i, 'AAAI'],
  [/ICLR/i, 'ICLR'],
  [/ICML/i, 'ICML'],
  [/ISoLA/i, 'ISoLA'],
  [/IEEE.*Decision and Control|CDC/i, 'CDC'],
  [/DATE|Design.*Automation.*Test/i, 'DATE'],
  [/Applied Thermal Engineering/i, 'ATE'],
  [/Thermal Science/i, 'TSEP'],
  [/Frontiers/i, 'Frontiers'],
  [/Vehicle System Dynamics/i, 'VSD'],
];

const TYPE_BADGES = {
  Thesis: 'THESIS',
  Preprint: 'arXiv',
  Journal: 'JOURNAL',
  'Book chapter': 'CHAPTER',
  Conference: 'CONF.',
};

/** Short venue label shown next to the year, e.g. "ICRA" or "arXiv". */
export function venueBadge(pub) {
  const text = `${pub.venue || ''} ${pub.citation}`;
  for (const [test, label] of VENUE_BADGES) if (test.test(text)) return label;
  return TYPE_BADGES[pub.type] ?? 'WORKSHOP';
}

/** One publication with preview, badge, authors and links. `pre` is the path to the site root. */
export function publicationRow(pub, pre = '', members = []) {
  const authors = memberAuthors(pub, members)
    .map((m) => m.id)
    .join(' ');
  const search = [pub.title, pub.citation, pub.venue, ...(pub.authors || [])]
    .join(' ')
    .toLowerCase();
  const link = (url, label) =>
    url && html`<a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`;
  const preview = pub.thumbnail
    ? html`<a class="paper-preview" href="${esc(pub.pdf || pub.url)}" target="_blank" rel="noopener">${image(pre + pub.thumbnail, pub.thumbnailAlt)}<span>${esc(pub.thumbnailKind)}</span></a>`
    : html`<a class="paper-preview paper-preview-unavailable" href="${esc(pub.url)}" target="_blank" rel="noopener"><span class="paper-symbol" aria-hidden="true">▤</span><span>View publication</span></a>`;

  return html`
    ${(pub.aliases || []).map((id) => html`<span id="${id}" class="publication-alias"></span>`)}
    <article
      id="${pub.id}"
      class="pub-row filter-item"
      data-year="${pub.year}"
      data-category="${esc(pub.type)}"
      data-authors="${authors}"
      data-search="${esc(search)}"
    >
      ${preview}
      <div class="pub-venue">
        <span class="venue-badge type-${pub.type.toLowerCase().replaceAll(' ', '-')}">${esc(venueBadge(pub))}</span>
        <span>${pub.year}</span>
      </div>
      <div class="pub-content">
        <h3><a href="${esc(pub.url)}" target="_blank" rel="noopener">${esc(pub.title)}</a></h3>
        <div class="pub-authors">${authorText(pub, members, pre)}</div>
        <p class="pub-citation"><em>${esc(pub.venue || pub.type)}</em>, ${pub.year}</p>
        <div class="paper-actions">
          <a href="${pre}citations/${pub.id}.bib" download>BIB</a>
          ${link(pub.url, 'HTML')}
          ${link(pub.doi && `https://doi.org/${pub.doi}`, 'DOI')}
          ${link(pub.pdf, 'PDF')}
          ${link(pub.arxiv?.url, 'ARXIV')}
          ${link(pub.scholar, 'SCHOLAR')}
          ${link(pub.code, 'CODE')}
        </div>
      </div>
    </article>
  `;
}

const TYPE_ORDER = [
  'Journal',
  'Conference',
  'Workshop',
  'Preprint',
  'Book chapter',
  'Thesis',
  'Other',
];

/** Publications grouped by year (newest first), then by type and title. */
export function publicationCatalogue(pubs, members) {
  const rank = (type) => (TYPE_ORDER.includes(type) ? TYPE_ORDER.indexOf(type) : 99);
  const years = [...new Set(pubs.map((p) => p.year))].sort((a, b) => b - a);
  return html`
    <section class="pub-type-section">
      ${years.map(
        (year) => html`
          <section class="pub-year-group">
            <div class="publication-year-heading"><h3>${year}</h3></div>
            <div class="pub-list">
              ${pubs
                .filter((p) => p.year === year)
                .sort((a, b) => rank(a.type) - rank(b.type) || a.title.localeCompare(b.title))
                .map((p) => publicationRow(p, '', members))}
            </div>
          </section>
        `,
      )}
    </section>
  `;
}

/** BibTeX entry written to public/citations/<id>.bib. */
export function bibtex(pub) {
  const thesisKind = /dissertation|doctoral|ph\.?d/i.test(pub.citation)
    ? 'phdthesis'
    : 'mastersthesis';
  const kind =
    {
      Journal: 'article',
      Conference: 'inproceedings',
      Workshop: 'inproceedings',
      Thesis: thesisKind,
      'Book chapter': 'incollection',
    }[pub.type] || 'misc';
  const venueField =
    pub.type === 'Journal' ? 'journal' : pub.type === 'Thesis' ? 'school' : 'booktitle';
  const value = (s) => String(s).replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
  const fields = {
    title: pub.title,
    author: (pub.authors || []).join(' and ') || pub.authorsText,
    year: pub.year,
    [venueField]: pub.venue,
    doi: pub.doi,
    url: pub.url,
  };
  const lines = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${value(v)}}`);
  return `@${kind}{${pub.id},\n${lines.join(',\n')}\n}\n`;
}
