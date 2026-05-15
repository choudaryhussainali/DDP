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



  /* ============================================================
   LIVE DASHBOARD SIMULATION ENGINE (DDP)
   Encapsulated to protect global scope
============================================================ */
(() => {
  const dashFeedData = [
    { type:'review',  user:'@verified_Buyer',  avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', color:'var(--gold)', platform:'Shopify',   text:'"The conversion rate on this new landing page is unprecedented. My ROAS just hit 4.5x this week." ', time:'just now' },
    { type:'dm',      user:'@founder_Alex',    avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop', color:'var(--dash-lav)', platform:'Instagram', text:'Just saw the new analytics dashboard. Can we scale ad spend by 20% next week?', time:'1m ago' },
    { type:'review',  user:'@Sarah_Style',     avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', color:'var(--gold)', platform:'TrustPilot',text:'"Best agency experience. They completely overhauled our UI/UX and sales are up 40% YoY." ', time:'3m ago' },
    { type:'comment', user:'@glowgirl_Mia',    avatar:'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop', color:'var(--dash-teal)', platform:'Instagram', text:'Absolutely obsessed with this new campaign sequence.', time:'4m ago' },
    { type:'dm',      user:'@retailer_Pia',    avatar:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop', color:'var(--dash-lav)', platform:'TikTok',    text:'Hi. We would love to stock your product in our 12 stores. Can we connect?', time:'22m ago' }
  ];

  const dashLiveUpdates = [
    { type:'review',  user:'@Ecom_Giant',      avatar:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop', color:'var(--gold)', platform:'Shopify',   text:'"The Speed-to-Lead strategy implemented here is flawless. Closing 3x more high-ticket clients." ', time:'just now' },
    { type:'dm',      user:'@luxeretail_HQ',   avatar:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop', color:'var(--dash-lav)', platform:'Instagram', text:'Interested in a brand collab — are you open to a $50k retainer discussion?', time:'just now' },
    { type:'review',  user:'@B2B_Partner',     avatar:'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop', color:'var(--gold)', platform:'Google',text:'"The custom API integrations saved our team 20 hours a week. Masterful." ', time:'just now' },
  ];

  const icons = {
    msg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  };

  let currentTab = 'all';
  let liveIdx = 0;
  let feedItems = [...dashFeedData];

  const typeConfig = {
    review:  { label:'Conversion', cls:'dash-chip-review' },
    comment: { label:'Engagement', cls:'dash-chip-comment' },
    dm:      { label:'Lead',       cls:'dash-chip-dm' },
  };

  window.dashSetTab = function(btn, tab) {
    document.querySelectorAll('.dash-feed-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTab = tab;
    dashRenderFeed(feedItems);
  };

  function dashRenderFeed(items, prependNew) {
    const list = document.getElementById('dashFeedList');
    if (!list) return;
    if (!prependNew) list.innerHTML = '';

    const filtered = currentTab === 'all' ? items
      : currentTab === 'reviews' ? items.filter(i => i.type === 'review')
      : items.filter(i => i.type === 'dm');

    if (prependNew) {
      const item = filtered[0];
      if (!item) return;
      const el = dashBuildFeedItem(item, true);
      list.insertBefore(el, list.firstChild);
      list.scrollTop = 0;
      return;
    }

    filtered.forEach((item, idx) => {
      const el = dashBuildFeedItem(item, false);
      el.style.animationDelay = (idx * 50) + 'ms';
      list.appendChild(el);
    });
  }

  function dashBuildFeedItem(item, isNew) {
    const cfg = typeConfig[item.type] || typeConfig.comment;
    const div = document.createElement('div');
    div.className = 'dash-feed-item' + (isNew ? ' new-item' : '');

    div.innerHTML = `
      <div class="dash-feed-user-avatar"><img src="${item.avatar}" style="width:100%;height:100%;object-fit:cover;" alt="user"></div>
      <div class="dash-feed-content">
        <div class="dash-feed-top">
          <span class="dash-feed-type-chip ${cfg.cls}">${cfg.label}</span>
          <span class="dash-feed-username">${item.user}</span>
          <span class="dash-feed-time">${item.time}</span>
        </div>
        <div class="dash-feed-text">${item.text}</div>
      </div>`;
    return div;
  }

  function dashShowToast(svgString, title, msg, color) {
    const container = document.getElementById('dashToastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'dash-toast';
    toast.innerHTML = `
      <div class="dash-toast-icon" style="background:${color}15;color:${color}">${svgString}</div>
      <div>
        <div class="dash-toast-title">${title}</div>
        <div class="dash-toast-msg">${msg}</div>
      </div>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 350);
    }, 4000);
  }

  function dashAnimateCounter(id, barId, target, suffix, barPct, formatter) {
    const el = document.getElementById(id);
    const barEl = document.getElementById(barId);
    if (!el || !barEl) return;
    let start = null; const duration = 2000;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); 
      const current = target * eased;
      el.textContent = formatter ? formatter(Math.round(current)) + suffix : (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      barEl.style.width = (barPct * eased) + '%';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function dashFormatNum(n) {
    if (n >= 1000000) return (n/1000000).toFixed(1)+'M';
    if (n >= 1000) return (n/1000).toFixed(1)+'K';
    return n.toString();
  }

  function initDash() {
    dashRenderFeed(feedItems);
    dashAnimateCounter('dashKpiEngagement', 'dashBarEngagement', 12.4, '%', 88);
    dashAnimateCounter('dashKpiImpressions', 'dashBarImpressions', 312800, '', 78, dashFormatNum);
    dashAnimateCounter('dashKpiLeads', 'dashBarLeads', 1582, '', 68);
    dashAnimateCounter('dashKpiConversion', 'dashBarConversion', 5.8, '%', 52);

    setInterval(() => {
      const newItem = dashLiveUpdates[liveIdx % dashLiveUpdates.length];
      liveIdx++;
      feedItems.unshift(newItem); 
      if (feedItems.length > 30) feedItems.pop(); 
      dashRenderFeed([newItem], true);

      if (newItem.type === 'dm') {
        dashShowToast(icons.msg, 'High-Ticket Lead Captured', `${newItem.user} entered the pipeline.`, 'var(--dash-lav)');
      } else if (newItem.type === 'review') {
        dashShowToast(icons.star, 'Conversion Logged', `High-ROAS event tracked from ${newItem.user}.`, 'var(--gold)');
      }
    }, 7000);

    setInterval(() => {
      const impEl = document.getElementById('dashKpiImpressions');
      if(impEl) {
          const current = parseFloat(impEl.textContent.replace(/[^\d.]/g,''));
          impEl.textContent = dashFormatNum(current * 1000 + Math.round(Math.random() * 800 + 200));
      }
      const leadsEl = document.getElementById('dashKpiLeads');
      if(leadsEl && Math.random() > 0.4) {
          leadsEl.textContent = (parseInt(leadsEl.textContent.replace(',','')) + 1).toLocaleString();
      }
    }, 8500);
  }

  // Use Intersection Observer to trigger dashboard animations only when it scrolls into view
  window.addEventListener('DOMContentLoaded', () => {
    const dashSection = document.getElementById('live-operations');
    if (!dashSection) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(initDash, 400); // slight delay to align with scroll reveal
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(dashSection);
  });
})();


