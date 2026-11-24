import { esc, html } from '../lib/html.mjs';
import { heading, image, projectCard, storyCard, videoCard } from '../lib/components.mjs';

// Hand-picked items for the home page. Unknown ids are skipped.
const FEATURED_PROJECTS = ['aida', 'learning-based-mpc', 'latent-imagination'];
const FEATURED_PUBLICATIONS = [
  'adaptive-control-in-autonomous-driving-via-real-time-recurrent-rl',
  'roboracer-arena',
  'hprs-hierarchical-potential-based-reward-shaping-from-task-specifications',
];
const FEATURED_VIDEOS = ['MX27fhUuLJw', 'IlN3vJxC30w', 'GiXn8uKrcSk'];
const TEAM_PHOTO_STORY = 'victory-at-roboracer-autonomous-grand-prix-in-milano';

const pick = (items, ids) => ids.map((id) => items.find((item) => item.id === id)).filter(Boolean);

function sponsorCarousel(sponsors) {
  // One logo per partner website; the list is repeated once for the endless marquee.
  const logos = sponsors.filter(
    (s, i, all) => s.image && all.findIndex((x) => x.url === s.url) === i,
  );
  const track = [0, 1].map((copy) =>
    logos.map(
      (s) =>
        html`<a href="${esc(s.url)}" target="_blank" rel="noopener"${copy ? ' aria-hidden="true" tabindex="-1"' : ''}>${image(s.image, copy ? '' : `${s.name} logo`)}</a>`,
    ),
  );
  return html`
    <section class="sponsor-carousel" aria-label="Our partners">
      <div class="wrap sponsor-carousel-head">
        <span class="eyebrow">OUR PARTNERS</span>
        <a class="text-link" href="sponsors.html">All partners</a>
      </div>
      <div class="marquee"><div class="marquee-track">${track}</div></div>
    </section>
  `;
}

export default function homePage({
  page,
  archive,
  projects,
  publications,
  videos,
  sponsors,
  pubRow,
}) {
  const teamPhoto = archive.find((n) => n.id === TEAM_PHOTO_STORY).gallery[0];
  const body = html`
    <section class="photo-hero">
      <div class="photo-hero-copy">
        <div class="eyebrow">EST. 2020 · TU WIEN</div>
        <h1 class="home-title">Scuderia Segfault:<br><em>Autonomous Racing from TU Wien</em></h1>
        <p>Students and researchers who build, program and race 1:8-scale autonomous cars at RoboRacer competitions around the world.</p>
        <div class="hero-actions">
          <a class="button light" href="cars.html">Our cars</a>
          <a class="text-link" href="members.html">Meet the team</a>
        </div>
      </div>
      <img
        class="photo-hero-img"
        src="media/hero-car-top.webp"
        alt="Scuderia Segfault race car photographed from above on a black background"
        width="1046"
        height="628"
        fetchpriority="high"
        decoding="async"
      >
    </section>
    <div class="race-strip">
      <span>OUR RACE RECORD</span>
      <span>3 <i>×</i> 1ST PLACE <i>·</i> 2 <i>×</i> 2ND PLACE <i>·</i> 1 <i>×</i> 3RD PLACE <i>·</i> 2 <i>×</i> 4TH PLACE</span>
      <a href="racing.html">Our racing story</a>
    </div>
    ${sponsorCarousel(sponsors)}
    <section class="section wrap">
      ${heading('01 / NEWS', 'The Latest from the Team', 'news/index.html', 'The full archive')}
      <div class="story-grid">${archive.slice(0, 3).map((n) => storyCard(n))}</div>
    </section>
    <section class="racing-motion-section">
      <div class="wrap racing-motion-grid">
        <div class="motion-copy">
          <span class="eyebrow">PERCEPTION → PLANNING → CONTROL</span>
          <h2>From Simulation<br><em>to the Race Track</em></h2>
          <p>Our methods are developed in our own simulation environments and tested on our physical race cars.</p>
        </div>
        <div class="motion-stage">
          <canvas
            data-racing-canvas="stage"
            role="img"
            aria-label="Animated illustrative racing circuit with three moving open-chassis RoboRacer-style cars and fading trajectory trails"
          ></canvas>
          <button class="motion-toggle" aria-pressed="false">Pause motion</button>
          <span class="motion-stage-label">SCUDERIA / AUTONOMOUS SYSTEMS</span>
        </div>
      </div>
    </section>
    <section class="section research-section">
      <div class="wrap">
        ${heading('02 / RESEARCH', 'Research Built for the Race Track', 'projects.html', 'All projects')}
        <div class="project-grid">${pick(projects, FEATURED_PROJECTS).map((p) => projectCard(p))}</div>
      </div>
    </section>
    <section class="section wrap">
      ${heading('03 / PUBLICATIONS', 'Our Latest Research Papers', 'publications.html', 'Papers & theses')}
      <div class="pub-list">${pick(publications, FEATURED_PUBLICATIONS).map((p) => pubRow(p))}</div>
    </section>
    <section class="section dark-section">
      <div class="wrap">
        ${heading('04 / VIDEOS', 'Watch Our Cars in Action', 'media.html', 'All videos')}
        <div class="video-grid">${pick(videos, FEATURED_VIDEOS).map(videoCard)}</div>
      </div>
    </section>
    <section class="section wrap team-feature">
      <div>
        ${heading('05 / OUR TEAM', 'Meet the People Behind the Cars')}
        <p>Researchers, students and alumni working across software, hardware, vehicle dynamics and AI. Meet the people and explore the work behind their names.</p>
        <a class="button dark" href="members.html">Members & alumni</a>
      </div>
      <figure>
        ${image(teamPhoto.image, teamPhoto.alt)}
        <figcaption>${esc(teamPhoto.credit)}</figcaption>
      </figure>
    </section>
  `;
  return [{ path: 'index.html', html: page('Autonomy on the edge', body, { active: 'home' }) }];
}
