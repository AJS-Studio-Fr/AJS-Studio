(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-nav');
  const closeMenu = () => {
    menu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
  };
  menuToggle.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    menuToggle.setAttribute('aria-expanded', String(opening));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });
  const desktop = window.matchMedia('(min-width:761px)');
  desktop.addEventListener('change', event => {
    if (event.matches) closeMenu();
  });

  const gameImage = document.getElementById('game-image');
  const imageDialog = document.getElementById('image-dialog');
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  if (gameImage) {
    const assetRoot = new URL('.', gameImage.src);
    const views = [
      {file: 'blackball-game-v2.png', width: 1774, height: 888},
      {file: 'game-portrait.webp', width: 824, height: 1832},
      {file: 'timer.webp', width: 786, height: 1746}
    ];
    const english = document.documentElement.lang === 'en';
    const spanish = document.documentElement.lang === 'es';
    const descriptions = spanish ? ['Mesa de Blackball by AJS Studio en horizontal', 'Vista de puntería de Blackball by AJS Studio', 'Cronómetro de Blackball by AJS Studio'] : english
      ? ['Blackball by AJS Studio landscape table', 'Blackball by AJS Studio aiming view', 'Blackball by AJS Studio shot clock']
      : ['Table de Blackball by AJS Studio en paysage', 'Vue de la visée dans Blackball by AJS Studio', 'Chronomètre de Blackball by AJS Studio'];
    function selectTab(index, focus) {
      tabs.forEach((tab, position) => {
        const active = index === position;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
      });
      const view = views[index];
      gameImage.src = new URL(view.file, assetRoot).href;
      gameImage.width = view.width;
      gameImage.height = view.height;
      gameImage.alt = descriptions[index];
      if (focus) tabs[index].focus();
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(index, false));
      tab.addEventListener('keydown', event => {
        let target;
        if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
        if (event.key === 'Home') target = 0;
        if (event.key === 'End') target = tabs.length - 1;
        if (target !== undefined) {
          event.preventDefault();
          selectTab(target, true);
        }
      });
    });
    document.querySelectorAll('[data-image-open]').forEach(button => {
      button.addEventListener('click', () => {
        const expanded = document.getElementById('expanded-image');
        expanded.src = gameImage.src;
        expanded.alt = gameImage.alt;
        imageDialog.showModal();
      });
    });
  }
  document.querySelectorAll('[data-capture]').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = document.getElementById('expanded-image');
      expanded.src = button.dataset.capture;
      expanded.alt = button.querySelector('img').alt;
      imageDialog.showModal();
    });
  });
  const projectDialog = document.getElementById('project-dialog');
  const projectData = document.getElementById('project-data');
  if (projectDialog && projectData) {
    const projects = JSON.parse(projectData.textContent);
    document.querySelectorAll('[data-project]').forEach(button => {
      button.addEventListener('click', () => {
        const project = projects[Number(button.dataset.project)];
        projectDialog.className = 'project-dialog ' + project.key;
        document.getElementById('project-name').textContent = project.name;
        document.getElementById('project-description').textContent = project.description;
        const capture = document.querySelector('.project-card.' + project.key + ' img');
        const projectImage = document.getElementById('project-image');
        projectImage.src = capture.src;
        projectImage.alt = capture.alt;
        projectDialog.showModal();
      });
    });
  }
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const bounds = dialog.getBoundingClientRect();
      const outside = event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (outside) dialog.close();
    });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
    const observer = new MutationObserver(() => {
      if (dialog.open) document.body.style.overflow = 'hidden';
    });
    observer.observe(dialog, {attributes: true, attributeFilter: ['open']});
  });
})();
