// ============================================================
// SHARED MOBILE NAVIGATION DRAWER — CANONICAL IMPLEMENTATION
// Source of truth: Insights page (js/insights.js drawer engine).
// Used by: index.html, trainings.html (insights.html keeps its
// own inline copy, which this file mirrors verbatim).
// Behavior: stable fixed-position scroll lock, class toggle on
// <body class="nav-open">, close on link click / Escape / resize.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  let lockedScrollY = 0;

  const lockBodyScroll = () => {
    lockedScrollY = window.scrollY || document.documentElement.scrollTop;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockedScrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  };

  const unlockBodyScroll = () => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    window.scrollTo(0, lockedScrollY);
  };

  const openNav = () => {
    document.body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation');
    lockBodyScroll();
  };

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    unlockBodyScroll();
  };

  navToggle.addEventListener('click', () => {
    if (document.body.classList.contains('nav-open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Desktop / drawer already closed: do nothing. Releasing the (inactive)
      // scroll-lock here would call window.scrollTo and yank the page to the
      // top, breaking same-page nav links. Let the anchor / main-script
      // handlers scroll normally.
      if (!document.body.classList.contains('nav-open')) return;

      // Drawer open (mobile): close it, then honour same-page anchors. The
      // scroll-lock resets the scroll position on release, so the scroll must
      // run AFTER unlock (next frame). `#apply` is skipped on purpose — it
      // opens the contact modal, handled elsewhere.
      closeNav();
      const href = link.getAttribute('href') || '';
      if (href.length > 1 && href.charAt(0) === '#' && href !== '#apply') {
        const target = document.getElementById(href.slice(1));
        if (target) {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && document.body.classList.contains('nav-open')) {
      closeNav();
    }
  });
});
