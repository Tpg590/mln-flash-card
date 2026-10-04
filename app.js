/**
 * MLN111 Flashcard & Quiz Application
 * Logic, State Management, Web Audio, Speech Synthesis & Persistence
 */

(() => {
  // URL validation & History guard: Luôn chuẩn hóa URL về trang chủ '/', không cho phép trỏ sang file/đường dẫn khác trong dự án
  if (window.location.pathname !== '/' && window.location.pathname !== '') {
    window.history.replaceState(null, '', '/');
  }
  window.addEventListener('popstate', () => {
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.replaceState(null, '', '/');
    }
  });

  // 1. STATE
  const state = {
    allQuestions: typeof FLASHCARD_DATA !== 'undefined' ? FLASHCARD_DATA : [],
    filteredQuestions: [],
    currentIndex: 0,
    isFlipped: false,
    activeFilter: 'all',
    searchQuery: '',
    currentMode: 'flashcard', // 'flashcard' | 'quiz' | 'list'
    isShuffled: false,
    isAutoplay: false,
    autoplayInterval: null,
    soundEnabled: localStorage.getItem('mln_sound') !== 'false',
    theme: localStorage.getItem('mln_theme') || 'dark',
    cardFontSize: localStorage.getItem('mln_card_font_size') || 'normal', // 'normal' | 'large' | 'xlarge'

    // Persistent user progress
    starred: new Set(JSON.parse(localStorage.getItem('mln_starred') || '[]')),
    status: JSON.parse(localStorage.getItem('mln_status') || '{}'), // id -> 'mastered' | 'review'

    // Quiz Mode state
    quiz: {
      questions: [],
      currentIndex: 0,
      score: 0,
      streak: 0,
      answered: false,
      selectedCount: parseInt(localStorage.getItem('mln_quiz_count') || '20', 10)
    }
  };

  // 2. DOM ELEMENTS
  const els = {
    html: document.documentElement,
    badgeTotalCount: document.getElementById('badge-total-count'),
    
    // Mode tabs
    tabFlashcard: document.getElementById('tab-flashcard'),
    tabQuiz: document.getElementById('tab-quiz'),
    tabList: document.getElementById('tab-list'),
    viewFlashcard: document.getElementById('view-flashcard'),
    viewQuiz: document.getElementById('view-quiz'),
    viewList: document.getElementById('view-list'),

    // Global tools
    btnSoundToggle: document.getElementById('btn-sound-toggle'),
    iconSoundOn: document.querySelector('.icon-sound-on'),
    iconSoundOff: document.querySelector('.icon-sound-off'),
    btnThemeToggle: document.getElementById('btn-theme-toggle'),
    iconMoon: document.querySelector('.icon-moon'),
    iconSun: document.querySelector('.icon-sun'),
    btnShortcuts: document.getElementById('btn-shortcuts'),
    shortcutsModal: document.getElementById('shortcuts-modal'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    toast: document.getElementById('app-toast'),

    // Toolbar
    searchInput: document.getElementById('search-input'),
    btnClearSearch: document.getElementById('btn-clear-search'),
    chapterFilterPills: document.getElementById('chapter-filter-pills'),
    pills: document.querySelectorAll('.pill'),

    // Counts
    countAll: document.getElementById('count-all'),
    countC1: document.getElementById('count-c1'),
    countC2: document.getElementById('count-c2'),
    countC3: document.getElementById('count-c3'),
    countStarred: document.getElementById('count-starred'),
    countReview: document.getElementById('count-review'),
    countMastered: document.getElementById('count-mastered'),

    // Progress bar
    currentRangeText: document.getElementById('current-range-text'),
    statMasteredBadge: document.getElementById('stat-mastered-badge'),
    statReviewBadge: document.getElementById('stat-review-badge'),
    statPercentBadge: document.getElementById('stat-percent-badge'),
    progressFillMastered: document.getElementById('progress-fill-mastered'),
    progressFillReview: document.getElementById('progress-fill-review'),

    // Flashcard
    cardScene: document.getElementById('card-scene'),
    flashcard: document.getElementById('flashcard'),
    cardFront: document.querySelector('.card-front'),
    cardBack: document.querySelector('.card-back'),
    cardChapterBadge: document.getElementById('card-chapter-badge'),
    cardQHeader: document.getElementById('card-q-header'),
    cardQuestionText: document.getElementById('card-question-text'),
    cardOptionsHint: document.getElementById('card-options-hint'),
    cardHintList: document.getElementById('card-hint-list'),
    cardAnswerText: document.getElementById('card-answer-text'),
    cardAnswerBreakdown: document.getElementById('card-answer-breakdown'),
    cardBreakdownList: document.getElementById('card-breakdown-list'),
    btnCardFont: document.getElementById('btn-card-font'),
    btnCardBackFont: document.getElementById('btn-card-back-font'),
    btnCardTts: document.getElementById('btn-card-tts'),
    btnCardBackTts: document.getElementById('btn-card-back-tts'),
    btnCardStar: document.getElementById('btn-card-star'),
    btnCardBackStar: document.getElementById('btn-card-back-star'),
    btnRateBad: document.getElementById('btn-rate-bad'),
    btnRateGood: document.getElementById('btn-rate-good'),

    // Card controls
    btnPrevCard: document.getElementById('btn-prev-card'),
    btnNextCard: document.getElementById('btn-next-card'),
    btnFlipCard: document.getElementById('btn-flip-card'),
    btnShuffle: document.getElementById('btn-shuffle'),
    btnAutoplay: document.getElementById('btn-autoplay'),
    iconPlay: document.querySelector('.icon-play'),
    iconPause: document.querySelector('.icon-pause'),
    autoplayText: document.getElementById('autoplay-text'),

    // Quiz elements
    quizSizePills: document.getElementById('quiz-size-pills'),
    btnQuizRestart: document.getElementById('btn-quiz-restart'),
    quizScoreVal: document.getElementById('quiz-score-val'),
    quizStreakVal: document.getElementById('quiz-streak-val'),
    quizCurrentNum: document.getElementById('quiz-current-num'),
    quizCard: document.getElementById('quiz-card'),
    quizBadge: document.getElementById('quiz-badge'),
    quizQuestionText: document.getElementById('quiz-question-text'),
    quizOptionsContainer: document.getElementById('quiz-options-container'),
    quizFeedbackBox: document.getElementById('quiz-feedback-box'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackDesc: document.getElementById('feedback-desc'),
    btnQuizNext: document.getElementById('btn-quiz-next'),

    // List mode elements
    listTotalCount: document.getElementById('list-total-count'),
    btnExpandAll: document.getElementById('btn-expand-all'),
    questionsAccordionList: document.getElementById('questions-accordion-list')
  };

  // 3. SOUND SYNTHESIS (Web Audio API - Zero external files)
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  function playFlipSound() {
    playTone(340, 'triangle', 0.12, 0.08);
  }

  function playCorrectSound() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch (e) {}
  }

  function playWrongSound() {
    playTone(180, 'sawtooth', 0.25, 0.12);
  }

  function playClickSound() {
    playTone(450, 'sine', 0.06, 0.04);
  }

  // 4. TEXT TO SPEECH (Vietnamese)
  function speakVietnamese(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ phát âm.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    
    // Attempt to find Vietnamese voice
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
    if (viVoice) utterance.voice = viVoice;

    window.speechSynthesis.speak(utterance);
  }

  // 5. THEME & AUDIO TOGGLES
  function initTheme() {
    els.html.setAttribute('data-theme', state.theme);
    if (state.theme === 'light') {
      els.iconMoon.classList.add('hide');
      els.iconSun.classList.remove('hide');
    } else {
      els.iconMoon.classList.remove('hide');
      els.iconSun.classList.add('hide');
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mln_theme', state.theme);
    initTheme();
    playClickSound();
    showToast(`Đã chuyển sang giao diện ${state.theme === 'dark' ? 'Tối' : 'Sáng'}`);
  }

  function initSound() {
    if (state.soundEnabled) {
      els.iconSoundOn.classList.remove('hide');
      els.iconSoundOff.classList.add('hide');
    } else {
      els.iconSoundOn.classList.add('hide');
      els.iconSoundOff.classList.remove('hide');
    }
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem('mln_sound', state.soundEnabled);
    initSound();
    showToast(`Âm thanh: ${state.soundEnabled ? 'Bật' : 'Tắt'}`);
  }

  // 6. TOAST
  let toastTimer = null;
  function showToast(msg, duration = 2000) {
    clearTimeout(toastTimer);
    els.toast.textContent = msg;
    els.toast.classList.remove('hide');
    toastTimer = setTimeout(() => {
      els.toast.classList.add('hide');
    }, duration);
  }

  // 7. FILTER & SEARCH
  function updateCounts() {
    const total = state.allQuestions.length;
    const c1 = state.allQuestions.filter(q => q.chapterId.startsWith('c1')).length;
    const c2 = state.allQuestions.filter(q => q.chapterId.startsWith('c2')).length;
    const c3 = state.allQuestions.filter(q => q.chapterId.startsWith('c3')).length;
    const starCount = state.starred.size;
    
    let masteredCount = 0;
    let reviewCount = 0;
    Object.values(state.status).forEach(st => {
      if (st === 'mastered') masteredCount++;
      if (st === 'review') reviewCount++;
    });

    els.countAll.textContent = total;
    els.countC1.textContent = c1;
    els.countC2.textContent = c2;
    els.countC3.textContent = c3;
    els.countStarred.textContent = starCount;
    els.countReview.textContent = reviewCount;
    els.countMastered.textContent = masteredCount;

    // Progress stats
    els.statMasteredBadge.textContent = `✅ Đã thuộc: ${masteredCount}`;
    els.statReviewBadge.textContent = `❌ Cần ôn: ${reviewCount}`;
    const percent = Math.round((masteredCount / Math.max(total, 1)) * 100);
    els.statPercentBadge.textContent = `${percent}% hoàn thành`;
    els.progressFillMastered.style.width = `${(masteredCount / total) * 100}%`;
    els.progressFillReview.style.width = `${(reviewCount / total) * 100}%`;
  }

  function applyFilterAndSearch() {
    let result = [...state.allQuestions];

    // Filter by Chapter / Category
    if (state.activeFilter === 'c1') {
      result = result.filter(q => q.chapterId.startsWith('c1'));
    } else if (state.activeFilter === 'c2') {
      result = result.filter(q => q.chapterId.startsWith('c2'));
    } else if (state.activeFilter === 'c3') {
      result = result.filter(q => q.chapterId.startsWith('c3'));
    } else if (state.activeFilter === 'starred') {
      result = result.filter(q => state.starred.has(q.id));
    } else if (state.activeFilter === 'review') {
      result = result.filter(q => state.status[q.id] === 'review');
    } else if (state.activeFilter === 'mastered') {
      result = result.filter(q => state.status[q.id] === 'mastered');
    }

    // Search query
    const q = state.searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(item => {
        const inQuestion = item.question.toLowerCase().includes(q);
        const inAnswer = item.answer.toLowerCase().includes(q);
        const inHeader = item.header.toLowerCase().includes(q);
        const inOptions = item.options.some(opt => opt.toLowerCase().includes(q));
        return inQuestion || inAnswer || inHeader || inOptions;
      });
    }

    // Shuffle if toggled
    if (state.isShuffled) {
      result = shuffleArray([...result]);
    }

    state.filteredQuestions = result;
    state.currentIndex = 0;
    state.isFlipped = false;
    els.flashcard.classList.remove('flipped');

    updateFlashcardView();
    updateListView();
    updateProgressIndicator();
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // 8. FLASHCARD VIEW RENDERING
  function updateProgressIndicator() {
    const total = state.filteredQuestions.length;
    if (total === 0) {
      els.currentRangeText.textContent = '0 / 0 câu';
    } else {
      els.currentRangeText.textContent = `${state.currentIndex + 1} / ${total} câu`;
    }
  }

  function updateFlashcardView() {
    const list = state.filteredQuestions;
    if (list.length === 0) {
      els.cardChapterBadge.textContent = 'Trống';
      els.cardQHeader.textContent = '';
      els.cardQuestionText.textContent = 'Không tìm thấy câu hỏi nào phù hợp với bộ lọc hoặc tìm kiếm của bạn.';
      els.cardOptionsHint.classList.add('hide');
      els.cardAnswerText.textContent = 'Hãy chọn bộ lọc "Tất cả" hoặc xóa từ khóa tìm kiếm.';
      els.cardAnswerBreakdown.classList.add('hide');
      updateProgressIndicator();
      return;
    }

    const item = list[state.currentIndex];
    const isStarred = state.starred.has(item.id);

    // Front Face
    els.cardChapterBadge.textContent = `${item.chapter} • ${item.header}`;
    els.cardQHeader.textContent = item.header;
    els.cardQuestionText.textContent = item.question;

    // Star icon state
    if (isStarred) {
      els.btnCardStar.classList.add('starred');
      els.btnCardBackStar.classList.add('starred');
    } else {
      els.btnCardStar.classList.remove('starred');
      els.btnCardBackStar.classList.remove('starred');
    }

    // Options hint on front (if multiple choice)
    if (item.options && item.options.length >= 2) {
      els.cardOptionsHint.classList.remove('hide');
      els.cardHintList.innerHTML = item.options.map(opt => `<li>${escapeHtml(opt)}</li>`).join('');
    } else {
      els.cardOptionsHint.classList.add('hide');
    }

    // Back Face
    els.cardAnswerText.textContent = item.answer;

    // Breakdown list on back
    if (item.options && item.options.length >= 2) {
      els.cardAnswerBreakdown.classList.remove('hide');
      els.cardBreakdownList.innerHTML = item.options.map(opt => {
        const isCorrect = (opt.trim() === item.answer.trim()) || opt.includes(item.answer);
        return `<li class="${isCorrect ? 'is-correct' : ''}">${isCorrect ? '✓ ' : ''}${escapeHtml(opt)}</li>`;
      }).join('');
    } else {
      els.cardAnswerBreakdown.classList.add('hide');
    }

    // Reset flip
    if (state.isFlipped) {
      state.isFlipped = false;
      els.flashcard.classList.remove('flipped');
    }

    updateProgressIndicator();
    requestAnimationFrame(adjustCardHeight);
  }

  function initCardFontSize() {
    els.flashcard.setAttribute('data-card-font', state.cardFontSize);
  }

  function cycleCardFontSize() {
    const modes = ['normal', 'large', 'xlarge'];
    const nextIdx = (modes.indexOf(state.cardFontSize) + 1) % modes.length;
    state.cardFontSize = modes[nextIdx];
    localStorage.setItem('mln_card_font_size', state.cardFontSize);
    initCardFontSize();
    setTimeout(adjustCardHeight, 50);
    playClickSound();

    const labels = {
      normal: 'Vừa (Mặc định)',
      large: 'Lớn (115%)',
      xlarge: 'Rất lớn (130%)'
    };
    showToast(`Cỡ chữ thẻ: ${labels[state.cardFontSize]}`);
  }

  function adjustCardHeight() {
    if (!els.cardFront || !els.cardBack) return;
    const baseMin = window.innerWidth <= 768 ? 460 : 480;

    // Measure front content
    const frontHeader = els.cardFront.querySelector('.card-header');
    const frontBody = els.cardFront.querySelector('.card-body');
    const frontFooter = els.cardFront.querySelector('.card-footer');

    // Measure back content
    const backHeader = els.cardBack.querySelector('.card-header');
    const backBody = els.cardBack.querySelector('.card-body');
    const backFooter = els.cardBack.querySelector('.card-footer');

    const frontNeeded = (frontHeader?.offsetHeight || 0) + (frontBody?.scrollHeight || 0) + (frontFooter?.offsetHeight || 0) + 70;
    const backNeeded = (backHeader?.offsetHeight || 0) + (backBody?.scrollHeight || 0) + (backFooter?.offsetHeight || 0) + 70;

    const targetH = Math.max(baseMin, frontNeeded, backNeeded);
    els.cardScene.style.minHeight = `${targetH}px`;
    els.flashcard.style.minHeight = `${targetH}px`;
  }

  function flipCard() {
    state.isFlipped = !state.isFlipped;
    els.flashcard.classList.toggle('flipped', state.isFlipped);
    playFlipSound();
  }

  function nextCard() {
    if (state.filteredQuestions.length === 0) return;
    if (state.currentIndex < state.filteredQuestions.length - 1) {
      state.currentIndex++;
    } else {
      state.currentIndex = 0; // wrap around
    }
    updateFlashcardView();
    playClickSound();
  }

  function prevCard() {
    if (state.filteredQuestions.length === 0) return;
    if (state.currentIndex > 0) {
      state.currentIndex--;
    } else {
      state.currentIndex = state.filteredQuestions.length - 1;
    }
    updateFlashcardView();
    playClickSound();
  }

  function toggleStarCurrent() {
    if (state.filteredQuestions.length === 0) return;
    const item = state.filteredQuestions[state.currentIndex];
    if (state.starred.has(item.id)) {
      state.starred.delete(item.id);
      showToast('Đã bỏ lưu câu hỏi ⭐');
    } else {
      state.starred.add(item.id);
      showToast('Đã lưu câu hỏi vào danh sách ⭐');
    }
    localStorage.setItem('mln_starred', JSON.stringify([...state.starred]));
    updateCounts();
    updateFlashcardView();
    playClickSound();
  }

  function rateCurrentCard(rating) {
    if (state.filteredQuestions.length === 0) return;
    const item = state.filteredQuestions[state.currentIndex];
    state.status[item.id] = rating;
    localStorage.setItem('mln_status', JSON.stringify(state.status));
    updateCounts();

    if (rating === 'mastered') {
      playCorrectSound();
      showToast('Tuyệt vời! Đã đánh dấu: Đã thuộc ✅');
    } else {
      playWrongSound();
      showToast('Đã lưu vào danh sách Cần ôn lại ❌');
    }

    setTimeout(() => {
      nextCard();
    }, 400);
  }

  function toggleAutoplay() {
    state.isAutoplay = !state.isAutoplay;
    if (state.isAutoplay) {
      els.btnAutoplay.classList.add('active');
      els.iconPlay.classList.add('hide');
      els.iconPause.classList.remove('hide');
      els.autoplayText.textContent = 'Dừng';
      showToast('Đã bật Tự chạy (Autoplay)');
      runAutoplayCycle();
    } else {
      stopAutoplay();
    }
  }

  function stopAutoplay() {
    state.isAutoplay = false;
    clearTimeout(state.autoplayInterval);
    els.btnAutoplay.classList.remove('active');
    els.iconPlay.classList.remove('hide');
    els.iconPause.classList.add('hide');
    els.autoplayText.textContent = 'Tự chạy';
  }

  function runAutoplayCycle() {
    if (!state.isAutoplay) return;
    // Step 1: Wait 4 seconds on front, then flip
    state.autoplayInterval = setTimeout(() => {
      if (!state.isAutoplay) return;
      if (!state.isFlipped) flipCard();
      // Step 2: Wait 4 seconds on back, then next card
      state.autoplayInterval = setTimeout(() => {
        if (!state.isAutoplay) return;
        nextCard();
        runAutoplayCycle();
      }, 4000);
    }, 4000);
  }

  // 9. QUIZ MODE
  function initQuiz(customCount) {
    const count = customCount || state.quiz.selectedCount || 20;
    state.quiz.selectedCount = count;
    localStorage.setItem('mln_quiz_count', count);

    // Update active pill UI
    if (els.quizSizePills) {
      const pills = els.quizSizePills.querySelectorAll('.quiz-size-pill');
      pills.forEach(p => {
        p.classList.toggle('active', parseInt(p.getAttribute('data-count'), 10) === count);
      });
    }

    let pool = [...state.filteredQuestions];
    if (pool.length < count) {
      // If current filter has fewer questions than requested count, pull from all questions
      pool = [...state.allQuestions];
    }
    state.quiz.questions = shuffleArray([...pool]).slice(0, count);
    state.quiz.currentIndex = 0;
    state.quiz.score = 0;
    state.quiz.streak = 0;
    state.quiz.answered = false;

    renderQuizQuestion();
  }

  function renderQuizQuestion() {
    const qData = state.quiz.questions[state.quiz.currentIndex];
    state.quiz.answered = false;

    els.quizScoreVal.textContent = state.quiz.score;
    els.quizStreakVal.textContent = state.quiz.streak;
    els.quizCurrentNum.textContent = `${state.quiz.currentIndex + 1} / ${state.quiz.questions.length}`;

    els.quizBadge.textContent = `${qData.chapter} • ${qData.header}`;
    els.quizQuestionText.textContent = qData.question;
    els.quizFeedbackBox.classList.add('hide');

    // Build choices
    let options = [];
    if (qData.options && qData.options.length >= 2) {
      options = [...qData.options];
    } else {
      // Generate distractors from other questions in data
      const distractors = state.allQuestions
        .filter(item => item.id !== qData.id && item.answer && item.answer !== qData.answer)
        .map(item => item.answer);
      const shuffledDistractors = shuffleArray(distractors).slice(0, 3);
      options = shuffleArray([qData.answer, ...shuffledDistractors]);
    }

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    els.quizOptionsContainer.innerHTML = options.map((opt, i) => {
      return `
        <button class="quiz-opt-btn" data-opt="${escapeHtml(opt)}">
          <span class="quiz-opt-prefix">${letters[i] || (i + 1)}</span>
          <span class="quiz-opt-text">${escapeHtml(opt)}</span>
        </button>
      `;
    }).join('');

    // Attach click handlers
    const optButtons = els.quizOptionsContainer.querySelectorAll('.quiz-opt-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', () => handleQuizAnswer(btn, qData, optButtons));
    });
  }

  function handleQuizAnswer(selectedBtn, qData, allButtons) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;

    const chosenText = selectedBtn.getAttribute('data-opt').trim();
    const correctText = qData.answer.trim();
    const isCorrect = (chosenText === correctText) || chosenText.includes(correctText) || (correctText.includes(chosenText) && chosenText.length > 5);

    // Disable all options
    allButtons.forEach(btn => {
      btn.disabled = true;
      const optVal = btn.getAttribute('data-opt').trim();
      if ((optVal === correctText) || optVal.includes(correctText)) {
        btn.classList.add('correct');
      }
    });

    if (isCorrect) {
      selectedBtn.classList.add('correct');
      state.quiz.score += 10;
      state.quiz.streak++;
      playCorrectSound();
      showQuizFeedback(true, qData.answer);
    } else {
      selectedBtn.classList.add('wrong');
      state.quiz.streak = 0;
      playWrongSound();
      showQuizFeedback(false, qData.answer);
      // Mark for review in user progress
      state.status[qData.id] = 'review';
      localStorage.setItem('mln_status', JSON.stringify(state.status));
      updateCounts();
    }

    els.quizScoreVal.textContent = state.quiz.score;
    els.quizStreakVal.textContent = state.quiz.streak;
  }

  function showQuizFeedback(isCorrect, correctAnswer) {
    els.feedbackIcon.textContent = isCorrect ? '🎉' : '❌';
    els.feedbackTitle.textContent = isCorrect ? 'Chính xác! (+10 điểm)' : 'Chưa đúng rồi!';
    els.feedbackDesc.textContent = `Đáp án đúng: ${correctAnswer}`;
    els.quizFeedbackBox.classList.remove('hide');
  }

  function nextQuizQuestion() {
    if (state.quiz.currentIndex < state.quiz.questions.length - 1) {
      state.quiz.currentIndex++;
      renderQuizQuestion();
    } else {
      // Quiz completed!
      const totalPossible = state.quiz.questions.length * 10;
      showToast(`Hoàn thành Trắc nghiệm! Điểm của bạn: ${state.quiz.score} / ${totalPossible} 🏆`, 4000);
      initQuiz();
    }
  }

  // 10. LIST / LOOKUP VIEW
  function updateListView() {
    const list = state.filteredQuestions;
    els.listTotalCount.textContent = `Hiển thị ${list.length} / ${state.allQuestions.length} câu hỏi`;

    if (list.length === 0) {
      els.questionsAccordionList.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          Không tìm thấy câu hỏi nào. Thử từ khóa khác.
        </div>
      `;
      return;
    }

    els.questionsAccordionList.innerHTML = list.map(item => {
      const isStarred = state.starred.has(item.id);
      return `
        <div class="list-item-card" id="list-card-${item.id}">
          <div class="list-item-header" data-id="${item.id}">
            <div class="list-item-title-wrap">
              <div class="list-item-meta">
                <span>${escapeHtml(item.chapter)}</span> • <span>${escapeHtml(item.header)}</span>
              </div>
              <div class="list-item-q">${escapeHtml(item.question)}</div>
            </div>
            <div class="list-item-actions">
              <button class="list-star-btn ${isStarred ? 'starred' : ''}" data-id="${item.id}" title="Lưu câu hỏi">
                ⭐
              </button>
              <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div class="list-item-body">
            <div class="list-answer-box">
              <div class="list-answer-label">Đáp án chính xác:</div>
              <div class="list-answer-text">${escapeHtml(item.answer)}</div>
            </div>
            ${item.options && item.options.length >= 2 ? `
              <div style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-secondary);">
                <strong>Các phương án:</strong>
                <ul style="margin: 0.25rem 0 0 1.25rem;">
                  ${item.options.map(opt => `<li>${escapeHtml(opt)}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Toggle card expansion
    const headers = els.questionsAccordionList.querySelectorAll('.list-item-header');
    headers.forEach(h => {
      h.addEventListener('click', (e) => {
        if (e.target.closest('.list-star-btn')) return;
        const card = h.closest('.list-item-card');
        card.classList.toggle('open');
        playClickSound();
      });
    });

    // Star toggle in list
    const starBtns = els.questionsAccordionList.querySelectorAll('.list-star-btn');
    starBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'), 10);
        if (state.starred.has(id)) {
          state.starred.delete(id);
          btn.classList.remove('starred');
          showToast('Đã bỏ lưu ⭐');
        } else {
          state.starred.add(id);
          btn.classList.add('starred');
          showToast('Đã lưu ⭐');
        }
        localStorage.setItem('mln_starred', JSON.stringify([...state.starred]));
        updateCounts();
        playClickSound();
      });
    });
  }

  let allExpanded = false;
  function toggleExpandAll() {
    allExpanded = !allExpanded;
    const cards = els.questionsAccordionList.querySelectorAll('.list-item-card');
    cards.forEach(c => c.classList.toggle('open', allExpanded));
    els.btnExpandAll.textContent = allExpanded ? 'Đóng tất cả đáp án' : 'Mở tất cả đáp án';
    playClickSound();
  }

  // 11. MODE SWITCHING
  function switchMode(mode) {
    state.currentMode = mode;

    els.tabFlashcard.classList.toggle('active', mode === 'flashcard');
    els.tabQuiz.classList.toggle('active', mode === 'quiz');
    els.tabList.classList.toggle('active', mode === 'list');

    els.viewFlashcard.classList.toggle('active', mode === 'flashcard');
    els.viewQuiz.classList.toggle('active', mode === 'quiz');
    els.viewList.classList.toggle('active', mode === 'list');

    if (mode === 'quiz') {
      initQuiz();
    } else if (mode === 'flashcard') {
      updateFlashcardView();
    } else if (mode === 'list') {
      updateListView();
    }

    playClickSound();
  }

  // 12. UTILITIES
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // 13. EVENT LISTENERS
  function setupEventListeners() {
    // Mode tabs
    els.tabFlashcard.addEventListener('click', () => switchMode('flashcard'));
    els.tabQuiz.addEventListener('click', () => switchMode('quiz'));
    els.tabList.addEventListener('click', () => switchMode('list'));

    // Sound & Theme
    els.btnSoundToggle.addEventListener('click', toggleSound);
    els.btnThemeToggle.addEventListener('click', toggleTheme);

    // Shortcuts modal
    els.btnShortcuts.addEventListener('click', () => {
      els.shortcutsModal.classList.remove('hide');
      playClickSound();
    });
    els.btnCloseModal.addEventListener('click', () => {
      els.shortcutsModal.classList.add('hide');
    });
    els.shortcutsModal.addEventListener('click', (e) => {
      if (e.target === els.shortcutsModal) els.shortcutsModal.classList.add('hide');
    });

    // Search
    els.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      els.btnClearSearch.classList.toggle('hide', !state.searchQuery);
      applyFilterAndSearch();
    });

    els.btnClearSearch.addEventListener('click', () => {
      els.searchInput.value = '';
      state.searchQuery = '';
      els.btnClearSearch.classList.add('hide');
      applyFilterAndSearch();
      els.searchInput.focus();
    });

    // Filter pills
    els.pills.forEach(pill => {
      pill.addEventListener('click', () => {
        els.pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeFilter = pill.getAttribute('data-filter');
        applyFilterAndSearch();
        playClickSound();
      });
    });

    // Flashcard interactions
    els.flashcard.addEventListener('click', (e) => {
      if (e.target.closest('.card-tool-btn') || e.target.closest('.rate-btn')) return;
      flipCard();
    });

    els.btnFlipCard.addEventListener('click', flipCard);
    els.btnNextCard.addEventListener('click', nextCard);
    els.btnPrevCard.addEventListener('click', prevCard);

    // Shuffle
    els.btnShuffle.addEventListener('click', () => {
      state.isShuffled = !state.isShuffled;
      els.btnShuffle.classList.toggle('active', state.isShuffled);
      showToast(state.isShuffled ? 'Đã bật đảo câu ngẫu nhiên 🔀' : 'Đã tắt đảo ngẫu nhiên');
      applyFilterAndSearch();
      playClickSound();
    });

    // Autoplay
    els.btnAutoplay.addEventListener('click', toggleAutoplay);

    // Rating
    els.btnRateBad.addEventListener('click', (e) => {
      e.stopPropagation();
      rateCurrentCard('review');
    });
    els.btnRateGood.addEventListener('click', (e) => {
      e.stopPropagation();
      rateCurrentCard('mastered');
    });

    // Star buttons
    els.btnCardStar.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStarCurrent();
    });
    els.btnCardBackStar.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStarCurrent();
    });

    // Font size toggle buttons
    if (els.btnCardFont) {
      els.btnCardFont.addEventListener('click', (e) => {
        e.stopPropagation();
        cycleCardFontSize();
      });
    }
    if (els.btnCardBackFont) {
      els.btnCardBackFont.addEventListener('click', (e) => {
        e.stopPropagation();
        cycleCardFontSize();
      });
    }

    // Text to speech
    els.btnCardTts.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.filteredQuestions.length > 0) {
        speakVietnamese(state.filteredQuestions[state.currentIndex].question);
      }
    });

    els.btnCardBackTts.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.filteredQuestions.length > 0) {
        speakVietnamese(state.filteredQuestions[state.currentIndex].answer);
      }
    });

    // Window resize - recompute card height if needed
    window.addEventListener('resize', () => {
      if (state.currentMode === 'flashcard') {
        adjustCardHeight();
      }
    });

    // Quiz question count pills
    if (els.quizSizePills) {
      const pills = els.quizSizePills.querySelectorAll('.quiz-size-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const count = parseInt(pill.getAttribute('data-count'), 10);
          if (count === state.quiz.selectedCount && state.quiz.questions.length === count) return;
          initQuiz(count);
          playClickSound();
          showToast(`Đã bắt đầu bài trắc nghiệm ${count} câu 📝`);
        });
      });
    }

    // Quiz restart button
    if (els.btnQuizRestart) {
      els.btnQuizRestart.addEventListener('click', () => {
        initQuiz(state.quiz.selectedCount);
        playClickSound();
        showToast(`Đã tạo bộ đề mới (${state.quiz.selectedCount} câu) 🔀`);
      });
    }

    // Quiz next
    els.btnQuizNext.addEventListener('click', nextQuizQuestion);

    // List expand all
    els.btnExpandAll.addEventListener('click', toggleExpandAll);

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // If typing in search box, ignore hotkeys
      if (document.activeElement === els.searchInput) {
        if (e.key === 'Escape') els.searchInput.blur();
        return;
      }

      if (e.key === 'Escape') {
        els.shortcutsModal.classList.add('hide');
        return;
      }

      if (state.currentMode === 'flashcard') {
        if (e.code === 'Space' || e.key === 'Enter') {
          e.preventDefault();
          flipCard();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextCard();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevCard();
        } else if (e.key === '1') {
          e.preventDefault();
          rateCurrentCard('review');
        } else if (e.key === '3') {
          e.preventDefault();
          rateCurrentCard('mastered');
        } else if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleStarCurrent();
        } else if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          cycleCardFontSize();
        } else if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          els.btnShuffle.click();
        } else if (e.key.toLowerCase() === 'a' && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleAutoplay();
        }
      }

      if (e.key === '?') {
        els.shortcutsModal.classList.toggle('hide');
      }
    });
  }

  // 14. SECURITY / ANTI-INSPECT PROTECTION
  function setupSecurityProtection() {
    // 1. Disable Right-Click Context Menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showToast('⚠️ Chuột phải đã bị khóa để bảo mật đề thi.');
      return false;
    }, true);

    // 2. Disable Content Dragging
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    }, true);

    // 3. Disable DevTools & View Source Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

      // F12 key
      const isF12 = e.key === 'F12' || e.keyCode === 123;

      // Ctrl + Shift + I/J/C or Cmd + Option + I/J/C (Developer Tools)
      const isDevToolsCombo = (e.ctrlKey || (isMac && e.metaKey)) && 
                              (e.shiftKey || (isMac && e.altKey)) && 
                              ['i', 'j', 'c'].includes(e.key.toLowerCase());

      // Ctrl + U or Cmd + Option + U (View Source)
      const isViewSource = (e.ctrlKey || (isMac && (e.metaKey && e.altKey))) && 
                           e.key.toLowerCase() === 'u';

      // Ctrl + S (Save Page)
      const isSavePage = (e.ctrlKey || (isMac && e.metaKey)) && 
                         e.key.toLowerCase() === 's';

      if (isF12 || isDevToolsCombo || isViewSource) {
        e.preventDefault();
        e.stopPropagation();
        showToast('⚠️ Tính năng kiểm tra (DevTools / View Source) đã bị khóa.');
        return false;
      }

      if (isSavePage) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);
  }

  // 15. INITIALIZE
  function init() {
    initTheme();
    initSound();
    initCardFontSize();
    updateCounts();
    applyFilterAndSearch();
    setupEventListeners();
    setupSecurityProtection();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
