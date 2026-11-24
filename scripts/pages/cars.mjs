import { esc, html, when } from '../lib/html.mjs';
import { heading, hero, image } from '../lib/components.mjs';
import { placeLabel } from './racing.mjs';

function generationCard(g, resultById) {
  const races = (g.races ?? []).map((id) => resultById[id]).filter(Boolean);
  return html`
    <article class="car-gen${g.teaser ? ' is-teaser' : ''}" id="${g.id}">
      <figure class="car-photo">
        ${image(g.image, g.imageAlt)}
        ${g.teaser && html`<span class="teaser-tag">Coming soon</span>`}
      </figure>
      <div class="car-copy">
        <span class="eyebrow">${esc(g.status)}</span>
        <h2>${esc(g.name)}</h2>
        <p>${esc(g.summary)}</p>
        <dl class="spec-list">
          ${g.specs.map(([key, value]) => html`<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`)}
        </dl>
        ${when(
          g.races,
          () => html`
            <h3>Races</h3>
            <ul class="car-races">
              ${races.map((r) => html`<li><a href="racing.html#${r.id}"><strong>${r.place}</strong> ${esc(r.city)} ${r.year}</a></li>`)}
            </ul>
          `,
        )}
        ${g.link && html`<a class="button dark" href="${g.link.href}">${esc(g.link.label)}</a>`}
      </div>
    </article>
  `;
}

function timelineEntry(t, resultById) {
  const r = t.result && resultById[t.result];
  return html`
    <li>
      <span class="tl-date">${esc(t.date)}</span>
      <div class="tl-body">
        <h3>${esc(t.title)}</h3>
        <p>${esc(t.text)}</p>
        ${t.image && image(t.image, t.imageAlt)}
        ${r && html`<a class="text-link" href="racing.html#${r.id}">${esc(r.city)} ${r.year}: ${placeLabel(r, 'host')}</a>`}
      </div>
    </li>
  `;
}

export default function carsPage({ page, cars, results }) {
  const resultById = Object.fromEntries(results.map((r) => [r.id, r]));
  const body = html`
    ${hero('CARS', 'Our Cars:<br><em>Five Generations of Race Cars</em>', 'Every car we have raced since 2020, from our first Jetson TX2 build to the low chassis taking shape in our lab.')}
    <section class="section wrap car-gens">${cars.generations.map((g) => generationCard(g, resultById))}</section>
    <section class="section wrap">
      ${heading('TIMELINE', 'From Simulation to Our Own Lab')}
      <ol class="car-timeline">${cars.timeline.map((t) => timelineEntry(t, resultById))}</ol>
    </section>
  `;
  return [{ path: 'cars.html', html: page('Our cars', body, { active: 'cars' }) }];
}
