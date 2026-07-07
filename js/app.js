var WineCabinetApp = (function() {
  var STORAGE_KEY = 'wine_cabinet_data';
  var DATA_VERSION = 7;

  function generateId(prefix) {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
  }

  function escapeHtml(str, allowBr) {
    if (!str) return '';
    var s = String(str);
    if (allowBr) {
      s = s.replace(/<br\s*\/?>/gi, '\n');
    }
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(s));
    var escaped = div.innerHTML;
    if (allowBr) {
      escaped = escaped.replace(/\n/g, '<br>');
    }
    return escaped;
  }

  function getDefaultData() {
    var today = new Date();
    var nextMonth = new Date(today);
    nextMonth.setDate(nextMonth.getDate() + 20);
    var nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 10);
    var farFuture = new Date(today);
    farFuture.setFullYear(farFuture.getFullYear() + 2);

    return {
      version: DATA_VERSION,
      user: { name: '酒友', avatar: '', isLoggedIn: false },
      wines: [
        { id: 'w1', name: '品味舍得', brand: '舍得', type: '浓香', degree: 52, capacity: 500, quantity: 1, agingYears: null, productionYear: 2023, year: 2023, price: 598, status: 'cellared', tastingScore: 8.5, purchaseDate: '2024-01-15', notes: '浓香型白酒，口感醇厚', image: null, expiryDate: null },
        { id: 'w2', name: '智慧舍得', brand: '舍得', type: '浓香', degree: 52, capacity: 500, quantity: 1, agingYears: null, productionYear: 2022, year: 2022, price: 788, status: 'cellared', tastingScore: 9.0, purchaseDate: '2024-02-20', notes: '陈年老酒，香气幽雅', image: null, expiryDate: null },
        { id: 'w3', name: '普五第八代', brand: '五粮液', type: '浓香', degree: 52, capacity: 500, quantity: 1, agingYears: null, productionYear: 2023, year: 2023, price: 1099, status: 'cellared', tastingScore: 9.2, purchaseDate: '2024-03-10', notes: '浓香型典范，诸味协调', image: null, expiryDate: null },
        { id: 'w4', name: '国窖1573', brand: '泸州老窖', type: '浓香', degree: 52, capacity: 500, quantity: 1, agingYears: null, productionYear: 2023, year: 2023, price: 1199, status: 'opened', tastingScore: 9.1, purchaseDate: '2024-01-05', openDate: '2024-06-01', remaining: 350, notes: '窖香浓郁，绵甜爽净', image: null, expiryDate: null },
        { id: 'w5', name: '青花郎', brand: '郎酒', type: '酱香', degree: 53, capacity: 500, quantity: 1, agingYears: null, productionYear: 2022, year: 2022, price: 1298, status: 'cellared', tastingScore: 8.8, purchaseDate: '2024-04-12', notes: '酱香突出，优雅细腻', image: null, expiryDate: null },
        { id: 'w15', name: '奔富Bin389', brand: 'Penfolds', spec: '礼盒装', type: '其他', degree: 14.5, capacity: 750, quantity: 2, agingYears: null, productionYear: 2021, year: 2021, price: 388, status: 'cellared', tastingScore: 0, purchaseDate: '2025-12-01', notes: '澳洲名庄，适合陈年', image: null, expiryDate: farFuture.toISOString().slice(0, 10) },
        { id: 'w16', name: '青岛白啤', brand: '青岛', spec: '6罐装', type: '其他', degree: 4.1, capacity: 500, quantity: 1, agingYears: null, productionYear: 2026, year: 2026, price: 48, status: 'cellared', tastingScore: 0, purchaseDate: '2026-06-15', notes: '小麦白啤，口感清爽', image: null, expiryDate: nextMonth.toISOString().slice(0, 10) },
        { id: 'w17', name: '獭祭二割三分', brand: '獭祭', type: '其他', degree: 16, capacity: 720, quantity: 1, agingYears: null, productionYear: 2026, year: 2026, price: 328, status: 'cellared', tastingScore: 0, purchaseDate: '2026-06-20', notes: '日本清酒，花果香浓郁', image: null, expiryDate: nextWeek.toISOString().slice(0, 10) }
      ],
      tastingNotes: [
        { id: 't1', wineId: 'w3', wine: '五粮液 普五第八代', brand: '五粮液', date: '2024-06-15', score: 9.2, dimensions: { color: 9, aroma: 9, taste: 9, overall: 9 }, appearance: '无色透明，挂杯明显', aroma: '窖香浓郁，带有粮香和花果香', taste: '入口绵甜，诸味协调，尾净余长', notes: '不愧为浓香标杆，层次丰富', occasion: '家庭聚会' },
        { id: 't2', wineId: 'w4', wine: '泸州老窖 国窖1573', brand: '泸州老窖', date: '2024-06-10', score: 9.1, dimensions: { color: 9, aroma: 9, taste: 9, overall: 9 }, appearance: '清澈透明', aroma: '窖香突出，带有陈香', taste: '绵甜爽净，余香悠长', notes: '开瓶醒酒20分钟后口感更佳', occasion: '商务宴请' }
      ],
      wishlist: [
        { id: 'wish1', name: '飞天茅台', brand: '茅台', type: '酱香', degree: 53, capacity: 500, targetPrice: 2699, priority: 'high', notes: '抢购中，期待入手' },
        { id: 'wish2', name: '青花30复兴版', brand: '汾酒', type: '清香', degree: 53, capacity: 500, targetPrice: 1099, priority: 'medium', notes: '清香型顶级，想尝鲜' },
        { id: 'wish3', name: '康帝李奇堡', brand: 'DRC', spec: '干红', type: '其他', degree: 13, capacity: 750, targetPrice: 15000, priority: 'low', notes: '酒王，看看就好' }
      ],
      activities: [
        { id: 'a1', type: 'add', wine: '青岛白啤', date: new Date().toISOString().slice(0, 10) },
        { id: 'a2', type: 'open', wine: '国窖1573', date: '2024-06-28' },
        { id: 'a3', type: 'tasting', wine: '五粮液 普五第八代', score: 8.5, date: '2024-06-15' }
      ],
      settings: { theme: 'light' }
    };
  }

  function migrateData(data) {
    if (!data || !data.wines) return getDefaultData();
    var changed = false;
    if (!data.version || data.version < 5) {
      data.version = 5;
      data.wines.forEach(function(w) {
        if (w.degree && w.degree > 20 && w.type !== '其他' && w.expiryDate) {
          w.expiryDate = null;
          changed = true;
        }
      });
      if (!data.user) data.user = { name: '酒友', avatar: '', isLoggedIn: false };
      if (!data.tastingNotes) data.tastingNotes = [];
      if (!data.wishlist) data.wishlist = [];
      if (!data.activities) data.activities = [];
      if (!data.settings) data.settings = { theme: 'light' };
      changed = true;
    }
    if (!data.version || data.version < 6) {
      data.version = 6;
      var brRegex = /<br\s*\/?>/gi;
      data.wines.forEach(function(w) {
        if (w.notes) w.notes = w.notes.replace(brRegex, '\n');
        if (w.spec) w.spec = w.spec.replace(brRegex, ' ');
        if (w.name) w.name = w.name.replace(brRegex, ' ');
        if (w.brand) w.brand = w.brand.replace(brRegex, ' ');
      });
      if (data.tastingNotes) {
        data.tastingNotes.forEach(function(t) {
          if (t.notes) t.notes = t.notes.replace(brRegex, '\n');
          if (t.appearance) t.appearance = t.appearance.replace(brRegex, '\n');
          if (t.aroma) t.aroma = t.aroma.replace(brRegex, '\n');
          if (t.taste) t.taste = t.taste.replace(brRegex, '\n');
        });
      }
      changed = true;
    }
    if (!data.version || data.version < 7) {
      data.version = 7;
      data.wines.forEach(function(w) {
        if (w.agingYears === undefined) w.agingYears = null;
        if (w.productionYear === undefined) {
          if (w.year && w.year > 1900 && w.year < 2100) {
            w.productionYear = w.year;
          } else {
            w.productionYear = null;
          }
        }
      });
      changed = true;
    }
    return data;
  }

  function getData() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        var data = JSON.parse(saved);
        if (!data.version || data.version < DATA_VERSION) {
          data = migrateData(data);
          saveRaw(data);
        }
        return data;
      }
    } catch(e) {}
    var def = getDefaultData();
    saveRaw(def);
    return def;
  }

  function saveRaw(data) {
    data.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function saveData(data) {
    var cloned = JSON.parse(JSON.stringify(data));
    cloned.updatedAt = new Date().toISOString();
    if (typeof DataStore !== 'undefined' && DataStore.saveData) {
      try { DataStore.saveData(cloned); } catch(e) {}
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cloned));
    try { self.dispatchEvent(new CustomEvent('wine-data-updated')); } catch(e) {}
    return cloned;
  }

  function getWineById(id) {
    var data = getData();
    return data.wines.find(function(w) { return w.id === id; });
  }

  function getStats() {
    var data = getData();
    var wines = data.wines;
    var activeWines = wines.filter(function(w) { return w.status !== 'finished'; });
    var cellared = wines.filter(function(w) { return w.status === 'cellared'; });
    var opened = wines.filter(function(w) { return w.status === 'opened'; });
    var finished = wines.filter(function(w) { return w.status === 'finished'; });

    var totalCount = activeWines.reduce(function(sum, w) { return sum + (w.quantity || 1); }, 0);
    var totalValue = activeWines.reduce(function(sum, w) { return sum + (w.price || 0) * (w.quantity || 1); }, 0);
    var cellaredCount = cellared.reduce(function(sum, w) { return sum + (w.quantity || 1); }, 0);
    var openedCount = opened.reduce(function(sum, w) { return sum + (w.quantity || 1); }, 0);
    var finishedCount = finished.reduce(function(sum, w) { return sum + (w.quantity || 1); }, 0);

    var totalCapacity = activeWines.reduce(function(sum, w) {
      if (w.status === 'opened' && w.remaining != null) {
        return sum + w.remaining;
      }
      return sum + (w.capacity || 0) * (w.quantity || 1);
    }, 0);

    var today = new Date();
    var expiryAlerts = [];
    activeWines.forEach(function(w) {
      if (w.expiryDate) {
        var exp = new Date(w.expiryDate);
        var daysLeft = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
        if (daysLeft <= 60) {
          var isExpired = daysLeft < 0;
          expiryAlerts.push({
            id: w.id,
            name: (w.brand || '') + ' ' + (w.name || ''),
            type: w.type,
            spec: w.spec,
            daysLeft: daysLeft,
            isExpired: isExpired,
            expiryDate: w.expiryDate,
            urgent: daysLeft <= 7 || isExpired
          });
        }
      }
    });
    expiryAlerts.sort(function(a, b) { return a.daysLeft - b.daysLeft; });

    return {
      totalCount: totalCount,
      totalValue: totalValue,
      totalCapacity: totalCapacity,
      cellaredCount: cellaredCount,
      openedCount: openedCount,
      finishedCount: finishedCount,
      expiryAlerts: expiryAlerts,
      wines: wines
    };
  }

  function addWine(wine) {
    var data = getData();
    var defaults = {
      id: generateId('w'),
      status: 'cellared',
      quantity: 1,
      tastingScore: 0,
      expiryDate: null,
      createdAt: new Date().toISOString()
    };
    var newWine = Object.assign(defaults, wine);
    data.wines.unshift(newWine);
    data.activities.unshift({
      id: generateId('a'),
      type: 'add',
      wine: (newWine.brand || '') + ' ' + (newWine.name || ''),
      spec: newWine.spec || '',
      date: new Date().toISOString().slice(0, 10)
    });
    return saveData(data);
  }

  function updateWine(id, updates) {
    var data = getData();
    var idx = data.wines.findIndex(function(w) { return w.id === id; });
    if (idx === -1) return null;
    Object.assign(data.wines[idx], updates);
    return saveData(data);
  }

  function deleteWine(id) {
    var data = getData();
    var wine = data.wines.find(function(w) { return w.id === id; });
    if (!wine) return false;
    data.wines = data.wines.filter(function(w) { return w.id !== id; });
    data.tastingNotes = data.tastingNotes.filter(function(t) { return t.wineId !== id; });
    data.activities.unshift({
      id: generateId('a'),
      type: 'delete',
      wine: (wine.brand || '') + ' ' + (wine.name || ''),
      date: new Date().toISOString().slice(0, 10)
    });
    return saveData(data);
  }

  function formatCurrency(num) {
    if (num == null || isNaN(num)) return '—';
    var n = Number(num);
    if (n >= 10000) return '¥' + (n / 10000).toFixed(1) + '万';
    return '¥' + n.toLocaleString('zh-CN');
  }

  function addTastingNote(note) {
    var data = getData();
    var noteId = generateId('t');
    var wine = data.wines.find(function(w) { return w.id === note.wineId; });
    var noteObj = Object.assign({
      id: noteId,
      date: new Date().toISOString().slice(0, 10),
      dimensions: { color: 5, aroma: 5, taste: 5, overall: 5 }
    }, note);
    if (wine && !noteObj.brand) noteObj.brand = wine.brand || '';
    if (wine && !noteObj.wine) noteObj.wine = (wine.brand || '') + ' ' + (wine.name || '');
    data.tastingNotes.unshift(noteObj);
    if (wine) {
      wine.tastingScore = noteObj.score || 0;
      var notes = data.tastingNotes.filter(function(t) { return t.wineId === wine.id; });
      if (notes.length > 0) {
        wine.tastingScore = notes.reduce(function(sum, t) { return sum + (t.score || 0); }, 0) / notes.length;
        wine.tastingScore = Math.round(wine.tastingScore * 10) / 10;
      }
    }
    data.activities.unshift({
      id: generateId('a'),
      type: 'tasting',
      wine: (noteObj.brand || '') + ' ' + (note.wine || noteObj.wine || ''),
      score: noteObj.score,
      spec: noteObj.spec || '',
      date: noteObj.date
    });
    return saveData(data);
  }

  function exportData() {
    var data = getData();
    var safe = {
      version: data.version,
      wines: data.wines || [],
      tastingNotes: data.tastingNotes || [],
      wishlist: data.wishlist || [],
      activities: data.activities || [],
      settings: data.settings || { theme: 'light' },
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(safe, null, 2);
  }

  function importData(jsonStr) {
    try {
      var imported = JSON.parse(jsonStr);
      if (!imported || !imported.wines || !Array.isArray(imported.wines)) {
        return { success: false, message: '无效的备份文件：缺少酒品数据' };
      }
      var current = getData();
      var merged = {
        version: DATA_VERSION,
        user: current.user || { name: '酒友', avatar: '', isLoggedIn: false },
        wines: imported.wines || [],
        tastingNotes: imported.tastingNotes || [],
        wishlist: imported.wishlist || [],
        activities: imported.activities || [],
        settings: imported.settings || current.settings || { theme: 'light' },
        updatedAt: new Date().toISOString()
      };
      saveData(merged);
      return { success: true, message: '数据导入成功！已恢复 ' + merged.wines.length + ' 瓶酒' };
    } catch(e) {
      return { success: false, message: '文件格式错误，请选择正确的备份文件' };
    }
  }

  function deleteWishlist(id) {
    var data = getData();
    data.wishlist = data.wishlist.filter(function(w) { return w.id !== id; });
    return saveData(data);
  }

  function addWish(wish) {
    var data = getData();
    var defaults = {
      id: generateId('wish'),
      createdAt: new Date().toISOString()
    };
    var newWish = Object.assign(defaults, wish);
    data.wishlist.unshift(newWish);
    return saveData(data);
  }

  function toggleTheme() {
    var data = getData();
    if (!data.settings) data.settings = { theme: 'light' };
    data.settings.theme = data.settings.theme === 'dark' ? 'light' : 'dark';
    saveData(data);
    applyTheme(data.settings.theme);
    return data.settings.theme;
  }

  function applyTheme(theme) {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    } catch(e) {}
  }

  function getTheme() {
    var data = getData();
    return data.settings && data.settings.theme ? data.settings.theme : 'light';
  }

  function getStatusText(status) {
    var map = {
      'cellared': '在藏',
      'opened': '已开',
      'finished': '已饮完'
    };
    return map[status] || '未知';
  }

  function getStatusClass(status) {
    var map = {
      'cellared': 'success',
      'opened': 'primary',
      'finished': 'muted'
    };
    return map[status] || '';
  }

  function initTheme() {
    applyTheme(getTheme());
  }

  function init() {
    try {
      var data = getData();
      if (data && data.wines && !data.version) {
        data.version = DATA_VERSION;
        saveRaw(data);
      }
    } catch(e) {}
    try { initTheme(); } catch(e) {}
  }

  init();

  return {
    getData: getData,
    saveData: saveData,
    getWineById: getWineById,
    getStats: getStats,
    addWine: addWine,
    updateWine: updateWine,
    deleteWine: deleteWine,
    deleteWishlist: deleteWishlist,
    addWish: addWish,
    toggleTheme: toggleTheme,
    getTheme: getTheme,
    initTheme: initTheme,
    formatCurrency: formatCurrency,
    addTastingNote: addTastingNote,
    exportData: exportData,
    importData: importData,
    escapeHtml: escapeHtml,
    generateId: generateId,
    getStatusText: getStatusText,
    getStatusClass: getStatusClass
  };
})();
