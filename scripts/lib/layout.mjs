import { esc, html, when } from './html.mjs';

const DEFAULT_DESCRIPTION =
  'Autonomous racing at TU Wien since 2020: the cars, the research and the people behind Scuderia Segfault.';

// [url, label, key] for the main navigation.
const mainNav = [
  ['members.html', 'Team', 'members'],
  ['cars.html', 'Cars', 'cars'],
  ['join.html', 'Recruiting', 'join'],
  ['sponsors.html', 'Sponsors', 'sponsors'],
];

// [url, label, key, description] for the "Organization" dropdown.
const organizationNav = [
  ['racing.html', 'Results', 'racing', 'Every race and podium since 2020'],
  ['research.html', 'Research', 'research', 'Projects and publications'],
  ['news/index.html', 'News', 'news', 'Race reports and team updates'],
  ['blog/index.html', 'Blog', 'blog', 'Engineering notes from the team'],
  ['media.html', 'Media', 'media', 'Videos and photos'],
  ['theses.html', 'Theses & Projects', 'work', 'Open topics for students'],
];

const logo = (prefix) => html`
  <img
    class="logo-dark"
    src="${prefix}media/logo-segfault-dark.png"
    alt="Scuderia Segfault"
    width="628"
    height="143"
  />
  <img
    class="logo-light"
    src="${prefix}media/logo-segfault-light.png"
    alt=""
    aria-hidden="true"
    width="628"
    height="143"
  />
`;

const external = (url, label) =>
  html`<a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`;

/**
 * Wraps page content in the shared document: head, masthead, navigation, join band,
 * footer and the video dialog.
 *
 * @param {string} title  Page title (" | Scuderia Segfault" is appended).
 * @param {string} body   HTML placed inside <main>.
 * @param {object} options
 * @param {string} options.prefix      Relative path back to the site root, e.g. "../".
 * @param {string} options.active      Navigation key to highlight.
 * @param {string} options.description Meta description.
 * @param {string} options.bodyClass   Class for <body>.
 * @param {object} options.site        content/data/site.json.
 */
export function layout(
  title,
  body,
  { prefix = '', active = '', description = DEFAULT_DESCRIPTION, bodyClass = '', site },
) {
  const isActive = (key) =>
    active === key || (key === 'research' && ['projects', 'publications'].includes(active));
  const current = (key) => (isActive(key) ? ' aria-current="page"' : '');

  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#ed342b" />
        <meta name="description" content="${esc(description)}" />
        <title>${esc(title)} | Scuderia Segfault</title>
        <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml" />
        <link rel="stylesheet" href="${prefix}assets/style.css" />
        <script type="module" src="${prefix}assets/site.js"></script>
      </head>
      <body class="${bodyClass}">
        <a class="skip" href="#main">Skip to content</a>
        <div class="masthead">
          <span>TU WIEN <i>×</i> AUTONOMOUS RACING</span>
          <span class="external-network">
            ${external(site.linkedin, 'LinkedIn')}
            ${external(site.github, 'GitHub')}
            ${external(site.university, 'Legacy website')}
          </span>
        </div>
        <header class="site-header">
          <a class="wordmark" href="${prefix}index.html" aria-label="Scuderia Segfault home">
            ${logo(prefix)}
          </a>
          <button class="menu-toggle" aria-controls="navigation" aria-expanded="false">
            Menu <span>☰</span>
          </button>
          <nav id="navigation" aria-label="Main navigation">
            ${mainNav.map(
              ([url, label, key]) => html`<a href="${prefix}${url}"${current(key)}>${label}</a>`,
            )}
            <div class="nav-group${organizationNav.some(([, , key]) => isActive(key)) ? ' is-active' : ''}">
              <button
                class="nav-group-toggle"
                type="button"
                aria-expanded="false"
                aria-controls="nav-org"
              >
                Organization <span aria-hidden="true">▾</span>
              </button>
              <div class="nav-dropdown" id="nav-org">
                ${organizationNav.map(
                  ([url, label, key, text]) => html`
                    <a href="${prefix}${url}"${current(key)}>
                      <strong>${label}</strong>
                      <span>${text}</span>
                    </a>
                  `,
                )}
              </div>
            </div>
          </nav>
        </header>
        <main id="main">${body}</main>
        ${when(
          active !== 'join',
          () => html`
            <section class="contact-band">
              <div>
                <span class="eyebrow">JOIN US</span>
                <h2>Join Scuderia Segfault:<br />Build and Race with Us</h2>
              </div>
              <a class="button light" href="${prefix}join.html">Join the team</a>
            </section>
          `,
        )}
        <footer>
          <div class="footer-top">
            <a class="wordmark" href="${prefix}index.html">${logo(prefix)}</a>
            <p>Autonomous racing at TU Wien since 2020.</p>
            <div>
              <a href="${esc(site.linkedin)}">LinkedIn</a>
              <a href="${esc(site.github)}">GitHub</a>
              <a href="${esc(site.university)}">Legacy website</a>
              <a href="https://www.youtube.com/@cps-tuwien9092">YouTube</a>
              <a href="https://www.instagram.com/scuderiasegfault/">Instagram</a>
            </div>
            <div>
              <a href="${prefix}research.html#projects">Project archive</a>
              <a href="${prefix}research.html#publications">Publications & theses</a>
              <a href="${prefix}members.html">Members & alumni</a>
              <a href="${prefix}sponsors.html">Sponsors & partnerships</a>
              <a href="${prefix}blog/index.html">Blog</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${new Date().getFullYear()} Scuderia Segfault · TU Wien</span>
            <span>
              <a href="https://www.tuwien.at/inf/scuderia-segfault/">Legacy website</a> · <a href="https://www.tuwien.at/en/tu-wien/contact/legal-notice">Legal notice</a>
            </span>
          </div>
        </footer>
        <dialog class="video-dialog" aria-labelledby="video-title">
          <div class="dialog-head">
            <h2 id="video-title">Video</h2>
            <button class="close-video" aria-label="Close video">✕</button>
          </div>
          <div class="video-frame"></div>
          <p>
            Video hosted on YouTube. <a class="video-fallback" target="_blank" rel="noopener">Open on YouTube</a>
          </p>
        </dialog>
      </body>
    </html>
  `;
}
