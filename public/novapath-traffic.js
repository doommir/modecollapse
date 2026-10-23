/* NovaPath optional public-page traffic measurement. No network before consent.
 * Google runs only inside a static, hidden frame without application content.
 * Configure exact production hosts and reviewed, public paths on this script tag.
 */
(function () {
  'use strict';
  var script = document.currentScript;
  if (!script || window.__novapathTrafficV1) return;
  var settings = script.dataset;
  var hosts = (settings.npHosts || '').split(',').map(function (s) { return s.trim(); });
  var paths;
  try { paths = JSON.parse(settings.npPaths || '[]'); } catch (_) { return; }
  if (!Array.isArray(paths) || !paths.length || paths.some(function (p) {
    return typeof p !== 'string' || !/^\/(?:[a-z0-9._-]+\/?)*$/.test(p) || p.indexOf('..') !== -1;
  })) return;
  if (location.protocol !== 'https:' || hosts.indexOf(location.hostname) === -1) return;
  var privateRoot = settings.npMode === 'private-root';
  if (privateRoot && (paths.length !== 1 || paths[0] !== '/')) return;

  var KEY = 'novapath_sites_analytics_v1';
  var MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  var choice = readChoice();
  var frame = null;
  var frameReady = false;
  var lastPage = null;
  var banner = null;
  var preferenceButton = null;

  function privacySignal() {
    return navigator.globalPrivacyControl === true || [navigator.doNotTrack, navigator.msDoNotTrack, window.doNotTrack].some(function (v) {
      return v === '1' || v === 'yes';
    });
  }
  function publicPath() {
    if (location.protocol !== 'https:' || hosts.indexOf(location.hostname) === -1) return null;
    return paths.indexOf(location.pathname) === -1 ? null : location.pathname;
  }
  function readChoice() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && saved.version === 1 && ['granted', 'denied'].indexOf(saved.choice) !== -1 &&
          Number.isFinite(saved.updatedAt) && saved.updatedAt <= Date.now() && Date.now() - saved.updatedAt < MAX_AGE) return saved.choice;
    } catch (_) { /* A blocked storage API must not grant consent. */ }
    return null;
  }
  function allowed() { return choice === 'granted' && !privacySignal() && publicPath() !== null; }
  window.__novapathTrafficV1 = true;

  function removeFrame() {
    if (frame) { frame.remove(); frame = null; }
    frameReady = false;
    lastPage = null;
  }
  function sendPage() {
    if (!allowed() || !frame || !frameReady) return;
    var path = privateRoot ? '/app' : publicPath();
    if (lastPage === path) return;
    frame.contentWindow.postMessage({ type: 'np-traffic-pageview', host: location.hostname, path: path }, location.origin);
    lastPage = path;
  }
  function trackPage() {
    if (!allowed()) { removeFrame(); return; }
    if (!frame) {
      frame = document.createElement('iframe');
      frame.id = 'np-traffic-frame';
      frame.title = 'Optional traffic analytics';
      frame.hidden = true;
      frame.setAttribute('aria-hidden', 'true');
      frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      frame.referrerPolicy = 'no-referrer';
      frame.src = '/novapath-traffic-frame.html';
      var current = frame;
      frame.addEventListener('load', function () {
        if (frame !== current || !allowed()) return;
        frameReady = true;
        sendPage();
      });
      document.body.appendChild(frame);
    }
    sendPage();
  }
  function clearAnalyticsCookies() {
    // Only our two host-only analytics cookies; never touch product/session data.
    ['np_sites_ga', 'np_sites_ga_F8YDQS9BP4'].forEach(function (name) {
      document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure';
    });
  }
  function stop() {
    // Removing the browsing context stops its timers and future automatic events.
    removeFrame();
    clearAnalyticsCookies();
  }
  function select(value) {
    // A browser privacy signal always takes precedence over an Allow click.
    choice = value === 'granted' && !privacySignal() ? 'granted' : 'denied';
    try { localStorage.setItem(KEY, JSON.stringify({ version: 1, choice: choice, updatedAt: Date.now() })); } catch (_) { /* Choice lasts for this page. */ }
    closeBanner();
    if (allowed()) {
      trackPage();
    } else stop();
  }
  function element(tag, text) {
    var node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  }
  function closeBanner() {
    if (banner) { banner.remove(); banner = null; }
  }
  function openPreferences() {
    if (!publicPath() || !document.body) return;
    closeBanner();
    banner = element('section');
    banner.id = 'np-traffic-consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Optional traffic analytics');
    var heading = element('strong', 'Optional traffic analytics');
    banner.appendChild(heading);
    banner.appendChild(element('p', privacySignal()
      ? 'Your browser requests privacy, so optional analytics stays off.'
      : (privateRoot
        ? 'Allow NovaPath to use Google Analytics cookies to count visits to this app? We send only the site hostname and a general app label, never your page contents, searches, form contents or account details. You can change this choice at any time.'
        : 'Allow NovaPath to use Google Analytics cookies to count visits to public pages? We exclude private pages, searches, form contents and account details. You can change this choice at any time.')));
    var actions = element('div');
    actions.className = 'np-traffic-actions';
    var allow = element('button', 'Allow analytics');
    allow.type = 'button';
    allow.disabled = privacySignal();
    allow.addEventListener('click', function () { select('granted'); });
    var decline = element('button', 'Decline');
    decline.type = 'button';
    decline.addEventListener('click', function () { select('denied'); });
    var privacy = element('a', 'Privacy details');
    privacy.href = settings.npPrivacy || '/analytics-privacy.html';
    actions.appendChild(allow); actions.appendChild(decline); actions.appendChild(privacy);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }
  function mount() {
    if (!publicPath() || !document.body || preferenceButton) return;
    var style = element('style');
    style.textContent = '#np-traffic-consent,#np-traffic-preferences{font:14px/1.5 system-ui,sans-serif;color:#1d1d1f;box-sizing:border-box}#np-traffic-consent{position:fixed;z-index:2147483000;bottom:66px;left:16px;width:min(440px,calc(100vw - 32px));max-height:calc(100dvh - 96px);overflow:auto;background:#fff;border:1px solid #b9bec5;border-radius:16px;padding:20px;box-shadow:0 6px 30px #0002}#np-traffic-consent p{margin:10px 0 16px;font:inherit;color:inherit}#np-traffic-consent strong{font-size:16px}#np-traffic-consent .np-traffic-actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px}#np-traffic-consent button,#np-traffic-preferences{border:1px solid #62676e;background:#fff;color:#1d1d1f;border-radius:8px;padding:10px 14px;min-height:44px;cursor:pointer;font:inherit}#np-traffic-consent button:disabled{opacity:.55;cursor:default}#np-traffic-consent a{color:#164f8f;text-decoration:underline;padding:10px 0}#np-traffic-consent button:focus-visible,#np-traffic-consent a:focus-visible,#np-traffic-preferences:focus-visible{outline:3px solid #2463eb;outline-offset:3px}#np-traffic-preferences{position:fixed;left:16px;bottom:12px;z-index:2147482999;box-shadow:0 2px 10px #0001;font-size:12px}';
    document.head.appendChild(style);
    preferenceButton = element('button', 'Privacy choices');
    preferenceButton.id = 'np-traffic-preferences';
    preferenceButton.type = 'button';
    preferenceButton.addEventListener('click', openPreferences);
    document.body.appendChild(preferenceButton);
    if (choice === null && !privacySignal()) openPreferences();
  }
  function synchronize() {
    if (!publicPath()) {
      closeBanner();
      if (preferenceButton) { preferenceButton.remove(); preferenceButton = null; }
      removeFrame();
      return;
    }
    mount();
    if (privacySignal() || choice !== 'granted') { stop(); return; }
    trackPage();
  }
  // Observe navigation without reading titles, form fields, app data or query strings.
  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    history[method] = function () { var result = original.apply(this, arguments); synchronize(); return result; };
  });
  window.addEventListener('popstate', synchronize);
  window.addEventListener('pageshow', synchronize);
  window.addEventListener('focus', synchronize);
  document.addEventListener('visibilitychange', synchronize);
  window.addEventListener('storage', function (event) {
    if (event.key !== KEY && event.key !== null) return;
    choice = readChoice();
    if (!allowed()) stop();
    synchronize();
  });
  window.NovaPathTraffic = Object.freeze({ openPreferences: openPreferences, revoke: function () { select('denied'); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', synchronize, { once: true });
  else synchronize();
})();
