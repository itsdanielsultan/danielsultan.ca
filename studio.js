(()=>{
  const panels=[...document.querySelectorAll('.project-panel')];
  const tabs=[...document.querySelectorAll('[data-project]')];
  const title=document.getElementById('canvas-title');
  const intro=document.getElementById('canvas-intro');
  const action=document.querySelector('.canvas-action');
  if(panels.length&&tabs.length){
    const keys=tabs.map(t=>t.dataset.project);
    const keyFromHash=()=>location.hash.replace('#project-','');
    const tablist=tabs[0].closest('[role=tablist]');
    const narrow=matchMedia('(max-width: 960px)');
    const updateOrientation=()=>tablist?.setAttribute('aria-orientation',narrow.matches?'horizontal':'vertical');
    updateOrientation();
    narrow.addEventListener('change',updateOrientation);
    const scrollToHeading=()=>document.getElementById('main').scrollIntoView({behavior:'instant'});
    const restoreSelection=()=>{
      select(keyFromHash(),{focus:tabs.includes(document.activeElement)});
      if(keys.includes(keyFromHash()))requestAnimationFrame(scrollToHeading);
    };
    function select(key,{navigate=false,focus=false}={}){
      if(!keys.includes(key))key='city';
      const current=document.getElementById('project-'+key);
      panels.forEach(p=>p.hidden=p!==current);
      tabs.forEach(t=>{const selected=t.dataset.project===key;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;if(selected&&focus)t.focus();});
      title.textContent=current.dataset.title;
      intro.textContent=current.dataset.intro;
      action.href=current.dataset.url;
      action.firstChild.textContent=current.dataset.action;
      if(navigate&&location.hash!=='#project-'+key)history.pushState(null,'','#project-'+key);
    }
    tabs.forEach((tab,index)=>{
      tab.addEventListener('click',e=>{e.preventDefault();select(tab.dataset.project,{navigate:true});document.getElementById('main').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
      tab.addEventListener('keydown',e=>{let next=index;if(['ArrowDown','ArrowRight'].includes(e.key))next=(index+1)%tabs.length;else if(['ArrowUp','ArrowLeft'].includes(e.key))next=(index+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;else return;e.preventDefault();select(keys[next],{navigate:true,focus:true});});
    });
    addEventListener('popstate',restoreSelection);
    addEventListener('hashchange',restoreSelection);
    select(keyFromHash());
    // Native fragment scrolling targets the panel below the shared heading.
    // Keep that heading visible when arriving from another page or reloading.
    if(keys.includes(keyFromHash())){
      if(document.readyState==='complete')requestAnimationFrame(scrollToHeading);
      else addEventListener('load',()=>requestAnimationFrame(scrollToHeading),{once:true});
    }
    document.querySelectorAll('.more-explore a[href*="#project-"]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();select(link.hash.replace('#project-',''),{navigate:true});document.getElementById('main').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
  }
  const viewer=document.querySelector('.image-viewer');
  if(viewer){
    const image=viewer.querySelector('img'),caption=viewer.querySelector('figcaption'),original=viewer.querySelector('.viewer-original');
    let opener;
    document.querySelectorAll('a[data-image]').forEach(link=>link.addEventListener('click',e=>{
      if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||!viewer.showModal)return;
      e.preventDefault();opener=link;const thumb=link.querySelector('img');image.src=link.href;image.alt=thumb?.alt||'Project image';caption.textContent=link.closest('figure')?.querySelector('figcaption')?.textContent||thumb?.alt||'';original.href=link.href;viewer.showModal();viewer.querySelector('.viewer-close').focus();
    }));
    viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());
    viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close();}});
    viewer.addEventListener('close',()=>{opener?.focus();image.removeAttribute('src');});
  }
  const copy=document.getElementById('copy-email');
  copy?.addEventListener('click',async()=>{const label=copy.textContent;try{await navigator.clipboard.writeText(copy.dataset.email);copy.textContent=copy.dataset.copiedLabel||'Email copied';}catch{copy.textContent='Use the email link';}setTimeout(()=>copy.textContent=label,2200);});
})();
