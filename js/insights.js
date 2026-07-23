// ============================================================
// INSIGHTS.JS - ISOLATED LOGIC FOR THE EDITORIAL PAGE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  
  // ------------------------------------------------------------
  // 1. Navigation Blur Effect
  // ------------------------------------------------------------
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  // ------------------------------------------------------------
  // 2. Scroll Reveal Animations
  // ------------------------------------------------------------
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // ------------------------------------------------------------
  // 3. Custom Cursor Logic
  // ------------------------------------------------------------
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  window.addEventListener('mousemove', (e) => {
    // Move dot instantly
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    // Move ring with slight delay for premium feel
    requestAnimationFrame(() => {
      cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  });

  // Cursor Hover Effects on Links/Buttons
  document.querySelectorAll('a, button, .insight-card, .featured-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorRing.style.width = '60px';
      cursorRing.style.height = '60px';
      cursorRing.style.backgroundColor = 'rgba(201,168,76,0.05)';
    });
    el.addEventListener('mouseleave', () => {
      cursorRing.style.width = '40px';
      cursorRing.style.height = '40px';
      cursorRing.style.backgroundColor = 'transparent';
    });
  });

  // ------------------------------------------------------------
  // 4. Background Particles Animation
  // ------------------------------------------------------------
  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // Tiny elegant dots
        this.speedX = Math.random() * 0.5 - 0.25; // Slow drift
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`; // Gold color matching your theme
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 12000; // Density
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
  }

  // ------------------------------------------------------------
  // 5. DYNAMIC ARTICLE INJECTION & DRAWER ENGINE
  // ------------------------------------------------------------
  const drawerOverlay = document.getElementById('drawerOverlay');
  const articleDrawer = document.getElementById('articleDrawer');
  const drawerCloseBtn = document.getElementById('drawerClose');
  
  // The empty buckets in the HTML
  const domTag = document.getElementById('drawerTag');
  const domTitle = document.getElementById('drawerTitle');
  const domBody = document.getElementById('drawerBody');

  // Find every card that has a 'data-article' attribute
  const articleCards = document.querySelectorAll('[data-article]');

  articleCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault(); 
      
      // 1. Get the specific ID from the clicked card
      const targetId = card.getAttribute('data-article');
      
      // 2. Pull the matching data from our data.js database
      const articleData = articleDatabase[targetId];

      // 3. If the article exists, inject it instantly
      if (articleData) {
        domTag.innerText = articleData.tag;
        domTitle.innerText = articleData.title;
        domBody.innerHTML = articleData.content;
        
        // 4. Slide the drawer open and lock the background
        drawerOverlay.classList.add('active');
        articleDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 5. Reset scroll position to the top of the article
        document.querySelector('.drawer-scroll-area').scrollTop = 0;
      } else {
        console.error("Article data not found in data.js for:", targetId);
      }
    });
  });

  // Close Drawer Function
  const closeDrawer = () => {
    drawerOverlay.classList.remove('active');
    articleDrawer.classList.remove('active');
    document.body.style.overflow = ''; 
    
    // Clear the content out after it slides away so it's fresh for the next click
    setTimeout(() => { 
      domBody.innerHTML = ''; 
      domTitle.innerText = ''; 
      domTag.innerText = ''; 
    }, 500); // Waits for the 0.7s CSS animation to mostly finish
  };

  // Close triggers
  drawerCloseBtn.addEventListener('click', closeDrawer);
  drawerOverlay.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e) => {
    // While the contact popup is open on top of the drawer, let Escape close the
    // modal first; a second Escape then closes the drawer.
    const contactPortal = document.getElementById('contactModal');
    const portalOpen = contactPortal && contactPortal.classList.contains('active');
    if (e.key === 'Escape' && articleDrawer.classList.contains('active') && !portalOpen) {
      closeDrawer();
    }
  });
});


// Append to insights.js

// ============================================================
// MILLION DOLLAR CTA & FORMSPREE ENGINE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const contactModal = document.getElementById('contactModal');
  const closeContactModal = document.getElementById('closeContactModal');
  const form = document.getElementById('ddpStrategyForm');
  const successState = document.getElementById('formSuccessState');
  const submitBtn = document.getElementById('frmSubmitBtn');

  if (!contactModal) return;

  // 1. CTA HIJACKER (event-delegated):
  //    Bound ONCE on the document so it catches the static nav/footer CTAs AND
  //    every "Book Strategy Call" link that data.js injects into the article
  //    drawer *after* page load. Direct binding at load missed those dynamic
  //    links, so they redirected to index.html#apply instead of opening this
  //    popup. Delegation makes every article CTA open the same modal as the home page.
  const CTA_SELECTOR = 'a[href="#apply"], a[href="index.html#apply"], a[href^="mailto:"]';

  const openPortal = () => {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  document.addEventListener('click', (e) => {
    const cta = e.target.closest(CTA_SELECTOR);
    if (!cta) return;
    e.preventDefault(); // Kills the default jump/redirect dead
    openPortal();
  });

  // 2. MODAL CLOSING LOGIC
  const closePortal = () => {
    contactModal.classList.remove('active');

    // If the article drawer is still open beneath the modal (CTA was clicked
    // from inside an article), keep the body locked so the page doesn't scroll
    // away underneath it; otherwise release the scroll lock.
    const articleDrawer = document.getElementById('articleDrawer');
    const drawerStillOpen = articleDrawer && articleDrawer.classList.contains('active');
    document.body.style.overflow = drawerStillOpen ? 'hidden' : '';

    // Reset form and hide success state silently after modal slides away
    setTimeout(() => {
      if(form) form.reset();
      if(successState) successState.classList.remove('active');
    }, 500);
  };

  closeContactModal.addEventListener('click', closePortal);
  document.getElementById('contactModalBackdrop').addEventListener('click', closePortal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
      closePortal();
    }
  });

  // 3. ASYNCHRONOUS FORMSPREE SUBMISSION
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); 
      
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Transmission in progress...';
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';

      let redirecting = false;
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Booked — send the visitor to the premium consultation thank-you page.
          // Relative path resolves to /thank-you-hire regardless of the clean URL.
          redirecting = true;
          submitBtn.innerHTML = 'Booking confirmed — redirecting…';
          window.location.href = 'thank-you-hire';
          return;
        } else {
          alert("Network Error: Could not verify transmission. Please email us directly.");
        }
      } catch (error) {
        alert("System Error: Could not connect to endpoints. Please email us directly.");
      } finally {
        if (!redirecting) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'auto';
        }
      }
    });
  }
});






// ============================================================
// RESPONSIVE MOBILE NAVIGATION ENGINE - STABLE SCROLL LOCK
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
    link.addEventListener('click', closeNav);
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