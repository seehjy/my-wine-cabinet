(function() {
  var navConfig = [
    { key: 'home', label: '首页', href: 'home.html', icon: 'home' },
    { key: 'collection', label: '酒柜', href: 'collection.html', icon: 'layout-grid' },
    { key: 'tasting', label: '品鉴', href: 'tasting.html', icon: 'pen-tool' },
    { key: 'wishlist', label: '心愿', href: 'wishlist.html', icon: 'heart' },
    { key: 'profile', label: '我的', href: 'profile.html', icon: 'user' }
  ];

  var iconPaths = {
    home: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'layout-grid': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    'pen-tool': '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>'
  };

  function getCurrentPage() {
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1);
    if (!filename || filename === 'index.html') return 'home';
    var pageMap = {
      'home.html': 'home',
      'collection.html': 'collection',
      'detail.html': 'collection',
      'add-wine.html': 'collection',
      'edit-wine.html': 'collection',
      'tasting.html': 'tasting',
      'tasting-form.html': 'tasting',
      'drinking-form.html': 'tasting',
      'wishlist.html': 'wishlist',
      'wishlist-form.html': 'wishlist',
      'profile.html': 'profile',
      'stats.html': 'profile',
      'login.html': 'profile'
    };
    return pageMap[filename] || 'home';
  }

  function renderBottomNav(activeKey) {
    var nav = document.createElement('nav');
    nav.className = 'bottom-nav';

    navConfig.forEach(function(item) {
      var isActive = item.key === activeKey;
      var link = document.createElement('a');
      link.href = item.href;
      link.className = isActive ? 'active' : '';
      link.setAttribute('data-nav-key', item.key);

      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '24');
      svg.setAttribute('height', '24');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '1.5');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
      svg.innerHTML = iconPaths[item.icon] || '';

      var label = document.createElement('span');
      label.className = 'nav-label';
      label.textContent = item.label;

      var indicator = document.createElement('span');
      indicator.className = 'nav-indicator';

      link.appendChild(svg);
      link.appendChild(label);
      link.appendChild(indicator);
      nav.appendChild(link);
    });

    document.body.appendChild(nav);
  }

  function renderHeader(options) {
    options = options || {};
    var title = options.title || '';
    var showBack = options.showBack !== false;
    var backUrl = options.backUrl || 'javascript:history.back()';
    var rightAction = options.rightAction || null;

    var header = document.createElement('header');
    header.className = 'page-header';
    header.style.paddingTop = '12px';
    header.style.paddingBottom = '12px';

    var leftDiv = document.createElement('div');
    leftDiv.style.display = 'flex';
    leftDiv.style.alignItems = 'center';
    leftDiv.style.gap = '12px';

    if (showBack) {
      var backLink = document.createElement('a');
      backLink.href = backUrl;
      backLink.className = 'back-btn';
      backLink.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
      leftDiv.appendChild(backLink);
    }

    var titleEl = document.createElement('h1');
    titleEl.className = 'page-title';
    titleEl.textContent = title;
    leftDiv.appendChild(titleEl);

    header.appendChild(leftDiv);

    if (rightAction) {
      var rightDiv = document.createElement('div');
      if (typeof rightAction === 'string') {
        rightDiv.innerHTML = rightAction;
      } else {
        rightDiv.appendChild(rightAction);
      }
      header.appendChild(rightDiv);
    }

    var statusBar = document.querySelector('.status-bar-placeholder');
    if (statusBar) {
      statusBar.parentNode.insertBefore(header, statusBar.nextSibling);
    } else {
      var mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.parentNode.insertBefore(header, mainContent);
      } else {
        document.body.insertBefore(header, document.body.firstChild);
      }
    }
  }

  function init() {
    var currentPage = getCurrentPage();
    var noNavPages = [
      'login.html',
      'add-wine.html',
      'edit-wine.html',
      'tasting-form.html',
      'drinking-form.html',
      'wishlist-form.html',
      'detail.html'
    ];
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1);

    if (noNavPages.indexOf(filename) === -1) {
      renderBottomNav(currentPage);
    }

    window.WineCabinetUI = {
      renderHeader: renderHeader,
      renderBottomNav: renderBottomNav,
      getCurrentPage: getCurrentPage
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
