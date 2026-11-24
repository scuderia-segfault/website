// One page per project: projects/<id>.html, from content/projects/<id>.md.
import { esc, html, when } from '../lib/html.mjs';
import { heading, image, initials, repositoryList, source, videoCard } from '../lib/components.mjs';

function personCard(name, member) {
  if (member?.image) {
    return html`
      <a class="project-person" href="../members.html#${member.id}">
        ${image(`../${member.image}`, member.name)}
        <span><strong>${esc(member.name)}</strong><small>${esc(member.status)}</small></span>
      </a>
    `;
  }
  const role = member ? esc(member.status) : 'Named in the project sources';
  return html`
    <div class="project-person collaborator">
      <span class="person-initial">${esc(initials(name))}</span>
      <span><strong>${esc(name)}</strong><small>${role}</small></span>
    </div>
  `;
}

function aside(p, memberByName) {
  return html`
    <aside>
      <h2>People</h2>
      ${p.people.map((name) => {
        const m = memberByName(name);
        return html`<p>${m ? html`<a href="../members.html#${m.id}">${esc(name)}</a>` : esc(name)}</p>`;
      })}
      ${when(
        p.associates?.length,
        () => html`
          <h2>Associated collaborators</h2>
          ${p.associates.map((person) => html`<p>${source(person.url, person.name)}</p>`)}
        `,
      )}
      <h2>Source records</h2>
      ${p.sources.map((s) => source(s.url, s.label))}
    </aside>
  `;
}

function prose(p, themes, publications, pubRow) {
  return html`
    <div class="prose">
      ${p.subtitle && html`<h2>${esc(p.subtitle)}</h2>`}
      ${p.html}
      ${when(
        themes.length,
        () => html`
          <h2>Project themes</h2>
          <ul>
            ${themes.map(
              (theme) => html`
                <li>
                  <a class="text-link" href="${esc(theme.id)}.html">${esc(theme.title)}</a>
                  <p>${esc(theme.summary)}</p>
                </li>
              `,
            )}
          </ul>
        `,
      )}
      ${repositoryList(p.repositories, p.id === 'aida' ? 'Related repositories' : 'Repositories')}
      ${when(
        p.labNotes,
        () => html`
          <h2>Lab notes</h2>
          <p><a class="text-link" href="../blog/topics/${esc(p.labNotes)}.html">Follow the Unit XIII build log</a></p>
        `,
      )}
      ${when(
        publications.length,
        () => html`
          <h2>Publications & outputs</h2>
          <div class="pub-list">${publications.map((pub) => pubRow(pub, '../'))}</div>
        `,
      )}
    </div>
  `;
}

const photoSection = (photos) => html`
  <section class="section wrap">
    ${heading('HARDWARE', 'Hardware and Build Notes')}
    <div class="project-grid">
      ${photos.map(
        (photo) => html`
          <figure>
            ${image(`../uploads/${photo.file}`, photo.caption)}
            <figcaption>${esc(photo.caption)}</figcaption>
          </figure>
        `,
      )}
    </div>
  </section>
`;

const clipSection = (clips) => html`
  <section class="section wrap">
    ${heading('VIDEOS', 'Project Demonstrations')}
    <div class="video-grid">
      ${clips.map(
        (clip) => html`
          <figure>
            <video controls playsinline preload="metadata" style="width:100%" aria-label="${esc(clip.title)}" src="../uploads/${esc(clip.file)}"></video>
            <figcaption>${esc(clip.title)}</figcaption>
          </figure>
        `,
      )}
    </div>
  </section>
`;

function projectPage(p, { page, projects, videos, memberByName, relatedPublications, pubRow }) {
  const parent = projects.find((project) => project.id === p.parentId);
  const themes = projects.filter((project) => project.parentId === p.id);
  const youtube = videos.filter((v) => p.videos.includes(v.id));
  const parentLink = parent && html`<a href="${esc(parent.id)}.html">${esc(parent.title)}</a> / `;
  const imageCredit = p.imageSource
    ? source(p.imageSource, 'Image source')
    : esc(p.imageCredit || '');

  const body = html`
    <div class="wrap breadcrumb"><a href="../research.html#projects">Projects & research</a> / ${parentLink}${esc(p.title)}</div>
    <section class="project-hero wrap">
      <div>
        <span class="eyebrow">${esc(p.category)} / ${esc(p.status)}</span>
        <h1>${esc(p.title)}</h1>
        ${p.subtitle && html`<p class="project-subtitle">${esc(p.subtitle)}</p>`}
        <div class="project-period">${esc(p.period)}</div>
      </div>
      <figure>
        ${image(`../${p.image}`, p.imageCaption, '', true)}
        <figcaption>${imageCredit}</figcaption>
      </figure>
    </section>
    <section class="section wrap project-body">
      ${aside(p, memberByName)}
      ${prose(p, themes, relatedPublications(p), pubRow)}
    </section>
    <section class="section wrap project-team">
      ${heading('THE PEOPLE', 'Project Team and Contributors')}
      <div class="project-people-grid">${p.people.map((name) => personCard(name, memberByName(name)))}</div>
    </section>
    ${when(p.photos?.length, () => photoSection(p.photos))}
    ${when(p.clips?.length, () => clipSection(p.clips))}
    ${when(
      youtube.length,
      () => html`
        <section class="section wrap">
          ${heading('VIDEOS', 'Research in Action')}
          <div class="video-grid">${youtube.map(videoCard)}</div>
        </section>
      `,
    )}
  `;

  return page(p.title, body, { prefix: '../', active: 'projects', description: p.summary });
}

export default function projectPages(ctx) {
  return ctx.projects.map((p) => ({ path: `projects/${p.id}.html`, html: projectPage(p, ctx) }));
}
