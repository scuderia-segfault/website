import { html, when } from '../lib/html.mjs';
import { heading, hero } from '../lib/components.mjs';

export default function joinPage({ page, site }) {
  const body = html`
    ${hero('JOIN US', 'Join Scuderia Segfault:<br><em>Build and Race Autonomous Cars</em>', 'You are a student interested in robotics, control or AI and want to see your code drive a real race car? Join the team, write a thesis with us or start a research collaboration.')}
    <div class="wrap join-shortcuts">
      <a class="is-primary" href="#apply">Apply now</a>
      <a href="theses.html">Theses & project work</a>
      <a href="#how-to-join">How to get in touch</a>
      <a href="${site.github}" target="_blank" rel="noopener">Explore our GitHub</a>
    </div>
    <section class="section wrap">
      ${heading('WHY JOIN US', 'Learning by Building Real Race Cars')}
      <div class="support-grid">
        <article>
          <span>01 / BUILD REAL SYSTEMS</span>
          <h3>Build Real Systems</h3>
          <p>Work on perception, planning, control and hardware, and test your work on a real autonomous race car.</p>
        </article>
        <article>
          <span>02 / LEARN TOGETHER</span>
          <h3>Learn Together</h3>
          <p>The team connects students, researchers, associated members and alumni from different disciplines. Explore their work and find the people behind it.</p>
          <a class="text-link" href="members.html">Meet the team</a>
        </article>
        <article>
          <span>03 / CONNECT WITH RESEARCH</span>
          <h3>Connect with Research</h3>
          <p>Explore completed projects and publications to see examples of the work behind our autonomous racing platform.</p>
          <a class="text-link" href="research.html#projects">Explore research projects</a>
        </article>
      </div>
    </section>
    <section class="section wrap how-to-join" id="how-to-join">
      <div>
        <span class="eyebrow">SAY HELLO</span>
        <h2>How to Get in Touch</h2>
        <p>You do not need a finished research plan. Tell us where your interests meet the team’s work.</p>
        <a class="button dark" href="mailto:${site.email}?subject=Joining%20Scuderia%20Segfault">Email the team</a>
      </div>
      <ol>
        <li>
          <strong>Introduce yourself</strong>
          <p>Tell us your study program or background and what kind of contribution interests you.</p>
        </li>
        <li>
          <strong>Point to a topic</strong>
          <p>Mention a project, technical area or question you would like to explore. Links to something you have built are welcome.</p>
        </li>
        <li>
          <strong>Tell us what you are looking for</strong>
          <p>Team involvement, a student project, a thesis or research collaboration. Include your approximate availability. For research enquiries, you may attach a short CV.</p>
        </li>
      </ol>
    </section>
    ${when(
      site.applicationForm,
      () => html`
        <section class="section wrap apply-section" id="apply">
          ${heading('APPLY', 'Apply for the 2026/27 Team')}
          <p class="apply-intro">Fill in our application form. It takes about five minutes, and we will get back to you by email.</p>
          <a class="button dark" href="${site.applicationForm}" target="_blank" rel="noopener">Open the application form</a>
        </section>
      `,
    )}
  `;
  const join = page('Join Scuderia Segfault', body, { active: 'join' });
  // work.html is the former address of this page.
  return ['join.html', 'work.html'].map((path) => ({ path, html: join }));
}
