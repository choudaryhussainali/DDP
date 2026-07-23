// ============================================================
// PREMIUM SERVICES DROPDOWN  (shared: index, insights, trainings)
// Desktop opens on hover (CSS); the caret also toggles on click.
// Mobile (in the drawer) opens the accordion via the caret button.
// Handles: caret toggle, Escape to close, outside-click to close,
// and closing the panel when a service item is chosen.
// Styling lives in css/nav-dropdown.css.
// ============================================================
(function () {
  var dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  function close(dd) {
    dd.classList.remove('open');
    var caret = dd.querySelector('.nav-dropdown-caret');
    if (caret) caret.setAttribute('aria-expanded', 'false');
  }

  dropdowns.forEach(function (dd) {
    var caret = dd.querySelector('.nav-dropdown-caret');
    var menu = dd.querySelector('.nav-dropdown-menu');
    if (!caret || !menu) return;

    // Caret is a <button> (not an <a>), so the mobile drawer's
    // close-on-link-click never fires here - it just toggles the panel.
    caret.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var open = dd.classList.toggle('open');
      caret.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Choosing a service closes the panel (the drawer's own handler,
    // if present, then closes the drawer because these are <a> links).
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        close(dd);
        // Reflect ONLY the chosen service in the URL slug. On the homepage
        // main.js's smooth-scroll preventDefaults the native hash change, so
        // we set it explicitly here. Runs after main.js's listener (this
        // script loads later), so the smooth scroll is untouched. Guarded to
        // on-page "#service-*" anchors - every other site link is left as-is.
        // (Subpages use "./#service-*", which navigate for real and already
        // carry the hash, so they never reach this branch.)
        var href = a.getAttribute('href') || '';
        if (href.charAt(0) === '#' && href.length > 1) {
          history.pushState(null, '', href);
        }
      });
    });
  });

  // Escape closes any open panel
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') dropdowns.forEach(close);
  });

  // Click outside closes an open (click-pinned) panel
  document.addEventListener('click', function (e) {
    dropdowns.forEach(function (dd) {
      if (dd.classList.contains('open') && !dd.contains(e.target)) close(dd);
    });
  });
})();
