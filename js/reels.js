// ============================================================
// INSTAGRAM REELS
// Loads Instagram's official embed.js ONCE. To avoid the reels showing
// raw fallback links for a few seconds, we (a) warm the connection with a
// <link rel=preconnect> in the head, (b) start the fetch while the page is
// idle so it is usually ready before the user scrolls down, and (c) also
// trigger well before the section enters view. A per-card loading skeleton
// (CSS) covers each card until its iframe actually renders. Scoped IIFE.
// ============================================================
(function () {
  var section = document.getElementById('instagram-reels');
  if (!section) return;

  var EMBED_SRC = 'https://www.instagram.com/embed.js';
  var requested = false;
  var STALL_MS = 12000; // if an embed never renders, reveal its fallback link

  function process() {
    if (window.instgrm && window.instgrm.Embeds) {
      try { window.instgrm.Embeds.process(); } catch (e) {}
    }
  }

  // Flag each card the instant Instagram swaps its blockquote for an <iframe>
  // (MutationObserver = no polling lag, so the skeleton lifts immediately).
  function watchCard(card) {
    if (card.querySelector('iframe')) { card.classList.add('is-loaded'); return; }
    var mo = new MutationObserver(function () {
      if (card.querySelector('iframe')) { card.classList.add('is-loaded'); mo.disconnect(); }
    });
    mo.observe(card, { childList: true, subtree: true });
  }

  function watchAll() {
    section.querySelectorAll('.reel-card').forEach(watchCard);
    // Safety net: anything still not rendered after STALL_MS shows its
    // (working) fallback link instead of an endless spinner.
    setTimeout(function () {
      section.querySelectorAll('.reel-card:not(.is-loaded)').forEach(function (card) {
        card.classList.add('reel-stalled');
      });
    }, STALL_MS);
  }

  function loadEmbedScript() {
    if (requested) return;
    requested = true;
    watchAll();

    if (window.instgrm && window.instgrm.Embeds) { process(); return; }

    var existing = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existing) { existing.addEventListener('load', process); process(); return; }

    var s = document.createElement('script');
    s.async = true;
    s.src = EMBED_SRC;
    s.onload = process;
    document.body.appendChild(s);
  }

  // 1) Trigger well before the section scrolls into view.
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { loadEmbedScript(); obs.disconnect(); } });
    }, { rootMargin: '1200px 0px' });
    io.observe(section);
  }

  // 2) Also fetch it while the browser is idle after load, so the reels are
  //    usually ready by the time the user reaches them - without competing
  //    with the initial render.
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadEmbedScript, { timeout: 2500 });
  } else {
    window.addEventListener('load', function () { setTimeout(loadEmbedScript, 1200); });
  }

  // Re-process in case embed.js finished after our first process() call.
  window.addEventListener('load', process);
})();
