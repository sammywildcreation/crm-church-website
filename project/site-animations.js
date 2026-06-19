(function () {
  /* ── Inject styles ─────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent =
    '.crm-hidden {' +
    '  opacity: 0 !important;' +
    '  transform: translateY(30px) !important;' +
    '}' +
    '.crm-visible {' +
    '  opacity: 1 !important;' +
    '  transform: translateY(0) !important;' +
    '  transition: opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1) !important;' +
    '}';
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
