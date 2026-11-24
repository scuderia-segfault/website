// Site behaviour: mobile menu, navigation dropdown, list filters and the video dialog.
import './racing-motion.js';
import './partnership.js';

// Mobile menu
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');

function setMenu(open) {
  if (!menu || !nav) return;
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  menu.innerHTML = open ? 'Close <span>✕</span>' : 'Menu <span>☰</span>';
}

menu?.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

// "Organization" dropdown
for (const group of document.querySelectorAll('.nav-group')) {
  const toggle = group.querySelector('.nav-group-toggle');
  const setOpen = (open) => {
    toggle?.setAttribute('aria-expanded', String(open));
    group.classList.toggle('open', open);
  };
  toggle?.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('click', (event) => {
    if (!group.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
}

// Search and filters. Each [data-filter-scope] contains the controls and the .filter-item
// elements; items carry data-search, data-category, data-year and data-authors.
const normalize = (s) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

for (const scope of document.querySelectorAll('[data-filter-scope]')) {
  const query = scope.querySelector('[data-search-input]');
  const category = scope.querySelector('[data-category-select]');
  const year = scope.querySelector('[data-year-select]');
  const author = scope.querySelector('[data-author-select]');
  const items = [...scope.querySelectorAll('.filter-item')];

  // research.html?author=<member-id> preselects a team author.
  if (author) {
    const requested = new URLSearchParams(location.search).get('author');
    if ([...author.options].some((o) => o.value === requested)) author.value = requested;
  }

  function update() {
    const q = normalize(query?.value.trim() || '');
    let count = 0;
    for (const item of items) {
      const visible =
        normalize(item.dataset.search || '').includes(q) &&
        (!category?.value || item.dataset.category === category.value) &&
        (!year?.value || item.dataset.year === year.value) &&
        (!author?.value || (item.dataset.authors || '').split(' ').includes(author.value));
      item.hidden = !visible;
      if (visible) count++;
    }
    // Hide headings of groups without visible items.
    for (const group of scope.querySelectorAll('.pub-year-group,.pub-type-section,.member-group')) {
      group.hidden = ![...group.querySelectorAll('.filter-item')].some((item) => !item.hidden);
    }
    scope.querySelector('.result-count').textContent =
      `${count} ${count === 1 ? 'result' : 'results'}`;
    scope.querySelector('.empty-results').hidden = count !== 0;
  }

  for (const control of [query, category, year, author]) control?.addEventListener('input', update);
  update();
}

// Video dialog: the YouTube player is only loaded after a click.
const dialog = document.querySelector('.video-dialog');
const frame = document.querySelector('.video-frame');

for (const button of document.querySelectorAll('[data-video]')) {
  button.addEventListener('click', () => {
    const id = button.dataset.video;
    if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
    document.querySelector('#video-title').textContent = button.dataset.title;
    document.querySelector('.video-fallback').href = `https://www.youtube.com/watch?v=${id}`;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = button.dataset.title;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.replaceChildren(iframe);
    dialog.showModal();
  });
}

document.querySelector('.close-video')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('close', () => frame.replaceChildren());
// Close when clicking the backdrop outside the dialog box.
dialog?.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (
    event.clientX < r.left ||
    event.clientX > r.right ||
    event.clientY < r.top ||
    event.clientY > r.bottom
  ) {
    dialog.close();
  }
});
