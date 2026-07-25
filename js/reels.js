// ============================================================
// INSTAGRAM REELS
// Loads Instagram's official embed.js ONCE, and only when the
// section approaches the viewport, so the heavy third-party script
// never blocks initial page load. Scoped IIFE, no globals leaked.
// ============================================================
(function () {
  var section = document.getElementById('instagram-reels');
  if (!section) return;

  var EMBED_SRC = 'https://www.instagram.com/embed.js';
  var requested = false;

  // Ask Instagram to (re)scan the page and swap each blockquote for an iframe.
  function process() {
    if (window.instgrm && window.instgrm.Embeds) {
      try { window.instgrm.Embeds.process(); } catch (e) {}
    }
  }

  // Once a card's blockquote has been replaced by an <iframe>, flag the card
  // so its dark placeholder tint is dropped. Bounded poll so it can't run
  // forever if an embed fails (e.g. a deleted post, or offline).
  function watchForIframes() {
    var cards = section.querySelectorAll('.reel-card');
    var ticks = 0;
    var timer = setInterval(function () {
      var pending = 0;
      cards.forEach(function (card) {
        if (card.querySelector('iframe')) card.classList.add('is-loaded');
        else pending++;
      });
      if (pending === 0 || ++ticks > 60) clearInterval(timer);
    }, 300);
  }

  function loadEmbedScript() {
    if (requested) return;
    requested = true;

    // Already available (or injected elsewhere): just process.
    if (window.instgrm && window.instgrm.Embeds) { process(); watchForIframes(); return; }
    var existing = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existing) {
      existing.addEventListener('load', function () { process(); watchForIframes(); });
      process(); watchForIframes();
      return;
    }

    var s = document.createElement('script');
    s.async = true;
    s.src = EMBED_SRC;
    s.onload = function () { process(); watchForIframes(); };
    document.body.appendChild(s);
  }

  // Defer the fetch until the section is ~400px from entering the viewport.
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { loadEmbedScript(); obs.disconnect(); }
      });
    }, { rootMargin: '400px 0px' });
    io.observe(section);
  } else {
    loadEmbedScript();
  }

  // Safety net: if embed.js finished after our first process() call, re-run.
  window.addEventListener('load', process);
})();
