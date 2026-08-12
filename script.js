// Marque Studio — shared interactions
(function () {
  'use strict';

  // Year in footer
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Sticky nav border on scroll
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal on scroll
  var items = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      io.observe(el);
    });
  }

  // ---- Scrollable live previews (click to load, no outbound link) ----
  document.querySelectorAll('.case__play').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var stage = btn.closest('.case__stage');
      var frame = btn.closest('.case__frame');
      if (!stage || stage.dataset.loaded) return;
      var url = stage.getAttribute('data-embed');
      if (!url) return;

      var iframe = document.createElement('iframe');
      iframe.className = 'case__iframe';
      iframe.setAttribute('loading', 'lazy');
      iframe.setAttribute('title', 'Scrollable site preview');
      iframe.setAttribute('scrolling', 'yes');
      iframe.src = url;
      stage.innerHTML = '';
      stage.appendChild(iframe);
      stage.dataset.loaded = '1';

      var reset = frame ? frame.querySelector('.case__reset') : null;
      if (reset) {
        reset.hidden = false;
        reset.addEventListener('click', function () { location.reload(); });
      }
    });
  });

  // ---- Contact form → email draft ----
  var cform = document.getElementById('cform');
  if (cform) {
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('cform-note');
      var name = cform.name.value.trim();
      var email = cform.email.value.trim();
      var msg = cform.message.value.trim();
      if (!name || !email || !msg) {
        if (note) { note.textContent = 'Please add your name, email, and a message.'; note.className = 'cform__note is-err'; }
        return;
      }
      var subject = 'New enquiry — ' + name;
      var body = 'Name: ' + name + '\nEmail: ' + email + '\n\n' + msg;
      window.location.href = 'mailto:odicheobiakarije@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (note) { note.textContent = 'Opening your email app… if nothing happens, email hello@marquestudio directly.'; note.className = 'cform__note is-ok'; }
    });
  }
})();
