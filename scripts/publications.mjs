import {esc, image} from './layout.mjs';
const norm=s=>String(s).normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().replace(/[^a-z0-9]/g,'');
export function memberAuthors(pub,members){
 const authors=pub.authors?.length?pub.authors:[pub.authorsText||pub.citation];
 return members.filter(m=>authors.some(author=>{
  const parts=m.name.split(' '),surname=parts.at(-1),first=parts[0];const clean=norm(author);
  if(clean.includes(norm(m.name)) || clean===norm(surname+first))return true;
  const initials=first.split('-').map(x=>norm(x)[0]).join('');return [norm(surname)+initials,initials+norm(surname),norm(surname)+initials[0],initials[0]+norm(surname)].includes(clean);
 }));
}
function authorText(pub,members,pre){
 const authors=pub.authors?.length?pub.authors:[];
 if(!authors.length)return esc(pub.authorsText||pub.citation.split(/\(20\d\d\)/)[0].slice(0,260));
 const names=authors.map(name=>{const m=memberAuthors({authors:[name]},members)[0];return m?`<a class="author-link" href="${pre}members.html#${m.id}">${esc(name)}</a>`:esc(name)});
 if(names.length<=4)return names.join(', ');
 return names.slice(0,4).join(', ')+`<details class="more-authors"><summary>and ${names.length-4} more authors</summary><span>${names.slice(4).join(', ')}</span></details>`;
}
export function venueBadge(pub){
 const v=(pub.venue||'')+' '+pub.citation;
 for(const [test,label] of [[/Neural Information|NeurIPS/i,'NeurIPS'],[/International Conference on Robotics|ICRA/i,'ICRA'],[/IEEE Access/i,'ACCESS'],[/Nature Machine Intelligence/i,'NMI'],[/AAAI/i,'AAAI'],[/ICLR/i,'ICLR'],[/ICML/i,'ICML'],[/ISoLA/i,'ISoLA'],[/IEEE.*Decision and Control|CDC/i,'CDC'],[/DATE|Design.*Automation.*Test/i,'DATE'],[/Applied Thermal Engineering/i,'ATE'],[/Thermal Science/i,'TSEP'],[/Frontiers/i,'Frontiers'],[/Vehicle System Dynamics/i,'VSD']])if(test.test(v))return label;
 return pub.type==='Thesis'?'THESIS':pub.type==='Preprint'?'arXiv':pub.type==='Journal'?'JOURNAL':pub.type==='Book chapter'?'CHAPTER':pub.type==='Conference'?'CONF.':'WORKSHOP';
}
export function publicationRow(pub,pre='',members=[]){
 const authors=memberAuthors(pub,members).map(m=>m.id).join(' ');
 const thumb=pub.thumbnail?`<a class="paper-preview" href="${esc(pub.pdf||pub.url)}" target="_blank" rel="noopener">${image(pre+pub.thumbnail,pub.thumbnailAlt)}<span>${esc(pub.thumbnailKind)}</span></a>`:`<a class="paper-preview paper-preview-unavailable" href="${esc(pub.url)}" target="_blank" rel="noopener"><span class="paper-symbol" aria-hidden="true">▤</span><span>View publication ↗</span></a>`;
 const link=(url,label)=>url?`<a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`:'';
 return `${(pub.aliases||[]).map(id=>`<span id="${id}" class="publication-alias"></span>`).join('')}<article id="${pub.id}" class="pub-row filter-item" data-year="${pub.year}" data-category="${esc(pub.type)}" data-authors="${authors}" data-search="${esc([pub.title,pub.citation,pub.venue,...(pub.authors||[])].join(' ').toLowerCase())}">${thumb}<div class="pub-venue"><span class="venue-badge type-${pub.type.toLowerCase().replaceAll(' ','-')}">${esc(venueBadge(pub))}</span><span>${pub.year}</span></div><div class="pub-content"><h3><a href="${esc(pub.url)}" target="_blank" rel="noopener">${esc(pub.title)}</a></h3><div class="pub-authors">${authorText(pub,members,pre)}</div><p class="pub-citation"><em>${esc(pub.venue||pub.type)}</em>, ${pub.year}</p><div class="paper-actions"><a href="${pre}citations/${pub.id}.bib" download>BIB</a>${link(pub.url,'HTML')}${link(pub.doi?'https://doi.org/'+pub.doi:null,'DOI')}${link(pub.pdf,'PDF')}${link(pub.arxiv?.url,'ARXIV')}${link(pub.scholar,'SCHOLAR')}</div></div></article>`;
}
export function publicationCatalogue(pubs,members){
 const groups=[['Journal','Journal Publications'],['Conference','Conference Publications'],['Workshop','Workshop Publications'],['Preprint','Preprints'],['Book chapter','Book Chapters'],['Thesis','Theses'],['Other','Other Research Outputs']];
 return groups.map(([type,label])=>{const items=pubs.filter(p=>p.type===type);if(!items.length)return '';const years=[...new Set(items.map(p=>p.year))].sort((a,b)=>b-a);return `<section class="pub-type-section"><h2>${label}</h2>${years.map(year=>`<section class="pub-year-group"><div class="publication-year-heading"><h3>${year}</h3></div><div class="pub-list">${items.filter(p=>p.year===year).map(p=>publicationRow(p,'',members)).join('')}</div></section>`).join('')}</section>`}).join('');
}
export function bibtex(pub){
 const kind={Journal:'article',Conference:'inproceedings',Workshop:'inproceedings',Thesis:/dissertation|doctoral|ph\.?d/i.test(pub.citation)?'phdthesis':'mastersthesis','Book chapter':'incollection'}[pub.type]||'misc';
 const val=s=>String(s).replace(/[{}]/g,'').replace(/\s+/g,' ').trim();
 const fields={title:pub.title,author:(pub.authors||[]).join(' and ')||pub.authorsText,year:pub.year,[pub.type==='Journal'?'journal':pub.type==='Thesis'?'school':'booktitle']:pub.venue,doi:pub.doi,url:pub.url};
 return `@${kind}{${pub.id},\n`+Object.entries(fields).filter(([,v])=>v).map(([k,v])=>`  ${k} = {${val(v)}}`).join(',\n')+'\n}\n';
}
