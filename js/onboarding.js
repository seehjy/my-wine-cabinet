var Onboarding = (function() {
  var STORAGE_KEY = 'wine_cabinet_onboarding';
  var TOAST_DURATION = 2500;

  function isFirstVisit() {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch(e) {
      return true;
    }
  }

  function markVisited() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        visited: true,
        firstVisit: new Date().toISOString()
      }));
    } catch(e) {}
  }

  function showWelcomeTour() {
    var overlay = document.createElement('div');
    overlay.id = 'onboarding-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(44,24,16,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;';
    
    overlay.innerHTML = '<div style="background:var(--color-background-elevated);border-radius:var(--radius-lg);max-width:400px;width:100%;padding:24px;position:relative;animation:onboarding-pop 0.3s ease;">' +
      '<div style="text-align:center;margin-bottom:20px;">' +
        '<div style="width:72px;height:72px;border-radius:var(--radius-full);background:linear-gradient(135deg,var(--color-primary),#DAA520);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">' +
          '<i data-lucide="wine" style="width:36px;height:36px;color:#fff;"></i>' +
        '</div>' +
        '<h2 style="font-family:var(--font-display);font-size:var(--text-2xl);font-weight:var(--font-bold);color:var(--color-text-primary);margin:0 0 8px;">欢迎来到我的酒柜</h2>' +
        '<p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin:0;">让我带您快速了解如何使用</p>' +
      '</div>' +
      '<div id="tour-steps" style="margin-bottom:24px;"></div>' +
      '<div style="display:flex;gap:12px;">' +
        '<button id="tour-skip" style="flex:1;height:44px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-background-elevated);color:var(--color-text-secondary);font-size:var(--text-base);font-family:var(--font-body);cursor:pointer;">跳过</button>' +
        '<button id="tour-next" style="flex:2;height:44px;border-radius:var(--radius-md);border:none;background:var(--color-primary);color:#fff;font-size:var(--text-base);font-weight:var(--font-medium);font-family:var(--font-body);cursor:pointer;">开始使用</button>' +
      '</div>' +
    '</div>';

    document.body.appendChild(overlay);

    var steps = [
      { icon: 'camera', title: '📷 AI拍照加酒', desc: '拍张酒瓶照片，AI自动识别酒品信息，还能帮您找标准产品图！' },
      { icon: 'wine', title: '🍷 管理酒柜', desc: '查看所有藏酒，记录开瓶、饮用、品鉴的每一个美好时刻。' },
      { icon: 'download', title: '💾 备份数据', desc: '记得定期备份数据，也可以配置Supabase实现云端同步。' }
    ];

    var currentStep = 0;
    var stepsContainer = overlay.querySelector('#tour-steps');
    var nextBtn = overlay.querySelector('#tour-next');
    var skipBtn = overlay.querySelector('#tour-skip');

    function renderStep() {
      var step = steps[currentStep];
      stepsContainer.innerHTML = '<div style="text-align:center;padding:16px;">' +
        '<div style="font-size:48px;margin-bottom:12px;">' + step.title.split(' ')[0] + '</div>' +
        '<h3 style="font-size:var(--text-lg);font-weight:var(--font-semibold);color:var(--color-text-primary);margin:0 0 8px;">' + step.title.substring(step.title.indexOf(' ') + 1) + '</h3>' +
        '<p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin:0;line-height:1.6;">' + step.desc + '</p>' +
      '</div>' +
      '<div style="display:flex;justify-content:center;gap:8px;margin-top:16px;">' +
        steps.map(function(_, i) {
          return '<div style="width:' + (i === currentStep ? '24px' : '8px') + ';height:8px;border-radius:4px;background:' + (i === currentStep ? 'var(--color-primary)' : 'var(--color-border)') + ';transition:all 0.3s;"></div>';
        }).join('') +
      '</div>';

      nextBtn.textContent = currentStep === steps.length - 1 ? '立即开始' : '下一步';
    }

    renderStep();

    nextBtn.addEventListener('click', function() {
      if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
      } else {
        closeTour();
      }
    });

    skipBtn.addEventListener('click', closeTour);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closeTour();
    });

    function closeTour() {
      markVisited();
      overlay.style.animation = 'onboarding-fade-out 0.2s ease forwards';
      setTimeout(function() {
        if (overlay.parentNode) overlay.remove();
      }, 200);
    }

    if (window.lucide) {
      lucide.createIcons();
    }

    addTourStyles();
  }

  function addTourStyles() {
    if (document.getElementById('onboarding-styles')) return;
    var style = document.createElement('style');
    style.id = 'onboarding-styles';
    style.textContent = '@keyframes onboarding-pop{0%{transform:scale(0.9);opacity:0}100%{transform:scale(1);opacity:1}}@keyframes onboarding-fade-out{0%{opacity:1}100%{opacity:0}}';
    document.head.appendChild(style);
  }

  function showConfirm(options) {
    return new Promise(function(resolve) {
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(44,24,16,0.6);z-index:9998;display:flex;align-items:center;justify-content:center;padding:20px;animation:confirm-fade-in 0.2s ease;';
      
      var type = options.type || 'info';
      var iconColor = {
        'danger': 'var(--state-error)',
        'warning': 'var(--state-warning)',
        'success': 'var(--state-success)',
        'info': 'var(--color-primary)'
      }[type];
      var iconName = {
        'danger': 'alert-triangle',
        'warning': 'alert-circle',
        'success': 'check-circle',
        'info': 'help-circle'
      }[type];

      var showCancel = options.showCancelButton !== false;
      var hasCustomHtml = !!options.html;

      var buttonsHtml = '';
      if (!hasCustomHtml) {
        buttonsHtml = '<div style="display:flex;gap:12px;">' +
          (showCancel ? '<button id="confirm-cancel" style="flex:1;height:44px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-background-elevated);color:var(--color-text-secondary);font-size:var(--text-base);font-family:var(--font-body);cursor:pointer;transition:opacity 0.15s;" onmouseenter="this.style.opacity=0.8" onmouseleave="this.style.opacity=1">' + (options.cancelText || '取消') + '</button>' : '') +
          '<button id="confirm-ok" style="flex:1;height:44px;border-radius:var(--radius-md);border:none;background:' + (type === 'danger' ? 'var(--state-error)' : 'var(--color-primary)') + ';color:#fff;font-size:var(--text-base);font-weight:var(--font-medium);font-family:var(--font-body);cursor:pointer;transition:opacity 0.15s;" onmouseenter="this.style.opacity=0.9" onmouseleave="this.style.opacity=1">' + (options.confirmText || '确定') + '</button>' +
        '</div>';
      }

      var contentHtml = hasCustomHtml ? options.html : '<p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin:0 0 24px;line-height:1.6;">' + (options.message || '确定要执行此操作吗？') + '</p>';

      overlay.innerHTML = '<div style="background:var(--color-background-elevated);border-radius:var(--radius-lg);max-width:340px;width:100%;padding:24px;text-align:center;animation:confirm-pop 0.25s ease;max-height:85vh;overflow-y:auto;">' +
        '<div style="width:56px;height:56px;border-radius:var(--radius-full);background:' + iconColor + '20;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">' +
          '<i data-lucide="' + iconName + '" style="width:28px;height:28px;color:' + iconColor + ';"></i>' +
        '</div>' +
        '<h3 style="font-size:var(--text-lg);font-weight:var(--font-semibold);color:var(--color-text-primary);margin:0 0 8px;">' + (options.title || '确认操作') + '</h3>' +
        contentHtml +
        buttonsHtml +
      '</div>';

      document.body.appendChild(overlay);

      if (window.lucide) {
        lucide.createIcons();
      }

      addConfirmStyles();

      if (typeof options.onBeforeShow === 'function') {
        options.onBeforeShow(overlay);
      }

      function close(result) {
        overlay.style.animation = 'confirm-fade-out 0.15s ease forwards';
        setTimeout(function() {
          if (overlay.parentNode) overlay.remove();
          resolve(result);
        }, 150);
      }

      var cancelBtn = overlay.querySelector('#confirm-cancel');
      var okBtn = overlay.querySelector('#confirm-ok');
      if (cancelBtn) cancelBtn.addEventListener('click', function() {
        if (typeof options.onCancel === 'function') options.onCancel();
        close(false);
      });
      if (okBtn) okBtn.addEventListener('click', function() {
        if (typeof options.onConfirm === 'function') options.onConfirm();
        close(true);
      });
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay && options.dismissible !== false) close(false);
      });
    });
  }

  function addConfirmStyles() {
    if (document.getElementById('confirm-styles')) return;
    var style = document.createElement('style');
    style.id = 'confirm-styles';
    style.textContent = '@keyframes confirm-pop{0%{transform:scale(0.85);opacity:0}100%{transform:scale(1);opacity:1}}@keyframes confirm-fade-in{0%{opacity:0}100%{opacity:1}}@keyframes confirm-fade-out{0%{opacity:1}100%{opacity:0}}';
    document.head.appendChild(style);
  }

  function showToast(message, type, duration) {
    type = type || 'info';
    duration = duration || TOAST_DURATION;

    var toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.cssText = 'position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:10000;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
      document.body.appendChild(toastContainer);
    }

    var bgColors = {
      'success': 'var(--state-success)',
      'error': 'var(--state-error)',
      'warning': 'var(--state-warning)',
      'info': 'var(--color-primary)'
    };
    var icons = {
      'success': 'check-circle',
      'error': 'x-circle',
      'warning': 'alert-triangle',
      'info': 'info'
    };

    var toast = document.createElement('div');
    toast.style.cssText = 'background:' + bgColors[type] + ';color:#fff;padding:12px 20px;border-radius:var(--radius-md);display:flex;align-items:center;gap:8px;font-size:var(--text-sm);box-shadow:0 4px 12px rgba(0,0,0,0.15);animation:toast-in 0.3s ease;pointer-events:auto;max-width:90vw;';
    toast.innerHTML = '<i data-lucide="' + icons[type] + '" style="width:18px;height:18px;flex-shrink:0;"></i><span>' + message + '</span>';

    toastContainer.appendChild(toast);
    if (window.lucide) {
      lucide.createIcons();
    }
    addToastStyles();

    setTimeout(function() {
      toast.style.animation = 'toast-out 0.3s ease forwards';
      setTimeout(function() {
        if (toast.parentNode) toast.remove();
      }, 300);
    }, duration);
  }

  function addToastStyles() {
    if (document.getElementById('toast-styles')) return;
    var style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = '@keyframes toast-in{0%{transform:translateY(-20px);opacity:0}100%{transform:translateY(0);opacity:1}}@keyframes toast-out{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-10px);opacity:0}}';
    document.head.appendChild(style);
  }

  function createEmptyState(options) {
    return '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 24px;text-align:center;">' +
      '<div style="width:80px;height:80px;border-radius:var(--radius-full);background:var(--color-background-muted);display:flex;align-items:center;justify-content:center;margin-bottom:16px;">' +
        '<i data-lucide="' + (options.icon || 'wine') + '" style="width:40px;height:40px;color:var(--color-text-tertiary);"></i>' +
      '</div>' +
      '<h3 style="font-size:var(--text-lg);font-weight:var(--font-semibold);color:var(--color-text-secondary);margin:0 0 8px;">' + (options.title || '暂无数据') + '</h3>' +
      '<p style="color:var(--color-text-tertiary);font-size:var(--text-sm);margin:0 0 20px;line-height:1.6;max-width:280px;">' + (options.message || '开始添加您的第一瓶酒吧') + '</p>' +
      (options.actionText ? '<a href="' + (options.actionLink || '#') + '" style="display:inline-flex;align-items:center;gap:8px;height:44px;padding:0 24px;border-radius:var(--radius-md);background:var(--color-primary);color:#fff;font-size:var(--text-base);font-weight:var(--font-medium);text-decoration:none;cursor:pointer;transition:opacity 0.15s;" onmouseenter="this.style.opacity=0.9" onmouseleave="this.style.opacity=1">' +
        '<i data-lucide="plus" style="width:18px;height:18px;"></i>' + options.actionText +
      '</a>' : '') +
    '</div>';
  }

  function showHelpTip(targetSelector, content, position) {
    position = position || 'bottom';
    var target = document.querySelector(targetSelector);
    if (!target) return;

    var tip = document.createElement('div');
    tip.className = 'help-tip';
    tip.style.cssText = 'position:absolute;background:var(--color-text-primary);color:#fff;padding:10px 14px;border-radius:var(--radius-md);font-size:var(--text-xs);max-width:200px;z-index:100;box-shadow:var(--shadow-lg);';
    tip.textContent = content;

    document.body.appendChild(tip);
    var rect = target.getBoundingClientRect();
    
    if (position === 'bottom') {
      tip.style.top = (rect.bottom + 8 + window.scrollY) + 'px';
      tip.style.left = (rect.left + rect.width/2 - 100) + 'px';
    }

    setTimeout(function() {
      tip.style.opacity = '0';
      tip.style.transition = 'opacity 0.3s';
      setTimeout(function() { if (tip.parentNode) tip.remove(); }, 300);
    }, 3000);
  }

  function init() {
    if (!window.WineCabinetApp) {
      window.WineCabinetApp = {};
    }
    window.WineCabinetApp.showToast = showToast;
    window.WineCabinetApp.showConfirm = showConfirm;
    window.WineCabinetApp.createEmptyState = createEmptyState;

    if (isFirstVisit() && window.location.pathname.indexOf('home.html') > -1) {
      setTimeout(function() {
        showWelcomeTour();
      }, 500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    isFirstVisit: isFirstVisit,
    showWelcomeTour: showWelcomeTour,
    showConfirm: showConfirm,
    showToast: showToast,
    createEmptyState: createEmptyState,
    showHelpTip: showHelpTip
  };
})();
