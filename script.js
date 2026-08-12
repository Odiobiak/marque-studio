// Marque Studio — interactions
(function () {
  'use strict';

  // Year in footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Sticky nav border on scroll
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle('is-stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal on scroll
  var items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  items.forEach(function (el, i) {
    // gentle stagger for grouped items
    el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
    io.observe(el);
  });
})();
