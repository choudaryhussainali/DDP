document.addEventListener("DOMContentLoaded", () => {
  
  // ============================================================
  // ENTERPRISE GRAPH PRELOADER
  // ============================================================
  const preloader = document.getElementById('premium-preloader');
  const countEl = document.getElementById('loader-count');
  const growthLine = document.getElementById('growth-line');
  const graphFill = document.getElementById('graph-fill');
  
  if (preloader && countEl && growthLine && graphFill) {
    document.body.classList.add('loading-lock'); // Lock scroll
    
    let progress = 0;
    const totalPathLength = 400; // Matches CSS stroke-dasharray
    
    growthLine.style.strokeDashoffset = totalPathLength;
    graphFill.style.width = '0%';

    // SLOWED DOWN: Changed interval from 25ms to 45ms
    const interval = setInterval(() => {
      
      // SLOWED DOWN: Now it only jumps by 1% or 2% at a time (used to be up to 3%)
      progress += Math.floor(Math.random() * 2) + 1; 
      
      if (progress > 100) progress = 100;

      // 1. Update the huge gold number
      countEl.innerText = progress;

      // 2. Draw the SVG curve
      const offset = totalPathLength - ((progress / 100) * totalPathLength);
      growthLine.style.strokeDashoffset = offset;

      // 3. Expand the glowing gradient box beneath the line
      graphFill.style.width = progress + '%';

      if (progress === 100) {
        clearInterval(interval);
        
        // LINGER EFFECT: Waits slightly longer at 100% so the user can absorb the visual
        setTimeout(() => {
          preloader.classList.add('loaded');
          // ==========================================
          // TRIGGER HERO ANIMATION HERE
          // ==========================================
          const heroElements = document.querySelectorAll('.hero-elem');
          heroElements.forEach(el => el.classList.add('animate'));
          // ==========================================
          
          // Unlock the scroll once the preloader slides away
          setTimeout(() => {
            document.body.classList.remove('loading-lock');
          }, 800); 
          
        }, 800); // Increased from 600ms to 800ms
      }
    }, 45); // <-- This is the master speed control. Increase to 60 to make it even slower.
  }

  // ... rest of your main.js code below ...
});

/* ============================================================
   CURSOR
============================================================ */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .svc-card, .insight-card, .testi-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.width = '12px';
    dot.style.height = '12px';
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'rgba(201,168,76,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.width = '8px';
    dot.style.height = '8px';
    ring.style.width = '40px';
    ring.style.height = '40px';
    ring.style.borderColor = 'rgba(201,168,76,0.5)';
  });
});

/* ============================================================
   NAVBAR SCROLL
============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============================================================
   PARTICLES
============================================================ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

for (let i = 0; i < 60; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    o: Math.random() * 0.5 + 0.1,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(201,168,76,${p.o})`;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ============================================================
   SCROLL REVEAL
============================================================ */
const revealEls = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(el => revObs.observe(el));

/* ============================================================
   COUNTER ANIMATION (UPGRADED FOR ANY SPAN)
============================================================ */
const counters = document.querySelectorAll('.metric-num[data-count]');
const cntObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseInt(el.getAttribute('data-count'));
      const prefix = el.getAttribute('data-prefix') || ''; 
      const span = el.querySelector('span'); // Now grabs ANY span style
      let current = 0;
      const step = target / 40;
      
      const t = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(t);
        }
        el.innerHTML = prefix + Math.floor(current) + (span ? span.outerHTML : '');
      }, 40);
      
      cntObs.unobserve(el);
    }
  });
}, { threshold: 0.3 });
counters.forEach(el => cntObs.observe(el));

/* ============================================================
   METRIC BAR ANIMATION
============================================================ */
const bars = document.querySelectorAll('.metric-bar-fill');
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.animation = 'barFill 1.5s ease forwards';
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => barObs.observe(b));

/* ============================================================
   SMOOTH ANCHOR LINKS
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ============================================================
// IMAGE ZOOM LIGHTBOX LOGIC
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close');
  const images = document.querySelectorAll('.result-image img');

  // 1. Open modal on image click
  images.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src; // Copies the high-res image source
      modal.classList.add('active'); // Fades in the modal
    });
  });

  // 2. Close modal when clicking the 'X'
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // 3. Close modal when clicking anywhere on the dark background
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // 4. Professional touch: Close modal when pressing the 'Escape' key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
});


// Magnetic Spotlight Logic for the Trust Grid
  const clientGrid = document.getElementById('client-grid');
  
  if (clientGrid) {
    clientGrid.addEventListener('mousemove', (e) => {
      const rect = clientGrid.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      clientGrid.style.setProperty('--mouse-x', `${x}px`);
      clientGrid.style.setProperty('--mouse-y', `${y}px`);
    });
  }