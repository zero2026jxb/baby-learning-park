// ===== 数据文件 =====

// 古诗数据（含拼音）
const POEMS = [
  {
    title: "静夜思",
    author: "李白",
    lines: [
      { chars: [{c:"床",p:"chuáng"},{c:"前",p:"qián"},{c:"明",p:"míng"},{c:"月",p:"yuè"},{c:"光",p:"guāng"}], punc: "，" },
      { chars: [{c:"疑",p:"yí"},{c:"是",p:"shì"},{c:"地",p:"dì"},{c:"上",p:"shàng"},{c:"霜",p:"shuāng"}], punc: "。" },
      { chars: [{c:"举",p:"jǔ"},{c:"头",p:"tóu"},{c:"望",p:"wàng"},{c:"明",p:"míng"},{c:"月",p:"yuè"}], punc: "，" },
      { chars: [{c:"低",p:"dī"},{c:"头",p:"tóu"},{c:"思",p:"sī"},{c:"故",p:"gù"},{c:"乡",p:"xiāng"}], punc: "。" }
    ]
  },
  {
    title: "咏鹅",
    author: "骆宾王",
    lines: [
      { chars: [{c:"鹅",p:"é"},{c:"鹅",p:"é"},{c:"鹅",p:"é"}], punc: "，" },
      { chars: [{c:"曲",p:"qū"},{c:"项",p:"xiàng"},{c:"向",p:"xiàng"},{c:"天",p:"tiān"},{c:"歌",p:"gē"}], punc: "。" },
      { chars: [{c:"白",p:"bái"},{c:"毛",p:"máo"},{c:"浮",p:"fú"},{c:"绿",p:"lǜ"},{c:"水",p:"shuǐ"}], punc: "，" },
      { chars: [{c:"红",p:"hóng"},{c:"掌",p:"zhǎng"},{c:"拨",p:"bō"},{c:"清",p:"qīng"},{c:"波",p:"bō"}], punc: "。" }
    ]
  },
  {
    title: "春晓",
    author: "孟浩然",
    lines: [
      { chars: [{c:"春",p:"chūn"},{c:"眠",p:"mián"},{c:"不",p:"bù"},{c:"觉",p:"jué"},{c:"晓",p:"xiǎo"}], punc: "，" },
      { chars: [{c:"处",p:"chù"},{c:"处",p:"chù"},{c:"闻",p:"wén"},{c:"啼",p:"tí"},{c:"鸟",p:"niǎo"}], punc: "。" },
      { chars: [{c:"夜",p:"yè"},{c:"来",p:"lái"},{c:"风",p:"fēng"},{c:"雨",p:"yǔ"},{c:"声",p:"shēng"}], punc: "，" },
      { chars: [{c:"花",p:"huā"},{c:"落",p:"luò"},{c:"知",p:"zhī"},{c:"多",p:"duō"},{c:"少",p:"shǎo"}], punc: "。" }
    ]
  },
  {
    title: "登鹳雀楼",
    author: "王之涣",
    lines: [
      { chars: [{c:"白",p:"bái"},{c:"日",p:"rì"},{c:"依",p:"yī"},{c:"山",p:"shān"},{c:"尽",p:"jìn"}], punc: "，" },
      { chars: [{c:"黄",p:"huáng"},{c:"河",p:"hé"},{c:"入",p:"rù"},{c:"海",p:"hǎi"},{c:"流",p:"liú"}], punc: "。" },
      { chars: [{c:"欲",p:"yù"},{c:"穷",p:"qióng"},{c:"千",p:"qiān"},{c:"里",p:"lǐ"},{c:"目",p:"mù"}], punc: "，" },
      { chars: [{c:"更",p:"gèng"},{c:"上",p:"shàng"},{c:"一",p:"yī"},{c:"层",p:"céng"},{c:"楼",p:"lóu"}], punc: "。" }
    ]
  },
  {
    title: "悯农",
    author: "李绅",
    lines: [
      { chars: [{c:"锄",p:"chú"},{c:"禾",p:"hé"},{c:"日",p:"rì"},{c:"当",p:"dāng"},{c:"午",p:"wǔ"}], punc: "，" },
      { chars: [{c:"汗",p:"hàn"},{c:"滴",p:"dī"},{c:"禾",p:"hé"},{c:"下",p:"xià"},{c:"土",p:"tǔ"}], punc: "。" },
      { chars: [{c:"谁",p:"shuí"},{c:"知",p:"zhī"},{c:"盘",p:"pán"},{c:"中",p:"zhōng"},{c:"餐",p:"cān"}], punc: "，" },
      { chars: [{c:"粒",p:"lì"},{c:"粒",p:"lì"},{c:"皆",p:"jiē"},{c:"辛",p:"xīn"},{c:"苦",p:"kǔ"}], punc: "。" }
    ]
  },
  {
    title: "江南",
    author: "汉乐府",
    lines: [
      { chars: [{c:"江",p:"jiāng"},{c:"南",p:"nán"},{c:"可",p:"kě"},{c:"采",p:"cǎi"},{c:"莲",p:"lián"}], punc: "，" },
      { chars: [{c:"莲",p:"lián"},{c:"叶",p:"yè"},{c:"何",p:"hé"},{c:"田",p:"tián"},{c:"田",p:"tián"}], punc: "。" },
      { chars: [{c:"鱼",p:"yú"},{c:"戏",p:"xì"},{c:"莲",p:"lián"},{c:"叶",p:"yè"},{c:"间",p:"jiān"}], punc: "。" },
      { chars: [{c:"鱼",p:"yú"},{c:"戏",p:"xì"},{c:"莲",p:"lián"},{c:"叶",p:"yè"},{c:"东",p:"dōng"}], punc: "。" }
    ]
  },
  {
    title: "小池",
    author: "杨万里",
    lines: [
      { chars: [{c:"泉",p:"quán"},{c:"眼",p:"yǎn"},{c:"无",p:"wú"},{c:"声",p:"shēng"},{c:"惜",p:"xī"},{c:"细",p:"xì"},{c:"流",p:"liú"}], punc: "，" },
      { chars: [{c:"树",p:"shù"},{c:"阴",p:"yīn"},{c:"照",p:"zhào"},{c:"水",p:"shuǐ"},{c:"爱",p:"ài"},{c:"晴",p:"qíng"},{c:"柔",p:"róu"}], punc: "。" },
      { chars: [{c:"小",p:"xiǎo"},{c:"荷",p:"hé"},{c:"才",p:"cái"},{c:"露",p:"lù"},{c:"尖",p:"jiān"},{c:"尖",p:"jiān"},{c:"角",p:"jiǎo"}], punc: "，" },
      { chars: [{c:"早",p:"zǎo"},{c:"有",p:"yǒu"},{c:"蜻",p:"qīng"},{c:"蜓",p:"tíng"},{c:"立",p:"lì"},{c:"上",p:"shàng"},{c:"头",p:"tóu"}], punc: "。" }
    ]
  },
  {
    title: "望庐山瀑布",
    author: "李白",
    lines: [
      { chars: [{c:"日",p:"rì"},{c:"照",p:"zhào"},{c:"香",p:"xiāng"},{c:"炉",p:"lú"},{c:"生",p:"shēng"},{c:"紫",p:"zǐ"},{c:"烟",p:"yān"}], punc: "，" },
      { chars: [{c:"遥",p:"yáo"},{c:"看",p:"kàn"},{c:"瀑",p:"pù"},{c:"布",p:"bù"},{c:"挂",p:"guà"},{c:"前",p:"qián"},{c:"川",p:"chuān"}], punc: "。" },
      { chars: [{c:"飞",p:"fēi"},{c:"流",p:"liú"},{c:"直",p:"zhí"},{c:"下",p:"xià"},{c:"三",p:"sān"},{c:"千",p:"qiān"},{c:"尺",p:"chǐ"}], punc: "，" },
      { chars: [{c:"疑",p:"yí"},{c:"是",p:"shì"},{c:"银",p:"yín"},{c:"河",p:"hé"},{c:"落",p:"luò"},{c:"九",p:"jiǔ"},{c:"天",p:"tiān"}], punc: "。" }
    ]
  }
];

// 数字的读音
const NUMBER_WORDS = ["零","一","二","三","四","五","六","七","八","九","十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十"];

// 逻辑挑战题库
const LOGIC_QUESTIONS = [
  // 找规律
  {
    type: "pattern",
    question: "找规律：接下来是什么？",
    pattern: ["🔴","🔵","🔴","🔵","🔴"],
    options: ["🔴","🔵","🟢","🟡"],
    answer: 1,
    explanation: "红蓝红蓝红，接下来是蓝！"
  },
  {
    type: "pattern",
    question: "找规律：接下来是什么？",
    pattern: ["🍎","🍌","🍎","🍌","🍎"],
    options: ["🍎","🍌","🍇","🍓"],
    answer: 1,
    explanation: "苹果香蕉苹果香蕉，接下来是香蕉！"
  },
  {
    type: "pattern",
    question: "找规律：接下来是什么？",
    pattern: ["1","2","3","4","5"],
    options: ["6","7","8","9"],
    answer: 0,
    explanation: "1、2、3、4、5，接下来是6！"
  },
  {
    type: "pattern",
    question: "找规律：接下来是什么？",
    pattern: ["⭐","⭐","⭐","⭐⭐","⭐⭐","⭐⭐"],
    options: ["⭐⭐⭐","⭐⭐","⭐","🟡"],
    answer: 0,
    explanation: "星星越来越多，接下来是三颗星！"
  },
  {
    type: "pattern",
    question: "找规律：接下来是什么？",
    pattern: ["🐶","🐱","🐶","🐱","🐶"],
    options: ["🐱","🐶","🐰","🐷"],
    answer: 0,
    explanation: "狗狗猫咪狗狗猫咪，接下来是猫咪！"
  },

  // 图形配对
  {
    type: "shape",
    question: "哪个图形和第一组一样？",
    shapes: ["🔺","🔴","🔺","🔴"],
    options: ["🔺","🔴","🟩","⭐"],
    answer: 0,
    explanation: "三角形圆形三角形圆形，接下来是三角形！"
  },
  {
    type: "shape",
    question: "哪个图形最多？",
    shapes: ["🟦","🟦","🟦","🟨","🟨"],
    options: ["🟦","🟨","🟥","🟩"],
    answer: 0,
    explanation: "蓝色方块有3个，最多！"
  },
  {
    type: "shape",
    question: "找出不一样的那个？",
    shapes: ["🟠","🟠","🟢","🟠","🟠"],
    options: ["🟢","🟠","🔵","🟡"],
    answer: 0,
    explanation: "绿色的和大家不一样！"
  },
  {
    type: "shape",
    question: "哪个和第一个一样大？",
    shapes: ["⭐","⭐⭐","⭐⭐⭐"],
    options: ["⭐⭐","⭐","⭐⭐⭐","⭐⭐⭐⭐"],
    answer: 0,
    explanation: "一样的是一颗星！"
  },
  {
    type: "shape",
    question: "哪组和上面的一样？",
    shapes: ["🔺","🔺","🔴"],
    options: ["🔺","🔺","🔴","🔺","🔵","🔵"],
    answer: 0,
    explanation: "两个三角形一个圆形！"
  },

  // 排序题
  {
    type: "sort",
    question: "从小到大排列：1、3、2，哪个是对的？",
    options: ["1、2、3","3、2、1","2、1、3","1、3、2"],
    answer: 0,
    explanation: "1最小，然后是2，最后是3！"
  },
  {
    type: "sort",
    question: "谁最大？",
    options: ["大象🐘","小老鼠🐭","小猫🐱","小狗🐶"],
    answer: 0,
    explanation: "大象是最大的动物！"
  },
  {
    type: "sort",
    question: "谁跑得最快？",
    options: ["乌龟🐢","兔子🐰","蜗牛🐌","毛毛虫🐛"],
    answer: 1,
    explanation: "兔子蹦蹦跳跳跑得最快！"
  },
  {
    type: "sort",
    question: "谁最高？",
    options: ["长颈鹿🦒","小兔子🐰","小鸭子🦆","小猪🐷"],
    answer: 0,
    explanation: "长颈鹿的脖子最长了！"
  },
  {
    type: "sort",
    question: "谁最小？",
    options: ["蚂蚁🐜","大象🐘","老虎🐯","狮子🦁"],
    answer: 0,
    explanation: "小蚂蚁是小小的！"
  }
];

// 关卡数据（闯关综合题库）
const LEVELS = [
  {
    name: "第1关",
    emoji: "🌱",
    questions: [
      { type: "letter", q: "哪个字母是 A？", options: ["A", "B", "C", "D"], answer: 0, explain: "A 就是 A！🔤" },
      { type: "letter", q: "哪个字母是 B？", options: ["E", "B", "F", "G"], answer: 1, explain: "B 就是 B！🔤" },
      { type: "number", q: "1 + 1 = ?", options: ["2", "3", "4", "1"], answer: 0, explain: "1+1=2！" },
      { type: "number", q: "这里有几个苹果？🍎🍎🍎", options: ["2", "3", "4", "5"], answer: 1, explain: "有3个苹果！" },
      { type: "logic", q: "哪个是红色的？", options: ["🔴","🟢","🔵","🟡"], answer: 0, explain: "红色是这个！" },
      { type: "letter", q: "哪个字母是 C？", options: ["A", "C", "B", "D"], answer: 1, explain: "C 就是 C！" },
      { type: "number", q: "哪个数字最大？", options: ["1", "5", "3", "2"], answer: 1, explain: "5最大！" },
      { type: "logic", q: "哪个是圆形？", options: ["🔺","🟦","🟠","⭐"], answer: 2, explain: "圆形是这个！" },
      { type: "letter", q: "哪个字母是 D？", options: ["B", "D", "F", "G"], answer: 1, explain: "D 就是 D！" },
      { type: "number", q: "2 + 2 = ?", options: ["3", "4", "5", "6"], answer: 1, explain: "2+2=4！" }
    ]
  },
  {
    name: "第2关",
    emoji: "🌻",
    questions: [
      { type: "letter", q: "A 的小写是哪个？", options: ["a", "b", "c", "d"], answer: 0, explain: "A 的小写是 a！" },
      { type: "number", q: "3 + 1 = ?", options: ["3", "5", "4", "6"], answer: 2, explain: "3+1=4！" },
      { type: "letter", q: "哪个字母是 E？", options: ["E", "F", "G", "H"], answer: 0, explain: "E 就是 E！" },
      { type: "logic", q: "哪个是三角形？", options: ["🟠","🔺","🟦","⭐"], answer: 1, explain: "三角形是这个！" },
      { type: "number", q: "5 - 2 = ?", options: ["2", "3", "4", "5"], answer: 1, explain: "5-2=3！" },
      { type: "letter", q: "B 的小写是哪个？", options: ["a", "b", "c", "d"], answer: 1, explain: "B 的小写是 b！" },
      { type: "logic", q: "哪个是黄色的？", options: ["🔴","🟢","🔵","🟡"], answer: 3, explain: "黄色是这个！" },
      { type: "number", q: "4 + 1 = ?", options: ["4", "6", "5", "7"], answer: 2, explain: "4+1=5！" },
      { type: "letter", q: "哪个字母是 F？", options: ["E", "F", "D", "G"], answer: 1, explain: "F 就是 F！" },
      { type: "logic", q: "1、2、3，接下来是？", options: ["4", "5", "6", "2"], answer: 0, explain: "123456，接下来是4！" }
    ]
  },
  {
    name: "第3关",
    emoji: "🌳",
    questions: [
      { type: "number", q: "2 + 3 = ?", options: ["4", "5", "6", "3"], answer: 1, explain: "2+3=5！" },
      { type: "letter", q: "C 的小写是哪个？", options: ["c", "d", "e", "f"], answer: 0, explain: "C 的小写是 c！" },
      { type: "logic", q: "哪个是蓝色？", options: ["🟡","🔴","🔵","🟢"], answer: 2, explain: "蓝色是这个！" },
      { type: "number", q: "6 - 3 = ?", options: ["2", "3", "4", "5"], answer: 1, explain: "6-3=3！" },
      { type: "letter", q: "哪个字母是 G？", options: ["G", "H", "F", "I"], answer: 0, explain: "G 就是 G！" },
      { type: "number", q: "4 + 4 = ?", options: ["6", "7", "8", "9"], answer: 2, explain: "4+4=8！" },
      { type: "logic", q: "哪个是方形？", options: ["🔺","🔵","🟠","⭐"], answer: 1, explain: "方形是这个！" },
      { type: "letter", q: "D 的小写是哪个？", options: ["c", "d", "e", "b"], answer: 1, explain: "D 的小写是 d！" },
      { type: "number", q: "7 - 2 = ?", options: ["4", "5", "6", "7"], answer: 1, explain: "7-2=5！" },
      { type: "logic", q: "哪个是绿色？", options: ["🟡","🔵","🟢","🔴"], answer: 2, explain: "绿色是这个！" }
    ]
  },
  {
    name: "第4关",
    emoji: "🌼",
    questions: [
      { type: "letter", q: "哪个字母是 H？", options: ["G", "H", "I", "J"], answer: 1, explain: "H 就是 H！" },
      { type: "number", q: "3 + 5 = ?", options: ["7", "8", "9", "6"], answer: 1, explain: "3+5=8！" },
      { type: "logic", q: "哪个最大？", options: ["2","8","5","3"], answer: 1, explain: "8最大！" },
      { type: "number", q: "8 - 3 = ?", options: ["4", "5", "6", "7"], answer: 1, explain: "8-3=5！" },
      { type: "letter", q: "E 的小写是哪个？", options: ["e", "f", "g", "h"], answer: 0, explain: "E 的小写是 e！" },
      { type: "number", q: "5 + 5 = ?", options: ["8", "9", "10", "11"], answer: 2, explain: "5+5=10！" },
      { type: "logic", q: "哪个最矮？", options: ["长颈鹿🦒","大象🐘","兔子🐰","狮子🦁"], answer: 2, explain: "兔子最矮！" },
      { type: "letter", q: "哪个字母是 I？", options: ["H", "I", "J", "K"], answer: 1, explain: "I 就是 I！" },
      { type: "number", q: "6 + 3 = ?", options: ["8", "9", "10", "7"], answer: 1, explain: "6+3=9！" },
      { type: "logic", q: "哪个颜色最多？🟡🟡🟡🟡🔵", options: ["🟡","🔵","🟢","🔴"], answer: 0, explain: "黄色有4个，最多！" }
    ]
  },
  {
    name: "第5关",
    emoji: "🏆",
    questions: [
      { type: "number", q: "4 + 5 = ?", options: ["8", "9", "10", "11"], answer: 1, explain: "4+5=9！" },
      { type: "letter", q: "F 的小写是哪个？", options: ["e", "f", "g", "h"], answer: 1, explain: "F 的小写是 f！" },
      { type: "logic", q: "1、3、5，接下来是？", options: ["6", "7", "8", "9"], answer: 1, explain: "1357，接下来是7！" },
      { type: "number", q: "9 - 4 = ?", options: ["4", "5", "6", "7"], answer: 1, explain: "9-4=5！" },
      { type: "letter", q: "哪个字母是 J？", options: ["I", "J", "K", "L"], answer: 1, explain: "J 就是 J！" },
      { type: "number", q: "7 + 2 = ?", options: ["8", "9", "10", "11"], answer: 1, explain: "7+2=9！" },
      { type: "logic", q: "哪个最少？🍎🍎🍎🍌🍌", options: ["🍎","🍌","🍇","🍓"], answer: 1, explain: "香蕉只有2个，最少！" },
      { type: "letter", q: "G 的小写是哪个？", options: ["f", "g", "h", "i"], answer: 1, explain: "G 的小写是 g！" },
      { type: "number", q: "10 - 5 = ?", options: ["4", "5", "6", "7"], answer: 1, explain: "10-5=5！" },
      { type: "logic", q: "哪个是正方形？", options: ["🔺","🔴","🟩","⭐"], answer: 2, explain: "正方形是这个！" }
    ]
  }
];

// 成就徽章
const BADGES = [
  { id: "letter-star", name: "字母小达人", desc: "认识10个字母", icon: "🔤" },
  { id: "number-star", name: "算术小能手", desc: "答对10道算术题", icon: "🔢" },
  { id: "poem-star", name: "小诗人", desc: "读过3首诗", icon: "📜" },
  { id: "logic-star", name: "聪明小侦探", desc: "完成5道逻辑题", icon: "🧩" },
  { id: "level1", name: "初入乐园", desc: "通过第1关", icon: "🌱" },
  { id: "level3", name: "闯关小英雄", desc: "通过第3关", icon: "🌳" },
  { id: "level5", name: "闯关大冒险家", desc: "通关所有关卡", icon: "🏆" },
  { id: "star100", name: "星星收藏家", desc: "获得100颗星", icon: "⭐" }
];
