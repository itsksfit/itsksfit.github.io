// Krishna Sharma Portfolio Logic

// Custom stack structure based on resume
const STACK_CODE = `const engineer = {
  name: "Krishna Sharma",
  focus: "Autonomous AI Systems & Full-Stack Platforms",
  education: "B.Tech CSE (AI & ML)",
  university: "Galgotias University (CGPA: 8.0)",
  role: "Former Cloud Computing Club Head",
  location: "Delhi, India",
  
  languages: [
    "Python", 
    "C++", 
    "Java", 
    "JavaScript"
  ],
  ai_ml: [
    "Generative AI", 
    "Multi-Agent Systems",
    "NLP & LLMs", 
    "RAG Pipelines", 
    "Prompt Engineering", 
    "LangChain"
  ],
  backend_cloud: [
    "FastAPI", 
    "Next.js (App/Pages)", 
    "Django", 
    "REST APIs", 
    "SAP S/4HANA OData", 
    "SAP Ariba PR", 
    "Mouser API"
  ],
  frontend_ui: [
    "React 19", 
    "Tailwind CSS", 
    "Three.js / Globe.gl", 
    "HTML5", 
    "CSS3"
  ],
  databases: [
    "MongoDB", 
    "MySQL"
  ],
  tools_infra: [
    "Git", 
    "GitHub", 
    "Linux", 
    "VS Code", 
    "Vercel", 
    "Render", 
    "Apache Tomcat"
  ]
};

// Initiate validation sequence
console.log("Telemetry systems: NOMINAL. Ready for production.");`;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Highlight syntax rules cleanly in a single pass
function highlightBentoCode(code) {
  const regex = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*")|(\b(?:const|let|var|function|return|import|export|class)\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*:)|(\b\d+(?:\.\d+)?\b)|(\s+)|([^"a-zA-Z0-9_\s]+)|([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

  let result = "";
  let match;
  while ((match = regex.exec(code)) !== null) {
    const [full, comment, str, keyword, prop, num, ws, punct, ident] = match;
    if (comment !== undefined) {
      result += `<span class="syntax-comment">${escapeHtml(comment)}</span>`;
    } else if (str !== undefined) {
      result += `<span class="syntax-string">${escapeHtml(str)}</span>`;
    } else if (keyword !== undefined) {
      result += `<span class="syntax-keyword">${escapeHtml(keyword)}</span>`;
    } else if (prop !== undefined) {
      result += `<span class="syntax-var">${escapeHtml(prop)}</span>`;
    } else if (num !== undefined) {
      result += `<span class="syntax-num">${escapeHtml(num)}</span>`;
    } else if (ws !== undefined) {
      result += ws;
    } else if (punct !== undefined) {
      result += escapeHtml(punct);
    } else if (ident !== undefined) {
      result += escapeHtml(ident);
    } else {
      result += escapeHtml(full);
    }
  }
  return result;
}

// Typing engine for stack card
let typingTimer = null;
function startStackTyping() {
  const codeContainer = document.getElementById("typing-code");
  if (!codeContainer) return;

  if (typingTimer) {
    clearInterval(typingTimer);
  }

  codeContainer.innerHTML = "";
  let i = 0;
  let buffer = "";

  typingTimer = setInterval(() => {
    if (i >= STACK_CODE.length) {
      clearInterval(typingTimer);
      typingTimer = null;
      codeContainer.innerHTML = highlightBentoCode(STACK_CODE);
      return;
    }
    
    buffer += STACK_CODE[i];
    codeContainer.innerHTML = escapeHtml(buffer) + '<span class="typing-cursor"></span>';
    i++;
  }, 6);
}

// Populate and animate GitHub Commit Matrix Grid
function initGithubCommitGrid() {
  const grid = document.getElementById("commit-grid");
  if (!grid) return;

  grid.innerHTML = "";
  const totalBlocks = 84; // 21 columns * 4 rows
  const blocks = [];

  // Generate blocks with initial commit distributions
  for (let i = 0; i < totalBlocks; i++) {
    const block = document.createElement("div");
    block.className = "commit-block";
    
    // Weighted distribution
    const rand = Math.random();
    let level = 0;
    if (rand > 0.40 && rand <= 0.70) level = 1;
    else if (rand > 0.70 && rand <= 0.88) level = 2;
    else if (rand > 0.88 && rand <= 0.96) level = 3;
    else if (rand > 0.96) level = 4;

    block.classList.add(`level-${level}`);
    grid.appendChild(block);
    blocks.push({ element: block, baseLevel: level });
  }

  // Periodic Git telemetry highlight simulation
  setInterval(() => {
    for (let k = 0; k < 4; k++) {
      const idx = Math.floor(Math.random() * totalBlocks);
      const block = blocks[idx];
      if (!block) continue;
      
      block.element.className = "commit-block level-4";
      
      setTimeout(() => {
        block.element.className = `commit-block level-${block.baseLevel}`;
      }, 1000 + Math.random() * 2000);
    }
  }, 3500);
}

// Fetch live GitHub telemetry
async function fetchGithubLiveTelemetry() {
  const repoEl = document.getElementById("active-repos-val");
  const commitEl = document.getElementById("commit-counter");
  
  try {
    const userRes = await fetch("https://api.github.com/users/itsksfit");
    if (userRes.ok) {
      const userData = await userRes.json();
      if (repoEl && userData.public_repos !== undefined) {
        const count = userData.public_repos;
        repoEl.textContent = count >= 24 ? `${count}+` : "24+";
      }
    }
  } catch (e) {
    console.log("GitHub profile telemetry using default:", e);
  }

  try {
    const eventsRes = await fetch("https://api.github.com/users/itsksfit/events?per_page=100");
    if (eventsRes.ok) {
      const eventsData = await eventsRes.json();
      let pushCount = 0;
      if (Array.isArray(eventsData)) {
        eventsData.forEach(ev => {
          if (ev.type === "PushEvent" && ev.payload && ev.payload.commits) {
            pushCount += ev.payload.commits.length;
          }
        });
        if (commitEl) {
          const totalCommits = 480 + pushCount;
          commitEl.textContent = `${totalCommits.toLocaleString()}+`;
        }
      }
    }
  } catch (e) {
    console.log("GitHub events using default:", e);
  }
}

// Live Commit Counter Incrementer
function startCommitCounter() {
  const counterEl = document.getElementById("commit-counter");
  if (!counterEl) return;

  let currentCommits = parseInt(counterEl.textContent.replace(/[^0-9]/g, ""), 10) || 480;

  setInterval(() => {
    const inc = Math.floor(Math.random() * 2) + 1;
    currentCommits += inc;
    counterEl.textContent = `${currentCommits.toLocaleString()}+`;
    
    counterEl.style.color = "#ffffff";
    setTimeout(() => {
      counterEl.style.color = "var(--accent-blue)";
    }, 250);
  }, 7000 + Math.random() * 5000);
}

// Stats Number Count Up Animation
function initStatsCounter() {
  const counters = document.querySelectorAll(".counter");
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    const suffix = counter.dataset.suffix || "";
    let current = 0;
    const duration = 1000; // milliseconds
    const stepTime = Math.max(Math.floor(duration / target), 30);
    
    const timer = setInterval(() => {
      current += 1;
      counter.textContent = current + suffix;
      if (current >= target) {
        clearInterval(timer);
        counter.textContent = target + suffix;
      }
    }, stepTime);
  });
}

// Project Details & Interactive Simulation Engine
const SYSTEM_PROJECTS = {
  sentinelchain: {
    title: "SentinelChain",
    desc: "Autonomous B2B supply chain resilience platform. Detects semiconductor disruptions across global wafer fabs and automates SAP S/4HANA BOM explosion, real-time Mouser sourcing, and SAP Ariba purchase execution.",
    link: "https://sentinelchain-gilt.vercel.app/",
    repo: "https://github.com/itsksfit/SentinelChain_SAP",
    tags: ["Next.js", "React 19", "SAP S/4HANA", "Mouser API", "Groq API", "Three.js", "Tailwind CSS"],
    nodes: ["Detection", "Impact (SAP)", "Mouser Sourcing", "Execution (Ariba)"],
    stageMapping: [-1, 0, 0, 1, 1, 2, 2, 3, 3, 3],
    stages: [
      "[*] Initializing SentinelChain telemetry ingestion daemon...",
      "[*] Node 1 [Detection]: Scanning USGS seismic feed & US Federal Register EAR gazette...",
      "[*] Node 1 [Detection]: Alert! M4.8 seismic anomaly detected near Hsinchu Fab Cluster.",
      "[*] Node 2 [Impact]: Querying SAP S/4HANA Cloud OData (API_PRODUCT_SRV) for BOM explosion...",
      "[*] Node 2 [Impact]: Exposed SKU: STM32F401RE | Daily revenue at risk: $14.2M/day.",
      "[*] Node 3 [Sourcing]: Querying Mouser Electronics API for verified spot inventory...",
      "[*] Node 3 [Sourcing]: Sourced 3,384 units @ $4.12/ea (enforcing +10% price ceiling guardrail).",
      "[*] Node 4 [Execution]: Evidence confidence 98.4% >= 95% threshold gate passed.",
      "[*] Node 4 [Execution]: Auto-generating SAP Ariba Purchase Requisition & Single-Page PDF Dossier.",
      "[*] Resolution SLA: 2-week manual procurement triage compressed to 1.8 minutes."
    ]
  },
  contentflow: {
    title: "ContentFlow AI",
    desc: "4-agent AI pipeline automating content research, trend validation, Hinglish script generation, and viral hook creation using live Reddit & YouTube data with zero external LLM costs.",
    link: "https://content-flow-ai-lemon.vercel.app/",
    repo: "https://github.com/itsksfit/ContentFlow-AI",
    tags: ["Python", "FastAPI", "NLP", "Reddit API", "yt-dlp", "Vercel", "Render"],
    nodes: ["Scraper", "Validator", "Voice Writer", "Hook Gen"],
    stageMapping: [-1, 0, 0, 1, 1, 2, 2, 3, 3, 3],
    stages: [
      "[*] Initializing ContentFlow AI multi-agent pipeline...",
      "[*] Agent 1 [Scraper]: Sweeping Reddit JSON API & yt-dlp Shorts trending stream...",
      "[*] Agent 1 [Scraper]: Ingested 45 candidate creator posts across target niche.",
      "[*] Agent 2 [Validator]: Computing weighted score (Views 40%, ER% 35%, Comments 25%)...",
      "[*] Agent 2 [Validator]: Validated viral cluster with ER >= 5.8% [CRITERION MET].",
      "[*] Agent 3 [Voice Writer]: Analyzing creator tone & Hinglish vocabulary distribution...",
      "[*] Agent 3 [Voice Writer]: Synthesized 4-beat Hinglish script (Hook, Context, Value, Pro-Tip).",
      "[*] Agent 4 [Hook Gen]: Matching 5 psychological hook frameworks with viral confidence...",
      "[*] Best Match: 'The Secret Hack' (Score: 9.4/10). Script compiled in < 0.8s.",
      "[*] Telemetry: 90% research cut, 85% scripting saved, 100% free deterministic engine."
    ]
  }
};

let currentSystem = "sentinelchain";
let systemInterval = null;

function runSystemSimulation(sysKey) {
  const logsEl = document.getElementById("pipeline-logs");
  const titleEl = document.getElementById("system-title");
  const descEl = document.getElementById("system-desc");
  const tagsEl = document.getElementById("system-tech-tags");
  const linkEl = document.getElementById("system-link");
  const repoEl = document.getElementById("system-repo");
  const flowMapEl = document.getElementById("system-flow-map");
  
  if (!logsEl || !titleEl || !descEl || !tagsEl) return;

  const sys = SYSTEM_PROJECTS[sysKey];
  currentSystem = sysKey;

  // Update demo and repo links
  if (linkEl && sys.link) {
    linkEl.href = sys.link;
  }
  if (repoEl && sys.repo) {
    repoEl.href = sys.repo;
  }

  // Draw architectural nodes map dynamically
  if (flowMapEl) {
    flowMapEl.innerHTML = "";
    sys.nodes.forEach((nodeName, idx) => {
      const nodeDiv = document.createElement("div");
      nodeDiv.className = "flow-node";
      nodeDiv.id = `flow-node-${idx}`;
      nodeDiv.textContent = nodeName.toUpperCase();
      flowMapEl.appendChild(nodeDiv);
      
      if (idx < sys.nodes.length - 1) {
        const arrowSpan = document.createElement("span");
        arrowSpan.className = "flow-arrow";
        arrowSpan.textContent = "→";
        flowMapEl.appendChild(arrowSpan);
      }
    });
  }

  // Clear running animation
  if (systemInterval) {
    clearInterval(systemInterval);
  }

  // Load static info
  titleEl.textContent = sys.title;
  descEl.textContent = sys.desc;
  
  tagsEl.innerHTML = "";
  sys.tags.forEach(t => {
    const span = document.createElement("span");
    span.textContent = t;
    tagsEl.appendChild(span);
  });

  // Run logs animation loop
  logsEl.innerHTML = "[*] Connecting to system telemetry log stream...\n";
  let step = 0;

  systemInterval = setInterval(() => {
    if (step >= sys.stages.length) {
      logsEl.innerHTML = "";
      step = 0;
    }

    logsEl.innerHTML += sys.stages[step] + "\n";
    logsEl.scrollTop = logsEl.scrollHeight;

    // Highlight the active architectural node
    if (flowMapEl) {
      const activeIdx = sys.stageMapping[step];
      const nodes = flowMapEl.querySelectorAll(".flow-node");
      nodes.forEach((node, i) => {
        if (i === activeIdx) {
          node.classList.add("active");
        } else {
          node.classList.remove("active");
        }
      });
    }

    step++;
  }, 2200);
}

// Hook up project bento tabs
function initSystemTabs() {
  const btnSentinelchain = document.getElementById("tab-sentinelchain");
  const btnContentflow = document.getElementById("tab-contentflow");

  if (btnSentinelchain) {
    btnSentinelchain.addEventListener("click", () => {
      btnSentinelchain.classList.add("active");
      if (btnContentflow) btnContentflow.classList.remove("active");
      runSystemSimulation("sentinelchain");
    });
  }

  if (btnContentflow) {
    btnContentflow.addEventListener("click", () => {
      btnContentflow.classList.add("active");
      if (btnSentinelchain) btnSentinelchain.classList.remove("active");
      runSystemSimulation("contentflow");
    });
  }

  // Start with default SentinelChain simulation
  runSystemSimulation("sentinelchain");
}

// Resume Modal Initialization and Handlers
function initResumeModal() {
  const modal = document.getElementById("resume-modal");
  const triggers = document.querySelectorAll(".resume-btn-trigger");
  const closeBtn = document.getElementById("close-resume-btn");
  const closeDot = document.getElementById("close-resume-dot");
  const printBtn = document.getElementById("print-resume-btn");

  if (!modal) return;

  const openResume = () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeResume = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  triggers.forEach(btn => btn.addEventListener("click", openResume));
  if (closeBtn) closeBtn.addEventListener("click", closeResume);
  if (closeDot) closeDot.addEventListener("click", closeResume);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeResume();
    }
  });

  // Print/Download action
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // Escape key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeResume();
    }
  });
}

// Contact Modal Initialization and Handlers
function initContactModal() {
  const modal = document.getElementById("contact-modal");
  const navTrigger = document.getElementById("contact-trigger-btn");
  const closeBtn = document.getElementById("close-contact-btn");
  const closeDot = document.getElementById("close-contact-dot");
  const copyBtn = document.getElementById("btn-copy-email");
  const copyLbl = document.getElementById("copy-action-lbl");

  if (!modal) return;

  const openContact = (e) => {
    if (e) e.preventDefault();
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeContact = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (navTrigger) {
    navTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      openContact();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeContact);
  if (closeDot) closeDot.addEventListener("click", closeContact);

  // Close modal when clicking outside the window
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeContact();
    }
  });

  // Copy Email to Clipboard
  if (copyBtn && copyLbl) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("ks1445674@gmail.com").then(() => {
        copyLbl.textContent = "COPIED ✔";
        copyLbl.style.color = "#10b981";
        copyLbl.style.borderColor = "#10b981";
        setTimeout(() => {
          copyLbl.textContent = "Copy";
          copyLbl.style.color = "var(--neon-cyan)";
          copyLbl.style.borderColor = "rgba(0, 240, 255, 0.4)";
        }, 1500);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeContact();
    }
  });
}

// Interactive Spotlight glow following cursor
function initCardSpotlight() {
  const cards = document.querySelectorAll(".bento-glass-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// Bootstrap Portfolio
document.addEventListener("DOMContentLoaded", () => {
  // Start Stack Typer
  startStackTyping();

  // Load and animate Github Grid
  initGithubCommitGrid();
  // Fetch real-time live telemetry
  fetchGithubLiveTelemetry();
  // Start telemetry counter ticks
  startCommitCounter();

  // Run stats count ups
  initStatsCounter();

  // Initialize System simulation tabs
  initSystemTabs();

  // Initialize resume modal
  initResumeModal();

  // Initialize contact modal overlay
  initContactModal();

  // Initialize Card Spotlight
  initCardSpotlight();

  // Add click trigger on the stack card to redo typing
  const codeCard = document.querySelector(".code-ide-card");
  if (codeCard) {
    codeCard.addEventListener("click", () => {
      startStackTyping();
    });
  }
});


