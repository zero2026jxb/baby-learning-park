// ===== 语音功能模块 (Web Speech API) =====

const Speech = (() => {
  let synth = null;
  let speaking = false;
  let voice = null;

  // 初始化语音合成
  function init() {
    if (!('speechSynthesis' in window)) {
      console.warn('此浏览器不支持语音合成');
      return false;
    }
    synth = window.speechSynthesis;
    loadVoice();
    return true;
  }

  // 加载中文语音
  function loadVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    // 优先选择中文女声
    voice = voices.find(v => v.lang === 'zh-CN' && /female|woman|xiaoxiao|yaoyao|tingting/i.test(v.name))
         || voices.find(v => v.lang === 'zh-CN')
         || voices.find(v => v.lang.startsWith('zh'))
         || null;
  }

  // 浏览器可能异步加载语音，需要监听
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => { loadVoice(); };
  }

  // 朗读文本
  function speak(text, options = {}) {
    if (!synth) return false;
    // 取消之前的朗读
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'zh-CN';
    utterance.rate = options.rate || 0.8;  // 稍慢适合小朋友
    utterance.pitch = options.pitch || 1.1;  // 稍高，更亲切
    utterance.volume = 1.0;

    if (voice) utterance.voice = voice;

    utterance.onstart = () => { speaking = true; };
    utterance.onend = () => { speaking = false; };
    utterance.onerror = () => { speaking = false; };

    synth.speak(utterance);
    return true;
  }

  // 朗读英文字母
  function speakLetter(letter) {
    return speak(letter, { lang: 'en-US', rate: 0.7, pitch: 1.2 });
  }

  // 朗读数字
  function speakNumber(number) {
    // 使用中文读数字
    return speak(`数字 ${number}`);
  }

  // 朗读古诗全文
  function speakPoem(poem) {
    let text = `${poem.title}，${poem.author}。`;
    poem.lines.forEach(line => {
      text += line.chars.map(c => c.c).join('') + line.punc;
    });
    return speak(text, { rate: 0.75 });
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
    if (synth) synth.cancel();
    speaking = false;
  }

  // 是否正在朗读
  function isSpeaking() {
    return speaking;
  }

  init();
  return { init, speak, speakLetter, speakNumber, speakPoem, praise, encourage, stop, isSpeaking };
})();
