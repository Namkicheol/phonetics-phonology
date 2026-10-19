(function () {
  'use strict';

  function allowedReturnUrl(value) {
    if (!value) return null;
    try {
      var url = new URL(value, window.location.href);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
      if (url.username || url.password) return null;
      if (url.origin === window.location.origin) return url.href;
      if (url.protocol !== 'https:') return null;
      if (url.origin === 'https://etwiki.net') return url.href;
      if (url.origin === 'https://namkicheol.github.io'
          && /^\/(?:englisheducation|linguistics|phonetics-phonology)(?:\/|$)/.test(url.pathname)) return url.href;
      return null;
    } catch (_) {
      return null;
    }
  }

  var params = new URLSearchParams(window.location.search);
  var explicitReturn = allowedReturnUrl(params.get('returnTo'));
  var referrer = allowedReturnUrl(document.referrer);
  var cardIdPattern = /^(?:general|education|linguistics)_20\d{2}_(?:(?:N|S|X|A|B)\d{2}(?:_(?:comp|sheep|essay))?|E[12]_\d{2}(?:_\d{1,2})?)$/;
  var legacyId = [params.get('return'), params.get('rid'), params.get('id')].find(function (value) {
    return cardIdPattern.test(value || '');
  }) || null;
  var legacyReturn = legacyId ? 'https://etwiki.net/index.html?id=' + encodeURIComponent(legacyId) : null;
  var destination = explicitReturn || legacyReturn || referrer || new URL('./index.html', window.location.href).href;
  var fallbackLabel = document.currentScript && document.currentScript.getAttribute('data-hub-label') || '학습 허브';
  var label = explicitReturn && params.get('returnLabel');
  if (!label && !explicitReturn && params.get('from')) label = params.get('from');
  label = (label || (explicitReturn || referrer ? '이전 페이지' : legacyReturn ? '전공기출 문제' : fallbackLabel)).trim().slice(0, 80);
  var button = document.getElementById('back-btn') || document.getElementById('testmaster-return-btn');

  if (!button) {
    button = document.createElement('a');
    button.id = 'back-btn';
    button.style.cssText = 'position:fixed;right:12px;bottom:16px;z-index:9999;display:inline-flex;align-items:center;justify-content:center;min-height:44px;max-width:calc(100vw - 24px);box-sizing:border-box;padding:10px 14px;border:1px solid #9bb9ca;border-radius:999px;background:#1a5276;color:#fff;box-shadow:0 4px 16px rgba(26,82,118,.28);font:700 13px/1.35 sans-serif;text-align:center;text-decoration:none;';
    document.body.appendChild(button);
  }

  button.style.minHeight = '44px';
  button.style.boxSizing = 'border-box';
  button.href = destination;
  button.textContent = '← ' + label + '로 돌아가기';
  button.style.display = 'inline-flex';
  button.setAttribute('aria-label', button.textContent.replace(/^←\s*/, ''));
  button.title = button.getAttribute('aria-label');
})();

/* Independent study-disclosure component; return navigation above is unchanged. */
(function () {
  'use strict';
  if (!/(?:_study|_concepts)\.html$/.test(window.location.pathname)
      || document.getElementById('ew-study-details-script')) return;
  var current = document.currentScript;
  if (!current || !current.src) return;
  var script = document.createElement('script');
  script.id = 'ew-study-details-script';
  script.src = new URL('study-details.js', current.src).href;
  document.head.appendChild(script);
})();

/* Note-to-exam/dictionary return context and reading-position restoration. */
(function () {
  'use strict';
  if (!window.location || !document.querySelectorAll) return;
  var here = new URL(window.location.href);
  var param = 'studyNoteReturn';
  var tokenParam = 'studyNoteRestore';
  function noteUrl(value) {
    try {
      var url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password) return null;
      if (url.origin !== 'https://etwiki.net' && url.origin !== 'https://namkicheol.github.io') return null;
      if (!/^\/(?:englisheducation|linguistics|phonetics-phonology|transformational-grammar)\/[^/]+(?:_study|_concepts)\.html$/.test(url.pathname)) return null;
      return url;
    } catch (_) { return null; }
  }
  function isDestination(url) {
    return url.protocol === 'https:' && !url.username && !url.password
      && ((url.origin === 'https://etwiki.net' && /^\/(?:(?:index|concept)\.html)?$/.test(url.pathname))
      || (url.origin === 'https://namkicheol.github.io' && /^\/testmaster\/(?:(?:index|concept)\.html)?$/.test(url.pathname)));
  }
  function read(key) {
    try { var shared = window.localStorage.getItem(key); if (shared) return JSON.parse(shared); } catch (_) {}
    try { return JSON.parse(window.sessionStorage.getItem(key)); } catch (_) { return null; }
  }
  function write(key, value) {
    try {
      var storage = window.localStorage;
      var records = [];
      for (var i = 0; i < storage.length; i++) {
        var existingKey = storage.key(i);
        if (existingKey && existingKey.indexOf('etwiki.study-note-view.v1:') === 0) {
          try { records.push({key: existingKey, time: JSON.parse(storage.getItem(existingKey)).time || 0}); }
          catch (_) { records.push({key: existingKey, time: 0}); }
        }
      }
      records.sort(function (a, b) { return b.time - a.time; });
      records.forEach(function (record, index) {
        if (index >= 79 || Date.now() - record.time >= 86400000) storage.removeItem(record.key);
      });
      storage.setItem(key, JSON.stringify(value)); return;
    } catch (_) {}
    try { window.sessionStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }
  var source = noteUrl(here.href);
  var returnUrl = noteUrl(here.searchParams.get(param));
  var storageKey = 'etwiki.study-note-view.v1:' + here.pathname;
  var initialToken = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  var initialSaved = false;
  var gestures = new WeakMap();
  function controls() { return Array.from(document.querySelectorAll('details, .sec, .section')); }
  function sectionParts(node) {
    var header = node.querySelector && node.querySelector('.sec-header, [aria-controls]');
    var id = header && header.getAttribute('aria-controls');
    return {header: header, body: id && document.getElementById(id)};
  }
  function isOpen(node) {
    if (node.tagName === 'DETAILS') return node.open;
    if (node.classList.contains('sec')) return node.classList.contains('open');
    var parts = sectionParts(node);
    return parts.body ? !parts.body.hidden : node.classList.contains('open');
  }
  function save(token) {
    write(storageKey + ':' + token, {token: token, url: here.origin + here.pathname,
      y: window.scrollY, time: Date.now(),
      open: controls().map(isOpen)});
  }
  if (source) {
    var restoreToken = here.searchParams.get(tokenParam);
    var saved = restoreToken && read(storageKey + ':' + restoreToken);
    if (restoreToken && saved && saved.token === restoreToken && saved.url === here.origin + here.pathname
        && Array.isArray(saved.open) && Number.isFinite(saved.time)
        && Date.now() - saved.time >= 0 && Date.now() - saved.time < 86400000) {
      function restoreControls() { controls().forEach(function (node, i) {
        if (typeof saved.open[i] !== 'boolean') return;
        if (node.tagName === 'DETAILS') node.open = saved.open[i];
        else {
          node.classList.toggle('open', saved.open[i]);
          var parts = sectionParts(node);
          if (parts.header) parts.header.setAttribute('aria-expanded', String(saved.open[i]));
          if (parts.body && !node.classList.contains('sec')) parts.body.hidden = !saved.open[i];
        }
      }); }
      restoreControls();
      var cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete(tokenParam);
      try { window.history.replaceState(window.history.state, '', cleanUrl.href); } catch (_) {}
      var cancelled = false;
      ['touchstart', 'wheel', 'pointerdown', 'keydown'].forEach(function (type) {
        window.addEventListener(type, function () { cancelled = true; }, {once: true, passive: true});
      });
      function restore() { if (!cancelled) { restoreControls(); window.scrollTo(0, Math.max(0, Number(saved.y) || 0)); } }
      requestAnimationFrame(restore);
      document.addEventListener('DOMContentLoaded', function () { requestAnimationFrame(restore); }, {once: true});
      window.addEventListener('load', function () { requestAnimationFrame(restore); }, {once: true});
      // Run after the legacy hash reveal handler so it cannot overwrite the reading position.
      window.addEventListener('pageshow', function () { requestAnimationFrame(restore); }, {once: true});
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(restore);
    }
  }
  if (!source && returnUrl && isDestination(here) && !document.getElementById('study-note-return')) {
    var nav = document.createElement('nav');
    nav.id = 'study-note-return';
    nav.setAttribute('aria-label', '공부하던 노트로 돌아가기');
    nav.className = 'study-note-return';
    var button = document.createElement('a');
    button.href = returnUrl.href;
    button.textContent = '← 공부하던 노트로';
    button.className = 'study-note-return-link';
    nav.appendChild(button);
    document.body.insertBefore(nav, document.body.firstChild);
  }
  function decorate(anchor, clicked, phase) {
    if (!anchor || anchor.hasAttribute('download') || anchor.closest('#study-note-return')) return;
    var url;
    try { url = new URL(anchor.getAttribute('href'), window.location.href); } catch (_) { return; }
    if (!isDestination(url)) return;
    if (source) {
      var gesture = gestures.get(anchor);
      var token = clicked ? (phase !== 'pointerdown' && gesture && Date.now() - gesture.time < 1500 ? gesture.token
        : Date.now().toString(36) + Math.random().toString(36).slice(2, 8)) : initialToken;
      if (clicked) {
        if (phase === 'click' || phase === 'auxclick') gestures.delete(anchor);
        else gestures.set(anchor, {token: token, time: Date.now()});
      }
      var origin = new URL(here);
      origin.searchParams.delete(param);
      origin.searchParams.set(tokenParam, token);
      if (clicked || !initialSaved) { save(token); initialSaved = true; }
      url.searchParams.set(param, origin.href);
      anchor.removeAttribute('target');
    } else if (returnUrl) url.searchParams.set(param, returnUrl.href);
    else return;
    anchor.href = url.href;
  }
  if (source || returnUrl) {
    document.querySelectorAll('a[href]').forEach(function (a) { decorate(a, false); });
    document.addEventListener('click', function (event) {
      if (event.defaultPrevented) return;
      decorate(event.target.closest && event.target.closest('a[href]'), true, 'click');
    }, true);
    document.addEventListener('auxclick', function (event) {
      decorate(event.target.closest && event.target.closest('a[href]'), true, 'auxclick');
    }, true);
    ['pointerdown', 'contextmenu'].forEach(function (type) {
      document.addEventListener(type, function (event) {
        decorate(event.target.closest && event.target.closest('a[href]'), true, type);
      }, true);
    });
  }
})();
