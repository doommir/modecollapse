/* Google sees this empty, static document, never the application's DOM or URL.
 * No Google request occurs until the consenting parent supplies a public path.
 */
(function () {
  'use strict';
  if (window.parent === window || location.protocol !== 'https:' || location.search || location.hash) return;
  var ID = 'G-F8YDQS9BP4';
  var started = false;
  var lastPath = null;
  function privacySignal() {
    return navigator.globalPrivacyControl === true || [navigator.doNotTrack, navigator.msDoNotTrack, window.doNotTrack].some(function (v) {
      return v === '1' || v === 'yes';
    });
  }
  Object.defineProperty(window, 'ga-disable-' + ID, { get: privacySignal });
  function command() { window.npTrafficFrameLayer.push(arguments); }
  function fields(path) {
    return {
      page_location: location.origin + path, page_title: '', page_referrer: '', ignore_referrer: true,
      campaign_id: '', campaign_source: '', campaign_medium: '', campaign_name: '', campaign_term: '', campaign_content: ''
    };
  }
  window.addEventListener('message', function (event) {
    var data = event.data;
    if (event.source !== window.parent || event.origin !== location.origin || privacySignal() ||
        !data || data.type !== 'np-traffic-pageview' || data.host !== location.hostname ||
        typeof data.path !== 'string' || !/^\/(?:[a-z0-9._-]+\/?)*$/.test(data.path) || data.path.indexOf('..') !== -1) return;
    if (lastPath === data.path) return;
    if (!started) {
      started = true;
      window.npTrafficFrameLayer = [];
      command('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
      command('set', 'ads_data_redaction', true);
      command('set', 'url_passthrough', false);
      command('js', new Date());
    }
    command('config', ID, Object.assign(fields(data.path), {
      send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
      user_id: null, user_properties: {},
      cookie_domain: 'none', cookie_prefix: 'np_sites', cookie_expires: 30 * 24 * 60 * 60,
      cookie_update: false, cookie_flags: 'SameSite=Lax;Secure',
      linker: { accept_incoming: false, domains: [], decorate_forms: false }
    }));
    command('set', fields(data.path));
    command('event', 'page_view', Object.assign({ send_to: ID }, fields(data.path)));
    lastPath = data.path;
    if (!document.getElementById('np-traffic-google-tag')) {
      var tag = document.createElement('script');
      tag.id = 'np-traffic-google-tag';
      tag.async = true;
      tag.referrerPolicy = 'no-referrer';
      tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID + '&l=npTrafficFrameLayer';
      document.head.appendChild(tag);
    }
  });
})();
