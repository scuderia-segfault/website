import { esc, html } from '../lib/html.mjs';
import { filters, heading, hero, image, videoCard } from '../lib/components.mjs';

export default function mediaPage({ page, videos, archive }) {
  const photos = archive.filter((n) => n.gallery.length).slice(0, 9);
  const body = html`
    ${hero('MEDIA', 'Videos and Media:<br><em>Our Cars on Track</em>', 'Driving demos, research videos and race footage, from our early work to our latest experiments.')}
    <section class="wrap collection" data-filter-scope>
      ${filters(['Racing', 'Research'])}
      <div class="video-grid">${videos.map(videoCard)}</div>
      <p class="collection-note">Videos load from YouTube only when you press play. The original channel or project context is linked beside each video.</p>
    </section>
    <section class="section wrap">
      ${heading('FROM THE ARCHIVE', 'Photos from Our Races and Events')}
      <div class="gallery">
        ${photos.map(
          (n) => html`
            <figure>
              <a href="stories/${n.id}.html">${image(n.gallery[0].image, n.gallery[0].alt)}</a>
              <figcaption>
                <a href="stories/${n.id}.html">${esc(n.title)}</a>
                <span>${esc(n.gallery[0].credit)}</span>
              </figcaption>
            </figure>
          `,
        )}
      </div>
    </section>
  `;
  return [{ path: 'media.html', html: page('Videos & media archive', body, { active: 'media' }) }];
}
