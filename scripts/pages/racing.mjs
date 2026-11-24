import { esc, html, when } from '../lib/html.mjs';
import { heading, hero, image, videoCard } from '../lib/components.mjs';

const PLACES = [
  ['1st', '1st place'],
  ['2nd', '2nd place'],
  ['3rd', '3rd place'],
  ['4th', '4th place'],
];

/** "1st place", or "Host" for events we organised. */
export const placeLabel = (r, host = 'Host') => (r.place === 'Host' ? host : `${r.place} place`);

function resultFeature(r, i) {
  return html`
    <article class="result-feature${i % 2 ? ' flip' : ''}" id="${r.id}">
      <figure class="result-main">${image(r.car || r.team, r.car ? r.carAlt : r.teamAlt)}</figure>
      <div class="result-copy">
        <span class="result-place place-${r.place.toLowerCase()}">${placeLabel(r)}</span>
        <h3>${esc(r.city)} ${r.year}</h3>
        <p class="result-event">${esc(r.event)}</p>
        ${r.note && html`<p>${esc(r.note)}</p>`}
        ${when(
          r.car && r.team,
          () => html`
            <figure class="result-team">
              ${image(r.team, r.teamAlt)}
              <figcaption>${esc(r.teamAlt)}</figcaption>
            </figure>
          `,
        )}
        <div class="result-links">
          <a class="button dark" href="stories/${r.story}.html">Read the race report</a>
          <a class="text-link" href="${r.original}" target="_blank" rel="noopener">Post on our legacy website</a>
        </div>
      </div>
    </article>
  `;
}

export default function racingPage({ page, results, videos }) {
  const count = (place) => results.filter((r) => r.place === place).length;
  const body = html`
    ${hero('RESULTS', 'Racing and Results:<br><em>Competing Around the World</em>', 'Since 2020 we have raced at RoboRacer competitions in Europe, North America, Asia and the Middle East.')}
    <div class="stat-row wrap">
      ${PLACES.map(([place, label]) => html`<div class="stat"><strong>${count(place)}×</strong><span>${label}</span></div>`)}
      <div class="stat"><strong>${results.filter((r) => r.place !== 'Host').length}</strong><span>Grand Prix races since 2020</span></div>
    </div>
    <section class="section wrap">
      <div class="result-features">${results.map(resultFeature)}</div>
    </section>
    <section class="section dark-section">
      <div class="wrap">
        ${heading('VIDEOS', 'Watch Our Cars Race', 'media.html', 'Video archive')}
        <div class="video-grid">
          ${videos
            .filter((v) => v.category === 'Racing')
            .slice(0, 3)
            .map(videoCard)}
        </div>
      </div>
    </section>
  `;
  return [{ path: 'racing.html', html: page('Racing & results', body, { active: 'racing' }) }];
}
