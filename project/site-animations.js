(function () {
  /* ── Inject styles ─────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = `
    .crm-hidden {
      opacity: 0 !important;
      transform: translateY(30px) !important;
    }
    .crm-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
      transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1) !important;
    }

    /* ── Bubble button ── */
    .btn-cta, .pill-dark {
      position: relative;
      border-radius: 6px !important;
      transition: all 0.2s ease !important;
      overflow: visible !important;
    }
    .btn-cta:active, .pill-dark:active {
      transform: scale(0.96) !important;
    }
    .btn-cta::before, .btn-cta::after,
    .pill-dark::before, .pill-dark::after {
      position: absolute;
      content: "";
      width: 150%;
      left: 50%;
      height: 100%;
      transform: translateX(-50%);
      z-index: -1;
      background-repeat: no-repeat;
      pointer-events: none;
    }

    /* Top bubbles */
    .btn-cta:hover::before, .pill-dark:hover::before {
      top: -70%;
      background-image:
        radial-gradient(circle, #500F50 20%, transparent 20%),
        radial-gradient(circle, transparent 20%, #500F50 20%, transparent 30%),
        radial-gradient(circle, #500F50 20%, transparent 20%),
        radial-gradient(circle, #FDB52A 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, #500F50 15%, transparent 20%),
        radial-gradient(circle, #FDB52A 20%, transparent 20%),
        radial-gradient(circle, #500F50 20%, transparent 20%),
        radial-gradient(circle, #500F50 20%, transparent 20%),
        radial-gradient(circle, #FDB52A 20%, transparent 20%);
      background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
      background-position: 50% 120%;
      animation: crm-top-bubbles 0.6s ease;
    }
    @keyframes crm-top-bubbles {
      0%   { background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%; }
      50%  { background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%; }
      100% {
        background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
        background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
      }
    }

    /* Bottom bubbles */
    .btn-cta:hover::after, .pill-dark:hover::after {
      bottom: -70%;
      background-image:
        radial-gradient(circle, #500F50 20%, transparent 20%),
        radial-gradient(circle, #FDB52A 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, #500F50 15%, transparent 20%),
        radial-gradient(circle, #500F50 20%, transparent 20%),
        radial-gradient(circle, #FDB52A 20%, transparent 20%),
        radial-gradient(circle, #500F50 20%, transparent 20%),
        radial-gradient(circle, #500F50 20%, transparent 20%);
      background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 20% 20%, 18% 18%;
      background-position: 50% 0%;
      animation: crm-bottom-bubbles 0.6s ease;
    }
    @keyframes crm-bottom-bubbles {
      0%   { background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%; }
      50%  { background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%; }
      100% {
        background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
        background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
      }
    }
  `;
  document.head.appendChild(style);

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
      return !el.classList.contains('scroll-pop') &&
             el.getBoundingClientRect().top > vp * 0.88;
    });

    els.forEach(function (el) { el.classList.add('crm-hidden'); });

    if (!els.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
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
