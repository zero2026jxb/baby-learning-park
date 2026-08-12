// ===== 语音功能模块 =====
// 优先使用预生成的音频文件（任何浏览器都能出声，兼容手机自带浏览器/微信）
// 当音频文件加载失败时，回退到 Web Speech API

const Speech = (() => {
  let speaking = false;
  let currentAudio = null;

  // ---------- 预生成音频播放 ----------
  function playAudio(src, fallbackFn) {
    stop(); // 先停止上一次朗读
    const audio = new Audio(src);
    currentAudio = audio;

    return new Promise((resolve) => {
      let done = false;
      const finish = (ok) => { if (!done) { done = true; speaking = false; resolve(ok); } };

      audio.onplay = () => { speaking = true; };
      audio.onended = () => finish(true);
      audio.onerror = () => {
        // 音频加载失败，回退到 TTS
        finish(false);
        if (fallbackFn) fallbackFn();
      };
      audio.play().catch(() => {
        finish(false);
        if (fallbackFn) fallbackFn();
      });
    });
  }

  // ---------- Web Speech API 兜底 ----------
  let synth = null;
  let voice = null;

  function loadVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    if (!voices || voices.length === 0) return;
    voice = voices.find(v => v.lang === 'zh-CN' && /female|woman|xiaoxiao|yaoyao|tingting|meijia|huihui/i.test(v.name))
         || voices.find(v => v.lang === 'zh-CN')
         || voices.find(v => v.lang.startsWith('zh'))
         || null;
  }

  function initTTS() {
    if (!('speechSynthesis' in window)) return false;
    synth = window.speechSynthesis;
    loadVoice();
    window.speechSynthesis.onvoiceschanged = () => { loadVoice(); };
    setTimeout(loadVoice, 300);
    setTimeout(loadVoice, 1000);
    return true;
  }

  function speakTTS(text, options = {}) {
    if (!synth) return false;
    if (!voice) loadVoice();
    try { synth.cancel(); } catch(e) {}
    const u = new SpeechSynthesisUtterance(text);
    u.lang = options.lang || 'zh-CN';
    u.rate = options.rate || 0.8;
    u.pitch = options.pitch || 1.1;
    u.volume = 1.0;
    if (voice) u.voice = voice;
    u.onstart = () => { speaking = true; };
    u.onend = () => { speaking = false; };
    u.onerror = () => { speaking = false; };
    try { if (synth.paused) synth.resume(); } catch(e) {}
    synth.speak(u);
    return true;
  }

  // ---------- 对外接口 ----------

  // 通用朗读（先用预生成短语匹配，否则回退 TTS）
  function speak(text, options = {}) {
    // 尝试匹配预生成短语
    const phrases = {
      "新的开始，加油！": "phrase_new_start.mp3",
      "全部配对成功，再来一局！": "phrase_pair_done.mp3",
      "要先完成上一关哦！": "phrase_level_locked.mp3",
      "闯关成功，太棒了！": "phrase_level_done.mp3",
      "太棒了，你真是个聪明的小侦探！": "phrase_detective.mp3",
      "太棒了！": "praise_0.mp3",
      "真厉害！": "praise_1.mp3",
      "好聪明呀！": "praise_2.mp3",
      "你真棒！": "praise_3.mp3",
      "答对啦！": "praise_4.mp3",
      "哇，好厉害！": "praise_5.mp3",
      "再试一次！": "encourage_0.mp3",
      "加油哦！": "encourage_1.mp3",
      "没关系，再来！": "encourage_2.mp3",
    };
    if (phrases[text]) {
      playAudio('audio/' + phrases[text], () => speakTTS(text, options));
      return true;
    }
    return speakTTS(text, options);
  }

  // 朗读英文字母
  function speakLetter(letter) {
    playAudio(`audio/letter_${letter}.mp3`, () => speakTTS(letter, { lang: 'en-US', rate: 0.7, pitch: 1.2 }));
    return true;
  }

  // 朗读数字（中文）
  function speakNumber(number) {
    playAudio(`audio/num_${number}.mp3`, () => speakTTS(`数字 ${number}`));
    return true;
  }

  // 朗读古诗全文
  function speakPoem(poem) {
    // 通过古诗标题映射到音频索引
    const poemIndexMap = {
      "静夜思": 0, "咏鹅": 1, "春晓": 2, "登鹳雀楼": 3,
      "悯农": 4, "江南": 5, "小池": 6, "望庐山瀑布": 7
    };
    const idx = poemIndexMap[poem.title];
    if (idx !== undefined) {
      playAudio(`audio/poem_${idx}.mp3`, () => speakPoemTTS(poem));
      return true;
    }
    return speakPoemTTS(poem);
  }

  function speakPoemTTS(poem) {
    let text = `${poem.title}，${poem.author}。`;
    poem.lines.forEach(line => {
      text += line.chars.map(c => c.c).join('') + line.punc;
    });
    return speakTTS(text, { rate: 0.75 });
  }

  // 表扬
  function praise() {
    const praises = ["太棒了！", "真厉害！", "好聪明呀！", "你真棒！", "答对啦！", "哇，好厉害！"];
    const random = praises[Math.floor(Math.random() * praises.length)];
    return speak(random);
  }

  // 鼓励
  function encourage() {
    const texts = ["再试一次！", "加油哦！", "没关系，再来！"];
    const random = texts[Math.floor(Math.random() * texts.length)];
    return speak(random);
  }

  // 停止朗读
  function stop() {
    if (currentAudio) {
      try { currentAudio.pause(); currentAudio.currentTime = 0; } catch(e) {}
      currentAudio = null;
    }
    if (synth) synth.cancel();
    speaking = false;
  }

  // 是否正在朗读
  function isSpeaking() {
    return speaking;
  }

  // 初始化
  function init() {
    initTTS();
    return true;
  }

  init();
  return { init, speak, speakLetter, speakNumber, speakPoem, praise, encourage, stop, isSpeaking };
})();
