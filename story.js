(() => {
  const viewer = document.querySelector('.image-viewer');
  if (viewer) {
    const image = viewer.querySelector('img');
    const caption = viewer.querySelector('figcaption');
    const original = viewer.querySelector('.viewer-original');
    let opener;

    document.querySelectorAll('a[data-image]').forEach((link) => {
      link.addEventListener('click', (event) => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !viewer.showModal) return;
        event.preventDefault();
        opener = link;
        const thumbnail = link.querySelector('img');
        image.src = link.href;
        image.alt = thumbnail?.alt || 'Project image';
        caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
        original.href = link.href;
        viewer.showModal();
        viewer.querySelector('.viewer-close').focus();
      });
    });

    viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
    viewer.addEventListener('click', (event) => {
      if (event.target !== viewer) return;
      const bounds = viewer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
    });
    viewer.addEventListener('close', () => {
      if (opener?.isConnected) opener.focus({ preventScroll: true });
      image.removeAttribute('src');
    });
  }

  const copy = document.getElementById('copy-email');
  if (copy) {
    const idleLabel = copy.textContent;
    let resetTimer;
    copy.addEventListener('click', async () => {
      clearTimeout(resetTimer);
      try {
        await navigator.clipboard.writeText(copy.dataset.email);
        copy.textContent = 'Email copied';
      } catch {
        copy.textContent = 'Use the email link';
      }
      resetTimer = setTimeout(() => { copy.textContent = idleLabel; }, 2400);
    });
  }
})();
