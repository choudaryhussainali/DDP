// ============================================================
// SCROLL-TO-TOP BUTTON  (shared across all pages)
// Injects a premium floating control with a live scroll-progress
// ring. Appears after scrolling down, smooth-scrolls to the top on
// click, is keyboard-operable, and respects reduced-motion.
// Styling lives in css/scroll-top.css.
// ============================================================
(function () {
  // Guard against double-injection (script included more than once).
  if (window.__ddpScrollTop || document.querySelector('.scroll-top-btn')) return;
  window.__ddpScrollTop = true;

  var SHOW_AT = 400;               // px scrolled before the button appears
  var R = 21;                      // ring radius (in the 48x48 viewBox)
  var CIRC = 2 * Math.PI * R;      // ring circumference

  function build() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll back to top');
    btn.title = 'Back to top';
    btn.innerHTML =
      '<svg class="scroll-top-ring" viewBox="0 0 48 48" aria-hidden="true">' +
        '<defs><linearGradient id="ddpScrollTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#e8c96d"/>' +
        '</linearGradient></defs>' +
        '<circle class="scroll-top-ring-track" cx="24" cy="24" r="' + R + '"/>' +
        '<circle class="scroll-top-ring-progress" cx="24" cy="24" r="' + R + '" stroke="url(#ddpScrollTopGrad)"/>' +
      '</svg>' +
      '<svg class="scroll-top-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>' +
      '</svg>';
    document.body.appendChild(btn);

    var ring = btn.querySelector('.scroll-top-ring-progress');
    ring.style.strokeDasharray = CIRC.toFixed(2);
    ring.style.strokeDashoffset = CIRC.toFixed(2);

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ticking = false;

    function render() {
      ticking = false;
      var doc = document.documentElement;
      var top = window.pageYOffset || doc.scrollTop || 0;
      var max = (doc.scrollHeight - doc.clientHeight) || 1;
      var progress = Math.min(Math.max(top / max, 0), 1);
      ring.style.strokeDashoffset = (CIRC * (1 - progress)).toFixed(2);
      btn.classList.toggle('is-visible', top > SHOW_AT);
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(render); }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    render(); // set initial state
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
