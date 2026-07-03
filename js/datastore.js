/**
 * 统一数据访问层 - DataStore
 * 本地缓存优先模式：同步读取本地缓存，后台自动与 Supabase 云端同步
 * 单用户共享模式：所有人看到同一份数据
 */

const DataStore = (function() {
  const STORAGE_KEY = 'wine_cabinet_data';
  const CONFIG_KEY = 'wine_cabinet_config';
  const CACHE_KEY = 'wine_cabinet_cache';
  const SYNC_STATUS_KEY = 'wine_cabinet_sync_status';
  const TABLE_NAME = 'app_data';
  const DATA_ID = 'main';

  let supabaseClient = null;
  let config = null;
  let localData = null;
  let isOnline = false;
  let isSyncing = false;
  let syncListeners = [];
  let cloudSyncTimer = null;
  let pendingPush = false;
  let supabaseLoaded = false;
  let supabaseLoading = false;

  const defaultConfig = {
    supabaseUrl: '',
    supabaseAnonKey: '',
    adminPassword: 'wine2026',
    useCloud: false
  };

  function getDefaultData() {
    return {
      user: { name: '酒友', avatar: '', isLoggedIn: false },
      wines: [
        { id: 'w1', name: '品味舍得', brand: '舍得', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2023, price: 598, status: 'cellared', tastingScore: 8.5, purchaseDate: '2024-01-15', notes: '浓香型白酒，口感醇厚', image: '', expiryDate: null },
        { id: 'w2', name: '智慧舍得', brand: '舍得', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2022, price: 788, status: 'cellared', tastingScore: 9.0, purchaseDate: '2024-02-20', notes: '陈年老酒，香气幽雅', image: '', expiryDate: null },
        { id: 'w3', name: '普五第八代', brand: '五粮液', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2023, price: 1099, status: 'cellared', tastingScore: 9.2, purchaseDate: '2024-03-10', notes: '浓香型典范，诸味协调', image: '', expiryDate: null },
        { id: 'w4', name: '国窖1573', brand: '泸州老窖', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2023, price: 1199, status: 'opened', tastingScore: 9.1, purchaseDate: '2024-01-05', openDate: '2024-06-01', remaining: 350, notes: '窖香浓郁，绵甜爽净', image: '', expiryDate: '2024-07-15' },
        { id: 'w5', name: '青花郎', brand: '郎酒', type: '白酒', degree: 53, capacity: 500, quantity: 1, year: 2022, price: 1298, status: 'cellared', tastingScore: 8.8, purchaseDate: '2024-04-12', notes: '酱香突出，优雅细腻', image: '', expiryDate: null },
        { id: 'w6', name: '东方红', brand: '剑南春', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2023, price: 899, status: 'cellared', tastingScore: 8.6, purchaseDate: '2024-05-08', notes: '芳香浓郁，纯正典雅', image: '', expiryDate: null },
        { id: 'w7', name: '特曲', brand: '泸州老窖', type: '白酒', degree: 52, capacity: 500, quantity: 2, year: 2023, price: 368, status: 'cellared', tastingScore: 8.0, purchaseDate: '2024-06-18', notes: '老字号特曲，性价比高', image: '', expiryDate: null },
        { id: 'w8', name: '梦之蓝M6+', brand: '洋河', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2023, price: 788, status: 'cellared', tastingScore: 8.4, purchaseDate: '2024-03-25', notes: '绵柔型，口感绵甜', image: '', expiryDate: null },
        { id: 'w9', name: '吞之乎', brand: '沱牌', type: '白酒', degree: 52, capacity: 750, quantity: 1, year: 2020, price: 398, status: 'opened', tastingScore: 8.2, purchaseDate: '2023-11-20', openDate: '2024-05-15', remaining: 500, notes: '高端酱香，陈香舒适', image: '', expiryDate: '2024-07-20' },
        { id: 'w10', name: '红坛酒鬼', brand: '酒鬼酒', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2022, price: 568, status: 'cellared', tastingScore: 8.3, purchaseDate: '2024-02-28', notes: '馥郁香型，前浓中清后酱', image: '', expiryDate: null },
        { id: 'w11', name: '古20', brand: '古井贡酒', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2023, price: 698, status: 'cellared', tastingScore: 8.7, purchaseDate: '2024-04-05', notes: '年份原浆，色清如水晶', image: '', expiryDate: null },
        { id: 'w12', name: '君品习酒', brand: '习酒', type: '白酒', degree: 53, capacity: 500, quantity: 1, year: 2023, price: 858, status: 'cellared', tastingScore: 8.9, purchaseDate: '2024-05-20', notes: '窖藏酱香，醇和丰满', image: '', expiryDate: null },
        { id: 'w13', name: '珍三十', brand: '珍酒', type: '白酒', degree: 53, capacity: 500, quantity: 0, year: 2021, price: 988, status: 'finished', tastingScore: 8.5, purchaseDate: '2023-09-10', openDate: '2024-01-20', finishDate: '2024-06-10', notes: '酒中珍品，酱香显著', image: '', expiryDate: null },
        { id: 'w14', name: '水晶剑', brand: '剑南春', type: '白酒', degree: 52, capacity: 500, quantity: 1, year: 2023, price: 489, status: 'cellared', tastingScore: 8.1, purchaseDate: '2024-06-01', notes: '大唐御酒，醇香典雅', image: '', expiryDate: null }
      ],
      tastingNotes: [
        { id: 't1', wineId: 'w3', wine: '五粮液 普五第八代', brand: '五粮液', date: '2024-06-15', score: 9.2, dimensions: { color: 9, aroma: 9, taste: 9, overall: 9 }, appearance: '无色透明，挂杯明显', aroma: '窖香浓郁，带有粮香和花果香', taste: '入口绵甜，诸味协调，尾净余长', notes: '不愧为浓香标杆，层次丰富', occasion: '家庭聚会' },
        { id: 't2', wineId: 'w4', wine: '泸州老窖 国窖1573', brand: '泸州老窖', date: '2024-06-10', score: 9.1, dimensions: { color: 9, aroma: 9, taste: 9, overall: 9 }, appearance: '清澈透明', aroma: '窖香突出，带有陈香', taste: '绵甜爽净，余香悠长', notes: '开瓶醒酒20分钟后口感更佳', occasion: '商务宴请' },
        { id: 't3', wineId: 'w9', wine: '沱牌 吞之乎', brand: '沱牌', date: '2024-05-20', score: 8.2, dimensions: { color: 8, aroma: 8, taste: 8, overall: 8 }, appearance: '微黄透明', aroma: '酱香突出，陈香舒适', taste: '细腻醇厚，回味悠长', notes: '750ml大瓶装，适合收藏', occasion: '独饮' }
      ],
      wishlist: [
        { id: 'wish1', name: '飞天茅台', brand: '茅台', type: '白酒', degree: 53, capacity: 500, targetPrice: 2699, priority: 'high', notes: '抢购中，期待入手' },
        { id: 'wish2', name: '青花30复兴版', brand: '汾酒', type: '白酒', degree: 53, capacity: 500, targetPrice: 1099, priority: 'medium', notes: '清香型顶级，想尝鲜' },
        { id: 'wish3', name: '内参', brand: '酒鬼酒', type: '白酒', degree: 52, capacity: 500, targetPrice: 1080, priority: 'medium', notes: '馥郁香型高端产品' },
        { id: 'wish4', name: '摘要', brand: '金沙', type: '白酒', degree: 53, capacity: 500, targetPrice: 798, priority: 'low', notes: '酱香型后起之秀' }
      ],
      activities: [
        { id: 'a1', type: 'open', wine: '国窖1573', date: '2024-06-28' },
        { id: 'a2', type: 'add', wine: '泸州老窖 特曲', date: '2024-06-18' },
        { id: 'a3', type: 'tasting', wine: '五粮液 普五第八代', score: 8.5, date: '2024-06-15' }
      ],
      settings: { theme: 'light' }
    };
  }

  function loadConfig() {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) { config = { ...defaultConfig, ...JSON.parse(saved) }; }
      else { config = { ...defaultConfig }; }
    } catch(e) { config = { ...defaultConfig }; }
    return config;
  }

  function saveConfig(newConfig) {
    config = { ...config, ...newConfig };
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    if (config.useCloud && config.supabaseUrl && config.supabaseAnonKey) {
      initSupabase();
      scheduleCloudSync(500);
    }
    return config;
  }

  function loadSupabaseSDK() {
    return new Promise(function(resolve, reject) {
      if (supabaseLoaded) { resolve(); return; }
      if (supabaseLoading) {
        var checkInterval = setInterval(function() {
          if (supabaseLoaded) { clearInterval(checkInterval); resolve(); }
        }, 100);
        return;
      }
      supabaseLoading = true;
      if (typeof supabase !== 'undefined' && supabase.createClient) {
        supabaseLoaded = true;
        supabaseLoading = false;
        resolve();
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = function() {
        supabaseLoaded = true;
        supabaseLoading = false;
        resolve();
      };
      script.onerror = function() {
        supabaseLoading = false;
        reject(new Error('Failed to load Supabase SDK'));
      };
      document.head.appendChild(script);
    });
  }

  async function initSupabase(url, anonKey) {
    if (url) config.supabaseUrl = url;
    if (anonKey) config.supabaseAnonKey = anonKey;
    if (!config.supabaseUrl || !config.supabaseAnonKey) { isOnline = false; return null; }
    try {
      await loadSupabaseSDK();
      if (typeof supabase !== 'undefined' && supabase.createClient) {
        supabaseClient = supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
          auth: { persistSession: true, storageKey: 'wine_cabinet_auth' }
        });
        isOnline = true;
        setSyncStatus('connecting');
        setTimeout(function() { performCloudSync(); }, 500);
      } else { isOnline = false; }
    } catch(e) { console.error('Supabase init failed:', e); isOnline = false; supabaseClient = null; }
    return supabaseClient;
  }

  function setSyncStatus(status, message) {
    const statusInfo = { status, message: message || '', lastSync: status === 'synced' ? new Date().toISOString() : getLastSyncTime() };
    localStorage.setItem(SYNC_STATUS_KEY, JSON.stringify(statusInfo));
    notifySync('status', statusInfo);
  }

  function getLastSyncTime() {
    try {
      const s = localStorage.getItem(SYNC_STATUS_KEY);
      return s ? JSON.parse(s).lastSync : null;
    } catch(e) { return null; }
  }

  function getSyncStatus() {
    try {
      const s = localStorage.getItem(SYNC_STATUS_KEY);
      return s ? JSON.parse(s) : { status: 'local', message: '本地模式' };
    } catch(e) { return { status: 'local', message: '本地模式' }; }
  }

  function loadLocalData() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) { localData = JSON.parse(cached); return localData; }
      const legacy = localStorage.getItem(STORAGE_KEY);
      if (legacy) { localData = JSON.parse(legacy); localStorage.setItem(CACHE_KEY, legacy); return localData; }
    } catch(e) {}
    localData = getDefaultData();
    saveToLocal(localData);
    return localData;
  }

  function saveToLocal(data) {
    data.updatedAt = new Date().toISOString();
    localData = data;
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
  }

  async function fetchCloudData() {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from(TABLE_NAME).select('*').eq('id', DATA_ID).maybeSingle();
      if (error) {
        if (error.code !== 'PGRST116' && error.code !== '42P01') {
          console.error('Fetch cloud error:', error.message);
        }
        return null;
      }
      if (data && data.data) {
        return typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
      }
      return null;
    } catch(e) { console.error('Fetch cloud exception:', e); return null; }
  }

  async function pushCloudData(data) {
    const dataToPush = data || localData;
    if (!supabaseClient) return false;
    try {
      setSyncStatus('syncing', '正在同步到云端...');
      const { error } = await supabaseClient
        .from(TABLE_NAME).upsert({ id: DATA_ID, data: dataToPush, updated_at: new Date().toISOString() }, { onConflict: 'id' });
      if (error) {
        console.error('Push cloud error:', error.message);
        setSyncStatus('error', '同步失败: ' + error.message);
        return false;
      }
      setSyncStatus('synced', '已同步');
      return true;
    } catch(e) {
      console.error('Push cloud exception:', e);
      setSyncStatus('error', '同步异常');
      return false;
    }
  }

  function scheduleCloudSync(delay) {
    if (!isOnline || !supabaseClient) return;
    if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(() => {
      performCloudSync();
    }, delay || 2000);
  }

  async function performCloudSync() {
    if (isSyncing || !isOnline || !supabaseClient) return;
    isSyncing = true;
    pendingPush = false;
    try {
      setSyncStatus('syncing', '正在从云端拉取数据...');
      const cloudData = await fetchCloudData();
      if (cloudData) {
        const cloudTime = cloudData.updatedAt ? new Date(cloudData.updatedAt).getTime() : 0;
        const localTime = localData.updatedAt ? new Date(localData.updatedAt).getTime() : 0;
        if (cloudTime > localTime + 1000) {
          saveToLocal(cloudData);
          notifySync('cloud-updated', localData);
          setSyncStatus('synced', '已从云端同步最新数据');
        } else if (localTime > cloudTime + 1000) {
          await pushCloudData(localData);
        } else {
          setSyncStatus('synced', '数据已是最新');
        }
      } else {
        await pushCloudData(localData);
      }
    } catch(e) {
      console.error('Cloud sync failed:', e);
      setSyncStatus('error', '同步失败');
    }
    isSyncing = false;
    if (pendingPush) {
      pendingPush = false;
      scheduleCloudSync(1000);
    }
  }

  function getData() { return localData; }

  function saveData(data, password) {
    if (config.adminPassword && password !== config.adminPassword && config.useCloud) {
      throw new Error('管理密码错误，无法保存修改');
    }
    const saved = saveToLocal(data);
    if (isOnline && supabaseClient) {
      pendingPush = true;
      scheduleCloudSync(1000);
    }
    return saved;
  }

  function requestPassword() {
    const pwd = prompt('请输入管理密码以修改数据（默认：wine2026）：');
    if (pwd === null) return null;
    if (pwd === config.adminPassword) return pwd;
    alert('密码错误！');
    return null;
  }

  function notifySync(event, data) { syncListeners.forEach(fn => { try { fn(event, data); } catch(e) {} }); }
  function onSync(listener) { syncListeners.push(listener); return () => { syncListeners = syncListeners.filter(l => l !== listener); }; }

  function isCloudEnabled() { return isOnline && config && config.useCloud; }
  function getConfig() {
    if (!config) loadConfig();
    return JSON.parse(JSON.stringify(config));
  }

  async function forceSyncNow() {
    if (!isOnline || !supabaseClient) return false;
    await performCloudSync();
    return true;
  }

  async function init() {
    loadConfig();
    loadLocalData();
    if (config.useCloud && config.supabaseUrl && config.supabaseAnonKey) {
      await initSupabase();
      setTimeout(function() { performCloudSync(); }, 1000);
      setInterval(function() { if (!isSyncing) performCloudSync(); }, 30000);
    }
  }

  return {
    init, initSupabase, getData, saveData, requestPassword, forceSyncNow,
    getConfig, saveConfig, onSync, isCloudEnabled, getSyncStatus, getLastSyncTime,
    loadLocalData, saveToLocal, getDefaultData, performCloudSync, scheduleCloudSync,
    pushCloudData, fetchCloudData,
    get isOnline() { return isOnline; },
    get isSyncing() { return isSyncing; },
    get supabaseClient() { return supabaseClient; }
  };
})();

if (typeof window !== 'undefined') { window.DataStore = DataStore; }
