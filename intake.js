// Marque Studio — intake estimator + brief builder
(function () {
  'use strict';

  var form = document.getElementById('brief');
  if (!form) return;

  var STUDIO_EMAIL = 'odicheobiakarije@gmail.com'; // swap for hello@marquestudio when the domain is live

  var rangeEl = document.getElementById('est-range');
  var monthlyEl = document.getElementById('est-monthly');
  var itemsEl = document.getElementById('est-items');
  var noteEl = document.getElementById('brief-note');

  var money = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var round10 = function (n) { return Math.round(n / 10) * 10; };

  function checkedInputs(name) {
    return Array.prototype.slice.call(form.querySelectorAll('input[name="' + name + '"]:checked'));
  }

  function calc() {
    var items = [];
    var oneTime = 0;
    var monthly = 0;

    // size (base)
    var size = form.querySelector('input[name="size"]:checked');
    if (size) {
      var base = parseFloat(size.dataset.price) || 0;
      oneTime += base;
      items.push(size.value + ' — ' + money(base));
    }

    // features
    checkedInputs('features').forEach(function (el) {
      var p = parseFloat(el.dataset.price) || 0;
      oneTime += p;
      items.push(el.value + ' — +' + money(p));
    });

    // add-ons
    checkedInputs('addons').forEach(function (el) {
      var p = parseFloat(el.dataset.price) || 0;
      var m = parseFloat(el.dataset.monthly) || 0;
      oneTime += p;
      monthly += m;
      var label = el.value + ' — ' + (p ? '+' + money(p) + ' & ' : '') + (m ? money(m) + '/mo' : '');
      items.push(label);
    });

    // timeline multiplier
    var tl = form.querySelector('input[name="timeline"]:checked');
    var rush = tl ? (parseFloat(tl.dataset.rush) || 1) : 1;
    if (rush > 1) { oneTime *= rush; items.push('Rush delivery — +25%'); }

    var low = round10(oneTime * 0.9);
    var high = round10(oneTime * 1.15);
    return { low: low, high: high, monthly: monthly, items: items };
  }

  function render() {
    var r = calc();
    if (rangeEl) rangeEl.textContent = money(r.low) + ' – ' + money(r.high);
    if (monthlyEl) {
      if (r.monthly > 0) { monthlyEl.hidden = false; monthlyEl.textContent = '+ ' + money(r.monthly) + '/mo ongoing'; }
      else { monthlyEl.hidden = true; }
    }
    if (itemsEl) {
      itemsEl.innerHTML = '';
      r.items.forEach(function (t) {
        var li = document.createElement('li');
        li.textContent = t;
        itemsEl.appendChild(li);
      });
    }
  }

  form.addEventListener('change', render);
  form.addEventListener('input', render);
  render();

  // ---- Build the brief text ----
  function val(name) { var el = form.querySelector('[name="' + name + '"]'); return el ? el.value.trim() : ''; }
  function multi(name) { return checkedInputs(name).map(function (el) { return el.value; }).join(', ') || '—'; }
  function single(name) { var el = form.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : '—'; }

  function buildBrief() {
    var r = calc();
    var L = [];
    L.push('— MARQUE STUDIO · PROJECT BRIEF —', '');
    L.push('ABOUT YOU');
    L.push('Name:   ' + (val('name') || '—'));
    L.push('Email:  ' + (val('email') || '—'));
    L.push('Phone:  ' + (val('phone') || '—'));
    L.push('', 'THE PROJECT');
    L.push('Type:      ' + single('type'));
    L.push('Size:      ' + single('size'));
    L.push('Features:  ' + multi('features'));
    L.push('Add-ons:   ' + multi('addons'));
    L.push('Timeline:  ' + single('timeline'));
    L.push('Launch:    ' + (val('launch') || '—'));
    L.push('', 'THE FEEL');
    L.push('Vibe:      ' + multi('vibe'));
    L.push('Colours:   ' + (val('colours') || '—'));
    L.push('Admires:   ' + (val('admire') || '—'));
    L.push('Assets:    ' + single('assets'));
    L.push('Vision:    ' + (val('vision') || '—'));
    L.push('', 'BUDGET');
    L.push('Comfort:   ' + single('budget'));
    L.push('Estimate:  ' + money(r.low) + ' – ' + money(r.high) + (r.monthly > 0 ? ' + ' + money(r.monthly) + '/mo' : ''));
    return L.join('\n');
  }

  function validate() {
    var name = val('name'), email = val('email');
    if (!name || !email || email.indexOf('@') === -1) {
      if (noteEl) { noteEl.textContent = 'Please add your name and a valid email so we can reply.'; noteEl.className = 'cform__note is-err'; }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return false;
    }
    return true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var subject = 'Project brief — ' + (val('name') || 'New enquiry');
    var body = buildBrief();
    window.location.href = 'mailto:' + STUDIO_EMAIL + '?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    if (noteEl) { noteEl.textContent = 'Opening your email app with your brief… if nothing happens, tap “Copy brief instead”.'; noteEl.className = 'cform__note is-ok'; }
  });

  var copyBtn = document.getElementById('copyBrief');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      if (!validate()) return;
      var text = buildBrief();
      var done = function () {
        if (noteEl) { noteEl.textContent = 'Brief copied — paste it into an email to hello@marquestudio and hit send.'; noteEl.className = 'cform__note is-ok'; }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
      } else { fallbackCopy(text, done); }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {
      if (noteEl) { noteEl.textContent = 'Could not copy automatically — please email us directly.'; noteEl.className = 'cform__note is-err'; }
    }
    document.body.removeChild(ta);
  }
})();
