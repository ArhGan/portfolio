/* Article Detail Page Logic */

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

document.addEventListener('click', (e) => {
  const isInsideNav = e.target.closest('.nav-item.has-panel');
  const isMobileMenuBtn = e.target.closest('#mobileMenuBtn');
  if (!isInsideNav && !isMobileMenuBtn) {
    closeAllFlyouts();
  }
});

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

// --- Article Data ---
const articles = {
  1: {
    title: '品牌出海：老碗会香港首店的视觉策略',
    cat: 'BRAND',
    catName: 'Brand',
    date: '2025.09.01',
    reading: '6 min read',
    tags: ['品牌出海', '香港市场', '双语设计', '视觉策略'],
    heroImg: 'assets/placeholder-1.svg',
    heroCaption: '老碗会香港首店品牌视觉物料',
    body: [
      { type: 'p', text: '香港，作为许多品牌的出海第一站。我与老碗会的海外之旅从这里作为起点，从项目立项到新店开业，这是一个全新的挑战。作为国际化的大城市，香港有太多内容与大陆不同——全新的内容设计，全新的文化表达，全新的品牌传播。' },
      { type: 'h2', text: '传承品牌基因' },
      { type: 'p', text: '保留老碗会"西北风味+烟火气"的核心视觉元素，延续标志性色彩与图形符号，强化品牌辨识度。在异国他乡，品牌基因是消费者认知的锚点，也是品牌信任感的基础。' },
      { type: 'h2', text: '适配本地市场' },
      { type: 'p', text: '兼顾香港中西融合的文化特点，采用双语（中文+英文）设计体系。调整视觉节奏以适配香港门店空间布局与传播场景。香港消费者对视觉信息密度和排版层级有自己的偏好，需要在保留品牌调性的同时做本地化适配。' },
      { type: 'figure', img: 'assets/placeholder-2.svg', caption: '双语设计体系示意：中英文并置排版' },
      { type: 'h3', text: '具体物料清单' },
      { type: 'ul', items: ['宣传单页：双语排版，突出品牌故事与开业信息', '外立面围挡：大面积品牌视觉，吸引行人注意', '桌面产品贴：细节物料，增强用餐体验', '户外异形立牌：异形切割，增强视觉记忆点', '扫码点单桌贴：功能性物料，兼顾美观与实用', '菜单设计：品牌故事菜单与时间限定类套餐菜单'] },
      { type: 'h2', text: '保障合规落地' },
      { type: 'p', text: '所有物料均符合香港广告法、食品安全标识规范及门店运营相关规定，避免落地风险。跨境项目中，合规性是最容易被忽视但最致命的环节。' },
      { type: 'h2', text: '总结' },
      { type: 'p', text: '品牌出海不是简单的翻译和复制，而是一次从视觉到文化的全面重构。老碗会香港首店的视觉策略，是在传承与适配之间寻找平衡的过程。' },
      { type: 'quote', text: '品牌出海的本质，不是把品牌带到新的地方，而是让品牌在新的地方生长。' }
    ]
  },
  2: {
    title: '从0到1：构建餐饮品牌视觉体系',
    cat: 'DESIGN',
    catName: 'Design',
    date: '2025.06.15',
    reading: '8 min read',
    tags: ['品牌视觉', 'VI系统', '餐饮品牌', '设计流程'],
    heroImg: 'assets/placeholder-2.svg',
    heroCaption: '品牌视觉体系构建流程图',
    body: [
      { type: 'p', text: '5年视觉设计师经验沉淀，3年品牌设计经验。我主导过全案品牌设计，VI、VIS、商业插画、产品拍摄、大型会展设计等多项类型涉及项目，能独立完成设计项目落地。这篇文章分享我从0到1构建品牌视觉体系的方法论。' },
      { type: 'h2', text: '什么是全案品牌设计' },
      { type: 'p', text: '全案品牌设计是从品牌定位出发，构建一整套视觉识别系统（VIS），涵盖标志、色彩、字体、辅助图形、应用物料等所有视觉露出环节。它不是单点设计，而是系统性的视觉工程。' },
      { type: 'h3', text: '核心模块' },
      { type: 'ul', items: ['品牌标志设计（Logo）', '色彩体系（主色、辅助色、色彩规范）', '字体系统（中英文规范）', '辅助图形开发', '应用物料设计（名片、信封、包装等）', '空间视觉导示系统'] },
      { type: 'h2', text: '构建流程' },
      { type: 'p', text: '我的流程分为四个阶段：调研分析、概念发想、系统构建、落地执行。每个阶段都有明确的交付物和评审节点。' },
      { type: 'figure', img: 'assets/placeholder-3.svg', caption: '品牌视觉体系四阶段流程' },
      { type: 'h2', text: '对设计趋势的敏感度' },
      { type: 'p', text: '擅长从0到1构建品牌视觉，并跟进上线制作，对设计趋势敏感，具备独特的创意视角、设计风格、配色技巧。趋势敏感不是追逐潮流，而是在趋势中找到适合品牌的表达方式。' },
      { type: 'h2', text: '团队协作与新人培养' },
      { type: 'p', text: '具有较强的沟通能力，擅长团队合作，有新人指导经验，带领实习生，责任感强，乐于分享。好的品牌设计从来不是一个人的事，而是团队协作的结果。' },
      { type: 'quote', text: '品牌视觉不是装饰，而是品牌战略的视觉化表达。' }
    ]
  },
  3: {
    title: '湘味烟火气：扑湘品牌的设计语言',
    cat: 'BRAND',
    catName: 'Brand',
    date: '2025.03.20',
    reading: '5 min read',
    tags: ['扑湘', '湖南风味', '色彩体系', '辅助图形'],
    heroImg: 'assets/placeholder-3.svg',
    heroCaption: '扑湘品牌色彩体系与辅助图形',
    body: [
      { type: 'p', text: '扑湘，"扑"体现直奔而来的热情渴望与动作感，"湘"指代湖南核心风味。整体传递直奔地道湖南风味的活力和爽快感，兼具生活气息与现代感。' },
      { type: 'h2', text: '品牌定位' },
      { type: 'p', text: '以鲜活湖南乡野菜为载体，讲好地道湖南风味故事，营造热闹亲切、活力四射的用餐氛围，坚持食材新鲜地道，还原湘味本真。' },
      { type: 'h2', text: '色彩体系：取自湖南乡野' },
      { type: 'p', text: '色彩取自湖南乡野的自然色彩：青山绿野（Green Mountains and Fields）、湘辣红（Xiang La Hong）、大地灰（Earthash）。每个色彩都有对应的 Pantone 色号和 CMYK/RGB 值，确保跨媒介一致性。' },
      { type: 'figure', img: 'assets/placeholder-4.svg', caption: '色彩体系：青山绿野、湘辣红、大地灰' },
      { type: 'h3', text: '色彩规范' },
      { type: 'ul', items: ['青山绿野 PANTONE 19-5918 TCX — R:46 G:57 B:41', '大地灰 PANTONE P42-8C — R:118 G:45 B:28', '辅助色：湘辣红 — 用于点缀与强调'] },
      { type: 'h2', text: '辅助图形：乡土元素的几何化' },
      { type: 'p', text: '辅助图形源自湖南乡土元素——木纹、叶纹、叶枝——的现代几何化演绎。将自然纹理抽象为几何图形，既保留了乡土的温度，又具备了现代设计的秩序感。' },
      { type: 'figure', img: 'assets/placeholder-5.svg', caption: '辅助图形：木纹与叶纹的几何化演绎' },
      { type: 'h2', text: '物料延展' },
      { type: 'p', text: '从杯垫、名片到餐巾纸盒、打包盒、手提袋、发票、胶带，全套物料均延续品牌视觉语言，让品牌体验贯穿消费者接触的每一个触点。' },
      { type: 'quote', text: '烟火气不是粗粝，是对生活温度的视觉化表达。' }
    ]
  },
  4: {
    title: '非遗技艺的现代化视觉表达',
    cat: 'DESIGN',
    catName: 'Design',
    date: '2024.12.10',
    reading: '6 min read',
    tags: ['非遗技艺', '品牌传播', '文化视觉', '面食'],
    heroImg: 'assets/placeholder-4.svg',
    heroCaption: '老碗会非遗技艺面食视觉设计',
    body: [
      { type: 'p', text: '老碗会非遗技艺面食视觉设计。以"吃面就吃老碗会"为核心传播口号，将传统非遗面食技艺通过现代视觉语言重新演绎。' },
      { type: 'h2', text: '非遗技艺与品牌传播' },
      { type: 'p', text: '非遗技艺是品牌文化厚度的重要载体。通过对非遗技艺的视觉化呈现，增强品牌文化底蕴，提升消费者对品牌"传承与创新"的认知。' },
      { type: 'h2', text: '设计思路' },
      { type: 'p', text: '设计融合传统面食制作工艺的图形元素与老碗会品牌标识，打造既有文化底蕴又具现代传播力的视觉系统。"吃面就吃老碗会"这一口号将非遗技艺与品牌记忆深度绑定。' },
      { type: 'figure', img: 'assets/placeholder-6.svg', caption: '非遗技艺面食系列视觉物料' },
      { type: 'h3', text: '视觉要点' },
      { type: 'ul', items: ['传统工艺图形元素的提取与再设计', '品牌标识与非遗元素的融合', '现代排版与传统文化内容的平衡', '系列海报的视觉节奏控制'] },
      { type: 'h2', text: '现代演绎的边界' },
      { type: 'p', text: '现代化不等于简单化。非遗技艺的视觉表达需要在尊重传统的基础上进行创新，保留技艺的灵魂，用现代设计语言赋予它新的生命力。过度简化会丢失文化的温度，过度传统则失去传播力。' },
      { type: 'h2', text: '总结' },
      { type: 'p', text: '非遗技艺的现代化视觉表达，是品牌设计师在文化传承与商业传播之间寻找平衡的实践。好的设计让传统文化"活"在当下，而不是陈列在博物馆里。' },
      { type: 'quote', text: '最好的传承，不是原样保留，而是让传统在新时代继续生长。' }
    ]
  }
};

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function renderArticleBody(article) {
  const container = document.getElementById('articleContent');
  if (!container) return '';

  return article.body.map((block) => {
    switch (block.type) {
      case 'p':
        return `<p>${block.text}</p>`;
      case 'h2':
        return `<h2>${block.text}</h2>`;
      case 'h3':
        return `<h3>${block.text}</h3>`;
      case 'figure':
        return `<figure class="article-figure"><img src="${block.img}" alt="${block.caption}" /><figcaption>${block.caption}</figcaption></figure>`;
      case 'quote':
        return `<blockquote>${block.text}</blockquote>`;
      case 'ul':
        return `<ul>${block.items.map(i => `<li>${i}</li>`).join('')}</ul>`;
      case 'ol':
        return `<ol>${block.items.map(i => `<li>${i}</li>`).join('')}</ol>`;
      case 'code':
        return `<pre class="code-block"><code>${block.text}</code></pre>`;
      default:
        return '';
    }
  }).join('');
}

function renderArticle() {
  const id = getParam('id') || '1';
  const a = articles[id] || articles[1];
  const nextId = (parseInt(id) % 4) + 1;
  const nextA = articles[nextId];

  document.title = `${a.title} — Zephyr Arh`;

  // Breadcrumb
  document.getElementById('crumbTitle').textContent = a.title;

  // Header
  document.getElementById('articleCat').textContent = a.cat;
  document.getElementById('articleTitle').textContent = a.title;
  document.getElementById('articleDate').textContent = a.date;
  document.getElementById('articleReading').textContent = a.reading;

  // Hero image
  document.getElementById('articleHeroImg').src = a.heroImg;
  document.getElementById('articleHeroImg').alt = a.title;
  document.getElementById('articleHeroCaption').textContent = a.heroCaption;

  // Body content
  document.getElementById('articleContent').innerHTML = renderArticleBody(a);

  // Sidebar info
  document.getElementById('infoCat').textContent = a.catName;
  document.getElementById('infoDate').textContent = a.date;
  document.getElementById('infoReading').textContent = a.reading;
  document.getElementById('infoTags').innerHTML = a.tags.map(t => `<span>${t}</span>`).join('');
  document.getElementById('articleYear').textContent = a.date.substring(0, 4);

  // Next article
  document.getElementById('nextLink').href = `article-detail.html?id=${nextId}`;
  document.getElementById('nextTitle').textContent = `${nextA.title} →`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderArticle();

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const portfolioNavItem = document.querySelector('.nav-item.has-panel[data-nav="articles"]');
      if (portfolioNavItem) {
        const wasOpen = portfolioNavItem.classList.contains('open');
        if (wasOpen) {
          closeAllFlyouts();
        } else {
          openFlyout(portfolioNavItem);
        }
      }
    });
  }

  document.querySelectorAll('.mb-item').forEach((item) => {
    item.addEventListener('click', () => {
      closeAllFlyouts();
    });
  });

  // Share link handling
  document.querySelectorAll('.share-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const type = link.dataset.share;
      const url = window.location.href;
      const title = document.getElementById('articleTitle').textContent;

      if (type === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
      } else if (type === 'linkedin') {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      } else if (type === 'copy') {
        navigator.clipboard.writeText(url).then(() => {
          link.textContent = 'Copied!';
          setTimeout(() => { link.textContent = 'Copy Link'; }, 2000);
        });
      }
    });
  });
});
