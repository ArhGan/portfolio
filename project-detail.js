/* Project Detail Page Logic */

// --- Flyout Panel: Click to toggle ---
const navItems = document.querySelectorAll('.nav-item.has-panel');
const navIcons = document.querySelectorAll('.nav-icon');
const flyoutOverlay = document.getElementById('flyoutOverlay');

const closeAllFlyouts = () => {
  navItems.forEach((n) => n.classList.remove('open'));
  if (flyoutOverlay) flyoutOverlay.classList.remove('visible');
};

const openFlyout = (item) => {
  navItems.forEach((n) => n.classList.remove('open'));
  item.classList.add('open');
  if (flyoutOverlay) flyoutOverlay.classList.add('visible');
};

navItems.forEach((item) => {
  const icon = item.querySelector('.nav-icon');
  icon.addEventListener('click', (e) => {
    const href = icon.getAttribute('href');
    const isAnchor = href && href.startsWith('#');

    if (isAnchor) {
      e.preventDefault();
    }

    const wasOpen = item.classList.contains('open');
    if (wasOpen) {
      closeAllFlyouts();
    } else {
      openFlyout(item);
    }
  });
});

// --- Close flyouts when clicking outside ---
document.addEventListener('click', (e) => {
  const isInsideNav = e.target.closest('.nav-item.has-panel');
  const isMobileMenuBtn = e.target.closest('#mobileMenuBtn');
  if (!isInsideNav && !isMobileMenuBtn) {
    closeAllFlyouts();
  }
});

// --- Category filter in flyout ---
const catItems = document.querySelectorAll('.cat-item');
const catGroups = document.querySelectorAll('.cat-group');

catItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const group = item.closest('.cat-group');
    const hasChildren = group && group.querySelector('.cat-children');

    catItems.forEach((c) => c.classList.remove('active'));
    item.classList.add('active');

    if (hasChildren) {
      catGroups.forEach((g) => {
        if (g !== group) g.classList.remove('expanded');
      });
      group.classList.toggle('expanded');
    } else {
      catGroups.forEach((g) => g.classList.remove('expanded'));
    }
  });
});

// --- Smooth scroll for flyout links ---
document.querySelectorAll('.flyout-panel a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      closeAllFlyouts();
    }
  });
});

const projects = {
  1: { title: 'Project Title 01', cat: 'Motion', catLabel: 'MOTION', role: 'Designer, Developer', awards: 'None', desc: 'This is a sample project description. Replace this text with your own project details. Describe the concept, process, and outcome of your work.', tags: 'Brand, Motion', note: 'Replace this with your own project notes.', date: '2024', thumb: 'assets/placeholder-1.svg' },
  2: { title: 'Project Title 02', cat: 'UI/UX', catLabel: 'UI/UX', role: 'UI Designer', awards: 'None', desc: 'This is a sample project description. Replace this text with your own project details.', tags: 'UI, UX', note: 'Replace this with your own project notes.', date: '2024', thumb: 'assets/placeholder-2.svg' },
  3: { title: 'Project Title 03', cat: 'Graphic', catLabel: 'GRAPHIC', role: 'Graphic Designer', awards: 'None', desc: 'This is a sample project description. Replace this text with your own project details.', tags: 'Print, Brand', note: 'Replace this with your own project notes.', date: '2023', thumb: 'assets/placeholder-3.svg' },
  4: { title: 'Project Title 04', cat: 'Photo', catLabel: 'PHOTO', role: 'Photographer', awards: 'None', desc: 'This is a sample project description. Replace this text with your own project details.', tags: 'Photo, Series', note: 'Replace this with your own project notes.', date: '2023', thumb: 'assets/placeholder-4.svg' },
  5: { title: 'Project Title 05', cat: 'Dev', catLabel: 'DEV', role: 'Developer', awards: 'None', desc: 'This is a sample project description. Replace this text with your own project details.', tags: 'Code, Open Source', note: 'Replace this with your own project notes.', date: '2024', thumb: 'assets/placeholder-5.svg' },
  6: { title: 'Project Title 06', cat: 'Motion', catLabel: 'MOTION', role: 'Motion Designer', awards: 'None', desc: 'This is a sample project description. Replace this text with your own project details.', tags: 'Motion, Experiment', note: 'Replace this with your own project notes.', date: '2022', thumb: 'assets/placeholder-6.svg' }
};

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function renderProject() {
  const id = getParam('id') || '1';
  const p = projects[id] || projects[1];
  const nextId = (parseInt(id) % 6) + 1;
  const nextP = projects[nextId];

  document.title = `${p.title} — Zephyr Arh`;

  document.getElementById('crumbCat').textContent = p.cat;
  document.getElementById('crumbTitle').textContent = p.title;
  document.getElementById('detailCat').textContent = p.catLabel;
  document.getElementById('detailTitle').textContent = p.title;
  document.getElementById('detailDesc').textContent = p.desc;
  document.getElementById('detailRole').textContent = p.role;
  document.getElementById('detailAwards').textContent = p.awards;
  document.getElementById('infoCat').textContent = p.cat;
  document.getElementById('infoRole').textContent = p.role;
  document.getElementById('infoTags').textContent = p.tags;
  document.getElementById('infoNote').textContent = p.note;
  document.getElementById('detailDate').textContent = p.date;
  document.getElementById('detailThumb').src = p.thumb;
  document.getElementById('nextLink').href = `project-detail.html?id=${nextId}`;
  document.getElementById('nextTitle').textContent = `${nextP.title} →`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProject();

  // --- Mobile: Menu button toggles portfolio panel ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const portfolioNavItem = document.querySelector('.nav-item.has-panel[data-nav="portfolio"]');

  if (mobileMenuBtn && portfolioNavItem) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const wasOpen = portfolioNavItem.classList.contains('open');
      if (wasOpen) {
        closeAllFlyouts();
      } else {
        openFlyout(portfolioNavItem);
      }
    });
  }

  // --- Mobile: Bottom nav items close flyouts on click ---
  const mbItems = document.querySelectorAll('.mb-item');
  mbItems.forEach((item) => {
    item.addEventListener('click', () => {
      closeAllFlyouts();
    });
  });
});
