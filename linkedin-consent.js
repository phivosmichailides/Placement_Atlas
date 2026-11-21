/* Optional LinkedIn Insight Tag for Placement Atlas.
   No LinkedIn request is made until a visitor explicitly opts in.
   Never forward programme, filter, account or profile information to the tag. */
(function () {
  'use strict';

  var STORAGE_KEY = 'placement-atlas-marketing-consent-v1';
  var PARTNER_ID = '10156098';
  var MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
  var loaded = false;
  var tagState = 'not-requested';
  var memoryChoice = null;

  function readChoice() {
    try {
      var value = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (value && (value.choice === 'allow' || value.choice === 'reject') &&
          Number.isFinite(value.at) && Date.now() >= value.at &&
          Date.now() - value.at < MAX_AGE_MS) return value.choice;
    } catch (error) { /* Browser storage may be disabled. */ }
    return memoryChoice;
  }

  function remember(choice) {
    memoryChoice = choice;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: choice, at: Date.now() }));
      return true;
    } catch (error) { return false; }
  }

  function safePage() {
    /* Only public pages with known non-sensitive campaign parameters qualify.
       Auth redirects, free-form query strings, and private fragments are excluded. */
    if (!/^\/(?:|index\.html|about\.html|guide\.html|privacy\.html|terms\.html)$/.test(window.location.pathname)) return false;
    if (window.location.hash && !/^#(?:top|features|how-it-works|questions|cookies)$/.test(window.location.hash)) return false;
    var params = new URLSearchParams(window.location.search);
    var allowed = true;
    params.forEach(function (value, key) {
      if (!/^(?:utm_[a-z0-9_]+|li_fat_id|gclid|fbclid)$/i.test(key) ||
          value.length > 300) allowed = false;
    });
    return allowed;
  }

  function loadLinkedIn() {
    if (loaded || !safePage() || readChoice() !== 'allow') return;
    if (document.getElementById('atlas-linkedin-insight-script')) {
      loaded = true;
      return;
    }
    loaded = true;
    tagState = 'loading';
    window._linkedin_partner_id = PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    if (window._linkedin_data_partner_ids.indexOf(PARTNER_ID) === -1) {
      window._linkedin_data_partner_ids.push(PARTNER_ID);
    }
    if (!window.lintrk) {
      window.lintrk = function (a, b) { window.lintrk.q.push([a, b]); };
      window.lintrk.q = [];
    }
    var script = document.createElement('script');
    script.id = 'atlas-linkedin-insight-script';
    script.async = true;
    script.addEventListener('load', function () { tagState = 'loaded'; });
    script.addEventListener('error', function () { tagState = 'blocked-or-unavailable'; });
    script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    document.head.appendChild(script);
    /* Deliberately no noscript image pixel: that would bypass consent. */
  }

  function closeNotice() {
    var current = document.getElementById('atlasCookieNotice');
    if (current) current.remove();
  }

  function choose(choice) {
    var wasLoaded = loaded;
    var persisted = remember(choice);
    closeNotice();
    if (choice === 'allow') {
      loadLinkedIn();
    } else if (wasLoaded && persisted) {
      /* An injected third-party script cannot be unloaded safely.
         Reloading removes it and prevents further tracking on this visit. */
      window.location.reload();
    }
  }

  function openSettings() {
    closeNotice();
    var previous = readChoice();
    var notice = document.createElement('aside');
    notice.id = 'atlasCookieNotice';
    notice.setAttribute('role', 'region');
    notice.setAttribute('aria-labelledby', 'atlasCookieHeading');
    notice.innerHTML = [
      '<div class="atlasCookieTop">',
      '<div><span class="atlasCookieEyebrow">Privacy choices</span>',
      '<h2 id="atlasCookieHeading">LinkedIn advertising cookies</h2></div>',
      previous ? '<button class="atlasCookieClose" type="button" aria-label="Close cookie settings">&#215;</button>' : '',
      '</div>',
      '<p>With your permission, LinkedIn can measure visits from our ads and help us understand campaign performance. This optional tracking may use cookies. You can use Placement Atlas normally without it.</p>',
      '<div class="atlasCookieActions">',
      '<button type="button" class="atlasCookieReject">Reject optional tracking</button>',
      '<button type="button" class="atlasCookieAllow">Allow LinkedIn tracking</button>',
      '</div>',
      '<div class="atlasCookieFooter"><a href="/privacy.html">Read our privacy policy</a>',
      previous ? '<span>Current choice: ' + (previous === 'allow' ? 'Allowed' : 'Rejected') + '</span>' : '',
      '</div>'
    ].join('');
    document.body.appendChild(notice);
    notice.querySelector('.atlasCookieReject').addEventListener('click', function () { choose('reject'); });
    notice.querySelector('.atlasCookieAllow').addEventListener('click', function () { choose('allow'); });
    var close = notice.querySelector('.atlasCookieClose');
    if (close) close.addEventListener('click', closeNotice);
  }

  function init() {
    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-atlas-cookie-settings]');
      if (trigger) {
        event.preventDefault();
        openSettings();
      }
    });

    var choice = readChoice();
    if (choice === 'allow') loadLinkedIn();
    else if (!choice) openSettings();
  }

  window.PlacementAtlasMarketing = {
    openSettings: openSettings,
    hasConsent: function () { return readChoice() === 'allow'; },
    tagStatus: function () { return { consent: readChoice(), eligiblePage: safePage(), state: tagState, scriptPresent: !!document.getElementById('atlas-linkedin-insight-script'), partnerId: PARTNER_ID }; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
