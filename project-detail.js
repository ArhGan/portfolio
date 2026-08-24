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
  1: {
    title: '老碗会香港首店品牌视觉',
    cat: 'Brand Vision',
    catLabel: 'BRAND VISION',
    role: '品牌设计师',
    awards: '2025',
    desc: '香港，作为许多品牌的出海第一站。我与老碗会的海外之旅从这里作为起点，从项目立项到新店开业，这是一个全新的挑战。传承品牌基因：保留老碗会"西北风味+烟火气"的核心视觉元素，延续标志性色彩与图形符号，强化品牌辨识度。适配本地市场：兼顾香港中西融合的文化特点，采用双语（中文+英文）设计体系，调整视觉节奏以适配香港门店空间布局与传播场景。保障合规落地：所有物料均符合香港广告法、食品安全标识规范及门店运营相关规定。',
    tags: '品牌视觉, VI, 双语设计, 香港市场',
    note: '负责内容：宣传单页、外立面围挡、桌面产品贴、户外异形立牌、扫码点单桌贴、菜单设计（品牌故事菜单、时间限定类套餐菜单）。',
    date: '2025.09',
    thumb: 'assets/placeholder-1.svg'
  },
  2: {
    title: '扑湘品牌视觉设计',
    cat: 'Brand Vision',
    catLabel: 'BRAND VISION',
    role: '品牌设计师',
    awards: '2025',
    desc: '扑湘，"扑"体现直奔而来的热情渴望与动作感，"湘"指代湖南核心风味。整体传递直奔地道湖南风味的活力和爽快感，兼具生活气息与现代感。以鲜活湖南乡野菜为载体，讲好地道湖南风味故事，营造热闹亲切、活力四射的用餐氛围，坚持食材新鲜地道，还原湘味本真。色彩体系取自湖南乡野：青山绿野（Green Mountains and Fields）与湘辣红（Xiang La Hong）和大地灰（Earthash），辅助图形源自湖南乡土元素（木纹、叶纹、叶枝）的现代几何化演绎。',
    tags: '品牌视觉, VI, 色彩体系, 辅助图形, 湖南风味',
    note: '负责内容：品牌标志设计、色彩体系构建、辅助图形开发、杯垫、名片、餐巾纸盒、打包盒、手提袋、发票、胶带等全套物料。',
    date: '2025',
    thumb: 'assets/placeholder-2.svg'
  },
  3: {
    title: '广州天河花城汇南区店开业',
    cat: 'Posters',
    catLabel: 'POSTERS',
    role: '平面设计师',
    awards: '2025',
    desc: '老碗会广州天河花城汇南区店开业视觉设计。围绕"新店开业"主题，从主视觉到信息流海报，打造统一的视觉传播体系。主视觉以老碗会品牌色彩为基础，结合广州本地文化元素，传递开业的热闹氛围与品牌温度。信息流海报系列针对线上传播渠道（公众号、小红书、朋友圈等）优化视觉节奏与信息层级，确保在小屏幕上的可读性与吸引力。',
    tags: '海报设计, 开业主视觉, 信息流, 品牌传播',
    note: '负责内容：开业主视觉、线下海报系列、线上信息流海报、门店装饰物料。',
    date: '2025',
    thumb: 'assets/placeholder-3.svg'
  },
  4: {
    title: 'PALATABLE 展会活动视觉',
    cat: 'Exhibitions',
    catLabel: 'EXHIBITIONS',
    role: '平面设计师',
    awards: '2024',
    desc: 'PALATABLE 展会活动整体视觉设计。从展会主视觉概念出发，延展至空间导视、物料系统、互动体验等全链路视觉输出。主视觉以"可品味"为核心概念，将食物的感官体验转化为视觉语言。展会空间中的视觉引导系统兼顾功能性与美感，确保参观者在空间中获得清晰流畅的动线体验。',
    tags: '展会视觉, 空间导视, 活动物料, 互动体验',
    note: '负责内容：展会主视觉、空间导视系统、参展物料设计、互动区视觉。',
    date: '2024',
    thumb: 'assets/placeholder-4.svg'
  },
  5: {
    title: '品牌周边衍生品设计',
    cat: 'Merchandise',
    catLabel: 'MERCHANDISE',
    role: '平面设计师',
    awards: '2024',
    desc: '扑湘品牌周边衍生品设计。围绕品牌核心视觉资产，开发一系列兼具实用性与品牌传播力的周边产品。周边设计延续扑湘"湖南乡野"的视觉语言，将辅助图形（木纹、叶纹）应用于日常物品之上，让品牌体验从餐厅延伸到生活场景。每件周边产品都经过材质选型、工艺打样、成本控制的完整流程，确保品质与品牌调性一致。',
    tags: '周边设计, 衍生品, 品牌延展, 工艺打样',
    note: '负责内容：周边产品规划、视觉设计、材质选型、工艺打样跟进。',
    date: '2024',
    thumb: 'assets/placeholder-5.svg'
  },
  6: {
    title: '老碗会非遗技艺面食视觉',
    cat: 'Other Design',
    catLabel: 'OTHER DESIGN',
    role: '平面设计师',
    awards: '2023',
    desc: '老碗会非遗技艺面食视觉设计。以"吃面就吃老碗会"为核心传播口号，将传统非遗面食技艺通过现代视觉语言重新演绎。设计融合传统面食制作工艺的图形元素与老碗会品牌标识，打造既有文化底蕴又具现代传播力的视觉系统。通过对非遗技艺的视觉化呈现，增强品牌文化厚度，提升消费者对品牌"传承与创新"的认知。',
    tags: '非遗技艺, 品牌传播, 文化视觉, 现代演绎',
    note: '负责内容：传播主视觉、系列海报、品牌文化物料设计。',
    date: '2023',
    thumb: 'assets/placeholder-6.svg'
  }
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
