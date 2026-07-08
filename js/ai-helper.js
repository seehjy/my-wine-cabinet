/**
 * AI 辅助助手 - 图片上传/压缩/视觉识别/智能填充
 * 针对小白用户优化，提供更简单直观的操作体验
 */
const AIHelper = (function() {
  // ============ API 配置 ============
  // 小米 MiMo 多模态 API（支持图片识别）
  var _apiKeyPart1 = 'sk-cwbs827t2u3m5dtc57gca';
  var _apiKeyPart2 = 'suc810ha9fitrzfkjv4v831mxop';
  function getApiKey() {
    var savedKey = localStorage.getItem('mimo_api_key');
    return savedKey || (_apiKeyPart1 + _apiKeyPart2);
  }
  const DEEPSEEK_API_URL = 'https://api.xiaomimimo.com/v1/chat/completions';
  const DEEPSEEK_MODEL = 'mimo-v2.5';
  const CORS_PROXY_URL = 'https://api.allorigins.win/raw?url=';

  const TESSERACT_CDN = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
  let tesseractLoaded = false;
  let tesseractLoading = false;
  let ocrWorker = null;
  let recentWines = [];
  const MAX_RECENT = 8;

  // ============ MiMo 视觉识别 ============
  async function recognizeByVision(imageDataUrl, progressCb) {
    if (!getApiKey()) {
      throw new Error('MiMo API Key 未配置，请在设置页面输入');
    }

    var maxRetries = 2;
    var lastError = null;

    for (var retry = 0; retry <= maxRetries; retry++) {
      if (progressCb) progressCb({ stage: 'vision', percent: 30, message: retry > 0 ? 'AI识别重试中...' : 'AI视觉识别中...' });

      console.log('=== 开始 MiMo 视觉识别 (第' + (retry + 1) + '次) ===');
      console.log('图片大小:', imageDataUrl.length, 'bytes');

      try {
        var result = await _doRecognizeByVision(imageDataUrl, progressCb);
        
        if (result && result.brand && result.name) {
          console.log('识别成功，跳过重试');
          return result;
        }
        
        console.log('识别结果缺少品牌或名称，准备重试...');
        
      } catch(e) {
        lastError = e;
        console.error('MiMo 识别失败 (第' + (retry + 1) + '次):', e.message);
      }

      if (retry < maxRetries) {
        console.log('等待 1 秒后重试...');
        await new Promise(function(resolve) { setTimeout(resolve, 1000); });
      }
    }

    throw lastError || new Error('MiMo 视觉识别失败，已重试 ' + maxRetries + ' 次');
  }

  async function _doRecognizeByVision(imageDataUrl, progressCb) {

    var systemPrompt = `你是一个专业的酒品识别助手。用户会发一张酒的图片，你需要仔细识别酒标上的所有信息。

仔细观察图片，识别酒标上的文字信息。只输出JSON，不要任何其他文字。

字段定义：
- brand: 品牌名称（必须填写，如：茅台、五粮液、舍得、尊尼获加、青岛、张裕等）
- name: 酒名或系列（必须填写，如：飞天茅台、黑牌、舍得、纯生、解百纳等）
- type: 类型，从以下选项中选一个：白酒、红酒、啤酒、洋酒、黄酒、清酒、其他
- degree: 酒精度数，提取数字（如：53、40、14.5、4.5），注意看标签上的"度"、"%"、"vol"等标识
- capacity: 容量毫升数，提取数字（如：500、750、330），注意看标签上的"ml"、"L"等标识
- agingYears: 陈酿年数，提取数字或null（如：12、15）
- origin: 产地，如：贵州、四川、苏格兰、法国、山东等
- productionYear: 生产年份，提取4位数字或null

重要规则：
1. 仔细观察图片中的所有文字，尽可能识别出品牌和酒名
2. 即使不确定，也要根据图片内容填写品牌和名称，不要留空
3. 如果图片是酒瓶、酒标或酒盒，都属于酒类
4. 啤酒、红酒、白酒、洋酒、黄酒、清酒都是酒类，不要误判为非酒类
5. 必须只返回一行JSON，不要任何解释、不要markdown格式、不要换行

示例输出：
{"brand":"茅台","name":"飞天茅台","type":"白酒","degree":53,"capacity":500,"agingYears":null,"origin":"贵州","productionYear":null}
{"brand":"尊尼获加","name":"黑牌","type":"洋酒","degree":43,"capacity":750,"agingYears":12,"origin":"苏格兰","productionYear":null}
{"brand":"青岛","name":"纯生","type":"啤酒","degree":4.5,"capacity":500,"agingYears":null,"origin":"山东","productionYear":null}
{"brand":"张裕","name":"解百纳","type":"红酒","degree":12.5,"capacity":750,"agingYears":null,"origin":"山东","productionYear":null}
{"brand":"五粮液","name":"普五","type":"白酒","degree":52,"capacity":500,"agingYears":null,"origin":"四川","productionYear":null}`;

    var payload = {
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: '请识别这瓶酒的详细信息，只返回JSON' },
            { type: 'image_url', image_url: { url: imageDataUrl } }
          ]
        }
      ],
      temperature: 0.1,
      max_tokens: 4000
    };

    console.log('发送请求到:', DEEPSEEK_API_URL);

    var requestStartTime = Date.now();

    var timeoutPromise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error('请求超时（20秒）'));
      }, 20000);
    });

    try {
      var resp = await Promise.race([
        fetch(DEEPSEEK_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getApiKey()
          },
          body: JSON.stringify(payload)
        }),
        timeoutPromise
      ]);

      console.log('响应状态:', resp.status, ', 耗时:', Date.now() - requestStartTime, 'ms');

      if (!resp.ok) {
        var errText = await resp.text();
        console.error('API 错误:', errText);
        throw new Error('MiMo API 错误(' + resp.status + '): ' + errText.substring(0, 200));
      }

      var data = await resp.json();
      console.log('API 返回:', JSON.stringify(data).substring(0, 500));

      var content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
      var reasoningContent = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.reasoning_content;

      console.log('content:', content ? content.substring(0, 500) : '(空)');
      if (reasoningContent) {
        console.log('reasoning_content:', reasoningContent.substring(0, 500));
      }

      // 尝试多种方式解析 JSON，优先使用 content 字段
      var wineInfo = null;

      // 1. 先从 content 字段解析
      if (content) {
        // 尝试匹配 markdown 代码块中的 JSON
        var codeBlockMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
          try {
            wineInfo = JSON.parse(codeBlockMatch[1].trim());
            console.log('从 content 代码块解析成功');
          } catch(e) {}
        }

        // 尝试用大括号配对方式提取 JSON
        if (!wineInfo) {
          var candidates = extractAllJsonObjects(content);
          console.log('从 content 找到 ' + candidates.length + ' 个候选 JSON');
          for (var i = candidates.length - 1; i >= 0; i--) {
            try {
              var parsed = JSON.parse(candidates[i]);
              if (parsed && typeof parsed === 'object' && (parsed.brand || parsed.name)) {
                wineInfo = parsed;
                console.log('从 content 候选 JSON 解析成功（索引 ' + i + '）:', wineInfo);
                break;
              }
            } catch(e) {}
          }
        }

        // 尝试直接解析 content
        if (!wineInfo) {
          try {
            wineInfo = JSON.parse(content.trim());
            if (wineInfo && typeof wineInfo === 'object' && (wineInfo.brand || wineInfo.name)) {
              console.log('直接解析 content JSON 成功:', wineInfo);
            } else {
              wineInfo = null;
            }
          } catch(e) {}
        }
      }

      // 2. 如果 content 解析失败，尝试 reasoning_content
      if (!wineInfo && reasoningContent) {
        console.log('尝试从 reasoning_content 解析...');
        var reasoningCandidates = extractAllJsonObjects(reasoningContent);
        console.log('从 reasoning_content 找到 ' + reasoningCandidates.length + ' 个候选 JSON');
        for (var j = reasoningCandidates.length - 1; j >= 0; j--) {
          try {
            var parsed2 = JSON.parse(reasoningCandidates[j]);
            if (parsed2 && typeof parsed2 === 'object' && (parsed2.brand || parsed2.name)) {
              wineInfo = parsed2;
              console.log('从 reasoning_content 候选 JSON 解析成功（索引 ' + j + '）:', wineInfo);
              break;
            }
          } catch(e) {}
        }
      }

      // 3. 尝试从文字中提取关键信息
      if (!wineInfo) {
        console.log('尝试从文字中提取信息...');
        wineInfo = extractWineInfoFromText(content || reasoningContent || '');
      }

      if (!wineInfo || (!wineInfo.brand && !wineInfo.name)) {
        throw new Error('MiMo 返回格式异常: ' + fullContent.substring(0, 200));
      }

      console.log('解析结果（原始）:', wineInfo);

      // 标准化字段格式
      wineInfo = normalizeWineInfo(wineInfo);
      console.log('解析结果（标准化）:', wineInfo);

      if (wineInfo.error) throw new Error(wineInfo.error);

      if (progressCb) progressCb({ stage: 'vision_done', percent: 90, message: '识别完成' });
      return wineInfo;
    } catch(e) {
      console.error('MiMo API 直接调用失败:', e);
      if (e.message && e.message.includes('CORS') || e.message.includes('fetch')) {
        console.log('尝试使用 CORS 代理...');
        return await recognizeByVisionWithProxy(imageDataUrl, progressCb);
      }
      throw e;
    }
  }

  async function recognizeByVisionWithProxy(imageDataUrl, progressCb) {
    var maxRetries = 2;
    var lastError = null;

    for (var retry = 0; retry <= maxRetries; retry++) {
      if (progressCb) progressCb({ stage: 'vision', percent: 30, message: retry > 0 ? 'AI识别重试中...' : 'AI视觉识别中...' });

      console.log('=== 开始 MiMo 视觉识别(代理) (第' + (retry + 1) + '次) ===');

      try {
        var result = await _doRecognizeByVisionWithProxy(imageDataUrl, progressCb);
        
        if (result && result.brand && result.name) {
          console.log('识别成功，跳过重试');
          return result;
        }
        
        console.log('识别结果缺少品牌或名称，准备重试...');
        
      } catch(e) {
        lastError = e;
        console.error('MiMo 识别失败(代理) (第' + (retry + 1) + '次):', e.message);
      }

      if (retry < maxRetries) {
        console.log('等待 1 秒后重试...');
        await new Promise(function(resolve) { setTimeout(resolve, 1000); });
      }
    }

    throw lastError || new Error('MiMo 视觉识别失败(代理)，已重试 ' + maxRetries + ' 次');
  }

  async function _doRecognizeByVisionWithProxy(imageDataUrl, progressCb) {
    var systemPrompt = `你是一个专业的酒品识别助手。用户会发一张酒的图片，你需要仔细识别酒标上的所有信息。

仔细观察图片，识别酒标上的文字信息。只输出JSON，不要任何其他文字。

字段定义：
- brand: 品牌名称（必须填写，如：茅台、五粮液、舍得、尊尼获加、青岛、张裕等）
- name: 酒名或系列（必须填写，如：飞天茅台、黑牌、舍得、纯生、解百纳等）
- type: 类型，从以下选项中选一个：白酒、红酒、啤酒、洋酒、黄酒、清酒、其他
- degree: 酒精度数，提取数字（如：53、40、14.5、4.5），注意看标签上的"度"、"%"、"vol"等标识
- capacity: 容量毫升数，提取数字（如：500、750、330），注意看标签上的"ml"、"L"等标识
- agingYears: 陈酿年数，提取数字或null（如：12、15）
- origin: 产地，如：贵州、四川、苏格兰、法国、山东等
- productionYear: 生产年份，提取4位数字或null

重要规则：
1. 仔细观察图片中的所有文字，尽可能识别出品牌和酒名
2. 即使不确定，也要根据图片内容填写品牌和名称，不要留空
3. 如果图片是酒瓶、酒标或酒盒，都属于酒类
4. 啤酒、红酒、白酒、洋酒、黄酒、清酒都是酒类，不要误判为非酒类
5. 必须只返回一行JSON，不要任何解释、不要markdown格式、不要换行

示例输出：
{"brand":"茅台","name":"飞天茅台","type":"白酒","degree":53,"capacity":500,"agingYears":null,"origin":"贵州","productionYear":null}
{"brand":"尊尼获加","name":"黑牌","type":"洋酒","degree":43,"capacity":750,"agingYears":12,"origin":"苏格兰","productionYear":null}
{"brand":"青岛","name":"纯生","type":"啤酒","degree":4.5,"capacity":500,"agingYears":null,"origin":"山东","productionYear":null}
{"brand":"张裕","name":"解百纳","type":"红酒","degree":12.5,"capacity":750,"agingYears":null,"origin":"山东","productionYear":null}
{"brand":"五粮液","name":"普五","type":"白酒","degree":52,"capacity":500,"agingYears":null,"origin":"四川","productionYear":null}`;

    var payload = {
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: '请识别这瓶酒的详细信息，只返回JSON' },
            { type: 'image_url', image_url: { url: imageDataUrl } }
          ]
        }
      ],
      temperature: 0.1,
      max_tokens: 4000
    };

    var proxyUrl = CORS_PROXY_URL + encodeURIComponent(DEEPSEEK_API_URL);
    console.log('使用 CORS 代理:', proxyUrl);

    var proxyTimeoutPromise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error('代理请求超时（25秒）'));
      }, 25000);
    });

    var resp = await Promise.race([
      fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getApiKey()
        },
        body: JSON.stringify(payload)
      }),
      proxyTimeoutPromise
    ]);

    console.log('代理响应状态:', resp.status);

    if (!resp.ok) {
      var errText = await resp.text();
      console.error('代理 API 错误:', errText);
      throw new Error('MiMo API 错误(' + resp.status + '): ' + errText.substring(0, 200));
    }

    var data = await resp.json();
    console.log('代理 API 返回:', JSON.stringify(data).substring(0, 500));

    var content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    var reasoningContent = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.reasoning_content;

    var fullContent = content || reasoningContent;
    if (!fullContent) throw new Error('MiMo 返回为空');

    console.log('代理识别内容:', fullContent.substring(0, 500));

    // 使用相同的解析逻辑
    var wineInfo = null;
    var codeBlockMatch = fullContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      try { wineInfo = JSON.parse(codeBlockMatch[1].trim()); } catch(e) {}
    }
    if (!wineInfo) {
      var candidates = extractAllJsonObjects(fullContent);
      for (var i = candidates.length - 1; i >= 0; i--) {
        try {
          var parsed = JSON.parse(candidates[i]);
          if (parsed && typeof parsed === 'object' && (parsed.brand || parsed.name)) {
            wineInfo = parsed;
            break;
          }
        } catch(e) {}
      }
    }
    if (!wineInfo) {
      wineInfo = extractWineInfoFromText(fullContent);
    }

    if (!wineInfo || (!wineInfo.brand && !wineInfo.name)) {
      throw new Error('MiMo 返回格式异常: ' + fullContent.substring(0, 200));
    }

    console.log('代理解析结果:', wineInfo);

    if (wineInfo.error) throw new Error(wineInfo.error);

    if (progressCb) progressCb({ stage: 'vision_done', percent: 90, message: '识别完成' });
    return wineInfo;
  }

  // ============ 大括号配对提取所有 JSON 对象 ============
  function extractAllJsonObjects(text) {
    var results = [];
    var i = 0;
    while (i < text.length) {
      if (text[i] === '{') {
        // 找到配对的结束位置
        var depth = 0;
        var start = i;
        var inString = false;
        var escaped = false;
        for (var j = i; j < text.length; j++) {
          var c = text[j];
          if (inString) {
            if (escaped) { escaped = false; continue; }
            if (c === '\\') { escaped = true; continue; }
            if (c === '"') { inString = false; }
          } else {
            if (c === '"') inString = true;
            else if (c === '{') depth++;
            else if (c === '}') {
              depth--;
              if (depth === 0) {
                results.push(text.substring(start, j + 1));
                i = j + 1;
                break;
              }
            }
          }
          if (j === text.length - 1) {
            // 没有找到配对
            i = text.length;
            break;
          }
        }
      }
      i++;
    }
    return results;
  }

  // ============ 从文字中提取酒品信息 ============
  function extractWineInfoFromText(text) {
    var info = { brand: null, name: null, type: null, degree: null, capacity: null, agingYears: null, origin: null, productionYear: null };

    // 常见品牌列表
    var brands = ['茅台', '五粮液', '洋河', '泸州老窖', '剑南春', '汾酒', '郎酒', '古井贡酒', '舍得', '水井坊', '习酒', '国台', '珍酒', '西凤', '董酒', '双沟', '今世缘', '迎驾贡酒', '口子窖', '酒鬼酒', '四特酒', '白云边', '稻花香', '枝江', '黄鹤楼', '劲酒', '椰岛', '张裕', '长城', '奔富', '拉菲', '马爹利', '轩尼诗', '人头马', '芝华士', '尊尼获加', '百龄坛', '绝对伏特加', '灰雁', '百加得', '哈瓦那俱乐部', '摩根船长', '青岛', '雪花', '百威', '喜力', '嘉士伯', '科罗娜', '福佳', '教士', '麒麟', '朝日', '三得利'];

    // 尝试匹配品牌
    for (var i = 0; i < brands.length; i++) {
      if (text.includes(brands[i])) {
        info.brand = brands[i];
        break;
      }
    }

    // 尝试匹配度数 (如 52度、52°、52)
    var degreeMatch = text.match(/(\d{1,2})\s*[度°]/);
    if (!degreeMatch) degreeMatch = text.match(/(\d{1,2})%\s*(?:vol|酒精)/i);
    if (degreeMatch) info.degree = parseInt(degreeMatch[1]);

    // 尝试匹配容量 (如 500ml、500毫升、500mL)
    var capacityMatch = text.match(/(\d{3,4})\s*(?:ml|mL|毫升|ML)/);
    if (!capacityMatch) capacityMatch = text.match(/(\d{1})\s*(?:L|升)/);
    if (capacityMatch) info.capacity = parseInt(capacityMatch[1]);

    // 尝试匹配类型
    var types = {
      '酱香': '酱香', '浓香': '浓香', '清香': '清香', '兼香': '兼香',
      '米香': '米香', '凤香': '凤香', '芝麻香': '芝麻香', '特香': '特香',
      '老白干': '老白干', '馥郁香': '馥郁香', '董香': '董香',
      '红酒': '红酒', '葡萄酒': '红酒', '干红': '红酒', '干白': '红酒',
      '啤酒': '啤酒', '精酿': '啤酒', '生啤': '啤酒', '纯生': '啤酒',
      '洋酒': '洋酒', '威士忌': '洋酒', '伏特加': '洋酒', '白兰地': '洋酒', '龙舌兰': '洋酒', '朗姆酒': '洋酒',
      '黄酒': '黄酒', '清酒': '清酒', '白酒': '白酒'
    };
    for (var key in types) {
      if (text.includes(key)) {
        info.type = types[key];
        break;
      }
    }

    // 尝试匹配陈酿年数
    var agingMatch = text.match(/(\d{1,2})\s*年\s*(?:陈酿|陈|窖藏|窖)/);
    if (agingMatch) info.agingYears = parseInt(agingMatch[1]);

    // 尝试匹配生产年份
    var yearMatch = text.match(/(?:生产|出厂|灌装|日期).*?(\d{4})/);
    if (!yearMatch) yearMatch = text.match(/(\d{4})\s*年/);
    if (yearMatch) {
      var year = parseInt(yearMatch[1]);
      if (year >= 1900 && year <= 2030) info.productionYear = year;
    }

    // 尝试匹配产地
    var origins = ['贵州', '四川', '山西', '江苏', '安徽', '湖北', '湖南', '山东', '河南', '河北', '陕西', '江西', '广西', '广东', '福建', '浙江', '云南', '甘肃', '新疆', '宁夏', '内蒙古', '北京', '上海', '天津', '重庆', '遵义', '宜宾', '泸州', '汾阳', '宿迁', '亳州', '十堰', '岳阳', '潍坊', '澳大利亚', '法国', '智利', '美国', '意大利', '西班牙', '德国', '日本', '韩国'];
    for (var j = 0; j < origins.length; j++) {
      if (text.includes(origins[j])) {
        info.origin = origins[j];
        break;
      }
    }

    return info;
  }

  // ============ 标准化酒品信息 ============
  function normalizeWineInfo(info) {
    if (!info || typeof info !== 'object') return info;

    if (info.degree !== undefined && info.degree !== null) {
      if (typeof info.degree === 'string') {
        var degreeMatch = info.degree.match(/\d+(\.\d+)?/);
        info.degree = degreeMatch ? parseFloat(degreeMatch[0]) : null;
      } else if (typeof info.degree === 'number') {
        info.degree = info.degree;
      } else {
        info.degree = null;
      }
    }

    if (info.capacity !== undefined && info.capacity !== null) {
      if (typeof info.capacity === 'string') {
        var capMatch = info.capacity.match(/\d+/);
        info.capacity = capMatch ? parseInt(capMatch[0]) : null;
      } else if (typeof info.capacity === 'number') {
        info.capacity = info.capacity;
      } else {
        info.capacity = null;
      }
    }

    if (info.agingYears !== undefined && info.agingYears !== null) {
      if (typeof info.agingYears === 'string') {
        var agingMatch = info.agingYears.match(/\d+/);
        info.agingYears = agingMatch ? parseInt(agingMatch[0]) : null;
      } else if (typeof info.agingYears !== 'number') {
        info.agingYears = null;
      }
    }

    if (info.productionYear !== undefined && info.productionYear !== null) {
      if (typeof info.productionYear === 'string') {
        var yearMatch = info.productionYear.match(/\d{4}/);
        info.productionYear = yearMatch ? parseInt(yearMatch[0]) : null;
      } else if (typeof info.productionYear !== 'number') {
        info.productionYear = null;
      }
    }

    if (info.type && typeof info.type === 'string') {
      var typeMap = {
        '白酒': ['白酒', '酱香', '浓香', '清香', '兼香', '米香', '凤香', '芝麻香', '特香', '老白干', '馥郁香', '董香'],
        '红酒': ['红酒', '葡萄酒', '干红', '干白', '红葡萄酒', '白葡萄酒', '起泡酒', '香槟'],
        '洋酒': ['洋酒', '威士忌', '白兰地', '伏特加', '朗姆酒', '朗姆', '龙舌兰', '金酒', '马爹利', '轩尼诗', '人头马', '尊尼获加', '芝华士'],
        '啤酒': ['啤酒', '精酿', '生啤', '纯生', '黄啤', '白啤', '黑啤'],
        '黄酒': ['黄酒', '花雕', '加饭', '女儿红'],
        '清酒': ['清酒']
      };
      var originalType = info.type;
      for (var key in typeMap) {
        if (typeMap[key].some(function(t) { return originalType.includes(t); })) {
          info.type = key;
          break;
        }
      }
    }

    return info;
  }

  // ============ 商品图搜索（带重试和降级）============
  async function searchProductImage(query) {
    // 方案 1: 直接调用百度图片搜索
    try {
      var searchUrl = 'https://image.baidu.com/search/acjson?tn=resultjson_com&word=' +
        encodeURIComponent(query + ' 酒 官方 商品图') +
        '&pn=0&rn=10&ipn=rj&ie=utf-8&oe=utf-8';

      var resp = await fetch(searchUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });
      if (resp.ok) {
        var data = await resp.json();
        if (data.data && data.data.length > 0) {
          var valid = data.data.filter(function(item) {
            return item && item.thumbURL && item.width && item.height &&
              item.width >= 200 && item.height >= 200;
          });
          if (valid.length > 0) {
            valid.sort(function(a, b) {
              var aDiff = Math.abs((a.width || 0) - (a.height || 0));
              var bDiff = Math.abs((b.width || 0) - (b.height || 0));
              return aDiff - bDiff;
            });
            return valid[0].thumbURL;
          }
        }
      }
    } catch(e) {
      console.warn('百度图片搜索失败（CORS 或网络）:', e.message);
    }

    // 方案 2: 使用 CORS 代理
    try {
      var proxyUrl = CORS_PROXY_URL + encodeURIComponent('https://image.baidu.com/search/acjson?tn=resultjson_com&word=' +
        encodeURIComponent(query + ' 酒 官方 商品图') + '&pn=0&rn=10&ipn=rj&ie=utf-8&oe=utf-8');
      var resp2 = await fetch(proxyUrl, { method: 'GET' });
      if (resp2.ok) {
        var data2 = await resp2.json();
        if (data2.data && data2.data.length > 0) {
          var valid2 = data2.data.filter(function(item) {
            return item && item.thumbURL;
          });
          if (valid2.length > 0) {
            return valid2[0].thumbURL;
          }
        }
      }
    } catch(e) {
      console.warn('代理图片搜索失败:', e.message);
    }

    return null;
  }

  function getExifOrientation(file) {
    return new Promise(function(resolve) {
      try {
        var reader = new FileReader();
        reader.onload = function(e) {
          var view = new DataView(e.target.result);
          if (view.getUint16(0, false) !== 0xFFD8) { resolve(1); return; }
          var length = view.byteLength;
          var offset = 2;
          while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xFFE1) {
              if (view.getUint32(offset += 2, false) !== 0x45786966) { resolve(1); return; }
              var little = view.getUint16(offset += 6, false) === 0x4949;
              offset += view.getUint32(offset + 4, little);
              var tags = view.getUint16(offset, little);
              offset += 2;
              for (var i = 0; i < tags; i++) {
                if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                  resolve(view.getUint16(offset + (i * 12) + 8, little));
                  return;
                }
              }
            } else if ((marker & 0xFF00) !== 0xFF00) { break; }
            else { offset += view.getUint16(offset, false); }
          }
          resolve(1);
        };
        reader.onerror = function() { resolve(1); };
        reader.readAsArrayBuffer(file.slice(0, 65536));
      } catch(e) { resolve(1); }
    });
  }

  function drawImageWithOrientation(img, orientation, maxWidth) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var w = img.width;
    var h = img.height;

    if (w > maxWidth) {
      h = Math.round(h * (maxWidth / w));
      w = maxWidth;
    }

    if (orientation >= 5 && orientation <= 8) {
      canvas.width = h;
      canvas.height = w;
    } else {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    switch(orientation) {
      case 2: ctx.translate(w, 0); ctx.scale(-1, 1); break;
      case 3: ctx.translate(w, h); ctx.rotate(Math.PI); break;
      case 4: ctx.translate(0, h); ctx.scale(1, -1); break;
      case 5: ctx.rotate(0.5 * Math.PI); ctx.scale(1, -1); break;
      case 6: ctx.rotate(0.5 * Math.PI); ctx.translate(0, -h); break;
      case 7: ctx.rotate(0.5 * Math.PI); ctx.translate(w, -h); ctx.scale(-1, 1); break;
      case 8: ctx.rotate(-0.5 * Math.PI); ctx.translate(-w, 0); break;
      default: break;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (orientation >= 5 && orientation <= 8) {
      ctx.drawImage(img, 0, 0, h, w);
    } else {
      ctx.drawImage(img, 0, 0, w, h);
    }

    return canvas;
  }

  function compressImage(file, maxWidth, quality) {
    maxWidth = maxWidth || 1200;
    quality = quality || 0.85;
    return new Promise(function(resolve, reject) {
      if (!file || !file.type.match(/image.*/)) {
        reject(new Error('请选择图片文件'));
        return;
      }
      Promise.all([
        new Promise(function(res) {
          var reader = new FileReader();
          reader.onload = function(e) { res(e.target.result); };
          reader.onerror = function() { res(null); };
          reader.readAsDataURL(file);
        }),
        getExifOrientation(file)
      ]).then(function(results) {
        var dataUrl = results[0];
        var orientation = results[1];
        if (!dataUrl) { reject(new Error('图片读取失败')); return; }
        var img = new Image();
        img.onload = function() {
          var canvas = drawImageWithOrientation(img, orientation, maxWidth);
          var w = canvas.width;
          var h = canvas.height;
          var finalDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve({
            dataUrl: finalDataUrl,
            width: w,
            height: h,
            originalSize: file.size,
            compressedSize: Math.round(finalDataUrl.length * 0.75),
            orientation: orientation
          });
        };
        img.onerror = function() { reject(new Error('图片加载失败')); };
        img.src = dataUrl;
      });
    });
  }

  function loadTesseract() {
    if (tesseractLoaded) return Promise.resolve(true);
    if (tesseractLoading) {
      return new Promise(function(resolve, reject) {
        var check = setInterval(function() {
          if (tesseractLoaded) { clearInterval(check); resolve(true); }
        }, 200);
        setTimeout(function() { clearInterval(check); reject(new Error('OCR加载超时')); }, 30000);
      });
    }
    tesseractLoading = true;
    return new Promise(function(resolve, reject) {
      var script = document.createElement('script');
      script.src = TESSERACT_CDN;
      script.onload = function() {
        tesseractLoaded = true;
        tesseractLoading = false;
        resolve(true);
      };
      script.onerror = function() {
        tesseractLoading = false;
        reject(new Error('OCR引擎加载失败，请检查网络'));
      };
      document.head.appendChild(script);
    });
  }

  function preloadTesseract() {
    if (document.readyState === 'complete') {
      loadTesseract().catch(function() {});
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() { loadTesseract().catch(function() {}); }, 1000);
      });
    }
  }

  async function recognizeText(dataUrl, progressCb) {
    await loadTesseract();
    if (typeof Tesseract === 'undefined') {
      throw new Error('OCR引擎不可用');
    }
    var result = await Tesseract.recognize(dataUrl, 'chi_sim+eng', {
      logger: function(m) {
        if (progressCb && m.status === 'recognizing text') {
          progressCb(Math.round(m.progress * 100));
        }
      }
    });
    return result.data.text || '';
  }

  function calculateConfidence(wine, text) {
    if (!text || !wine) return 0;
    var score = 0;
    var maxScore = 0;
    var checkFields = ['brand', 'name', 'keywords', 'fullName'];
    var lowerText = text.toLowerCase();
    checkFields.forEach(function(field) {
      var val = wine[field];
      if (!val) return;
      if (Array.isArray(val)) val = val.join(' ');
      val = String(val).toLowerCase();
      maxScore += 10;
      if (lowerText.indexOf(val) >= 0) score += 10;
      else {
        for (var i = 0; i < val.length - 1; i++) {
          var twoChar = val.substring(i, i + 2);
          if (lowerText.indexOf(twoChar) >= 0) score += 1;
        }
      }
    });
    return Math.min(Math.round((score / maxScore) * 100), 99);
  }

  function getFileNameHint(file) {
    if (!file || !file.name) return '';
    return file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
  }

  async function recognizeWine(file, progressCb) {
    var startTime = Date.now();
    var compressed = await compressImage(file, 800, 0.7);
    console.log('图片压缩完成，耗时:', Date.now() - startTime, 'ms, 大小:', Math.round(compressed.dataUrl.length * 0.75 / 1024), 'KB');
    if (progressCb) progressCb({ stage: 'compress', percent: 100, message: '图片处理完成' });
    var fileNameHint = getFileNameHint(file);

    var visionResult = null;
    var visionError = null;
    try {
      var wineInfo = await recognizeByVision(compressed.dataUrl, progressCb);
      console.log('recognizeByVision 返回:', wineInfo ? '有数据' : '空', wineInfo ? ('brand=' + wineInfo.brand + ', name=' + wineInfo.name) : '');
      if (wineInfo && (wineInfo.name || wineInfo.brand)) {
        visionResult = wineInfo;
        console.log('视觉识别成功，总耗时:', Date.now() - startTime, 'ms');
        if (progressCb) progressCb({ stage: 'done', percent: 100, message: '识别成功！' });
        
        var matchData = {
          brand: wineInfo.brand || '',
          name: wineInfo.name || '',
          type: wineInfo.type || '其他',
          degree: wineInfo.degree || null,
          capacity: wineInfo.capacity || null,
          agingYears: wineInfo.agingYears || null,
          productionYear: wineInfo.productionYear || null,
          origin: wineInfo.origin || '',
          confidence: 90
        };
        
        console.log('recognizeWine 返回 match:', matchData.brand, matchData.name, matchData.type);
        
        return {
          image: compressed.dataUrl,
          text: '',
          match: matchData,
          matches: [matchData],
          productImage: null,
          imageInfo: compressed,
          ocrFailed: false,
          visionUsed: true,
          fileNameHint: fileNameHint
        };
      }
    } catch(e) {
      console.warn('Vision API failed, fallback to OCR:', e);
      visionError = e.message || '视觉识别失败';
    }

    // 回退到本地 OCR
    var text = '';
    var matches = [];
    var match = null;
    var ocrFailed = false;

    try {
      if (progressCb) progressCb({ stage: 'ocr', percent: 0, message: 'AI正在识别文字...' });
      text = await recognizeText(compressed.dataUrl, function(p) {
        if (progressCb) progressCb({ stage: 'ocr', percent: p, message: 'AI识别中 ' + p + '%' });
      });
      if (progressCb) progressCb({ stage: 'match', percent: 80, message: '正在匹配酒品...' });
      matches = WineDB.matchMultipleFromOCRText(text, 8);
    } catch(e) {
      console.warn('OCR failed:', e);
      ocrFailed = true;
    }

    if (matches.length === 0 && fileNameHint) {
      matches = WineDB.search(fileNameHint, 8);
    }

    matches = matches.map(function(w) {
      return Object.assign({}, w, { confidence: calculateConfidence(w, text + ' ' + fileNameHint) });
    });
    matches.sort(function(a, b) { return b.confidence - a.confidence; });
    match = matches.length > 0 ? matches[0] : null;

    var doneMsg = '未识别到酒品，请手动选择';
    if (match) {
      if (match.confidence >= 70) doneMsg = '识别成功！';
      else if (match.confidence >= 40) doneMsg = '找到可能的酒款，请确认';
      else doneMsg = '为你推荐相关酒款';
    }
    if (visionError && !match) doneMsg = 'AI识别失败：' + visionError;
    if (progressCb) progressCb({ stage: 'done', percent: 100, message: doneMsg });
    return {
      image: compressed.dataUrl,
      text: text,
      match: match,
      matches: matches,
      imageInfo: compressed,
      ocrFailed: ocrFailed,
      visionError: visionError,
      visionUsed: false,
      fileNameHint: fileNameHint
    };
  }

  function quickRecognize(file, callback) {
    var overlay = createRecognitionOverlay(
      function(wine, extra) {
        if (callback) callback(wine, extra);
      },
      function() {
        if (callback) callback(null, { cancelled: true });
      }
    );
    recognizeWine(file, function(p) {
      overlay.updateProgress(p.stage, p.percent, p.message);
    }).then(function(result) {
      overlay.showResult(result);
    }).catch(function(err) {
      overlay.showResult({ image: null, match: null, matches: [], ocrFailed: true });
    });
  }

  function getWineKey(wine) {
    return (wine.brand || '') + '|' + (wine.name || '');
  }

  function addRecentWine(wine) {
    if (!wine || !wine.brand || !wine.name) return;
    var key = getWineKey(wine);
    recentWines = recentWines.filter(function(w) { return getWineKey(w) !== key; });
    recentWines.unshift(wine);
    if (recentWines.length > MAX_RECENT) recentWines = recentWines.slice(0, MAX_RECENT);
    try {
      var keys = recentWines.map(getWineKey);
      localStorage.setItem('aiHelper_recentWines', JSON.stringify(keys));
    } catch(e) {}
  }

  function getRecentWines() {
    try {
      var keys = JSON.parse(localStorage.getItem('aiHelper_recentWines') || '[]');
      var result = [];
      var allWines = WineDB.getAll ? WineDB.getAll() : WineDB.WINES;
      keys.forEach(function(key) {
        var parts = key.split('|');
        var w = allWines.find(function(x) { return x.brand === parts[0] && x.name === parts[1]; });
        if (w) result.push(w);
      });
      return result.length > 0 ? result : recentWines;
    } catch(e) { return recentWines; }
  }

  function getWineTypeCategory(type) {
    if (!type) return '其他';
    if (['酱香', '浓香', '清香', '兼香'].indexOf(type) >= 0) return '白酒';
    if (['威士忌', '白兰地', '伏特加', '朗姆', '金酒', '龙舌兰'].indexOf(type) >= 0) return '洋酒';
    if (['红葡萄酒', '白葡萄酒', '起泡酒', '香槟'].indexOf(type) >= 0) return '葡萄酒';
    if (['黄啤', '白啤', '黑啤', '精酿'].indexOf(type) >= 0) return '啤酒';
    if (['花雕', '加饭', '女儿红'].indexOf(type) >= 0) return '黄酒';
    return '其他';
  }

  function fillForm(formEl, wineData, options) {
    options = options || {};
    var category = getWineTypeCategory(wineData.type);
    var fields = ['brand', 'name', 'type', 'degree', 'capacity', 'agingYears', 'productionYear', 'price', 'origin'];
    
    var typeMapping = {
      '白酒': '白酒', '酱香': '酱香', '浓香': '浓香', '清香': '清香', '兼香': '兼香',
      '米香': '米香', '凤香': '凤香', '芝麻香': '芝麻香', '特香': '特香',
      '老白干': '老白干', '馥郁香': '馥郁香', '董香': '董香',
      '红酒': '红酒', '葡萄酒': '红酒', '干红': '红酒', '干白': '红酒',
      '洋酒': '洋酒', '威士忌': '洋酒', '白兰地': '洋酒', '伏特加': '洋酒',
      '朗姆酒': '洋酒', '朗姆': '洋酒', '金酒': '洋酒', '龙舌兰': '洋酒',
      '啤酒': '啤酒', '精酿': '啤酒', '生啤': '啤酒', '纯生': '啤酒',
      '黄酒': '黄酒', '花雕': '黄酒', '加饭': '黄酒', '女儿红': '黄酒',
      '清酒': '清酒', '其他': '其他'
    };
    
    var mappedType = typeMapping[wineData.type] || '其他';
    
    var mapped = {
      brand: wineData.brand,
      name: wineData.name,
      type: mappedType,
      degree: wineData.degree,
      capacity: wineData.capacity,
      agingYears: wineData.agingYears,
      productionYear: wineData.productionYear,
      price: wineData.price,
      origin: wineData.origin
    };

    fields.forEach(function(f, idx) {
      var input = formEl.querySelector('#' + f + ', [name="' + f + '"]');
      if (input && mapped[f] != null) {
        if (!options.overwrite && input.value && input.value.trim()) return;
        setTimeout(function() {
          input.style.transition = 'all 0.3s ease';
          input.style.transform = 'scale(1.02)';
          input.style.background = 'rgba(139,105,20,0.1)';
          setTimeout(function() {
            input.value = mapped[f];
            input.classList.add('ai-filled');
            setTimeout(function() {
              input.style.transform = 'scale(1)';
              input.style.background = '';
              input.classList.remove('ai-filled');
            }, 600);
          }, 100);
        }, idx * 120);
      }
    });

    // 同步设置级联选择器隐藏字段
    var cascadeCategoryInput = formEl.querySelector('#category, [name="category"]');
    var cascadeSubInput = formEl.querySelector('#subCategory, [name="subCategory"]');
    var cascadeDetailInput = formEl.querySelector('#detailType, [name="detailType"]');
    var cascadeTypeInput = formEl.querySelector('#type, [name="type"]');
    if (cascadeCategoryInput && wineData.type) {
      var typeStr = wineData.type;
      var baijiuXiangMap = {
        '酱香': '酱香型', '浓香': '浓香型', '清香': '清香型', '兼香': '兼香型',
        '米香': '米香型', '凤香': '凤香型', '芝麻香': '芝麻香型', '特香': '特香型',
        '老白干': '老白干香型', '馥郁香': '馥郁香型', '董香': '药香型'
      };

      if (baijiuXiangMap[typeStr]) {
        cascadeCategoryInput.value = '白酒';
        if (cascadeSubInput) cascadeSubInput.value = baijiuXiangMap[typeStr];
        if (cascadeTypeInput) cascadeTypeInput.value = typeStr;
      } else if (typeStr === '白酒') {
        cascadeCategoryInput.value = '白酒';
        if (cascadeTypeInput) cascadeTypeInput.value = '白酒';
      } else if (typeStr === '洋酒' || typeStr === '威士忌' || typeStr === '白兰地' || typeStr === '伏特加' || typeStr === '朗姆酒' || typeStr === '朗姆' || typeStr === '金酒' || typeStr === '龙舌兰') {
        cascadeCategoryInput.value = '洋酒';
        var subMap = {
          '威士忌': '威士忌', '白兰地': '白兰地', '伏特加': '伏特加',
          '朗姆酒': '朗姆酒', '朗姆': '朗姆酒', '金酒': '金酒', '龙舌兰': '龙舌兰'
        };
        if (subMap[typeStr] && cascadeSubInput) {
          cascadeSubInput.value = subMap[typeStr];
        }
        if (cascadeTypeInput) cascadeTypeInput.value = subMap[typeStr] || '洋酒';
      } else if (typeStr === '红酒' || typeStr === '葡萄酒' || typeStr === '干红' || typeStr === '干白') {
        cascadeCategoryInput.value = '葡萄酒';
        if (cascadeTypeInput) cascadeTypeInput.value = '红葡萄酒';
      } else if (typeStr === '啤酒') {
        cascadeCategoryInput.value = '啤酒';
        if (cascadeTypeInput) cascadeTypeInput.value = '啤酒';
      } else if (typeStr === '黄酒') {
        cascadeCategoryInput.value = '黄酒';
        if (cascadeTypeInput) cascadeTypeInput.value = '黄酒';
      } else if (typeStr === '清酒') {
        cascadeCategoryInput.value = '其他';
        if (cascadeTypeInput) cascadeTypeInput.value = '清酒';
      } else {
        cascadeCategoryInput.value = '其他';
        if (cascadeTypeInput) cascadeTypeInput.value = typeStr;
      }

      if (window.setCascadeFromType) {
        window.setCascadeFromType(cascadeTypeInput.value || cascadeCategoryInput.value);
      }
    }

    if (wineData.fullName && formEl.querySelector('[name="notes"]')) {
      var notesField = formEl.querySelector('[name="notes"]');
      if (!notesField.value || notesField.value.trim() === '') {
        notesField.value = wineData.fullName;
      }
    }

    addRecentWine(wineData);
  }

  function getTypeColor(type) {
    var map = {
      '酱香': '#8B4513', '浓香': '#DAA520', '清香': '#87CEEB', '兼香': '#9370DB',
      '威士忌': '#CD853F', '白兰地': '#D2691E', '红葡萄酒': '#8B0000', '白葡萄酒': '#F0E68C',
      '啤酒': '#F4A460', '黄酒': '#B8860B', '其他': '#999'
    };
    return map[type] || '#8B6914';
  }

  function createSuggestionBox(inputEl, onSelect) {
    var box = document.createElement('div');
    box.className = 'ai-suggestion-box';
    box.style.cssText = 'position:absolute;top:100%;left:0;right:0;background:#fff;border:1px solid var(--color-border);border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:200;max-height:420px;overflow-y:auto;margin-top:4px;display:none;';
    if (inputEl.parentNode) {
      inputEl.parentNode.style.position = 'relative';
      inputEl.parentNode.appendChild(box);
    }

    var currentItems = [];
    var selectedIdx = -1;
    var showRecent = false;

    function hide() {
      box.style.display = 'none';
      selectedIdx = -1;
    }

    function renderItems(items, isRecent) {
      box.innerHTML = '';
      if (isRecent && items.length > 0) {
        var recentHeader = document.createElement('div');
        recentHeader.style.cssText = 'padding:8px 16px;font-size:12px;color:var(--color-text-tertiary);background:#faf8f4;border-bottom:1px solid #f0ebe0;font-weight:500;';
        recentHeader.textContent = '🕐 最近使用';
        box.appendChild(recentHeader);
      }
      items.forEach(function(w, idx) {
        var item = document.createElement('div');
        item.className = 'ai-suggestion-item';
        var typeColor = getTypeColor(w.type);
        var category = getWineTypeCategory(w.type);
        item.style.cssText = 'padding:12px 16px;cursor:pointer;display:flex;align-items:center;gap:12px;border-bottom:1px solid #f5f0e8;transition:background .15s;';
        item.innerHTML =
          '<div style="width:42px;height:42px;border-radius:10px;background:' + (w.color || typeColor) + ';display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600;flex-shrink:0;">' + (w.brand ? w.brand.slice(0,1) : '酒') + '</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="font-size:15px;font-weight:500;color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:6px;">' +
              '<span>' + w.brand + ' ' + w.name + '</span>' +
              '<span style="font-size:10px;padding:2px 6px;border-radius:4px;background:' + typeColor + '20;color:' + typeColor + ';font-weight:500;flex-shrink:0;">' + w.type + '</span>' +
            '</div>' +
            '<div style="font-size:12px;color:var(--color-text-tertiary);margin-top:2px;">' + category + ' · ' + w.degree + '° · ' + w.capacity + 'ml · ¥' + w.price + '</div>' +
          '</div>' +
          '<div style="font-size:12px;color:var(--color-primary);font-weight:500;background:rgba(139,105,20,0.08);padding:4px 8px;border-radius:6px;flex-shrink:0;">填充</div>';
        item.addEventListener('mouseenter', function() {
          selectedIdx = idx;
          updateHighlight();
        });
        item.addEventListener('click', function() {
          addRecentWine(w);
          onSelect(w);
          hide();
        });
        box.appendChild(item);
      });
      if (items.length > 0 && !isRecent) {
        var moreTip = document.createElement('div');
        moreTip.style.cssText = 'padding:10px 16px;text-align:center;font-size:12px;color:var(--color-text-tertiary);background:#faf8f4;';
        moreTip.textContent = '继续输入可缩小范围';
        box.appendChild(moreTip);
      }
    }

    function showNoResult() {
      box.innerHTML = '<div style="padding:24px;text-align:center;color:var(--color-text-tertiary);font-size:14px;line-height:1.6;">' +
        '<div style="font-size:32px;margin-bottom:8px;">🔍</div>' +
        '<div>没有找到？试试输入品牌名</div>' +
        '<div style="font-size:12px;margin-top:4px;">如：茅台、五粮液、洋河</div>' +
      '</div>';
      box.style.display = 'block';
    }

    function show(items) {
      currentItems = items || [];
      showRecent = false;
      if (items.length === 0) { showNoResult(); return; }
      renderItems(items, false);
      box.style.display = 'block';
      selectedIdx = 0;
      updateHighlight();
    }

    function showRecentList() {
      var recent = getRecentWines();
      currentItems = recent;
      showRecent = true;
      if (recent.length === 0) { hide(); return; }
      renderItems(recent, true);
      box.style.display = 'block';
      selectedIdx = 0;
    }

    function updateHighlight() {
      var items = box.querySelectorAll('.ai-suggestion-item');
      items.forEach(function(el, i) {
        if (i === selectedIdx) {
          el.style.background = 'rgba(139,105,20,0.08)';
        } else {
          el.style.background = '';
        }
      });
    }

    var debounceTimer = null;
    function onInput() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function() {
        var q = inputEl.value.trim();
        if (q.length < 1) { showRecentList(); return; }
        var results = WineDB.search(q, 6);
        show(results);
      }, 120);
    }

    function onKeydown(e) {
      if (box.style.display === 'none') return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIdx = Math.min(selectedIdx + 1, currentItems.length - 1);
        updateHighlight();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIdx = Math.max(selectedIdx - 1, 0);
        updateHighlight();
      } else if (e.key === 'Enter' && selectedIdx >= 0) {
        e.preventDefault();
        addRecentWine(currentItems[selectedIdx]);
        onSelect(currentItems[selectedIdx]);
        hide();
      } else if (e.key === 'Escape') {
        hide();
      }
    }

    inputEl.addEventListener('input', onInput);
    inputEl.addEventListener('keydown', onKeydown);
    inputEl.addEventListener('focus', function() {
      if (inputEl.value.trim().length < 1) showRecentList();
      else onInput();
    });
    inputEl.addEventListener('blur', function() {
      setTimeout(hide, 200);
    });

    return { hide: hide, show: show, trigger: onInput };
  }

  function createImageUploader(containerEl, options) {
    options = options || {};
    var currentImage = options.initialImage || null;

    var wrapper = document.createElement('div');
    wrapper.className = 'ai-upload-wrapper';
    wrapper.innerHTML =
      '<div style="margin-bottom:10px;padding:10px 14px;background:rgba(139,105,20,0.06);border-radius:10px;font-size:13px;color:var(--color-primary);line-height:1.5;display:flex;align-items:flex-start;gap:8px;">' +
        '<span style="font-size:16px;">💡</span>' +
        '<span>小提示：拍摄酒标正面，光线充足时识别更准哦</span>' +
      '</div>' +
      '<div class="ai-image-preview" style="width:100%;aspect-ratio:4/3;background:linear-gradient(135deg,#f5f0e8,#ebe4d6);border-radius:16px;border:2px dashed var(--color-border);display:flex;align-items:center;justify-content:center;overflow:hidden;cursor:pointer;position:relative;transition:all .2s;min-height:240px;">' +
        '<div class="ai-upload-placeholder" style="text-align:center;color:var(--color-text-tertiary);padding:24px;transition:opacity .2s;">' +
          '<div style="width:64px;height:64px;background:linear-gradient(135deg,var(--color-primary),#DAA520);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#fff;box-shadow:0 4px 12px rgba(139,105,20,0.3);">' +
            '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' +
          '</div>' +
          '<div style="font-size:16px;font-weight:600;color:var(--color-text-primary);margin-bottom:6px;">拍照或上传酒品照片</div>' +
          '<div style="font-size:13px;color:var(--color-text-tertiary);line-height:1.5;">AI自动识别酒款，一键填充信息<br>自动生成标准产品图</div>' +
        '</div>' +
        '<img class="ai-upload-img" style="width:100%;height:100%;object-fit:cover;display:none;" />' +
        '<div class="ai-edit-hint" style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);padding:6px 12px;background:rgba(0,0,0,0.5);color:#fff;border-radius:20px;font-size:12px;backdrop-filter:blur(4px);display:none;pointer-events:none;">点击可重新选择图片</div>' +
        '<div class="ai-remove-btn" style="position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,0.5);color:#fff;display:none;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(4px);transition:transform .15s,background .15s;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>' +
        '<div class="ai-re-upload-btn" style="position:absolute;bottom:10px;right:10px;padding:8px 14px;border-radius:20px;background:rgba(0,0,0,0.5);color:#fff;display:none;align-items:center;gap:6px;cursor:pointer;backdrop-filter:blur(4px);font-size:13px;font-weight:500;transition:background .15s;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>重新选择</div>' +
      '</div>' +
      '<div style="display:flex;gap:10px;margin-top:12px;">' +
        '<button type="button" class="ai-btn-camera btn btn-outline" style="flex:1;padding:12px;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;border:1.5px solid var(--color-primary);color:var(--color-primary);background:transparent;font-weight:500;transition:all .2s;cursor:pointer;">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' +
          '📷 拍照识别' +
        '</button>' +
        '<button type="button" class="ai-btn-gallery btn btn-outline" style="flex:1;padding:12px;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;border:1.5px solid var(--color-border);color:var(--color-text-secondary);background:#fff;font-weight:500;transition:all .2s;cursor:pointer;">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' +
          '🖼️ 相册选择' +
        '</button>' +
      '</div>' +
      '<input type="file" class="ai-file-camera" accept="image/*" capture="environment" style="display:none;">' +
      '<input type="file" class="ai-file-gallery" accept="image/*" style="display:none;">';

    containerEl.innerHTML = '';
    containerEl.appendChild(wrapper);

    var preview = wrapper.querySelector('.ai-upload-img');
    var placeholder = wrapper.querySelector('.ai-upload-placeholder');
    var removeBtn = wrapper.querySelector('.ai-remove-btn');
    var reUploadBtn = wrapper.querySelector('.ai-re-upload-btn');
    var cameraBtn = wrapper.querySelector('.ai-btn-camera');
    var galleryBtn = wrapper.querySelector('.ai-btn-gallery');
    var fileCamera = wrapper.querySelector('.ai-file-camera');
    var fileGallery = wrapper.querySelector('.ai-file-gallery');
    var previewBox = wrapper.querySelector('.ai-image-preview');
    var editHint = wrapper.querySelector('.ai-edit-hint');

    function setImage(dataUrl) {
      currentImage = dataUrl;
      if (dataUrl) {
        preview.src = dataUrl;
        preview.style.display = 'block';
        placeholder.style.display = 'none';
        removeBtn.style.display = 'flex';
        reUploadBtn.style.display = 'flex';
        editHint.style.display = 'block';
        setTimeout(function() { editHint.style.opacity = '0'; }, 2000);
      } else {
        preview.style.display = 'none';
        placeholder.style.display = 'block';
        removeBtn.style.display = 'none';
        reUploadBtn.style.display = 'none';
        editHint.style.display = 'none';
      }
      if (options.onImageChange) options.onImageChange(dataUrl);
    }

    function handleFile(file) {
      if (!file) return;
      if (options.onBeforeRecognize) options.onBeforeRecognize();
      compressImage(file, 1200, 0.85).then(function(result) {
        setImage(result.dataUrl);
        if (options.onImageReady) options.onImageReady(result, file);
      }).catch(function(err) {
        if (options.onError) options.onError(err.message);
      });
    }

    function addPressFeedback(btn) {
      btn.addEventListener('mousedown', function() { btn.style.transform = 'scale(0.97)'; btn.style.opacity = '0.8'; });
      btn.addEventListener('mouseup', function() { btn.style.transform = ''; btn.style.opacity = ''; });
      btn.addEventListener('mouseleave', function() { btn.style.transform = ''; btn.style.opacity = ''; });
    }
    addPressFeedback(cameraBtn);
    addPressFeedback(galleryBtn);
    addPressFeedback(reUploadBtn);
    addPressFeedback(removeBtn);

    previewBox.addEventListener('mousedown', function() { previewBox.style.transform = 'scale(0.99)'; });
    previewBox.addEventListener('mouseup', function() { previewBox.style.transform = ''; });
    previewBox.addEventListener('mouseleave', function() { previewBox.style.transform = ''; });

    cameraBtn.addEventListener('click', function() { fileCamera.click(); });
    galleryBtn.addEventListener('click', function() { fileGallery.click(); });
    reUploadBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      fileGallery.click();
    });
    fileCamera.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
        e.target.value = '';
      }
    });
    fileGallery.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
        e.target.value = '';
      }
    });
    removeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      setImage(null);
    });
    previewBox.addEventListener('click', function() {
      if (currentImage) {
        fileGallery.click();
      } else {
        fileGallery.click();
      }
    });

    if (currentImage) setImage(currentImage);

    return {
      setImage: setImage,
      getImage: function() { return currentImage; }
    };
  }

  function loadImageWithTimeout(url, timeout) {
    timeout = timeout || 8000;
    return new Promise(function(resolve, reject) {
      var timer = setTimeout(function() {
        reject(new Error('加载超时'));
      }, timeout);
      var img = new Image();
      img.onload = function() {
        clearTimeout(timer);
        resolve(img);
      };
      img.onerror = function() {
        clearTimeout(timer);
        reject(new Error('加载失败'));
      };
      img.src = url;
    });
  }

  function imageToDataURL(img) {
    try {
      var canvas = document.createElement('canvas');
      var size = 500;
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, size, size);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      var scale = Math.max(size / img.width, size / img.height);
      var w = img.width * scale;
      var h = img.height * scale;
      var x = (size - w) / 2;
      var y = (size - h) / 2;
      ctx.drawImage(img, x, y, w, h);
      return canvas.toDataURL('image/jpeg', 0.9);
    } catch(e) {
      return null;
    }
  }

  function getHotBrands() {
    var hotNames = ['茅台', '五粮液', '洋河', '泸州老窖', '剑南春', '汾酒', '郎酒', '古井贡酒'];
    return hotNames.map(function(name) {
      return WineDB.search(name, 1)[0];
    }).filter(Boolean);
  }

  function createRecognitionOverlay(onResult, onCancel) {
    var overlay = document.createElement('div');
    overlay.className = 'ai-recog-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);';
    overlay.innerHTML =
      '<div style="background:#fff;border-radius:24px;width:100%;max-width:440px;max-height:90vh;overflow-y:auto;padding:28px 24px;box-shadow:0 20px 60px rgba(0,0,0,0.3);">' +
        '<div class="ai-loading-state">' +
          '<div style="text-align:center;margin-bottom:20px;">' +
            '<div class="ai-scan-ring" style="width:88px;height:88px;border-radius:50%;border:4px solid var(--color-primary);border-top-color:transparent;margin:0 auto 20px;animation:ai-spin 1s linear infinite;display:flex;align-items:center;justify-content:center;">' +
              '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
            '</div>' +
            '<div class="ai-recog-title" style="font-size:20px;font-weight:700;color:var(--color-text-primary);margin-bottom:8px;">AI智能识别中</div>' +
            '<div class="ai-recog-msg" style="font-size:14px;color:var(--color-text-tertiary);">正在分析图片...</div>' +
          '</div>' +
          '<div class="ai-recog-progress" style="height:6px;background:#f0ebe0;border-radius:3px;overflow:hidden;margin-bottom:12px;">' +
            '<div class="ai-recog-bar" style="height:100%;background:linear-gradient(90deg,var(--color-primary),#DAA520);width:0%;border-radius:3px;transition:width .3s;"></div>' +
          '</div>' +
          '<div class="ai-recog-tips" style="font-size:12px;color:var(--color-text-tertiary);text-align:center;line-height:1.5;">📌 提示：拍摄清晰的酒标正面会提高识别准确率</div>' +
        '</div>' +
        '<div class="ai-result-state" style="display:none;"></div>' +
      '</div>';

    var style = document.createElement('style');
    style.textContent = '@keyframes ai-spin { to { transform: rotate(360deg); } } @keyframes ai-pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } } @keyframes ai-bounce-in { 0% { transform:scale(0.9);opacity:0; } 100% { transform:scale(1);opacity:1; } } @keyframes ai-flash { 0% { background:rgba(139,105,20,0.2); } 100% { background:transparent; } } .ai-choice-item { transition:all 0.2s ease; } .ai-choice-item:active { transform:scale(0.98); } .ai-match-card { transition:all 0.15s ease; } .ai-match-card:hover { transform:translateY(-2px);box-shadow:0 4px 12px rgba(139,105,20,0.15); } .ai-hot-brand-btn { transition:all 0.15s ease; } .ai-hot-brand-btn:hover { transform:scale(1.05);background:rgba(139,105,20,0.12); } .ai-hot-brand-btn:active { transform:scale(0.97); }';
    document.head.appendChild(style);

    document.body.appendChild(overlay);

    function updateProgress(stage, percent, message) {
      var bar = overlay.querySelector('.ai-recog-bar');
      var msg = overlay.querySelector('.ai-recog-msg');
      if (bar) bar.style.width = (percent || 0) + '%';
      if (msg) msg.textContent = message || '';
    }

    function setupManualSearch(container, currentResult) {
      var searchInput = container.querySelector('.ai-manual-search');
      var resultsBox = container.querySelector('.ai-manual-results');
      var hotBrandsBox = container.querySelector('.ai-hot-brands');
      if (!searchInput) return;

      setTimeout(function() { searchInput.focus(); }, 300);

      function renderResults(results) {
        resultsBox.innerHTML = '';
        if (results.length === 0) {
          if (searchInput.value.trim().length > 0) {
            resultsBox.innerHTML = '<div style="padding:20px;text-align:center;color:var(--color-text-tertiary);font-size:14px;line-height:1.6;"><div style="font-size:24px;margin-bottom:8px;">😅</div>没有找到？试试输入品牌名<br><span style="font-size:12px;">如：茅台、五粮液、洋河</span></div>';
          }
          return;
        }
        results.forEach(function(w) {
          var item = document.createElement('div');
          var typeColor = getTypeColor(w.type);
          item.style.cssText = 'padding:12px 14px;border-radius:10px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;background:#faf8f4;transition:all .15s;';
          item.innerHTML =
            '<div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1;">' +
              '<div style="width:36px;height:36px;border-radius:8px;background:' + (w.color || typeColor) + ';display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600;flex-shrink:0;">' + (w.brand ? w.brand.slice(0,1) : '酒') + '</div>' +
              '<div style="min-width:0;flex:1;">' +
                '<div style="font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:6px;">' + w.brand + ' ' + w.name + '<span style="font-size:10px;padding:2px 5px;border-radius:3px;background:' + typeColor + '20;color:' + typeColor + ';flex-shrink:0;">' + w.type + '</span></div>' +
                '<div style="font-size:12px;color:var(--color-text-tertiary);margin-top:2px;">' + w.degree + '° · ¥' + w.price + '</div>' +
              '</div>' +
            '</div>';
          item.addEventListener('mouseenter', function() { item.style.background = 'rgba(139,105,20,0.08)'; });
          item.addEventListener('mouseleave', function() { item.style.background = '#faf8f4'; });
          item.addEventListener('click', function() {
            selectWineAndClose(w, currentResult);
          });
          resultsBox.appendChild(item);
        });
      }

      function renderHotBrands() {
        if (!hotBrandsBox) return;
        hotBrandsBox.innerHTML = '';
        var tip = document.createElement('div');
        tip.style.cssText = 'font-size:12px;color:var(--color-text-tertiary);margin-bottom:8px;';
        tip.textContent = '🔥 热门品牌：';
        hotBrandsBox.appendChild(tip);
        var brandsWrap = document.createElement('div');
        brandsWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';
        var hots = getHotBrands();
        hots.forEach(function(w) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'ai-hot-brand-btn';
          btn.style.cssText = 'padding:6px 12px;border-radius:16px;border:1px solid var(--color-border);background:#fff;font-size:13px;cursor:pointer;color:var(--color-text-secondary);font-weight:500;';
          btn.textContent = w.brand;
          btn.addEventListener('click', function() {
            selectWineAndClose(w, currentResult);
          });
          brandsWrap.appendChild(btn);
        });
        hotBrandsBox.appendChild(brandsWrap);
      }

      function selectWineAndClose(w, result) {
        document.body.removeChild(overlay);
        addRecentWine(w);
        if (onResult) onResult(w, { image: result ? result.image : null, text: result ? result.text : '' });
      }

      renderHotBrands();
      renderResults([]);

      var t = null;
      searchInput.addEventListener('input', function() {
        clearTimeout(t);
        t = setTimeout(function() {
          var q = searchInput.value.trim();
          var results = q.length > 0 ? WineDB.search(q, 6) : [];
          hotBrandsBox.style.display = q.length > 0 ? 'none' : 'block';
          renderResults(results);
        }, 150);
      });
    }

    function showResult(result) {
      var loadingState = overlay.querySelector('.ai-loading-state');
      var resultState = overlay.querySelector('.ai-result-state');
      var box = resultState;
      loadingState.style.display = 'none';
      resultState.style.display = 'block';
      resultState.style.animation = 'ai-bounce-in 0.3s ease';

      if (result.match) {
        var matches = result.matches && result.matches.length > 0 ? result.matches : [result.match];
        var bestMatch = result.match;
        var stdImgUrl = result.productImage || WineDB.generateImageUrl(bestMatch);
        var fallbackImg = WineDB.generateFallbackImage(bestMatch);
        var bestConfidence = bestMatch.confidence || 0;

        var titleText = '识别成功！';
        var subText = '已为你找到' + matches.length + '个酒款，请选择正确的';
        var titleColor = '#27AE60';
        var titleBg = 'linear-gradient(135deg,#2ECC71,#27AE60)';
        var titleIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';

        if (bestConfidence < 70 && bestConfidence >= 40) {
          titleText = '找到可能的酒款';
          subText = 'AI不太确定，帮你看看哪个对？';
          titleColor = '#f39c12';
          titleBg = 'linear-gradient(135deg,#f1c40f,#f39c12)';
          titleIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
        } else if (bestConfidence < 40) {
          titleText = '为你推荐这些酒款';
          subText = '没认出来，你看看有没有对的？';
          titleColor = '#95a5a6';
          titleBg = 'linear-gradient(135deg,#bdc3c7,#95a5a6)';
          titleIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
        }

        box.innerHTML =
          '<div style="text-align:center;margin-bottom:20px;">' +
            '<div style="width:56px;height:56px;border-radius:50%;background:' + titleBg + ';margin:0 auto 12px;display:flex;align-items:center;justify-content:center;color:#fff;">' + titleIcon + '</div>' +
            '<div style="font-size:20px;font-weight:700;color:var(--color-text-primary);margin-bottom:4px;">' + titleText + '</div>' +
            '<div style="font-size:14px;color:var(--color-text-tertiary);">' + subText + '</div>' +
          '</div>';

        var matchList = document.createElement('div');
        matchList.style.cssText = 'margin-bottom:16px;max-height:280px;overflow-y:auto;';
        matches.forEach(function(w, idx) {
          var card = document.createElement('div');
          card.className = 'ai-match-card';
          var isFirst = idx === 0;
          var typeColor = getTypeColor(w.type);
          var conf = w.confidence || 0;
          var confColor = conf >= 70 ? '#27AE60' : conf >= 40 ? '#f39c12' : '#999';
          var confText = conf >= 70 ? '高匹配' : conf >= 40 ? '可能匹配' : '低匹配';
          card.style.cssText = 'padding:12px;border:2px solid ' + (isFirst ? 'var(--color-primary)' : '#e0d8c8') + ';border-radius:12px;margin-bottom:8px;cursor:pointer;display:flex;align-items:center;gap:12px;background:' + (isFirst ? 'rgba(139,105,20,0.04)' : '#fff') + ';';
          card.setAttribute('data-wine-idx', idx);
          card.innerHTML =
            '<div style="width:44px;height:44px;border-radius:10px;background:' + (w.color || typeColor) + ';display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;flex-shrink:0;">' + (w.brand ? w.brand.slice(0,1) : '酒') + '</div>' +
            '<div style="flex:1;min-width:0;">' +
              '<div style="font-size:15px;font-weight:600;color:var(--color-text-primary);display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' +
                '<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + w.brand + ' ' + w.name + '</span>' +
                '<span style="font-size:10px;padding:2px 6px;border-radius:4px;background:' + typeColor + '20;color:' + typeColor + ';font-weight:500;flex-shrink:0;">' + w.type + '</span>' +
              '</div>' +
              '<div style="font-size:12px;color:var(--color-text-tertiary);margin-top:3px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">' + w.degree + '° · ' + w.capacity + 'mL · ¥' + w.price + ' · ' + w.origin +
                '<span style="display:inline-flex;align-items:center;gap:3px;color:' + confColor + ';">' +
                  '<span style="width:6px;height:6px;border-radius:50%;background:' + confColor + ';"></span>' + confText + ' ' + conf + '%' +
                '</span>' +
              '</div>' +
            '</div>' +
            '<div class="ai-match-check" style="width:24px;height:24px;border-radius:50%;border:2px solid ' + (isFirst ? 'var(--color-primary)' : '#ddd') + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;">' +
              (isFirst ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '') +
            '</div>';
          card.addEventListener('click', function() {
            var allCards = matchList.querySelectorAll('.ai-match-card');
            allCards.forEach(function(c, i) {
              var isSelected = i === idx;
              c.style.borderColor = isSelected ? 'var(--color-primary)' : '#e0d8c8';
              c.style.background = isSelected ? 'rgba(139,105,20,0.04)' : '#fff';
              var checkEl = c.querySelector('.ai-match-check');
              checkEl.style.borderColor = isSelected ? 'var(--color-primary)' : '#ddd';
              checkEl.innerHTML = isSelected ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>' : '';
            });
            bestMatch = w;
            stdImgUrl = WineDB.generateImageUrl(w);
            // 切换酒款后不再使用初始 productImage
            result.productImage = null;
            updateImgChoice(w);
          });
          matchList.appendChild(card);
        });
        box.appendChild(matchList);

        var imgChoiceSection = document.createElement('div');
        imgChoiceSection.id = 'ai-img-choice-section';
        imgChoiceSection.style.cssText = 'margin-bottom:16px;';
        box.appendChild(imgChoiceSection);

        function updateImgChoice(wine) {
          var section = document.getElementById('ai-img-choice-section');
          if (!section) return;
          section.innerHTML =
            '<div style="font-size:13px;font-weight:600;color:var(--color-text-primary);margin-bottom:10px;">选一张图片</div>' +
            '<div class="ai-img-choice" style="display:flex;gap:10px;">' +
              '<div class="ai-choice-item ai-choice-user" data-choice="user" style="flex:1;border:2px solid #e0d8c8;border-radius:12px;padding:8px;cursor:pointer;text-align:center;">' +
                '<div style="width:100%;aspect-ratio:1/1;background:#f5f0e8;border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;margin-bottom:6px;">' +
                  (result.image ? '<img src="' + result.image + '" style="width:100%;height:100%;object-fit:cover;" />' : '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="2"><circle cx="12" cy="13" r="4"/><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/></svg>') +
                '</div>' +
                '<div style="font-size:13px;font-weight:500;color:var(--color-text-secondary);">用我的照片</div>' +
              '</div>' +
              '<div class="ai-choice-item ai-choice-std" data-choice="std" style="flex:1;border:2px solid var(--color-primary);border-radius:12px;padding:8px;cursor:pointer;text-align:center;background:rgba(139,105,20,0.04);">' +
                '<div class="ai-std-img-box" style="width:100%;aspect-ratio:1/1;background:#f5f0e8;border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;margin-bottom:6px;position:relative;">' +
                  '<div class="ai-std-loading" style="text-align:center;color:#999;">' +
                    '<div style="width:28px;height:28px;border:2px solid #ddd;border-top-color:var(--color-primary);border-radius:50%;animation:ai-spin 0.8s linear infinite;margin:0 auto 6px;"></div>' +
                    '<div style="font-size:11px;">AI准备中...</div>' +
                  '</div>' +
                  '<img class="ai-std-img" style="width:100%;height:100%;object-fit:cover;display:none;" />' +
                  '<div class="ai-std-fallback" style="display:none;width:100%;height:100%;position:relative;">' +
                    '<img src="' + WineDB.generateFallbackImage(wine) + '" style="width:100%;height:100%;object-fit:cover;" />' +
                    '<div style="position:absolute;bottom:4px;left:4px;right:4px;padding:4px 6px;background:rgba(0,0,0,0.6);color:#fff;font-size:10px;border-radius:4px;text-align:center;">示意图</div>' +
                  '</div>' +
                '</div>' +
                '<div style="font-size:13px;font-weight:500;color:var(--color-primary);">' + (result.productImage ? '✨ 官方商品图 (推荐)' : '✨ AI标准图 (推荐)') + '</div>' +
              '</div>' +
            '</div>';

          var selectedChoice = 'std';
          var stdImgLoaded = false;
          var stdImgDataUrl = null;
          var stdImgEl = section.querySelector('.ai-std-img');
          var stdLoading = section.querySelector('.ai-std-loading');
          var stdFallback = section.querySelector('.ai-std-fallback');
          var stdBox = section.querySelector('.ai-choice-std');
          var userBox = section.querySelector('.ai-choice-user');

          function selectChoice(choice) {
            selectedChoice = choice;
            if (choice === 'std') {
              stdBox.style.borderColor = 'var(--color-primary)';
              stdBox.style.background = 'rgba(139,105,20,0.04)';
              stdBox.querySelector('div:last-child').style.color = 'var(--color-primary)';
              userBox.style.borderColor = '#e0d8c8';
              userBox.style.background = '#fff';
              userBox.querySelector('div:last-child').style.color = 'var(--color-text-secondary)';
              if (!stdImgLoaded) loadStdImage();
            } else {
              userBox.style.borderColor = 'var(--color-primary)';
              userBox.style.background = 'rgba(139,105,20,0.04)';
              userBox.querySelector('div:last-child').style.color = 'var(--color-primary)';
              stdBox.style.borderColor = '#e0d8c8';
              stdBox.style.background = '#fff';
              stdBox.querySelector('div:last-child').style.color = 'var(--color-text-secondary)';
            }
          }

          function loadStdImage() {
            if (stdImgLoaded) return;
            stdLoading.innerHTML = '<div style="width:28px;height:28px;border:2px solid #ddd;border-top-color:var(--color-primary);border-radius:50%;animation:ai-spin 0.8s linear infinite;margin:0 auto 6px;"></div><div style="font-size:11px;">加载商品图中...</div>';
            // 优先使用百度搜到的商品图（直接用URL，不转base64避免跨域）
            if (result.productImage) {
              stdImgEl.crossOrigin = 'anonymous';
              stdImgEl.src = result.productImage;
              stdImgEl.onload = function() {
                stdImgEl.style.display = 'block';
                stdLoading.style.display = 'none';
                stdImgDataUrl = result.productImage;
                stdImgLoaded = true;
                stdElSuccessEffect();
              };
              stdImgEl.onerror = function() {
                loadFallbackStdImage();
              };
              return;
            }
            // 回退到文生图
            var url = WineDB.generateImageUrl(wine) + '&t=' + Date.now();
            loadImageWithTimeout(url, 10000).then(function(img) {
              var dataUrl = imageToDataURL(img);
              if (dataUrl) {
                stdImgDataUrl = dataUrl;
                stdImgEl.src = dataUrl;
                stdImgEl.style.display = 'block';
                stdLoading.style.display = 'none';
                stdImgLoaded = true;
                stdElSuccessEffect();
              } else {
                loadFallbackStdImage();
              }
            }).catch(function() {
              loadFallbackStdImage();
            });
          }
          function loadFallbackStdImage() {
            stdLoading.style.display = 'none';
            stdFallback.style.display = 'block';
            stdImgDataUrl = WineDB.generateFallbackImage(wine);
            stdImgLoaded = true;
          }

          function stdElSuccessEffect() {
            stdBox.style.boxShadow = '0 0 0 3px rgba(46,204,113,0.3)';
            setTimeout(function() { stdBox.style.boxShadow = ''; }, 600);
          }

          userBox.addEventListener('click', function() { selectChoice('user'); });
          stdBox.addEventListener('click', function() { selectChoice('std'); loadStdImage(); });
          selectChoice('std');
          setTimeout(loadStdImage, 200);

          section._selectChoice = selectChoice;
          section._getSelectedImage = function() {
            if (selectedChoice === 'std' && stdImgDataUrl) return stdImgDataUrl;
            return result.image;
          };
          section._getSelectedWine = function() { return bestMatch; };
        }

        updateImgChoice(bestMatch);

        var tipBox = document.createElement('div');
        tipBox.style.cssText = 'font-size:13px;color:var(--color-primary);background:rgba(139,105,20,0.08);padding:10px 14px;border-radius:10px;text-align:center;margin-bottom:16px;line-height:1.5;';
        tipBox.innerHTML = '✨ 信息会自动填好，不对的地方可以改哦';
        box.appendChild(tipBox);

        var btnRow = document.createElement('div');
        btnRow.style.cssText = 'display:flex;flex-direction:column;gap:8px;';
        btnRow.innerHTML =
          '<button type="button" class="ai-btn-confirm" style="width:100%;padding:15px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--color-primary),#DAA520);color:#fff;font-size:16px;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(139,105,20,0.3);">就用这个</button>' +
          '<div style="display:flex;gap:8px;">' +
            '<button type="button" class="ai-btn-search" style="flex:1;padding:12px;border-radius:10px;border:1.5px solid var(--color-border);background:#fff;font-size:14px;cursor:pointer;font-weight:500;color:var(--color-text-secondary);">都不对？搜索其他酒款</button>' +
            '<button type="button" class="ai-btn-cancel" style="flex:1;padding:12px;border-radius:10px;border:1.5px solid transparent;background:#f5f0e8;font-size:14px;cursor:pointer;font-weight:500;color:var(--color-text-tertiary);">稍后再说，我自己填</button>' +
          '</div>';
        box.appendChild(btnRow);

        btnRow.querySelector('.ai-btn-confirm').addEventListener('click', function() {
          var section = document.getElementById('ai-img-choice-section');
          var finalImg = section && section._getSelectedImage ? section._getSelectedImage() : result.image;
          var finalWine = section && section._getSelectedWine ? section._getSelectedWine() : bestMatch;
          document.body.removeChild(overlay);
          addRecentWine(finalWine);
          if (onResult) onResult(finalWine, { image: finalImg, text: result.text });
        });
        btnRow.querySelector('.ai-btn-cancel').addEventListener('click', function() {
          document.body.removeChild(overlay);
          if (onCancel) onCancel();
        });

        var searchBtn = btnRow.querySelector('.ai-btn-search');
        searchBtn.addEventListener('click', function() {
          showNoResultState(result);
        });
      } else {
        showNoResultState(result);
      }
    }

    function showNoResultState(result) {
      var loadingState = overlay.querySelector('.ai-loading-state');
      var resultState = overlay.querySelector('.ai-result-state');
      var box = resultState;
      loadingState.style.display = 'none';
      resultState.style.display = 'block';
      resultState.style.animation = 'ai-bounce-in 0.3s ease';

      box.innerHTML =
        '<div style="text-align:center;margin-bottom:20px;">' +
          '<div style="width:56px;height:56px;border-radius:50%;background:#f5f0e8;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;">' +
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
          '</div>' +
          '<div style="font-size:18px;font-weight:600;color:var(--color-text-primary);margin-bottom:4px;">没自动认出来</div>' +
          '<div style="font-size:14px;color:var(--color-text-tertiary);line-height:1.5;">没关系，搜一下或者手动填<br>拍清晰正面、光线好会更容易识别</div>' +
        '</div>' +
        '<div style="margin-bottom:12px;">' +
          '<div style="position:relative;">' +
            '<input type="text" class="ai-manual-search" placeholder="🔍 输入酒名搜索，如：茅台、五粮液" style="width:100%;padding:14px 16px;border:2px solid var(--color-border);border-radius:12px;font-size:15px;outline:none;box-sizing:border-box;">' +
          '</div>' +
          '<div class="ai-hot-brands" style="margin-top:12px;"></div>' +
          '<div class="ai-manual-results" style="margin-top:8px;max-height:220px;overflow-y:auto;"></div>' +
        '</div>' +
        '<div style="display:flex;gap:10px;">' +
          '<button type="button" class="ai-btn-cancel" style="flex:1;padding:14px;border-radius:12px;border:1.5px solid var(--color-border);background:#fff;font-size:15px;cursor:pointer;font-weight:500;color:var(--color-text-secondary);">稍后再说，我自己填</button>' +
        '</div>';

      setupManualSearch(box, result);
      box.querySelector('.ai-btn-cancel').addEventListener('click', function() {
        document.body.removeChild(overlay);
        if (onCancel) onCancel();
      });
    }

    return { overlay: overlay, updateProgress: updateProgress, showResult: showResult, showNoResult: showNoResultState, close: function() { if (overlay.parentNode) document.body.removeChild(overlay); } };
  }

  function createStdImageButton(containerEl, wine, uploader, currentImageRef) {
    var old = document.getElementById('ai-std-img-btn');
    if (old) old.remove();
    if (!wine) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'ai-std-img-btn';
    btn.style.cssText = 'margin-top:10px;width:100%;padding:12px;border:1.5px dashed var(--color-primary);background:rgba(139,105,20,0.04);color:var(--color-primary);border-radius:12px;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .2s;font-weight:500;';
    btn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' +
      '✨ 一键换AI标准产品图';
    containerEl.appendChild(btn);

    var generating = false;

    function setGenerating() {
      generating = true;
      btn.disabled = true;
      btn.style.opacity = '0.8';
      btn.innerHTML =
        '<div style="width:18px;height:18px;border:2px solid rgba(139,105,20,0.3);border-top-color:var(--color-primary);border-radius:50%;animation:ai-spin 0.8s linear infinite;"></div>' +
        ' 正在生成标准图，请稍候...';
    }

    function setSuccess() {
      btn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' +
        ' 已切换为AI标准图 ✓';
      btn.style.background = 'rgba(46,204,113,0.1)';
      btn.style.borderColor = '#2ECC71';
      btn.style.borderStyle = 'solid';
      btn.style.color = '#27AE60';
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.boxShadow = '0 0 0 3px rgba(46,204,113,0.2)';
      generating = false;
      if (window.WineCabinetApp && WineCabinetApp.showToast) {
        WineCabinetApp.showToast('✨ 已切换为AI标准产品图', 'success');
      }
      setTimeout(function() { btn.style.boxShadow = ''; }, 800);
    }

    function setFallback() {
      btn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
        ' 网络不太好，用了示意图';
      btn.style.color = '#e67e22';
      btn.style.borderColor = '#e67e22';
      btn.disabled = false;
      btn.style.opacity = '1';
      generating = false;
      setTimeout(resetBtn, 3000);
    }

    function setRetry() {
      btn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>' +
        ' 生成失败，点击重试';
      btn.style.color = '#e74c3c';
      btn.style.borderColor = '#e74c3c';
      btn.style.background = 'rgba(231,76,60,0.05)';
      btn.disabled = false;
      btn.style.opacity = '1';
      generating = false;
    }

    function resetBtn() {
      btn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>' +
        '✨ 一键换AI标准产品图';
      btn.style.color = 'var(--color-primary)';
      btn.style.borderColor = 'var(--color-primary)';
      btn.style.background = 'rgba(139,105,20,0.04)';
      btn.style.borderStyle = 'dashed';
      btn.style.boxShadow = '';
    }

    btn.addEventListener('click', function() {
      if (generating) return;
      setGenerating();
      var query = (wine.brand || '') + ' ' + (wine.name || '');
      // 先搜百度商品图
      searchProductImage(query).then(function(bdImg) {
        if (bdImg) {
          var testImg = new Image();
          testImg.crossOrigin = 'anonymous';
          testImg.onload = function() {
            if (currentImageRef) currentImageRef.value = bdImg;
            uploader.setImage(bdImg);
            setSuccess();
          };
          testImg.onerror = function() {
            generateAiImage();
          };
          testImg.src = bdImg;
          return;
        }
        generateAiImage();
      }).catch(function() {
        generateAiImage();
      });

      function generateAiImage() {
        var stdUrl = WineDB.generateImageUrl(wine) + '&t=' + Date.now();
        loadImageWithTimeout(stdUrl, 12000).then(function(img) {
          var dataUrl = imageToDataURL(img);
          var finalUrl = dataUrl || WineDB.generateFallbackImage(wine);
          if (dataUrl) {
            if (currentImageRef) currentImageRef.value = finalUrl;
            uploader.setImage(finalUrl);
            setSuccess();
          } else {
            if (currentImageRef) currentImageRef.value = finalUrl;
            uploader.setImage(finalUrl);
            setFallback();
          }
        }).catch(function() {
          setRetry();
        });
      }
    });
    return btn;
  }

  preloadTesseract();

  return {
    compressImage: compressImage,
    recognizeWine: recognizeWine,
    recognizeText: recognizeText,
    fillForm: fillForm,
    createSuggestionBox: createSuggestionBox,
    createImageUploader: createImageUploader,
    createRecognitionOverlay: createRecognitionOverlay,
    createStdImageButton: createStdImageButton,
    loadTesseract: loadTesseract,
    loadImageWithTimeout: loadImageWithTimeout,
    imageToDataURL: imageToDataURL,
    preloadTesseract: preloadTesseract,
    quickRecognize: quickRecognize
  };
})();

if (typeof window !== 'undefined') { window.AIHelper = AIHelper; }
