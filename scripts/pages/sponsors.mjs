import { esc, html } from '../lib/html.mjs';
import { heading, hero, image, source } from '../lib/components.mjs';

const EMAIL = 'scuderia-segfault@tuwien.ac.at';
const LEGACY_PARTNERS = 'https://www.tuwien.at/inf/scuderia-segfault/racing/supporting-partners/';
const INTERESTS = [
  'Financial sponsorship',
  'Hardware or equipment',
  'Technical collaboration',
  'Another way to support',
];

function partnerGroups(sponsors) {
  const groupOf = (s) => s.group || 'Team Partners';
  return [...new Set(sponsors.map(groupOf))].map(
    (group) => html`
      <h3 class="partner-group">${esc(group)}</h3>
      <div class="partner-grid">
        ${sponsors
          .filter((s) => groupOf(s) === group)
          .map(
            (s) => html`
              <a href="${s.url}" target="_blank" rel="noopener">
                ${s.image ? image(s.image, `${s.name} logo`) : html`<strong>${esc(s.name)}</strong>`}
                <span>${esc(s.name)}</span>
              </a>
            `,
          )}
      </div>
    `,
  );
}

export default function sponsorsPage({ page, sponsors }) {
  const body = html`
    ${hero('SPONSORS', 'Partner with Us:<br><em>Driving Autonomous Racing Forward</em>', 'Competing internationally takes financial and material support. Our partners help us build cars, travel to races and train the next generation of engineers.')}
    <section class="section partner-section">
      <div class="wrap">
        ${heading('OUR PARTNERS', 'Thank You to Our Partners')}
        ${partnerGroups(sponsors)}
        <p class="partner-note">Thank you to everyone who supports our team, our research and the races we host. ${source(LEGACY_PARTNERS, 'Partner list on our legacy website')}</p>
      </div>
    </section>
    <section class="wrap sponsor-intro">
      <p>Competing internationally requires hardware, engineering time and travel funding. We welcome financial support, equipment and technical collaboration.</p>
      <a class="button dark" href="#partnership-contact">Discuss a partnership</a>
    </section>
    <section class="section wrap">
      ${heading('WAYS TO SUPPORT', 'How You Can Support Us')}
      <div class="support-grid">
        <article>
          <span>01 / HARDWARE & INFRASTRUCTURE</span>
          <h3>Supporting Our Hardware</h3>
          <p>Support the team with sensing, compute, electronics, vehicle components or access to testing and manufacturing facilities.</p>
          <a class="text-link" href="mailto:${EMAIL}?subject=Scuderia%20Segfault%20%E2%80%94%20hardware%20support">Offer equipment or expertise</a>
        </article>
        <article>
          <span>02 / COMPETITION & TEAM</span>
          <h3>Supporting Our Races</h3>
          <p>Help with race participation, travel, logistics, replacement parts and the practical costs of developing autonomous vehicles.</p>
          <a class="text-link" href="mailto:${EMAIL}?subject=Scuderia%20Segfault%20%E2%80%94%20sponsorship">Discuss financial support</a>
        </article>
        <article>
          <span>03 / RESEARCH & COLLABORATION</span>
          <h3>Collaborating on Research</h3>
          <p>Discuss software and hardware collaboration, technical demonstrations and ways to connect your engineers with our students and researchers.</p>
          <a class="text-link" href="#partnership-contact">Start a conversation</a>
        </article>
      </div>
    </section>
    <section class="section wrap partnership-contact" id="partnership-contact">
      <div>
        <span class="eyebrow">LET’S TALK</span>
        <h2>What Could We<br>Build Together?</h2>
        <p>Tell us a little about your organization and how you would like to contribute. We will discuss the scope and arrangements together.</p>
        <a class="text-link" href="mailto:${EMAIL}">${EMAIL}</a>
      </div>
      <!-- Handled in assets/partnership.js: opens a prepared email, nothing is sent or stored. -->
      <form class="partnership-form">
        <label>Your name<input name="name" autocomplete="name" required></label>
        <label>Organization<input name="organization" autocomplete="organization" required></label>
        <label>Email<input name="email" type="email" autocomplete="email" required></label>
        <label>Interested in<select name="interest">${INTERESTS.map((i) => html`<option>${i}</option>`)}</select></label>
        <label class="full">Your message<textarea name="message" rows="5" required></textarea></label>
        <button class="button dark full" type="submit">Prepare partnership email</button>
        <p class="form-note full">Opens a prepared message in your email app. Review it there before sending. No form data is stored on this website.</p>
        <p class="form-result full" role="status"></p>
      </form>
    </section>
  `;
  return [
    { path: 'sponsors.html', html: page('Sponsors & partnerships', body, { active: 'sponsors' }) },
  ];
}
