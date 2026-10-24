(()=>{
 const menu=document.getElementById('main-navigation'),toggle=document.getElementById('nav-toggle');
 function closeMenu(focus=false){menu?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');toggle?.setAttribute('aria-label','Open main navigation');if(focus)toggle?.focus();}
 toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close main navigation':'Open main navigation');});
 menu?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true')closeMenu(true);});
 matchMedia('(min-width:641px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
 const theme=document.getElementById('theme-toggle');
 function syncTheme(){const dark=document.documentElement.dataset.theme==='dark';theme?.setAttribute('aria-pressed',String(dark));theme?.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');}
 syncTheme();theme?.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;try{localStorage.setItem('daniel-theme',next);}catch{}syncTheme();});
 const copy=document.getElementById('copybtn');copy?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(copy.dataset.mail);copy.textContent='Copied';}catch{copy.textContent='Use email link';}setTimeout(()=>copy.textContent='Copy',1800);});
})();
