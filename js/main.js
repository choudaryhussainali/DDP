document.addEventListener("DOMContentLoaded", () => {
  
  // ============================================================
  // APEX BRAND PRELOADER
  // ============================================================
  const preloader = document.getElementById('premium-preloader');
  const countEl = document.getElementById('loader-count');
  const barEl = document.getElementById('loader-bar');
  const paths = document.querySelectorAll('.ddp-path');
  const svgCanvas = document.querySelector('.ddp-vector-logo');
  
  if (preloader && countEl && paths.length > 0) {
    document.body.classList.add('loading-lock'); 
    
    setTimeout(() => { preloader.classList.add('text-active'); }, 100);
    
    const pathData = Array.from(paths).map(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length; 
      return { el: path, length: length };
    });

    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 2) + 1; 
      if (progress > 100) progress = 100;

      countEl.innerText = progress;

      // Fill the progress bar in perfect lockstep with the counter (0 -> 100%).
      if (barEl) barEl.style.width = progress + '%';

      const drawProgress = Math.min(progress / 86, 1);
      
      pathData.forEach(item => {
        item.el.style.strokeDashoffset = item.length - (item.length * drawProgress);
      });

      if (progress === 100) {
        clearInterval(interval);
        
        if (svgCanvas) { svgCanvas.classList.add('filled'); }
        
        setTimeout(() => {
          preloader.classList.add('loaded');
          
          const heroElements = document.querySelectorAll('.hero-elem');
          heroElements.forEach(el => el.classList.add('animate'));
          
          setTimeout(() => {
            document.body.classList.remove('loading-lock');
          }, 800); 
          
        }, 1100); 
      }
    }, 35); 
  }

  // ============================================================
  // 3D MAGNETIC TILT GALLERIES
  // ============================================================
  const tiltGalleries = document.querySelectorAll('.ddp-tilt-gallery, .ddp-tilt-card');
  tiltGalleries.forEach(gallery => {
    gallery.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return; 
      const rect = gallery.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const xRotate = -(y / 25); 
      const yRotate = (x / 25);
      
      let target = gallery.querySelector('.cert-card-inner');
      if (!target) target = gallery; // Fallback if it's the main gallery
      
      target.style.transform = `rotateX(${xRotate}deg) rotateY(${yRotate}deg)`;
      target.style.transition = 'transform 0.1s ease-out';
    });
    
    gallery.addEventListener('mouseleave', () => {
      let target = gallery.querySelector('.cert-card-inner');
      if (!target) target = gallery;
      target.style.transform = `rotateX(0deg) rotateY(0deg)`;
      target.style.transition = 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
    });
  });
});

// ============================================================
// BULLETPROOF CURSOR ENGINE
// ============================================================
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (dot && ring) {
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

  document.querySelectorAll('a, button, .svc-card, .insight-card, .testi-card, .cert-verify-btn').forEach(el => {
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
}

// ============================================================
// NAVBAR SCROLL
// ============================================================
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ============================================================
// PARTICLES
// ============================================================
const canvas = document.getElementById('particles');
if (canvas) {
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
}

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0) {
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => revObs.observe(el));
}

// ============================================================
// COUNTER ANIMATION
// ============================================================
const counters = document.querySelectorAll('.metric-num[data-count]');
if (counters.length > 0) {
  const cntObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute('data-count'));
        const prefix = el.getAttribute('data-prefix') || ''; 
        const span = el.querySelector('span'); 
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
}

// ============================================================
// METRIC BAR ANIMATION
// ============================================================
const bars = document.querySelectorAll('.metric-bar-fill');
if (bars.length > 0) {
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'barFill 1.5s ease forwards';
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => barObs.observe(b));
}

// ============================================================
// SMOOTH ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#' || id === '#apply') return; 
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ============================================================
// LIGHTBOX ENGINE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close');

  if (!modal || !modalImg) return;

  document.body.addEventListener('click', (e) => {
    const clickTarget = e.target.closest('.result-image, .cert-stack-image, .cert-stack-card');
    if (clickTarget) {
      e.preventDefault(); 
      const targetImage = clickTarget.querySelector('img');
      if (targetImage && targetImage.src) {
        modalImg.src = targetImage.src; 
        modal.classList.add('active'); 
      }
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
});

// ============================================================
// MAGNETIC SPOTLIGHT
// ============================================================
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

// ============================================================
// LIVE DASHBOARD SIMULATION ENGINE (DDP)
// ============================================================
(() => {
  const dashFeedData = [
    { type:'optimization', user:'Cold Traffic Launched — Meta Advantage+', avatar:'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop', color:'var(--dash-teal)', platform:'Meta', text:'New video creatives live to a fresh audience.', time:'just now' },
    { type:'optimization', user:'Retargeting Funnel Active — 14-day window', avatar:'https://images.unsplash.com/photo-1557838923-2985c318be48?w=100&h=100&fit=crop', color:'var(--dash-teal)', platform:'Meta', text:'Re-engaging website visitors and add-to-cart drop-offs.', time:'just now' },
    { type:'optimization', user:'Budget Scaled +20% — winning ad set', avatar:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop', color:'var(--dash-teal)', platform:'Google', text:'Shifted spend to the top-performing campaign.', time:'just now' },
    { type:'optimization', user:'Lookalike Audience Added — Google', avatar:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop', color:'var(--dash-lav)', platform:'Google', text:'1% lookalike built from past buyers.', time:'1m ago' },
    { type:'result', user:'Landing Page Test Live — Variant B winning', avatar:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop', color:'var(--gold)', platform:'Landing Page', text:'Higher conversion rate on the new page layout.', time:'3m ago' },
    { type:'result', user:'ROAS Target Hit — 8.6× this week', avatar:'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=100&h=100&fit=crop', color:'var(--gold)', platform:'Google', text:'Target exceeded this week. Engine scaling.', time:'5m ago' }
  ];

  const dashLiveUpdates = [
    { type:'optimization', user:'Creative Refresh — TikTok', avatar:'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop', color:'var(--dash-teal)', platform:'TikTok', text:'Injected 3 new UGC hooks into top of funnel.', time:'just now' },
    { type:'result', user:'CPA Dropped by 14%', avatar:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop', color:'var(--gold)', platform:'Meta', text:'Algorithm stabilized. Acquisition cost dropping.', time:'just now' }
  ];

  const icons = {
    msg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  };

  let currentTab = 'all';
  let liveIdx = 0;
  let feedItems = [...dashFeedData];

  const typeConfig = {
    result:       { label:'Performance', cls:'dash-chip-review' },
    optimization: { label:'Targeting',   cls:'dash-chip-comment' },
    dm:           { label:'Lead',        cls:'dash-chip-dm' },
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
      : currentTab === 'optimizations' ? items.filter(i => i.type === 'optimization')
      : items.filter(i => i.type === 'result');

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
    const cfg = typeConfig[item.type] || typeConfig.optimization;
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
    dashAnimateCounter('dashKpiImpressions', 'dashBarImpressions', 358000, '', 78, dashFormatNum);
    dashAnimateCounter('dashKpiLeads', 'dashBarLeads', 1625, '', 68);
    dashAnimateCounter('dashKpiConversion', 'dashBarConversion', 5.8, '%', 52);
    
    // Safety check for the new ROAS tile (won't crash if HTML isn't added yet)
    const roasTile = document.getElementById('dashKpiRoasRight');
    if(roasTile) {
        dashAnimateCounter('dashKpiRoasRight', 'dashBarRoasRight', 8.6, '×', 86);
    }

    setInterval(() => {
      const newItem = dashLiveUpdates[liveIdx % dashLiveUpdates.length];
      liveIdx++;
      feedItems.unshift(newItem); 
      if (feedItems.length > 30) feedItems.pop(); 
      dashRenderFeed([newItem], true);

      if (newItem.type === 'result') {
        dashShowToast(icons.star, 'Conversion Logged', 'New conversion tracked — Meta retargeting campaign', 'var(--gold)');
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

  window.addEventListener('DOMContentLoaded', () => {
    const dashSection = document.getElementById('live-operations');
    if (!dashSection) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(initDash, 400); 
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(dashSection);
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

    if(mBadge) mBadge.textContent = data.badge;
    if(mTitle) mTitle.innerHTML = data.title;
    if(mDesc) mDesc.textContent = data.desc;

    if(mDeliverables) {
      mDeliverables.innerHTML = '';
      data.deliverables.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        mDeliverables.appendChild(li);
      });
    }

    if(mKeywords) {
      mKeywords.innerHTML = '';
      data.keywords.forEach(kw => {
        const span = document.createElement('span');
        span.textContent = kw;
        mKeywords.appendChild(span);
      });
    }

    if(modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    }
  }

  function closeModal() {
    if(modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = ''; 
    }
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-service')));
  });

  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});

// ============================================================
// CTA & FORMSPREE ENGINE
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const contactModal = document.getElementById('contactModal');
  const closeContactModal = document.getElementById('closeContactModal');
  const form = document.getElementById('ddpStrategyForm');
  const successState = document.getElementById('formSuccessState');
  const submitBtn = document.getElementById('frmSubmitBtn');

  if (!contactModal) return;

  const ctaButtons = document.querySelectorAll('a[href="#apply"], a[href^="mailto:"]');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); 
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden'; 
    });
  });

  const closePortal = () => {
    contactModal.classList.remove('active');
    document.body.style.overflow = ''; 
    setTimeout(() => {
      if(form) form.reset();
      if(successState) successState.classList.remove('active');
    }, 500);
  };

  if(closeContactModal) closeContactModal.addEventListener('click', closePortal);
  const contactBackdrop = document.getElementById('contactModalBackdrop');
  if(contactBackdrop) contactBackdrop.addEventListener('click', closePortal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
      closePortal();
    }
  });

  if (form && submitBtn) {
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
          headers: { 'Accept': 'application/json' }
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
// MOBILE NAVIGATION — moved to shared js/nav-drawer.js
// (canonical drawer engine, mirrors the Insights page)
// ============================================================



// ============================================================
// MOBILE CURSOR KILL SWITCH
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(max-width: 1024px), (hover: none), (pointer: coarse)').matches) {
    document.querySelectorAll('.cursor-dot, .cursor-ring, .cursor').forEach(el => {
      el.remove();
    });
  }
});