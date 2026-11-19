const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu?.addEventListener('click', () => { const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open); });
document.addEventListener('keydown',event=>{if(event.key==='Escape'){menu?.setAttribute('aria-expanded','false');nav?.classList.remove('open')}});
for(const scope of document.querySelectorAll('[data-filter-scope]')) {
 const query=scope.querySelector('[data-search-input]'),category=scope.querySelector('[data-category-select]'),year=scope.querySelector('[data-year-select]'),author=scope.querySelector('[data-author-select]');
 const items=[...scope.querySelectorAll('.filter-item')];
 const normalize=s=>s.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase();
 if(author){const requested=new URLSearchParams(location.search).get('author');if([...author.options].some(o=>o.value===requested))author.value=requested;}
 function update(){const q=normalize(query?.value.trim()||'');let count=0;for(const item of items){const visible=normalize(item.dataset.search||'').includes(q)&&(!category?.value||item.dataset.category===category.value)&&(!year?.value||item.dataset.year===year.value)&&(!author?.value||(item.dataset.authors||'').split(' ').includes(author.value));item.hidden=!visible;if(visible)count++;}
  for(const group of scope.querySelectorAll('.pub-year-group,.pub-type-section,.member-group'))group.hidden=![...group.querySelectorAll('.filter-item')].some(item=>!item.hidden);
  scope.querySelector('.result-count').textContent=`${count} ${count===1?'result':'results'}`;scope.querySelector('.empty-results').hidden=count!==0;
 }
 for(const control of [query,category,year,author])control?.addEventListener('input',update);update();
}
const dialog=document.querySelector('.video-dialog');
const frame=document.querySelector('.video-frame');
for(const button of document.querySelectorAll('[data-video]'))button.addEventListener('click',()=>{
 const id=button.dataset.video;if(!/^[a-zA-Z0-9_-]{11}$/.test(id))return;
 document.querySelector('#video-title').textContent=button.dataset.title;
 document.querySelector('.video-fallback').href=`https://www.youtube.com/watch?v=${id}`;
 const iframe=document.createElement('iframe');iframe.src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;iframe.title=button.dataset.title;iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';iframe.allowFullscreen=true;iframe.referrerPolicy='strict-origin-when-cross-origin';frame.replaceChildren(iframe);dialog.showModal();
});
document.querySelector('.close-video')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('close',()=>frame.replaceChildren());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});

import './racing-motion.js';
import './partnership.js';

for(const group of document.querySelectorAll('.nav-group')){const t=group.querySelector('.nav-group-toggle');t?.addEventListener('click',e=>{e.stopPropagation();const open=t.getAttribute('aria-expanded')!=='true';t.setAttribute('aria-expanded',String(open));group.classList.toggle('open',open)});document.addEventListener('click',e=>{if(!group.contains(e.target)){t?.setAttribute('aria-expanded','false');group.classList.remove('open')}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){t?.setAttribute('aria-expanded','false');group.classList.remove('open')}})}
