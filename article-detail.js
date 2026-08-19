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
    title: 'On the Craft of Motion Design in 2025',
    cat: 'DESIGN',
    catName: 'Design',
    date: '2025.06.12',
    reading: '5 min read',
    tags: ['Design', 'Motion', 'Craft'],
    heroImg: 'assets/placeholder-1.svg',
    heroCaption: 'Motion design study — frame by frame',
    body: [
      { type: 'p', text: 'Motion design has evolved dramatically over the past decade. What was once a niche skill reserved for broadcast and film has become a core competency across digital product design, branding, and interactive experiences.' },
      { type: 'p', text: 'In 2025, we see motion not as decoration but as a fundamental tool for communication. It guides attention, establishes hierarchy, creates emotional resonance, and most importantly — it tells stories.' },
      { type: 'h2', text: 'The Evolution of Motion' },
      { type: 'p', text: 'From the early days of Flash animation to today\'s sophisticated CSS animations and WebGL experiences, motion design has always been closely tied to technology. But the principles remain the same.' },
      { type: 'figure', img: 'assets/placeholder-2.svg', caption: 'Timeline of motion design evolution from 2010 to 2025' },
      { type: 'h3', text: 'Key Principles That Still Apply' },
      { type: 'ul', items: ['Timing and spacing — the foundation of all motion', 'Easing curves — natural movement feels better', 'Staging — one idea at a time', 'Anticipation — prepare the viewer for action'] },
      { type: 'h2', text: 'Modern Tools and Workflows' },
      { type: 'p', text: 'Today\'s motion designers have an incredible toolkit. After Effects remains the industry standard, while tools like Cavalry, Protopie, and Rive offer specialized capabilities for different use cases.' },
      { type: 'figure', img: 'assets/placeholder-3.svg', caption: 'Design tool comparison and workflow diagram' },
      { type: 'h2', text: 'Conclusion' },
      { type: 'p', text: 'The craft of motion design in 2025 is about finding the balance between technical capability and aesthetic judgment. The best motion isn\'t the flashiest — it\'s the most purposeful.' },
      { type: 'quote', text: 'Motion should serve the message, not compete with it.' }
    ]
  },
  2: {
    title: 'Building a Personal Portfolio with React & Tailwind',
    cat: 'DEV',
    catName: 'Dev',
    date: '2025.04.03',
    reading: '8 min read',
    tags: ['React', 'Tailwind', 'Portfolio', 'Dev'],
    heroImg: 'assets/placeholder-2.svg',
    heroCaption: 'Portfolio site screenshot',
    body: [
      { type: 'p', text: 'A personal portfolio is more than just a showcase — it\'s a living document of your craft. In this article, I\'ll walk through building a modern portfolio site using React and Tailwind CSS.' },
      { type: 'h2', text: 'Why React & Tailwind?' },
      { type: 'p', text: 'React\'s component-based architecture makes it easy to keep your portfolio modular and maintainable. Combined with Tailwind\'s utility-first CSS, you can achieve pixel-perfect designs without fighting with stylesheets.' },
      { type: 'code', text: '// Component structure\nsrc/\n  components/\n    Hero.jsx\n    Portfolio.jsx\n    Article.jsx\n    Contact.jsx\n  data/\n    projects.js\n  App.jsx' },
      { type: 'h2', text: 'Setting Up the Project' },
      { type: 'p', text: 'Getting started is straightforward. We\'ll use Vite for fast development and configure Tailwind with custom design tokens.' },
      { type: 'ul', items: ['Quick setup with Vite', 'Design tokens and theming', 'Responsive grid layouts', 'Smooth animations with Framer Motion', 'SEO optimization'] },
      { type: 'figure', img: 'assets/placeholder-4.svg', caption: 'Portfolio wireframe and component layout' },
      { type: 'h3', text: 'Design Tokens Are Key' },
      { type: 'p', text: 'Consistent design tokens for colors, spacing, and typography ensure your portfolio feels cohesive across all pages and screen sizes.' },
      { type: 'h2', text: 'Deployment' },
      { type: 'p', text: 'Once your portfolio is ready, deploying to GitHub Pages or Vercel takes just minutes. Both offer free tiers with excellent performance.' },
      { type: 'quote', text: 'Your portfolio is never truly finished — it\'s a reflection of your ongoing journey as a creator.' }
    ]
  },
  3: {
    title: 'Why I Switched to the International Typographic Style',
    cat: 'THEORY',
    catName: 'Theory',
    date: '2025.02.18',
    reading: '6 min read',
    tags: ['Typography', 'Design', 'Theory', 'Layout'],
    heroImg: 'assets/placeholder-3.svg',
    heroCaption: 'Grid-based layout study',
    body: [
      { type: 'p', text: 'After years of designing with free-form layouts, I made a deliberate shift toward the International Typographic Style — and it changed how I approach every project.' },
      { type: 'h2', text: 'What Is the International Typographic Style?' },
      { type: 'p', text: 'Developed in Switzerland and Germany in the 1950s, this style is characterized by asymmetric grid layouts, sans-serif typography, and a clear hierarchy of information.' },
      { type: 'figure', img: 'assets/placeholder-1.svg', caption: 'Comparing free-form vs grid-based design' },
      { type: 'h3', text: 'The Core Principles' },
      { type: 'ul', items: ['Objectivity and clarity over subjective aesthetics', 'Grid-based organization for consistent layouts', 'Sans-serif typefaces for legibility', 'Photography over illustration', 'Asymmetric compositions with generous whitespace'] },
      { type: 'h2', text: 'Why the Switch Matters' },
      { type: 'p', text: 'Working within a strict grid forces you to make better design decisions. You can\'t hide behind decorative elements — the structure has to stand on its own.' },
      { type: 'p', text: 'The constraints of the grid become creative catalysts. When every element must earn its place, you learn to communicate more effectively.' },
      { type: 'h2', text: 'Practical Applications' },
      { type: 'p', text: 'This approach works especially well for editorial design, data visualization, and any project where information hierarchy is paramount.' },
      { type: 'quote', text: 'Good design is as little design as possible. — Dieter Rams' }
    ]
  },
  4: {
    title: 'A Year of Vibe Coding: Reflections & Tools',
    cat: 'DEV',
    catName: 'Dev',
    date: '2024.11.05',
    reading: '7 min read',
    tags: ['AI', 'Dev', 'Tools', 'Workflow'],
    heroImg: 'assets/placeholder-4.svg',
    heroCaption: 'AI-assisted development workflow diagram',
    body: [
      { type: 'p', text: 'In 2024, AI coding assistants transformed from novelty to necessity. Here\'s what a year of "vibe coding" has taught me about the future of software development.' },
      { type: 'h2', text: 'What Changed' },
      { type: 'p', text: 'The biggest shift isn\'t just about writing code faster — it\'s about the nature of the problems we can now solve. Routine implementation tasks that once took hours can now be accomplished in minutes.' },
      { type: 'figure', img: 'assets/placeholder-5.svg', caption: 'Time comparison: traditional coding vs AI-assisted' },
      { type: 'h3', text: 'Where AI Excels' },
      { type: 'ul', items: ['Scaffolding new projects and boilerplate', 'Writing unit tests', 'Refactoring and code cleanup', 'Exploring alternative implementations', 'Documentation and comments'] },
      { type: 'h3', text: 'Where Human Judgment Still Reigns' },
      { type: 'ul', items: ['Architecture and system design', 'Trade-off decisions', 'Understanding business context', 'Reviewing AI output critically', 'Mentoring and team collaboration'] },
      { type: 'h2', text: 'My Toolkit in 2024' },
      { type: 'p', text: 'The most effective workflow combines AI assistance with strong fundamentals. Here are the tools that became daily companions.' },
      { type: 'figure', img: 'assets/placeholder-6.svg', caption: 'Development tool ecosystem' },
      { type: 'h2', text: 'Looking Forward' },
      { type: 'p', text: 'The future of coding isn\'t human vs AI — it\'s human and AI working together. The best developers will be those who can orchestrate AI capabilities while maintaining the judgment and creativity that only humans can provide.' },
      { type: 'quote', text: 'AI doesn\'t replace developers — it empowers them to be better developers.' }
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
