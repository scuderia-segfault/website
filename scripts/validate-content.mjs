import {readFile,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
let count=0;
for(const name of ['projects','publications','members','videos','archive','opportunities','sponsors','work-items']){
 const items=JSON.parse(await readFile(resolve(root,`content/data/${name}.json`),'utf8'));assert(Array.isArray(items),`${name}: expected an array`);const ids=new Set();
 for(const item of items){assert(typeof item.id==='string'&&(name==='videos'?/^[A-Za-z0-9_-]{11}$/:/^[a-z0-9]+(?:-[a-z0-9]+)*$/).test(item.id),`${name}: invalid id`);assert(!ids.has(item.id),`${name}: duplicate ${item.id}`);ids.add(item.id);count++;}
}
const opportunities=JSON.parse(await readFile(resolve(root,'content/data/opportunities.json'),'utf8'));
for(const item of opportunities)assert(item.type&&item.title&&item.summary&&item.subject&&Array.isArray(item.topics),`Incomplete opportunity: ${item.id}`);
for(const kind of ['news','blog'])for(const name of (await readdir(resolve(root,'content',kind))).filter(x=>x.endsWith('.md'))){
 const raw=await readFile(resolve(root,'content',kind,name),'utf8');const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);assert(match,`Missing metadata: ${kind}/${name}`);const meta=JSON.parse(match[1]);assert(meta.title?.trim()&&typeof meta.draft==='boolean',`Missing title/draft: ${name}`);assert(/^\d{4}-\d{2}-\d{2}$/.test(meta.date)&&!Number.isNaN(Date.parse(meta.date))&&new Date(meta.date).toISOString().slice(0,10)===meta.date,`Invalid date: ${name}`);count++;
}
const site=JSON.parse(await readFile(resolve(root,'content/data/site.json'),'utf8'));
for(const key of ['linkedin','github','university'])assert(new URL(site[key]).protocol==='https:',`Invalid ${key} URL`);
console.log(`Validated ${count} content records and official network links.`);

for(const w of JSON.parse(await readFile(resolve(root,'content/data/work-items.json'),'utf8')))assert(w.title&&w.type&&['Open','Topic proposal','Closed'].includes(w.status)&&Array.isArray(w.tasks)&&Array.isArray(w.background)&&w.source,`Incomplete work topic: ${w.id}`);
