(function (win) {
  var doc = document, docEl = doc.documentElement, appVer = win.navigator.appVersion;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  //var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 1, scale, tid;

  //var isAndroid = win.navigator.appVersion.match(/android/gi);
  var isIPhone = appVer.match(/iphone/gi);
  var devicePixelRatio = win.devicePixelRatio;
  if (isIPhone) {
    // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
    if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
      dpr = 3;
    } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
      dpr = 2;
    } else {
      dpr = 1;
    }
  } else {
    // 其他设备下，仍旧使用1倍的方案
    dpr = 1;
  }
  scale = 1 / dpr;

  docEl.setAttribute('data-dpr', "" + dpr);
  if (metaEl) {
    metaEl.parentNode.removeChild(metaEl);
  }
  metaEl = doc.createElement('meta');
  metaEl.setAttribute('name', 'viewport');
  metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(metaEl);
  } else {
    var wrap = doc.createElement('div');
    wrap.appendChild(metaEl);
    doc.write(wrap.innerHTML);
  }

  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 540) {
      width = 540 * dpr;
    }
    var rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    win.rem = rem;
    // flexible.rem = win.rem = rem;
  }

  win.addEventListener('resize', function () {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);

  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
  }
  refreshRem();
})(window);