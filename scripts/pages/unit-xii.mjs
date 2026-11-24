// unit-xii.html was a concept page of the original template; it now points to the research page.
import { html } from '../lib/html.mjs';
import { hero } from '../lib/components.mjs';

export default function unitXiiPage({ page }) {
  const body = html`
    ${hero('RESEARCH', 'Research at TU Wien:<br><em>From the Lab to the Track</em>', 'The projects and publications behind our autonomous race cars.')}
    <section class="section wrap"><a class="button dark" href="research.html#projects">Explore research projects</a> <a class="text-link" href="research.html#publications">Read publications</a></section>
  `;
  return [{ path: 'unit-xii.html', html: page('Research at TU Wien', body) }];
}
