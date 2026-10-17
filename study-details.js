/* Progressive enhancement for explanatory native details on study pages only. */
(function () {
  'use strict';
  var script = document.currentScript;

  function initialize() {
    if (!document.body.classList.contains('etwiki-learning')) return;
    var details = document.querySelectorAll('details');
    var enhanced = false;
    details.forEach(function (detail) {
      var summary = Array.prototype.find.call(detail.children, function (child) {
        return child.tagName === 'SUMMARY';
      });
      if (!summary || detail.classList.contains('ew-study-detail')
          || detail.getAttribute('data-study-details') === 'off') return;
      // Answers and self-checks retain their separate purpose and original labels.
      if (/(?:^|[\s-])(?:answer|check)(?:[\s-]|$)/.test(detail.className)
          || /^(?:해설 확인|판단과 이유 확인|확인 문제|적용 확인|정답|답안 확인)/.test(summary.textContent.trim())) return;

      var walker = document.createTreeWalker(summary, 4 /* SHOW_TEXT */);
      var nodes = [], node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue.trim()) nodes.push(node);
      }
      if (!nodes.length) return;
      // Keep the original title and its markup; remove only redundant UI wording.
      var first = nodes[0], last = nodes[nodes.length - 1];
      first.nodeValue = first.nodeValue.replace(/^\s*(?:설명 더 보기|더 깊이 보기|자세히(?: 보기)?)\s*[·:：]?\s*/, '');
      last.nodeValue = last.nodeValue.replace(/\s*[·:：]?\s*자세히 보기\s*$/, '');
      var label = document.createElement('span');
      label.className = 'ew-detail-label';
      label.textContent = '자세히 보기 ';
      var title = document.createElement('span');
      title.className = 'ew-detail-title';
      while (summary.firstChild) title.appendChild(summary.firstChild);
      var indicator = document.createElement('span');
      indicator.className = 'ew-detail-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      summary.appendChild(label);
      summary.appendChild(title);
      summary.appendChild(indicator);
      detail.classList.add('ew-study-detail');
      enhanced = true;
    });
    if (enhanced && !document.getElementById('ew-study-details-css')) {
      var link = document.createElement('link');
      link.id = 'ew-study-details-css';
      link.rel = 'stylesheet';
      link.href = new URL('study-details.css', script.src).href;
      document.head.appendChild(link);
    }
  }

  if (!/(?:_study|_concepts)\.html$/.test(window.location.pathname) || !script) return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
