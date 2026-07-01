function rtSave(key, summary){
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  list.push({ time: new Date().toLocaleString('zh-TW'), summary });
  localStorage.setItem(key, JSON.stringify(list));
  return list;
}
function rtLoad(key){
  try{ return JSON.parse(localStorage.getItem(key) || '[]'); }catch(e){ return []; }
}
function rtClear(key){ localStorage.removeItem(key); }
function rtCopy(text, noteEl){
  navigator.clipboard.writeText(text).then(()=>{
    noteEl.textContent = '已複製到剪貼簿，可直接貼到醫囑/病歷系統 ✓';
    setTimeout(()=>{ noteEl.textContent=''; }, 2800);
  }).catch(()=>{ alert(text); });
}
function rtFlash(noteEl, msg){
  noteEl.textContent = msg;
  setTimeout(()=>{ noteEl.textContent=''; }, 2500);
}
function rtRenderHistory(key, containerEl){
  const list = rtLoad(key);
  if(list.length === 0){ containerEl.parentElement.style.display='none'; return; }
  containerEl.parentElement.style.display='block';
  containerEl.innerHTML = list.slice().reverse().map(rec=>`
    <div style="padding:9px 0;border-bottom:1px dashed var(--line);font-size:12px;color:var(--sub);">
      <div style="font-weight:600;color:var(--ink);margin-bottom:3px;">${rec.time}</div>
      <pre style="white-space:pre-wrap;font-family:inherit;margin:0;">${rec.summary}</pre>
    </div>`).join('');
}
