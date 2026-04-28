(function () {
  var _ctx = null;
  var _lastOk = 0, _lastNg = 0, _lastResult = 0;

  function ac() {
    if (!_ctx) {
      try { _ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { return null; }
    }
    if (_ctx.state === 'suspended') _ctx.resume().catch(function(){});
    return _ctx;
  }

  function unlock() {
    document.removeEventListener('touchstart', unlock, true);
    document.removeEventListener('click', unlock, true);
    var c = ac(); if (!c) return;
    var buf = c.createBuffer(1, 1, 22050);
    var src = c.createBufferSource();
    src.buffer = buf; src.connect(c.destination); src.start(0);
    if (c.state === 'suspended') c.resume().catch(function(){});
  }
  document.addEventListener('touchstart', unlock, true);
  document.addEventListener('click', unlock, true);

  function tone(freq, type, t0, dur, vol) {
    var c = ac(); if (!c) return;
    var osc = c.createOscillator();
    var g = c.createGain();
    osc.connect(g); g.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  }

  // ── 전역 노출 ──────────────────────────────────────
  window.playOk = function () {
    var now = Date.now();
    if (now - _lastOk < 200) return;
    _lastOk = now;
    var c = ac(); if (!c) return;
    var t = c.currentTime;
    tone(659.25, 'sine', t,        0.12, 0.30);
    tone(783.99, 'sine', t + 0.09, 0.19, 0.26);
  };

  window.playNg = function () {
    var now = Date.now();
    if (now - _lastNg < 200) return;
    _lastNg = now;
    var c = ac(); if (!c) return;
    var t = c.currentTime;
    tone(293.66, 'triangle', t,        0.15, 0.16);
    tone(246.94, 'triangle', t + 0.12, 0.20, 0.12);
  };

  window.playResult = function (sc) {
    var now = Date.now();
    if (now - _lastResult < 1500) return;
    _lastResult = now;
    var c = ac(); if (!c) return;
    var t = c.currentTime;
    if (sc >= 70) {
      tone(523.25, 'sine', t,        0.13, 0.32);
      tone(659.25, 'sine', t + 0.13, 0.13, 0.32);
      tone(783.99, 'sine', t + 0.26, 0.13, 0.32);
      tone(1046.5,  'sine', t + 0.39, 0.44, 0.38);
    } else if (sc >= 50) {
      tone(523.25, 'sine', t,        0.13, 0.27);
      tone(659.25, 'sine', t + 0.13, 0.13, 0.27);
      tone(783.99, 'sine', t + 0.26, 0.36, 0.30);
    } else {
      tone(523.25, 'sine', t,        0.13, 0.22);
      tone(587.33, 'sine', t + 0.13, 0.32, 0.22);
    }
  };

  // showScorePopup 래핑 (팝업 뜰 때 결과음)
  var _osp = window.showScorePopup;
  if (typeof _osp === 'function') {
    window.showScorePopup = function (correct, total, opts) {
      _osp(correct, total, opts);
      var sc = Math.round(correct / total * 100);
      setTimeout(function () { window.playResult && window.playResult(sc); }, 200);
    };
  }
  // DOMContentLoaded 이후에도 래핑 시도 (로드 순서 대비)
  document.addEventListener('DOMContentLoaded', function () {
    if (window.showScorePopup && !window.showScorePopup._wrapped) {
      var _sp = window.showScorePopup;
      window.showScorePopup = function (correct, total, opts) {
        _sp(correct, total, opts);
        var sc = Math.round(correct / total * 100);
        setTimeout(function () { window.playResult && window.playResult(sc); }, 200);
      };
      window.showScorePopup._wrapped = true;
    }
  });

})();
