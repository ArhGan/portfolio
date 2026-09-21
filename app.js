/* =========================================================
   Portfolio Interactions
   ========================================================= */

(function () {
  'use strict';

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
      const isAnchor = href && (href.startsWith('#') || href.startsWith('index.html#'));

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
    const isOverlay = e.target.closest('#flyoutOverlay');
    if (!isInsideNav && !isMobileMenuBtn) {
      closeAllFlyouts();
    }
    if (isOverlay) {
      closeAllFlyouts();
    }
  });

  // --- Navigation Active State on Scroll ---
  const sections = document.querySelectorAll('.section');
  const mbItems = document.querySelectorAll('.mb-item');

  const setActiveLink = (id) => {
    navIcons.forEach((link) => {
      const target = link.getAttribute('data-section');
      link.classList.toggle('active', target === id);
    });
    mbItems.forEach((item) => {
      const target = item.getAttribute('data-mb');
      item.classList.toggle('active', target === id);
    });
  };

  if (sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  // --- Scroll Reveal Animation ---
  const revealTargets = document.querySelectorAll(
    '.card, .article-item, .timeline-item, .section-header, .hero-sub, .hero-bottom, .contact-content'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => revealObserver.observe(el));

  // --- Sidebar Category Filter with Expand/Collapse ---
  const catItems = document.querySelectorAll('.cat-item');
  const catGroups = document.querySelectorAll('.cat-group');

  catItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const filter = item.getAttribute('data-filter');
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

      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // --- Article Click (placeholder) ---
  document.querySelectorAll('.article-item').forEach((item) => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.article-title')?.textContent || 'Article';
      console.log('Open article:', title);
    });
  });

  // --- Timeline Items: stagger reveal ---
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, i) => {
    item.style.transitionDelay = `${i * 80}ms`;
  });

  // --- Smooth scroll for nav anchors ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Smooth scroll for flyout links (close panel on click) ---
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

  // --- Subtle cursor-follow parallax on hero title ---
  const displayText = document.querySelector('.display-text');
  const hero = document.querySelector('.hero');

  if (displayText && hero && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0,
      mouseY = 0;
    let currentX = 0,
      currentY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    });

    hero.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    const animate = () => {
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;
      displayText.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animate);
    };
    animate();
  }

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

  // --- Mobile: Search button scrolls to portfolio ---
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllFlyouts();
      const target = document.querySelector('#portfolio');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // --- Mobile: Bottom nav items scroll to section and close flyouts ---
  mbItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      closeAllFlyouts();
    });
  });
  // --- Contact: Copy WeChat to clipboard with toast ---
  const copyBtn = document.querySelector('.contact-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const text = copyBtn.dataset.copy || copyBtn.textContent.trim();
      const toast = copyBtn.querySelector('.copy-toast');

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 1600);
        }
      } catch (err) {
        console.warn('Copy failed:', err);
      }
    });

  // --- Contact: QR tooltip fallback for touch devices ---
  document.querySelectorAll('.contact-link-tooltip').forEach((link) => {
    link.addEventListener('click', (e) => {
      const qr = link.dataset.qr;
      if (qr === 'tel') {
        e.preventDefault();
        window.location.href = 'tel:17722449034';
      } else if (qr === 'wechat') {
        // Copy WeChat on click too
        const text = 'An-Thor';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).catch(() => {});
        }
      }
      // Other links can keep their default href behavior
    });
  });
  } // close if (copyBtn)

  // === 02 Text Scramble: Hero display text ===
  const scrambleChars = '!<>-_\\/[]{}—=+*^?#________';
  function scrambleText(el, target, done) {
    let iteration = 0;
    const maxIter = target.length * 6;
    function update() {
      el.textContent = target.split('').map((char, i) => {
        if (i < iteration / 6) return target[i];
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }).join('');
      iteration++;
      if (iteration >= maxIter) {
        el.textContent = target;
        if (done) done();
      } else {
        setTimeout(() => requestAnimationFrame(update), 30);
      }
    }
    update();
  }

  const heroLines = document.querySelectorAll('.hero-bg .display-text .line');
  if (heroLines.length > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const targets = ['ZEPHYR', 'ARH'];
    heroLines.forEach((line, i) => {
      const target = i === 1 ? line.textContent.trim() : targets[i];
      const originalHTML = line.innerHTML;
      const isEm = line.querySelector('em');
      if (isEm) {
        scrambleText(isEm, targets[i], () => {
          isEm.textContent = targets[i];
        });
      } else {
        scrambleText(line, targets[i], () => {
          line.textContent = targets[i];
        });
      }
    });
  }

  // === 03 Depth Card: 3D Tilt on Portfolio cards ===
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card[data-tilt]').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -8;
        const rotY = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.01, 1.01, 1.01)`;
        card.style.setProperty('--mx', (x / rect.width * 100) + '%');
        card.style.setProperty('--my', (y / rect.height * 100) + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // === 04 Magnetic Button ===
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const wrap = btn.parentElement;
      if (!wrap) return;
      wrap.style.display = 'inline-block';
      wrap.style.padding = '8px';

      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        const btnText = btn.querySelector('.btn-text');
        if (btnText) btnText.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
      });
      wrap.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        const btnText = btn.querySelector('.btn-text');
        if (btnText) btnText.style.transform = 'translate(0, 0)';
      });
    });
  }

  // === 06 Stagger Reveal: Timeline arrows ===
  document.querySelectorAll('.timeline-item').forEach((item) => {
    const arrow = document.createElement('span');
    arrow.className = 'timeline-arrow';
    arrow.textContent = '→';
    arrow.setAttribute('aria-hidden', 'true');
    item.appendChild(arrow);
  });
})();
