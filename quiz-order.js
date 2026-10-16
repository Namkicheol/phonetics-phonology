(function () {
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch (_) { return null; }
  }

  function create(questions, options) {
    var original = questions.slice();
    var size = original.length;
    var key = options.saveKey || 'quiz_order_' + location.pathname;
    var saved = read(key);
    var order = saved && saved.order;
    var validOrder = order && ['ordered', 'random'].includes(order.mode)
      && Array.isArray(order.indices) && order.indices.length === size
      && new Set(order.indices).size === size
      && order.indices.every(function (i) { return Number.isInteger(i) && i >= 0 && i < size; });
    var progress = options.saveKey && saved && Array.isArray(saved.answers)
      && saved.answers.length === size && Number.isInteger(saved.cur)
      && saved.cur >= 0 && saved.cur < size ? saved : null;
    if (order && !validOrder) progress = null;
    var random = validOrder ? order.mode === 'random' : false;
    var indices = original.map(function (_, i) { return i; });
    var resultTimer;
    if (validOrder && (progress || !options.saveKey)) indices = order.indices.slice();
    else if (random) shuffle();
    apply();

    function shuffle() {
      indices = original.map(function (_, i) { return i; });
      for (var i = size - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var value = indices[i]; indices[i] = indices[j]; indices[j] = value;
      }
    }
    function apply() {
      indices.forEach(function (source, i) { questions[i] = original[source]; });
    }
    function snapshot() {
      return {mode: random ? 'random' : 'ordered', indices: indices.slice()};
    }
    function save(value) {
      try { localStorage.setItem(key, JSON.stringify(Object.assign({}, value, {order: snapshot()}))); }
      catch (_) { /* The current quiz still works when browser storage is unavailable. */ }
    }
    function reset() {
      clearTimeout(resultTimer);
      if (random) shuffle();
      else indices = original.map(function (_, i) { return i; });
      apply();
      try { localStorage.removeItem(key); } catch (_) {}
      save({});
      update();
    }
    function resultLater(callback) {
      clearTimeout(resultTimer);
      resultTimer = setTimeout(callback, 400);
    }

    if (!document.getElementById('quiz-order-style')) {
      var style = document.createElement('style');
      style.id = 'quiz-order-style';
      style.textContent = '.quiz-order{max-width:720px;margin:12px auto;padding:12px 14px;background:#fff;border:1px solid #dce9f0;border-radius:12px;box-sizing:border-box}.quiz-order-status{display:block;font-size:13px;color:#435c6b;margin-bottom:8px}.quiz-order-buttons{display:flex;flex-wrap:wrap;gap:8px}.quiz-order button{min-height:44px;max-width:100%;padding:9px 12px;border:1px solid #aac4d5;border-radius:8px;background:#f4f9fc;color:#1a5276;font:600 14px sans-serif;cursor:pointer;overflow-wrap:anywhere}.quiz-order button[aria-pressed="true"]{background:#1a5276;border-color:#1a5276;color:#fff}.quiz-order button:focus-visible{outline:3px solid #26a69a;outline-offset:2px}@media(max-width:760px){.quiz-order{margin:12px 8px}}';
      document.head.appendChild(style);
    }
    var panel = document.createElement('div');
    panel.className = 'quiz-order';
    var status = document.createElement('span');
    status.className = 'quiz-order-status';
    status.setAttribute('role', 'status');
    panel.appendChild(status);
    var buttons = document.createElement('div');
    buttons.className = 'quiz-order-buttons';
    panel.appendChild(buttons);
    var ordered = document.createElement('button');
    var shuffled = document.createElement('button');
    ordered.type = shuffled.type = 'button';
    ordered.textContent = '순서대로 새로 풀기';
    shuffled.textContent = '🔀 랜덤으로 새로 풀기';
    ordered.onclick = function () { random = false; options.restart(); };
    shuffled.onclick = function () { random = true; options.restart(); };
    buttons.appendChild(ordered);
    buttons.appendChild(shuffled);
    function update() {
      status.textContent = '문제 순서: ' + (random ? '랜덤' : '기본');
      ordered.setAttribute('aria-pressed', String(!random));
      shuffled.setAttribute('aria-pressed', String(random));
    }
    var anchor = document.getElementById('nav') || document.getElementById('qw');
    if (anchor) anchor.parentNode.insertBefore(panel, anchor);
    update();

    var popup = window.showScorePopup;
    if (typeof popup === 'function') {
      window.showScorePopup = function (correct, total, opts) {
        popup(correct, total, Object.assign({}, opts, {onRetry: options.restart}));
      };
    }
    return {progress: progress, save: save, reset: reset, snapshot: snapshot, resultLater: resultLater};
  }
  window.QuizOrder = {create: create};
})();
