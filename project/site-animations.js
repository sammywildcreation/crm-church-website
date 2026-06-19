(function () {
  /* ── Inject styles ─────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    /* Hide default cursor site-wide */
    '*, *::before, *::after { cursor: none !important; }',

    /* Outer ring — smooth follower */
    '#crm-cursor {',
    '  position: fixed; top: 0; left: 0; z-index: 999999; pointer-events: none;',
    '  width: 36px; height: 36px; border-radius: 50%;',
    '  border: 2px solid #FDB52A;',
    '  background: rgba(80,15,80,0.10);',
    '  transform: translate(-50%,-50%);',
    '  transition: width .18s ease, height .18s ease, background .18s ease, opacity .2s ease;',
    '  will-change: left, top;',
    '}',
    '#crm-cursor.crm-hover {',
    '  width: 54px; height: 54px;',
    '  background: rgba(80,15,80,0.22);',
    '}',

    /* Centre dot — exact mouse position */
    '#crm-dot {',
    '  position: fixed; top: 0; left: 0; z-index: 999999; pointer-events: none;',
    '  width: 7px; height: 7px; border-radius: 50%;',
    '  background: #FDB52A;',
    '  transform: translate(-50%,-50%);',
    '  transition: opacity .2s ease;',
    '  will-change: left, top;',
    '}',

    /* Scroll animation base state */
    '.crm-hidden {',
    '  opacity: 0 !important;',
    '  transform: translateY(30px) !important;',
    '}',
    '.crm-visible {',
    '  opacity: 1 !important;',
    '  transform: translateY(0) !important;',
    '  transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1) !important;',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  /* ── Custom cursor ─────────────────────────────────────── */
  var ring = document.createElement('div'); ring.id = 'crm-cursor';
  var dot  = document.createElement('div'); dot.id  = 'crm-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  var mx = window.innerWidth  / 2;
  var my = window.innerHeight / 2;
  var rx = mx, ry = my;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  /* Smooth ring follows with lerp */
  (function loop() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  var HOVER_SEL = 'a, button, [role="button"], .pill-white, .pill-dark, .btn-send, .btn-cta, .play, .dl, .srow, .program-card, .contact-chip, .podcast-card';
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(HOVER_SEL)) ring.classList.add('crm-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(HOVER_SEL)) ring.classList.remove('crm-hover');
  });
  document.addEventListener('mouseleave', function () { ring.style.opacity='0'; dot.style.opacity='0'; });
  document.addEventListener('mouseenter', function () { ring.style.opacity='1'; dot.style.opacity='1'; });

  /* ── Scroll animations ─────────────────────────────────── */
  var SEL = [
    'h1','h2','h3','.script','.ref',
    '.sermon-card','.program-card','.podcast-card','.podcast-listen',
    '.ministry-tab','.pill-row','.center-row',
    '.footer-direction','.footer-col-2','.footer-col-3',
    '.stream-photos','.watch-btns',
    '.believe-col','.believe-photos',
    '.giving-card','.pastor-card','.stream-card',
    '.contact-chip','.form-card',
    '.ym-card','.ym-ministry-card','.ym-img-left','.ym-img-right',
    '.contact-hero-inner','.mandate .photo','.mandate-copy',
    'section > p','section > .lede','section > .sub',
  ].join(',');

  window.addEventListener('load', function () {
    var vp = window.innerHeight;
    var els = Array.from(document.querySelectorAll(SEL)).filter(function (el) {
      /* Skip elements already handled by existing scroll-pop system */
      return !el.classList.contains('scroll-pop') &&
             el.getBoundingClientRect().top > vp * 0.88;
    });

    els.forEach(function (el) { el.classList.add('crm-hidden'); });

    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        /* Stagger siblings that are also hidden */
        var peers = Array.from(el.parentElement.children).filter(function (c) {
          return c.classList.contains('crm-hidden');
        });
        var idx = peers.indexOf(el);
        setTimeout(function () {
          el.classList.remove('crm-hidden');
          el.classList.add('crm-visible');
        }, Math.max(0, idx) * 85);
        io.unobserve(el);
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

    els.forEach(function (el) { io.observe(el); });
  });
})();
