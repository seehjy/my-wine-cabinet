/**
 * 中国名酒数据库 - 内置常见白酒/洋酒/葡萄酒/啤酒/黄酒/果酒的标准信息
 * 用于AI智能识别和自动填充，覆盖市面上绝大多数常见酒款
 */
const WineDB = (function() {
  const WINES = [
    { brand: '茅台', name: '飞天茅台', fullName: '贵州茅台酒 飞天', type: '酱香', degree: 53, capacity: 500, price: 2699, origin: '贵州仁怀', keywords: ['feitian', 'ftmt', '飞天', '茅台', 'moutai', '贵州茅台', '普飞', '新飞天'], color: '#C41E3A' },
    { brand: '茅台', name: '五星茅台', fullName: '贵州茅台酒 五星', type: '酱香', degree: 53, capacity: 500, price: 2599, origin: '贵州仁怀', keywords: ['五星', 'wx', 'wuxing'], color: '#C41E3A' },
    { brand: '茅台', name: '生肖茅台', fullName: '贵州茅台酒 生肖纪念', type: '酱香', degree: 53, capacity: 500, price: 3299, origin: '贵州仁怀', keywords: ['生肖', 'sx', 'shengxiao', '龙年', '虎年', '兔年', '鼠年', '牛年', '马年', '羊年', '猴年', '鸡年', '狗年', '猪年'], color: '#C41E3A' },
    { brand: '茅台', name: '茅台王子酒', fullName: '茅台王子酒', type: '酱香', degree: 53, capacity: 500, price: 298, origin: '贵州仁怀', keywords: ['王子', 'wz', 'wangzi', '普王', '酱香经典', '珍品王子', '金王子'], color: '#C41E3A' },
    { brand: '茅台', name: '茅台迎宾酒', fullName: '茅台迎宾酒', type: '酱香', degree: 53, capacity: 500, price: 168, origin: '贵州仁怀', keywords: ['迎宾', 'yb', 'yingbin', '紫迎宾'], color: '#C41E3A' },
    { brand: '茅台', name: '茅台1935', fullName: '茅台1935', type: '酱香', degree: 53, capacity: 500, price: 1188, origin: '贵州仁怀', keywords: ['1935', 'moutai1935'], color: '#C41E3A' },
    { brand: '茅台', name: '汉酱', fullName: '茅台汉酱酒', type: '酱香', degree: 51, capacity: 500, price: 498, origin: '贵州仁怀', keywords: ['汉酱', 'hj', 'hanjiang', '茅字汉酱'], color: '#1E3A5F' },
    { brand: '茅台', name: '仁酒', fullName: '茅台仁酒', type: '酱香', degree: 53, capacity: 500, price: 398, origin: '贵州仁怀', keywords: ['仁酒', 'renjiu'], color: '#C41E3A' },
    { brand: '茅台', name: '贵州大曲', fullName: '茅台贵州大曲', type: '酱香', degree: 53, capacity: 500, price: 258, origin: '贵州仁怀', keywords: ['贵州大曲', 'gzdq', 'daqu', '80年代', '70年代'], color: '#C41E3A' },
    { brand: '茅台', name: '赖茅传承蓝', fullName: '赖茅 传承蓝', type: '酱香', degree: 53, capacity: 500, price: 458, origin: '贵州仁怀', keywords: ['赖茅', 'laimao', '传承', 'cc', '传承棕', '端曲', '重沙', '精典'], color: '#1E3A5F' },
    { brand: '茅台', name: '王茅', fullName: '茅台王茅祥邦', type: '酱香', degree: 53, capacity: 500, price: 798, origin: '贵州仁怀', keywords: ['王茅', 'wm', 'wangmao', '祥邦', '祥雅'], color: '#1a1a1a' },
    { brand: '茅台', name: '华茅', fullName: '茅台华茅', type: '酱香', degree: 53, capacity: 500, price: 698, origin: '贵州仁怀', keywords: ['华茅', 'hm', 'huamao'], color: '#DAA520' },

    { brand: '五粮液', name: '普五第八代', fullName: '五粮液 普五第八代', type: '浓香', degree: 52, capacity: 500, price: 1099, origin: '四川宜宾', keywords: ['pw', 'puwu', '普五', '第八代', 'dbd', '52度', 'wuliangye', '五粮液', '普五'], color: '#B8860B' },
    { brand: '五粮液', name: '普五第七代', fullName: '五粮液 普五第七代', type: '浓香', degree: 52, capacity: 500, price: 999, origin: '四川宜宾', keywords: ['第七代', 'dqd', 'qd', '老普五'], color: '#B8860B' },
    { brand: '五粮液', name: '1618', fullName: '五粮液 1618', type: '浓香', degree: 52, capacity: 500, price: 1080, origin: '四川宜宾', keywords: ['1618', '红白瓶', '瓷瓶'], color: '#C41E3A' },
    { brand: '五粮液', name: '交杯牌', fullName: '五粮液 交杯牌', type: '浓香', degree: 52, capacity: 500, price: 1399, origin: '四川宜宾', keywords: ['交杯', 'jiaobei', 'jb', '交杯牌', '交杯酒'], color: '#B8860B' },
    { brand: '五粮液', name: '五粮春', fullName: '五粮液 五粮春', type: '浓香', degree: 52, capacity: 500, price: 298, origin: '四川宜宾', keywords: ['五粮春', 'wlc', 'wuliangchun', '一代', '二代', '第二代'], color: '#2E8B57' },
    { brand: '五粮液', name: '五粮醇', fullName: '五粮液 五粮醇', type: '浓香', degree: 50, capacity: 500, price: 138, origin: '四川宜宾', keywords: ['五粮醇', 'wlc2', 'wuliangchun', '红淡雅', '蓝淡雅', '金淡雅', '臻选'], color: '#B8860B' },
    { brand: '五粮液', name: '尖庄', fullName: '五粮液 尖庄', type: '浓香', degree: 50, capacity: 500, price: 68, origin: '四川宜宾', keywords: ['尖庄', 'jz', 'jianzhuang', '高光', '大光', '精盒', '红优'], color: '#C41E3A' },
    { brand: '五粮液', name: '永福酱酒', fullName: '五粮液 永福酱酒', type: '酱香', degree: 53, capacity: 500, price: 598, origin: '四川宜宾', keywords: ['永福', 'yongfu', '永福酱', '15酱'], color: '#C41E3A' },

    { brand: '国窖1573', name: '经典装', fullName: '国窖1573 经典装', type: '浓香', degree: 52, capacity: 500, price: 1199, origin: '四川泸州', keywords: ['国窖', 'gj', 'guojiao', '1573', '经典', 'jd', 'luzhoulaojiao', '泸州老窖', '国窖1573'], color: '#8B0000' },
    { brand: '国窖1573', name: '中国品味', fullName: '国窖1573 中国品味', type: '浓香', degree: 52, capacity: 500, price: 1899, origin: '四川泸州', keywords: ['中国品味', 'zgpw', 'zhongguopinwei'], color: '#8B0000' },
    { brand: '国窖1573', name: '君耀', fullName: '国窖1573 君耀', type: '浓香', degree: 52, capacity: 500, price: 899, origin: '四川泸州', keywords: ['君耀', 'junyao', '君雅'], color: '#8B0000' },
    { brand: '泸州老窖', name: '特曲', fullName: '泸州老窖 特曲', type: '浓香', degree: 52, capacity: 500, price: 368, origin: '四川泸州', keywords: ['特曲', 'teku', 'tk', 'lzlj', '老字号', '第十代', '晶彩特曲'], color: '#C8102E' },
    { brand: '泸州老窖', name: '头曲', fullName: '泸州老窖 头曲', type: '浓香', degree: 52, capacity: 500, price: 158, origin: '四川泸州', keywords: ['头曲', 'touqu', 'tq', '六年陈', '六年头', '蓝花瓷', '精品头曲'], color: '#C8102E' },
    { brand: '泸州老窖', name: '窖龄60年', fullName: '泸州老窖 窖龄60年', type: '浓香', degree: 52, capacity: 500, price: 458, origin: '四川泸州', keywords: ['窖龄', 'jiaoling', 'jl', '60年', '60n', '六十年'], color: '#C8102E' },
    { brand: '泸州老窖', name: '窖龄90年', fullName: '泸州老窖 窖龄90年', type: '浓香', degree: 52, capacity: 500, price: 698, origin: '四川泸州', keywords: ['90年', '90n', '窖龄90', '九十年'], color: '#C8102E' },
    { brand: '泸州老窖', name: '窖龄30年', fullName: '泸州老窖 窖龄30年', type: '浓香', degree: 52, capacity: 500, price: 298, origin: '四川泸州', keywords: ['30年', '30n', '窖龄30', '三十年'], color: '#C8102E' },
    { brand: '泸州老窖', name: '二曲', fullName: '泸州老窖 二曲', type: '浓香', degree: 52, capacity: 500, price: 58, origin: '四川泸州', keywords: ['二曲', 'erqu', 'eq', '黑盖'], color: '#C8102E' },

    { brand: '剑南春', name: '水晶剑', fullName: '剑南春 水晶剑', type: '浓香', degree: 52, capacity: 500, price: 489, origin: '四川绵竹', keywords: ['水晶剑', 'sjj', 'shuijingjian', 'jnc', 'jiannanchun', '普剑', '剑南春'], color: '#DAA520' },
    { brand: '剑南春', name: '东方红', fullName: '剑南春 东方红', type: '浓香', degree: 52, capacity: 500, price: 899, origin: '四川绵竹', keywords: ['东方红', 'dfh', 'dongfanghong', '1949'], color: '#C41E3A' },
    { brand: '剑南春', name: '珍藏级剑南春', fullName: '剑南春 珍藏级', type: '浓香', degree: 52, capacity: 500, price: 788, origin: '四川绵竹', keywords: ['珍藏', 'zangcun', 'zc', 'zhencang', '珍剑', '珍藏剑'], color: '#DAA520' },
    { brand: '剑南春', name: '金剑南K6', fullName: '剑南春 金剑南K6', type: '浓香', degree: 52, capacity: 500, price: 228, origin: '四川绵竹', keywords: ['金剑南', 'jjn', 'jinjiannan', 'k6', 'k3'], color: '#DAA520' },
    { brand: '剑南春', name: '银剑南', fullName: '剑南春 银剑南', type: '浓香', degree: 52, capacity: 500, price: 98, origin: '四川绵竹', keywords: ['银剑南', 'yjn', 'yinjiannan', 'a9', 'a3'], color: '#C0C0C0' },

    { brand: '洋河', name: '梦之蓝M6+', fullName: '洋河 梦之蓝M6+', type: '浓香', degree: 52, capacity: 550, price: 788, origin: '江苏宿迁', keywords: ['m6', '梦之蓝', 'mzl', 'mengzhilan', '梦6', 'm6+', 'yanghe', '洋河', '梦六'], color: '#1E3A5F' },
    { brand: '洋河', name: '梦之蓝M9', fullName: '洋河 梦之蓝M9', type: '浓香', degree: 52, capacity: 500, price: 1499, origin: '江苏宿迁', keywords: ['m9', '梦9', '手工班', '梦九'], color: '#1E3A5F' },
    { brand: '洋河', name: '梦之蓝M3水晶版', fullName: '洋河 梦之蓝M3水晶版', type: '浓香', degree: 52, capacity: 500, price: 568, origin: '江苏宿迁', keywords: ['m3', '梦3', '水晶版', 'sjb', '水晶梦', '梦三'], color: '#1E3A5F' },
    { brand: '洋河', name: '梦之蓝M1', fullName: '洋河 梦之蓝M1', type: '浓香', degree: 52, capacity: 500, price: 298, origin: '江苏宿迁', keywords: ['m1', '梦1', '梦一'], color: '#4169E1' },
    { brand: '洋河', name: '天之蓝', fullName: '洋河 天之蓝', type: '浓香', degree: 52, capacity: 480, price: 398, origin: '江苏宿迁', keywords: ['天之蓝', 'tzl', 'tianzhilan', '新版', '老版', '第五代', '第六代'], color: '#4169E1' },
    { brand: '洋河', name: '海之蓝', fullName: '洋河 海之蓝', type: '浓香', degree: 52, capacity: 480, price: 178, origin: '江苏宿迁', keywords: ['海之蓝', 'hzl', 'haizhilan'], color: '#1E90FF' },
    { brand: '洋河', name: '洋河大曲', fullName: '洋河大曲', type: '浓香', degree: 55, capacity: 500, price: 88, origin: '江苏宿迁', keywords: ['洋河大曲', 'yanghedaqu', '蓝瓷', '老天蓝', '新天蓝'], color: '#1E90FF' },

    { brand: '汾酒', name: '青花30复兴版', fullName: '汾酒 青花30复兴版', type: '清香', degree: 53, capacity: 500, price: 1099, origin: '山西汾阳', keywords: ['青花30', 'qh30', 'qinghua30', 'fendou', '汾酒', '复兴', 'fx'], color: '#1E5AA8' },
    { brand: '汾酒', name: '青花20', fullName: '汾酒 青花20', type: '清香', degree: 53, capacity: 500, price: 538, origin: '山西汾阳', keywords: ['青花20', 'qh20', 'qinghua20', '青花', '青花20年'], color: '#1E5AA8' },
    { brand: '汾酒', name: '青花40', fullName: '汾酒 青花40', type: '清香', degree: 53, capacity: 500, price: 1599, origin: '山西汾阳', keywords: ['青花40', 'qh40', 'qinghua40', '中国龙'], color: '#1E5AA8' },
    { brand: '汾酒', name: '老白汾10年', fullName: '汾酒 老白汾10年', type: '清香', degree: 53, capacity: 475, price: 168, origin: '山西汾阳', keywords: ['老白汾', 'lbf', 'laobaifen', '10年', '10n', '坛汾', '十年'], color: '#8B4513' },
    { brand: '汾酒', name: '老白汾20年', fullName: '汾酒 老白汾20年', type: '清香', degree: 53, capacity: 475, price: 328, origin: '山西汾阳', keywords: ['20年', '20n', '黑坛', '二十年'], color: '#1a1a1a' },
    { brand: '汾酒', name: '巴拿马金奖20', fullName: '汾酒 巴拿马金奖20', type: '清香', degree: 53, capacity: 475, price: 398, origin: '山西汾阳', keywords: ['巴拿马', 'banama', '金奖', '黑坛20', '金奖20'], color: '#DAA520' },
    { brand: '汾酒', name: '黄盖玻汾', fullName: '汾酒 黄盖玻汾', type: '清香', degree: 53, capacity: 475, price: 58, origin: '山西汾阳', keywords: ['玻汾', 'bf', 'bofen', '黄盖', 'huangai', '夺命53', '玻璃瓶'], color: '#DAA520' },
    { brand: '汾酒', name: '红盖玻汾', fullName: '汾酒 红盖玻汾', type: '清香', degree: 42, capacity: 475, price: 48, origin: '山西汾阳', keywords: ['红盖', 'honggai', '42度', '红盖玻汾'], color: '#C41E3A' },
    { brand: '汾酒', name: '出口白瓷汾', fullName: '汾酒 出口白瓷汾', type: '清香', degree: 53, capacity: 500, price: 88, origin: '山西汾阳', keywords: ['出口汾', 'ckf', 'chukou', '白瓷', '瓷瓶汾'], color: '#C0C0C0' },
    { brand: '竹叶青', name: '竹叶青酒', fullName: '竹叶青酒', type: '其他', degree: 45, capacity: 500, price: 128, origin: '山西汾阳', keywords: ['竹叶青', 'zyq', 'zhuyeqing', '牧童', '国宝', '露酒', '玻竹'], color: '#2E8B57' },

    { brand: '郎酒', name: '青花郎', fullName: '郎酒 青花郎', type: '酱香', degree: 53, capacity: 500, price: 1298, origin: '四川古蔺', keywords: ['青花郎', 'qhl', 'qinghualang', 'langjiu', '郎酒'], color: '#003366' },
    { brand: '郎酒', name: '红花郎15年', fullName: '郎酒 红花郎15年', type: '酱香', degree: 53, capacity: 500, price: 698, origin: '四川古蔺', keywords: ['红花郎', 'hhl', 'honghualang', '15年', '15n', '红15', '红十五'], color: '#C41E3A' },
    { brand: '郎酒', name: '红花郎10年', fullName: '郎酒 红花郎10年', type: '酱香', degree: 53, capacity: 500, price: 458, origin: '四川古蔺', keywords: ['10年', 'hhl10', '10n', '红10', '红十'], color: '#C41E3A' },
    { brand: '郎酒', name: '普郎', fullName: '郎酒 普郎', type: '酱香', degree: 53, capacity: 500, price: 298, origin: '四川古蔺', keywords: ['普郎', 'pl', 'pulang', '郎牌郎酒', '老郎酒'], color: '#C41E3A' },
    { brand: '郎酒', name: '顺品郎', fullName: '郎酒 顺品郎', type: '兼香', degree: 45, capacity: 480, price: 68, origin: '四川古蔺', keywords: ['顺品', 'spin', 'shunpin', '蓝顺', '红顺', '顺品郎蓝顺'], color: '#1E5AA8' },
    { brand: '郎酒', name: '郎牌特曲', fullName: '郎酒 郎牌特曲', type: '浓香', degree: 50, capacity: 500, price: 158, origin: '四川古蔺', keywords: ['郎牌特曲', 'lptq', 't3', 't6', 't9', '鉴赏版'], color: '#C41E3A' },
    { brand: '郎酒', name: '青云郎', fullName: '郎酒 青云郎50年', type: '酱香', degree: 53, capacity: 500, price: 2680, origin: '四川古蔺', keywords: ['青云郎', 'qyl', 'qingyunlang', '50年', '红运郎'], color: '#003366' },

    { brand: '习酒', name: '君品习酒', fullName: '习酒 君品', type: '酱香', degree: 53, capacity: 500, price: 858, origin: '贵州习水', keywords: ['君品', 'jp', 'junpin', '习酒', 'xijiu'], color: '#8B4513' },
    { brand: '习酒', name: '窖藏1988', fullName: '习酒 窖藏1988', type: '酱香', degree: 53, capacity: 500, price: 698, origin: '贵州习水', keywords: ['窖藏1988', 'jc1988', 'jiaocang', '1988', '88', '1988雅致版'], color: '#8B4513' },
    { brand: '习酒', name: '窖藏1998', fullName: '习酒 窖藏1998', type: '酱香', degree: 53, capacity: 500, price: 498, origin: '贵州习水', keywords: ['1998', 'jc1998', '98'], color: '#8B4513' },
    { brand: '习酒', name: '窖藏1988金爵版', fullName: '习酒 窖藏1988金爵', type: '酱香', degree: 53, capacity: 500, price: 898, origin: '贵州习水', keywords: ['金爵', 'jinjue'], color: '#DAA520' },
    { brand: '习酒', name: '金钻习酒', fullName: '习酒 金钻', type: '酱香', degree: 53, capacity: 500, price: 298, origin: '贵州习水', keywords: ['金钻', 'jz', 'jinzuan'], color: '#DAA520' },
    { brand: '习酒', name: '银钻习酒', fullName: '习酒 银钻', type: '酱香', degree: 53, capacity: 500, price: 228, origin: '贵州习水', keywords: ['银钻', 'yz', 'yinzuan'], color: '#C0C0C0' },
    { brand: '习酒', name: '金质习酒', fullName: '习酒 金质', type: '酱香', degree: 53, capacity: 500, price: 258, origin: '贵州习水', keywords: ['金质', 'jinzhi', '金习'], color: '#DAA520' },
    { brand: '习酒', name: '银质习酒', fullName: '习酒 银质', type: '酱香', degree: 53, capacity: 500, price: 198, origin: '贵州习水', keywords: ['银质', 'yinzhi', '银习'], color: '#C0C0C0' },
    { brand: '习酒', name: '老习酒', fullName: '老习酒', type: '酱香', degree: 53, capacity: 500, price: 138, origin: '贵州习水', keywords: ['老习酒', 'lxj', 'laoxijiu', '红习酒'], color: '#C41E3A' },

    { brand: '舍得', name: '品味舍得', fullName: '舍得 品味舍得', type: '浓香', degree: 52, capacity: 500, price: 598, origin: '四川射洪', keywords: ['品味', 'pinwei', 'pw', '舍得', 'shede', '四代', '五代', '第四代', '第五代'], color: '#2E4A3F' },
    { brand: '舍得', name: '智慧舍得', fullName: '舍得 智慧舍得', type: '浓香', degree: 52, capacity: 500, price: 788, origin: '四川射洪', keywords: ['智慧', 'zhihui', 'zh', '智慧舍'], color: '#2E4A3F' },
    { brand: '舍得', name: '藏品舍得10年', fullName: '舍得 藏品10年', type: '浓香', degree: 52, capacity: 500, price: 698, origin: '四川射洪', keywords: ['藏品', 'cangpin', 'cp', '10年', '10n', '十年'], color: '#2E4A3F' },
    { brand: '舍得', name: '自由爱', fullName: '舍得 自由爱', type: '浓香', degree: 50, capacity: 500, price: 99, origin: '四川射洪', keywords: ['自由爱', 'zya', 'ziyouai'], color: '#2E4A3F' },
    { brand: '舍得', name: '水晶舍得', fullName: '舍得 水晶舍得', type: '浓香', degree: 52, capacity: 500, price: 498, origin: '四川射洪', keywords: ['水晶舍得', 'sjsd', 'shuijingshede'], color: '#2E4A3F' },
    { brand: '舍得', name: '大师舍得', fullName: '舍得 大师舍得', type: '浓香', degree: 52, capacity: 500, price: 898, origin: '四川射洪', keywords: ['大师舍得', 'dssd', 'dashishede'], color: '#2E4A3F' },
    { brand: '舍得', name: '天子呼', fullName: '舍得 天子呼', type: '酱香', degree: 53, capacity: 500, price: 2980, origin: '四川射洪', keywords: ['天子呼', 'tzh', 'tianzihu'], color: '#8B0000' },
    { brand: '舍得', name: '吞之乎', fullName: '舍得 吞之乎', type: '酱香', degree: 53, capacity: 500, price: 1280, origin: '四川射洪', keywords: ['吞之乎', 'tzh', 'tunzhihu'], color: '#2E4A3F' },
    { brand: '舍得', name: '自在', fullName: '舍得 自在', type: '浓香', degree: 52, capacity: 500, price: 368, origin: '四川射洪', keywords: ['自在', 'zizai', 'zz', '自在舍'], color: '#2E4A3F' },
    { brand: '舍得', name: '舍之道', fullName: '舍得 舍之道', type: '浓香', degree: 50, capacity: 500, price: 188, origin: '四川射洪', keywords: ['舍之道', 'shezhidao', 'szd'], color: '#2E4A3F' },
    { brand: '舍得', name: '沱牌天曲', fullName: '沱牌 天曲', type: '浓香', degree: 52, capacity: 500, price: 168, origin: '四川射洪', keywords: ['天曲', 'tianqu', 'tq'], color: '#4A3728' },
    { brand: '沱牌', name: 'T68', fullName: '沱牌 T68', type: '浓香', degree: 50, capacity: 480, price: 88, origin: '四川射洪', keywords: ['t68', '特级', 'teji', '沱牌特级'], color: '#4A3728' },
    { brand: '沱牌', name: '沱牌曲酒', fullName: '沱牌曲酒 30年', type: '浓香', degree: 52, capacity: 500, price: 358, origin: '四川射洪', keywords: ['沱牌曲酒', 'tpqj', 'qujiu', '30年', '沱牌'], color: '#4A3728' },

    { brand: '酒鬼酒', name: '内参', fullName: '酒鬼酒 内参', type: '其他', degree: 52, capacity: 500, price: 1080, origin: '湖南吉首', keywords: ['内参', 'neican', 'nc', '酒鬼', 'jiugui'], color: '#8B008B' },
    { brand: '酒鬼酒', name: '红坛酒鬼', fullName: '酒鬼酒 红坛', type: '其他', degree: 52, capacity: 500, price: 568, origin: '湖南吉首', keywords: ['红坛', 'ht', 'hongtan', '高度柔和'], color: '#C41E3A' },
    { brand: '酒鬼酒', name: '黄坛酒鬼', fullName: '酒鬼酒 黄坛', type: '其他', degree: 52, capacity: 500, price: 418, origin: '湖南吉首', keywords: ['黄坛', 'huangtan'], color: '#DAA520' },
    { brand: '酒鬼酒', name: '传承酒鬼', fullName: '酒鬼酒 传承', type: '其他', degree: 52, capacity: 500, price: 328, origin: '湖南吉首', keywords: ['传承', 'chuancheng'], color: '#8B008B' },
    { brand: '酒鬼酒', name: '紫坛酒鬼', fullName: '酒鬼酒 紫坛', type: '其他', degree: 52, capacity: 500, price: 658, origin: '湖南吉首', keywords: ['紫坛', 'zt', 'zitan', '柔和'], color: '#8B008B' },
    { brand: '酒鬼酒', name: '湘泉', fullName: '酒鬼酒 湘泉', type: '其他', degree: 54, capacity: 500, price: 68, origin: '湖南吉首', keywords: ['湘泉', 'xq', 'xiangquan', '盒优', '乡恋', '城事'], color: '#8B4513' },

    { brand: '古井贡酒', name: '古20', fullName: '古井贡酒 年份原浆古20', type: '浓香', degree: 52, capacity: 500, price: 698, origin: '安徽亳州', keywords: ['古20', 'g20', 'gu20', '古井', 'gujing', '年份原浆', 'nfyj', '中国香'], color: '#8B0000' },
    { brand: '古井贡酒', name: '古16', fullName: '古井贡酒 年份原浆古16', type: '浓香', degree: 52, capacity: 500, price: 518, origin: '安徽亳州', keywords: ['古16', 'g16', 'gu16'], color: '#8B0000' },
    { brand: '古井贡酒', name: '古8', fullName: '古井贡酒 年份原浆古8', type: '浓香', degree: 52, capacity: 500, price: 358, origin: '安徽亳州', keywords: ['古8', 'g8', 'gu8'], color: '#8B0000' },
    { brand: '古井贡酒', name: '古5', fullName: '古井贡酒 年份原浆古5', type: '浓香', degree: 50, capacity: 500, price: 198, origin: '安徽亳州', keywords: ['古5', 'g5', 'gu5'], color: '#8B0000' },
    { brand: '古井贡酒', name: '献礼版', fullName: '古井贡酒 年份原浆献礼版', type: '浓香', degree: 50, capacity: 500, price: 128, origin: '安徽亳州', keywords: ['献礼', 'xianli', 'xl', '第五代', '第六代'], color: '#8B0000' },
    { brand: '古井贡酒', name: '古26', fullName: '古井贡酒 年份原浆古26', type: '浓香', degree: 52, capacity: 500, price: 1280, origin: '安徽亳州', keywords: ['古26', 'g26', 'gu26'], color: '#8B0000' },
    { brand: '古井贡酒', name: '古30', fullName: '古井贡酒 年份原浆古30', type: '浓香', degree: 52, capacity: 500, price: 1980, origin: '安徽亳州', keywords: ['古30', 'g30', 'gu30'], color: '#8B0000' },
    { brand: '古井贡酒', name: '古20大坛2.5L', fullName: '古井贡酒 年份原浆古20大坛2.5L', type: '浓香', degree: 52, capacity: 2500, price: 3580, origin: '安徽亳州', keywords: ['古20大坛', 'g20dt', 'gu20datan', '2.5L', '大坛'], color: '#8B0000' },
    { brand: '古井贡酒', name: '1963', fullName: '古井贡酒 1963', type: '浓香', degree: 55, capacity: 500, price: 298, origin: '安徽亳州', keywords: ['1963', 'gj1963', '古井1963'], color: '#8B0000' },
    { brand: '古井贡酒', name: '1979', fullName: '古井贡酒 1979', type: '浓香', degree: 45, capacity: 500, price: 198, origin: '安徽亳州', keywords: ['1979', 'gj1979', '古井1979'], color: '#8B0000' },
    { brand: '古井贡酒', name: '1989', fullName: '古井贡酒 1989', type: '浓香', degree: 50, capacity: 500, price: 158, origin: '安徽亳州', keywords: ['1989', 'gj1989', '古井1989'], color: '#8B0000' },
    { brand: '古井贡酒', name: '青花大坛2.5L', fullName: '古井贡酒 青花大坛2.5L', type: '浓香', degree: 50, capacity: 2500, price: 298, origin: '安徽亳州', keywords: ['青花大坛', 'qhdt', 'qinghuadatan', '2.5L', '大坛'], color: '#1E5AA8' },
    { brand: '黄鹤楼酒', name: 'H6', fullName: '黄鹤楼酒 H6', type: '浓香', degree: 53, capacity: 500, price: 198, origin: '湖北武汉', keywords: ['黄鹤楼', 'hhl', 'huanghelou', 'h6', 'h9', '经典', 'c6', 'c9'], color: '#DAA520' },
    { brand: '黄鹤楼酒', name: 'H9', fullName: '黄鹤楼酒 H9', type: '浓香', degree: 53, capacity: 500, price: 328, origin: '湖北武汉', keywords: ['h9', '黄鹤楼h9'], color: '#DAA520' },
    { brand: '黄鹤楼酒', name: '经典', fullName: '黄鹤楼酒 经典', type: '浓香', degree: 52, capacity: 500, price: 158, origin: '湖北武汉', keywords: ['经典', 'jd', 'jingdian'], color: '#DAA520' },
    { brand: '黄鹤楼酒', name: 'C6', fullName: '黄鹤楼酒 C6', type: '清香', degree: 53, capacity: 500, price: 258, origin: '湖北武汉', keywords: ['c6', '黄鹤楼c6', '清香'], color: '#1E5AA8' },
    { brand: '黄鹤楼酒', name: 'C9', fullName: '黄鹤楼酒 C9', type: '清香', degree: 53, capacity: 500, price: 428, origin: '湖北武汉', keywords: ['c9', '黄鹤楼c9', '清香'], color: '#1E5AA8' },
    { brand: '黄鹤楼酒', name: '更上层楼', fullName: '黄鹤楼酒 更上层楼', type: '浓香', degree: 52, capacity: 500, price: 98, origin: '湖北武汉', keywords: ['更上层楼', 'gscl', 'gengshangcenglou'], color: '#DAA520' },
    { brand: '黄鹤楼酒', name: '一楼', fullName: '黄鹤楼酒 一楼', type: '浓香', degree: 52, capacity: 500, price: 78, origin: '湖北武汉', keywords: ['一楼', 'yilou', 'yl'], color: '#DAA520' },
    { brand: '黄鹤楼酒', name: '三楼', fullName: '黄鹤楼酒 三楼', type: '浓香', degree: 52, capacity: 500, price: 168, origin: '湖北武汉', keywords: ['三楼', 'sanlou', 'sl'], color: '#DAA520' },
    { brand: '黄鹤楼酒', name: '五楼', fullName: '黄鹤楼酒 五楼', type: '浓香', degree: 52, capacity: 500, price: 298, origin: '湖北武汉', keywords: ['五楼', 'wulou', 'wl'], color: '#DAA520' },

    { brand: '水井坊', name: '井台', fullName: '水井坊 井台', type: '浓香', degree: 52, capacity: 500, price: 598, origin: '四川成都', keywords: ['井台', 'jt', 'jingtai', '水井坊', 'shuijingfang', '新一代', '新井台'], color: '#8B4513' },
    { brand: '水井坊', name: '臻酿八号', fullName: '水井坊 臻酿八号', type: '浓香', degree: 52, capacity: 500, price: 428, origin: '四川成都', keywords: ['臻酿', 'zn', 'zhenniang', '八号', 'bahao', '8号', 'zhenniangbahao'], color: '#8B4513' },
    { brand: '水井坊', name: '菁翠', fullName: '水井坊 菁翠', type: '浓香', degree: 52, capacity: 500, price: 1699, origin: '四川成都', keywords: ['菁翠', 'jc', 'jingcui'], color: '#2E4A3F' },
    { brand: '水井坊', name: '典藏大师', fullName: '水井坊 典藏大师版', type: '浓香', degree: 52, capacity: 500, price: 898, origin: '四川成都', keywords: ['典藏', 'diancang', '大师版', 'ds'], color: '#DAA520' },
    { brand: '水井坊', name: '鸿运装', fullName: '水井坊 鸿运装', type: '浓香', degree: 52, capacity: 500, price: 458, origin: '四川成都', keywords: ['鸿运', 'hongyun', '红瓶'], color: '#C41E3A' },

    { brand: '珍酒', name: '珍三十', fullName: '珍酒 珍三十', type: '酱香', degree: 53, capacity: 500, price: 988, origin: '贵州遵义', keywords: ['珍三十', 'z30', 'zs30', 'zhen30', '珍酒', 'zhenjiu'], color: '#B8860B' },
    { brand: '珍酒', name: '珍十五', fullName: '珍酒 珍十五', type: '酱香', degree: 53, capacity: 500, price: 598, origin: '贵州遵义', keywords: ['珍十五', 'z15', 'zs15', 'zhen15'], color: '#B8860B' },
    { brand: '珍酒', name: '珍八', fullName: '珍酒 珍八', type: '酱香', degree: 53, capacity: 500, price: 288, origin: '贵州遵义', keywords: ['珍八', 'z8', 'zhen8'], color: '#B8860B' },
    { brand: '珍酒', name: '珍五', fullName: '珍酒 珍五', type: '酱香', degree: 53, capacity: 500, price: 168, origin: '贵州遵义', keywords: ['珍五', 'z5', 'zhen5', '蓝珍五'], color: '#1E5AA8' },
    { brand: '珍酒', name: '老珍酒', fullName: '老珍酒', type: '酱香', degree: 53, capacity: 500, price: 98, origin: '贵州遵义', keywords: ['老珍酒', 'lzj', 'laozhenjiu', '红珍'], color: '#C41E3A' },

    { brand: '金沙', name: '摘要', fullName: '金沙酒 摘要', type: '酱香', degree: 53, capacity: 500, price: 798, origin: '贵州金沙', keywords: ['摘要', 'zy', 'zhaiyao', '金沙', 'jinsha', '珍品版', '喜庆版', '金沙回沙'], color: '#2F4F4F' },
    { brand: '金沙', name: '回沙五星', fullName: '金沙 回沙五星', type: '酱香', degree: 53, capacity: 500, price: 198, origin: '贵州金沙', keywords: ['回沙', 'hs', 'huisha', '五星', 'wx', '5星'], color: '#2F4F4F' },
    { brand: '金沙', name: '酱酒七星', fullName: '金沙 酱酒七星', type: '酱香', degree: 53, capacity: 500, price: 358, origin: '贵州金沙', keywords: ['七星', 'qx', 'qixing', '7星', '真沙'], color: '#DAA520' },
    { brand: '金沙', name: '摘要珍品版', fullName: '金沙 摘要珍品版', type: '酱香', degree: 53, capacity: 500, price: 698, origin: '贵州金沙', keywords: ['珍品版', 'zpb', 'zhenpinban'], color: '#2F4F4F' },

    { brand: '西凤', name: '红西凤', fullName: '西凤酒 红西凤', type: '兼香', degree: 52, capacity: 500, price: 1099, origin: '陕西凤翔', keywords: ['红西凤', 'hxf', 'hongxifeng', '西凤', 'xifeng'], color: '#C41E3A' },
    { brand: '西凤', name: '华山论剑20年', fullName: '西凤酒 华山论剑20年', type: '兼香', degree: 52, capacity: 500, price: 398, origin: '陕西凤翔', keywords: ['华山论剑', 'hslj', 'huashanlunjian', '20年', '20n', '二十年'], color: '#DAA520' },
    { brand: '西凤', name: '华山论剑10年', fullName: '西凤酒 华山论剑10年', type: '兼香', degree: 52, capacity: 500, price: 228, origin: '陕西凤翔', keywords: ['10年', '10n', '十年', 'hslj10'], color: '#DAA520' },
    { brand: '西凤', name: '华山论剑30年', fullName: '西凤酒 华山论剑30年', type: '兼香', degree: 55, capacity: 500, price: 698, origin: '陕西凤翔', keywords: ['30年', '30n', '三十年', 'hslj30'], color: '#DAA520' },
    { brand: '西凤', name: '6年陈酿', fullName: '西凤酒 6年陈酿', type: '兼香', degree: 52, capacity: 500, price: 188, origin: '陕西凤翔', keywords: ['6年', '六年', '6n', '六年陈', '六年陈酿'], color: '#1E90FF' },
    { brand: '西凤', name: '15年陈酿', fullName: '西凤酒 15年陈酿', type: '兼香', degree: 52, capacity: 500, price: 328, origin: '陕西凤翔', keywords: ['15年', '十五年', '15n', '国花瓷'], color: '#DAA520' },
    { brand: '西凤', name: '绿脖西凤', fullName: '西凤酒 绿脖高脖', type: '兼香', degree: 55, capacity: 500, price: 58, origin: '陕西凤翔', keywords: ['绿脖', 'lvbo', '绿瓶', '高脖', 'gaobo', '经典绿瓶'], color: '#2E8B57' },
    { brand: '西凤', name: '西凤375', fullName: '西凤酒 375', type: '兼香', degree: 45, capacity: 375, price: 48, origin: '陕西凤翔', keywords: ['375', '七两半'], color: '#C41E3A' },

    { brand: '董酒', name: '国密董酒', fullName: '董酒 国密', type: '其他', degree: 54, capacity: 500, price: 598, origin: '贵州遵义', keywords: ['国密', 'gm', 'guomi', '董酒', 'dongjiu', '方印', '董香型'], color: '#2E4A3F' },
    { brand: '董酒', name: '特级国密', fullName: '董酒 特级国密', type: '其他', degree: 54, capacity: 500, price: 898, origin: '贵州遵义', keywords: ['特级', 'tj', 'teji', '黑标'], color: '#2E4A3F' },
    { brand: '董酒', name: '百草香', fullName: '董酒 百草香', type: '其他', degree: 54, capacity: 500, price: 1280, origin: '贵州遵义', keywords: ['百草香', 'bcc', 'baicaoxiang'], color: '#2E4A3F' },
    { brand: '董酒', name: '老贵董', fullName: '董酒 老贵董', type: '其他', degree: 54, capacity: 500, price: 128, origin: '贵州遵义', keywords: ['老贵董', 'lgd', 'laoguidong', '红董'], color: '#C41E3A' },

    { brand: '双沟', name: '珍宝坊圣坊', fullName: '双沟 珍宝坊圣坊', type: '浓香', degree: 52, capacity: 500, price: 368, origin: '江苏泗洪', keywords: ['珍宝坊', 'zbf', 'zhenbaofang', '圣坊', 'sf', '双沟', 'shuanggou'], color: '#8B4513' },
    { brand: '双沟', name: '君坊', fullName: '双沟 珍宝坊君坊', type: '浓香', degree: 52, capacity: 500, price: 168, origin: '江苏泗洪', keywords: ['君坊', 'junfang', '红君坊'], color: '#DAA520' },
    { brand: '双沟', name: '双沟大曲', fullName: '双沟大曲 金奖', type: '浓香', degree: 53, capacity: 500, price: 88, origin: '江苏泗洪', keywords: ['双沟大曲', 'shuanggoudaqu', '金奖', '名玻', '黑牡丹'], color: '#C41E3A' },

    { brand: '白云边', name: '20年陈酿', fullName: '白云边 20年陈酿', type: '兼香', degree: 53, capacity: 500, price: 398, origin: '湖北荆州', keywords: ['白云边', 'byb', 'baiyunbian', '20年', '20n', '二十年'], color: '#4169E1' },
    { brand: '白云边', name: '15年陈酿', fullName: '白云边 15年陈酿', type: '兼香', degree: 53, capacity: 500, price: 268, origin: '湖北荆州', keywords: ['15年', '15n', '十五年'], color: '#4169E1' },
    { brand: '白云边', name: '12年陈酿', fullName: '白云边 12年陈酿', type: '兼香', degree: 42, capacity: 500, price: 158, origin: '湖北荆州', keywords: ['12年', '12n', '十二年'], color: '#4169E1' },

    { brand: '口子窖', name: '口子窖20年', fullName: '口子窖 20年', type: '兼香', degree: 50, capacity: 500, price: 518, origin: '安徽淮北', keywords: ['口子窖', 'kzj', 'kouzijiao', '20年', '20n', '二十年', '型男'], color: '#8B4513' },
    { brand: '口子窖', name: '口子窖10年', fullName: '口子窖 10年', type: '兼香', degree: 50, capacity: 500, price: 328, origin: '安徽淮北', keywords: ['10年', '10n', '十年'], color: '#8B4513' },
    { brand: '口子窖', name: '口子窖6年', fullName: '口子窖 6年', type: '兼香', degree: 46, capacity: 450, price: 158, origin: '安徽淮北', keywords: ['6年', '六年', '6n', '真藏实窖'], color: '#8B4513' },
    { brand: '口子窖', name: '口子窖5年', fullName: '口子窖 5年', type: '兼香', degree: 46, capacity: 400, price: 98, origin: '安徽淮北', keywords: ['5年', '五年', '5n'], color: '#8B4513' },

    { brand: '迎驾贡酒', name: '洞藏20年', fullName: '迎驾贡酒 洞藏20年', type: '浓香', degree: 52, capacity: 500, price: 598, origin: '安徽霍山', keywords: ['迎驾', 'yj', 'yingjia', '洞藏', 'dc', 'dongcang', '生态洞藏', '20年'], color: '#2E8B57' },
    { brand: '迎驾贡酒', name: '洞藏16年', fullName: '迎驾贡酒 洞藏16年', type: '浓香', degree: 52, capacity: 500, price: 458, origin: '安徽霍山', keywords: ['16年', '16n', '洞16'], color: '#2E8B57' },
    { brand: '迎驾贡酒', name: '洞藏9年', fullName: '迎驾贡酒 洞藏9年', type: '浓香', degree: 52, capacity: 500, price: 298, origin: '安徽霍山', keywords: ['9年', '9n', '洞9', '金星', '银星'], color: '#2E8B57' },
    { brand: '迎驾贡酒', name: '迎驾金星', fullName: '迎驾贡酒 金星', type: '浓香', degree: 52, capacity: 500, price: 198, origin: '安徽霍山', keywords: ['金星', 'jx', 'jinxing'], color: '#DAA520' },
    { brand: '迎驾贡酒', name: '迎驾银星', fullName: '迎驾贡酒 银星', type: '浓香', degree: 52, capacity: 500, price: 128, origin: '安徽霍山', keywords: ['银星', 'yx', 'yinxing'], color: '#C0C0C0' },

    { brand: '今世缘', name: '国缘四开', fullName: '今世缘 国缘四开', type: '浓香', degree: 42, capacity: 500, price: 568, origin: '江苏涟水', keywords: ['国缘', 'gy', 'guoyuan', '四开', 'sk', 'sikai', '今世缘', 'jinshiyuan'], color: '#8B0000' },
    { brand: '今世缘', name: '国缘对开', fullName: '今世缘 国缘对开', type: '浓香', degree: 42, capacity: 500, price: 368, origin: '江苏涟水', keywords: ['对开', 'dk', 'duikai', '双开'], color: '#8B0000' },
    { brand: '今世缘', name: '国缘V9', fullName: '今世缘 国缘V9', type: '酱香', degree: 53, capacity: 500, price: 1680, origin: '江苏涟水', keywords: ['v9', '清雅酱香'], color: '#2E4A3F' },
    { brand: '今世缘', name: '典藏10年', fullName: '今世缘 典藏10年', type: '浓香', degree: 42, capacity: 500, price: 198, origin: '江苏涟水', keywords: ['典藏', 'dc', 'diancang', '10年'], color: '#DAA520' },
    { brand: '高沟', name: '大青花', fullName: '高沟 大青花', type: '浓香', degree: 42, capacity: 500, price: 88, origin: '江苏涟水', keywords: ['高沟', 'gg', 'gaogou', '大青花', '小青花'], color: '#1E5AA8' },

    { brand: '牛栏山', name: '经典二锅头', fullName: '牛栏山 经典二锅头', type: '清香', degree: 52, capacity: 500, price: 68, origin: '北京', keywords: ['牛栏山', 'nls', 'niulanshan', '二锅头', 'erguotou', '白牛二', '牛白瓶', '陈酿白酒', '42度', '46度', '52度', '43度', '45度', '白牛'], color: '#C41E3A' },
    { brand: '牛栏山', name: '黄龙二锅头', fullName: '牛栏山 经典黄龙', type: '清香', degree: 52, capacity: 500, price: 358, origin: '北京', keywords: ['黄龙', 'hl', 'huanglong', '经典黄龙', '牛栏山黄龙'], color: '#DAA520' },
    { brand: '牛栏山', name: '珍品三十年', fullName: '牛栏山 珍品三十年', type: '清香', degree: 53, capacity: 500, price: 298, origin: '北京', keywords: ['珍品', 'zp', 'zhenpin', '三十年', '30年', '青龙'], color: '#1E5AA8' },
    { brand: '红星', name: '蓝瓶二锅头', fullName: '红星 蓝瓶二锅头', type: '清香', degree: 53, capacity: 500, price: 58, origin: '北京', keywords: ['红星', 'hx', 'hongxing', '二锅头', 'erguotou', '蓝瓶', 'lp', 'lanping', '绵柔8', 'mr8', '56度', '53度', '43度', '绵柔8陈酿'], color: '#1E5AA8' },
    { brand: '红星', name: '大二锅头', fullName: '红星 大二锅头', type: '清香', degree: 56, capacity: 500, price: 28, origin: '北京', keywords: ['大二', 'daer', '绿瓶', '56度', '56°', '大二绿瓶', '红星二锅头'], color: '#2E8B57' },
    { brand: '红星', name: '红星1949', fullName: '红星 1949千尊', type: '清香', degree: 52, capacity: 500, price: 398, origin: '北京', keywords: ['1949', '千尊', 'qz', 'qianzun'], color: '#C41E3A' },
    { brand: '一担粮', name: '二锅头', fullName: '一担粮 二锅头', type: '清香', degree: 42, capacity: 480, price: 38, origin: '北京', keywords: ['一担粮', 'ydl', 'yidanliang', '逗号', 'douhao', '老号'], color: '#8B4513' },

    { brand: '衡水老白干', name: '古法20年', fullName: '衡水老白干 古法20年', type: '其他', degree: 67, capacity: 500, price: 458, origin: '河北衡水', keywords: ['衡水老白干', 'hslbg', 'hengshuilaobaigan', '老白干', 'lbg', 'laobaigan', '古法', 'gf', 'gufa', '20年', '67度', '老白干香型'], color: '#C41E3A' },
    { brand: '衡水老白干', name: '古法30年', fullName: '衡水老白干 古法30年', type: '其他', degree: 67, capacity: 500, price: 798, origin: '河北衡水', keywords: ['30年', '古法30', '67度'], color: '#C41E3A' },
    { brand: '衡水老白干', name: '冰峰67度', fullName: '衡水老白干 冰峰', type: '其他', degree: 67, capacity: 500, price: 158, origin: '河北衡水', keywords: ['冰峰', 'bf', 'bingfeng'], color: '#4169E1' },
    { brand: '衡水老白干', name: '青花手酿', fullName: '衡水老白干 青花手酿', type: '其他', degree: 62, capacity: 500, price: 298, origin: '河北衡水', keywords: ['青花手酿', 'qhsn'], color: '#1E5AA8' },

    { brand: '四特酒', name: '东方韵弘韵', fullName: '四特酒 东方韵弘韵', type: '其他', degree: 52, capacity: 500, price: 328, origin: '江西樟树', keywords: ['四特', 'st', 'site', '东方韵', 'dfy', 'dongfangyun', '弘韵', 'hy', 'hongyun', '特香', 'texiang'], color: '#8B4513' },
    { brand: '四特酒', name: '东方韵雅韵', fullName: '四特酒 东方韵雅韵', type: '其他', degree: 52, capacity: 500, price: 498, origin: '江西樟树', keywords: ['雅韵', 'yy', 'yayun'], color: '#DAA520' },
    { brand: '四特酒', name: '十五年陈酿', fullName: '四特酒 十五年陈酿', type: '其他', degree: 52, capacity: 500, price: 398, origin: '江西樟树', keywords: ['十五年', '15年', '15n'], color: '#C41E3A' },

    { brand: '江小白', name: '金盖', fullName: '江小白 金盖', type: '清香', degree: 52, capacity: 500, price: 98, origin: '重庆', keywords: ['江小白', 'jxb', 'jiangxiaobai', '金盖', 'jg', 'jingai', '黑标', 'hb', '表达瓶', '高粱酒', '清香'], color: '#C0C0C0' },
    { brand: '劲酒', name: '中国劲酒', fullName: '劲牌 中国劲酒', type: '其他', degree: 35, capacity: 500, price: 58, origin: '湖北大冶', keywords: ['劲酒', 'jj', 'jinjiu', '中国劲酒', 'zgij', 'jinpai', '劲牌', '蓝标', '红标', '参茸劲酒', '保健酒'], color: '#C41E3A' },

    { brand: '人头马', name: 'XO', fullName: 'Remy Martin XO', type: '洋酒', degree: 40, capacity: 700, price: 1580, origin: '法国干邑', keywords: ['人头马', 'rtm', 'remy', 'martin', 'xo', '干邑', 'cognac', '优质香槟区', '人头马xo'], color: '#DAA520' },
    { brand: '人头马', name: 'VSOP', fullName: 'Remy Martin VSOP', type: '洋酒', degree: 40, capacity: 700, price: 580, origin: '法国干邑', keywords: ['vsop', '特优香槟干邑', '人头马vsop'], color: '#DAA520' },
    { brand: '人头马', name: 'CLUB', fullName: 'Remy Martin CLUB', type: '洋酒', degree: 40, capacity: 700, price: 780, origin: '法国干邑', keywords: ['club', '角马', 'club优质香槟区', '人头马club'], color: '#DAA520' },

    { brand: '轩尼诗', name: 'XO', fullName: 'Hennessy XO', type: '洋酒', degree: 40, capacity: 700, price: 1780, origin: '法国干邑', keywords: ['轩尼诗', 'xns', 'hennessy', 'xo', '轩尼诗xo'], color: '#8B0000' },
    { brand: '轩尼诗', name: 'VSOP', fullName: 'Hennessy VSOP', type: '洋酒', degree: 40, capacity: 700, price: 520, origin: '法国干邑', keywords: ['vsop', '新版', '老版', '轩尼诗vsop'], color: '#8B0000' },
    { brand: '轩尼诗', name: '百乐廷', fullName: 'Hennessy Paradis', type: '洋酒', degree: 40, capacity: 700, price: 3800, origin: '法国干邑', keywords: ['百乐廷', 'blt', 'baileting', '杯莫停', 'paradis', '天堂'], color: '#DAA520' },
    { brand: '轩尼诗', name: '新点', fullName: 'Hennessy Classivm', type: '洋酒', degree: 40, capacity: 700, price: 380, origin: '法国干邑', keywords: ['新点', 'xd', 'xindian', 'classivm'], color: '#8B0000' },

    { brand: '马爹利', name: '蓝带', fullName: 'Martell Cordon Bleu', type: '洋酒', degree: 40, capacity: 700, price: 1380, origin: '法国干邑', keywords: ['马爹利', 'mdl', 'martell', '蓝带', 'landai', 'cordon', 'bleu', '马爹利蓝带'], color: '#1E3A5F' },
    { brand: '马爹利', name: 'XO', fullName: 'Martell XO', type: '洋酒', degree: 40, capacity: 700, price: 1680, origin: '法国干邑', keywords: ['xo', '拱桥', 'gongqiao', '马爹利xo'], color: '#1E3A5F' },
    { brand: '马爹利', name: '名士', fullName: 'Martell Noblige', type: '洋酒', degree: 40, capacity: 700, price: 680, origin: '法国干邑', keywords: ['名士', 'ms', 'mingshi', '名仕', 'noblige', '鼎盛', '马爹利名士'], color: '#DAA520' },
    { brand: '马爹利', name: '金牌VSOP', fullName: 'Martell VSOP', type: '洋酒', degree: 40, capacity: 700, price: 480, origin: '法国干邑', keywords: ['vsop', '金牌', 'jp', 'jinpai', '鼎盛', '马爹利vsop'], color: '#1E3A5F' },

    { brand: '拿破仑', name: 'XO', fullName: 'Courvoisier XO', type: '洋酒', degree: 40, capacity: 700, price: 1280, origin: '法国干邑', keywords: ['拿破仑', 'npl', 'napolun', 'courvoisier', 'xo', '馥华诗'], color: '#8B0000' },

    { brand: '尊尼获加', name: '黑牌', fullName: 'Johnnie Walker Black Label', type: '洋酒', degree: 40, capacity: 700, price: 268, origin: '苏格兰', keywords: ['黑牌', 'hp', 'heipai', 'black', 'label', 'johnnie', 'walker', '尊尼获加', '黑方', 'heifang', '12年', '黑牌12年'], color: '#1a1a1a' },
    { brand: '尊尼获加', name: '红牌', fullName: 'Johnnie Walker Red Label', type: '洋酒', degree: 40, capacity: 700, price: 138, origin: '苏格兰', keywords: ['红牌', 'hongpai', 'red', '红方', 'hongfang'], color: '#C41E3A' },
    { brand: '尊尼获加', name: '金牌珍藏', fullName: 'Johnnie Walker Gold Label', type: '洋酒', degree: 40, capacity: 700, price: 458, origin: '苏格兰', keywords: ['金牌', 'jp', 'jinpai', 'gold', '金方', 'jinfang'], color: '#DAA520' },
    { brand: '尊尼获加', name: '绿牌15年', fullName: 'Johnnie Walker Green Label', type: '洋酒', degree: 43, capacity: 700, price: 428, origin: '苏格兰', keywords: ['绿牌', 'lvpai', 'green', '绿方', 'lvfang', '15年'], color: '#2E8B57' },
    { brand: '尊尼获加', name: '蓝牌', fullName: 'Johnnie Walker Blue Label', type: '洋酒', degree: 40, capacity: 700, price: 1580, origin: '苏格兰', keywords: ['蓝牌', 'lanpai', 'blue', '蓝方', 'lanfang'], color: '#1E5AA8' },

    { brand: '芝华士', name: '12年', fullName: 'Chivas Regal 12年', type: '洋酒', degree: 40, capacity: 700, price: 258, origin: '苏格兰', keywords: ['芝华士', 'zhs', 'zhihuashi', 'chivas', '12年', '12n', 'regal', '新境', '芝华士12年'], color: '#DAA520' },
    { brand: '芝华士', name: '18年', fullName: 'Chivas Regal 18年', type: '洋酒', degree: 40, capacity: 700, price: 580, origin: '苏格兰', keywords: ['18年', '18n', '芝华士18年'], color: '#DAA520' },

    { brand: '麦卡伦', name: '12年雪莉桶', fullName: 'Macallan 12年雪莉桶', type: '洋酒', degree: 40, capacity: 700, price: 780, origin: '苏格兰', keywords: ['麦卡伦', 'mkl', 'makalun', 'macallan', '12年', '雪莉桶', 'xuelitong', 'sherry', 'oak', '蓝钻', '黑钻', '双桶', '单桶', '麦卡伦12年'], color: '#8B4513' },
    { brand: '麦卡伦', name: '15年双桶', fullName: 'Macallan 15年双桶', type: '洋酒', degree: 43, capacity: 700, price: 1580, origin: '苏格兰', keywords: ['15年', '双桶', 'shuangtong', 'double', 'cask'], color: '#8B4513' },
    { brand: '麦卡伦', name: '18年雪莉桶', fullName: 'Macallan 18年雪莉桶', type: '洋酒', degree: 43, capacity: 700, price: 2880, origin: '苏格兰', keywords: ['18年', 'sherry', 'oak'], color: '#8B4513' },

    { brand: '格兰菲迪', name: '12年', fullName: 'Glenfiddich 12年', type: '洋酒', degree: 40, capacity: 700, price: 328, origin: '苏格兰', keywords: ['格兰菲迪', 'glfd', 'gelanfeidi', 'glenfiddich', '12年', '15年', '18年', '21年', '格兰菲迪12年', '单一麦芽'], color: '#2E8B57' },

    { brand: '山崎', name: '12年', fullName: 'Yamazaki 12年', type: '洋酒', degree: 43, capacity: 700, price: 2280, origin: '日本', keywords: ['山崎', 'sq', 'shanqi', 'yamazaki', '12年', '18年', '日本威士忌', 'single', 'malt'], color: '#8B0000' },
    { brand: '白州', name: '12年', fullName: 'Hakushu 12年', type: '洋酒', degree: 43, capacity: 700, price: 1880, origin: '日本', keywords: ['白州', 'bz', 'baizhou', 'hakushu', '12年'], color: '#2E8B57' },
    { brand: '响', name: '和风醇韵', fullName: 'Hibiki Harmony', type: '洋酒', degree: 43, capacity: 700, price: 1080, origin: '日本', keywords: ['响', 'xiang', 'hibiki', '和风醇韵', 'hefengchunyun', 'harmony', '三得利', 'suntory'], color: '#DAA520' },

    { brand: '杰克丹尼', name: '黑标', fullName: 'Jack Daniels Old No.7', type: '洋酒', degree: 40, capacity: 700, price: 228, origin: '美国', keywords: ['杰克丹尼', 'jkdn', 'jiekedanni', 'jack', 'daniels', '黑标', 'heibiao', 'old', 'no7', '田纳西', 'tennessee', '威士忌', '杰克丹尼黑标'], color: '#1a1a1a' },
    { brand: '尊美醇', name: '爱尔兰威士忌', fullName: 'Jameson Irish Whiskey', type: '洋酒', degree: 40, capacity: 700, price: 168, origin: '爱尔兰', keywords: ['尊美醇', 'zmc', 'zunmeichun', 'jameson', '爱尔兰', 'ailan', 'irish', 'whiskey'], color: '#2E8B57' },

    { brand: '绝对伏特加', name: '原味', fullName: 'Absolut Vodka Original', type: '洋酒', degree: 40, capacity: 700, price: 128, origin: '瑞典', keywords: ['绝对伏特加', 'jdftj', 'jueduifutejia', 'absolut', 'vodka', '原味', 'yuanwei', '原味伏特加'], color: '#C0C0C0' },
    { brand: '灰雁', name: '伏特加', fullName: 'Grey Goose Vodka', type: '洋酒', degree: 40, capacity: 700, price: 328, origin: '法国', keywords: ['灰雁', 'hy', 'huiyan', 'grey', 'goose', '伏特加', 'futejia'], color: '#4169E1' },

    { brand: '百加得', name: '白朗姆', fullName: 'Bacardi Superior White', type: '洋酒', degree: 40, capacity: 750, price: 98, origin: '波多黎各', keywords: ['百加得', 'bjd', 'baijiade', 'bacardi', '白朗姆', 'blm', 'bailangmu', '朗姆酒', 'langmujiu', 'superior', 'rum'], color: '#C0C0C0' },
    { brand: '摩根船长', name: '黑朗姆', fullName: 'Captain Morgan Black', type: '洋酒', degree: 40, capacity: 700, price: 118, origin: '牙买加', keywords: ['摩根船长', 'mgcz', 'mogenchuanzhang', 'captain', 'morgan', '黑朗姆', 'hlm', '朗姆酒', 'rum'], color: '#1a1a1a' },

    { brand: '添加利', name: '伦敦干金酒', fullName: 'Tanqueray London Dry Gin', type: '洋酒', degree: 43.1, capacity: 750, price: 158, origin: '英国', keywords: ['添加利', 'tjl', 'tianjiali', 'tanqueray', '金酒', 'jinjiu', 'gin', '伦敦干金', 'london', 'dry'], color: '#2E8B57' },
    { brand: '孟买蓝宝石', name: '金酒', fullName: 'Bombay Sapphire Gin', type: '洋酒', degree: 40, capacity: 750, price: 198, origin: '英国', keywords: ['孟买蓝宝石', 'mmlbs', 'mengmailanbaoshi', 'bombay', 'sapphire', '金酒', 'gin'], color: '#1E5AA8' },

    { brand: '豪帅', name: '金银龙舌兰', fullName: 'Jose Cuervo Especial Gold', type: '洋酒', degree: 40, capacity: 750, price: 148, origin: '墨西哥', keywords: ['豪帅', 'hs', 'haoshuai', 'jose', 'cuervo', '龙舌兰', 'lsl', 'longshelan', 'tequila', '金标', 'silver', 'gold', '快活'], color: '#DAA520' },
    { brand: '培恩', name: '银龙舌兰', fullName: 'Patron Silver Tequila', type: '洋酒', degree: 40, capacity: 750, price: 580, origin: '墨西哥', keywords: ['培恩', 'pe', 'peien', 'patron', 'silver', '龙舌兰', 'tequila'], color: '#C0C0C0' },

    { brand: '奔富', name: 'BIN389', fullName: 'Penfolds BIN389', type: '葡萄酒', degree: 14.5, capacity: 750, price: 680, origin: '澳大利亚', keywords: ['奔富', 'bf', 'penfolds', 'bin389', '389', '小葛兰许'], color: '#722F37' },
    { brand: '奔富', name: 'BIN407', fullName: 'Penfolds BIN407', type: '葡萄酒', degree: 14.5, capacity: 750, price: 780, origin: '澳大利亚', keywords: ['bin407', '407', '赤霞珠'], color: '#722F37' },
    { brand: '奔富', name: 'BIN128', fullName: 'Penfolds BIN128', type: '葡萄酒', degree: 14.5, capacity: 750, price: 328, origin: '澳大利亚', keywords: ['bin128', '128', '设拉子'], color: '#722F37' },
    { brand: '奔富', name: 'BIN28', fullName: 'Penfolds BIN28', type: '葡萄酒', degree: 14.5, capacity: 750, price: 268, origin: '澳大利亚', keywords: ['bin28', '28', '卡琳娜设拉子'], color: '#722F37' },
    { brand: '奔富', name: 'BIN8', fullName: 'Penfolds BIN8', type: '葡萄酒', degree: 14.5, capacity: 750, price: 198, origin: '澳大利亚', keywords: ['bin8', '8'], color: '#722F37' },
    { brand: '奔富', name: '寇兰山', fullName: 'Penfolds Koonunga Hill', type: '葡萄酒', degree: 14.5, capacity: 750, price: 128, origin: '澳大利亚', keywords: ['寇兰山', 'kls', 'koulanshan', 'koonunga', 'hill', '设拉子赤霞珠'], color: '#722F37' },
    { brand: '奔富', name: 'Maxs', fullName: "Penfolds Max's", type: '葡萄酒', degree: 14.5, capacity: 750, price: 298, origin: '澳大利亚', keywords: ['maxs', 'max', '麦克斯', 'maikesi', '承诺'], color: '#722F37' },
    { brand: '奔富', name: '葛兰许', fullName: 'Penfolds Grange', type: '葡萄酒', degree: 14.5, capacity: 750, price: 5800, origin: '澳大利亚', keywords: ['葛兰许', 'glx', 'gelanxu', 'grange', 'bin95', '酒王'], color: '#722F37' },

    { brand: '拉菲', name: '传奇波尔多', fullName: 'Lafite Legende Bordeaux', type: '葡萄酒', degree: 13, capacity: 750, price: 168, origin: '法国波尔多', keywords: ['拉菲', 'lf', 'lafite', '传奇', 'chuanqi', 'legende', 'bordeaux', '波尔多', 'red', '拉菲传奇'], color: '#722F37' },
    { brand: '拉菲', name: '传说波尔多', fullName: 'Lafite Saga Bordeaux', type: '葡萄酒', degree: 13, capacity: 750, price: 148, origin: '法国波尔多', keywords: ['传说', 'chuanshuo', 'saga', '拉菲传说'], color: '#722F37' },
    { brand: '拉菲', name: '珍藏波尔多', fullName: 'Lafite Reserve Bordeaux', type: '葡萄酒', degree: 13.5, capacity: 750, price: 268, origin: '法国波尔多', keywords: ['珍藏', 'zencang', 'reserve', '拉菲珍藏'], color: '#722F37' },
    { brand: '拉菲', name: '巴斯克十世', fullName: 'Los Vascos', type: '葡萄酒', degree: 14, capacity: 750, price: 398, origin: '智利', keywords: ['巴斯克', 'bsl', 'basike', 'los', 'vascos', '十世', 'shishi', '华诗歌'], color: '#722F37' },
    { brand: '拉菲', name: '拉菲古堡正牌', fullName: 'Chateau Lafite Rothschild', type: '葡萄酒', degree: 13.5, capacity: 750, price: 6800, origin: '法国波尔多', keywords: ['大拉菲', 'dlf', 'dalafei', '正牌', 'zhengpai', '古堡', 'gubao', 'chateau', 'rothschild', '一级庄'], color: '#722F37' },

    { brand: '杰卡斯', name: '经典西拉加本纳', fullName: 'Jacobs Creek Classic Shiraz Cabernet', type: '葡萄酒', degree: 13.9, capacity: 750, price: 98, origin: '澳大利亚', keywords: ['杰卡斯', 'jks', 'jiekasi', 'jacobs', 'creek', '经典', 'jingdian', 'classic', '西拉', 'xila', 'shiraz', '赤霞珠'], color: '#722F37' },
    { brand: '黄尾袋鼠', name: '西拉', fullName: 'Yellow Tail Shiraz', type: '葡萄酒', degree: 13.5, capacity: 750, price: 68, origin: '澳大利亚', keywords: ['黄尾袋鼠', 'hwdls', 'huangweidaishu', 'yellow', 'tail', 'shiraz', '西拉', '梅洛', 'meiluo', 'merlot', '赤霞珠', '加本力'], color: '#DAA520' },
    { brand: '天鹅庄', name: 'BIN88西拉', fullName: 'Swan BIN88', type: '葡萄酒', degree: 14.5, capacity: 750, price: 188, origin: '澳大利亚', keywords: ['天鹅庄', 'tez', 'tianezhuang', 'bin88', '88', '西拉', 'shiraz', '蓝龙虾', 'llx'], color: '#4169E1' },

    { brand: '张裕', name: '解百纳', fullName: '张裕 解百纳干红', type: '葡萄酒', degree: 13, capacity: 750, price: 128, origin: '山东烟台', keywords: ['张裕', 'zhangyu', 'zy', '解百纳', 'jiebaina', 'cabernet', '干红', 'ganhong', '第九代', 'ninth', '1937'], color: '#722F37' },
    { brand: '张裕', name: '卡斯特酒庄', fullName: '张裕 卡斯特酒庄', type: '葡萄酒', degree: 13, capacity: 750, price: 398, origin: '山东烟台', keywords: ['卡斯特', 'kste', 'kasite', 'chateau', 'changyu', '酒庄酒'], color: '#722F37' },
    { brand: '张裕', name: '爱斐堡国际酒庄', fullName: '张裕 爱斐堡', type: '葡萄酒', degree: 13, capacity: 750, price: 598, origin: '北京', keywords: ['爱斐堡', 'afb', 'afeibao', 'chateau', 'changyu', 'afip'], color: '#722F37' },
    { brand: '张裕', name: '雷司令白葡萄酒', fullName: '张裕 雷司令', type: '葡萄酒', degree: 12, capacity: 750, price: 98, origin: '山东烟台', keywords: ['雷司令', 'leisiling', 'riesling', '白葡萄酒', 'baijiu'], color: '#F0E68C' },
    { brand: '张裕', name: '可雅白兰地', fullName: '张裕 可雅XO', type: '洋酒', degree: 40, capacity: 700, price: 1680, origin: '山东烟台', keywords: ['可雅', 'ky', 'keya', 'koya', '白兰地', 'bailandi', 'brandy', 'xo', '桶藏'], color: '#DAA520' },
    { brand: '张裕', name: '金奖白兰地', fullName: '张裕 金奖白兰地', type: '洋酒', degree: 38, capacity: 750, price: 88, origin: '山东烟台', keywords: ['金奖', 'jj', 'jinjiang', 'vsop', '三星', '3星'], color: '#DAA520' },

    { brand: '长城', name: '五星干红', fullName: '长城 五星干红', type: '葡萄酒', degree: 13, capacity: 750, price: 198, origin: '河北沙城', keywords: ['长城', 'cc', 'changcheng', '五星', '5x', 'wuxing', 'greatwall', '干红', '赤霞珠', 'great', 'wall', '星级'], color: '#722F37' },
    { brand: '长城', name: '四星干红', fullName: '长城 四星干红', type: '葡萄酒', degree: 13, capacity: 750, price: 158, origin: '河北沙城', keywords: ['四星', '4x', 'sixing'], color: '#722F37' },
    { brand: '长城', name: '三星干红', fullName: '长城 三星干红', type: '葡萄酒', degree: 13, capacity: 750, price: 98, origin: '河北沙城', keywords: ['三星', '3x', 'sanxing', '解百纳'], color: '#722F37' },
    { brand: '长城', name: '天赋葡园', fullName: '长城 天赋葡园', type: '葡萄酒', degree: 13, capacity: 750, price: 258, origin: '河北沙城', keywords: ['天赋', 'tf', 'tianfu', '葡园', 'pyuan'], color: '#722F37' },
    { brand: '长城', name: '桑干酒庄', fullName: '长城 桑干酒庄', type: '葡萄酒', degree: 13.5, capacity: 750, price: 598, origin: '河北沙城', keywords: ['桑干', 'sg', 'sanggan', '酒庄', 'jiuzhuang', '特级精选'], color: '#722F37' },
    { brand: '长城', name: '华夏九二', fullName: '长城 华夏九二', type: '葡萄酒', degree: 13, capacity: 750, price: 298, origin: '河北昌黎', keywords: ['华夏九二', 'hxje', 'huaxiajiuer', '92', '九二', '珍藏级'], color: '#722F37' },

    { brand: '王朝', name: '橡木桶干红', fullName: '王朝 橡木桶94干红', type: '葡萄酒', degree: 12, capacity: 750, price: 88, origin: '天津', keywords: ['王朝', 'wc', 'wangchao', 'dynasty', '橡木桶', 'xmt', 'xiangmutong', '94', '干红'], color: '#722F37' },
    { brand: '怡园酒庄', name: '深蓝', fullName: 'Grace Vineyard Deep Blue', type: '葡萄酒', degree: 14, capacity: 750, price: 358, origin: '山西太谷', keywords: ['怡园', 'yyuan', 'yiyuan', 'grace', 'vineyard', '深蓝', 'shenlan', 'deep', 'blue'], color: '#1E3A5F' },

    { brand: '干露', name: '红魔鬼赤霞珠', fullName: 'Concha y Toro Casillero del Diablo', type: '葡萄酒', degree: 13.5, capacity: 750, price: 88, origin: '智利', keywords: ['干露', 'glu', 'ganlu', 'concha', 'toro', '红魔鬼', 'hmg', 'hongmogui', 'casillero', 'diablo', '赤霞珠', '梅洛'], color: '#C41E3A' },
    { brand: '蒙特斯', name: '欧法M', fullName: 'Montes Alpha M', type: '葡萄酒', degree: 14.5, capacity: 750, price: 980, origin: '智利', keywords: ['蒙特斯', 'mts', 'mengtesi', 'montes', 'alpha', '欧法', 'oufa', 'm', '紫天使', 'zts', 'zitianshi', 'purple', 'angel', '富乐'], color: '#722F37' },
    { brand: '蒙特斯', name: '经典赤霞珠', fullName: 'Montes Classic Cabernet', type: '葡萄酒', degree: 14, capacity: 750, price: 98, origin: '智利', keywords: ['经典', 'jd2', 'jingdian2', 'classic', '赤霞珠'], color: '#722F37' },

    { brand: '酩悦', name: '香槟', fullName: 'Moet & Chandon Imperial', type: '葡萄酒', degree: 12, capacity: 750, price: 398, origin: '法国香槟区', keywords: ['酩悦', 'my', 'mingyue', 'moet', 'chandon', '香槟', 'xb', 'xiangbin', 'champagne', '皇室', 'imperial'], color: '#DAA520' },
    { brand: '巴黎之花', name: '美丽时光', fullName: 'Perrier Jouet Belle Epoque', type: '葡萄酒', degree: 12.5, capacity: 750, price: 1580, origin: '法国香槟区', keywords: ['巴黎之花', 'blzh', 'balizhihua', 'perrier', 'jouet', '美丽时光', 'mls', 'meilishiguang', 'belle', 'epoque', '香槟'], color: '#C0C0C0' },
    { brand: '唐培里侬', name: '香槟王', fullName: 'Dom Perignon Vintage', type: '葡萄酒', degree: 12.5, capacity: 750, price: 2280, origin: '法国香槟区', keywords: ['唐培里侬', 'tpln', 'tangpeilinong', 'dom', 'perignon', '香槟王', 'xbw', 'xiangbinwang', 'p2', 'p3', 'vintage'], color: '#DAA520' },
    { brand: '凯歌', name: '皇牌香槟', fullName: 'Veuve Clicquot Yellow Label', type: '葡萄酒', degree: 12, capacity: 750, price: 498, origin: '法国香槟区', keywords: ['凯歌', 'kg', 'kaige', 'veuve', 'clicquot', '皇牌', '黄标', 'yellow', 'label', '香槟'], color: '#DAA520' },

    { brand: '青岛啤酒', name: '经典1903', fullName: '青岛啤酒 经典1903', type: '啤酒', degree: 4.3, capacity: 500, price: 8, origin: '山东青岛', keywords: ['青岛', 'qd', 'qingdao', 'tsingtao', '1903', '经典', 'jingdian', '啤酒', 'pijiu', 'beer', '纯生', 'cs', 'chunsheng', '奥古特', 'agt', 'augerta', '白啤', 'bp', 'baipi', '原浆', 'yj', 'yuanjiang', '青岛啤酒'], color: '#C41E3A' },
    { brand: '雪花啤酒', name: '勇闯天涯', fullName: '雪花啤酒 勇闯天涯', type: '啤酒', degree: 4.0, capacity: 500, price: 6, origin: '辽宁沈阳', keywords: ['雪花', 'xh', 'xuehua', 'snow', '勇闯天涯', 'ycty', 'yongchuangtianya', '啤酒', 'beer', '纯生', 'superx', '超级x', '匠心营造', 'jxyz', 'jiangxinyingzao', '脸谱', 'lp', '雪花啤酒'], color: '#1E5AA8' },
    { brand: '百威啤酒', name: '经典', fullName: 'Budweiser', type: '啤酒', degree: 3.6, capacity: 500, price: 9, origin: '美国', keywords: ['百威', 'bw', 'baiwei', 'budweiser', '啤酒', 'beer', '经典', 'jingdian', '红色瓶', '红瓶', '冰啤', 'bp', '百威啤酒'], color: '#C41E3A' },
    { brand: '哈尔滨啤酒', name: '小麦王', fullName: '哈尔滨啤酒 小麦王', type: '啤酒', degree: 3.6, capacity: 500, price: 5, origin: '黑龙江哈尔滨', keywords: ['哈尔滨', 'hrb', 'haerbin', 'harbin', '小麦王', 'xmw', 'xiaomaiwang', '啤酒', 'beer', '冰纯白啤', '纯白', 'cb', '哈尔滨啤酒'], color: '#1E90FF' },
    { brand: '燕京啤酒', name: 'U8', fullName: '燕京啤酒 U8', type: '啤酒', degree: 3.3, capacity: 500, price: 7, origin: '北京', keywords: ['燕京', 'yj', 'yanjing', 'u8', '啤酒', 'beer', '鲜啤', 'xianpi', 'v10', '白啤', '燕京啤酒'], color: '#C41E3A' },
    { brand: '嘉士伯', name: '特醇啤酒', fullName: 'Carlsberg', type: '啤酒', degree: 3.2, capacity: 500, price: 10, origin: '丹麦', keywords: ['嘉士伯', 'jsb', 'jiashibo', 'carlsberg', '特醇', 'tecun', '啤酒', 'beer', '绿罐'], color: '#2E8B57' },
    { brand: '喜力', name: '经典啤酒', fullName: 'Heineken', type: '啤酒', degree: 5.0, capacity: 500, price: 10, origin: '荷兰', keywords: ['喜力', 'xl', 'xili', 'heineken', '海尼根', '啤酒', 'beer', '经典', '星银', 'xy', 'xingyin', '喜力啤酒'], color: '#2E8B57' },
    { brand: '科罗娜', name: '特级啤酒', fullName: 'Corona Extra', type: '啤酒', degree: 4.5, capacity: 330, price: 12, origin: '墨西哥', keywords: ['科罗娜', 'kln', 'keluona', 'corona', 'extra', '特级', '啤酒', 'beer', '墨西哥', 'moxige'], color: '#DAA520' },
    { brand: '1664', name: '白啤酒', fullName: 'Kronenbourg 1664 Blanc', type: '啤酒', degree: 5.0, capacity: 330, price: 15, origin: '法国', keywords: ['1664', '白啤', 'baipi', 'blanc', '克伦堡', 'klb', 'kelunbao', 'kronenbourg', '啤酒', 'rose', '桃红'], color: '#4169E1' },
    { brand: '福佳', name: '白啤酒', fullName: 'Hoegaarden', type: '啤酒', degree: 4.9, capacity: 330, price: 12, origin: '比利时', keywords: ['福佳', 'fj', 'fujia', 'hoegaarden', '白啤', 'baipi', '福佳白', 'fub', '比利时小麦', 'bls'], color: '#F0E68C' },
    { brand: '白熊', name: '白啤酒', fullName: 'Vedett Extra White', type: '啤酒', degree: 4.7, capacity: 330, price: 14, origin: '比利时', keywords: ['白熊', 'baixiong', 'bx', 'vedett', 'extra', 'white', '白啤', '企鹅'], color: '#F0E68C' },
    { brand: '罗斯福', name: '6号啤酒', fullName: 'Rochefort 6', type: '啤酒', degree: 7.5, capacity: 330, price: 25, origin: '比利时', keywords: ['罗斯福', 'lsf', 'luosifu', 'rochefort', '6号', '8号', '10号', '6n', '8n', '10n', 'trappist', '修道院', '修道士啤酒'], color: '#8B4513' },
    { brand: '罗斯福', name: '8号啤酒', fullName: 'Rochefort 8', type: '啤酒', degree: 9.2, capacity: 330, price: 28, origin: '比利时', keywords: ['罗斯福8号', '8号'], color: '#8B4513' },
    { brand: '罗斯福', name: '10号啤酒', fullName: 'Rochefort 10', type: '啤酒', degree: 11.3, capacity: 330, price: 32, origin: '比利时', keywords: ['罗斯福10号', '10号'], color: '#8B4513' },
    { brand: '智美', name: '蓝帽', fullName: 'Chimay Blue', type: '啤酒', degree: 9, capacity: 330, price: 28, origin: '比利时', keywords: ['智美', 'zm', 'zhimei', 'chimay', '蓝帽', 'lm', 'lanmao', 'red', 'blue', 'white', '红帽', '白帽', '修道院啤酒'], color: '#1E3A5F' },

    { brand: '古越龙山', name: '中央库藏十年', fullName: '古越龙山 中央库藏十年', type: '黄酒', degree: 14, capacity: 500, price: 168, origin: '浙江绍兴', keywords: ['古越龙山', 'gyls', 'guyuelongshan', '十年', '10年', '10n', '中央库藏', 'zyk', 'zhongyangkucang', '黄酒', 'huangjiu', '花雕', 'huadiao', '绍兴酒', '绍兴'], color: '#DAA520' },
    { brand: '古越龙山', name: '八年陈', fullName: '古越龙山 八年陈', type: '黄酒', degree: 14, capacity: 500, price: 98, origin: '浙江绍兴', keywords: ['八年', '8年', '8n', '陈酿', 'cn'], color: '#DAA520' },
    { brand: '古越龙山', name: '二十年陈', fullName: '古越龙山 二十年陈', type: '黄酒', degree: 15, capacity: 500, price: 398, origin: '浙江绍兴', keywords: ['二十年', '20年', '20n', '千福花雕', 'qfhd', '千福'], color: '#DAA520' },
    { brand: '古越龙山', name: '三年陈花雕', fullName: '古越龙山 三年陈花雕', type: '黄酒', degree: 15, capacity: 500, price: 38, origin: '浙江绍兴', keywords: ['三年', '3年', '3n', '普通黄酒'], color: '#DAA520' },
    { brand: '女儿红', name: '绍兴花雕', fullName: '女儿红 绍兴花雕酒', type: '黄酒', degree: 14, capacity: 500, price: 68, origin: '浙江绍兴', keywords: ['女儿红', 'neh', 'nuverhong', '花雕', 'huadiao', '绍兴', 'shaoxing', '黄酒', '十年', '10年', '桂花林藏'], color: '#C41E3A' },
    { brand: '会稽山', name: '纯正三年', fullName: '会稽山 纯正三年', type: '黄酒', degree: 14, capacity: 500, price: 35, origin: '浙江绍兴', keywords: ['会稽山', 'hjs', 'kuaijishan', '三年', '3年', '纯正', 'cz', 'chunzheng', '绍兴黄酒', '花雕'], color: '#DAA520' },
    { brand: '塔牌', name: '丽春特型黄酒', fullName: '塔牌 丽春', type: '黄酒', degree: 14, capacity: 500, price: 58, origin: '浙江绍兴', keywords: ['塔牌', 'tp', 'tapai', '丽春', 'lc', 'lichun', '绍兴黄酒', '手工冬酿'], color: '#DAA520' },
    { brand: '石库门', name: '红标', fullName: '石库门 红标', type: '黄酒', degree: 14, capacity: 500, price: 48, origin: '上海', keywords: ['石库门', 'skm', 'shikumen', '红标', 'hb', 'hongbiao', '黑标', '上海老酒', 'shanghai', '和酒'], color: '#C41E3A' },
    { brand: '沙洲优黄', name: '六年陈', fullName: '沙洲优黄 六年陈', type: '黄酒', degree: 12, capacity: 500, price: 38, origin: '江苏张家港', keywords: ['沙洲优黄', 'szyh', 'shazhouyouhuang', '六年', '6年', '6n', '苏派黄酒'], color: '#DAA520' },

    { brand: '梅见', name: '青梅酒', fullName: '梅见 青梅酒', type: '其他', degree: 12, capacity: 330, price: 38, origin: '重庆', keywords: ['梅见', 'mj', 'meijian', '青梅酒', 'qmj', 'qingmeijiu', '白梅见', 'bmj', '金梅见', 'jmj', 'plum', 'wine', '果酒', 'guojiu'], color: '#90EE90' },
    { brand: '落饮', name: '茶果酒', fullName: '落饮 茶果酒', type: '其他', degree: 12, capacity: 300, price: 45, origin: '云南', keywords: ['落饮', 'ly', 'luoyin', '茶果酒', 'cgj', 'chaguojiu', '桃子', 'taozi', '荔枝', 'lizhi', '果酒'], color: '#FFB6C1' },
    { brand: '贝瑞甜心', name: '果酒', fullName: 'MissBerry 果酒', type: '其他', degree: 8, capacity: 300, price: 42, origin: '上海', keywords: ['贝瑞甜心', 'brtx', 'beiruitianxin', 'missberry', '果酒', 'guojiu', '桃子', 'taozi', '荔枝', '玫瑰'], color: '#FFB6C1' },

    { brand: '武陵酒', name: '上酱', fullName: '武陵酒 上酱', type: '酱香', degree: 53, capacity: 500, price: 898, origin: '湖南常德', keywords: ['武陵酒', 'wulingjiu', 'wl', '上酱', 'shangjiang', '中酱', 'zhongjiang', '少酱', 'shaojiang', '酱酒', '湖南酱香'], color: '#8B0000' },
    { brand: '武陵酒', name: '中酱', fullName: '武陵酒 中酱', type: '酱香', degree: 53, capacity: 500, price: 598, origin: '湖南常德', keywords: ['中酱'], color: '#8B0000' },
    { brand: '酒鬼酒', name: '内参', fullName: '酒鬼酒 内参', type: '其他', degree: 52, capacity: 500, price: 1080, origin: '湖南吉首', keywords: ['内参', 'neican', 'nc', '酒鬼', 'jiugui', '酒鬼内参'], color: '#8B008B' },
    { brand: '文君酒', name: '水晶文君', fullName: '文君酒 水晶文君', type: '浓香', degree: 52, capacity: 500, price: 598, origin: '四川邛崃', keywords: ['文君酒', 'wenjunjiu', 'wj', '水晶文君', 'shuijingwenjun', '凤求凰', 'fengqiuhuang', '珍酿', 'zhenniang'], color: '#DAA520' },
    { brand: '文君酒', name: '凤求凰', fullName: '文君酒 凤求凰', type: '浓香', degree: 52, capacity: 500, price: 398, origin: '四川邛崃', keywords: ['凤求凰'], color: '#C41E3A' },
    { brand: '叙府', name: '青花叙府', fullName: '叙府酒 青花', type: '浓香', degree: 52, capacity: 500, price: 328, origin: '四川宜宾', keywords: ['叙府', 'xufu', 'xf', '青花叙府', 'qinghuaxufu', '柔雅叙府', 'rouya', '大曲', 'daqu'], color: '#1E5AA8' },
    { brand: '鸭溪窖', name: '珍品', fullName: '鸭溪窖酒 珍品', type: '浓香', degree: 52, capacity: 500, price: 198, origin: '贵州遵义', keywords: ['鸭溪窖', 'yaxijiao', 'yxj', '珍品', 'zhenpin', '百家福', 'baijiafu', '雷泉', 'leiquan', '鸭溪', '贵州浓香'], color: '#8B4513' },
    { brand: '潭酒', name: '红潭', fullName: '潭酒 红潭', type: '酱香', degree: 53, capacity: 500, price: 358, origin: '四川古蔺', keywords: ['潭酒', 'tanjiu', 'tj', '红潭', 'hongtan', '金潭', 'jintan', '紫潭', 'zitan', '银潭', 'yintan', '年份潭酒', '真年份'], color: '#C41E3A' },
    { brand: '潭酒', name: '紫潭', fullName: '潭酒 紫潭', type: '酱香', degree: 53, capacity: 500, price: 598, origin: '四川古蔺', keywords: ['紫潭'], color: '#8B008B' },
    { brand: '国台', name: '国台十五年', fullName: '国台酒 十五年', type: '酱香', degree: 53, capacity: 500, price: 898, origin: '贵州仁怀', keywords: ['国台', 'guotai', 'gt', '国台十五年', 'guotai15', '国标', 'guobiao', '龙酒', 'longjiu', '大师工造', 'dashi', '国台酒'], color: '#C41E3A' },
    { brand: '国台', name: '国标', fullName: '国台酒 国标', type: '酱香', degree: 53, capacity: 500, price: 498, origin: '贵州仁怀', keywords: ['国标'], color: '#DAA520' },
    { brand: '钓鱼台', name: '国宾酒', fullName: '钓鱼台 国宾酒', type: '酱香', degree: 53, capacity: 500, price: 980, origin: '贵州仁怀', keywords: ['钓鱼台', 'diaoyutai', 'dyt', '国宾', 'guobin', '贵宾', 'guibin', '乾隆御笔', '大师酒', 'dashi'], color: '#DAA520' },
    { brand: '钓鱼台', name: '贵宾酒', fullName: '钓鱼台 贵宾酒', type: '酱香', degree: 53, capacity: 500, price: 698, origin: '贵州仁怀', keywords: ['贵宾'], color: '#1E5AA8' },
    { brand: '郎酒', name: '红花郎红钻', fullName: '郎酒 红花郎红钻', type: '酱香', degree: 53, capacity: 500, price: 398, origin: '四川古蔺', keywords: ['红花郎红钻', 'hhlhz', '红钻', 'hongzuan'], color: '#C41E3A' },

    { brand: '百富', name: '12年双桶', fullName: 'The Balvenie 12年 DoubleWood', type: '洋酒', degree: 40, capacity: 700, price: 580, origin: '苏格兰', keywords: ['百富', 'baifu', 'bf', 'balvenie', '12年', '双桶', 'shuangtong', 'doublewood', '14年', '17年', '21年', '单一麦芽', 'single', 'malt', '威士忌'], color: '#8B4513' },
    { brand: '格兰威特', name: '12年', fullName: 'Glenlivet 12年', type: '洋酒', degree: 40, capacity: 700, price: 328, origin: '苏格兰', keywords: ['格兰威特', 'gelanweite', 'glwt', 'glenlivet', '12年', '15年', '18年', '单一麦芽', '斯佩塞', 'speyside', '威士忌'], color: '#2E8B57' },
    { brand: '雅伯', name: '10年', fullName: 'Ardbeg 10年', type: '洋酒', degree: 46, capacity: 700, price: 498, origin: '苏格兰艾雷岛', keywords: ['雅伯', 'yabo', 'yb', 'ardbeg', '10年', '乌干达', 'uganda', '漩涡', 'xuanwo', 'corryvreckan', '泥煤', 'peat', '艾雷岛', 'islay', '威士忌'], color: '#1a1a1a' },
    { brand: '拉弗格', name: '10年', fullName: 'Laphroaig 10年', type: '洋酒', degree: 43, capacity: 700, price: 458, origin: '苏格兰艾雷岛', keywords: ['拉弗格', 'lafuge', 'lfg', 'laphroaig', '10年', '精锐', 'jingrui', 'quarter', 'cask', '泥煤', 'peat', '艾雷岛', 'islay', '威士忌'], color: '#DAA520' },
    { brand: '波摩', name: '12年', fullName: 'Bowmore 12年', type: '洋酒', degree: 40, capacity: 700, price: 368, origin: '苏格兰艾雷岛', keywords: ['波摩', 'bomo', 'bm', 'bowmore', '12年', '15年', '18年', '1号酒厂', '泥煤', '艾雷岛', 'islay', '威士忌'], color: '#1E3A5F' },
    { brand: '尊美醇', name: '爱尔兰威士忌', fullName: 'Jameson Irish Whiskey', type: '洋酒', degree: 40, capacity: 700, price: 168, origin: '爱尔兰', keywords: ['尊美醇', 'zmc', 'zunmeichun', 'jameson', '爱尔兰', 'ailan', 'irish', 'whiskey', '威士忌'], color: '#2E8B57' },

    { brand: '斯米诺', name: '红牌伏特加', fullName: 'Smirnoff Red Label Vodka', type: '洋酒', degree: 40, capacity: 750, price: 88, origin: '英国', keywords: ['斯米诺', 'siminuo', 'smn', 'smirnoff', '红牌', 'hongpai', '伏特加', 'vodka', '皇冠伏特加'], color: '#C41E3A' },
    { brand: '深蓝', name: '伏特加', fullName: 'Skyy Vodka', type: '洋酒', degree: 40, capacity: 750, price: 98, origin: '美国', keywords: ['深蓝', 'shenlan', 'sl', 'skyy', '蓝天伏特加', '伏特加', 'vodka'], color: '#1E5AA8' },
    { brand: '雪树', name: '伏特加', fullName: 'Belvedere Vodka', type: '洋酒', degree: 40, capacity: 700, price: 388, origin: '波兰', keywords: ['雪树', 'xueshu', 'xs', 'belvedere', '伏特加', 'vodka', '波兰'], color: '#C0C0C0' },

    { brand: '奥美加', name: '金龙舌兰', fullName: 'Olmeca Gold Tequila', type: '洋酒', degree: 38, capacity: 750, price: 138, origin: '墨西哥', keywords: ['奥美加', 'aomeijia', 'amj', 'olmeca', '金标', '银标', 'silver', 'gold', '龙舌兰', 'tequila', 'tql'], color: '#DAA520' },
    { brand: '唐胡里奥', name: '银龙舌兰', fullName: 'Don Julio Blanco', type: '洋酒', degree: 38, capacity: 750, price: 580, origin: '墨西哥', keywords: ['唐胡里奥', 'tanghuliao', 'thll', 'don', 'julio', 'blanco', 'reposado', 'anejo', '龙舌兰', 'tequila'], color: '#C0C0C0' },

    { brand: '哥顿', name: '金酒', fullName: "Gordon's London Dry Gin", type: '洋酒', degree: 43, capacity: 750, price: 88, origin: '英国', keywords: ['哥顿', 'gedun', 'gd', 'gordons', '金酒', 'gin', '伦敦干金', 'london', 'dry', '杜松子酒'], color: '#C41E3A' },
    { brand: '必富达', name: '金酒', fullName: 'Beefeater London Dry Gin', type: '洋酒', degree: 40, capacity: 700, price: 108, origin: '英国', keywords: ['必富达', 'bifuda', 'bfd', 'beefeater', '金酒', 'gin', '伦敦干金', '将军金'], color: '#C41E3A' },
    { brand: '亨利爵士', name: '金酒', fullName: "Hendrick's Gin", type: '洋酒', degree: 41.4, capacity: 700, price: 328, origin: '苏格兰', keywords: ['亨利爵士', 'henglijueshi', 'hljs', 'hendricks', '金酒', 'gin', '黄瓜', '玫瑰', '高级金酒'], color: '#1a1a1a' },

    { brand: '野格', name: '圣鹿利口酒', fullName: 'Jagermeister', type: '洋酒', degree: 35, capacity: 700, price: 158, origin: '德国', keywords: ['野格', 'yege', 'yg', 'jagermeister', '圣鹿', 'shenglu', '利口酒', 'likoujiu', 'liqueur', '野格酒'], color: '#2E4A3F' },
    { brand: '百利甜', name: '原味', fullName: 'Baileys Original Irish Cream', type: '洋酒', degree: 17, capacity: 700, price: 128, origin: '爱尔兰', keywords: ['百利甜', 'baitiantian', 'blt', 'baileys', '原味', 'yuanwei', '甜酒', 'tianjiu', '奶油利口酒', 'irish', 'cream'], color: '#D2B48C' },
    { brand: '君度', name: '橙味利口酒', fullName: 'Cointreau', type: '洋酒', degree: 40, capacity: 700, price: 198, origin: '法国', keywords: ['君度', 'jundu', 'jd', 'cointreau', '橙味', 'chengwei', '橙酒', 'chenjiu', '白橙皮', '利口酒', 'liqueur', 'triple', 'sec'], color: '#DAA520' },
    { brand: '甘露', name: '咖啡力娇酒', fullName: 'Kahlua', type: '洋酒', degree: 20, capacity: 700, price: 118, origin: '墨西哥', keywords: ['甘露', 'ganlu', 'gl', 'kahlua', '咖啡酒', 'kafeijiu', 'coffee', 'liqueur', '利口酒', '力娇酒'], color: '#8B4513' },
    { brand: '马利宝', name: '椰子朗姆酒', fullName: 'Malibu Coconut Rum', type: '洋酒', degree: 21, capacity: 700, price: 108, origin: '加勒比', keywords: ['马利宝', 'malibao', 'mlb', 'malibu', '椰子朗姆', 'yezilmu', 'coconut', 'rum', '朗姆酒'], color: '#F0F8FF' },

    { brand: '奔富', name: 'BIN2', fullName: 'Penfolds BIN2', type: '葡萄酒', degree: 14.5, capacity: 750, price: 168, origin: '澳大利亚', keywords: ['bin2', '2', '马塔罗', '设拉子'], color: '#722F37' },
    { brand: '奔富', name: 'BIN138', fullName: 'Penfolds BIN138', type: '葡萄酒', degree: 14.5, capacity: 750, price: 458, origin: '澳大利亚', keywords: ['bin138', '138', '歌海娜', '西拉', '慕合怀特'], color: '#722F37' },
    { brand: '奔富', name: 'BIN150', fullName: 'Penfolds BIN150', type: '葡萄酒', degree: 14.5, capacity: 750, price: 498, origin: '澳大利亚', keywords: ['bin150', '150', '设拉子'], color: '#722F37' },
    { brand: '奔富', name: 'BIN311', fullName: 'Penfolds BIN311', type: '葡萄酒', degree: 13, capacity: 750, price: 398, origin: '澳大利亚', keywords: ['bin311', '311', '霞多丽', 'chardonnay', '白葡萄酒'], color: '#F0E68C' },
    { brand: '奔富', name: 'RWT', fullName: 'Penfolds RWT', type: '葡萄酒', degree: 14.5, capacity: 750, price: 1180, origin: '澳大利亚', keywords: ['rwt', 'bin798', '798', '巴罗萨山谷', '设拉子'], color: '#722F37' },
    { brand: '奔富', name: '圣亨利', fullName: 'Penfolds St Henri', type: '葡萄酒', degree: 14.5, capacity: 750, price: 980, origin: '澳大利亚', keywords: ['圣亨利', 'shenghengli', 'shl', 'st', 'henri', '设拉子'], color: '#722F37' },

    { brand: '拉菲', name: '拉菲传奇波尔多', fullName: 'Lafite Legende Bordeaux', type: '葡萄酒', degree: 13, capacity: 750, price: 168, origin: '法国波尔多', keywords: ['拉菲传奇', 'legende', 'bordeaux', '拉菲传说', 'saga', '拉菲珍藏', 'reserve', '传奇', '传说', '珍藏'], color: '#722F37' },
    { brand: '木桐', name: '木桐嘉棣', fullName: 'Mouton Cadet', type: '葡萄酒', degree: 13, capacity: 750, price: 158, origin: '法国波尔多', keywords: ['木桐', 'mutong', 'mt', 'mouton', 'cadet', '嘉棣', 'jiadi', '木桐古堡', 'chateau', 'mouton', 'rothschild', '一级庄'], color: '#722F37' },
    { brand: '木桐', name: '木桐古堡正牌', fullName: 'Chateau Mouton Rothschild', type: '葡萄酒', degree: 13.5, capacity: 750, price: 5800, origin: '法国波尔多', keywords: ['大木桐', 'dmt', 'damutong', '正牌', '一级庄'], color: '#722F37' },
    { brand: '玛歌', name: '玛歌古堡', fullName: 'Chateau Margaux', type: '葡萄酒', degree: 13.5, capacity: 750, price: 6800, origin: '法国波尔多', keywords: ['玛歌', 'mage', 'mg', 'margaux', 'chateau', '一级庄', '玛歌红酒', '玛歌庄园'], color: '#722F37' },
    { brand: '拉图', name: '拉图古堡', fullName: 'Chateau Latour', type: '葡萄酒', degree: 13.5, capacity: 750, price: 7200, origin: '法国波尔多', keywords: ['拉图', 'latu', 'lt', 'latour', 'chateau', '一级庄', '拉图庄园'], color: '#722F37' },
    { brand: '奥比昂', name: '奥比昂古堡', fullName: 'Chateau Haut-Brion', type: '葡萄酒', degree: 13.5, capacity: 750, price: 5600, origin: '法国波尔多', keywords: ['奥比昂', 'aobiang', 'ab', 'haut', 'brion', '红颜容', 'hongyanrong', '侯伯王', '一级庄'], color: '#722F37' },

    { brand: '蒙特斯', name: '欧法西拉', fullName: 'Montes Alpha Syrah', type: '葡萄酒', degree: 14.5, capacity: 750, price: 268, origin: '智利', keywords: ['欧法', 'oufa', 'alpha', 'syrah', '西拉', '赤霞珠', '梅洛', '紫天使', '富乐', 'folly'], color: '#722F37' },
    { brand: '蒙特斯', name: '紫天使', fullName: 'Montes Purple Angel', type: '葡萄酒', degree: 14.5, capacity: 750, price: 680, origin: '智利', keywords: ['紫天使', 'zitianshi', 'purple', 'angel', '佳美娜', 'carmenere'], color: '#800080' },
    { brand: '干露', name: '红魔鬼卡麦妮', fullName: 'Concha y Toro Casillero del Diablo Carmenere', type: '葡萄酒', degree: 13.5, capacity: 750, price: 88, origin: '智利', keywords: ['红魔鬼', 'hongmogui', 'casillero', 'diablo', '卡麦妮', 'carmenere', '赤霞珠', '梅洛', '西拉', '长相思', '霞多丽'], color: '#722F37' },
    { brand: '干露', name: '魔爵红', fullName: 'Concha y Toro Don Melchor', type: '葡萄酒', degree: 14.5, capacity: 750, price: 980, origin: '智利', keywords: ['魔爵', 'mojue', 'mj', 'don', 'melchor', '十八罗汉', '智利酒王'], color: '#722F37' },

    { brand: '黄尾袋鼠', name: '梅洛', fullName: 'Yellow Tail Merlot', type: '葡萄酒', degree: 13.5, capacity: 750, price: 68, origin: '澳大利亚', keywords: ['黄尾袋鼠', 'huangweidaishu', 'yellow', 'tail', 'shiraz', '西拉', 'merlot', '梅洛', 'cabernet', '赤霞珠', '加本力'], color: '#722F37' },
    { brand: '长城', name: '五星赤霞珠', fullName: '长城 五星赤霞珠', type: '葡萄酒', degree: 13, capacity: 750, price: 198, origin: '河北沙城', keywords: ['长城五星', 'changchengwuxing', 'ccwx', '五星赤霞珠', 'greatwall', '中粮', '华夏葡园', '葡园'], color: '#722F37' },
    { brand: '张裕', name: '解百纳干红', fullName: '张裕 解百纳', type: '葡萄酒', degree: 13, capacity: 750, price: 128, origin: '山东烟台', keywords: ['张裕解百纳', 'zhangyujiebaina', 'zyjbn', '解百纳', 'jiebaina', '第九代', '第九代解百纳', '1937'], color: '#722F37' },
    { brand: '张裕', name: 'N158解百纳', fullName: '张裕 N158解百纳', type: '葡萄酒', degree: 13, capacity: 750, price: 238, origin: '山东烟台', keywords: ['n158', 'n258', 'n358', '大师级', '珍藏级', '特选级'], color: '#722F37' },

    { brand: '鹅岛', name: 'IPA', fullName: 'Goose Island IPA', type: '啤酒', degree: 5.9, capacity: 355, price: 18, origin: '美国', keywords: ['鹅岛', 'edao', 'gd', 'goose', 'island', 'ipa', '印度淡色艾尔', 'india', 'pale', 'ale', '精酿', 'jingniang', 'craft', 'beer', '312', 'honkers'], color: '#DAA520' },
    { brand: '拳击猫', name: '胜利之拳', fullName: 'Boxing Cat Victory Hop', type: '啤酒', degree: 5.5, capacity: 330, price: 22, origin: '上海', keywords: ['拳击猫', 'quanjimao', 'qjm', 'boxing', 'cat', '胜利之拳', 'shengli', 'first', 'blood', '一拳击倒', '精酿', 'craft', 'beer'], color: '#C41E3A' },
    { brand: '智美', name: '红帽', fullName: 'Chimay Red', type: '啤酒', degree: 7, capacity: 330, price: 22, origin: '比利时', keywords: ['智美红帽', 'zhimeihongmao', 'zmhm', 'chimay', 'red', '红帽', '白帽', 'chimay', 'white', '修道院啤酒', 'trappist'], color: '#C41E3A' },
    { brand: '智美', name: '白帽', fullName: 'Chimay White', type: '啤酒', degree: 8, capacity: 330, price: 25, origin: '比利时', keywords: ['白帽', 'baimao', 'chimay', 'white', '三料', 'tripel'], color: '#F0E68C' },
    { brand: '粉象', name: '深粉象', fullName: 'Delirium Nocturnum', type: '啤酒', degree: 8.5, capacity: 330, price: 25, origin: '比利时', keywords: ['粉象', 'fenxiang', 'fx', 'delirium', '深粉象', 'shenfenxiang', 'nocturnum', '浅粉象', 'qianfenxiang', 'tremens', '失身酒', '粉象啤酒', '精酿'], color: '#8B008B' },
    { brand: '粉象', name: '浅粉象', fullName: 'Delirium Tremens', type: '啤酒', degree: 8.5, capacity: 330, price: 25, origin: '比利时', keywords: ['浅粉象', 'tremens', '粉象'], color: '#F0E68C' },
    { brand: '林德曼', name: '桃子啤酒', fullName: 'Lindemans Pecheresse', type: '啤酒', degree: 2.5, capacity: 250, price: 28, origin: '比利时', keywords: ['林德曼', 'lindeman', 'ldm', 'lindemans', '桃子', 'taozi', 'pecheresse', '樱桃', 'cherry', 'kriek', '苹果', 'apple', '蓝莓', 'blueberry', '法柔', 'faro', '果味啤酒', 'lambic'], color: '#FFB6C1' },
    { brand: '林德曼', name: '樱桃啤酒', fullName: 'Lindemans Kriek', type: '啤酒', degree: 3.5, capacity: 250, price: 28, origin: '比利时', keywords: ['樱桃', 'yingtao', 'kriek', '林德曼樱桃'], color: '#C41E3A' },
    { brand: '酿酒狗', name: '朋克IPA', fullName: 'Brewdog Punk IPA', type: '啤酒', degree: 5.6, capacity: 330, price: 25, origin: '苏格兰', keywords: ['酿酒狗', 'niangjiugou', 'njg', 'brewdog', 'punk', 'ipa', '朋克', 'pengke', '小马鬼', 'dead', 'pony', '精酿', 'craft', 'beer', '英式IPA'], color: '#DAA520' },
    { brand: '健力士', name: '黑啤酒', fullName: 'Guinness Draught', type: '啤酒', degree: 4.2, capacity: 440, price: 18, origin: '爱尔兰', keywords: ['健力士', 'jianlishi', 'jls', 'guinness', '黑啤', 'heipi', 'stout', '世涛', '爱尔兰黑啤', '氮气', 'nitro'], color: '#1a1a1a' },

    { brand: '会稽山', name: '纯正五年', fullName: '会稽山 纯正五年', type: '黄酒', degree: 14, capacity: 500, price: 58, origin: '浙江绍兴', keywords: ['会稽山五年', 'kuaijishanwunian', 'hjs5n', '五年', '5年', '纯正五年', '绍兴黄酒', '花雕'], color: '#DAA520' },
    { brand: '会稽山', name: '典藏十年', fullName: '会稽山 典藏十年', type: '黄酒', degree: 14, capacity: 500, price: 168, origin: '浙江绍兴', keywords: ['典藏十年', 'diancangshinian', '十年', '10年'], color: '#DAA520' },
    { brand: '塔牌', name: '本美', fullName: '塔牌 本美', type: '黄酒', degree: 14, capacity: 500, price: 98, origin: '浙江绍兴', keywords: ['本美', 'benmei', 'bm', '塔牌本美', '手工黄酒', '冬酿'], color: '#DAA520' },
    { brand: '塔牌', name: '十年陈花雕', fullName: '塔牌 十年陈花雕', type: '黄酒', degree: 15, capacity: 500, price: 198, origin: '浙江绍兴', keywords: ['十年陈', 'shinianchen', '10年', '花雕酒'], color: '#DAA520' },
    { brand: '女儿红', name: '十年陈酿', fullName: '女儿红 十年陈', type: '黄酒', degree: 14, capacity: 500, price: 128, origin: '浙江绍兴', keywords: ['女儿红十年', 'nuerhongshinian', 'neh10n', '十年陈', '桂花林藏', 'guihualincang'], color: '#C41E3A' },
    { brand: '古越龙山', name: '国酿1959', fullName: '古越龙山 国酿1959', type: '黄酒', degree: 15, capacity: 500, price: 598, origin: '浙江绍兴', keywords: ['国酿1959', 'guoniang1959', 'gn1959', '古越龙山高端', '花雕酒王'], color: '#DAA520' },
    { brand: '和酒', name: '金色年华', fullName: '和酒 金色年华', type: '黄酒', degree: 14, capacity: 500, price: 68, origin: '上海', keywords: ['和酒', 'hejiu', 'hj', '金色年华', 'jinsenianhua', 'jsnh', '上海老酒', '八年', '五年'], color: '#DAA520' },
    { brand: '会稽山', name: '帝聚堂', fullName: '会稽山 帝聚堂', type: '黄酒', degree: 12, capacity: 375, price: 28, origin: '浙江绍兴', keywords: ['帝聚堂', 'dijutang', 'djt', '清爽型黄酒'], color: '#DAA520' },

    { brand: '獭祭', name: '二割三分', fullName: 'Dassai 23', type: '清酒', degree: 16, capacity: 720, price: 898, origin: '日本山口县', keywords: ['獭祭', 'taji', 'td', 'dassai', '二割三分', 'ergeisanfen', '23', '三割九分', 'sangejiufen', '39', '45', '四割五分', '纯米大吟酿', 'junmai', 'daiginjo', '清酒', 'qingjiu', 'sake'], color: '#F0F8FF' },
    { brand: '獭祭', name: '三割九分', fullName: 'Dassai 39', type: '清酒', degree: 16, capacity: 720, price: 568, origin: '日本山口县', keywords: ['三割九分', '39'], color: '#F0F8FF' },
    { brand: '獭祭', name: '四割五分', fullName: 'Dassai 45', type: '清酒', degree: 16, capacity: 720, price: 358, origin: '日本山口县', keywords: ['四割五分', '45'], color: '#F0F8FF' },
    { brand: '白鹤', name: '上选清酒', fullName: 'Hakutsuru Superior', type: '清酒', degree: 15, capacity: 720, price: 128, origin: '日本神户', keywords: ['白鹤', 'baihe', 'bh', 'hakutsuru', '上选', 'shangxuan', 'superior', '纯米', 'junmai', '吟酿', 'ginjo', '清酒', 'sake'], color: '#F0F8FF' },
    { brand: '菊正宗', name: '上选清酒', fullName: 'Kikumasamune Superior', type: '清酒', degree: 15, capacity: 720, price: 118, origin: '日本神户', keywords: ['菊正宗', 'juzhengzong', 'jzz', 'kikumasamune', '上选', 'shangxuan', 'superior', '本酿造', 'honjozo', '清酒', 'sake', '菊正宗酒造'], color: '#F0F8FF' },
    { brand: '月桂冠', name: '纯粹清酒', fullName: 'Gekkeikan Junmai', type: '清酒', degree: 15, capacity: 720, price: 98, origin: '日本京都', keywords: ['月桂冠', 'yueguiguan', 'ygg', 'gekkeikan', '纯粹', 'chuncui', 'junmai', '纯米清酒', '本酿造', 'honjozo', '清酒', 'sake'], color: '#DAA520' },
    { brand: '久保田', name: '千寿', fullName: 'Kubota Senju', type: '清酒', degree: 15, capacity: 720, price: 328, origin: '日本新潟', keywords: ['久保田', 'jiubaotian', 'jbt', 'kubota', '千寿', 'qianshou', 'senju', '万寿', 'manshou', 'manju', '百寿', 'baishou', 'hyakuju', '纯米大吟酿', '吟酿', '清酒', 'sake'], color: '#4169E1' },
    { brand: '十四代', name: '本丸', fullName: 'Juyondai Honmaru', type: '清酒', degree: 15, capacity: 720, price: 3800, origin: '日本山形', keywords: ['十四代', 'shisidai', '14d', 'juyondai', '本丸', 'benwan', 'honmaru', '龙月', 'longyue', '清酒天花板', '高端清酒', '清酒', 'sake'], color: '#DAA520' },

    { brand: '茅台', name: '赖茅端曲', fullName: '赖茅 端曲', type: '酱香', degree: 53, capacity: 500, price: 328, origin: '贵州仁怀', keywords: ['赖茅端曲', 'laimao', 'duanqu', '端曲'], color: '#1E3A5F' },
    { brand: '茅台', name: '茅台不老酒', fullName: '茅台 不老酒', type: '酱香', degree: 53, capacity: 500, price: 368, origin: '贵州仁怀', keywords: ['不老酒', 'bulaojiu', '茅台不老'], color: '#C41E3A' },
    { brand: '茅台', name: '白金酒', fullName: '茅台 白金酒', type: '酱香', degree: 53, capacity: 500, price: 298, origin: '贵州仁怀', keywords: ['白金酒', 'baijinjiu', 'bjj', '茅台白金'], color: '#C0C0C0' },
    { brand: '茅台', name: '名将酒', fullName: '茅台 名将酒', type: '酱香', degree: 53, capacity: 500, price: 458, origin: '贵州仁怀', keywords: ['名将', 'mingjiang', 'mj'], color: '#C41E3A' },

    { brand: '五粮液', name: '五粮PTVIP', fullName: '五粮液 PTVIP', type: '浓香', degree: 52, capacity: 500, price: 868, origin: '四川宜宾', keywords: ['ptvip', 'vip', '五粮ptvip'], color: '#DAA520' },
    { brand: '五粮液', name: '火爆精酿', fullName: '五粮液 火爆精酿', type: '浓香', degree: 52, capacity: 500, price: 188, origin: '四川宜宾', keywords: ['火爆', 'huobao', 'hb', '精酿'], color: '#C41E3A' },
    { brand: '五粮液', name: '友酒', fullName: '五粮液 友酒', type: '浓香', degree: 52, capacity: 500, price: 228, origin: '四川宜宾', keywords: ['友酒', 'youjiu', 'yj'], color: '#1E5AA8' },

    { brand: '洋河', name: '双沟蘇酒', fullName: '洋河 双沟蘇酒', type: '浓香', degree: 52, capacity: 500, price: 698, origin: '江苏泗洪', keywords: ['蘇酒', 'sujiu', 'sj', '双沟蘇酒'], color: '#8B0000' },
    { brand: '洋河', name: '洋河微分子', fullName: '洋河 微分子', type: '浓香', degree: 40.8, capacity: 500, price: 328, origin: '江苏宿迁', keywords: ['微分子', 'weifenzi', 'wfz'], color: '#1E90FF' },

    { brand: '泸州老窖', name: '高光', fullName: '泸州老窖 高光', type: '浓香', degree: 52, capacity: 500, price: 698, origin: '四川泸州', keywords: ['高光', 'gaoguang', 'gg', '泸州老窖高光'], color: '#DAA520' },
    { brand: '泸州老窖', name: '百年泸州老窖', fullName: '泸州老窖 百年', type: '浓香', degree: 52, capacity: 500, price: 258, origin: '四川泸州', keywords: ['百年', 'bainian', 'bn', '百年泸州'], color: '#C8102E' },

    { brand: '剑南春', name: '剑南老街', fullName: '剑南春 剑南老街', type: '浓香', degree: 52, capacity: 500, price: 168, origin: '四川绵竹', keywords: ['老街', 'laojie', 'lj', '剑南老街'], color: '#8B4513' },
    { brand: '剑南春', name: '绵竹大曲', fullName: '剑南春 绵竹大曲', type: '浓香', degree: 52, capacity: 500, price: 48, origin: '四川绵竹', keywords: ['绵竹', 'mianzhu', 'mz', '大曲'], color: '#1E5AA8' },

    { brand: '汾酒', name: '竹叶青酒', fullName: '竹叶青酒', type: '其他', degree: 45, capacity: 500, price: 128, origin: '山西汾阳', keywords: ['竹叶青', 'zyq', 'zhuyeqing', '牧童', '国宝', '露酒', '玻竹'], color: '#2E8B57' },
    { brand: '汾酒', name: '白玉汾酒', fullName: '汾酒 白玉汾酒', type: '清香', degree: 53, capacity: 500, price: 198, origin: '山西汾阳', keywords: ['白玉', 'baiyu', 'by', '白玉汾'], color: '#F0E68C' },
    { brand: '汾酒', name: '玫瑰汾酒', fullName: '汾酒 玫瑰汾酒', type: '清香', degree: 53, capacity: 500, price: 198, origin: '山西汾阳', keywords: ['玫瑰', 'meigui', 'mg', '玫瑰汾'], color: '#FF69B4' },

    { brand: '郎酒', name: '特曲T6', fullName: '郎酒 特曲T6', type: '浓香', degree: 50, capacity: 500, price: 118, origin: '四川古蔺', keywords: ['特曲t6', 't6', 'tequt6'], color: '#C41E3A' },
    { brand: '郎酒', name: '特曲T9', fullName: '郎酒 特曲T9', type: '浓香', degree: 50, capacity: 500, price: 198, origin: '四川古蔺', keywords: ['特曲t9', 't9', 'tequt9'], color: '#DAA520' },

    { brand: '习酒', name: '喜宴', fullName: '习酒 喜宴', type: '酱香', degree: 53, capacity: 500, price: 368, origin: '贵州习水', keywords: ['喜宴', 'xiyan', 'xy', '习酒喜宴'], color: '#C41E3A' },
    { brand: '习酒', name: '圆习酒', fullName: '习酒 圆习酒', type: '酱香', degree: 53, capacity: 500, price: 188, origin: '贵州习水', keywords: ['圆习', 'yuanxi', 'yx'], color: '#8B4513' },

    { brand: '古井贡酒', name: '古7', fullName: '古井贡酒 年份原浆古7', type: '浓香', degree: 52, capacity: 500, price: 258, origin: '安徽亳州', keywords: ['古7', 'g7', 'gu7'], color: '#8B0000' },
    { brand: '古井贡酒', name: '幸福版', fullName: '古井贡酒 幸福版', type: '浓香', degree: 50, capacity: 500, price: 88, origin: '安徽亳州', keywords: ['幸福', 'xingfu', 'xf'], color: '#8B0000' },
    { brand: '古井贡酒', name: '经典古井贡', fullName: '古井贡酒 经典', type: '浓香', degree: 50, capacity: 500, price: 68, origin: '安徽亳州', keywords: ['经典古井', 'jingdiangujing', 'jd'], color: '#8B0000' },

    { brand: '舍得', name: '吞之乎', fullName: '舍得 吞之乎', type: '酱香', degree: 53, capacity: 500, price: 1280, origin: '四川射洪', keywords: ['吞之乎', 'tunzhihu', 'tzh'], color: '#1a1a1a' },
    { brand: '舍得', name: '沱牌特曲', fullName: '沱牌 特曲', type: '浓香', degree: 50, capacity: 500, price: 128, origin: '四川射洪', keywords: ['沱牌特曲', 'tptq', '特曲'], color: '#4A3728' },
    { brand: '舍得', name: '陶醉', fullName: '舍得 陶醉', type: '浓香', degree: 52, capacity: 500, price: 268, origin: '四川射洪', keywords: ['陶醉', 'taozui', 'tz'], color: '#2E4A3F' },

    { brand: '水井坊', name: '梅兰竹菊', fullName: '水井坊 梅兰竹菊', type: '浓香', degree: 52, capacity: 500, price: 1280, origin: '四川成都', keywords: ['梅兰竹菊', 'mlzj', '梅花', '兰花', '竹子', '菊花'], color: '#2E4A3F' },

    { brand: '酒鬼酒', name: '妙品', fullName: '酒鬼酒 妙品', type: '其他', degree: 52, capacity: 500, price: 288, origin: '湖南吉首', keywords: ['妙品', 'miaopin', 'mp', '酒鬼妙品'], color: '#8B008B' },
    { brand: '酒鬼酒', name: '三两三', fullName: '酒鬼酒 三两三', type: '其他', degree: 52, capacity: 165, price: 128, origin: '湖南吉首', keywords: ['三两三', 'sanliangsan', 'sls', '小酒版'], color: '#8B008B' },

    { brand: '董酒', name: '佰草含量', fullName: '董酒 佰草含量', type: '其他', degree: 54, capacity: 500, price: 468, origin: '贵州遵义', keywords: ['佰草', 'baicao', 'bc', '佰草含量'], color: '#2E4A3F' },

    { brand: '西凤', name: '酒海陈藏', fullName: '西凤酒 酒海陈藏', type: '兼香', degree: 52, capacity: 500, price: 298, origin: '陕西凤翔', keywords: ['酒海', 'jiuhai', 'jh', '陈藏'], color: '#DAA520' },
    { brand: '西凤', name: '七彩30年', fullName: '西凤酒 七彩30年', type: '兼香', degree: 52, capacity: 500, price: 888, origin: '陕西凤翔', keywords: ['七彩30', 'qicai30', '30年'], color: '#DAA520' },

    { brand: '白云边', name: '9年陈酿', fullName: '白云边 9年陈酿', type: '兼香', degree: 42, capacity: 500, price: 88, origin: '湖北荆州', keywords: ['9年', '9n', '九年'], color: '#4169E1' },
    { brand: '白云边', name: '3星陈酿', fullName: '白云边 3星', type: '兼香', degree: 42, capacity: 500, price: 58, origin: '湖北荆州', keywords: ['3星', '3x', '三星', 'sanxing'], color: '#4169E1' },

    { brand: '口子窖', name: '初夏', fullName: '口子窖 初夏', type: '兼香', degree: 46, capacity: 500, price: 198, origin: '安徽淮北', keywords: ['初夏', 'chuxia', 'cx'], color: '#8B4513' },
    { brand: '口子窖', name: '小池窖', fullName: '口子窖 小池窖', type: '兼香', degree: 50, capacity: 500, price: 268, origin: '安徽淮北', keywords: ['小池窖', 'xiaochijiao', 'xcj'], color: '#8B4513' },

    { brand: '迎驾贡酒', name: '金星银星礼盒', fullName: '迎驾贡酒 金银礼盒', type: '浓香', degree: 52, capacity: 500, price: 328, origin: '安徽霍山', keywords: ['金银礼盒', 'jylh', '礼盒'], color: '#DAA520' },

    { brand: '今世缘', name: '国缘V3', fullName: '今世缘 国缘V3', type: '浓香', degree: 42, capacity: 500, price: 398, origin: '江苏涟水', keywords: ['v3', '国缘v3'], color: '#8B0000' },
    { brand: '今世缘', name: '国缘V6', fullName: '今世缘 国缘V6', type: '酱香', degree: 53, capacity: 500, price: 968, origin: '江苏涟水', keywords: ['v6', '国缘v6'], color: '#2E4A3F' },
    { brand: '今世缘', name: '今世缘典藏5', fullName: '今世缘 典藏5年', type: '浓香', degree: 42, capacity: 500, price: 88, origin: '江苏涟水', keywords: ['典藏5', 'dc5', '5年'], color: '#DAA520' },

    { brand: '牛栏山', name: '百年陈酿三锅头', fullName: '牛栏山 百年陈酿', type: '清香', degree: 52, capacity: 500, price: 168, origin: '北京', keywords: ['百年', 'bainian', 'bn', '陈酿', '三锅头'], color: '#C41E3A' },
    { brand: '牛栏山', name: '魁盛号', fullName: '牛栏山 魁盛号', type: '清香', degree: 56, capacity: 500, price: 498, origin: '北京', keywords: ['魁盛号', 'kuishenghao', 'ksh'], color: '#1a1a1a' },

    { brand: '红星', name: '蓝花瓷', fullName: '红星 蓝花瓷', type: '清香', degree: 52, capacity: 500, price: 168, origin: '北京', keywords: ['蓝花瓷', 'lanhuaci', 'lhc'], color: '#1E5AA8' },

    { brand: '衡水老白干', name: '红五星', fullName: '衡水老白干 红五星', type: '其他', degree: 62, capacity: 500, price: 198, origin: '河北衡水', keywords: ['红五星', 'hongwuxing', 'hxw', '五星'], color: '#C41E3A' },
    { brand: '衡水老白干', name: '大小青花', fullName: '衡水老白干 大小青花', type: '其他', degree: 67, capacity: 500, price: 268, origin: '河北衡水', keywords: ['大青花', '小青花', 'daqinghua', 'xiaoqinghua'], color: '#1E5AA8' },

    { brand: '四特酒', name: '星级酒', fullName: '四特酒 星级', type: '其他', degree: 52, capacity: 500, price: 88, origin: '江西樟树', keywords: ['星级', 'xingji', 'xj', '四星', '五星'], color: '#8B4513' },
    { brand: '四特酒', name: '锦瓷', fullName: '四特酒 锦瓷', type: '其他', degree: 52, capacity: 500, price: 168, origin: '江西樟树', keywords: ['锦瓷', 'jinci', 'jc'], color: '#DAA520' },

    { brand: '劲酒', name: '毛铺苦荞酒', fullName: '劲牌 毛铺苦荞酒', type: '其他', degree: 42, capacity: 500, price: 88, origin: '湖北大冶', keywords: ['毛铺', 'maopu', 'mp', '苦荞', 'kuqiao', '健康酒'], color: '#2E4A3F' },
    { brand: '劲酒', name: '持正堂', fullName: '劲牌 持正堂', type: '其他', degree: 35, capacity: 500, price: 128, origin: '湖北大冶', keywords: ['持正堂', 'chizhengtang', 'czt'], color: '#8B4513' },

    { brand: '江小白', name: 'SE503', fullName: '江小白 SE503', type: '清香', degree: 52, capacity: 500, price: 128, origin: '重庆', keywords: ['se503', '单纯', 'danchun', '高粱酒'], color: '#C0C0C0' },
    { brand: '江小白', name: '表达瓶', fullName: '江小白 表达瓶', type: '清香', degree: 40, capacity: 100, price: 25, origin: '重庆', keywords: ['表达瓶', 'biaodaping', 'bdp', '小瓶'], color: '#F0E68C' },

    { brand: '金六福', name: '一星', fullName: '金六福 一星', type: '浓香', degree: 52, capacity: 500, price: 48, origin: '四川宜宾', keywords: ['金六福', 'jlf', 'jinliufu', '一星', '1x', '五星', '5x', '三星', '3x'], color: '#C41E3A' },
    { brand: '金六福', name: '五星', fullName: '金六福 五星', type: '浓香', degree: 52, capacity: 500, price: 128, origin: '四川宜宾', keywords: ['五星', '5x', 'wuxing'], color: '#DAA520' },
    { brand: '金六福', name: '福星高照', fullName: '金六福 福星高照', type: '浓香', degree: 52, capacity: 500, price: 88, origin: '四川宜宾', keywords: ['福星', 'fuxing', 'fx', '高照'], color: '#C41E3A' },

    { brand: '浏阳河', name: '蓝色经典', fullName: '浏阳河 蓝色经典', type: '浓香', degree: 52, capacity: 500, price: 88, origin: '湖南浏阳', keywords: ['浏阳河', 'lyh', 'liuyanghe', '蓝色经典', '蓝色'], color: '#1E5AA8' },
    { brand: '浏阳河', name: '红瓷', fullName: '浏阳河 红瓷', type: '浓香', degree: 52, capacity: 500, price: 168, origin: '湖南浏阳', keywords: ['红瓷', 'hongci', 'hc'], color: '#C41E3A' },

    { brand: '稻花香', name: '清样', fullName: '稻花香 清样', type: '浓香', degree: 52, capacity: 500, price: 298, origin: '湖北宜昌', keywords: ['稻花香', 'dhx', 'daohuaxiang', '清样', 'qingyang', 'qy'], color: '#DAA520' },
    { brand: '稻花香', name: '活力型', fullName: '稻花香 活力型', type: '浓香', degree: 52, capacity: 500, price: 168, origin: '湖北宜昌', keywords: ['活力', 'huoli', 'hl'], color: '#2E8B57' },
    { brand: '稻花香', name: '珍品一号', fullName: '稻花香 珍品一号', type: '浓香', degree: 52, capacity: 500, price: 98, origin: '湖北宜昌', keywords: ['珍品一号', 'zpyh', '一号'], color: '#DAA520' },

    { brand: '枝江', name: '大曲', fullName: '枝江大曲', type: '浓香', degree: 52, capacity: 500, price: 68, origin: '湖北枝江', keywords: ['枝江', 'zj', 'zhijiang', '枝江大曲', 'zjdq'], color: '#1E5AA8' },
    { brand: '枝江', name: '真年份3年', fullName: '枝江 真年份3年', type: '浓香', degree: 52, capacity: 500, price: 128, origin: '湖北枝江', keywords: ['真年份', 'zhenianfen', '3年', '三年'], color: '#DAA520' },

    { brand: '宋河', name: '粮液', fullName: '宋河粮液', type: '浓香', degree: 52, capacity: 500, price: 88, origin: '河南鹿邑', keywords: ['宋河', 'sh', 'songhe', '粮液', 'liangye', '宋河粮液'], color: '#DAA520' },
    { brand: '宋河', name: '国字三号', fullName: '宋河 国字三号', type: '浓香', degree: 52, capacity: 500, price: 368, origin: '河南鹿邑', keywords: ['国字', 'guozi', 'gz', '三号', '3h'], color: '#8B0000' },

    { brand: '仰韶', name: '彩陶坊天时', fullName: '仰韶 彩陶坊天时', type: '其他', degree: 52, capacity: 500, price: 598, origin: '河南渑池', keywords: ['仰韶', 'ys', 'yangshao', '彩陶坊', 'ctf', '天时', 'tianshi', '地利', '人和'], color: '#8B4513' },
    { brand: '仰韶', name: '彩陶坊地利', fullName: '仰韶 彩陶坊地利', type: '其他', degree: 52, capacity: 500, price: 298, origin: '河南渑池', keywords: ['地利', 'dili', 'dl'], color: '#DAA520' },
    { brand: '仰韶', name: '彩陶坊人和', fullName: '仰韶 彩陶坊人和', type: '其他', degree: 46, capacity: 500, price: 168, origin: '河南渑池', keywords: ['人和', 'renhe', 'rh'], color: '#228B22' },
    { brand: '仰韶', name: '彩陶坊献礼', fullName: '仰韶 彩陶坊献礼', type: '其他', degree: 46, capacity: 500, price: 88, origin: '河南渑池', keywords: ['献礼', 'xianli', 'xl'], color: '#CD853F' },
    { brand: '仰韶', name: '彩陶坊太阳', fullName: '仰韶 彩陶坊太阳', type: '其他', degree: 52, capacity: 500, price: 898, origin: '河南渑池', keywords: ['太阳', 'taiyang', 'ty'], color: '#FFD700' },
    { brand: '仰韶', name: '彩陶坊月亮', fullName: '仰韶 彩陶坊月亮', type: '其他', degree: 52, capacity: 500, price: 1298, origin: '河南渑池', keywords: ['月亮', 'yueliang', 'yl'], color: '#87CEEB' },
    { brand: '仰韶', name: '彩陶坊星星', fullName: '仰韶 彩陶坊星星', type: '其他', degree: 52, capacity: 500, price: 1998, origin: '河南渑池', keywords: ['星星', 'xingxing', 'xx'], color: '#9370DB' },

    { brand: '杜康', name: '酒祖杜康', fullName: '杜康 酒祖杜康', type: '浓香', degree: 52, capacity: 500, price: 398, origin: '河南洛阳', keywords: ['杜康', 'dk', 'dukang', '酒祖', 'jiuzu', '酒祖杜康'], color: '#8B4513' },
    { brand: '杜康', name: '杜康1号', fullName: '杜康 杜康1号', type: '浓香', degree: 52, capacity: 500, price: 168, origin: '河南洛阳', keywords: ['杜康1号', 'dk1', '1号'], color: '#DAA520' },

    { brand: '宝丰', name: '国色清香', fullName: '宝丰 国色清香', type: '清香', degree: 52, capacity: 500, price: 198, origin: '河南宝丰', keywords: ['宝丰', 'bf', 'baofeng', '国色', 'guose', '国色清香', 'gsqx'], color: '#1E5AA8' },
    { brand: '宝丰', name: '经典30年', fullName: '宝丰 经典30年', type: '清香', degree: 54, capacity: 500, price: 698, origin: '河南宝丰', keywords: ['30年', '经典30'], color: '#DAA520' },
    { brand: '宝丰', name: '经典15年', fullName: '宝丰 经典15年', type: '清香', degree: 52, capacity: 500, price: 368, origin: '河南宝丰', keywords: ['15年', '经典15', 'j15'], color: '#1E5AA8' },
    { brand: '宝丰', name: '清香世家', fullName: '宝丰 清香世家', type: '清香', degree: 52, capacity: 500, price: 128, origin: '河南宝丰', keywords: ['清香世家', 'qxsj'], color: '#1E5AA8' },
    { brand: '宝丰', name: '大曲', fullName: '宝丰 大曲', type: '清香', degree: 50, capacity: 500, price: 68, origin: '河南宝丰', keywords: ['大曲', 'daq', '宝丰大曲'], color: '#1E5AA8' },
    { brand: '宝丰', name: '献礼版', fullName: '宝丰 献礼版', type: '清香', degree: 46, capacity: 500, price: 88, origin: '河南宝丰', keywords: ['献礼', 'xianli', 'xl'], color: '#1E5AA8' },
    { brand: '宝丰', name: '国标清香15', fullName: '宝丰 国标清香15', type: '清香', degree: 50, capacity: 500, price: 158, origin: '河南宝丰', keywords: ['国标清香15', 'gbqx15', 'guobiaoqingxiang', '15年'], color: '#1E5AA8' },
    { brand: '宝丰', name: '国标清香20', fullName: '宝丰 国标清香20', type: '清香', degree: 50, capacity: 500, price: 258, origin: '河南宝丰', keywords: ['国标清香20', 'gbqx20', '20年'], color: '#1E5AA8' },
    { brand: '宝丰', name: '国色清香师作', fullName: '宝丰 国色清香师作', type: '清香', degree: 54, capacity: 500, price: 498, origin: '河南宝丰', keywords: ['国色清香师作', 'gsqxsz', 'guoseqingxiang', '师作'], color: '#DAA520' },
    { brand: '宝丰', name: '国色清香尊品', fullName: '宝丰 国色清香尊品', type: '清香', degree: 52, capacity: 500, price: 898, origin: '河南宝丰', keywords: ['国色清香尊品', 'gsqxzp', '尊品'], color: '#DAA520' },
    { brand: '宝丰', name: '宝丰老窖', fullName: '宝丰 老窖', type: '浓香', degree: 50, capacity: 500, price: 58, origin: '河南宝丰', keywords: ['宝丰老窖', 'bflj', 'baofenglaojiao', '老窖'], color: '#8B4513' },

    { brand: '张裕', name: '解百纳', fullName: '张裕 解百纳', type: '葡萄酒', degree: 12, capacity: 750, price: 68, origin: '山东烟台', keywords: ['解百纳', 'jbn', 'jiebaina', '赤霞珠', '干红', '张裕解百纳'], color: '#722F37' },
    { brand: '张裕', name: '醉诗仙', fullName: '张裕 醉诗仙', type: '葡萄酒', degree: 12, capacity: 750, price: 48, origin: '山东烟台', keywords: ['醉诗仙', 'zuishixian', 'zsx', '干红'], color: '#722F37' },
    { brand: '张裕', name: '小味儿多', fullName: '张裕 小味儿多', type: '葡萄酒', degree: 13, capacity: 750, price: 78, origin: '山东烟台', keywords: ['小味儿多', 'xwed', '味儿多', '干红'], color: '#722F37' },
    { brand: '张裕', name: '赤霞珠', fullName: '张裕 赤霞珠', type: '葡萄酒', degree: 12, capacity: 750, price: 58, origin: '山东烟台', keywords: ['赤霞珠', 'cxz', 'chixiazhu', '干红', '张裕赤霞珠'], color: '#722F37' },
    { brand: '张裕', name: '品丽珠', fullName: '张裕 品丽珠', type: '葡萄酒', degree: 12, capacity: 750, price: 88, origin: '山东烟台', keywords: ['品丽珠', 'plz', 'pinlizhu'], color: '#722F37' },
    { brand: '张裕', name: '贵人香干白', fullName: '张裕 贵人香干白', type: '葡萄酒', degree: 12, capacity: 750, price: 68, origin: '山东烟台', keywords: ['贵人香', 'grx', 'guirenxiang', '干白', '白葡萄酒'], color: '#F0E68C' },

    { brand: '长城', name: '海岸赤霞珠', fullName: '长城 海岸赤霞珠', type: '葡萄酒', degree: 13, capacity: 750, price: 128, origin: '河北昌黎', keywords: ['海岸', 'haian', 'ha', '赤霞珠'], color: '#722F37' },
    { brand: '长城', name: '大漠', fullName: '长城 大漠', type: '葡萄酒', degree: 13.5, capacity: 750, price: 188, origin: '新疆', keywords: ['大漠', 'damo', 'dm', '新疆'], color: '#722F37' },
    { brand: '长城', name: '北纬37度', fullName: '长城 北纬37度', type: '葡萄酒', degree: 13, capacity: 750, price: 158, origin: '山东蓬莱', keywords: ['北纬37', 'bw37', '37度'], color: '#722F37' },

    { brand: '奔富', name: 'BIN8', fullName: 'Penfolds BIN8', type: '葡萄酒', degree: 14.5, capacity: 750, price: 198, origin: '澳大利亚', keywords: ['bin8', '8', '赤霞珠', '设拉子'], color: '#722F37' },
    { brand: '奔富', name: 'BIN28', fullName: 'Penfolds BIN28', type: '葡萄酒', degree: 14.5, capacity: 750, price: 268, origin: '澳大利亚', keywords: ['bin28', '28', '设拉子'], color: '#722F37' },
    { brand: '奔富', name: 'BIN128', fullName: 'Penfolds BIN128', type: '葡萄酒', degree: 14.5, capacity: 750, price: 328, origin: '澳大利亚', keywords: ['bin128', '128', '设拉子'], color: '#722F37' },
    { brand: '奔富', name: 'BIN407', fullName: 'Penfolds BIN407', type: '葡萄酒', degree: 14.5, capacity: 750, price: 568, origin: '澳大利亚', keywords: ['bin407', '407', '赤霞珠'], color: '#722F37' },
    { brand: '奔富', name: 'BIN389', fullName: 'Penfolds BIN389', type: '葡萄酒', degree: 14.5, capacity: 750, price: 698, origin: '澳大利亚', keywords: ['bin389', '389', '设拉子', '赤霞珠'], color: '#722F37' },
    { brand: '奔富', name: '葛兰许', fullName: 'Penfolds Grange', type: '葡萄酒', degree: 14.5, capacity: 750, price: 3800, origin: '澳大利亚', keywords: ['葛兰许', 'gelanxu', 'glx', 'grange'], color: '#722F37' },
    { brand: '奔富', name: 'BIN707', fullName: 'Penfolds BIN707', type: '葡萄酒', degree: 14.5, capacity: 750, price: 2800, origin: '澳大利亚', keywords: ['bin707', '707', '赤霞珠'], color: '#722F37' },

    { brand: '拉菲', name: '传奇波尔多', fullName: 'Lafite Legende Bordeaux', type: '葡萄酒', degree: 13, capacity: 750, price: 168, origin: '法国波尔多', keywords: ['传奇', 'chuanqi', 'cq', '波尔多', 'bordeaux', '拉菲传奇'], color: '#722F37' },
    { brand: '拉菲', name: '传说波尔多', fullName: 'Lafite Saga Bordeaux', type: '葡萄酒', degree: 13, capacity: 750, price: 158, origin: '法国波尔多', keywords: ['传说', 'chuanshuo', 'cs', '波尔多', '拉菲传说'], color: '#722F37' },
    { brand: '拉菲', name: '波亚克村', fullName: 'Lafite Pauillac', type: '葡萄酒', degree: 13, capacity: 750, price: 398, origin: '法国波尔多', keywords: ['波亚克', 'boyake', 'byk', 'pauillac'], color: '#722F37' },
    { brand: '拉菲', name: '杜哈米隆', fullName: 'Chateau Duhart-Milon', type: '葡萄酒', degree: 13, capacity: 750, price: 680, origin: '法国波尔多', keywords: ['杜哈米隆', 'duhamilong', 'dhml', 'duhart', 'milon'], color: '#722F37' },

    { brand: '木桐', name: '木桐嘉棣', fullName: 'Mouton Cadet', type: '葡萄酒', degree: 13.5, capacity: 750, price: 158, origin: '法国波尔多', keywords: ['木桐嘉棣', 'mutongjiadi', 'mtjd', 'cadet'], color: '#722F37' },
    { brand: '玛歌', name: '红亭', fullName: 'Chateau Margaux Pavillon Rouge', type: '葡萄酒', degree: 13.5, capacity: 750, price: 980, origin: '法国波尔多', keywords: ['红亭', 'hongting', 'ht', 'pavillon', 'rouge'], color: '#722F37' },
    { brand: '拉图', name: '拉图堡', fullName: 'Chateau Latour', type: '葡萄酒', degree: 13.5, capacity: 750, price: 3800, origin: '法国波尔多', keywords: ['拉图堡', 'latubao', 'ltb', 'latour'], color: '#722F37' },

    { brand: '杰卡斯', name: '经典设拉子', fullName: 'Jacobs Creek Classic Shiraz', type: '葡萄酒', degree: 13.5, capacity: 750, price: 78, origin: '澳大利亚', keywords: ['杰卡斯', 'jks', 'jieqasi', 'jacobs', 'creek', '设拉子', 'shiraz'], color: '#722F37' },
    { brand: '杰卡斯', name: '经典赤霞珠', fullName: 'Jacobs Creek Classic Cabernet', type: '葡萄酒', degree: 13.5, capacity: 750, price: 78, origin: '澳大利亚', keywords: ['赤霞珠', 'cabernet', '经典赤霞珠'], color: '#722F37' },
    { brand: '杰卡斯', name: '经典霞多丽', fullName: 'Jacobs Creek Classic Chardonnay', type: '葡萄酒', degree: 13, capacity: 750, price: 78, origin: '澳大利亚', keywords: ['霞多丽', 'chardonnay', '白葡萄酒'], color: '#F0E68C' },

    { brand: '黄尾袋鼠', name: '设拉子', fullName: 'Yellow Tail Shiraz', type: '葡萄酒', degree: 13.5, capacity: 750, price: 58, origin: '澳大利亚', keywords: ['黄尾', 'hwd', 'huangweidaishu', 'yellow', 'tail', '设拉子'], color: '#F0E68C' },
    { brand: '黄尾袋鼠', name: '梅洛', fullName: 'Yellow Tail Merlot', type: '葡萄酒', degree: 13.5, capacity: 750, price: 58, origin: '澳大利亚', keywords: ['梅洛', 'merlot'], color: '#722F37' },
    { brand: '黄尾袋鼠', name: '霞多丽', fullName: 'Yellow Tail Chardonnay', type: '葡萄酒', degree: 12.5, capacity: 750, price: 58, origin: '澳大利亚', keywords: ['霞多丽', 'chardonnay'], color: '#F0E68C' },

    { brand: '红魔鬼', name: '梅洛', fullName: 'Casillero del Diablo Merlot', type: '葡萄酒', degree: 13.5, capacity: 750, price: 88, origin: '智利', keywords: ['梅洛', 'merlot'], color: '#722F37' },

    { brand: '奥兰', name: '小红帽', fullName: 'Olan Navarro Lopez', type: '葡萄酒', degree: 13.5, capacity: 750, price: 68, origin: '西班牙', keywords: ['奥兰', 'olan', '小红帽', 'xhm', '西班牙'], color: '#722F37' },

    { brand: '麦卡伦', name: '12年双桶', fullName: 'Macallan 12年 Double Cask', type: '洋酒', degree: 40, capacity: 700, price: 698, origin: '苏格兰', keywords: ['麦卡伦', 'mkl', 'maikaelun', 'macallan', '12年', '双桶', 'doublecask', '单一麦芽', '威士忌'], color: '#8B4513' },
    { brand: '麦卡伦', name: '12年雪莉桶', fullName: 'Macallan 12年 Sherry Oak', type: '洋酒', degree: 40, capacity: 700, price: 798, origin: '苏格兰', keywords: ['12年', '雪莉桶', 'sherryoak', '雪莉'], color: '#8B4513' },
    { brand: '麦卡伦', name: '18年', fullName: 'Macallan 18年', type: '洋酒', degree: 43, capacity: 700, price: 2680, origin: '苏格兰', keywords: ['18年', 'macallan18'], color: '#8B4513' },
    { brand: '麦卡伦', name: '蓝标', fullName: 'Macallan Blue Label', type: '洋酒', degree: 40, capacity: 700, price: 3680, origin: '苏格兰', keywords: ['蓝标', 'lanbiao', 'lb'], color: '#1E5AA8' },

    { brand: '格兰菲迪', name: '12年', fullName: 'Glenfiddich 12年', type: '洋酒', degree: 40, capacity: 700, price: 298, origin: '苏格兰', keywords: ['格兰菲迪', 'glfd', 'glenfiddich', '12年', '15年', '18年', '单一麦芽', '威士忌'], color: '#2E8B57' },
    { brand: '格兰菲迪', name: '15年', fullName: 'Glenfiddich 15年', type: '洋酒', degree: 40, capacity: 700, price: 498, origin: '苏格兰', keywords: ['15年', 'glenfiddich15'], color: '#DAA520' },

    { brand: '杰克丹尼', name: '田纳西威士忌', fullName: 'Jack Daniels Old No.7', type: '洋酒', degree: 40, capacity: 700, price: 198, origin: '美国田纳西', keywords: ['杰克丹尼', 'jkd', 'jiekedani', 'jack', 'daniels', 'no7', '田纳西', '威士忌'], color: '#1a1a1a' },
    { brand: '杰克丹尼', name: '绅士杰克', fullName: 'Jack Daniels Gentleman Jack', type: '洋酒', degree: 40, capacity: 700, price: 328, origin: '美国田纳西', keywords: ['绅士', 'gentleman', '绅士杰克'], color: '#4A3728' },
    { brand: '杰克丹尼', name: '蜂蜜威士忌', fullName: 'Jack Daniels Tennessee Honey', type: '洋酒', degree: 35, capacity: 700, price: 228, origin: '美国田纳西', keywords: ['蜂蜜', 'honey', '蜂蜜威士忌'], color: '#DAA520' },

    { brand: '金宾', name: '波本威士忌', fullName: 'Jims Beam Bourbon', type: '洋酒', degree: 40, capacity: 700, price: 148, origin: '美国', keywords: ['金宾', 'jb', 'jinbin', 'jim', 'beam', '波本', 'bourbon', '威士忌'], color: '#8B4513' },
    { brand: '金宾', name: '黑麦', fullName: 'Jims Beam Rye', type: '洋酒', degree: 40, capacity: 700, price: 168, origin: '美国', keywords: ['黑麦', 'rye', '金宾黑麦'], color: '#4A3728' },

    { brand: '山崎', name: '12年', fullName: 'Yamazaki 12年', type: '洋酒', degree: 43, capacity: 700, price: 1680, origin: '日本大阪', keywords: ['山崎', 'sz', 'shanzaki', 'yamazaki', '12年', '日本威士忌'], color: '#8B4513' },
    { brand: '山崎', name: '18年', fullName: 'Yamazaki 18年', type: '洋酒', degree: 43, capacity: 700, price: 4800, origin: '日本大阪', keywords: ['18年', '山崎18'], color: '#4A3728' },
    { brand: '白州', name: '12年', fullName: 'Hakushu 12年', type: '洋酒', degree: 43, capacity: 700, price: 1580, origin: '日本', keywords: ['白州', 'bz', 'baizhou', 'hakushu', '12年'], color: '#2E8B57' },
    { brand: '响', name: '和风醇韵', fullName: 'Hibiki Harmony', type: '洋酒', degree: 43, capacity: 700, price: 980, origin: '日本', keywords: ['响', 'xz', 'xiang', 'hibiki', 'harmony', '和风', 'hefeng'], color: '#DAA520' },
    { brand: '响', name: '21年', fullName: 'Hibiki 21年', type: '洋酒', degree: 43, capacity: 700, price: 5800, origin: '日本', keywords: ['21年', '响21'], color: '#DAA520' },

    { brand: '阿贝', name: '10年', fullName: 'Ardbeg 10年', type: '洋酒', degree: 46, capacity: 700, price: 498, origin: '苏格兰艾雷岛', keywords: ['阿贝', 'abei', 'ab', 'ardbeg', '10年', '泥煤', '艾雷岛'], color: '#1a1a1a' },
    { brand: '乐加维林', name: '16年', fullName: 'Lagavulin 16年', type: '洋酒', degree: 43, capacity: 700, price: 598, origin: '苏格兰艾雷岛', keywords: ['乐加维林', 'ljwl', 'lagavulin', '16年', '泥煤'], color: '#DAA520' },
    { brand: '泰斯卡', name: '10年', fullName: 'Talisker 10年', type: '洋酒', degree: 45.8, capacity: 700, price: 368, origin: '苏格兰', keywords: ['泰斯卡', 'tstk', 'taisika', 'talisker', '10年', '海岛', '泥煤'], color: '#1E3A5F' },
    { brand: '克里尼利基', name: '14年', fullName: 'Clynelish 14年', type: '洋酒', degree: 46, capacity: 700, price: 568, origin: '苏格兰', keywords: ['克里尼利基', 'klnlj', 'clynelish', '14年', '蜡质感'], color: '#DAA520' },

    { brand: '马爹利', name: '蓝带', fullName: 'Martell Cordon Bleu', type: '洋酒', degree: 40, capacity: 700, price: 1398, origin: '法国干邑', keywords: ['马爹利', 'mdl', 'madelie', 'martell', '蓝带', 'landai', 'ld', 'cordonbleu', '干邑', 'cognac'], color: '#DAA520' },
    { brand: '马爹利', name: 'XO', fullName: 'Martell XO', type: '洋酒', degree: 40, capacity: 700, price: 1898, origin: '法国干邑', keywords: ['马爹利xo', 'mdlxo', 'martellxo', 'xo'], color: '#DAA520' },
    { brand: '马爹利', name: '名士', fullName: 'Martell Noblige', type: '洋酒', degree: 40, capacity: 700, price: 598, origin: '法国干邑', keywords: ['名士', 'ms', 'mingshi', 'noblige', '马爹利名士'], color: '#DAA520' },
    { brand: '马爹利', name: '鼎盛', fullName: 'Martell VSOP', type: '洋酒', degree: 40, capacity: 700, price: 398, origin: '法国干邑', keywords: ['鼎盛', 'ds', 'dingsheng', 'vsop', '马爹利鼎盛'], color: '#DAA520' },
    { brand: '芝华士', name: '12年', fullName: 'Chivas Regal 12 Year', type: '洋酒', degree: 40, capacity: 700, price: 198, origin: '苏格兰', keywords: ['芝华士', 'zhs', 'zhihuashi', 'chivas', '12年', '威士忌', 'whisky'], color: '#DAA520' },
    { brand: '芝华士', name: '18年', fullName: 'Chivas Regal 18 Year', type: '洋酒', degree: 40, capacity: 700, price: 498, origin: '苏格兰', keywords: ['芝华士18年', 'zhs18', 'chivas18'], color: '#DAA520' },
    { brand: '皇家礼炮', name: '21年', fullName: 'Royal Salute 21 Year', type: '洋酒', degree: 40, capacity: 700, price: 1198, origin: '苏格兰', keywords: ['皇家礼炮', 'hjlp', 'huangjialipao', 'royal', 'salute', '21年', '威士忌'], color: '#8B008B' },
    { brand: '百龄坛', name: '特醇', fullName: "Ballantine's Finest", type: '洋酒', degree: 40, capacity: 700, price: 98, origin: '苏格兰', keywords: ['百龄坛', 'blt', 'bailingtan', 'ballantines', '特醇', 'techun', '威士忌'], color: '#DAA520' },
    { brand: '百龄坛', name: '12年', fullName: "Ballantine's 12 Year", type: '洋酒', degree: 40, capacity: 700, price: 198, origin: '苏格兰', keywords: ['百龄坛12年', 'blt12', 'ballantines12'], color: '#DAA520' },
    { brand: '格兰威特', name: '12年', fullName: 'The Glenlivet 12 Year', type: '洋酒', degree: 40, capacity: 700, price: 298, origin: '苏格兰', keywords: ['格兰威特', 'glwt', 'gelanweite', 'glenlivet', '12年', '单一麦芽', 'singlemalt', '威士忌'], color: '#DAA520' },
    { brand: '绝对伏特加', name: '原味', fullName: 'Absolut Vodka Original', type: '洋酒', degree: 40, capacity: 750, price: 98, origin: '瑞典', keywords: ['绝对', 'juedui', 'jd', 'absolut', 'vodka', '伏特加', '原味', 'original'], color: '#1E5AA8' },
    { brand: '绝对伏特加', name: '柠檬味', fullName: 'Absolut Citron', type: '洋酒', degree: 40, capacity: 750, price: 108, origin: '瑞典', keywords: ['柠檬', 'citron', '柠檬味'], color: '#F0E68C' },
    { brand: '绝对伏特加', name: '覆盆子味', fullName: 'Absolut Raspberri', type: '洋酒', degree: 40, capacity: 750, price: 108, origin: '瑞典', keywords: ['覆盆子', 'raspberri', '覆盆子味'], color: '#C41E3A' },
    { brand: '灰雁', name: '伏特加', fullName: 'Grey Goose Vodka', type: '洋酒', degree: 40, capacity: 750, price: 358, origin: '法国', keywords: ['灰雁', 'hy', 'huiyan', 'grey', 'goose', '伏特加'], color: '#C0C0C0' },
    { brand: '红牌', name: '伏特加', fullName: 'Stolichnaya Vodka', type: '洋酒', degree: 40, capacity: 750, price: 78, origin: '俄罗斯', keywords: ['红牌', 'hp', 'hongpai', 'stolichnaya', '苏联红牌', '伏特加'], color: '#C41E3A' },

    { brand: '尊尼获加', name: '黑牌', fullName: 'Johnnie Walker Black Label', type: '洋酒', degree: 40, capacity: 700, price: 268, origin: '苏格兰', keywords: ['尊尼获加', 'znhj', 'zunnihuojia', 'johnniewalker', '黑牌', 'heipai', 'hp', 'blacklabel', '威士忌'], color: '#1a1a1a' },
    { brand: '尊尼获加', name: '红牌', fullName: 'Johnnie Walker Red Label', type: '洋酒', degree: 40, capacity: 700, price: 128, origin: '苏格兰', keywords: ['红牌', 'hongpai', 'redlabel', '尊尼获加红牌'], color: '#C41E3A' },
    { brand: '尊尼获加', name: '蓝牌', fullName: 'Johnnie Walker Blue Label', type: '洋酒', degree: 40, capacity: 750, price: 1388, origin: '苏格兰', keywords: ['蓝牌', 'lanpai', 'bluelabel', '尊尼获加蓝牌'], color: '#1E5AA8' },
    { brand: '尊尼获加', name: '绿牌', fullName: 'Johnnie Walker Green Label', type: '洋酒', degree: 40, capacity: 750, price: 558, origin: '苏格兰', keywords: ['绿牌', 'lupai', 'greenlabel', '尊尼获加绿牌'], color: '#2E8B57' },
    { brand: '麦卡伦', name: '12年', fullName: 'Macallan 12 Year', type: '洋酒', degree: 40, capacity: 700, price: 698, origin: '苏格兰', keywords: ['麦卡伦', 'mkl', 'maikalun', 'macallan', '12年', '单一麦芽', 'singlemalt', '威士忌'], color: '#8B4513' },
    { brand: '麦卡伦', name: '18年', fullName: 'Macallan 18 Year', type: '洋酒', degree: 43, capacity: 700, price: 2580, origin: '苏格兰', keywords: ['麦卡伦18年', 'mkl18', 'macallan18'], color: '#8B4513' },
    { brand: '苏格登', name: '12年', fullName: 'Singleton 12 Year', type: '洋酒', degree: 40, capacity: 700, price: 328, origin: '苏格兰', keywords: ['苏格登', 'sgd', 'sugedeng', 'singleton', '12年', '单一麦芽', '威士忌'], color: '#DAA520' },
    { brand: '泰斯卡', name: '10年', fullName: 'Talisker 10 Year', type: '洋酒', degree: 45.8, capacity: 700, price: 298, origin: '苏格兰', keywords: ['泰斯卡', 'tstk', 'taisika', 'talisker', '10年', '海岛', '泥煤', '单一麦芽', '威士忌'], color: '#1E3A5F' },
    { brand: '斯米诺', name: '伏特加', fullName: 'Smirnoff Vodka', type: '洋酒', degree: 37.5, capacity: 700, price: 68, origin: '英国', keywords: ['斯米诺', 'smn', 'siminuo', 'smirnoff', '伏特加', 'vodka'], color: '#C0C0C0' },
    { brand: '摩根船长', name: '白朗姆', fullName: 'Captain Morgan White Rum', type: '洋酒', degree: 37.5, capacity: 700, price: 88, origin: '加勒比', keywords: ['摩根船长', 'mgcz', 'mogenchuanzhang', 'captain', 'morgan', '白朗姆', 'bailangmu', 'blm', '朗姆酒', 'rum'], color: '#F0F8FF' },
    { brand: '摩根船长', name: '黑朗姆', fullName: 'Captain Morgan Black Rum', type: '洋酒', degree: 40, capacity: 700, price: 98, origin: '加勒比', keywords: ['黑朗姆', 'heilangmu', 'hlm', '摩根船长黑朗姆'], color: '#4A3728' },
    { brand: '添加利', name: '金酒', fullName: 'Tanqueray London Dry Gin', type: '洋酒', degree: 47.3, capacity: 700, price: 128, origin: '英国', keywords: ['添加利', 'tjl', 'tianjiali', 'tanqueray', '金酒', 'gin', '伦敦干金'], color: '#2E8B57' },
    { brand: '孟买蓝宝石', name: '金酒', fullName: 'Bombay Sapphire Gin', type: '洋酒', degree: 40, capacity: 750, price: 108, origin: '英国', keywords: ['孟买蓝宝石', 'mblbs', 'bombay', 'sapphire', '金酒', 'gin'], color: '#1E5AA8' },
    { brand: '健力士', name: '黑啤', fullName: 'Guinness Draught', type: '洋酒', degree: 5, capacity: 440, price: 15, origin: '爱尔兰', keywords: ['健力士', 'jls', 'jianlishi', 'guinness', '黑啤', 'heipi', '啤酒', 'beer'], color: '#1a1a1a' },

    { brand: '百加得', name: '白朗姆酒', fullName: 'Bacardi Carta Blanca', type: '洋酒', degree: 40, capacity: 750, price: 88, origin: '波多黎各', keywords: ['百加得', 'bjd', 'baijiade', 'bacardi', '白朗姆', '朗姆酒', 'rum'], color: '#F0F8FF' },
    { brand: '百加得', name: '黑朗姆酒', fullName: 'Bacardi Carta Negra', type: '洋酒', degree: 40, capacity: 750, price: 98, origin: '波多黎各', keywords: ['黑朗姆', '黑牌', 'cartanegra'], color: '#4A3728' },
    { brand: '百加得', name: '8年朗姆', fullName: 'Bacardi 8 Year Rum', type: '洋酒', degree: 40, capacity: 750, price: 198, origin: '波多黎各', keywords: ['百加得8年', 'bjd8', 'bacardi8', '8年', '朗姆酒'], color: '#8B4513' },
    { brand: '百加得', name: '151', fullName: 'Bacardi 151 Rum', type: '洋酒', degree: 75.5, capacity: 750, price: 168, origin: '波多黎各', keywords: ['百加得151', 'bjd151', 'bacardi151', '151', '高度朗姆'], color: '#C41E3A' },
    { brand: '百加得', name: '金朗姆', fullName: 'Bacardi Gold Rum', type: '洋酒', degree: 40, capacity: 750, price: 108, origin: '波多黎各', keywords: ['金朗姆', 'jinlangmu', 'jlm', 'bacardigold', '百加得金朗姆'], color: '#DAA520' },
    { brand: '灰雁', name: '伏特加', fullName: 'Grey Goose Vodka', type: '洋酒', degree: 40, capacity: 750, price: 298, origin: '法国', keywords: ['灰雁', 'hy', 'huiyan', 'greygoose', '伏特加', 'vodka'], color: '#C0C0C0' },
    { brand: '皇太子', name: '伏特加', fullName: 'Eristoff Vodka', type: '洋酒', degree: 37.5, capacity: 700, price: 78, origin: '法国', keywords: ['皇太子', 'hzt', 'huangtaizi', 'eristoff', '伏特加', 'vodka'], color: '#1E5AA8' },
    { brand: '帝王', name: '12年', fullName: "Dewar's 12 Year", type: '洋酒', degree: 40, capacity: 700, price: 228, origin: '苏格兰', keywords: ['帝王', 'dw', 'diwang', 'dewars', '12年', '威士忌', 'whisky'], color: '#DAA520' },
    { brand: '帝王', name: '15年', fullName: "Dewar's 15 Year", type: '洋酒', degree: 40, capacity: 700, price: 358, origin: '苏格兰', keywords: ['帝王15年', 'dw15', 'dewars15'], color: '#DAA520' },
    { brand: '哈瓦那俱乐部', name: '7年朗姆', fullName: 'Havana Club 7 Year', type: '洋酒', degree: 40, capacity: 700, price: 258, origin: '古巴', keywords: ['哈瓦那俱乐部', 'hwjlb', 'havanaclub', '7年', '朗姆酒', 'rum'], color: '#8B4513' },
    { brand: '孟买莓瑰', name: '金酒', fullName: 'Bombay Bramble Gin', type: '洋酒', degree: 37.5, capacity: 700, price: 118, origin: '英国', keywords: ['孟买莓瑰', 'mbmg', 'bombaybramble', '莓瑰', '金酒', 'gin'], color: '#8B008B' },
    { brand: '摩根船长', name: '金朗姆', fullName: 'Captain Morgan Spiced Gold', type: '洋酒', degree: 35, capacity: 750, price: 98, origin: '加勒比', keywords: ['摩根船长', 'mgcz', 'morganchang', 'captain', 'morgan', '金朗姆', 'spiced'], color: '#DAA520' },

    { brand: '添加利', name: '伦敦干金', fullName: 'Tanqueray London Dry Gin', type: '洋酒', degree: 43.1, capacity: 750, price: 148, origin: '英国', keywords: ['添加利', 'tjl', 'tianjiali', 'tanqueray', '伦敦干金', 'london', 'dry', 'gin', '金酒'], color: '#2E8B57' },
    { brand: '孟买蓝宝石', name: '金酒', fullName: 'Bombay Sapphire Gin', type: '洋酒', degree: 40, capacity: 750, price: 158, origin: '英国', keywords: ['孟买蓝宝石', 'mblbs', 'bombay', 'sapphire', '金酒', 'gin'], color: '#1E5AA8' },

    { brand: '豪帅', name: '金标龙舌兰', fullName: 'Jose Cuervo Gold', type: '洋酒', degree: 38, capacity: 750, price: 128, origin: '墨西哥', keywords: ['豪帅', 'hs', 'haoshuai', 'jose', 'cuervo', '金标', 'gold', '龙舌兰', 'tequila'], color: '#DAA520' },
    { brand: '培恩', name: '银龙舌兰', fullName: 'Patron Silver', type: '洋酒', degree: 40, capacity: 750, price: 580, origin: '墨西哥', keywords: ['培恩', 'pe', 'peien', 'patron', '银龙舌兰', 'silver', 'tequila'], color: '#C0C0C0' },

    { brand: '野格', name: '圣鹿', fullName: 'Jagermeister', type: '洋酒', degree: 35, capacity: 700, price: 158, origin: '德国', keywords: ['野格', 'yg', 'yege', 'jagermeister', '圣鹿', 'shenglu', '利口酒'], color: '#2E4A3F' },
    { brand: '百利甜', name: '巧克力味', fullName: 'Baileys Chocolate', type: '洋酒', degree: 17, capacity: 700, price: 138, origin: '爱尔兰', keywords: ['巧克力', 'chocolate', '百利巧克力'], color: '#4A3728' },
    { brand: '百利甜', name: '草莓奶油', fullName: 'Baileys Strawberry Cream', type: '洋酒', degree: 17, capacity: 700, price: 138, origin: '爱尔兰', keywords: ['草莓', 'strawberry', '奶油', '百利草莓'], color: '#FF69B4' },
    { brand: '君度', name: '橙酒', fullName: 'Cointreau', type: '洋酒', degree: 40, capacity: 700, price: 198, origin: '法国', keywords: ['君度', 'jd', 'jundu', 'cointreau', '橙酒', '橙味', '利口酒'], color: '#DAA520' },
    { brand: '甘露', name: '咖啡力娇酒', fullName: 'Kahlua Coffee Liqueur', type: '洋酒', degree: 20, capacity: 700, price: 118, origin: '墨西哥', keywords: ['甘露', 'gl', 'ganlu', 'kahlua', '咖啡', 'coffee', '力娇酒', '利口酒'], color: '#8B4513' },
    { brand: '马利宝', name: '椰子朗姆', fullName: 'Malibu Coconut Rum', type: '洋酒', degree: 21, capacity: 700, price: 108, origin: '加勒比', keywords: ['马利宝', 'mlb', 'malibao', 'malibu', '椰子', 'coconut', '朗姆'], color: '#F0F8FF' },
    { brand: '帝萨诺', name: '杏仁利口酒', fullName: 'Disaronno Amaretto', type: '洋酒', degree: 28, capacity: 700, price: 158, origin: '意大利', keywords: ['帝萨诺', 'disaronno', 'amaretto', '杏仁', '利口酒'], color: '#8B4513' },

    { brand: '青岛啤酒', name: '纯生', fullName: '青岛啤酒 纯生', type: '啤酒', degree: 3.6, capacity: 500, price: 6, origin: '山东青岛', keywords: ['青岛纯生', 'cs', 'chunsheng', '纯生', '啤酒'], color: '#1E5AA8' },
    { brand: '青岛啤酒', name: '奥古特', fullName: '青岛啤酒 奥古特', type: '啤酒', degree: 4.7, capacity: 500, price: 12, origin: '山东青岛', keywords: ['奥古特', 'agt', 'augerta'], color: '#DAA520' },
    { brand: '青岛啤酒', name: '白啤', fullName: '青岛啤酒 白啤', type: '啤酒', degree: 4.1, capacity: 500, price: 8, origin: '山东青岛', keywords: ['白啤', 'bp', 'baipi', '青岛白啤'], color: '#F0E68C' },
    { brand: '青岛啤酒', name: '全麦白啤', fullName: '青岛啤酒 全麦白啤', type: '啤酒', degree: 4.1, capacity: 500, price: 10, origin: '山东青岛', keywords: ['全麦', 'quanmai', 'qm', '白啤'], color: '#F0E68C' },
    { brand: '青岛啤酒', name: '皮尔森', fullName: '青岛啤酒 皮尔森', type: '啤酒', degree: 4.0, capacity: 500, price: 10, origin: '山东青岛', keywords: ['皮尔森', 'pes', 'pilsner'], color: '#F0E68C' },

    { brand: '雪花啤酒', name: '纯生', fullName: '雪花啤酒 纯生', type: '啤酒', degree: 3.6, capacity: 500, price: 5, origin: '辽宁沈阳', keywords: ['雪花纯生', '雪花', 'xuehua', 'snow', '纯生'], color: '#1E5AA8' },
    { brand: '雪花啤酒', name: '匠心营造', fullName: '雪花啤酒 匠心营造', type: '啤酒', degree: 4.3, capacity: 500, price: 12, origin: '辽宁沈阳', keywords: ['匠心', 'jiangxin', 'jx', '营造'], color: '#8B4513' },
    { brand: '雪花啤酒', name: '脸谱', fullName: '雪花啤酒 脸谱', type: '啤酒', degree: 5.0, capacity: 500, price: 20, origin: '辽宁沈阳', keywords: ['脸谱', 'lianpu', 'lp', '花脸'], color: '#C41E3A' },

    { brand: '百威啤酒', name: '纯生', fullName: 'Budweiser Pure', type: '啤酒', degree: 3.6, capacity: 500, price: 8, origin: '美国', keywords: ['百威纯生', 'bw', 'baiwei', 'budweiser', '纯生'], color: '#1E5AA8' },
    { brand: '百威啤酒', name: '金樽', fullName: 'Budweiser Gold', type: '啤酒', degree: 4.8, capacity: 500, price: 15, origin: '美国', keywords: ['金樽', 'jz', 'jinzun', 'gold'], color: '#DAA520' },
    { brand: '百威啤酒', name: '黑金', fullName: 'Budweiser Black', type: '啤酒', degree: 5.0, capacity: 500, price: 18, origin: '美国', keywords: ['黑金', 'hj', 'heijin', 'black'], color: '#1a1a1a' },

    { brand: '哈尔滨啤酒', name: '冰纯', fullName: '哈尔滨啤酒 冰纯', type: '啤酒', degree: 3.6, capacity: 500, price: 5, origin: '黑龙江哈尔滨', keywords: ['哈尔滨', 'hrb', 'haerbin', 'harbin', '冰纯', 'bingchun', 'bc'], color: '#1E90FF' },

    { brand: '燕京啤酒', name: '纯生', fullName: '燕京啤酒 纯生', type: '啤酒', degree: 3.6, capacity: 500, price: 6, origin: '北京', keywords: ['燕京纯生', 'yj', 'yanjing', '纯生'], color: '#1E5AA8' },

    { brand: '蓝带啤酒', name: '经典', fullName: 'Pabst Blue Ribbon', type: '啤酒', degree: 4.3, capacity: 500, price: 8, origin: '美国', keywords: ['蓝带', 'ld', 'landai', 'pabst', 'blue', 'ribbon', 'pbr'], color: '#1E3A5F' },

    { brand: '鹅岛', name: 'IPA', fullName: 'Goose Island IPA', type: '啤酒', degree: 5.9, capacity: 330, price: 15, origin: '美国', keywords: ['鹅岛', 'ed', 'edao', 'goose', 'island', 'ipa', '精酿', '印度淡色艾尔'], color: '#DAA520' },
    { brand: '拳击猫', name: '精酿', fullName: 'Boxing Cat Brewery', type: '啤酒', degree: 5.5, capacity: 330, price: 25, origin: '上海', keywords: ['拳击猫', 'qjm', 'boxing', 'cat', '精酿', 'craft', 'brewery'], color: '#C41E3A' },
    { brand: '粉象', name: '深粉象', fullName: 'Delirium Tremens', type: '啤酒', degree: 8.5, capacity: 330, price: 35, origin: '比利时', keywords: ['粉象', 'fx', 'fenxiang', 'delirium', 'tremens', '深粉象', '比利时'], color: '#C0C0C0' },
    { brand: '林德曼', name: '樱桃啤酒', fullName: 'Lindemans Kriek', type: '啤酒', degree: 3.5, capacity: 330, price: 30, origin: '比利时', keywords: ['林德曼', 'ldm', 'lindemans', '樱桃', 'kriek', '樱桃啤酒', '兰比克', 'lambic'], color: '#C41E3A' },
    { brand: '酿酒狗', name: '朋克IPA', fullName: 'Brewdog Punk IPA', type: '啤酒', degree: 5.6, capacity: 330, price: 18, origin: '苏格兰', keywords: ['酿酒狗', 'njd', 'brewdog', '朋克', 'punk', 'ipa', '精酿'], color: '#F0E68C' },
    { brand: '健力士', name: '黑啤酒', fullName: 'Guinness Draught', type: '啤酒', degree: 4.2, capacity: 330, price: 18, origin: '爱尔兰', keywords: ['健力士', 'jls', 'jianlishi', 'guinness', '黑啤', 'stout', '世涛', '生啤'], color: '#1a1a1a' },
    { brand: '福佳', name: '玫瑰红', fullName: 'Hoegaarden Rosee', type: '啤酒', degree: 3, capacity: 330, price: 13, origin: '比利时', keywords: ['福佳玫瑰', 'fj', 'fujia', 'hoegaarden', 'rosee', '玫瑰红', '白啤'], color: '#FF69B4' },

    { brand: '古越龙山', name: '金五年', fullName: '古越龙山 金五年', type: '黄酒', degree: 14, capacity: 500, price: 28, origin: '浙江绍兴', keywords: ['金五年', 'jwn', '5年', '五年', '金5'], color: '#DAA520' },
    { brand: '古越龙山', name: '木盒十年', fullName: '古越龙山 木盒十年', type: '黄酒', degree: 14, capacity: 500, price: 198, origin: '浙江绍兴', keywords: ['木盒', 'muhe', 'mh', '十年', '10年'], color: '#8B4513' },
    { brand: '塔牌', name: '冬酿', fullName: '塔牌 冬酿', type: '黄酒', degree: 14, capacity: 500, price: 128, origin: '浙江绍兴', keywords: ['冬酿', 'dongniang', 'dn', '手工冬酿'], color: '#2E4A3F' },
    { brand: '女儿红', name: '十八年陈', fullName: '女儿红 十八年陈', type: '黄酒', degree: 15, capacity: 500, price: 298, origin: '浙江绍兴', keywords: ['十八年', '18年', '18n', '女儿红十八年'], color: '#C41E3A' },
    { brand: '会稽山', name: '五年陈', fullName: '会稽山 五年陈', type: '黄酒', degree: 14, capacity: 500, price: 48, origin: '浙江绍兴', keywords: ['五年', '5年', '5n', '会稽山五年'], color: '#DAA520' },
    { brand: '会稽山', name: '十年陈', fullName: '会稽山 十年陈', type: '黄酒', degree: 14, capacity: 500, price: 118, origin: '浙江绍兴', keywords: ['十年', '10年', '10n', '会稽山十年'], color: '#8B4513' },

    { brand: '梅见', name: '白梅见', fullName: '梅见 白梅见', type: '其他', degree: 12, capacity: 330, price: 45, origin: '重庆', keywords: ['白梅见', 'bmj', 'baimeijian', '青梅酒', '白梅'], color: '#F0E68C' },
    { brand: '梅见', name: '金梅见', fullName: '梅见 金梅见', type: '其他', degree: 20, capacity: 330, price: 128, origin: '重庆', keywords: ['金梅见', 'jmj', 'jinmeijian', '青梅酒', '金梅'], color: '#DAA520' },
    { brand: '梅见', name: '原味', fullName: '梅见 原味青梅酒', type: '其他', degree: 12, capacity: 500, price: 58, origin: '重庆', keywords: ['原味', 'yuanwei', 'yw', '青梅酒'], color: '#90EE90' },

    { brand: '落饮', name: '荔枝果酒', fullName: '落饮 荔枝果酒', type: '其他', degree: 12, capacity: 300, price: 45, origin: '云南', keywords: ['落饮荔枝', 'ly', 'luoyin', '荔枝', 'lizhi', '果酒'], color: '#FFB6C1' },
    { brand: '落饮', name: '蜜桃乌龙', fullName: '落饮 蜜桃乌龙', type: '其他', degree: 12, capacity: 300, price: 45, origin: '云南', keywords: ['蜜桃', 'mitao', 'mt', '乌龙', 'wulong', '茶果酒'], color: '#FFB6C1' },
    { brand: '贝瑞甜心', name: '蜜桃果酒', fullName: 'MissBerry 蜜桃果酒', type: '其他', degree: 8, capacity: 300, price: 42, origin: '上海', keywords: ['贝瑞蜜桃', 'brtx', 'beiruitianxin', 'missberry', '蜜桃', '果酒'], color: '#FFB6C1' },
    { brand: '贝瑞甜心', name: '玫瑰荔枝', fullName: 'MissBerry 玫瑰荔枝', type: '其他', degree: 8, capacity: 300, price: 42, origin: '上海', keywords: ['玫瑰', 'meigui', 'mg', '荔枝', 'lizhi', '果酒'], color: '#FF69B4' },

    { brand: '狮子歌歌', name: '梅酒', fullName: 'Shishigogo Ume', type: '其他', degree: 8, capacity: 300, price: 35, origin: '日本', keywords: ['狮子歌歌', 'szgg', 'shishigogo', '梅酒', 'ume', '果酒'], color: '#FF69B4' },
    { brand: '狮子歌歌', name: '柚子酒', fullName: 'Shishigogo Yuzu', type: '其他', degree: 8, capacity: 300, price: 35, origin: '日本', keywords: ['柚子', 'youzi', 'yuzu', '柚子酒', '果酒'], color: '#F0E68C' },
    { brand: '俏雅', name: '梅酒', fullName: 'Choya Umeshu', type: '其他', degree: 15, capacity: 720, price: 128, origin: '日本', keywords: ['俏雅', 'qy', 'qiaoya', 'choya', '梅酒', 'umeshu', '日本梅酒'], color: '#8B0000' },
    { brand: '三得利', name: '蜜多丽梅酒', fullName: 'Suntory Midori', type: '其他', degree: 20, capacity: 700, price: 158, origin: '日本', keywords: ['三得利', 'sdl', 'sandeeli', 'suntory', '蜜多丽', 'midori', '梅酒', '哈密瓜利口酒'], color: '#90EE90' },

    { brand: '十四代', name: '龙月', fullName: 'Juyondai Rygetsu', type: '清酒', degree: 16, capacity: 720, price: 5500, origin: '日本山形', keywords: ['龙月', 'longyue', 'ly', 'rygetsu', '清酒'], color: '#DAA520' },
    { brand: '日本盛', name: '上选清酒', fullName: 'Nihonsakari Superior', type: '清酒', degree: 15, capacity: 720, price: 108, origin: '日本', keywords: ['日本盛', 'rbs', 'nihonsakari', '上选', '清酒', 'sake'], color: '#F0F8FF' },
    { brand: '大关', name: '清酒', fullName: 'Ozeki Sake', type: '清酒', degree: 15, capacity: 720, price: 88, origin: '日本', keywords: ['大关', 'dg', 'daguan', 'ozeki', '清酒', 'sake'], color: '#F0F8FF' },
    { brand: '松竹梅', name: '清酒', fullName: 'Shochikubai Sake', type: '清酒', degree: 15, capacity: 720, price: 98, origin: '日本', keywords: ['松竹梅', 'szm', 'songzhumei', 'shochikubai', '清酒', 'sake'], color: '#DAA520' },
    { brand: '朝香', name: '纯米大吟酿', fullName: 'Asaka Junmai Daiginjo', type: '清酒', degree: 16, capacity: 720, price: 358, origin: '日本', keywords: ['朝香', 'cx', 'chaoxiang', 'asaka', '纯米大吟酿', '清酒', 'sake'], color: '#F0F8FF' }
  ];

  var ALIASES = {
    '普五': '五粮液普五第八代',
    '普5': '五粮液普五第八代',
    '飞茅': '飞天茅台',
    '飞天': '飞天茅台',
    '普飞': '飞天茅台',
    '新飞天': '飞天茅台',
    '国窖': '国窖1573',
    '1573': '国窖1573',
    '水晶剑': '剑南春水晶剑',
    '普剑': '剑南春水晶剑',
    '青花郎': '郎酒青花郎',
    '红10': '郎酒红花郎10年',
    '红15': '郎酒红花郎15年',
    '红十': '郎酒红花郎10年',
    '红十五': '郎酒红花郎15年',
    '梦3': '洋河梦之蓝M3水晶版',
    '梦6': '洋河梦之蓝M6+',
    '梦9': '洋河梦之蓝M9',
    '梦三': '洋河梦之蓝M3水晶版',
    '梦六': '洋河梦之蓝M6+',
    '梦九': '洋河梦之蓝M9',
    '青花20': '汾酒青花20',
    '青花30': '汾酒青花30复兴版',
    '黄盖玻汾': '汾酒黄盖玻汾',
    '玻汾': '汾酒黄盖玻汾',
    '古20': '古井贡酒年份原浆古20',
    '古16': '古井贡酒年份原浆古16',
    '古8': '古井贡酒年份原浆古8',
    '井台': '水井坊井台',
    '珍十五': '珍酒珍十五',
    '珍三十': '珍酒珍三十',
    '摘要': '金沙摘要',
    '绿脖': '西凤绿脖西凤',
    '黑方': '尊尼获加黑牌',
    '红方': '尊尼获加红牌',
    '蓝方': '尊尼获加蓝牌',
    '金方': '尊尼获加金牌珍藏',
    '绿方': '尊尼获加绿牌15年',
    '芝华士12': '芝华士12年',
    '野格': '野格圣鹿利口酒',
    '百利甜': '百利甜原味',
    '君度': '君度橙味利口酒',
    '獭祭23': '獭祭二割三分',
    '獭祭39': '獭祭三割九分',
    '獭祭45': '獭祭四割五分',
    '大拉菲': '拉菲拉菲古堡正牌',
    '小葛兰许': '奔富BIN389',
    '葛兰许': '奔富葛兰许',
    '389': '奔富BIN389',
    '407': '奔富BIN407',
    '128': '奔富BIN128',
    '28': '奔富BIN28',
    '2': '奔富BIN2',
    '8': '奔富BIN8',
    '健力士': '健力士黑啤酒',
    '粉象': '粉象深粉象',
    '罗斯福6': '罗斯福6号啤酒',
    '罗斯福8': '罗斯福8号啤酒',
    '罗斯福10': '罗斯福10号啤酒',
    '智美蓝': '智美蓝帽',
    '智美红': '智美红帽',
    '智美白': '智美白帽'
  };

  function normalize(str) {
    if (!str) return '';
    var s = String(str).toLowerCase();
    s = s.replace(/\s+/g, '');
    s = s.replace(/[\u3000\u00a0\u2000-\u200f\u2028-\u202f\ufeff]/g, '');
    s = s.replace(/[·。,，、（）()【】\[\]《》<>°º%％\-—~～!！?？:：;；"'「」『』]/g, '');
    s = s.replace(/ml|毫升|度|°/gi, '');
    s = s.replace(/\d+/g, '');
    return s;
  }

  function expandAliases(text) {
    if (!text) return text;
    var result = text;
    var keys = Object.keys(ALIASES).sort(function(a, b) { return b.length - a.length; });
    for (var i = 0; i < keys.length; i++) {
      var alias = keys[i];
      var full = ALIASES[alias];
      var re = new RegExp(alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      result = result.replace(re, full);
    }
    return result;
  }

  function getEnglishName(wine) {
    var brandMap = {
      '茅台': 'Moutai', '五粮液': 'Wuliangye', '国窖1573': 'Guojiao 1573', '泸州老窖': 'Luzhou Laojiao',
      '剑南春': 'Jiannanchun', '洋河': 'Yanghe', '汾酒': 'Fenjiu', '郎酒': 'Langjiu', '习酒': 'Xijiu',
      '舍得': 'Shede', '沱牌': 'Tuopai', '酒鬼酒': 'Jiugui', '古井贡酒': 'Gujing Gongjiu', '黄鹤楼酒': 'Huanghelou',
      '水井坊': 'Shuijingfang', '珍酒': 'Zhenjiu', '金沙': 'Jinsha', '西凤': 'Xifeng', '董酒': 'Dongjiu',
      '双沟': 'Shuanggou', '白云边': 'Baiyunbian', '口子窖': 'Kouzijiao', '迎驾贡酒': 'Yingjia Gongjiu',
      '今世缘': 'Jinshiyuan', '高沟': 'Gaogou', '牛栏山': 'Niulanshan', '红星': 'Hongxing', '一担粮': 'Yidanliang',
      '衡水老白干': 'Hengshuilaobaigan', '四特酒': 'Sitejiu', '江小白': 'Jiangxiaobai', '劲酒': 'Jinjiu',
      '人头马': 'Remy Martin', '轩尼诗': 'Hennessy', '马爹利': 'Martell', '拿破仑': 'Courvoisier',
      '尊尼获加': 'Johnnie Walker', '芝华士': 'Chivas Regal', '麦卡伦': 'Macallan', '格兰菲迪': 'Glenfiddich',
      '百富': 'The Balvenie', '格兰威特': 'Glenlivet', '雅伯': 'Ardbeg', '拉弗格': 'Laphroaig', '波摩': 'Bowmore',
      '尊美醇': 'Jameson', '山崎': 'Yamazaki', '白州': 'Hakushu', '响': 'Hibiki', '杰克丹尼': 'Jack Daniels',
      '绝对伏特加': 'Absolut Vodka', '灰雁': 'Grey Goose', '斯米诺': 'Smirnoff', '深蓝': 'Skyy', '雪树': 'Belvedere',
      '百加得': 'Bacardi', '摩根船长': 'Captain Morgan', '添加利': 'Tanqueray', '孟买蓝宝石': 'Bombay Sapphire',
      '哥顿': "Gordon's", '必富达': 'Beefeater', '亨利爵士': "Hendrick's", '豪帅': 'Jose Cuervo', '培恩': 'Patron',
      '奥美加': 'Olmeca', '唐胡里奥': 'Don Julio', '野格': 'Jagermeister', '百利甜': 'Baileys', '君度': 'Cointreau',
      '甘露': 'Kahlua', '马利宝': 'Malibu', '奔富': 'Penfolds', '拉菲': 'Lafite', '木桐': 'Mouton Rothschild',
      '玛歌': 'Chateau Margaux', '拉图': 'Chateau Latour', '奥比昂': 'Chateau Haut-Brion', '杰卡斯': 'Jacobs Creek',
      '黄尾袋鼠': 'Yellow Tail', '天鹅庄': 'Swan', '张裕': 'Changyu', '长城': 'Great Wall', '王朝': 'Dynasty',
      '怡园酒庄': 'Grace Vineyard', '干露': 'Concha y Toro', '蒙特斯': 'Montes', '酩悦': 'Moet & Chandon',
      '巴黎之花': 'Perrier Jouet', '唐培里侬': 'Dom Perignon', '凯歌': 'Veuve Clicquot', '青岛啤酒': 'Tsingtao',
      '雪花啤酒': 'Snow Beer', '百威啤酒': 'Budweiser', '哈尔滨啤酒': 'Harbin', '燕京啤酒': 'Yanjing',
      '嘉士伯': 'Carlsberg', '喜力': 'Heineken', '科罗娜': 'Corona', '1664': 'Kronenbourg 1664',
      '福佳': 'Hoegaarden', '白熊': 'Vedett', '罗斯福': 'Rochefort', '智美': 'Chimay', '鹅岛': 'Goose Island',
      '拳击猫': 'Boxing Cat', '粉象': 'Delirium', '林德曼': 'Lindemans', '酿酒狗': 'Brewdog', '健力士': 'Guinness',
      '古越龙山': 'Guyue Longshan', '女儿红': 'Nuerhong', '会稽山': 'Kuaijishan', '塔牌': 'Tapai',
      '石库门': 'Shikumen', '沙洲优黄': 'Shazhou Youhuang', '和酒': 'Hejiu', '梅见': 'Meijian',
      '落饮': 'Luoyin', '贝瑞甜心': 'MissBerry', '武陵酒': 'Wuling', '文君酒': 'Wenjun', '叙府': 'Xufu',
      '鸭溪窖': 'Yaxijiao', '潭酒': 'Tanjiu', '国台': 'Guotai', '钓鱼台': 'Diaoyutai',
      '獭祭': 'Dassai', '白鹤': 'Hakutsuru', '菊正宗': 'Kikumasamune', '月桂冠': 'Gekkeikan',
      '久保田': 'Kubota', '十四代': 'Juyondai'
    };
    return brandMap[wine.brand] || wine.brand;
  }

  function calculateMatchScore(wine, text, normalizedText, loose) {
    var score = 0;
    var expandedText = expandAliases(text);
    var expandedNorm = normalize(expandedText);
    var brand = normalize(wine.brand);
    var name = normalize(wine.name);
    var fullName = normalize(wine.fullName);
    var brandName = normalize(wine.brand + wine.name);
    loose = loose || false;

    if (fullName && expandedNorm === fullName) score += 200;
    else if (brandName && expandedNorm === brandName) score += 180;

    if (brand && name) {
      if (expandedNorm.indexOf(brand) !== -1 && expandedNorm.indexOf(name) !== -1) {
        score += 120;
      }
    }

    if (brand && expandedNorm.indexOf(brand) !== -1) score += 60;
    if (name && expandedNorm.indexOf(name) !== -1) score += 60;
    if (fullName && expandedNorm.indexOf(fullName) !== -1) score += 50;
    if (brandName && expandedNorm.indexOf(brandName) !== -1) score += 80;

    if (brand && expandedNorm.indexOf(brand) === 0) score += 20;
    if (name && expandedNorm.indexOf(name) === 0) score += 20;

    (wine.keywords || []).forEach(function(kw) {
      var k = normalize(kw);
      if (k && k.length >= 2) {
        if (expandedNorm.indexOf(k) !== -1) {
          score += k.length >= 4 ? 45 : (k.length >= 3 ? 35 : 25);
        }
        if (k.indexOf(expandedNorm) === 0 && expandedNorm.length >= 2) {
          score += 20;
        }
        if (!loose) return;
        if (loose && k.length >= 2 && expandedNorm.length >= 2) {
          var matchLen = 0;
          for (var ci = 0; ci < Math.min(k.length, expandedNorm.length); ci++) {
            if (k[ci] === expandedNorm[ci]) matchLen++;
            else break;
          }
          if (matchLen >= 2) score += matchLen * 3;
        }
      }
    });

    var wineTypeMap = {
      '酱香': ['酱香', '酱香型', '酱酒'],
      '浓香': ['浓香', '浓香型'],
      '清香': ['清香', '清香型'],
      '兼香': ['兼香', '兼香型'],
      '洋酒': ['洋酒', 'whiskey', 'whisky', 'cognac', 'brandy', 'vodka', 'gin', 'rum', 'tequila', 'liqueur', '威士忌', '干邑', '白兰地', '伏特加', '金酒', '朗姆', '龙舌兰', '利口酒'],
      '葡萄酒': ['葡萄酒', '红酒', '干红', 'wine', 'redwine', '香槟', 'champagne'],
      '啤酒': ['啤酒', '精酿', 'beer', 'ale', 'ipa', 'stout', 'lager'],
      '黄酒': ['黄酒', '花雕', '绍兴酒', 'ricewine'],
      '清酒': ['清酒', 'sake', '日本酒', '吟酿', '大吟酿']
    };
    if (wine.type && wineTypeMap[wine.type]) {
      for (var ti = 0; ti < wineTypeMap[wine.type].length; ti++) {
        if (expandedNorm.indexOf(normalize(wineTypeMap[wine.type][ti])) !== -1) {
          score += 15;
          break;
        }
      }
    }

    var degreeMatch = text.match(/(\d{1,2}\.?\d*)\s*[度°]/);
    if (degreeMatch) {
      var diff = Math.abs(parseFloat(degreeMatch[1]) - wine.degree);
      if (diff < 0.3) score += 30;
      else if (diff < 1.0) score += 20;
      else if (diff < 2.0) score += 10;
      else if (diff < 5.0) score += 5;
    }

    var volPatterns = [/(\d{3,4})\s*(?:ml|ML|mL|毫升|ml)/i, /(\d{3,4})\s*ml/i, /(\d{3,4})ml/i];
    for (var vi = 0; vi < volPatterns.length; vi++) {
      var volMatch = text.match(volPatterns[vi]);
      if (volMatch && parseInt(volMatch[1]) === wine.capacity) {
        score += 20;
        break;
      }
    }

    var pricePatterns = [/[¥￥]\s*(\d{2,5})/, /(\d{2,5})\s*元/];
    for (var pi = 0; pi < pricePatterns.length; pi++) {
      var priceMatch = text.match(pricePatterns[pi]);
      if (priceMatch) {
        var p = parseInt(priceMatch[1]);
        var pdiff = Math.abs(p - wine.price);
        if (pdiff < 30) score += 20;
        else if (pdiff < 100) score += 15;
        else if (pdiff < 300) score += 8;
        else if (pdiff < 500) score += 4;
      }
    }

    if (loose) {
      if (brand && brand.length >= 2) {
        for (var bi = 0; bi < Math.min(brand.length, expandedNorm.length) - 1; bi++) {
          if (expandedNorm.indexOf(brand.substr(bi, 2)) !== -1) {
            score += 5;
            break;
          }
        }
      }
    }

    return score;
  }

  var PINYIN_MAP = {
    '茅': 'mao', '台': 'tai', '飞': 'fei', '天': 'tian', '五': 'wu', '星': 'xing', '生': 'sheng', '肖': 'xiao',
    '王': 'wang', '子': 'zi', '迎': 'ying', '宾': 'bin', '汉': 'han', '酱': 'jiang', '仁': 'ren',
    '贵': 'gui', '州': 'zhou', '大': 'da', '曲': 'qu', '赖': 'lai', '传': 'chuan', '承': 'cheng',
    '蓝': 'lan', '棕': 'zong', '端': 'duan', '重': 'zhong', '沙': 'sha', '精': 'jing', '典': 'dian',
    '华': 'hua', '祥': 'xiang', '邦': 'bang', '雅': 'ya', '五': 'wu', '粮': 'liang', '液': 'ye',
    '普': 'pu', '八': 'ba', '代': 'dai', '七': 'qi', '1618': '1618', '交': 'jiao', '杯': 'bei',
    '春': 'chun', '醇': 'chun2', '尖': 'jian', '庄': 'zhuang', '永': 'yong', '福': 'fu',
    '国': 'guo', '窖': 'jiao', '1573': '1573', '品': 'pin', '味': 'wei', '泸': 'lu', '州': 'zhou',
    '老': 'lao', '窖': 'jiao', '特': 'te', '头': 'tou', '曲': 'qu', '高': 'gao', '光': 'guang',
    '百': 'bai', '年': 'nian', '绵': 'mian', '柔': 'rou', '江': 'jiang', '南': 'nan', '醇': 'chun',
    '剑': 'jian', '南': 'nan', '春': 'chun', '东': 'dong', '方': 'fang', '红': 'hong', '水': 'shui',
    '晶': 'jing', '古': 'gu', '井': 'jing', '贡': 'gong', '古20': 'gu20', '古16': 'gu16',
    '古8': 'gu8', '古7': 'gu7', '幸福': 'xingfu', '经典': 'jingdian', '口子': 'kouzi', '窖': 'jiao',
    '迎': 'ying', '驾': 'jia', '贡': 'gong', '今': 'jin', '世': 'shi', '缘': 'yuan', '国': 'guo',
    '缘': 'yuan', '对': 'dui', '开': 'kai', '白': 'bai', '云': 'yun', '边': 'bian', '42度': '42',
    '董': 'dong', '酒': 'jiu', '西': 'xi', '凤': 'feng', '绿': 'lv', '脖': 'bo', '牛': 'niu',
    '栏': 'lan', '山': 'shan', '二': 'er', '锅': 'guo', '头': 'tou', '红': 'hong', '星': 'xing',
    '衡': 'heng', '水': 'shui', '老': 'lao', '白': 'bai', '干': 'gan', '四': 'si', '特': 'te',
    '劲': 'jin', '酒': 'jiu', '江': 'jiang', '小': 'xiao', '白': 'bai', '金': 'jin', '六': 'liu',
    '福': 'fu', '浏': 'liu', '阳': 'yang', '河': 'he', '稻': 'dao', '花': 'hua', '香': 'xiang',
    '枝': 'zhi', '江': 'jiang', '宋': 'song', '河': 'he', '仰': 'yang', '韶': 'shao', '彩': 'cai',
    '陶': 'tao', '坊': 'fang', '杜': 'du', '康': 'kang', '宝': 'bao', '丰': 'feng', '汾': 'fen',
    '青': 'qing', '花': 'hua', '20': '20', '30': '30', '竹': 'zhu', '叶': 'ye', '青': 'qing',
    '白': 'bai', '玉': 'yu', '玫': 'mei', '瑰': 'gui', '洋': 'yang', '河': 'he', '梦': 'meng',
    '之': 'zhi', '蓝': 'lan', 'M3': 'm3', 'M6': 'm6', 'M9': 'm9', '绵': 'mian', '柔': 'rou',
    '海': 'hai', '之': 'zhi', '蓝': 'lan', '天': 'tian', '之': 'zhi', '蓝': 'lan', '双': 'shuang',
    '沟': 'gou', '苏': 'su', '酒': 'jiu', '微': 'wei', '分': 'fen', '子': 'zi', '郎': 'lang',
    '红': 'hong', '花': 'hua', '郎': 'lang', '青': 'qing', '花': 'hua', '郎': 'lang', '特': 'te',
    '曲': 'qu', 'T6': 't6', 'T9': 't9', '习': 'xi', '酒': 'jiu', '君': 'jun', '品': 'pin',
    '窖': 'jiao', '藏': 'cang', '喜': 'xi', '宴': 'yan', '圆': 'yuan', '珍': 'zhen', '酒': 'jiu',
    '珍30': 'zhen30', '珍15': 'zhen15', '珍8': 'zhen8', '珍5': 'zhen5', '金': 'jin', '沙': 'sha',
    '摘要': 'zhaiyao', '习': 'xi', '水': 'shui', '湾': 'wan', '怀': 'huai', '庄': 'zhuang',
    '舍': 'she', '得': 'de', '品': 'pin', '味': 'wei', '智': 'zhi', '慧': 'hui', '吞': 'tun',
    '之': 'zhi', '乎': 'hu', '沱': 'tuo', '牌': 'pai', '陶': 'tao', '醉': 'zui', '自': 'zi',
    '在': 'zai', '水': 'shui', '井': 'jing', '坊': 'fang', '梅': 'mei', '兰': 'lan', '竹': 'zhu',
    '菊': 'ju', '鬼': 'gui', '妙': 'miao', '品': 'pin', '三': 'san', '两': 'liang', '内': 'nei',
    '参': 'can', '吞': 'tun', '之': 'zhi', '乎': 'hu', '张': 'zhang', '裕': 'yu', '解': 'jie',
    '百': 'bai', '纳': 'na', '醉': 'zui', '诗': 'shi', '仙': 'xian', '小': 'xiao', '味': 'wei',
    '儿': 'er', '多': 'duo', '赤': 'chi', '霞': 'xia', '珠': 'zhu', '品': 'pin', '丽': 'li',
    '珠': 'zhu', '贵': 'gui', '人': 'ren', '香': 'xiang', '长': 'chang', '城': 'cheng', '海': 'hai',
    '岸': 'an', '大': 'da', '漠': 'mo', '北': 'bei', '纬': 'wei', '37': '37', '度': 'du',
    '奔': 'ben', '富': 'fu', 'BIN': 'bin', '8': '8', '28': '28', '128': '128', '389': '389',
    '407': '407', '707': '707', '葛': 'ge', '兰': 'lan', '许': 'xu', '拉': 'la', '菲': 'fei',
    '传': 'chuan', '奇': 'qi', '波': 'bo', '尔': 'er', '多': 'duo', '传': 'chuan', '说': 'shuo',
    '波': 'bo', '亚': 'ya', '克': 'ke', '杜': 'du', '哈': 'ha', '米': 'mi', '隆': 'long',
    '木': 'mu', '桐': 'tong', '嘉': 'jia', '棣': 'di', '玛': 'ma', '歌': 'ge', '红': 'hong',
    '亭': 'ting', '拉': 'la', '图': 'tu', '堡': 'bao', '杰': 'jie', '卡': 'ka', '斯': 'si',
    '黄': 'huang', '尾': 'wei', '袋': 'dai', '鼠': 'shu', '红': 'hong', '魔': 'mo', '鬼': 'gui',
    '奥': 'ao', '兰': 'lan', '麦': 'mai', '卡': 'ka', '伦': 'lun', '格': 'ge', '兰': 'lan',
    '菲': 'fei', '迪': 'di', '杰': 'jie', '克': 'ke', '丹': 'dan', '尼': 'ni', '金': 'jin',
    '宾': 'bin', '山': 'shan', '崎': 'qi', '白': 'bai', '州': 'zhou', '响': 'xiang', '阿': 'a',
    '贝': 'bei', '乐': 'le', '加': 'jia', '维': 'wei', '林': 'lin', '泰': 'tai', '斯': 'si',
    '卡': 'ka', '克里': 'keli', '尼': 'ni', '利': 'li', '基': 'ji', '绝': 'jue', '对': 'dui',
    '伏': 'fu', '特': 'te', '加': 'jia', '灰': 'hui', '雁': 'yan', '红': 'hong', '牌': 'pai',
    '百': 'bai', '加': 'jia', '得': 'de', '摩': 'mo', '根': 'gen', '船': 'chuan', '长': 'chang',
    '添': 'tian', '加': 'jia', '利': 'li', '孟': 'meng', '买': 'mai', '蓝': 'lan', '宝': 'bao',
    '石': 'shi', '豪': 'hao', '帅': 'shuai', '金': 'jin', '标': 'biao', '培': 'pei', '恩': 'en',
    '银': 'yin', '野': 'ye', '格': 'ge', '百': 'bai', '利': 'li', '甜': 'tian', '君': 'jun',
    '度': 'du', '甘': 'gan', '露': 'lu', '马': 'ma', '利': 'li', '宝': 'bao', '帝': 'di',
    '萨': 'sa', '诺': 'nuo', '青': 'qing', '岛': 'dao', '纯': 'chun', '生': 'sheng', '奥': 'ao',
    '古': 'gu', '特': 'te', '白': 'bai', '啤': 'pi', '全': 'quan', '麦': 'mai', '皮': 'pi',
    '尔': 'er', '森': 'sen', '雪': 'xue', '花': 'hua', '匠': 'jiang', '心': 'xin', '脸': 'lian',
    '谱': 'pu', '百': 'bai', '威': 'wei', '金': 'jin', '樽': 'zun', '黑': 'hei', '金': 'jin',
    '哈': 'ha', '尔': 'er', '滨': 'bin', '冰': 'bing', '燕': 'yan', '京': 'jing', '蓝': 'lan',
    '带': 'dai', '鹅': 'e', '岛': 'dao', '拳': 'quan', '击': 'ji', '猫': 'mao', '粉': 'fen',
    '象': 'xiang', '林': 'lin', '德': 'de', '曼': 'man', '樱': 'ying', '桃': 'tao', '酿': 'niang',
    '酒': 'jiu', '狗': 'gou', '朋': 'peng', '克': 'ke', '健': 'jian', '力': 'li', '士': 'shi',
    '福': 'fu', '佳': 'jia', '玫': 'mei', '瑰': 'gui', '红': 'hong', '古': 'gu', '越': 'yue',
    '龙': 'long', '山': 'shan', '金': 'jin', '五': 'wu', '年': 'nian', '木': 'mu', '盒': 'he',
    '十': 'shi', '年': 'nian', '塔': 'ta', '牌': 'pai', '冬': 'dong', '酿': 'niang', '女': 'nv',
    '儿': 'er', '红': 'hong', '会': 'hui', '稽': 'ji', '山': 'shan', '梅': 'mei', '见': 'jian',
    '白': 'bai', '金': 'jin', '原': 'yuan', '味': 'wei', '落': 'luo', '饮': 'yin', '荔': 'li',
    '枝': 'zhi', '蜜': 'mi', '桃': 'tao', '乌': 'wu', '龙': 'long', '贝': 'bei', '瑞': 'rui',
    '甜': 'tian', '心': 'xin', '狮': 'shi', '子': 'zi', '歌': 'ge', '歌': 'ge', '柚子': 'youzi',
    '俏': 'qiao', '雅': 'ya', '三': 'san', '得': 'de', '利': 'li', '蜜': 'mi', '多': 'duo',
    '丽': 'li', '十': 'shi', '四': 'si', '代': 'dai', '龙': 'long', '月': 'yue', '日': 'ri',
    '本': 'ben', '盛': 'sheng', '大': 'da', '关': 'guan', '松': 'song', '竹': 'zhu', '梅': 'mei',
    '朝': 'chao', '香': 'xiang', '纯': 'chun', '米': 'mi', '大': 'da', '吟': 'yin', '酿': 'niang'
  };

  function getPinyin(text) {
    if (!text) return '';
    var result = '';
    for (var i = 0; i < text.length; i++) {
      var char = text[i];
      if (PINYIN_MAP[char]) {
        result += PINYIN_MAP[char];
      } else if (/[a-zA-Z]/.test(char)) {
        result += char.toLowerCase();
      } else if (/[0-9]/.test(char)) {
        result += char;
      } else {
        result += char;
      }
    }
    return result;
  }

  function getFirstLetters(text) {
    if (!text) return '';
    var result = '';
    for (var i = 0; i < text.length; i++) {
      var char = text[i];
      if (PINYIN_MAP[char]) {
        result += PINYIN_MAP[char][0];
      } else if (/[a-zA-Z]/.test(char)) {
        result += char.toLowerCase();
      } else if (/[0-9]/.test(char)) {
        result += char;
      }
    }
    return result;
  }

  function search(query, limit) {
    if (!query || query.length < 1) return [];
    limit = limit || 8;
    var expanded = expandAliases(query);
    var q = normalize(expanded);
    var qPinyin = getPinyin(query).toLowerCase();
    var qFirstLetters = getFirstLetters(query).toLowerCase();
    var results = [];
    WINES.forEach(function(wine) {
      var score = 0;
      var searchFields = [
        wine.name, wine.fullName, wine.brand,
        wine.brand + wine.name, wine.brand + ' ' + wine.name,
        expandAliases(wine.name), expandAliases(wine.brand + wine.name)
      ].concat(wine.keywords || []);
      for (var i = 0; i < searchFields.length; i++) {
        var field = normalize(searchFields[i]);
        if (!field) continue;
        if (field === q) { score += 150; break; }
        if (field.indexOf(q) === 0) { score += 60; }
        else if (field.indexOf(q) !== -1) { score += 35; }
        if (q.indexOf(field) === 0 && field.length >= 2) { score += 20; }
      }
      var winePinyin = getPinyin(wine.brand + wine.name).toLowerCase();
      var wineFirstLetters = getFirstLetters(wine.brand + wine.name).toLowerCase();
      var brandPinyin = getPinyin(wine.brand).toLowerCase();
      var brandFirstLetters = getFirstLetters(wine.brand).toLowerCase();
      if (winePinyin.indexOf(qPinyin) === 0) score += 50;
      else if (winePinyin.indexOf(qPinyin) !== -1) score += 30;
      if (wineFirstLetters.indexOf(qFirstLetters) === 0) score += 45;
      else if (wineFirstLetters.indexOf(qFirstLetters) !== -1) score += 25;
      if (brandPinyin.indexOf(qPinyin) === 0) score += 40;
      if (brandFirstLetters.indexOf(qFirstLetters) === 0) score += 35;
      (wine.keywords || []).forEach(function(kw) {
        var k = normalize(kw);
        if (k && k.length >= 2) {
          if (q.indexOf(k) !== -1) score += 40;
          if (k.indexOf(q) === 0) score += 30;
          if (k.indexOf(q) !== -1 && q.length >= 2) score += 20;
        }
      });
      var matchScore = calculateMatchScore(wine, query, q, false);
      score = Math.max(score, matchScore);
      if (score > 0) {
        results.push({ wine: wine, score: score });
      }
    });
    results.sort(function(a, b) { return b.score - a.score; });
    return results.slice(0, limit).map(function(r) { return r.wine; });
  }

  function matchFromUserInput(query) {
    if (!query || query.length < 1) return null;
    var expanded = expandAliases(query);
    var normalized = normalize(expanded);
    var allScores = [];
    WINES.forEach(function(wine) {
      var score = calculateMatchScore(wine, expanded, normalized, true);
      if (score >= 30) {
        allScores.push({ wine: wine, score: score });
      }
    });
    allScores.sort(function(a, b) { return b.score - a.score; });
    return allScores.length > 0 ? allScores[0].wine : null;
  }

  function matchMultipleFromUserInput(query, limit) {
    if (!query || query.length < 1) return [];
    limit = limit || 8;
    var expanded = expandAliases(query);
    var normalized = normalize(expanded);
    var allScores = [];
    WINES.forEach(function(wine) {
      var score = calculateMatchScore(wine, expanded, normalized, true);
      if (score >= 20) {
        allScores.push({ wine: wine, score: score });
      }
    });
    allScores.sort(function(a, b) { return b.score - a.score; });
    return allScores.slice(0, limit).map(function(r) { return r.wine; });
  }

  function matchFromOCRText(text) {
    if (!text) return null;
    var expanded = expandAliases(text);
    var normalized = normalize(expanded);
    var allScores = [];
    WINES.forEach(function(wine) {
      var score = calculateMatchScore(wine, expanded, normalized, false);
      if (score >= 50) {
        allScores.push({ wine: wine, score: score });
      }
    });
    allScores.sort(function(a, b) { return b.score - a.score; });
    return allScores.length > 0 ? allScores[0].wine : null;
  }

  function matchMultipleFromOCRText(text, limit) {
    if (!text) return [];
    limit = limit || 5;
    var expanded = expandAliases(text);
    var normalized = normalize(expanded);
    var allScores = [];
    WINES.forEach(function(wine) {
      var score = calculateMatchScore(wine, expanded, normalized, false);
      if (score >= 30) {
        allScores.push({ wine: wine, score: score });
      }
    });
    allScores.sort(function(a, b) { return b.score - a.score; });
    return allScores.slice(0, limit).map(function(r) { return r.wine; });
  }

  function getById(index) {
    return WINES[index] || null;
  }

  function getAll() {
    return WINES.slice();
  }

  function getAllBrands() {
    var brands = {};
    WINES.forEach(function(w) { brands[w.brand] = true; });
    return Object.keys(brands);
  }

  function getBrandColor(brand) {
    var w = WINES.find(function(w) { return w.brand === brand; });
    return w ? w.color : '#8B6914';
  }

  function generateImageUrl(wine) {
    var prompt = '';
    var enBrand = getEnglishName(wine);
    var enName = wine.fullName.replace(/[^\x00-\x7F]/g, ' ').trim().replace(/\s+/g, ' ');
    if (!enName || enName.length < 2) enName = enBrand;

    var keywords = (wine.keywords || []).join(' ').toLowerCase();
    var isWhiskey = keywords.indexOf('whiskey') !== -1 || keywords.indexOf('whisky') !== -1 ||
                    keywords.indexOf('威士忌') !== -1 || keywords.indexOf('cognac') !== -1 ||
                    keywords.indexOf('干邑') !== -1 || keywords.indexOf('brandy') !== -1 ||
                    keywords.indexOf('白兰地') !== -1 || keywords.indexOf('xo') !== -1 ||
                    keywords.indexOf('vsop') !== -1 || wine.fullName.toLowerCase().indexOf('whisk') !== -1;
    var isChampagne = keywords.indexOf('champagne') !== -1 || keywords.indexOf('香槟') !== -1;
    var isVodka = keywords.indexOf('vodka') !== -1 || keywords.indexOf('伏特加') !== -1;
    var isGin = keywords.indexOf('gin') !== -1 && keywords.indexOf('ginger') === -1 || keywords.indexOf('金酒') !== -1;
    var isRum = keywords.indexOf('rum') !== -1 || keywords.indexOf('朗姆') !== -1;
    var isTequila = keywords.indexOf('tequila') !== -1 || keywords.indexOf('龙舌兰') !== -1;
    var isLiqueur = keywords.indexOf('liqueur') !== -1 || keywords.indexOf('利口酒') !== -1 || keywords.indexOf('力娇酒') !== -1;
    var isBeer = wine.type === '啤酒' || keywords.indexOf('beer') !== -1 || keywords.indexOf('啤酒') !== -1;

    if (wine.type === '葡萄酒' || isChampagne) {
      if (isChampagne) {
        prompt = 'professional e-commerce product photo of a luxury champagne bottle, ' + enBrand + ' champagne, sparkling wine bottle with gold foil, clean pure white background, studio lighting, high resolution, sharp focus, commercial product photography, no text, no watermark';
      } else {
        prompt = 'professional e-commerce product photo of a premium red wine bottle, ' + enBrand + ' wine, dark glass bottle with elegant label, clean pure white background, studio lighting, high resolution, sharp focus, commercial product photography, no text, no watermark';
      }
    } else if (isBeer) {
      prompt = 'professional e-commerce product photo of a cold beer bottle, ' + enBrand + ' beer, condensation droplets on glass, refreshing cold beverage, clean pure white background, studio lighting, high resolution, commercial product photography, no text, no watermark';
    } else if (wine.type === '洋酒' || isWhiskey || isVodka || isGin || isRum || isTequila || isLiqueur) {
      if (isWhiskey) {
        prompt = 'professional e-commerce product photo of a premium whiskey bottle, ' + enBrand + ' whisky, luxury spirits bottle, clean pure white background, studio lighting, high resolution, sharp detail, commercial product photography, no text, no watermark';
      } else if (isVodka) {
        prompt = 'professional e-commerce product photo of a premium vodka bottle, ' + enBrand + ' vodka, clear glass bottle design, clean pure white background, studio lighting, high resolution, commercial product photography, no text, no watermark';
      } else if (isGin) {
        prompt = 'professional e-commerce product photo of a premium gin bottle, ' + enBrand + ' gin, elegant spirits bottle, clean pure white background, studio lighting, high resolution, commercial product photography, no text, no watermark';
      } else if (isTequila) {
        prompt = 'professional e-commerce product photo of a premium tequila bottle, ' + enBrand + ' tequila, luxury agave spirits, clean pure white background, studio lighting, high resolution, commercial product photography, no text, no watermark';
      } else if (isLiqueur) {
        prompt = 'professional e-commerce product photo of a premium liqueur bottle, ' + enBrand + ' liqueur, elegant bottle design, clean pure white background, studio lighting, high resolution, commercial product photography, no text, no watermark';
      } else if (isRum) {
        prompt = 'professional e-commerce product photo of a premium rum bottle, ' + enBrand + ' rum, Caribbean spirits, clean pure white background, studio lighting, high resolution, commercial product photography, no text, no watermark';
      } else {
        prompt = 'professional e-commerce product photo of a premium liquor bottle, ' + enBrand + ' ' + enName + ', luxury spirits, clean pure white background, studio lighting, high resolution, sharp detail, commercial product photography, no text, no watermark';
      }
    } else if (wine.type === '黄酒') {
      prompt = 'professional e-commerce product photo of a traditional Chinese rice wine bottle, ' + enBrand + ' huangjiu, Shaoxing wine ceramic bottle, elegant packaging, clean pure white background, studio lighting, high resolution, commercial product photography, no text, no watermark';
    } else if (wine.type === '清酒') {
      prompt = 'professional e-commerce product photo of a premium Japanese sake bottle, ' + enBrand + ' sake, elegant Japanese rice wine, clean pure white background, studio lighting, high resolution, commercial product photography, no text, no watermark';
    } else {
      prompt = 'professional e-commerce product photo of a premium Chinese baijiu bottle, luxury Chinese liquor, ' + enBrand + ' baijiu, elegant glass bottle with gift box quality, clean pure white background, studio lighting, high detail, sharp focus, commercial product photography, no text, no watermark';
    }

    return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent(prompt) + '&image_size=square_hd';
  }

  function generateImageUrls(wine) {
    var urls = [];
    var mainUrl = generateImageUrl(wine);
    urls.push(mainUrl);
    return urls;
  }

  function generateFallbackImage(wine) {
    var color = wine.color || '#8B6914';
    var initial = (wine.brand ? wine.brand.slice(0, 1) : '酒');

    function isColorLight(hex) {
      var c = hex.replace('#', '');
      var r = parseInt(c.substr(0,2), 16);
      var g = parseInt(c.substr(2,2), 16);
      var b = parseInt(c.substr(4,2), 16);
      var brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 160;
    }

    var isLightColor = isColorLight(color);
    var labelTextColor = color;

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">' +
      '<defs>' +
        '<linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
          '<stop offset="0%" style="stop-color:%23faf7f2"/><stop offset="100%" style="stop-color:%23f0ebe0"/>' +
        '</linearGradient>' +
        '<linearGradient id="bottleGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" style="stop-color:' + color + ';stop-opacity:1"/>' +
          '<stop offset="25%" style="stop-color:' + color + ';stop-opacity:0.85"/>' +
          '<stop offset="50%" style="stop-color:' + color + ';stop-opacity:0.75"/>' +
          '<stop offset="75%" style="stop-color:' + color + ';stop-opacity:0.85"/>' +
          '<stop offset="100%" style="stop-color:' + color + ';stop-opacity:1"/>' +
        '</linearGradient>' +
        '<linearGradient id="capGrad" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" style="stop-color:%23d4af37"/><stop offset="50%" style="stop-color:%23f4e4bc"/><stop offset="100%" style="stop-color:%23d4af37"/>' +
        '</linearGradient>' +
        '<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">' +
          '<feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="%23000" flood-opacity="0.12"/>' +
        '</filter>' +
        '<filter id="labelShadow" x="-10%" y="-10%" width="120%" height="120%">' +
          '<feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="%23000" flood-opacity="0.1"/>' +
        '</filter>' +
      '</defs>' +
      '<rect width="500" height="500" fill="url(%23bgGrad)"/>' +
      '<ellipse cx="250" cy="440" rx="90" ry="12" fill="%23000" opacity="0.06"/>' +
      '<g filter="url(%23shadow)">' +
        '<rect x="228" y="45" width="44" height="45" rx="3" fill="url(%23capGrad)"/>' +
        '<rect x="225" y="88" width="50" height="8" rx="2" fill="%23b8962e"/>' +
        '<rect x="218" y="94" width="64" height="28" rx="4" fill="url(%23bottleGrad)"/>' +
        '<path d="M205,122 Q205,128 210,140 L210,385 Q210,410 235,418 L265,418 Q290,410 290,385 L290,140 Q295,128 295,122 Z" fill="url(%23bottleGrad)"/>' +
        '<ellipse cx="220" cy="250" rx="8" ry="60" fill="%23fff" opacity="0.15"/>' +
        '<rect x="212" y="200" width="76" height="155" rx="5" fill="%23fffdf8" filter="url(%23labelShadow)"/>' +
        '<rect x="220" y="215" width="60" height="3" rx="1" fill="' + color + '" opacity="0.3"/>' +
        '<text x="250" y="270" text-anchor="middle" fill="' + labelTextColor + '" font-size="48" font-weight="bold" font-family="Georgia, serif">' + initial + '</text>' +
        '<rect x="225" y="285" width="50" height="2" rx="1" fill="' + color + '" opacity="0.4"/>' +
        '<text x="250" y="308" text-anchor="middle" fill="' + labelTextColor + '" font-size="12" font-weight="600" font-family="-apple-system, BlinkMacSystemFont, sans-serif">' + (wine.brand || '').substring(0, 8) + '</text>' +
        '<text x="250" y="326" text-anchor="middle" fill="%23666" font-size="10" font-family="-apple-system, BlinkMacSystemFont, sans-serif">' + (wine.name || '').substring(0, 10) + '</text>' +
        '<rect x="225" y="335" width="50" height="1" rx="0.5" fill="' + color + '" opacity="0.2"/>' +
        '<text x="250" y="350" text-anchor="middle" fill="%23999" font-size="9" font-family="-apple-system, BlinkMacSystemFont, sans-serif">' + wine.degree + '° · ' + wine.capacity + 'mL</text>' +
      '</g>' +
      '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  var WINE_CATEGORIES = {
    '白酒': {
      '酱香型': null, '浓香型': null, '清香型': null, '米香型': null,
      '凤香型': null, '豉香型': null, '芝麻香型': null, '特香型': null,
      '兼香型': null, '药香型': null, '老白干香型': null, '馥郁香型': null
    },
    '洋酒': {
      '威士忌': {
        '单一麦芽': null, '单一谷物': null, '调和威士忌': null, '调和麦芽': null,
        '波本': null, '黑麦威士忌': null, '田纳西威士忌': null, '日本威士忌': null
      },
      '白兰地': {
        '干邑': null, '雅文邑': null, '葡萄白兰地': null, '苹果白兰地': null,
        '樱桃白兰地': null, '水果白兰地': null
      },
      '干邑等级': { 'VS': null, 'VSOP': null, 'XO': null, 'XXO': null },
      '伏特加': {
        '小麦伏特加': null, '黑麦伏特加': null, '马铃薯伏特加': null,
        '玉米伏特加': null, '风味伏特加': null
      },
      '朗姆酒': {
        '白朗姆': null, '金朗姆': null, '黑朗姆': null, '香料朗姆': null,
        '农业朗姆': null, '超陈年朗姆': null
      },
      '金酒': {
        '伦敦干金酒': null, '普利茅斯金酒': null, '老汤姆金酒': null,
        '新西方金酒': null, '黑刺李金酒': null, '海军强度金酒': null
      },
      '龙舌兰': {
        'Blanco/Silver': null, 'Joven/Gold': null, 'Reposado': null,
        'Añejo': null, 'Extra Añejo': null, 'Mezcal': null
      }
    },
    '啤酒': {
      '拉格': null, '艾尔': null, 'IPA': null, '世涛': null,
      '小麦啤': null, '波特': null, '酸啤': null
    },
    '葡萄酒': {
      '红葡萄酒': null, '白葡萄酒': null, '桃红葡萄酒': null,
      '起泡葡萄酒': null, '冰酒': null, '餐酒': null
    },
    '其他': {
      '清酒': null, '黄酒': null, '果酒': null, '利口酒': null, '鸡尾酒': null
    }
  };

  function getWineCategories() { return WINE_CATEGORIES; }

  function getYearFieldHint(category) {
    switch(category) {
      case '白酒': return { label: '陈酿年数', placeholder: '如：15（酒标上没标就留空）' };
      case '威士忌': return { label: '陈酿年数', placeholder: '如：12（酒标上没标就留空）' };
      case '白兰地': return { label: '陈酿年数', placeholder: '选了干邑等级可留空' };
      case '葡萄酒': return { label: '葡萄采摘年份', placeholder: '如：2020（四位数年份）' };
      default: return { label: '年份/陈酿', placeholder: '一般没有标注可留空' };
    }
  }

  return {
    search: search,
    matchFromOCRText: matchFromOCRText,
    matchMultipleFromOCRText: matchMultipleFromOCRText,
    matchFromUserInput: matchFromUserInput,
    matchMultipleFromUserInput: matchMultipleFromUserInput,
    getById: getById,
    getAll: getAll,
    getAllBrands: getAllBrands,
    getBrandColor: getBrandColor,
    generateImageUrl: generateImageUrl,
    generateImageUrls: generateImageUrls,
    generateFallbackImage: generateFallbackImage,
    getWineCategories: getWineCategories,
    getYearFieldHint: getYearFieldHint,
    WINES: WINES
  };
})();

if (typeof window !== 'undefined') { window.WineDB = WineDB; }
