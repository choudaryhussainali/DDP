// ============================================================
// TRAININGS.JS - ISOLATED LOGIC
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Navigation Blur Effect
  const nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    });
  }

  // 2. Scroll Reveal Animations
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // 3. Custom Cursor Logic
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  if (cursorDot && cursorRing) {
    window.addEventListener('mousemove', (e) => {
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      requestAnimationFrame(() => {
        cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      });
    });

    document.querySelectorAll('a, button, .module-item').forEach(el => {
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
  }

  // 4. Background Particles Animation
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
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 12000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // The broken line has been successfully removed from here
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animateParticles);
    }
    
    initParticles(); 
    animateParticles();
  }

  // ============================================================
  // FAQ ACCORDION LOGIC
  // ============================================================
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const item = this.parentElement;
      const body = item.querySelector('.faq-body');
      
      // Optional: Close all other FAQs when one is opened
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.maxHeight = null;
        }
      });

      // Toggle current FAQ
      item.classList.toggle('active');
      
      if (item.classList.contains('active')) {
        // Expand
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        // Collapse
        body.style.maxHeight = null;
      }
    });
  });
});


// ============================================================
// ENROLLMENT APPLICATION MODAL ENGINE
// Opens the premium enrollment popup for every "Apply" CTA
// (a[href="#enroll"]), pre-selects the program the visitor clicked,
// and handles close / Escape / focus-trap / focus-restore /
// asynchronous Formspree submission with an inline success state.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('enrollModal');
  if (!modal) return;

  const backdrop      = document.getElementById('enrollModalBackdrop');
  const closeBtn      = document.getElementById('closeEnrollModal');
  const form          = document.getElementById('ddpEnrollForm');
  const courseSelect  = document.getElementById('enrCourse');
  const successState  = document.getElementById('enrollSuccessState');
  const successClose  = document.getElementById('enrollSuccessClose');
  const submitBtn     = document.getElementById('enrSubmitBtn');

  let lastTrigger = null; // element focus is returned to on close

  // ---- OPEN (event-delegated so it also catches any CTA added later) ----
  const openModal = (course) => {
    // Pre-select the program that matches the clicked CTA's data-course.
    if (course && courseSelect) {
      const match = Array.from(courseSelect.options).some(o => o.value === course);
      if (match) courseSelect.value = course;
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // lock background scroll
    // Move focus into the dialog (close button) without popping the
    // mobile keyboard, so keyboard/screen-reader users start inside it.
    setTimeout(() => { if (closeBtn) closeBtn.focus(); }, 60);
  };

  document.addEventListener('click', (e) => {
    const cta = e.target.closest('a[href="#enroll"]');
    if (!cta) return;
    e.preventDefault(); // never redirect — always open the popup
    lastTrigger = cta;
    openModal(cta.getAttribute('data-course'));
  });

  // ---- CLOSE ----
  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; } // restore focus
    // Reset the form + hide success silently after it slides away.
    setTimeout(() => {
      if (form) form.reset();
      if (successState) successState.classList.remove('active');
    }, 500);
  };

  if (closeBtn)      closeBtn.addEventListener('click', closeModal);
  if (backdrop)      backdrop.addEventListener('click', closeModal);
  if (successClose)  successClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // ---- FOCUS TRAP: keep Tab within the modal while it is open ----
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
    const focusables = modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
    );
    const visible = Array.from(focusables).filter(el => el.offsetParent !== null);
    if (!visible.length) return;
    const first = visible[0];
    const last  = visible[visible.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

  // ---- ASYNCHRONOUS FORMSPREE SUBMISSION ----
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Submitting Application...</span>';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';
      }
      let redirecting = false;
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          // On success, send the applicant to the premium thank-you page.
          // Relative path resolves to /thank-you-enroll (served from
          // thank-you-enroll.html) regardless of the current clean URL.
          redirecting = true;
          if (submitBtn) submitBtn.innerHTML = '<span>Application received — redirecting…</span>';
          window.location.href = 'thank-you-enroll';
          return;
        } else {
          alert('Something went wrong submitting your application. Please email us directly at daniidigitalpro@gmail.com.');
        }
      } catch (err) {
        alert('Could not connect. Please email us directly at daniidigitalpro@gmail.com.');
      } finally {
        if (!redirecting && submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'auto';
        }
      }
    });
  }
});


// ============================================================
// CONTACT / STRATEGY-CALL MODAL ENGINE
// Opens the same contact form as the homepage IN-PAGE for the header
// "Book Strategy Call" CTA and the footer Contact link
// (a[href="#apply"] / a[href="index.html#apply"]) — it never redirects
// to the homepage. Independent of the enrollment modal above.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('contactModal');
  if (!modal) return;

  const backdrop     = document.getElementById('contactModalBackdrop');
  const closeBtn     = document.getElementById('closeContactModal');
  const form         = document.getElementById('ddpStrategyForm');
  const successState = document.getElementById('formSuccessState');
  const successClose = document.getElementById('contactSuccessClose');
  const submitBtn    = document.getElementById('frmSubmitBtn');

  let lastTrigger = null; // element focus is returned to on close

  // ---- OPEN (event-delegated so it also catches any CTA added later) ----
  // Only the contact CTAs are intercepted. mailto/tel are intentionally NOT
  // hijacked, so the email/phone links inside BOTH modals keep working.
  const CONTACT_CTA = 'a[href="#apply"], a[href="index.html#apply"]';
  document.addEventListener('click', (e) => {
    const cta = e.target.closest(CONTACT_CTA);
    if (!cta) return;
    e.preventDefault(); // never jump / redirect — always open the popup in-page
    lastTrigger = cta;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { if (closeBtn) closeBtn.focus(); }, 60);
  });

  // ---- CLOSE ----
  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
    setTimeout(() => {
      if (form) form.reset();
      if (successState) successState.classList.remove('active');
    }, 500);
  };

  if (closeBtn)     closeBtn.addEventListener('click', closeModal);
  if (backdrop)     backdrop.addEventListener('click', closeModal);
  if (successClose) successClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // ---- FOCUS TRAP: keep Tab within the modal while it is open ----
  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
    const focusables = modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
    );
    const visible = Array.from(focusables).filter(el => el.offsetParent !== null);
    if (!visible.length) return;
    const first = visible[0];
    const last  = visible[visible.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // ---- ASYNCHRONOUS FORMSPREE SUBMISSION ----
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Transmission in progress...</span>';
        submitBtn.style.opacity = '0.7';
        submitBtn.style.pointerEvents = 'none';
      }
      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          if (successState) successState.classList.add('active');
          if (successClose) successClose.focus();
        } else {
          alert('Something went wrong. Please email us directly at daniidigitalpro@gmail.com.');
        }
      } catch (err) {
        alert('Could not connect. Please email us directly at daniidigitalpro@gmail.com.');
      } finally {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'auto';
        }
      }
    });
  }
});
