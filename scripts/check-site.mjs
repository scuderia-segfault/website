import {readFile,readdir,access} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dist=resolve(root,'dist');
async function files(dir){return (await Promise.all((await readdir(dir,{withFileTypes:true})).map(async e=>e.isDirectory()?files(resolve(dir,e.name)):resolve(dir,e.name)))).flat()}
const htmlFiles=(await files(dist)).filter(p=>p.endsWith('.html'));
const docs=new Map(await Promise.all(htmlFiles.map(async p=>[p,await readFile(p,'utf8')])));
let links=0;
for(const [file,html] of docs){
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`Duplicate IDs: ${file}`);
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const value=match[1];if(/^(?:https?:|mailto:|data:|\/\/)/.test(value))continue;
  const [path,fragment]=value.split('#');const target=path?resolve(dirname(file),decodeURIComponent(path.split('?')[0])):file;
  assert(target.startsWith(dist),'Link escapes dist');await access(target);links++;
  if(fragment&&docs.has(target))assert(docs.get(target).includes(`id="${fragment}"`),`Missing anchor ${value} in ${file}`);
 }
}
for(const name of ['projects','members','publications','videos','archive','work-items']){
 const records=JSON.parse(await readFile(resolve(root,`content/data/${name}.json`),'utf8'));const ids=records.map(r=>r.id);assert.equal(ids.length,new Set(ids).size,`Duplicate ${name} IDs`);
 assert(records.length>0,`Empty ${name}`);
}
for(const kind of ['news','blog'])for(const file of (await readdir(resolve(root,'content',kind))).filter(f=>f.endsWith('.md'))){
 const raw=await readFile(resolve(root,'content',kind,file),'utf8');const metadata=JSON.parse(raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)[1]);
 if(metadata.draft){assert(!docs.has(resolve(dist,kind,file.slice(0,-3),'index.html')),`Draft published: ${file}`)}
}
console.log(`Checked ${htmlFiles.length} HTML pages, ${links} local links/assets, collection IDs and draft exclusion.`);

const publications=JSON.parse(await readFile(resolve(root,'content/data/publications.json'),'utf8'));
for(const pub of publications){
 const bib=await readFile(resolve(dist,'citations',pub.id+'.bib'),'utf8');assert(bib.includes('title = {'),`Missing BibTeX title: ${pub.id}`);
 if(pub.thumbnail){assert(pub.thumbnailSource && pub.thumbnailPage>0,`Missing figure provenance: ${pub.id}`);await access(resolve(dist,pub.thumbnail));}
}
const members=JSON.parse(await readFile(resolve(root,'content/data/members.json'),'utf8'));
assert(members.every(m=>['Active Team','Associated Members','Alumni'].includes(m.status)),'Unknown membership group');
console.log(`Checked ${publications.length} BibTeX exports, figure provenance and membership groups.`);
