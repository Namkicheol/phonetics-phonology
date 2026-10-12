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
