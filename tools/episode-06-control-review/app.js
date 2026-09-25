'use strict';
const VERSION=1;
const CONTROLS=[
 ['Data boundary','Where may prompts, retrieved data, outputs, logs, backups and support artifacts go? Include deletion duties.'],
 ['Keys and access','Who holds and recovers keys? Who can administer the service, from where, and with whose approval?'],
 ['Model rights','Which license, weights, code, provenance and modification rights are actually available? Open weights alone do not establish open-source status.'],
 ['Updates and retirement','Who can change the model or runtime? Record notice, evaluation and migration rights. A retired endpoint may be unavailable for rollback.'],
 ['Platform authority','Who controls identity, network policy, deployment and tool permissions? Identify shared or global services.'],
 ['Operations and recovery','Who monitors, patches, responds and accepts return to service? Record the approved degraded mode and on-call coverage.'],
 ['Evidence access','Who can retrieve the necessary version, action and human-review records? Record retention, access and deletion limits without copying sensitive contents.'],
 ['Exit and portability','What can be exported, to which destination, with which license and acceptance test? Include time, people and cost.']
];
const CONTEXT=['workload','sector','proposal','boundary','openness','operator','reviewer','reviewDate','decision','rationale'];
const KEYS=['required','requirement','holder','status','evidence','checked','owner','resources','fallback','action','due'];
const STATUS=['Unknown','Provider claim only','Reviewer records evidence reviewed','Known gap','Not applicable'];
const HOLDERS=['Unknown','Enterprise','Provider','Shared'];
const DECISIONS=['Undecided','Request evidence','Fund a bounded evaluation','Defer','Human approval recorded outside this tool'];
function blank(){return {schemaVersion:VERSION,example:false,context:Object.fromEntries(CONTEXT.map(k=>[k,k==='decision'?'Undecided':''])),controls:CONTROLS.map(()=>({required:'Yes',requirement:'',holder:'Unknown',status:'Unknown',evidence:'',checked:'',owner:'',resources:'',fallback:'',action:'',due:''}))};}
let review=blank(),step=0,dirty=false;
const $=id=>document.getElementById(id);
function node(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function say(text){$('message').textContent=text;}
function changed(){dirty=true;}
function field(parent,record,key,label,type='text',options=null,hint=''){
 const box=node('div',undefined,'field'),id='input-'+key;
 const lab=node('label',label);lab.htmlFor=id;box.append(lab);
 const input=node(options?'select':type==='textarea'?'textarea':'input');input.id=id;
 if(options)options.forEach(v=>{const o=node('option',v);o.value=v;input.append(o);});else if(type!=='textarea')input.type=type;
 if(!options&&type!=='date')input.maxLength=2000;input.value=record[key];
 input.addEventListener('input',()=>{record[key]=input.value;changed();});box.append(input);
 if(hint){const help=node('small',hint);help.id=id+'-help';input.setAttribute('aria-describedby',help.id);box.append(help);}parent.append(box);return input;
}
function gaps(c){
 if(c.required==='No'&&c.status==='Not applicable')return c.requirement.trim()&&c.owner.trim()&&c.evidence.trim()&&c.checked?[]:['Document exclusion rationale, reviewer, reference and review date'];
 const missing=[];
 if(!c.requirement.trim())missing.push('Define the requirement');
 if(c.holder==='Unknown')missing.push('Confirm who holds the right');
 if(c.status!=='Reviewer records evidence reviewed')missing.push(c.status==='Known gap'?'Resolve the known gap':'Review evidence for the control');
 if(!c.evidence.trim()||!c.checked)missing.push('Add evidence reference and checked date');
 if(!c.owner.trim())missing.push('Name an accountable enterprise owner');
 if(!c.resources.trim())missing.push('Describe the resourcing and funding position');
 if(!c.fallback.trim())missing.push('Describe the fallback or residual limitation');
 return missing;
}
function summary(data){const rows=data.controls.map((c,i)=>({i,issues:gaps(c)}));const required=rows.filter(r=>data.controls[r.i].required==='Yes'&&r.issues.length);const missing=['workload','proposal','boundary','openness','operator','reviewer','reviewDate'].filter(k=>!data.context[k].trim());return {rows,required,missing};}
function report(data){const s=summary(data),v=x=>x.trim()||'[not supplied]';let out=['# AI control review','Ariana.Digital · Episode 6 · Tool v1.0',data.example?'ILLUSTRATIVE EXAMPLE — not a real assessment':'USER-ENTERED ASSESSMENT — evidence not independently verified','',s.required.length?`${s.required.length} required control areas have unresolved items.`:'No unresolved required-control fields recorded. This is not approval.',s.missing.length?'Scope incomplete: '+s.missing.join(', '):'Scope fields supplied.','',...CONTEXT.map(k=>`${k}: ${v(data.context[k])}`),''];
 data.controls.forEach((c,i)=>{out.push('## '+CONTROLS[i][0],...KEYS.map(k=>`${k}: ${v(c[k])}`),'Follow-up: '+(s.rows[i].issues.join('; ')||'No missing fields detected; human review still required.'),'');});
 out.push('## Decision boundary','Entries and evidence-review claims are supplied by the user. Completeness does not prove effectiveness, compliance, sovereignty or suitability. Missing mandatory controls cannot be offset by an average score. Confirm current provider terms and jurisdiction-specific requirements with qualified owners.','Export may contain confidential information. Share only through approved channels.');return out.join('\n');}
function download(name,text,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=node('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function validate(raw){
 if(!raw||raw.schemaVersion!==VERSION||typeof raw.example!=='boolean'||!raw.context||!Array.isArray(raw.controls)||raw.controls.length!==CONTROLS.length)throw Error('This is not a version 1 control-review file.');
 const fresh=blank();fresh.example=raw.example;
 function copy(from,to,keys){for(const k of keys){if(typeof from[k]!=='string'||from[k].length>2000)throw Error('Invalid or oversized field: '+k);to[k]=from[k];}}
 copy(raw.context,fresh.context,CONTEXT);if(!DECISIONS.includes(fresh.context.decision))throw Error('Invalid decision.');
 raw.controls.forEach((c,i)=>{if(!c||typeof c!=='object')throw Error('Invalid control.');copy(c,fresh.controls[i],KEYS);if(!['Yes','No'].includes(c.required)||!STATUS.includes(c.status)||!HOLDERS.includes(c.holder))throw Error('Invalid control option.');});
 const dates=[fresh.context.reviewDate,...fresh.controls.flatMap(c=>[c.checked,c.due])];for(const d of dates)if(d&&(!/^\d{4}-\d{2}-\d{2}$/.test(d)||isNaN(Date.parse(d))||new Date(d).toISOString().slice(0,10)!==d))throw Error('Invalid date.');return fresh;
}
function example(){const d=blank();d.example=true;Object.assign(d.context,{workload:'Maintenance-manual assistant; no direct equipment control',sector:'Energy (fictional)',proposal:'Provider-run open-weight model in a dedicated US environment',boundary:'US data storage; remote support access still needs confirmation',openness:'Weights available; license and supporting materials not yet reviewed',operator:'Provider runs the platform; enterprise approves business use',reviewer:'Example architecture lead',reviewDate:'2026-09-24',decision:'Request evidence',rationale:'Local hosting is documented in a fictional offer, but update and exit rights remain unresolved.'});d.controls.forEach((c,i)=>{c.requirement=CONTROLS[i][1];c.owner=i===3?'Example model-risk lead':'Example service owner';c.action='Request scoped contract terms and operating evidence.';c.due='2026-10-01';});Object.assign(d.controls[3],{holder:'Provider',status:'Known gap',evidence:'DEMO-CLAUSE-7: fictional draft permits provider-controlled updates',checked:'2026-09-24',resources:'Evaluation team identified; funding not approved',fallback:'Hold new requests while an approved alternative is evaluated',action:'Confirm notice, evaluation window and migration path.'});return d;}
function render(focus=false){
 const nav=$('steps');nav.replaceChildren();['Scope',...CONTROLS.map(c=>c[0]),'Review brief'].forEach((label,i)=>{const b=node('button',`${i+1}. ${label}`);if(i===step)b.setAttribute('aria-current','step');b.onclick=()=>{step=i;render(true);};nav.append(b);});
 $('progress').textContent=`STEP ${step+1} OF 10${review.example?' · ILLUSTRATIVE EXAMPLE':''}`;
 const panel=$('panel');panel.replaceChildren();
 if(step===0){panel.append(node('h2','Name the service under review'),node('p','Use one concrete proposal. Record location, model rights and operating responsibility separately.'));
 const fields=[['workload','Business workload'],['sector','Industry or sector'],['proposal','Proposed service configuration'],['boundary','Data and jurisdiction boundary'],['openness','Model rights and materials available'],['operator','Who operates the service?'],['reviewer','Review owner'],['reviewDate','Review date','date']];fields.forEach(([k,l,t])=>field(panel,review.context,k,l,t||'text'));
 }else if(step<9){const i=step-1,c=review.controls[i];panel.append(node('h2',CONTROLS[i][0]),node('p',CONTROLS[i][1]));field(panel,c,'required','Required for this workload?','text',['Yes','No'],'If excluded, explain why and record the reviewer, reference and date.');field(panel,c,'requirement','Required right or exclusion rationale','textarea');field(panel,c,'holder','Who holds the right?','text',HOLDERS);field(panel,c,'status','Evidence position','text',STATUS,'“Evidence reviewed” is your attestation, not a verification by this tool.');field(panel,c,'evidence','Evidence reference or exclusion record','textarea',null,'Use a document ID, clause or test reference. Do not paste credentials, patient data or confidential source documents.');field(panel,c,'checked','Evidence / exclusion review date','date');field(panel,c,'owner','Accountable enterprise owner');field(panel,c,'resources','People, process, technology and funding','textarea',null,'State what is funded, unfunded or unknown. Delegation still needs an enterprise owner.');field(panel,c,'fallback','Fallback or residual limitation','textarea');field(panel,c,'action','Next action');field(panel,c,'due','Action due date','date');
 }else{const s=summary(review);panel.append(node('h2','Your control review'),node('p',s.required.length?`${s.required.length} required control areas need follow-up.`:'No unresolved required-control fields recorded. Human review is still required.','notice'));
 if(s.missing.length)panel.append(node('p','Scope fields still missing: '+s.missing.join(', ')));
 s.rows.forEach(r=>{const card=node('div',undefined,'card');card.append(node('h3',CONTROLS[r.i][0]),node('p',r.issues.length?r.issues.join(' · '):'Fields supplied; evidence not independently verified.',r.issues.length?'badge':''));if(r.issues.length&&(!review.controls[r.i].action.trim()||!review.controls[r.i].due))card.append(node('p','Also assign a next action and due date.'));panel.append(card);});
 field(panel,review.context,'decision','Human decision record','text',DECISIONS);field(panel,review.context,'rationale','Rationale, conditions and external approval reference','textarea');
 const actions=node('div',undefined,'actions');const exp=node('button','Download review brief','primary');exp.onclick=()=>download('ai-control-review.md',report(review),'text/markdown');const print=node('button','Print / save PDF');print.onclick=()=>{const pre=node('pre',report(review),'report');panel.append(pre);window.print();pre.remove();};actions.append(exp,print);panel.append(actions,node('p','You can export an incomplete review. Unresolved items remain visible in the brief.','hint'));
 }
 $('back').disabled=step===0;$('next').hidden=step===9;if(focus){const h=panel.querySelector('h2');h.tabIndex=-1;h.focus();}
}
$('back').onclick=()=>{step=Math.max(0,step-1);render(true);};$('next').onclick=()=>{step=Math.min(9,step+1);render(true);};
$('save').onclick=()=>{download('ai-control-review.json',JSON.stringify(review,null,2),'application/json');dirty=false;say('Review downloaded. Keep the file secure; it may contain confidential information.');};
function replace(data){if(dirty&&!confirm('Replace the current unsaved review? Save it first if you need to keep it.'))return false;review=data;step=0;dirty=false;render();return true;}
$('demo').onclick=()=>{if(replace(example()))say('Illustrative example loaded. Its documents, roles and findings are fictional.');};$('reset').onclick=()=>{if(replace(blank()))say('Blank review started.');};$('load').onclick=()=>$('file').click();
$('file').onchange=async event=>{const f=event.target.files[0];if(!f)return;try{if(f.size>500000)throw Error('File is too large. Maximum 500 KB.');const data=validate(JSON.parse(await f.text()));if(replace(data))say('Saved review opened locally. No data was uploaded.');}catch(e){say('Could not open review: '+e.message);}finally{event.target.value='';}};
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
window.ControlReview={blank,validate,summary,report,example,gaps};render();
