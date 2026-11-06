const $=id=>document.getElementById(id);let tasks=[];

function example(x){$("goal").value=x}
function category(g){g=g.toLowerCase();if(g.includes("exam")||g.includes("study"))return"EDUCATION";if(g.includes("trip")||g.includes("travel"))return"TRAVEL";if(g.includes("shop")||g.includes("laptop")||g.includes("buy"))return"SHOPPING";if(g.includes("project")||g.includes("report")||g.includes("work"))return"WORK";return"GENERAL"}

function makePlan(g){
 const x=g.toLowerCase();
 if(x.includes("exam")||x.includes("study"))return["Understand syllabus and requirements","Divide subjects into smaller topics","Create a study schedule","Study the first topic","Practice questions","Take a mock test","Analyze mistakes and revise","Final review"];
 if(x.includes("trip")||x.includes("travel"))return["Define destination, dates and constraints","Set the travel budget","Research transportation","Research accommodation","List places and activities","Create a day-by-day route","Estimate total cost","Prepare final checklist"];
 if(x.includes("shop")||x.includes("laptop")||x.includes("buy"))return["Define requirements and budget","Identify important specifications","Find suitable options","Collect prices and information","Compare shortlisted options","Review available evidence","Shortlist final choices","Make the decision"];
 return["Understand requirements","Break the objective into smaller tasks","Collect required information","Create the initial structure","Complete the main work","Review and improve","Check quality","Finalize the result"];
}

function createMission(){
 const g=$("goal").value.trim();if(!g){alert("Please enter a goal first.");return}
 tasks=makePlan(g).map((name,i)=>({name,done:false,status:i===0?"RUNNING":"PENDING"}));
 $("missionTitle").textContent=g;$("category").textContent=category(g);$("workspace").classList.remove("hidden");
 $("log").innerHTML="";addLog("Mission created.");render();$("workspace").scrollIntoView({behavior:"smooth"});
}

function render(){
 let done=tasks.filter(t=>t.done).length,total=tasks.length,p=Math.round(done/total*100);
 $("percent").textContent=p+"%";$("bar").style.width=p+"%";$("counter").textContent=done+" / "+total;
 $("completed").textContent=done;$("pending").textContent=tasks.filter(t=>!t.done&&t.status!=="BLOCKED").length;$("blocked").textContent=tasks.filter(t=>t.status==="BLOCKED").length;
 let current=tasks.findIndex(t=>!t.done);$("status").textContent=p===100?"COMPLETED":current===0?"RUNNING":"IN PROGRESS";$("statusDetail").textContent=p===100?"Mission finished":`Current step ${current+1} of ${total}`;
 $("tasks").innerHTML=tasks.map((t,i)=>`<div class="task ${t.done?"done":""}"><input type="checkbox" id="t${i}" ${t.done?"checked":""} onchange="toggleTask(${i})"><label for="t${i}">${i+1}. ${t.name}</label><span class="badge">${t.done?"DONE":t.status}</span></div>`).join("");
 $("route").innerHTML=tasks.map((t,i)=>`<div class="route-step ${t.done?"done":i===current?"current":""}"><div class="route-dot">${t.done?"✓":i+1}</div><p>${t.name}</p></div>`).join("");
}

function toggleTask(i){tasks[i].done=!tasks[i].done;tasks.forEach((t,j)=>{if(!t.done)t.status=j===tasks.findIndex(x=>!x.done)?"RUNNING":"PENDING"});addLog((tasks[i].done?"Completed: ":"Reopened: ")+tasks[i].name);render()}

function replan(){tasks=tasks.map(t=>t.done?t:{...t,status:"PENDING"});let i=tasks.findIndex(t=>!t.done);if(i>=0)tasks[i].status="RUNNING";addLog("Roadmap re-planned around remaining tasks.");render()}

function addLog(msg){let d=document.createElement("div");d.className="log-item";d.innerHTML=`<b>${new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</b> — ${msg}`;$("log").prepend(d)}