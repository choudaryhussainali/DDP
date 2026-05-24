document.addEventListener("DOMContentLoaded", () => {
  
  // ============================================================
  // APEX BRAND PRELOADER (PURE VECTOR IGNITION)
  // ============================================================
  const preloader = document.getElementById('premium-preloader');
  const countEl = document.getElementById('loader-count');
  const paths = document.querySelectorAll('.ddp-path');
  const svgCanvas = document.querySelector('.ddp-vector-logo');
  
  if (preloader && countEl && paths.length > 0) {
    document.body.classList.add('loading-lock'); 
    
    // Trigger typography fade-in
    setTimeout(() => {
      preloader.classList.add('text-active');
    }, 100);
    
    // 1. Calculate Exact Mathematical Length of Each Complex Shape
    const pathData = Array.from(paths).map(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length; // Hide initially
      return { el: path, length: length };
    });

    let progress = 0;

    const interval = setInterval(() => {
      // Steady data compounding
      progress += Math.floor(Math.random() * 2) + 1; 
      if (progress > 100) progress = 100;

      // Update the gold counter
      countEl.innerText = progress;

      // 2. Draw lines dynamically
      const progressDecimal = progress / 100;
      
      pathData.forEach(item => {
        // Offset hits 0 perfectly at 100%
        item.el.style.strokeDashoffset = item.length - (item.length * progressDecimal);
      });

      // 3. The Solid Ignition Sequence
      if (progress === 100) {
        clearInterval(interval);
        
        // Ignite the solid metallic fill and glow
        if (svgCanvas) {
          svgCanvas.classList.add('filled');
        }
        
        // Linger to show the final solid 3D logo, then slide the curtain
        setTimeout(() => {
          preloader.classList.add('loaded');
          
          // Trigger Hero Entrance Animations
          const heroElements = document.querySelectorAll('.hero-elem');
          heroElements.forEach(el => el.classList.add('animate'));
          
          // Restore Scroll
          setTimeout(() => {
            document.body.classList.remove('loading-lock');
          }, 800); 
          
        }, 1100); // Linger for over a second so the user registers the logo assembly
      }
    }, 35); 
  }

 // ============================================================
  // CERTIFICATIONS 3D MAGNETIC TILT & CURSOR HOVER
  // ============================================================
  const certCards = document.querySelectorAll('.ddp-tilt-card');
  
  certCards.forEach(card => {
    const inner = card.querySelector('.cert-card-inner');
    
    // 3D Mouse Tracking
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return; // Disable on mobile
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const xRotate = -(y / 20); 
      const yRotate = (x / 20);
      
      inner.style.transform = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
    });
    
    // Snap Back
    card.addEventListener('mouseleave', () => {
      inner.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`;
    });
  });

  // Bind the existing custom cursor to the new Verify buttons
  const certBtns = document.querySelectorAll('.cert-verify-btn');
  const ddpDot = document.getElementById('cursorDot');
  const ddpRing = document.getElementById('cursorRing');

  certBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if(ddpDot && ddpRing) {
        ddpDot.style.width = '12px';
        ddpDot.style.height = '12px';
        ddpRing.style.width = '60px';
        ddpRing.style.height = '60px';
        ddpRing.style.borderColor = 'rgba(201,168,76,0.8)';
      }
    });
    btn.addEventListener('mouseleave', () => {
      if(ddpDot && ddpRing) {
        ddpDot.style.width = '8px';
        ddpDot.style.height = '8px';
        ddpRing.style.width = '40px';
        ddpRing.style.height = '40px';
        ddpRing.style.borderColor = 'rgba(201,168,76,0.5)';
      }
    });
  });
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
/* ============================================================
   SMOOTH ANCHOR LINKS (MODAL BYPASS UPGRADE)
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    
    // CRITICAL FIX: If the link is '#' or '#apply', do NOT scroll.
    // This allows our Modal Engine to hijack the click without the page jumping.
    if (id === '#' || id === '#apply') return; 
    
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ============================================================
   MILLION DOLLAR UNIVERSAL LIGHTBOX ENGINE
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal || !modalImg) {
    console.warn("DDP Engine: Lightbox elements missing from DOM.");
    return;
  }

  // 1. THE UNIVERSAL INTERCEPTOR
  // By listening on the body, we bypass all CSS z-index and pointer-event bugs.
  document.body.addEventListener('click', (e) => {
    
    // Look for a click anywhere inside our Result Cards or Certificate Stacks
    const clickTarget = e.target.closest('.result-image, .cert-stack-image, .cert-stack-card');
    
    if (clickTarget) {
      e.preventDefault(); // Stop default browser behaviors
      
      // Extract the image source hiding inside the clicked container
      const targetImage = clickTarget.querySelector('img');
      
      if (targetImage && targetImage.src) {
        modalImg.src = targetImage.src; 
        modal.classList.add('active'); // Fire the modal
      }
    }
  });

  // 2. CLOSE LOGIC: The 'X' Button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // 3. CLOSE LOGIC: Clicking the dark background
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // 4. CLOSE LOGIC: The Escape Key
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


  // ============================================================
  // MILLION DOLLAR 3D TILT GALLERY
  // ============================================================
  const tiltGalleries = document.querySelectorAll('.ddp-tilt-gallery');
  
  tiltGalleries.forEach(gallery => {
    gallery.addEventListener('mousemove', (e) => {
      // Only run 3D effect on desktop
      if (window.innerWidth < 1024) return; 
      
      const rect = gallery.getBoundingClientRect();
      // Calculate mouse position relative to center of the gallery
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation limits (divide by a higher number = less intense rotation)
      const xRotate = -(y / 25); 
      const yRotate = (x / 25);
      
      gallery.style.transform = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
      // Make the transition instant during mouse movement for crisp responsiveness
      gallery.style.transition = 'transform 0.1s ease-out';
    });
    
    gallery.addEventListener('mouseleave', () => {
      // Snap back to 0 with that Apple-smooth cubic bezier when the mouse leaves
      gallery.style.transform = `rotateX(0deg) rotateY(0deg)`;
      gallery.style.transition = 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
    });
  });
})();


// ============================================================
// DYNAMIC SERVICE MODAL ENGINE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const serviceData = {
    sem: {
      badge: "High Intent Capture",
      title: "AI-Search Engine Marketing",
      desc: "We don't just bid on keywords; we intercept high-intent buyers exactly when they are searching for a solution. Utilizing AI-driven bid strategies, we engineer Google Ads architectures that consistently output predictable ROI.",
      deliverables: [
        "Complete Account Restructure & Audit",
        "AI Bid Strategy (tROAS & tCPA) Implementation",
        "Negative Keyword Sculpting & Protection",
        "Conversion Tracking & GTM Server-Side Setup",
        "Weekly Performance Engineering & Reporting"
      ],
      keywords: ["Performance Max", "Target ROAS", "Search Intent", "RLSA", "Google Ads"]
    },
    social: {
      badge: "Algorithmic Authority",
      title: "AI-Social Media Funnels",
      desc: "Stop running random ads to cold audiences. We design multi-stage video and static funnels that guide users from absolute strangers to high-LTV loyalists using machine learning optimization.",
      deliverables: [
        "Multi-Stage Funnel Architecture Mapping",
        "Dynamic Creative Testing & Iteration",
        "Meta Pixel & Conversions API (CAPI) Integration",
        "Lookalike Audience Scaling Protocols",
        "High-Velocity Retargeting Loops"
      ],
      keywords: ["Meta Ads", "TikTok Business", "Advantage+", "CPA Optimization", "Dark Posts"]
    },
    management: {
      badge: "Organic Positioning",
      title: "Elite Brand Management",
      desc: "True brand authority cannot be bought; it must be engineered. We take over your organic presence to build trust signals at scale, creating an ecosystem that converts followers into buyers.",
      deliverables: [
        "360° Brand Strategy & Visual Audit",
        "High-End Asset Creation & Curation",
        "Community Management & Response Algorithms",
        "Engagement Rate Optimization Tactics",
        "Monthly Analytics & Growth Deep-Dive"
      ],
      keywords: ["Organic Reach", "Brand Authority", "Content Calendar", "Viral Engineering", "Trust Signals"]
    },
    ecom: {
      badge: "Revenue Operations",
      title: "E-Commerce Scaling",
      desc: "We fix the leaks in your bucket before turning on the traffic firehose. A comprehensive overhaul of your post-click experience to maximize AOV (Average Order Value) and compound your cash flow.",
      deliverables: [
        "Shopify Checkout Friction Optimization",
        "Post-Purchase Upsell Flow Design",
        "Cart Abandonment Email Architecture",
        "LTV (Lifetime Value) Maximization Strategy",
        "Omnichannel Scaling Systems (Google + Meta)"
      ],
      keywords: ["CRO", "Klaviyo Flows", "AOV Expansion", "Customer Retention", "Liquid Code"]
    }
  };

  const modalOverlay = document.getElementById('serviceModal');
  const modalBackdrop = document.getElementById('serviceModalBackdrop');
  const closeBtn = document.getElementById('closeServiceModal');
  
  const mBadge = document.getElementById('modalBadge');
  const mTitle = document.getElementById('modalTitle');
  const mDesc = document.getElementById('modalDesc');
  const mDeliverables = document.getElementById('modalDeliverables');
  const mKeywords = document.getElementById('modalKeywords');

  const triggers = document.querySelectorAll('.btn-service-trigger');

  function openModal(serviceKey) {
    const data = serviceData[serviceKey];
    if(!data) return;

    // Inject Text
    mBadge.textContent = data.badge;
    mTitle.innerHTML = data.title;
    mDesc.textContent = data.desc;

    // Inject Deliverables (List)
    mDeliverables.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      mDeliverables.appendChild(li);
    });

    // Inject Keywords (Tags)
    mKeywords.innerHTML = '';
    data.keywords.forEach(kw => {
      const span = document.createElement('span');
      span.textContent = kw;
      mKeywords.appendChild(span);
    });

    // Fire Entrance Animation
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
  }

  // Event Listeners
  triggers.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-service')));
  });

  closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});


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

  // 1. CTA HIJACKER: Find all buttons meant to trigger contact
  const ctaButtons = document.querySelectorAll('a[href="#apply"], a[href^="mailto:daniidigitalpro"]');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // Stop page jump or email client open
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    });
  });

  // 2. MODAL CLOSING LOGIC
  const closePortal = () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = ''; 
    
    // Optional: Reset form and hide success state after modal closes
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
      e.preventDefault(); // Prevent standard page reload
      
      // UI Update: Sending state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Transmission in progress...';
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: new FormData(form),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success! Trigger the glassmorphism success screen
          successState.classList.add('active');
        } else {
          // API error
          alert("Network Error: Could not verify transmission. Please email us directly.");
        }
      } catch (error) {
        // Network/CORS error
        alert("System Error: Could not connect to endpoints. Please email us directly.");
      } finally {
        // Reset button state
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.opacity = '1';
        submitBtn.style.pointerEvents = 'auto';
      }
    });
  }
});
