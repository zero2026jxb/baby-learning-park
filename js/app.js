// ===== 宝贝学习乐园 主逻辑 =====

const App = (() => {
  // ===== 状态管理 =====
  const STORAGE_KEY = 'baby_learning_park';
  let state = {
    stars: 0,
    completedLevels: {},
    badges: [],
    lettersLearned: [],
    poemsRead: [],
    mathAnswered: 0,
    logicAnswered: 0
  };

  // 加载状态
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = { ...state, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('加载状态失败', e);
    }
  }

  // 保存状态
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('保存状态失败', e);
    }
  }

  // ===== 页面导航 =====
  let currentPage = 'letters';

  function init() {
    loadState();
    updateStarCount();
    setupNavigation();
    setupReset();
    renderPage('letters');
  }

  function setupNavigation() {
    // 侧边栏 + 底部Tab共用
    const navButtons = document.querySelectorAll('.nav-btn, .tab-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        renderPage(page);
      });
    });
  }

  function setupReset() {
    document.getElementById('resetBtn').addEventListener('click', () => {
      if (confirm('要重新开始吗？所有星星和进度会被清空哦~')) {
        localStorage.removeItem(STORAGE_KEY);
        state = {
          stars: 0, completedLevels: {}, badges: [],
          lettersLearned: [], poemsRead: [], mathAnswered: 0, logicAnswered: 0
        };
        updateStarCount();
        renderPage(currentPage);
        Speech.speak('新的开始，加油！');
      }
    });
  }

  function setActiveNav(page) {
    document.querySelectorAll('.nav-btn, .tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });
  }

  function renderPage(page) {
    currentPage = page;
    setActiveNav(page);
    const content = document.getElementById('content');
    Speech.stop();

    switch (page) {
      case 'letters': content.innerHTML = renderLetters(); initLetters(); break;
      case 'poems': content.innerHTML = renderPoems(); initPoems(); break;
      case 'numbers': content.innerHTML = renderNumbers(); initNumbers(); break;
      case 'logic': content.innerHTML = renderLogic(); initLogic(); break;
      case 'adventure': content.innerHTML = renderAdventure(); initAdventure(); break;
    }
    content.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function updateStarCount() {
    document.getElementById('headerStarCount').textContent = `⭐ ${state.stars}`;
  }

  // ===== 星星与徽章 =====
  function addStars(count) {
    state.stars += count;
    spawnStarBurst(count);
    updateStarCount();
    saveState();
    checkBadges();
  }

  // 星星特效
  function spawnStarBurst(count) {
    const emojis = ['⭐', '🌟', '✨', '🎉'];
    const container = document.body;
    for (let i = 0; i < Math.min(count, 8); i++) {
      const star = document.createElement('span');
      star.className = 'star-burst';
      star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      star.style.left = (30 + Math.random() * 40) + '%';
      star.style.top = (30 + Math.random() * 30) + '%';
      star.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
      star.style.setProperty('--dy', (Math.random() * -200 - 50) + 'px');
      container.appendChild(star);
      setTimeout(() => star.remove(), 1000);
    }
  }

  function checkBadges() {
    const unlocked = new Set(state.badges);
    let changed = false;

    const badgeChecks = {
      'letter-star': () => state.lettersLearned.length >= 10,
      'number-star': () => state.mathAnswered >= 10,
      'poem-star': () => state.poemsRead.length >= 3,
      'logic-star': () => state.logicAnswered >= 5,
      'level1': () => !!state.completedLevels['1'],
      'level3': () => !!state.completedLevels['3'],
      'level5': () => !!state.completedLevels['5'],
      'star100': () => state.stars >= 100
    };

    Object.keys(badgeChecks).forEach(id => {
      if (badgeChecks[id]() && !unlocked.has(id)) {
        unlocked.add(id);
        state.badges = [...unlocked];
        changed = true;
      }
    });

    if (changed) {
      saveState();
      // 提示获得新徽章
      const newBadge = BADGES.find(b => b.id === [...unlocked].pop());
      if (newBadge) {
        setTimeout(() => {
          alert(`🎉 获得新徽章：${newBadge.name}！${newBadge.icon}`);
        }, 600);
      }
    }
  }

  // ===== 字母乐园 =====
  function renderLetters() {
    return `
      <div class="module-header">
        <span class="module-emoji">🔤</span>
        <div>
          <h2>字母乐园</h2>
          <p>点击卡片听发音，再玩大小写配对！</p>
        </div>
      </div>
      <div class="letter-grid">
        ${Array.from({length: 26}, (_, i) => {
          const letter = String.fromCharCode(65 + i);
          return `<button class="letter-card" data-letter="${letter}" data-color="${i % 5}" onclick="App.handleLetter('${letter}')">
            ${letter}<span class="letter-lower">${letter.toLowerCase()}</span>
          </button>`;
        }).join('')}
      </div>
      <div class="pair-section">
        <h3>🎯 大小写配对</h3>
        <p class="pair-hint">点两个卡片，把大小写配成一对！</p>
        <div class="pair-grid" id="pairGrid"></div>
        <div class="pair-feedback" id="pairFeedback"></div>
      </div>
    `;
  }

  function initLetters() {
    startPairGame();
  }

  function handleLetter(letter) {
    Speech.speakLetter(letter);
    const card = document.querySelector(`.letter-card[data-letter="${letter}"]`);
    if (card) {
      card.classList.remove('speak');
      void card.offsetWidth;
      card.classList.add('speak');
    }
    // 记录学习过的字母
    if (!state.lettersLearned.includes(letter)) {
      state.lettersLearned.push(letter);
      saveState();
      checkBadges();
    }
  }

  // 配对游戏
  let pairState = { selected: null, matched: 0, letters: [] };

  function startPairGame() {
    // 随机选6个字母
    const shuffled = [...Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i))]
      .sort(() => Math.random() - 0.5).slice(0, 6);
    pairState = { selected: null, matched: 0, letters: shuffled };

    // 创建配对卡片：每个字母大写的值和小写
    const cards = [];
    shuffled.forEach(letter => {
      cards.push({ id: `${letter}-upper`, text: letter, matchKey: letter, display: 'upper' });
      cards.push({ id: `${letter}-lower`, text: letter.toLowerCase(), matchKey: letter, display: 'lower' });
    });
    cards.sort(() => Math.random() - 0.5);

    const grid = document.getElementById('pairGrid');
    if (!grid) return;
    grid.innerHTML = cards.map(card => `
      <button class="pair-card" data-key="${card.matchKey}" data-display="${card.display}" onclick="App.pairSelect(this)">
        ${card.text}
      </button>
    `).join('');
    document.getElementById('pairFeedback').textContent = '';
  }

  function pairSelect(el) {
    if (el.classList.contains('matched')) return;

    // 清除之前选中
    document.querySelectorAll('.pair-card.selected').forEach(c => c.classList.remove('selected'));

    if (!pairState.selected) {
      // 第一次选择
      el.classList.add('selected');
      pairState.selected = el;
    } else {
      // 第二次选择
      el.classList.add('selected');
      const first = pairState.selected;
      pairState.selected = null;

      // 检查是否配对
      if (first.dataset.key === el.dataset.key && first.dataset.display !== el.dataset.display) {
        // 配对成功
        setTimeout(() => {
          first.classList.add('matched');
          el.classList.add('matched');
          first.classList.remove('selected');
          el.classList.remove('selected');
          pairState.matched++;
          document.getElementById('pairFeedback').textContent = '配对成功！太棒了！🎉';
          document.getElementById('pairFeedback').className = 'pair-feedback correct';
          Speech.praise();
          addStars(1);

          if (pairState.matched === pairState.letters.length) {
            setTimeout(() => {
              document.getElementById('pairFeedback').textContent = '全部配对成功！再来一局！🌟';
              Speech.speak('全部配对成功，再来一局！');
              startPairGame();
            }, 1000);
          }
        }, 300);
      } else {
        // 配对失败
        setTimeout(() => {
          first.classList.remove('selected');
          el.classList.remove('selected');
          document.getElementById('pairFeedback').textContent = '不一样哦，再试试！';
          document.getElementById('pairFeedback').className = 'pair-feedback wrong';
        }, 500);
      }
    }
  }

  // ===== 古诗花园 =====
  function renderPoems() {
    return `
      <div class="module-header">
        <span class="module-emoji">📜</span>
        <div>
          <h2>古诗花园</h2>
          <p>点一点，听古诗朗读，认识拼音！</p>
        </div>
      </div>
      <div class="poem-list">
        ${POEMS.map((poem, i) => `
          <div class="poem-card">
            <div class="poem-title">${poem.title}</div>
            <div class="poem-author">—— ${poem.author}</div>
            <div class="poem-content">
              ${poem.lines.map(line => `
                <div class="char-row">
                  ${line.chars.map(ch => `
                    <div class="char-col">
                      <span class="char-pinyin">${ch.p}</span>
                      <span class="char-char">${ch.c}</span>
                    </div>
                  `).join('')}
                  <span class="char-pinyin" style="margin-top:15px">${line.punc}</span>
                </div>
              `).join('')}
            </div>
            <button class="poem-btn" data-index="${i}" onclick="App.handlePoem(${i})">
              🔊 朗读这首诗
            </button>
          </div>
        `).join('')}
      </div>
    `;
  }

  function initPoems() {}

  function handlePoem(index) {
    const poem = POEMS[index];
    const btn = document.querySelector(`.poem-btn[data-index="${index}"]`);
    if (Speech.isSpeaking()) {
      Speech.stop();
      btn.classList.remove('speaking');
      return;
    }
    btn.classList.add('speaking');
    Speech.speakPoem(poem);
    setTimeout(() => btn.classList.remove('speaking'), 3000);

    // 记录读过的诗
    if (!state.poemsRead.includes(poem.title)) {
      state.poemsRead.push(poem.title);
      saveState();
      checkBadges();
    }
  }

  // ===== 数字王国 =====
  function renderNumbers() {
    return `
      <div class="module-header">
        <span class="module-emoji">🔢</span>
        <div>
          <h2>数字王国</h2>
          <p>认识数字，做算术，数一数！</p>
        </div>
      </div>

      <div class="number-section">
        <div class="number-grid">
          ${Array.from({length: 21}, (_, i) => `
            <button class="number-card" data-color="${i % 5}" onclick="App.handleNumber(${i})">
              ${i}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="math-box">
        <h3 style="color:var(--blue);font-size:22px;">🧮 算术练习</h3>
        <div class="math-display" id="mathDisplay">?</div>
        <div class="math-options" id="mathOptions"></div>
        <div class="logic-feedback" id="mathFeedback"></div>
      </div>

      <div class="count-section">
        <h3 style="color:var(--orange);font-size:22px;">🍎 数一数</h3>
        <p style="color:#999;margin-top:4px;">数一数有多少个水果？</p>
        <div class="count-fruit-row" id="countFruits"></div>
        <div class="count-options" id="countOptions"></div>
        <div class="logic-feedback" id="countFeedback"></div>
      </div>
    `;
  }

  function initNumbers() {
    newMathQuestion();
    newCountQuestion();
  }

  function handleNumber(num) {
    Speech.speakNumber(num);
    const card = document.querySelectorAll('.number-card')[num];
    if (card) {
      card.style.animation = 'speak 0.5s ease';
      setTimeout(() => card.style.animation = '', 500);
    }
  }

  // 数学出题
  let mathState = { num1: 0, num2: 0, operator: '+', answer: 0, locked: false };

  function newMathQuestion() {
    // 10以内加减法
    const isAdd = Math.random() > 0.4;
    if (isAdd) {
      mathState.num1 = Math.floor(Math.random() * 10) + 1;
      mathState.num2 = Math.floor(Math.random() * (10 - mathState.num1)) + 1;
      mathState.operator = '+';
      mathState.answer = mathState.num1 + mathState.num2;
    } else {
      mathState.num1 = Math.floor(Math.random() * 9) + 2;
      mathState.num2 = Math.floor(Math.random() * mathState.num1);
      mathState.operator = '-';
      mathState.answer = mathState.num1 - mathState.num2;
    }

    // 生成选项（3个正确附近+1个正确答案）
    const options = new Set([mathState.answer]);
    while (options.size < 4) {
      let offset = Math.floor(Math.random() * 7) - 3;
      let candidate = mathState.answer + offset;
      if (candidate >= 0 && candidate <= 10) options.add(candidate);
    }
    const optionArr = [...options].sort(() => Math.random() - 0.5);

    document.getElementById('mathDisplay').textContent = `${mathState.num1} ${mathState.operator} ${mathState.num2} = ?`;
    document.getElementById('mathOptions').innerHTML = optionArr.map((opt, i) => `
      <button class="math-option" data-answer="${opt}" onclick="App.answerMath(this, ${opt})">${opt}</button>
    `).join('');
    document.getElementById('mathFeedback').textContent = '';
    mathState.locked = false;
  }

  function answerMath(el, answer) {
    if (mathState.locked) return;
    mathState.locked = true;

    if (answer === mathState.answer) {
      el.classList.add('correct');
      document.getElementById('mathFeedback').textContent = '答对啦！🌟';
      document.getElementById('mathFeedback').style.color = 'var(--green)';
      Speech.praise();
      addStars(1);
      state.mathAnswered++;
      saveState();
      checkBadges();
      setTimeout(newMathQuestion, 1200);
    } else {
      el.classList.add('wrong');
      document.getElementById('mathFeedback').textContent = '再想想哦~';
      document.getElementById('mathFeedback').style.color = 'var(--pink)';
      Speech.encourage();
      // 显示正确答案
      document.querySelectorAll('.math-option').forEach(o => {
        if (parseInt(o.dataset.answer) === mathState.answer) {
          setTimeout(() => o.classList.add('correct'), 600);
        }
      });
      setTimeout(() => {
        mathState.locked = false;
      }, 1200);
    }
  }

  // 数数游戏
  let countState = { count: 0, locked: false };
  const COUNT_FRUITS = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍑', '🍒', '🍉'];

  function newCountQuestion() {
    countState.count = Math.floor(Math.random() * 8) + 1; // 1-8个水果
    countState.locked = false;

    const fruit = COUNT_FRUITS[Math.floor(Math.random() * COUNT_FRUITS.length)];
    const fruits = Array.from({length: countState.count}, () => fruit);

    document.getElementById('countFruits').innerHTML = fruits.map((f, i) =>
      `<span style="animation-delay:${i * 0.05}s">${f}</span>`
    ).join('');

    // 生成选项
    const options = new Set([countState.count]);
    while (options.size < 4) {
      let offset = Math.floor(Math.random() * 5) - 2;
      let candidate = countState.count + offset;
      if (candidate >= 1 && candidate <= 10) options.add(candidate);
    }
    const optionArr = [...options].sort(() => Math.random() - 0.5);

    document.getElementById('countOptions').innerHTML = optionArr.map((opt, i) => `
      <button class="count-option" data-answer="${opt}" onclick="App.answerCount(this, ${opt})">${opt}</button>
    `).join('');
    document.getElementById('countFeedback').textContent = '';
  }

  function answerCount(el, answer) {
    if (countState.locked) return;
    countState.locked = true;

    if (answer === countState.count) {
      el.classList.add('correct');
      document.getElementById('countFeedback').textContent = '数对了！你真棒！🌟';
      document.getElementById('countFeedback').style.color = 'var(--green)';
      Speech.praise();
      addStars(1);
      state.mathAnswered++;
      saveState();
      checkBadges();
      setTimeout(newCountQuestion, 1200);
    } else {
      el.classList.add('wrong');
      document.getElementById('countFeedback').textContent = `再数一数哦~`;
      document.getElementById('countFeedback').style.color = 'var(--pink)';
      Speech.encourage();
      document.querySelectorAll('.count-option').forEach(o => {
        if (parseInt(o.dataset.answer) === countState.count) {
          setTimeout(() => o.classList.add('correct'), 600);
        }
      });
      setTimeout(() => { countState.locked = false; }, 1200);
    }
  }

  // ===== 逻辑挑战 =====
  let logicState = { index: 0, score: 0, locked: false };

  function renderLogic() {
    return `
      <div class="module-header">
        <span class="module-emoji">🧩</span>
        <div>
          <h2>逻辑挑战</h2>
          <p>找规律、配对、排序，开动小脑筋！</p>
        </div>
      </div>
      <div class="logic-box" id="logicBox"></div>
    `;
  }

  function initLogic() {
    logicState = { index: 0, score: 0, locked: false };
    renderLogicQuestion();
  }

  function renderLogicQuestion() {
    const q = LOGIC_QUESTIONS[logicState.index];
    const box = document.getElementById('logicBox');
    if (!box) return;

    let patternHtml = '';
    if (q.type === 'pattern') {
      patternHtml = `<div class="logic-pattern">
        ${q.pattern.map((p, i) => `<span class="pattern-item" style="animation-delay:${i*0.1}s">${p}</span>`).join('')}
        <span class="pattern-item" style="opacity:0.4">❓</span>
      </div>`;
    } else if (q.type === 'shape') {
      patternHtml = `<div class="logic-shapes">
        ${q.shapes.map(s => `<span style="animation:popIn 0.3s ease">${s}</span>`).join('')}
      </div>`;
    }

    box.innerHTML = `
      <div class="logic-progress">
        <span class="q-num">第 ${logicState.index + 1} / ${LOGIC_QUESTIONS.length} 题</span>
        <div class="dots">
          ${LOGIC_QUESTIONS.map((_, i) => `<span class="dot ${i < logicState.index ? 'done' : ''}"></span>`).join('')}
        </div>
        <span style="color:var(--yellow);font-weight:700;">⭐ ${logicState.score}</span>
      </div>
      <div class="logic-question">${q.question}</div>
      ${patternHtml}
      <div class="logic-options">
        ${q.options.map((opt, i) => `
          <button class="logic-option" data-index="${i}" onclick="App.answerLogic(this, ${i})">${opt}</button>
        `).join('')}
      </div>
      <div class="logic-feedback" id="logicFeedback"></div>
    `;
  }

  function answerLogic(el, index) {
    if (logicState.locked) return;
    logicState.locked = true;

    const q = LOGIC_QUESTIONS[logicState.index];
    const feedback = document.getElementById('logicFeedback');

    if (index === q.answer) {
      el.classList.add('correct');
      feedback.textContent = '答对啦！' + q.explanation;
      feedback.style.color = 'var(--green)';
      Speech.praise();
      addStars(1);
      logicState.score++;
      state.logicAnswered++;
      saveState();
      checkBadges();

      setTimeout(() => {
        logicState.index++;
        if (logicState.index < LOGIC_QUESTIONS.length) {
          logicState.locked = false;
          renderLogicQuestion();
        } else {
          // 完成所有题目
          const finalScore = logicState.score;
          box.innerHTML = `
            <div class="win-screen">
              <div class="win-emoji">🎉</div>
              <div class="win-title">太厉害了！</div>
              <div class="win-stars">⭐ ${finalScore} / ${LOGIC_QUESTIONS.length}</div>
              <div class="win-msg">全部逻辑题完成！你真是个聪明的小侦探！</div>
              <button class="win-btn" onclick="App.renderPage('logic')">🔄 再来一次</button>
            </div>
          `;
          Speech.speak('太棒了，你真是个聪明的小侦探！');
          addStars(3);
        }
      }, 1200);
    } else {
      el.classList.add('wrong');
      feedback.textContent = '再想想哦~';
      feedback.style.color = 'var(--pink)';
      Speech.encourage();
      // 显示正确答案
      document.querySelectorAll('.logic-option').forEach(o => {
        if (parseInt(o.dataset.index) === q.answer) {
          setTimeout(() => o.classList.add('correct'), 600);
        }
      });
      setTimeout(() => { logicState.locked = false; }, 1200);
    }
  }

  // ===== 闯关冒险 =====
  let adventureState = {
    level: null,
    questionIndex: 0,
    score: 0,
    locked: false
  };

  function renderAdventure() {
    return `
      <div class="module-header">
        <span class="module-emoji">🏆</span>
        <div>
          <h2>闯关冒险</h2>
          <p>闯过一关又一关，收集星星和徽章！</p>
        </div>
      </div>
      <div id="adventureContent">
        ${renderLevelMap()}
      </div>
    `;
  }

  function renderLevelMap() {
    let completedCount = Object.keys(state.completedLevels).length;
    return `
      <div class="adventure-intro">
        <div class="adventure-title">🌍 小小冒险家</div>
        <div class="adventure-sub">完成 ${completedCount} / ${LEVELS.length} 关</div>
        <div class="star-display">⭐ 我的星星：${state.stars}</div>
        <div class="level-map">
          ${LEVELS.map((level, i) => {
            const levelNum = i + 1;
            const isUnlocked = levelNum === 1 || state.completedLevels[String(levelNum - 1)];
            const isCompleted = !!state.completedLevels[String(levelNum)];
            return `
              <div class="level-node ${isUnlocked ? 'unlocked' : 'locked'} ${!isCompleted && isUnlocked ? 'current' : ''}"
                   data-level="${levelNum}"
                   onclick="App.startLevel(${levelNum})">
                <div class="level-star">${isCompleted ? '✅' : level.emoji}</div>
                <div class="level-name">${level.name}</div>
                <div class="level-stars">${state.completedLevels[String(levelNum)] ? '⭐'.repeat(state.completedLevels[String(levelNum)]) : '☆'.repeat(3)}</div>
              </div>
            `;
          }).join('')}
        </div>
        ${renderBadgeWall()}
      </div>
    `;
  }

  function renderBadgeWall() {
    return `
      <div class="badge-wall">
        <h3>🏅 成就徽章墙</h3>
        <div class="badge-grid">
          ${BADGES.map(badge => {
            const unlocked = state.badges.includes(badge.id);
            return `
              <div class="badge-item ${unlocked ? 'unlocked' : 'locked'}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-desc">${badge.desc}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function startLevel(levelNum) {
    // 检查是否已解锁
    if (levelNum > 1 && !state.completedLevels[String(levelNum - 1)]) {
      Speech.speak('要先完成上一关哦！');
      return;
    }

    adventureState = {
      level: levelNum,
      questionIndex: 0,
      score: 0,
      locked: false
    };

    const content = document.getElementById('adventureContent');
    const level = LEVELS[levelNum - 1];
    content.innerHTML = `
      <div class="quiz-box">
        <div class="quiz-header">
          <span class="quiz-level-tag">${level.emoji} ${level.name}</span>
          <span style="color:var(--yellow);font-weight:700;font-size:18px;">⭐ ${adventureState.score}</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" id="quizProgress" style="width:0%"></div>
        </div>
        <div class="quiz-question" id="quizQuestion"></div>
        <div class="quiz-options" id="quizOptions"></div>
      </div>
    `;
    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const level = LEVELS[adventureState.level - 1];
    const q = level.questions[adventureState.questionIndex];

    document.getElementById('quizQuestion').textContent = q.q;
    document.getElementById('quizOptions').innerHTML = q.options.map((opt, i) => `
      <button class="quiz-option" data-index="${i}" onclick="App.answerQuiz(this, ${i})">${opt}</button>
    `).join('');
    document.getElementById('quizProgress').style.width =
      `${(adventureState.questionIndex / level.questions.length) * 100}%`;
  }

  function answerQuiz(el, index) {
    if (adventureState.locked) return;
    adventureState.locked = true;

    const level = LEVELS[adventureState.level - 1];
    const q = level.questions[adventureState.questionIndex];
    const questionIndex = adventureState.questionIndex;
    const isCorrect = index === q.answer;

    if (isCorrect) {
      el.classList.add('correct');
      adventureState.score++;
      addStars(1);
      Speech.praise();
      document.getElementById('quizProgress').style.width =
        `${((questionIndex + 1) / level.questions.length) * 100}%`;
    } else {
      el.classList.add('wrong');
      Speech.encourage();
      document.querySelectorAll('.quiz-option').forEach(o => {
        if (parseInt(o.dataset.index) === q.answer) {
          setTimeout(() => o.classList.add('correct'), 500);
        }
      });
    }

    setTimeout(() => {
      adventureState.locked = false;
      adventureState.questionIndex++;
      if (adventureState.questionIndex < level.questions.length) {
        renderQuizQuestion();
      } else {
        // 关卡完成
        completeLevel();
      }
    }, 1500);
  }

  function completeLevel() {
    const levelNum = adventureState.level;
    const totalQuestions = LEVELS[levelNum - 1].questions.length;
    const score = adventureState.score;

    // 计算星星数（3星=全对，2星=>=80%，1星=>=60%）
    let starsEarned = 0;
    if (score === totalQuestions) starsEarned = 3;
    else if (score >= totalQuestions * 0.8) starsEarned = 2;
    else if (score >= totalQuestions * 0.6) starsEarned = 1;

    // 保存关卡进度（保留最高分）
    const prevStars = state.completedLevels[String(levelNum)] || 0;
    if (starsEarned > prevStars) {
      state.completedLevels[String(levelNum)] = starsEarned;
      saveState();
    }

    // 额外奖励星星
    const bonus = starsEarned * 2;
    if (bonus > 0) addStars(bonus);

    checkBadges();

    // 显示胜利画面
    const content = document.getElementById('adventureContent');
    content.innerHTML = `
      <div class="win-screen">
        <div class="win-emoji">🏆</div>
        <div class="win-title">闯关成功！</div>
        <div class="win-stars">${'⭐'.repeat(starsEarned)}</div>
        <div class="win-msg">答对 ${score} / ${totalQuestions} 题，获得 ${starsEarned} 颗星和 ${bonus} 颗奖励星！</div>
        <button class="win-btn" onclick="App.renderPage('adventure')">🎮 继续冒险</button>
      </div>
    `;
    Speech.speak('闯关成功，太棒了！');
  }

  return {
    init,
    renderPage,
    handleLetter,
    pairSelect,
    handlePoem,
    handleNumber,
    answerMath,
    answerCount,
    answerLogic,
    startLevel,
    answerQuiz
  };
})();

// 启动
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
