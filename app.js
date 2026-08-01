// Singapore MRT/LRT Map Quiz - Core Game Logic & Team Multiplayer Engine

class MRTQuizGame {
  constructor() {
    this.allStations = MRT_STATIONS || [];
    this.guessedStationIds = new Set();
    this.timerSeconds = 1800; // default 30 mins
    this.timerInterval = null;
    this.isPaused = false;
    this.isGameOver = false;
    this.soundEnabled = true;

    // Team & Go Big State
    this.teamName = "Team Alpha";
    this.teamMembers = ["Amanda", "Bob", "Charlie"];
    this.isGoBigActive = false;

    // Category Counters
    this.mrtGuessedCount = 0;
    this.lrtGuessedCount = 0;
    this.upcomingGuessedCount = 0;

    // Turf War Line Dominance State (9 Lines)
    this.lineDominanceMap = {
      "NSL": { code: "NSL", name: "North-South Line", total: 27, capturedBy: null },
      "EWL": { code: "EWL", name: "East-West Line", total: 35, capturedBy: null },
      "NEL": { code: "NEL", name: "North-East Line", total: 16, capturedBy: null },
      "CCL": { code: "CCL", name: "Circle Line", total: 30, capturedBy: null },
      "DTL": { code: "DTL", name: "Downtown Line", total: 34, capturedBy: null },
      "TEL": { code: "TEL", name: "Thomson-East Coast Line", total: 32, capturedBy: null },
      "JRL": { code: "JRL", name: "Jurong Region Line", total: 24, capturedBy: null },
      "CRL": { code: "CRL", name: "Cross Island Line", total: 12, capturedBy: null },
      "LRT": { code: "LRT", name: "LRT Network", total: 38, capturedBy: null }
    };

    // Power-Up Deck (10 Cards Total)
    this.globalPowerUpDeck = [
      { id: "c1", type: "sabotage", title: "🚨 Track Disruption #1", desc: "Freeze opponent input for 60s", claimedBy: null },
      { id: "c2", type: "sabotage", title: "🚨 Track Disruption #2", desc: "Freeze opponent input for 60s", claimedBy: null },
      { id: "c3", type: "blindfold", title: "🌫️ Signal Interference #1", desc: "Hide opponent map for 60s", claimedBy: null },
      { id: "c4", type: "blindfold", title: "🌫️ Signal Interference #2", desc: "Hide opponent map for 60s", claimedBy: null },
      { id: "c5", type: "surge", title: "⚡ Points Surge #1", desc: "2x Points on hits for 45s", claimedBy: null },
      { id: "c6", type: "surge", title: "⚡ Points Surge #2", desc: "2x Points on hits for 45s", claimedBy: null },
      { id: "c7", type: "radar", title: "🛰️ Control Radar #1", desc: "Auto-reveal 5 missing stations", claimedBy: null },
      { id: "c8", type: "radar", title: "🛰️ Control Radar #2", desc: "Auto-reveal 5 missing stations", claimedBy: null },
      { id: "c9", type: "hijack", title: "🔄 Interchange Hijack #1", desc: "Steal 10 PTS from leader", claimedBy: null },
      { id: "c10", type: "hijack", title: "🔄 Interchange Hijack #2", desc: "Steal 10 PTS from leader", claimedBy: null }
    ];

    this.completedLines = new Set();
    this.lineBonusPoints = 0;
    this.earnedCardClaims = 0;
    this.claimedCardsCount = 0;
    this.isSurgeActive = false;
    this.isSabotaged = false;
    this.isBlindfolded = false;

    this.aiOpponents = [];
    
    // Zoom & Pan state
    this.scale = 1;
    this.pointX = 0;
    this.pointY = 0;
    this.startX = 0;
    this.startY = 0;

    // Audio synth
    this.audioCtx = null;

    this.initElements();
    this.initEventListeners();
    this.loadSVGMap();
    this.initAudio();
    this.initVoiceRecognition();
    this.initMobileDock();

    this.roomSync = new RoomSyncEngine(this);

    // Auto-open Team Registration modal on boot & pre-fill room code from URL parameter ?room=CODE
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get("room") || urlParams.get("room_code");
    if (roomParam && this.roomSync) {
      this.roomSync.initRoom(roomParam);
    }
    
    setTimeout(() => {
      this.showSetupModal();
    }, 100);
  }

  initElements() {
    this.stationInput = document.getElementById("stationInput");
    this.voiceInputBtn = document.getElementById("voiceInputBtn");
    this.clearInputBtn = document.getElementById("clearInputBtn");
    this.feedbackBanner = document.getElementById("feedbackBanner");
    this.feedbackText = document.getElementById("feedbackText");
    this.activeEffectBanner = document.getElementById("activeEffectBanner");
    this.activeEffectText = document.getElementById("activeEffectText");
    this.mapPanel = document.getElementById("mapPanel");
    
    this.timerDisplay = document.getElementById("timerDisplay");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.soundToggleBtn = document.getElementById("soundToggleBtn");
    this.themeToggleBtn = document.getElementById("themeToggleBtn");
    
    this.overallScoreText = document.getElementById("overallScoreText");
    this.overallProgressBar = document.getElementById("overallProgressBar");
    this.guessedCountText = document.getElementById("guessedCountText");
    
    this.recentHitsList = document.getElementById("recentHitsList");
    this.leaderboardList = document.getElementById("leaderboardList");
    this.tickerList = document.getElementById("tickerList");
    this.turfwarLinesList = document.getElementById("turfwarLinesList");
    
    // Compressed Action Deck & Modal
    this.powerupDeckCard = document.getElementById("powerupDeckCard");
    this.deckSummaryCountText = document.getElementById("deckSummaryCountText");
    this.exhaustedCardsList = document.getElementById("exhaustedCardsList");
    this.viewDeckBtn = document.getElementById("viewDeckBtn");
    this.deckOverviewModal = document.getElementById("deckOverviewModal");
    this.closeDeckModalBtn = document.getElementById("closeDeckModalBtn");
    this.claimEntitlementBanner = document.getElementById("claimEntitlementBanner");
    this.powerupDeckModalGrid = document.getElementById("powerupDeckModalGrid");

    this.svgContainer = document.getElementById("svgContainer");
    this.mapViewport = document.getElementById("mapViewport");
    this.mapViewportWrapper = document.getElementById("mapViewportWrapper");
    
    this.zoomInBtn = document.getElementById("zoomInBtn");
    this.zoomOutBtn = document.getElementById("zoomOutBtn");
    this.zoomResetBtn = document.getElementById("zoomResetBtn");
    
    // Setup Modal
    this.setupModal = document.getElementById("setupModal");
    this.openSetupBtn = document.getElementById("openSetupBtn");
    this.closeSetupBtn = document.getElementById("closeSetupBtn");
    this.startNewGameBtn = document.getElementById("startNewGameBtn");
    this.teamNameInput = document.getElementById("teamNameInput");
    this.teamMembersInput = document.getElementById("teamMembersInput");
    this.roomCodeInput = document.getElementById("roomCodeInput");
    this.goBigToggle = document.getElementById("goBigToggle");
    this.aiOpponentsToggle = document.getElementById("aiOpponentsToggle");
    this.timerSelect = document.getElementById("timerSelect");
    
    // Power-Up Selection Modal
    this.powerUpSelectModal = document.getElementById("powerUpSelectModal");
    this.closePowerUpModalBtn = document.getElementById("closePowerUpModalBtn");
    this.completedLineNameText = document.getElementById("completedLineNameText");
    this.modalPowerUpGrid = document.getElementById("modalPowerUpGrid");

    // Game Over Modal
    this.gameOverModal = document.getElementById("gameOverModal");
    this.closeGameOverBtn = document.getElementById("closeGameOverBtn");
    this.playAgainBtn = document.getElementById("playAgainBtn");
    this.copyResultsBtn = document.getElementById("copyResultsBtn");

    // Breakdown Elements
    this.mrtBreakdownVal = document.getElementById("mrtBreakdownVal");
    this.lrtBreakdownVal = document.getElementById("lrtBreakdownVal");
    this.upcomingBreakdownVal = document.getElementById("upcomingBreakdownVal");
    this.goBigSummaryBanner = document.getElementById("goBigSummaryBanner");

    // Room Match & Countdown Elements
    this.startRoomMatchBtn = document.getElementById("startRoomMatchBtn");
    this.countdownOverlay = document.getElementById("countdownOverlay");
    this.countdownNumber = document.getElementById("countdownNumber");
    this.countdownText = document.getElementById("countdownText");
  }

  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported.");
    }
  }

  playHitSound(st) {
    if (!this.soundEnabled || !this.audioCtx) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    
    osc.type = 'sine';
    const isSpecial = st.is_upcoming || st.is_lrt;
    const baseFreq = isSpecial ? 784 : 523.25;
    osc.frequency.setValueAtTime(baseFreq, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, this.audioCtx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    
    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.25);
  }

  initEventListeners() {
    this.stationInput.addEventListener("input", (e) => this.handleInput(e.target.value));

    this.clearInputBtn.addEventListener("click", () => {
      this.stationInput.value = "";
      this.stationInput.focus();
    });

    this.zoomInBtn.addEventListener("click", () => this.zoom(1.2));
    this.zoomOutBtn.addEventListener("click", () => this.zoom(0.8));
    this.zoomResetBtn.addEventListener("click", () => this.resetZoom());

    this.initPanZoomHandlers();

    this.pauseBtn.addEventListener("click", () => this.togglePause());
    this.soundToggleBtn.addEventListener("click", () => this.toggleSound());
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    }
    
    this.openSetupBtn.addEventListener("click", () => this.showSetupModal());
    this.closeSetupBtn.addEventListener("click", () => this.hideSetupModal());
    this.startNewGameBtn.addEventListener("click", () => this.startNewGame());

    if (this.startRoomMatchBtn) {
      this.startRoomMatchBtn.addEventListener("click", () => {
        if (this.roomSync) {
          this.roomSync.broadcast({ type: 'START_MATCH_SIGNAL' });
        }
        this.triggerSynchronizedCountdown();
      });
    }

    if (this.joinRoomBtn) {
      this.joinRoomBtn.addEventListener("click", () => {
        const code = this.roomCodeInput ? this.roomCodeInput.value : "";
        if (code) {
          this.roomSync.initRoom(code);
          this.hideSetupModal();
        } else {
          alert("Please enter a Room Code (e.g. HAPPYHOUR)");
        }
      });
    }

    if (this.roomBadge) {
      this.roomBadge.addEventListener("click", () => {
        if (this.roomSync && this.roomSync.roomCode) {
          const roomUrl = `${window.location.origin}${window.location.pathname}?room=${encodeURIComponent(this.roomSync.roomCode)}`;
          navigator.clipboard.writeText(roomUrl).then(() => {
            alert(`Shareable Room Link copied to clipboard!\n${roomUrl}`);
          });
        } else {
          this.showSetupModal();
        }
      });
    }

    if (this.viewDeckBtn) this.viewDeckBtn.addEventListener("click", () => this.showDeckOverviewModal());
    if (this.closeDeckModalBtn) this.closeDeckModalBtn.addEventListener("click", () => this.hideDeckOverviewModal());

    if (this.closePowerUpModalBtn) this.closePowerUpModalBtn.addEventListener("click", () => this.hidePowerUpModal());

    if (this.closeGameOverBtn) this.closeGameOverBtn.addEventListener("click", () => this.hideGameOverModal());
    if (this.playAgainBtn) {
      this.playAgainBtn.addEventListener("click", () => {
        this.hideGameOverModal();
        this.showSetupModal();
      });
    }

    if (this.copyResultsBtn) this.copyResultsBtn.addEventListener("click", () => this.copyResultsToClipboard());
  }

  async loadSVGMap() {
    try {
      const resp = await fetch("map.svg");
      if (!resp.ok) throw new Error("Failed to load map.svg");
      const svgText = await resp.text();
      this.svgContainer.innerHTML = svgText;
      
      this.startTimer();
      this.initLeaderboard();
      this.updateDeckSummaryUI();
      this.renderTurfWarDrawer();
    } catch (err) {
      console.error("Error loading SVG map:", err);
      this.svgContainer.innerHTML = `<div class="error-msg">Failed to load SVG map. Please refresh.</div>`;
    }
  }

  initVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (this.voiceInputBtn) {
        this.voiceInputBtn.style.display = "none";
      }
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-SG";

    this.recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript.trim();
        if (transcript) {
          this.handleInput(transcript);
        }
      }
    };

    this.recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      if (event.error !== "no-speech" && event.error !== "aborted") {
        this.stopVoiceListening();
      }
    };

    this.recognition.onend = () => {
      if (this.isVoiceListening) {
        try {
          this.recognition.start();
        } catch (e) {}
      }
    };

    if (this.voiceInputBtn) {
      this.voiceInputBtn.addEventListener("click", () => this.toggleVoiceListening());
    }
  }

  toggleVoiceListening() {
    if (this.isVoiceListening) {
      this.stopVoiceListening();
    } else {
      this.startVoiceListening();
    }
  }

  startVoiceListening() {
    if (!this.recognition) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Safari.");
      return;
    }
    try {
      this.isVoiceListening = true;
      this.recognition.start();
      if (this.voiceInputBtn) {
        this.voiceInputBtn.classList.add("listening");
        this.voiceInputBtn.innerHTML = `<i class="fa-solid fa-microphone-lines pulse"></i>`;
      }
      this.showFeedback("🎙️ Voice input active! Speak MRT station names...", true);
    } catch (err) {
      console.error("Failed to start speech recognition:", err);
    }
  }

  stopVoiceListening() {
    this.isVoiceListening = false;
    if (this.recognition) {
      try { this.recognition.stop(); } catch (e) {}
    }
    if (this.voiceInputBtn) {
      this.voiceInputBtn.classList.remove("listening");
      this.voiceInputBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
    }
  }

  initMobileDock() {
    const dockTabs = document.querySelectorAll(".dock-tab");
    const leftPanel = document.querySelector(".left-panel");
    const mapPanel = document.querySelector(".map-panel");
    const rightPanel = document.querySelector(".right-panel");

    dockTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        dockTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const target = tab.dataset.tab;
        if (window.innerWidth <= 768) {
          if (target === "map") {
            if (mapPanel) mapPanel.style.display = "flex";
            if (leftPanel) leftPanel.style.display = "flex";
            if (rightPanel) rightPanel.style.display = "none";
          } else if (target === "leaderboard" || target === "turfwar" || target === "cards") {
            if (rightPanel) rightPanel.style.display = "flex";
            if (mapPanel) mapPanel.style.display = "none";
            if (leftPanel) leftPanel.style.display = "none";

            if (target === "turfwar") {
              const turfCard = document.querySelector(".turfwar-card");
              if (turfCard) turfCard.scrollIntoView({ behavior: "smooth" });
            } else if (target === "cards") {
              const actionCard = document.querySelector(".action-deck-card");
              if (actionCard) actionCard.scrollIntoView({ behavior: "smooth" });
            } else {
              const lbCard = document.querySelector(".leaderboard-card");
              if (lbCard) lbCard.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        if (leftPanel) leftPanel.style.display = "";
        if (mapPanel) mapPanel.style.display = "";
        if (rightPanel) rightPanel.style.display = "";
      }
    });
  }

  normalizeInput(text) {
    return text.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
  }

  handleInput(rawVal) {
    if (this.isPaused || this.isGameOver || this.isSabotaged || !rawVal) return;
    
    const cleanTyped = this.normalizeInput(rawVal);
    if (!cleanTyped) return;

    let matchedStation = null;

    for (const st of this.allStations) {
      if (this.guessedStationIds.has(st.id)) continue;
      
      const cleanName = this.normalizeInput(st.name);
      if (cleanTyped === cleanName) {
        matchedStation = st;
        break;
      }

      if (st.aliases) {
        for (const alias of st.aliases) {
          if (this.normalizeInput(alias) === cleanTyped) {
            matchedStation = st;
            break;
          }
        }
      }
      if (matchedStation) break;
    }

    if (matchedStation) {
      this.registerCorrectGuess(matchedStation);
      this.stationInput.value = "";
    }
  }

  registerCorrectGuess(st) {
    this.guessedStationIds.add(st.id);

    if (st.is_lrt) {
      this.lrtGuessedCount++;
    } else if (st.is_upcoming) {
      this.upcomingGuessedCount++;
    } else {
      this.mrtGuessedCount++;
    }

    let basePts = st.points || (st.is_upcoming || st.is_lrt ? 2 : 1);
    if (this.isGoBigActive) {
      basePts = basePts * 1.5;
    }
    if (this.isSurgeActive) {
      basePts = basePts * 2;
    }

    this.revealStationInSVG(st);
    this.playHitSound(st);
    this.showBannerHit(st, basePts);
    this.updateProgressUI();
    this.addRecentHit(st, basePts);
    this.updateLeaderboardUserScore();

    // Broadcast live team score update to RoomSyncEngine
    if (this.roomSync) {
      this.roomSync.broadcast({
        type: 'TEAM_SCORE_UPDATE',
        teamName: this.teamName,
        score: this.calculateCurrentScore(),
        members: this.teamMembers,
        isGoBig: this.isGoBigActive
      });
    }

    // Suppressed individual station guesses in ticker to reduce noise; tracked in Recent Guesses sidebar

    // Check Line Completions & First Capture
    this.checkLineCompletions();
    this.renderTurfWarDrawer();

    if (this.guessedStationIds.size === this.allStations.length) {
      this.endGame(true);
    }
  }

  checkLineCompletions() {
    const lines = ["NSL", "EWL", "NEL", "CCL", "DTL", "TEL", "JRL", "CRL", "LRT"];

    lines.forEach(lineCode => {
      const lineData = this.lineDominanceMap[lineCode];
      if (!lineData) return;

      const lineStations = this.allStations.filter(st => 
        (st.line_code === lineCode || (st.lines && st.lines.includes(lineCode))) && 
        (!st.is_upcoming || lineCode === "JRL" || lineCode === "CRL")
      );
      const guessedLineCount = lineStations.filter(st => this.guessedStationIds.has(st.id)).length;

      // FIRST CAPTURE RULE (+15 PTS & Action Card) - 100% COMPLETION VERIFICATION
      if (lineStations.length > 0 && (guessedLineCount >= lineStations.length || guessedLineCount >= lineData.total) && lineData.capturedBy === null) {
        lineData.capturedBy = this.teamName;
        this.completedLines.add(lineCode);
        this.lineBonusPoints += 15; // +15 PTS Dominance Bonus!

        this.addTickerMsg(`🏆 <strong>${this.teamName}</strong> CAPTURED <strong>${lineData.name}</strong> (+15 PTS Dominance Bonus)!`, "system");
        this.updateLeaderboardUserScore();
        this.renderTurfWarDrawer();
        
        // Trigger celebratory confetti burst on the Turf War section!
        this.triggerTurfWarConfetti(lineCode);

        if (this.roomSync) {
          this.roomSync.broadcast({
            type: 'LINE_CAPTURED',
            lineCode: lineCode,
            teamName: this.teamName
          });
        }

        // Increment team's card claim entitlement & update UI
        this.earnedCardClaims++;
        this.updateDeckSummaryUI();

        // Auto pop-up Action Deck modal for team to claim action card
        this.showDeckOverviewModal(lineData.name);
      }
    });
  }

  triggerTurfWarConfetti(lineCode) {
    const container = document.querySelector(".turfwar-card");
    if (!container) return;

    const colors = ["#ffd700", "#ff5722", "#00e5ff", "#e91e63", "#76ff03", "#d500f9", "#ff9100"];
    for (let i = 0; i < 45; i++) {
      const particle = document.createElement("div");
      particle.className = "turfwar-confetti-particle";
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 6;
      const left = Math.random() * 80 + 10;
      const top = Math.random() * 40 + 10;
      const destY = -(Math.random() * 90 + 30);
      const destX = (Math.random() - 0.5) * 140;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size * (Math.random() > 0.5 ? 1 : 0.6)}px;
        background-color: ${color};
        left: ${left}%;
        top: ${top}%;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 1000;
        animation: confettiBurst 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        --dest-x: ${destX}px;
        --dest-y: ${destY}px;
      `;

      container.style.position = "relative";
      container.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1300);
    }
  }

  revealStationInSVG(st) {
    if (!st || !st.id) return;
    const groupElem = document.querySelector(`g[data-station-id="${st.id}"]`);
    if (groupElem) {
      groupElem.classList.remove("station-text-hidden");
      groupElem.classList.add("station-text-revealed");
      if (st.is_upcoming) {
        groupElem.classList.add("upcoming");
      } else if (st.is_lrt) {
        groupElem.classList.add("lrt");
      }
    }
  }

  calculateCurrentScore() {
    let rawScore = 0;
    this.guessedStationIds.forEach(id => {
      const st = this.allStations.find(s => s.id === id);
      if (st) {
        let pts = st.points || (st.is_upcoming || st.is_lrt ? 2 : 1);
        if (this.isGoBigActive) pts *= 1.5;
        rawScore += pts;
      }
    });

    if (this.isGoBigActive) {
      const missingExistingCount = 142 - this.mrtGuessedCount;
      rawScore = rawScore - missingExistingCount;
    }

    rawScore += this.lineBonusPoints;
    return Math.round(rawScore * 10) / 10;
  }

  showBannerHit(st, pts) {
    let bannerClass = 'success';
    let ptsText = `+${pts} PT!`;
    if (st.is_lrt) {
      bannerClass = 'lrt-hit';
      ptsText = `🚆 LRT STATION (+${pts} PTS)!`;
    } else if (st.is_upcoming) {
      bannerClass = 'upcoming-hit';
      ptsText = `✨ FUTURE STATION (+${pts} PTS)!`;
    }

    this.feedbackBanner.className = `feedback-banner ${bannerClass}`;
    this.feedbackText.innerHTML = `<strong>${st.name}</strong> - ${ptsText}`;
    this.feedbackBanner.classList.remove("hidden");

    clearTimeout(this.bannerTimeout);
    this.bannerTimeout = setTimeout(() => {
      this.feedbackBanner.classList.add("hidden");
    }, 2500);
  }

  updateProgressUI() {
    const totalCount = this.allStations.length;
    const guessedCount = this.guessedStationIds.size;
    const maxPoints = this.isGoBigActive ? 477 : (MAX_GAME_POINTS || 318);
    const currScore = this.calculateCurrentScore();
    const pct = Math.max(0, Math.round((currScore / maxPoints) * 100));

    this.overallScoreText.textContent = `${currScore} / ${maxPoints} Pts (${pct}%)`;
    this.overallProgressBar.style.width = `${Math.min(100, pct)}%`;
    this.guessedCountText.textContent = `${guessedCount} / ${totalCount}`;
  }

  addRecentHit(st, pts) {
    const emptyMsg = this.recentHitsList.querySelector(".empty-msg");
    if (emptyMsg) emptyMsg.remove();

    let hitClass = '';
    let pTagClass = 'p1';
    if (st.is_lrt) {
      hitClass = 'lrt-hit';
      pTagClass = 'p2';
    } else if (st.is_upcoming) {
      hitClass = 'upcoming-hit';
      pTagClass = 'p2-upcoming';
    }

    const li = document.createElement("li");
    li.className = `recent-item ${hitClass}`;
    li.innerHTML = `
      <span><strong>${st.name}</strong></span>
      <span class="pts-tag ${pTagClass}">+${pts} PTS</span>
    `;

    this.recentHitsList.insertBefore(li, this.recentHitsList.firstChild);
  }

  renderTurfWarDrawer() {
    this.turfwarLinesList.innerHTML = "";
    Object.values(this.lineDominanceMap).forEach(line => {
      const lineStations = this.allStations.filter(st => 
        (st.line_code === line.code || (st.lines && st.lines.includes(line.code))) && 
        (!st.is_upcoming || line.code === "JRL" || line.code === "CRL")
      );
      const userGuessed = lineStations.filter(st => this.guessedStationIds.has(st.id)).length;
      const pct = Math.min(100, Math.round((userGuessed / line.total) * 100));

      const isCaptured = line.capturedBy !== null;
      let leaderText = `<span>Leading: <strong>None (<5%)</strong></span>`;

      if (isCaptured) {
        leaderText = `<span class="captured-trophy-badge"><i class="fa-solid fa-trophy"></i> Captured by ${line.capturedBy}</span>`;
      } else if (pct >= 5) {
        leaderText = `<span>Leading: <strong>${this.teamName} (${pct}%)</strong></span>`;
      }

      const item = document.createElement("div");
      item.className = `turfwar-line-item ${isCaptured ? 'is-captured' : ''}`;
      item.setAttribute("data-line-code", line.code);
      item.innerHTML = `
        <div class="turfwar-line-header">
          <span class="line-code-badge ${line.code}">${line.code}</span>
          <span class="line-title-name">${line.name}</span>
          <span style="font-size:0.7rem; color:${isCaptured ? '#a0a5b5' : 'var(--text-secondary)'};">${isCaptured ? line.total : Math.min(userGuessed, line.total)}/${line.total}</span>
        </div>
        <div class="turfwar-progress-bar">
          <div class="turfwar-progress-fill ${isCaptured ? 'captured-fill' : ''}" style="width: ${isCaptured ? 100 : pct}%;"></div>
        </div>
        <div class="turfwar-leader-text">
          ${leaderText}
        </div>
      `;
      this.turfwarLinesList.appendChild(item);
    });
  }

  getPendingCardClaims() {
    return Math.max(0, (this.earnedCardClaims || 0) - (this.claimedCardsCount || 0));
  }

  updateDeckSummaryUI() {
    const pending = this.getPendingCardClaims();
    const claimedTotal = this.globalPowerUpDeck.filter(c => c.claimedBy !== null).length;

    if (pending > 0) {
      this.deckSummaryCountText.textContent = `🎁 ${pending} Claim(s) Available!`;
      this.viewDeckBtn.innerHTML = `<i class="fa-solid fa-gift"></i> Claim Card (${pending})`;
      this.viewDeckBtn.className = "btn btn-sm btn-success pulse";
      if (this.powerupDeckCard) this.powerupDeckCard.classList.add("claims-available");
    } else {
      this.deckSummaryCountText.textContent = `${claimedTotal} of 10 Cards Exhausted`;
      this.viewDeckBtn.innerHTML = `<i class="fa-solid fa-layer-group"></i> View Cards`;
      this.viewDeckBtn.className = "btn btn-sm btn-secondary";
      if (this.powerupDeckCard) this.powerupDeckCard.classList.remove("claims-available");
    }

    // Render Exhausted Cards in Sidebar
    if (this.exhaustedCardsList) {
      const exhaustedCards = this.globalPowerUpDeck.filter(c => c.claimedBy !== null);
      this.exhaustedCardsList.innerHTML = "";
      if (exhaustedCards.length === 0) {
        this.exhaustedCardsList.innerHTML = `<li class="empty-exhausted">No cards exhausted yet.</li>`;
      } else {
        exhaustedCards.forEach(card => {
          const li = document.createElement("li");
          li.className = "exhausted-card-item";
          li.innerHTML = `🚫 <strong>${card.title}</strong> (${card.claimedBy})`;
          this.exhaustedCardsList.appendChild(li);
        });
      }
    }
  }

  showDeckOverviewModal(capturedLineName = null) {
    const pending = this.getPendingCardClaims();

    // Render Entitlement Banner
    if (this.claimEntitlementBanner) {
      if (pending > 0) {
        const lineText = capturedLineName ? `🏆 <strong>${capturedLineName}</strong> Captured! ` : '';
        this.claimEntitlementBanner.className = "claim-entitlement-banner active";
        this.claimEntitlementBanner.innerHTML = `${lineText}🎉 YOU HAVE <strong>${pending} CARD CLAIM(S) AVAILABLE</strong> (${this.claimedCardsCount} of ${this.earnedCardClaims} claimed)! Select any available card below to activate its power:`;
      } else {
        this.claimEntitlementBanner.className = "claim-entitlement-banner inactive";
        this.claimEntitlementBanner.innerHTML = `ℹ️ You currently have <strong>0 Card Claims available</strong> (${this.claimedCardsCount} of ${this.earnedCardClaims} claimed). Complete an MRT line to earn a new claim!`;
      }
    }

    // Render 10 Cards in Modal Grid
    this.powerupDeckModalGrid.innerHTML = "";
    this.globalPowerUpDeck.forEach(card => {
      const item = document.createElement("div");
      const isClaimed = card.claimedBy !== null;

      if (isClaimed) {
        item.className = "powerup-card-item exhausted";
        item.innerHTML = `
          <span class="powerup-card-title">${card.title}</span>
          <span class="powerup-card-desc">${card.desc}</span>
          <span class="claimed-badge"><i class="fa-solid fa-ban"></i> EXHAUSTED (Claimed by ${card.claimedBy})</span>
        `;
      } else if (pending > 0) {
        item.className = "powerup-card-item selectable";
        item.innerHTML = `
          <span class="powerup-card-title" style="color:#4ade80;">✨ ${card.title}</span>
          <span class="powerup-card-desc">${card.desc}</span>
          <button class="btn btn-sm btn-success" style="margin-top:0.4rem;"><i class="fa-solid fa-hand-pointer"></i> Claim Card</button>
        `;
        item.addEventListener("click", () => this.claimAndExecuteCard(card));
      } else {
        item.className = "powerup-card-item available";
        item.innerHTML = `
          <span class="powerup-card-title">${card.title}</span>
          <span class="powerup-card-desc">${card.desc}</span>
          <span class="claimed-badge" style="background:rgba(255,255,255,0.05); color:var(--text-secondary); border-color:rgba(255,255,255,0.1);"><i class="fa-solid fa-lock"></i> Unclaimed</span>
        `;
      }

      this.powerupDeckModalGrid.appendChild(item);
    });

    this.deckOverviewModal.classList.remove("hidden");
  }

  hideDeckOverviewModal() {
    this.deckOverviewModal.classList.add("hidden");
  }

  claimAndExecuteCard(card) {
    if (card.claimedBy !== null) return;
    if (this.getPendingCardClaims() <= 0) return;

    card.claimedBy = this.teamName;
    this.claimedCardsCount++;
    this.updateDeckSummaryUI();

    this.addTickerMsg(`⚡ <strong>${this.teamName}</strong> activated <strong>${card.title}</strong>!`, "system");

    if (this.roomSync) {
      this.roomSync.broadcast({
        type: 'ACTION_CARD_ACTIVATED',
        teamName: this.teamName,
        cardId: card.id,
        cardTitle: card.title
      });
    }

    switch (card.type) {
      case "sabotage":
        this.triggerSabotageOpponent();
        break;
      case "blindfold":
        this.triggerBlindfoldOpponent();
        break;
      case "surge":
        this.triggerPointsSurge();
        break;
      case "radar":
        this.triggerControlCenterRadar();
        break;
      case "hijack":
        this.triggerInterchangeHijack();
        break;
    }

    if (this.getPendingCardClaims() > 0) {
      this.showDeckOverviewModal();
    } else {
      this.hideDeckOverviewModal();
    }
  }

  triggerSabotageOpponent() {
    const leadingAI = this.players.find(p => !p.isUser);
    if (leadingAI) {
      this.addTickerMsg(`🚨 Track Disruption applied! <strong>${leadingAI.name}</strong> input frozen for 60 seconds!`, "system");
    }
  }

  triggerBlindfoldOpponent() {
    const leadingAI = this.players.find(p => !p.isUser);
    if (leadingAI) {
      this.addTickerMsg(`🌫️ Signal Interference applied! <strong>${leadingAI.name}</strong> map blindfolded for 60 seconds!`, "system");
    }
  }

  triggerPointsSurge() {
    this.isSurgeActive = true;
    this.activeEffectBanner.className = "active-effect-banner surge";
    this.activeEffectText.innerHTML = `<i class="fa-solid fa-bolt"></i> ⚡ POINTS SURGE: 2x Points Active (45s)!`;
    this.activeEffectBanner.classList.remove("hidden");

    setTimeout(() => {
      this.isSurgeActive = false;
      this.activeEffectBanner.classList.add("hidden");
      this.addTickerMsg(`⚡ Points Surge ended.`, "system");
    }, 45000);
  }

  triggerControlCenterRadar() {
    const missing = this.allStations.filter(st => !this.guessedStationIds.has(st.id));
    if (missing.length === 0) return;

    const shuffled = missing.sort(() => 0.5 - Math.random()).slice(0, 5);
    this.addTickerMsg(`🛰️ Control Center Radar activated! Revealing 5 stations...`, "system");

    shuffled.forEach(st => {
      this.registerCorrectGuess(st);
    });
  }

  triggerInterchangeHijack() {
    const opponents = this.players.filter(p => !p.isUser && p.score >= 10);
    if (opponents.length > 0) {
      const targetAI = opponents[0];
      targetAI.score = Math.max(0, targetAI.score - 10);
      const userP = this.players.find(p => p.isUser);
      if (userP) userP.score += 10;

      this.renderLeaderboard();
      this.addTickerMsg(`🔄 Interchange Hijack! <strong>${this.teamName}</strong> stole 10 PTS from <strong>${targetAI.name}</strong>!`, "system");
    } else {
      this.addTickerMsg(`🔄 Interchange Hijack executed! (+10 Bonus PTS awarded)`, "system");
    }
  }

  initLeaderboard() {
    const isRoomMode = this.roomSync && this.roomSync.roomCode;
    const includeAI = !isRoomMode && this.aiOpponentsToggle && this.aiOpponentsToggle.checked;

    this.players = [
      { id: "user", name: this.teamName, members: this.teamMembers, isGoBig: this.isGoBigActive, score: 0, isUser: true }
    ];

    if (includeAI) {
      this.players.push(
        { id: "ai1", name: "⚡ Speedy Samurais", members: ["Sam", "Alex"], isGoBig: true, score: 0, isUser: false },
        { id: "ai2", name: "🧠 MRT Wizards", members: ["Wei", "Mei"], isGoBig: false, score: 0, isUser: false },
        { id: "ai3", name: "☕ Kopi Masters", members: ["Desmond", "Ben"], isGoBig: false, score: 0, isUser: false }
      );
      this.startAISimulation();
    } else {
      if (this.aiInterval) clearInterval(this.aiInterval);
    }

    this.renderLeaderboard();
  }

  updateLeaderboardUserScore() {
    const userP = this.players.find(p => p.isUser);
    if (userP) {
      userP.score = this.calculateCurrentScore();
      userP.name = this.teamName;
      userP.members = this.teamMembers;
      userP.isGoBig = this.isGoBigActive;
      this.renderLeaderboard();
    }
  }

  // Live Simulation featuring ALL Competitor Teams in Ticker
  startAISimulation() {
    if (this.aiInterval) clearInterval(this.aiInterval);

    this.aiInterval = setInterval(() => {
      if (this.isPaused || this.isGameOver) return;

      const activeAIs = this.players.filter(p => !p.isUser);
      if (Math.random() < 0.55 && activeAIs.length > 0) {
        const randomAI = activeAIs[Math.floor(Math.random() * activeAIs.length)];
        const ptsGain = randomAI.isGoBig ? (Math.random() < 0.3 ? 3 : 1.5) : (Math.random() < 0.3 ? 2 : 1);
        randomAI.score = Math.round((randomAI.score + ptsGain) * 10) / 10;

        // AI score incremented; ticker reserved exclusively for major milestones (line captures & card activations)

        this.renderLeaderboard();
      }
    }, 4500);
  }

  renderLeaderboard() {
    this.players.sort((a, b) => b.score - a.score);

    this.leaderboardList.innerHTML = "";
    this.players.forEach((p, idx) => {
      const rank = idx + 1;
      const item = document.createElement("div");
      item.className = `leaderboard-item ${p.isUser ? 'is-user' : ''}`;
      
      const memberStr = p.members && p.members.length ? p.members.join(", ") : "Solo Player";
      item.setAttribute("title", `Team Members: ${memberStr}`);

      const buffPillHtml = p.isGoBig ? `<span class="buffed-pill"><i class="fa-solid fa-bolt"></i> Buffed</span>` : '';

      item.innerHTML = `
        <span class="player-rank">#${rank}</span>
        <div class="player-info">
          <div class="player-name-row">
            <span class="player-name">${p.name} ${p.isUser ? '(You)' : ''}</span>
            ${buffPillHtml}
          </div>
        </div>
        <span class="player-score">${p.score} pts</span>
      `;
      this.leaderboardList.appendChild(item);
    });
  }

  addTickerMsg(msgHtml, type = "hit") {
    const li = document.createElement("li");
    li.className = `ticker-item ${type}`;
    li.innerHTML = msgHtml;

    this.tickerList.insertBefore(li, this.tickerList.firstChild);
    if (this.tickerList.children.length > 20) {
      this.tickerList.removeChild(this.tickerList.lastChild);
    }
  }

  startTimer() {
    if (this.timerSeconds <= 0) {
      this.timerDisplay.textContent = "∞ Unlimited";
      return;
    }

    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      if (!this.isPaused && !this.isGameOver) {
        this.timerSeconds--;
        this.updateTimerDisplay();
        if (this.timerSeconds <= 0) {
          this.endGame(false);
        }
      }
    }, 1000);
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  updateTimerDisplay() {
    if (this.timerSeconds <= 0) return;
    this.timerDisplay.textContent = this.formatTime(this.timerSeconds);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.pauseBtn.innerHTML = this.isPaused ? `<i class="fa-solid fa-play"></i>` : `<i class="fa-solid fa-pause"></i>`;
    this.stationInput.disabled = this.isPaused;
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.soundToggleBtn.innerHTML = this.soundEnabled ? `<i class="fa-solid fa-volume-high"></i>` : `<i class="fa-solid fa-volume-xmark"></i>`;
  }

  toggleTheme() {
    document.documentElement.classList.toggle("light");
  }

  initPanZoomHandlers() {
    const setTransform = () => {
      this.mapViewport.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(${this.scale})`;
    };

    this.mapViewportWrapper.onmousedown = (e) => {
      e.preventDefault();
      this.startX = e.clientX - this.pointX;
      this.startY = e.clientY - this.pointY;
      this.panning = true;
    };

    this.mapViewportWrapper.onmouseup = () => {
      this.panning = false;
    };

    this.mapViewportWrapper.onmousemove = (e) => {
      e.preventDefault();
      if (!this.panning) return;
      this.pointX = e.clientX - this.startX;
      this.pointY = e.clientY - this.startY;
      setTransform();
    };

    this.mapViewportWrapper.onwheel = (e) => {
      e.preventDefault();
      const xs = (e.clientX - this.pointX) / this.scale;
      const ys = (e.clientY - this.pointY) / this.scale;
      const delta = e.deltaY < 0 ? 1.15 : 0.85;

      this.scale *= delta;
      this.scale = Math.min(Math.max(0.6, this.scale), 4);
      this.pointX = e.clientX - xs * this.scale;
      this.pointY = e.clientY - ys * this.scale;

      setTransform();
    };
  }

  zoom(factor) {
    this.scale *= factor;
    this.scale = Math.min(Math.max(0.6, this.scale), 4);
    this.mapViewport.style.transform = `translate(${this.pointX}px, ${this.pointY}px) scale(${this.scale})`;
  }

  resetZoom() {
    this.scale = 1;
    this.pointX = 0;
    this.pointY = 0;
    this.mapViewport.style.transform = `translate(0px, 0px) scale(1)`;
  }

  showSetupModal() {
    this.setupModal.classList.remove("hidden");
    const urlParams = new URLSearchParams(window.location.search);
    const roomParam = urlParams.get("room") || urlParams.get("room_code");
    const activeRoomCode = (this.roomSync && this.roomSync.roomCode) || roomParam || "";
    if (this.roomCodeInput && activeRoomCode) {
      this.roomCodeInput.value = activeRoomCode.toUpperCase();
    }
    if (this.teamNameInput) {
      setTimeout(() => this.teamNameInput.focus(), 150);
    }
  }

  hideSetupModal() {
    this.setupModal.classList.add("hidden");
  }

  startNewGame(isActualMatchStart = false) {
    this.teamName = this.teamNameInput.value.trim() || "Team Alpha";
    
    const rawMembers = this.teamMembersInput.value.trim();
    this.teamMembers = rawMembers ? rawMembers.split(",").map(m => m.trim()).filter(Boolean) : ["Amanda"];

    this.isGoBigActive = this.goBigToggle.checked;
    this.timerSeconds = parseInt(this.timerSelect.value, 10);
    
    // Auto-connect room if a room code is specified in the setup modal
    const roomCode = this.roomCodeInput ? this.roomCodeInput.value.trim() : "";
    if (roomCode && this.roomSync && (!this.roomSync.roomCode || this.roomSync.roomCode !== roomCode.toUpperCase())) {
      this.roomSync.initRoom(roomCode);
    }

    const isRoomMode = this.roomSync && !!this.roomSync.roomCode;

    // Reset Line Dominance & Cards Deck
    Object.values(this.lineDominanceMap).forEach(l => l.capturedBy = null);
    this.globalPowerUpDeck.forEach(c => c.claimedBy = null);
    this.completedLines.clear();
    this.lineBonusPoints = 0;
    this.earnedCardClaims = 0;
    this.claimedCardsCount = 0;

    this.mrtGuessedCount = 0;
    this.lrtGuessedCount = 0;
    this.upcomingGuessedCount = 0;
    this.guessedStationIds.clear();
    this.isGameOver = false;
    this.isPaused = false;
    
    document.querySelectorAll(".station-text-group").forEach(g => {
      g.classList.remove("station-text-revealed");
      g.classList.add("station-text-hidden");
    });

    this.recentHitsList.innerHTML = `<li class="empty-msg">No stations guessed yet. Start typing!</li>`;
    this.updateProgressUI();

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.initLeaderboard();
    this.updateDeckSummaryUI();
    this.renderTurfWarDrawer();

    this.hideSetupModal();

    if (isRoomMode && !isActualMatchStart) {
      // WAITING LOBBY MODE - Timer paused, inputs locked until Start Match for All
      this.isRoomLobbyWaiting = true;
      this.stationInput.disabled = true;
      this.stationInput.value = "";
      this.stationInput.placeholder = "⏳ Waiting for Host to click 'Start Match for All'...";
      this.timerDisplay.textContent = this.formatTime(this.timerSeconds);
      
      this.feedbackBanner.className = "feedback-banner upcoming-hit";
      this.feedbackText.innerHTML = `<strong>⏳ ROOM #${this.roomSync.roomCode} LOBBY</strong> — Registered "<strong>${this.teamName}</strong>"! Waiting for Host to click <strong>"Start Match for All"</strong>.`;
      this.feedbackBanner.classList.remove("hidden");
    } else {
      // START ACTUAL MATCH
      this.isRoomLobbyWaiting = false;
      this.startTimer();
      this.stationInput.disabled = false;
      this.stationInput.value = "";
      this.stationInput.placeholder = "e.g. Orchard, Dhoby Ghaut, Riviera, Tengah...";
      this.stationInput.focus();
      this.feedbackBanner.classList.add("hidden");
    }
  }

  triggerSynchronizedCountdown() {
    if (!this.countdownOverlay) return;
    this.countdownOverlay.classList.remove("hidden");
    
    let count = 3;
    this.countdownNumber.textContent = count;
    this.countdownText.textContent = "GET READY!";
    this.playHitSound({ points: 2 });

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        this.countdownNumber.textContent = count;
        this.playHitSound({ points: 2 });
      } else if (count === 0) {
        this.countdownNumber.textContent = "GO!";
        this.countdownText.textContent = "MATCH STARTED!";
        this.playHitSound({ points: 5 });
      } else {
        clearInterval(interval);
        this.countdownOverlay.classList.add("hidden");
        this.startNewGame(true);
      }
    }, 1000);
  }

  endGame(isWin = false) {
    this.isGameOver = true;
    if (this.timerInterval) clearInterval(this.timerInterval);

    if (isWin && window.confetti) {
      window.confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }

    this.showGameOverModal(isWin);
  }

  showGameOverModal(isWin) {
    const finalScore = this.calculateCurrentScore();
    const maxPoints = this.isGoBigActive ? 477 : (MAX_GAME_POINTS || 318);

    document.getElementById("finalScoreVal").textContent = `${finalScore} / ${maxPoints} Pts`;
    document.getElementById("finalStationsVal").textContent = `${this.guessedStationIds.size} / ${this.allStations.length}`;

    const userRank = this.players.findIndex(p => p.isUser) + 1;
    document.getElementById("finalRankVal").textContent = `#${userRank}`;

    this.mrtBreakdownVal.textContent = `${this.mrtGuessedCount} / 142`;
    this.lrtBreakdownVal.textContent = `${this.lrtGuessedCount} / 38`;
    this.upcomingBreakdownVal.textContent = `${this.upcomingGuessedCount} / 50`;

    if (this.isGoBigActive) {
      const missingExisting = 142 - this.mrtGuessedCount;
      let rawHitPoints = 0;
      this.guessedStationIds.forEach(id => {
        const st = this.allStations.find(s => s.id === id);
        if (st) {
          let pts = st.points || (st.is_upcoming || st.is_lrt ? 2 : 1);
          rawHitPoints += (pts * 1.5);
        }
      });
      rawHitPoints = Math.round(rawHitPoints * 10) / 10;

      this.goBigSummaryBanner.innerHTML = `
        <div><i class="fa-solid fa-bolt"></i> <strong>⚡ "Buffed" Mode Calculation:</strong></div>
        <div style="margin-top:0.3rem;">
          • Station Hits (1.5x Multiplier): <strong>+${rawHitPoints} Pts</strong><br/>
          • Line Capture Dominance Bonus: <strong>+${this.lineBonusPoints} Pts</strong><br/>
          • Missing Existing MRT Penalty (-1 Pt x ${missingExisting}): <strong style="color:#ff7043;">-${missingExisting} Pts</strong><br/>
          • Net Final Score: <strong>${finalScore} Pts</strong>
        </div>
      `;
      this.goBigSummaryBanner.classList.remove("hidden");
    } else {
      this.goBigSummaryBanner.classList.add("hidden");
    }

    const missedList = document.getElementById("missedListContainer");
    missedList.innerHTML = "";
    const missed = this.allStations.filter(st => !this.guessedStationIds.has(st.id));

    if (missed.length === 0) {
      missedList.innerHTML = `<div class="win-msg">🎉 Perfect Score! You guessed all ${this.allStations.length} stations!</div>`;
    } else {
      const LINE_META = {
        "NSL": { name: "North-South Line", color: "#e53935", badge: "NSL" },
        "EWL": { name: "East-West Line", color: "#43a047", badge: "EWL" },
        "NEL": { name: "North-East Line", color: "#8e24aa", badge: "NEL" },
        "CCL": { name: "Circle Line", color: "#fb8c00", badge: "CCL" },
        "DTL": { name: "Downtown Line", color: "#1e88e5", badge: "DTL" },
        "TEL": { name: "Thomson-East Coast Line", color: "#8d6e63", badge: "TEL" },
        "JRL": { name: "Jurong Region Line", color: "#00897b", badge: "JRL" },
        "CRL": { name: "Cross Island Line", color: "#7cb342", badge: "CRL" },
        "LRT": { name: "LRT Network", color: "#78909c", badge: "LRT" }
      };

      const groupedByLine = {};
      const lineOrder = ["NSL", "EWL", "NEL", "CCL", "DTL", "TEL", "JRL", "CRL", "LRT"];

      missed.forEach(st => {
        const lineCode = st.line_code || (st.lines && st.lines[0]) || (st.is_lrt ? "LRT" : "OTHER");
        if (!groupedByLine[lineCode]) groupedByLine[lineCode] = [];
        groupedByLine[lineCode].push(st);
      });

      lineOrder.forEach(code => {
        const stationsInLine = groupedByLine[code];
        if (!stationsInLine || stationsInLine.length === 0) return;

        const meta = LINE_META[code] || { name: code, color: "#999", badge: code };

        const groupEl = document.createElement("div");
        groupEl.className = "missed-line-group";

        const headerEl = document.createElement("div");
        headerEl.className = "missed-line-header";
        headerEl.style.borderLeftColor = meta.color;
        headerEl.innerHTML = `<span class="line-badge" style="background-color:${meta.color};">${meta.badge}</span> <span class="line-name-title">${meta.name}</span> <span class="line-missed-count">(${stationsInLine.length} missed)</span>`;
        groupEl.appendChild(headerEl);

        const chipsWrapper = document.createElement("div");
        chipsWrapper.className = "missed-chips-wrapper";

        stationsInLine.forEach(st => {
          const chip = document.createElement("span");
          let chipClass = "";
          if (st.is_lrt) chipClass = "lrt";
          else if (st.is_upcoming) chipClass = "upcoming";

          chip.className = `missed-chip ${chipClass}`;
          chip.textContent = st.name;
          chipsWrapper.appendChild(chip);
        });

        groupEl.appendChild(chipsWrapper);
        missedList.appendChild(groupEl);
      });

      Object.keys(groupedByLine).forEach(code => {
        if (lineOrder.includes(code)) return;
        const stationsInLine = groupedByLine[code];
        if (!stationsInLine || stationsInLine.length === 0) return;

        const groupEl = document.createElement("div");
        groupEl.className = "missed-line-group";

        const headerEl = document.createElement("div");
        headerEl.className = "missed-line-header";
        headerEl.style.borderLeftColor = "#999";
        headerEl.innerHTML = `<span class="line-badge" style="background-color:#999;">${code}</span> <span class="line-name-title">${code}</span> <span class="line-missed-count">(${stationsInLine.length} missed)</span>`;
        groupEl.appendChild(headerEl);

        const chipsWrapper = document.createElement("div");
        chipsWrapper.className = "missed-chips-wrapper";

        stationsInLine.forEach(st => {
          const chip = document.createElement("span");
          chip.className = `missed-chip ${st.is_lrt ? "lrt" : st.is_upcoming ? "upcoming" : ""}`;
          chip.textContent = st.name;
          chipsWrapper.appendChild(chip);
        });

        groupEl.appendChild(chipsWrapper);
        missedList.appendChild(groupEl);
      });
    }

    this.gameOverModal.classList.remove("hidden");
  }

  hideGameOverModal() {
    this.gameOverModal.classList.add("hidden");
  }

  copyResultsToClipboard() {
    const finalScore = this.calculateCurrentScore();
    const maxPoints = this.isGoBigActive ? 477 : (MAX_GAME_POINTS || 318);
    const text = `🚇 SG MRT/LRT Map Quiz Results!\nTeam: ${this.teamName} (${this.teamMembers.join(", ")})\nScore: ${finalScore}/${maxPoints} Pts (${this.guessedStationIds.size}/${this.allStations.length} Stations)\nRank: #${this.players.findIndex(p => p.isUser) + 1}\nMode: ${this.isGoBigActive ? '⚡ Buffed (1.5x / -1)' : 'Standard'}`;
    navigator.clipboard.writeText(text).then(() => {
      alert("Results copied to clipboard!");
    });
  }
}

class RoomSyncEngine {
  constructor(game) {
    this.game = game;
    this.peer = null;
    this.mqttClient = null;
    this.connections = [];
    this.roomCode = null;
    this.broadcastChannel = null;
    this.myClientId = Math.random().toString(36).substring(2, 9);
  }

  initRoom(roomCode) {
    if (!roomCode) return;
    this.roomCode = roomCode.toUpperCase().trim();

    // 1. BroadcastChannel for local tabs sync
    if (window.BroadcastChannel) {
      if (this.broadcastChannel) this.broadcastChannel.close();
      this.broadcastChannel = new BroadcastChannel(`mrt-room-${this.roomCode}`);
      this.broadcastChannel.onmessage = (event) => this.handleMessage(event.data);
    }

    // 2. MQTT over WebSocket Sync (Guarantees multi-device / multi-laptop room sync through firewalls)
    if (typeof mqtt !== 'undefined') {
      try {
        if (this.mqttClient) this.mqttClient.end();
        this.mqttClient = mqtt.connect('wss://broker.emqx.io:8084/mqtt', {
          clientId: `sg_mrt_${this.myClientId}`,
          keepalive: 30,
          clean: true,
          reconnectPeriod: 2000
        });

        const topic = `shopee/sg-mrt-quiz/room/${this.roomCode}`;

        this.mqttClient.on('connect', () => {
          console.log(`Connected to MQTT WebSocket broker for Room #${this.roomCode}`);
          this.mqttClient.subscribe(topic);
          // Broadcast presence & initial score on connect
          this.broadcast({
            type: 'TEAM_SCORE_UPDATE',
            teamName: this.game.teamName,
            score: this.game.calculateCurrentScore(),
            members: this.game.teamMembers,
            isGoBig: this.game.isGoBigActive,
            senderId: this.myClientId
          });
        });

        this.mqttClient.on('message', (t, message) => {
          try {
            const packet = JSON.parse(message.toString());
            if (packet.senderId !== this.myClientId) {
              this.handleMessage(packet);
            }
          } catch(e){}
        });
      } catch (e) {
        console.warn("MQTT init fallback:", e);
      }
    }

    // 3. PeerJS WebRTC P2P Fallback
    if (typeof Peer !== 'undefined') {
      try {
        const peerId = `sg-mrt-peer-${this.roomCode}-${this.myClientId}`;
        if (this.peer) this.peer.destroy();
        this.peer = new Peer(peerId, { debug: 0 });

        this.peer.on('open', (id) => {
          const hostId = `sg-mrt-host-${this.roomCode}`;
          const conn = this.peer.connect(hostId);
          this.setupConnection(conn);
        });

        this.peer.on('connection', (conn) => {
          this.setupConnection(conn);
        });

        try {
          const hostPeer = new Peer(`sg-mrt-host-${this.roomCode}`, { debug: 0 });
          hostPeer.on('connection', (conn) => this.setupConnection(conn));
        } catch(e){}
      } catch (e) {}
    }

    this.updateRoomUIConnected();
    if (this.game) {
      this.game.initLeaderboard();
      if (!this.game.isMatchStarted) {
        this.game.stationInput.disabled = true;
        this.game.stationInput.value = "";
        this.game.stationInput.placeholder = "⏳ Waiting for Host to click 'Start Match for All'...";
        if (this.game.timerInterval) clearInterval(this.game.timerInterval);
        this.game.timerDisplay.textContent = this.game.formatTime(this.game.timerSeconds);
        this.game.feedbackBanner.className = "feedback-banner upcoming-hit";
        this.game.feedbackText.innerHTML = `<strong>⏳ ROOM #${this.roomCode} WAITING LOBBY</strong> — Connected! Click <strong>"Start Match for All"</strong> when everyone is ready.`;
        this.game.feedbackBanner.classList.remove("hidden");
      }
      this.game.addTickerMsg(`🌐 Connected to Live Online Room <strong>#${this.roomCode}</strong>!`, "system");
    }
  }

  setupConnection(conn) {
    conn.on('open', () => {
      this.connections.push(conn);
      conn.send({
        type: 'TEAM_SCORE_UPDATE',
        teamName: this.game.teamName,
        score: this.game.calculateCurrentScore(),
        members: this.game.teamMembers,
        isGoBig: this.game.isGoBigActive
      });
    });

    conn.on('data', (data) => this.handleMessage(data));
    conn.on('close', () => {
      this.connections = this.connections.filter(c => c !== conn);
    });
  }

  broadcast(packet) {
    if (!packet) return;
    packet.senderId = this.myClientId;

    if (this.broadcastChannel) {
      try { this.broadcastChannel.postMessage(packet); } catch(e){}
    }

    if (this.mqttClient && this.mqttClient.connected) {
      try {
        const topic = `shopee/sg-mrt-quiz/room/${this.roomCode}`;
        this.mqttClient.publish(topic, JSON.stringify(packet));
      } catch(e){}
    }

    this.connections.forEach(conn => {
      try { if (conn.open) conn.send(packet); } catch(e){}
    });
  }

  handleMessage(packet) {
    if (!packet || !packet.type) return;

    switch(packet.type) {
      case 'TEAM_SCORE_UPDATE':
        if (packet.teamName && packet.teamName !== this.game.teamName) {
          let player = this.game.players.find(p => p.name === packet.teamName);
          let isNewPlayer = !player;
          if (!player) {
            player = {
              id: `p-${Math.random().toString(36).substring(2, 7)}`,
              name: packet.teamName,
              members: packet.members || [],
              score: packet.score || 0,
              isGoBig: packet.isGoBig || false,
              isUser: false
            };
            this.game.players.push(player);
          } else {
            player.score = packet.score || 0;
            player.isGoBig = packet.isGoBig || false;
            if (packet.members) player.members = packet.members;
          }
          this.game.renderLeaderboard();

          if (isNewPlayer && !packet.isReply) {
            this.broadcast({
              type: 'TEAM_SCORE_UPDATE',
              teamName: this.game.teamName,
              score: this.game.calculateCurrentScore(),
              members: this.game.teamMembers,
              isGoBig: this.game.isGoBigActive,
              isReply: true
            });
          }
        }
        break;

      case 'LINE_CAPTURED':
        if (packet.lineCode && this.game.lineDominanceMap[packet.lineCode]) {
          const lineData = this.game.lineDominanceMap[packet.lineCode];
          if (lineData.capturedBy === null) {
            lineData.capturedBy = packet.teamName;
            this.game.completedLines.add(packet.lineCode);
            this.game.renderTurfWarDrawer();
            this.game.triggerTurfWarConfetti(packet.lineCode);
            this.game.addTickerMsg(`🏆 <strong>${packet.teamName}</strong> CAPTURED <strong>${lineData.name}</strong>!`, "system");
          }
        }
        break;

      case 'ACTION_CARD_ACTIVATED':
        if (packet.cardTitle) {
          this.game.addTickerMsg(`⚡ <strong>${packet.teamName}</strong> activated <strong>${packet.cardTitle}</strong>!`, "system");
        }
        break;

      case 'START_MATCH_SIGNAL':
        this.game.addTickerMsg(`🚀 Match start signal received! Starting countdown...`, "system");
        this.game.triggerSynchronizedCountdown();
        break;
    }
  }

  updateRoomUIConnected() {
    const roomBadge = document.getElementById("roomBadge");
    const roomStatusText = document.getElementById("roomStatusText");
    if (roomBadge && roomStatusText && this.roomCode) {
      roomBadge.className = "room-badge connected";
      roomStatusText.innerHTML = `Room: <strong>#${this.roomCode}</strong>`;
    }
    if (this.game && this.game.startRoomMatchBtn) {
      this.game.startRoomMatchBtn.classList.remove("hidden");
    }
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.game = new MRTQuizGame();
});
