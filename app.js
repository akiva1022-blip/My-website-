const chat=document.querySelector('#chat'), input=document.querySelector('#input'), send=document.querySelector('#send'), mic=document.querySelector('#mic');
const key='jarvis_messages_v1';
let history=JSON.parse(localStorage.getItem(key)||'[]');
function add(text,who='jarvis',save=true){const d=document.createElement('div');d.className='msg '+who;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;if(save){history.push({text,who});localStorage.setItem(key,JSON.stringify(history.slice(-30)))}} 
history.forEach(x=>add(x.text,x.who,false));
if(!history.length)add("Online. I'm ready. Connect an AI API to give me full reasoning and actions.");
function localReply(t){t=t.toLowerCase();if(t.includes('what can you'))return"V1 is ready for voice, conversation, memory, tasks, web research, email and calendar integrations. The AI/API connection is the next step.";if(t.includes('task'))return"I can store the request locally for now. The next build connects real reminders/tasks.";if(t.includes('plan'))return"Start with your three priorities: one important task, one practical task, and one personal task. I can turn that into a real schedule once the calendar connection is added.";return"I received that. The interface is working; the next step is connecting my AI brain so I can answer and act intelligently."}
function submit(){const t=input.value.trim();if(!t)return;add(t,'user');input.value='';setTimeout(()=>add(localReply(t)),250)}
send.onclick=submit;input.addEventListener('keydown',e=>{if(e.key==='Enter')submit()});
document.querySelectorAll('.card').forEach(b=>b.onclick=()=>{input.value=b.dataset.cmd;submit()});
if('SpeechRecognition'in window||'webkitSpeechRecognition'in window){const R=window.SpeechRecognition||window.webkitSpeechRecognition;const r=new R();r.lang='en-US';r.onresult=e=>{input.value=e.results[0][0].transcript;submit()};mic.onclick=()=>r.start()}else mic.onclick=()=>add('Voice input is not supported by this browser.','jarvis');
