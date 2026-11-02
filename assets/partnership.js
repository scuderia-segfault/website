export function partnershipEmail(values){
 const subject=`Scuderia Segfault partnership — ${values.organization} — ${values.interest}`;
 const body=`Hello Scuderia Segfault,\n\n${values.message}\n\nName: ${values.name}\nOrganization: ${values.organization}\nEmail: ${values.email}\nInterested in: ${values.interest}\n`;
 return `mailto:scuderia-segfault@tuwien.ac.at?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
if(typeof document!=='undefined')document.querySelector('.partnership-form')?.addEventListener('submit',event=>{
 event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const values=Object.fromEntries(new FormData(form));const url=partnershipEmail(values);
 const status=form.querySelector('.form-result');status.replaceChildren(document.createTextNode('Your email app will open. If it does not, '));const link=document.createElement('a');link.href=url;link.textContent='open the prepared email';status.append(link,document.createTextNode('. Review and send it from there.'));location.href=url;
});
