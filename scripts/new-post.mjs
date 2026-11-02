import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),options={};
for(let i=0;i<args.length;i+=2){if(!args[i].startsWith('--')||args[i+1]===undefined)throw new Error('Use --type news|blog --slug short-name --title "Your title"');options[args[i].slice(2)]=args[i+1];}
if(!['news','blog'].includes(options.type)||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.slug||'')||!options.title?.trim())throw new Error('Use --type news|blog --slug short-name --title "Your title"');
const date=options.date||new Date().toISOString().slice(0,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date)throw new Error('Use a valid date: YYYY-MM-DD');
const template=await readFile(resolve(root,`content/templates/${options.type}.md`),'utf8');const metadata={title:options.title,date,author:'Scuderia Segfault',summary:'A short introduction.',draft:true};
const output=template.replace(/^---\r?\n[\s\S]*?\r?\n---/,`---\n${JSON.stringify(metadata,null,2)}\n---`);const destination=resolve(root,'content',options.type,options.slug+'.md');await mkdir(dirname(destination),{recursive:true});await writeFile(destination,output,{flag:'wx'});console.log(`Created draft: content/${options.type}/${options.slug}.md`);
