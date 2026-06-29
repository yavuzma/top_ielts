// =====================================================================
//  IELTS 9/9 — uygulama mantığı + bulut senkron (Firebase opsiyonel)
// =====================================================================

const KEY = "ielts9_state_v2";
let state = JSON.parse(localStorage.getItem(KEY) || "{}");
state.tasks   = state.tasks   || {};   // "b1m1#0": true
state.grammar = state.grammar || {};   // "g_pres": true
state.vocab   = state.vocab   || {};   // "AWL Sublist 1::analyse": "known"
state.essays  = state.essays  || {};   // id: {date,type,topic,q,text}
state.reading = state.reading || {};   // id: "2026-06-29" (son okuma tarihi)
state.listening = state.listening || {}; // id: "2026-06-29"
state.bands   = state.bands   || {};
state.streak  = state.streak  || { count: 0, last: null };
state.essayStreak = state.essayStreak || { count: 0, last: null };
state.examDate = state.examDate || window.EXAM_DATE || null;
state.level   = state.level   || "B1";
state.syncCode = state.syncCode || null;
state.updatedAt = state.updatedAt || 0;

// ---------- Senkron katmanı (Firebase) ----------
let db = null, docRef = null, remoteUnsub = null, applyingRemote = false;
let pushTimer = null;

function firebaseReady(){
  const c = window.FIREBASE_CONFIG || {};
  return !!(c.apiKey && c.projectId && typeof firebase !== "undefined");
}

function initFirebase(){
  if(!firebaseReady() || !state.syncCode) { updateSyncUI(); return; }
  try{
    if(!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
    db = firebase.firestore();
    const col = window.FIREBASE_COLLECTION || "ielts_studies";
    docRef = db.collection(col).doc(state.syncCode);
    // Canlı dinle: başka cihazda değişiklik olunca buraya düşer
    if(remoteUnsub) remoteUnsub();
    remoteUnsub = docRef.onSnapshot(snap=>{
      if(!snap.exists) { pushRemote(); return; }
      const remote = snap.data();
      if((remote.updatedAt||0) > (state.updatedAt||0)){
        mergeInto(remote);
        applyingRemote = true;
        save(false);           // yereli güncelle, tekrar push etme
        applyingRemote = false;
        renderAll();
      }
    }, err=> console.warn("Senkron hatası:", err));
    updateSyncUI();
  }catch(e){ console.warn("Firebase init hatası:", e); updateSyncUI(); }
}

// İki state'i güvenli birleştir (veri kaybı olmasın)
function mergeInto(remote){
  // tamamlanan görev/grammar/kelime: birleşim (true kalır)
  for(const k in (remote.tasks||{}))   if(remote.tasks[k])   state.tasks[k]=true;
  for(const k in (remote.grammar||{})) if(remote.grammar[k]) state.grammar[k]=true;
  for(const k in (remote.vocab||{}))   state.vocab[k]=remote.vocab[k];
  // essays: id bazında, daha uzun/yeni olan kazanır
  for(const id in (remote.essays||{})){
    const r=remote.essays[id], l=state.essays[id];
    if(!l || (r.text||"").length >= (l.text||"").length) state.essays[id]=r;
  }
  // reading/listening: en yeni tarih kazanır
  for(const id in (remote.reading||{}))   if(!state.reading[id]   || remote.reading[id]>state.reading[id])     state.reading[id]=remote.reading[id];
  for(const id in (remote.listening||{})) if(!state.listening[id] || remote.listening[id]>state.listening[id]) state.listening[id]=remote.listening[id];
  // tekil alanlar: uzaktaki daha yeniyse al
  state.bands = Object.assign({}, state.bands, remote.bands||{});
  if((remote.streak?.count||0) > (state.streak.count||0)) state.streak = remote.streak;
  if((remote.essayStreak?.count||0) > (state.essayStreak.count||0)) state.essayStreak = remote.essayStreak;
  if(remote.examDate) state.examDate = remote.examDate;
  if(remote.level) state.level = remote.level;
}

function pushRemote(){
  if(!docRef) return;
  clearTimeout(pushTimer);
  pushTimer = setTimeout(()=>{
    const payload = {
      tasks:state.tasks, grammar:state.grammar, vocab:state.vocab, essays:state.essays,
      reading:state.reading, listening:state.listening,
      bands:state.bands, streak:state.streak, essayStreak:state.essayStreak,
      examDate:state.examDate, level:state.level, updatedAt:state.updatedAt
    };
    docRef.set(payload).catch(e=>console.warn("Push hatası:", e));
  }, 600); // debounce
}

function save(push=true){
  if(!applyingRemote) state.updatedAt = Date.now();
  localStorage.setItem(KEY, JSON.stringify(state));
  if(push && docRef) pushRemote();
}

function setSyncCode(code){
  code = (code||"").trim();
  if(!code) return;
  state.syncCode = code; save(false);
  initFirebase();
}

function updateSyncUI(){
  const el = document.getElementById("syncStatus");
  if(!el) return;
  if(!firebaseReady()){
    el.innerHTML = "⚪ Yerel mod — senkron kapalı (Firebase ayarlanmadı)";
    el.className = "sync off";
  } else if(!state.syncCode){
    el.innerHTML = "🟡 Firebase hazır — senkron kodu gir";
    el.className = "sync warn";
  } else {
    el.innerHTML = `🟢 Senkron açık · kod: <b>${state.syncCode}</b>`;
    el.className = "sync on";
  }
  const inp = document.getElementById("syncCodeInput");
  if(inp && state.syncCode) inp.value = state.syncCode;
}

// ===== Sekme geçişi =====
document.querySelectorAll(".tab").forEach(t=>{
  t.onclick=()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    document.getElementById(t.dataset.tab).classList.add("active");
  };
});

// ===== Seviye seçimi =====
function initLevelPicker(){
  document.querySelectorAll(".lvl-btn").forEach(b=>{
    b.onclick=()=>{
      state.level=b.dataset.lvl; save(); renderLevel(); renderGrammar(); renderReading(); renderListening(); renderDashboard(); syncLevelButtons();
    };
  });
  syncLevelButtons();
}
function syncLevelButtons(){
  document.querySelectorAll(".lvl-btn").forEach(b=>
    b.classList.toggle("active", b.dataset.lvl===state.level));
}

// ===== Countdown =====
function examDate(){
  if(state.examDate) return new Date(state.examDate);
  const d=new Date(); d.setDate(d.getDate()+84); return d; // 12 hafta varsayılan
}
function renderCountdown(){
  const days=Math.max(0,Math.ceil((examDate()-new Date())/86400000));
  document.getElementById("countdown").innerHTML=
    `<b>${days}</b><small>gün kaldı (tahmini)</small>`;
}

// ===== Streak yardımcıları =====
function bumpStreak(obj){
  const today=new Date().toISOString().slice(0,10);
  if(obj.last===today) return;
  const y=new Date(Date.now()-86400000).toISOString().slice(0,10);
  obj.count = (obj.last===y) ? obj.count+1 : 1;
  obj.last=today;
}

// ===== Seviye modülleri (plan) =====
function renderLevel(){
  const lvl = window.LEVELS[state.level];
  document.getElementById("levelTitle").textContent = lvl.title;
  document.getElementById("levelDesc").textContent = lvl.desc;
  const c=document.getElementById("planContainer"); c.innerHTML="";
  lvl.modules.forEach((mod,mi)=>{
    const done=mod.tasks.filter((_,ti)=>state.tasks[`${mod.id}#${ti}`]).length;
    const pct=Math.round(done/mod.tasks.length*100);
    const block=document.createElement("div");
    block.className="week-block"+(mi===0?" open":"");
    block.innerHTML=`
      <div class="week-head">
        <div><h3>${mod.name}</h3><span class="wk-focus">${mod.focus}</span></div>
        <span class="week-pct">${pct}%</span>
      </div>
      <div class="week-body">
        ${mod.tasks.map((t,ti)=>{
          const id=`${mod.id}#${ti}`, ck=state.tasks[id]?"checked":"";
          return `<div class="task ${ck?'done':''}">
            <input type="checkbox" data-id="${id}" ${ck}>
            <label>${t}</label></div>`;
        }).join("")}
      </div>`;
    block.querySelector(".week-head").onclick=()=>block.classList.toggle("open");
    c.appendChild(block);
  });
  c.querySelectorAll('input[type=checkbox]').forEach(cb=>{
    cb.onchange=()=>{
      state.tasks[cb.dataset.id]=cb.checked;
      if(cb.checked) bumpStreak(state.streak);
      save(); renderLevel(); renderDashboard();
    };
  });
}

// ===== Dashboard =====
function levelProgress(){
  const lvl=window.LEVELS[state.level];
  let tot=0,dn=0;
  lvl.modules.forEach(m=>m.tasks.forEach((_,ti)=>{tot++; if(state.tasks[`${m.id}#${ti}`])dn++;}));
  return {tot,dn,pct: tot?Math.round(dn/tot*100):0};
}
function renderDashboard(){
  const p=levelProgress();
  document.getElementById("overallPct").textContent=p.pct+"%";
  document.getElementById("overallBar").style.width=p.pct+"%";
  document.getElementById("overallText").textContent=`${state.level}: ${p.dn} / ${p.tot} görev tamamlandı`;
  document.querySelector(".progress-ring").style.background=
    `conic-gradient(var(--accent) ${p.pct}%, var(--line) ${p.pct}%)`;

  document.getElementById("todayWeek").textContent=state.level+" seviyesi";
  document.getElementById("todayFocus").textContent=window.LEVELS[state.level].title.split("—")[1]?.trim()||"";
  document.getElementById("streak").textContent=state.streak.count+" gün";
  document.getElementById("essayStreak").textContent=state.essayStreak.count+" gün";
  document.getElementById("essayCount").textContent=Object.keys(state.essays).length+" essay";

  // Bugünün pratiği (okuma/dinleme/yazma)
  const t=todayStr();
  const rDone=Object.values(state.reading).includes(t);
  const lDone=Object.values(state.listening).includes(t);
  const wDone=Object.values(state.essays).some(e=>e.date===t);
  const pill=(ok,label)=>`<span class="pill ${ok?'on':''}">${ok?'✅':'⬜'} ${label}</span>`;
  const tp=document.getElementById("todayPractice");
  if(tp) tp.innerHTML = pill(rDone,"Okuma")+pill(lDone,"Dinleme")+pill(wDone,"Yazma (essay)");

  document.getElementById("dailyRoutine").innerHTML=
    window.ROUTINES[state.level].map(r=>`<li>▸ ${r}</li>`).join("");

  document.getElementById("bands").innerHTML=window.BANDS.map(b=>`
    <div class="band-item"><label>${b.label}</label>
      <input type="number" min="0" max="9" step="0.5" data-band="${b.key}"
        value="${state.bands[b.key]??''}" placeholder="-"></div>`).join("");
  document.querySelectorAll('input[data-band]').forEach(i=>{
    i.onchange=()=>{ state.bands[i.dataset.band]=i.value; save(); };
  });
}

// ===== Grammar =====
function renderGrammar(){
  const c=document.getElementById("grammarContainer"); c.innerHTML="";
  const filter=state.level;
  // seviye sırası: B1 < B2 < C1 — seçili seviye ve altını göster
  const order={B1:1,B2:2,C1:3};
  const items=window.GRAMMAR.filter(g=>order[g.level]<=order[filter]);
  const doneN=items.filter(g=>state.grammar[g.id]).length;
  document.getElementById("grammarProgress").textContent=`${doneN} / ${items.length} konu öğrenildi`;
  items.forEach(g=>{
    const done=state.grammar[g.id];
    const el=document.createElement("div");
    el.className="week-block";
    el.innerHTML=`
      <div class="week-head">
        <div><h3>${g.title} <span class="lvl-tag">${g.level}</span></h3>
          <span class="wk-focus">${g.summary}</span></div>
        <span class="week-pct">${done?"✓":""}</span>
      </div>
      <div class="week-body">
        <ul class="steps">${g.points.map(p=>`<li>${p}</li>`).join("")}</ul>
        <div class="examples"><b>Örnekler:</b><ul>${g.examples.map(e=>`<li>${e}</li>`).join("")}</ul></div>
        <div class="prompt-box"><code>${g.practice}</code>
          <button class="copy" data-copy="${g.practice.replace(/"/g,'&quot;')}">Kopyala</button></div>
        <label class="learn"><input type="checkbox" data-g="${g.id}" ${done?"checked":""}> Bu konuyu öğrendim</label>
      </div>`;
    el.querySelector(".week-head").onclick=()=>el.classList.toggle("open");
    c.appendChild(el);
  });
  c.querySelectorAll('input[data-g]').forEach(cb=>{
    cb.onchange=()=>{ state.grammar[cb.dataset.g]=cb.checked; if(cb.checked)bumpStreak(state.streak); save(); renderGrammar(); renderDashboard(); };
  });
  bindCopy();
}

// ===== Vocab flashcards =====
let vDeck=[], vIdx=0, vFlipped=false, vListName="";
function buildDeck(){
  vListName=document.getElementById("vocabList").value;
  vDeck=window.VOCAB[vListName].filter(card=> state.vocab[`${vListName}::${card.w}`]!=="known");
  vIdx=0; vFlipped=false; showCard();
}
function showCard(){
  const total=window.VOCAB[vListName].length;
  const known=window.VOCAB[vListName].filter(c=>state.vocab[`${vListName}::${c.w}`]==="known").length;
  document.getElementById("vocabProgress").textContent=`${known} / ${total} öğrenildi`;
  const front=document.getElementById("fcWord"), back=document.getElementById("fcBack");
  if(vDeck.length===0){ front.textContent="🎉 Bu liste bitti!"; back.classList.add("hidden"); return; }
  if(vIdx>=vDeck.length) vIdx=0;
  const card=vDeck[vIdx];
  front.textContent=card.w; back.classList.add("hidden"); vFlipped=false;
  back.innerHTML=`<div class="def">${card.d}</div><div class="ex">"${card.e}"</div>`;
}
function flip(){ const back=document.getElementById("fcBack"); vFlipped=!vFlipped; back.classList.toggle("hidden",!vFlipped); }
function mark(known){
  if(vDeck.length===0) return;
  const card=vDeck[vIdx];
  if(known){ state.vocab[`${vListName}::${card.w}`]="known"; vDeck.splice(vIdx,1); bumpStreak(state.streak); save(); }
  else { vIdx++; }
  if(vIdx>=vDeck.length) vIdx=0;
  showCard(); renderDashboard();
}
function initVocab(){
  const sel=document.getElementById("vocabList");
  sel.innerHTML=Object.keys(window.VOCAB).map(k=>`<option>${k}</option>`).join("");
  sel.onchange=buildDeck;
  document.getElementById("flashcard").onclick=flip;
  document.getElementById("vocabFlip").onclick=(e)=>{e.stopPropagation();flip();};
  document.getElementById("vocabKnow").onclick=()=>mark(true);
  document.getElementById("vocabAgain").onclick=()=>mark(false);
  buildDeck();
}

// ===== Günlük Essay =====
let currentPrompt=null;
function newPrompt(){
  currentPrompt = window.ESSAY_PROMPTS[Math.floor(Math.random()*window.ESSAY_PROMPTS.length)];
  document.getElementById("essayType").textContent=currentPrompt.type+" · "+currentPrompt.topic;
  document.getElementById("essayQ").textContent=currentPrompt.q;
}
function wordCount(t){ return (t.trim().match(/\S+/g)||[]).length; }
function saveEssay(){
  const ta=document.getElementById("essayText");
  const text=ta.value.trim();
  if(!text){ alert("Önce essay'ini yaz 🙂"); return; }
  const today=new Date().toISOString().slice(0,10);
  const id="e"+Date.now();
  state.essays[id]={ date:today, type:currentPrompt?.type||"Task 2", topic:currentPrompt?.topic||"-",
    q:currentPrompt?.q||"", text, words:wordCount(text) };
  bumpStreak(state.essayStreak); bumpStreak(state.streak);
  save(); ta.value="";
  document.getElementById("essayWords").textContent="0 kelime";
  renderEssayList(); renderDashboard();
  alert("Kaydedildi! ✅ Şimdi 'Claude'a puanlat' butonuyla geri bildirim al.");
}
function copyForClaude(){
  const text=document.getElementById("essayText").value.trim();
  if(!text){ alert("Önce essay'ini yaz."); return; }
  const prompt=`You are an IELTS examiner. Score the following ${currentPrompt?.type||"Task 2"} essay using the official band descriptors. Give a band for each of the four criteria (Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy), an overall band, then specific corrections and an improved version.\n\nQUESTION: ${currentPrompt?.q||""}\n\nESSAY:\n${text}`;
  navigator.clipboard.writeText(prompt);
  const b=document.getElementById("essayClaude"); const o=b.textContent;
  b.textContent="Kopyalandı ✓ — Claude'a yapıştır"; setTimeout(()=>b.textContent=o,2000);
}
function renderEssayList(){
  const c=document.getElementById("essayList");
  const ids=Object.keys(state.essays).sort().reverse();
  if(!ids.length){ c.innerHTML='<p class="hint">Henüz essay yok. Yukarıdan ilkini yaz!</p>'; return; }
  c.innerHTML=ids.map(id=>{
    const e=state.essays[id];
    return `<div class="essay-item">
      <div class="ei-head"><b>${e.date}</b> · ${e.type} · ${e.topic} · <span class="muted">${e.words||wordCount(e.text)} kelime</span>
        <button class="copy small del-essay" data-id="${id}">Sil</button></div>
      <div class="ei-q">${e.q||""}</div>
      <details><summary>Essay'i göster</summary><pre class="ei-text">${e.text.replace(/</g,"&lt;")}</pre></details>
    </div>`;
  }).join("");
  c.querySelectorAll(".del-essay").forEach(b=>b.onclick=()=>{
    if(confirm("Bu essay silinsin mi?")){ delete state.essays[b.dataset.id]; save(); renderEssayList(); renderDashboard(); }
  });
}
function initEssay(){
  newPrompt();
  document.getElementById("essayNew").onclick=newPrompt;
  document.getElementById("essaySave").onclick=saveEssay;
  document.getElementById("essayClaude").onclick=copyForClaude;
  const ta=document.getElementById("essayText");
  ta.oninput=()=>document.getElementById("essayWords").textContent=wordCount(ta.value)+" kelime";
  renderEssayList();
}

// ===== Okuma (Reading) =====
function todayStr(){ return new Date().toISOString().slice(0,10); }
function renderReading(){
  const c=document.getElementById("readingContainer"); c.innerHTML="";
  const items=window.READING.filter(r=>r.level===state.level);
  const doneN=items.filter(r=>state.reading[r.id]).length;
  document.getElementById("readingProgress").textContent=`${state.level}: ${items.length} metin · ${doneN} okundu`;
  if(!items.length){ c.innerHTML='<p class="hint">Bu seviyede metin yok.</p>'; return; }
  items.forEach(r=>{
    const lastDate=state.reading[r.id];
    const doneToday = lastDate===todayStr();
    const el=document.createElement("div"); el.className="week-block";
    el.innerHTML=`
      <div class="week-head">
        <div><h3>${r.title} <span class="lvl-tag">${r.level}</span></h3>
          <span class="wk-focus">${r.topic} · ~${r.words} kelime${lastDate?` · son: ${lastDate}`:""}</span></div>
        <span class="week-pct">${lastDate?"✓":""}</span>
      </div>
      <div class="week-body">
        <div class="read-text">${r.text.split("\n\n").map(p=>`<p>${p}</p>`).join("")}</div>
        <h4 class="qh">Sorular</h4>
        <ol class="read-q">${r.questions.map(q=>`<li>${q.q}</li>`).join("")}</ol>
        <details class="answers"><summary>Cevap anahtarını göster</summary>
          <ol class="read-a">${r.questions.map(q=>`<li>${q.a}</li>`).join("")}</ol></details>
        <div class="prompt-box"><code>IELTS examiner gibi davran. Şu metnin sorularına verdiğim cevapları kontrol et ve eksiklerimi açıkla. Metin: "${r.title}". Cevaplarım: ...</code>
          <button class="copy" data-copy="IELTS examiner gibi davran. ${r.title} metninin sorularina verdigim cevaplari kontrol et ve eksiklerimi acikla. Cevaplarim: ...">Kopyala</button></div>
        <button class="btn good mark-read" data-id="${r.id}" ${doneToday?"disabled":""}>${doneToday?"Bugün okundu ✓":"Bugün okudum ✓"}</button>
      </div>`;
    el.querySelector(".week-head").onclick=()=>el.classList.toggle("open");
    c.appendChild(el);
  });
  c.querySelectorAll(".mark-read").forEach(b=>b.onclick=()=>{
    state.reading[b.dataset.id]=todayStr(); bumpStreak(state.streak); save();
    renderReading(); renderDashboard();
  });
  bindCopy();
}

// ===== Dinleme (Listening) =====
function renderListening(){
  const c=document.getElementById("listeningContainer"); c.innerHTML="";
  const items=window.LISTENING.filter(l=>l.level===state.level);
  const doneN=items.filter(l=>state.listening[l.id]).length;
  document.getElementById("listeningProgress").textContent=`${state.level}: ${items.length} görev · ${doneN} yapıldı`;
  if(!items.length){ c.innerHTML='<p class="hint">Bu seviyede görev yok.</p>'; return; }
  const steps=(title,arr)=>`<b>${title}</b><ul class="steps">${arr.map(s=>`<li>${s}</li>`).join("")}</ul>`;
  items.forEach(l=>{
    const lastDate=state.listening[l.id];
    const doneToday=lastDate===todayStr();
    const el=document.createElement("div"); el.className="week-block";
    el.innerHTML=`
      <div class="week-head">
        <div><h3>${l.title} <span class="lvl-tag">${l.level}</span></h3>
          <span class="wk-focus">${l.topic} · ~${l.mins} dk · ${l.source}${lastDate?` · son: ${lastDate}`:""}</span></div>
        <span class="week-pct">${lastDate?"✓":""}</span>
      </div>
      <div class="week-body">
        <a class="res-item" href="${l.url}" target="_blank" rel="noopener"><b>🔗 Kaynağı aç</b><p>${l.source}</p></a>
        ${steps("1) Dinlemeden önce", l.before)}
        ${steps("2) Dinlerken", l.during)}
        ${steps("3) Dinledikten sonra", l.after)}
        <button class="btn good mark-listen" data-id="${l.id}" ${doneToday?"disabled":""}>${doneToday?"Bugün dinlendi ✓":"Bugün dinledim ✓"}</button>
      </div>`;
    el.querySelector(".week-head").onclick=()=>el.classList.toggle("open");
    c.appendChild(el);
  });
  c.querySelectorAll(".mark-listen").forEach(b=>b.onclick=()=>{
    state.listening[b.dataset.id]=todayStr(); bumpStreak(state.streak); save();
    renderListening(); renderDashboard();
  });
}

// ===== Resources =====
function renderResources(){
  const c=document.getElementById("resourceContainer"); c.innerHTML="";
  window.RESOURCES.forEach(g=>{
    const blk=document.createElement("div"); blk.className="card res-group";
    blk.innerHTML=`<h3>${g.group}</h3>`+g.items.map(it=>`
      <a class="res-item" href="${it.url}" target="_blank" rel="noopener">
        <b>${it.name}</b><p>${it.desc}</p></a>`).join("");
    c.appendChild(blk);
  });
}

// ===== Kopyala butonları =====
function bindCopy(){
  document.querySelectorAll(".copy:not(.bound)").forEach(b=>{
    b.classList.add("bound");
    if(b.classList.contains("del-essay")) return;
    b.onclick=()=>{
      if(b.dataset.copy===undefined) return;
      navigator.clipboard.writeText(b.dataset.copy);
      const o=b.textContent; b.textContent="Kopyalandı ✓"; setTimeout(()=>b.textContent=o,1200);
    };
  });
}

// ===== Senkron arayüzü =====
function initSyncUI(){
  const inp=document.getElementById("syncCodeInput");
  document.getElementById("syncSave").onclick=()=>{ setSyncCode(inp.value); };
  document.getElementById("syncGen").onclick=()=>{
    const code = (state.level+"-"+Math.random().toString(36).slice(2,8)+Math.random().toString(36).slice(2,6)).toLowerCase();
    inp.value=code; setSyncCode(code);
  };
  updateSyncUI();
}

// ===== Sınav tarihi =====
function initExamDate(){
  const inp=document.getElementById("examInput");
  if(state.examDate) inp.value=state.examDate;
  inp.onchange=()=>{ state.examDate=inp.value||null; save(); renderCountdown(); };
}

// ===== Reset =====
document.getElementById("resetBtn").onclick=()=>{
  if(confirm("Bu cihazdaki yerel ilerleme silinecek. (Senkron koduyla buluttan geri gelir.) Emin misin?")){
    localStorage.removeItem(KEY); location.reload();
  }
};

// ===== Render hepsi =====
function renderAll(){
  renderCountdown(); renderDashboard(); renderLevel(); renderGrammar();
  renderReading(); renderListening(); renderResources(); renderEssayList(); updateSyncUI();
}

// ===== Başlat =====
initLevelPicker(); initVocab(); initEssay(); initSyncUI(); initExamDate();
renderAll(); bindCopy(); initFirebase();

// PWA service worker
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").catch(()=>{});
}
