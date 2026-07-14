// Krishna Sharma Portfolio Logic

// Custom stack structure based on resume
const STACK_CODE = `const engineer = {
  name: "Krishna Sharma",
  focus: "AI/ML & Backend Systems",
  education: "B.Tech CSE (AI & ML)",
  university: "Galgotias University (CGPA: 8.0)",
  role: "Cloud Computing Club Head",
  creator: "Lifestyle & Fun Content Creator",
  
  languages: [
    "Python", 
    "C++", 
    "Java", 
    "JavaScript"
  ],
  ai_ml: [
    "Machine Learning", 
    "NLP", 
    "Generative AI", 
    "RAG", 
    "LangGraph", 
    "Prompt Engineering"
  ],
  frameworks: [
    "FastAPI", 
    "LangChain", 
    "NumPy", 
    "Pandas", 
    "Matplotlib"
  ],
  databases: [
    "MySQL", 
    "MongoDB"
  ],
  dev_tools: [
    "Git", 
    "GitHub", 
    "Linux", 
    "VS Code", 
    "Tomcat"
  ]
};

// Initiate validation sequence
console.log("Telemetry systems: NOMINAL");`;

// Highlight syntax rules for bento code block
function highlightBentoCode(text) {
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Highlight Comments
  escaped = escaped.replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>');
  
  // Highlight Strings
  escaped = escaped.replace(/("(?:\\.|[^"\\])*")/g, '<span class="syntax-string">$1</span>');
  
  // Highlight Keywords
  escaped = escaped.replace(/\b(const|let|var|function|return|import|export|class)\b/g, '<span class="syntax-keyword">$1</span>');
  
  // Highlight Objects/Keys
  escaped = escaped.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*:)/g, '<span class="syntax-var">$1</span>');

  return escaped;
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
    codeContainer.innerHTML = buffer.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '<span class="typing-cursor"></span>';
    i++;
  }, 8);
}


// Live Commit Counter Incrementer
function startCommitCounter() {
  const counterEl = document.getElementById("commit-counter");
  if (!counterEl) return;

  let currentCommits = 95;
  counterEl.textContent = currentCommits.toLocaleString();

  setInterval(() => {
    const inc = Math.floor(Math.random() * 3) + 1;
    currentCommits += inc;
    counterEl.textContent = currentCommits.toLocaleString();
    
    counterEl.style.color = "#ffffff";
    setTimeout(() => {
      counterEl.style.color = "var(--accent-blue)";
    }, 250);
  }, 5000 + Math.random() * 4000);
}

// Stats Number Count Up Animation
function initStatsCounter() {
  const counters = document.querySelectorAll(".counter");
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10);
    let current = 0;
    const duration = 1000; // milliseconds
    const stepTime = Math.max(Math.floor(duration / target), 30);
    
    const timer = setInterval(() => {
      current += 1;
      counter.textContent = current;
      if (current >= target) {
        clearInterval(timer);
        counter.textContent = target;
      }
    }, stepTime);
  });
}

// Project Details & Interactive Simulation Engine
const SYSTEM_PROJECTS = {
  contentflow: {
    title: "ContentFlow AI",
    desc: "Built a 4-agent AI pipeline automating content research, validation, script generation, and viral hook creation via real-time Reddit & YouTube trend analysis. Integrates a Hinglish script builder.",
    link: "https://content-flow-ai-lemon.vercel.app/",
    tags: ["Python", "FastAPI", "NLP", "LangChain", "Reddit API", "yt-dlp"],
    nodes: ["Researcher", "Validator", "Scriptwriter", "Optimizer"],
    stageMapping: [-1, 0, 0, 1, 1, 2, 2, 3, 3, 3],
    stages: [
      "[*] Booting ContentFlow Agent Core...",
      "[*] Agent 1 [Researcher]: Sweeping subreddits & youtube trending charts...",
      "[*] Agent 1 [Researcher]: Discovered trend: \"Generative AI for local indexing\"",
      "[*] Agent 2 [Validator]: Computing engagement validation scoring metrics...",
      "[*] Agent 2 [Validator]: Score = 89/100 [CRITERION MET]",
      "[*] Agent 3 [Scriptwriter]: Synthesizing Hinglish script outline...",
      "[*] Agent 3 [Scriptwriter]: Structured 3 hook variants & transcript logs.",
      "[*] Agent 4 [Optimizer]: Compiling viral hook parameters...",
      "[*] Pipeline Success: Dispatching script file in under 0.8 seconds.",
      "[*] Telemetry: 90% research cut / 85% script write effort saved."
    ]
  },
  automarketer: {
    title: "AutoMarketer AI",
    desc: "Marketing automation engine that crawls website URLs, extracts brand themes, and generates captions and image prompts using LLaMA 3.3. Integrates FLUX.1 for image synthesis.",
    link: "https://automarketer-ai.onrender.com/",
    tags: ["Python", "FastAPI", "MongoDB", "Groq API", "FLUX.1", "BeautifulSoup"],
    nodes: ["Scraper", "LLaMA 3.3", "Cache", "FLUX.1"],
    stageMapping: [-1, 0, 0, 1, 2, 3, 3, 3],
    stages: [
      "[*] AutoMarketer AI initialization online.",
      "[*] Scraper Engine: Fetching brand schema from target URL...",
      "[*] Scraper Engine: Payload received, parsed tags successfully.",
      "[*] LLaMA 3.3 (via Groq): Constructing brand messaging captions...",
      "[*] Cache system check: Cache hit. Eliminating redundant API call.",
      "[*] FLUX.1 (Hugging Face): Synthesizing AI-generated image prompt...",
      "[*] Motor Async Driver: Logging campaign history in MongoDB Atlas...",
      "[*] Campaign status: Deployed successfully. Metrics synced."
    ]
  }
};

let currentSystem = "contentflow";
let systemInterval = null;

function runSystemSimulation(sysKey) {
  const logsEl = document.getElementById("pipeline-logs");
  const titleEl = document.getElementById("system-title");
  const descEl = document.getElementById("system-desc");
  const tagsEl = document.getElementById("system-tech-tags");
  const linkEl = document.getElementById("system-link");
  const flowMapEl = document.getElementById("system-flow-map");
  
  if (!logsEl || !titleEl || !descEl || !tagsEl) return;

  const sys = SYSTEM_PROJECTS[sysKey];
  currentSystem = sysKey;

  // Update link if present
  if (linkEl && sys.link) {
    linkEl.href = sys.link;
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
  const btnContentflow = document.getElementById("tab-contentflow");
  const btnAutomarketer = document.getElementById("tab-automarketer");

  if (!btnContentflow || !btnAutomarketer) return;

  btnContentflow.addEventListener("click", () => {
    btnContentflow.classList.add("active");
    btnAutomarketer.classList.remove("active");
    runSystemSimulation("contentflow");
  });

  btnAutomarketer.addEventListener("click", () => {
    btnAutomarketer.classList.add("active");
    btnContentflow.classList.remove("active");
    runSystemSimulation("automarketer");
  });

  // Start with default ContentFlow AI simulation
  runSystemSimulation("contentflow");
}

// Contact Modal Initialization and Handlers
function initContactModal() {
  const modal = document.getElementById("contact-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  const closeDotRed = document.getElementById("close-modal-dot-red");
  const copyBtn = document.getElementById("btn-copy-email");
  const copyLbl = document.getElementById("copy-action-lbl");

  if (!modal) return;

  // Intercept all mailto links
  document.querySelectorAll('a[href^="mailto:ks1445674"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.add("active");
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (closeDotRed) closeDotRed.addEventListener("click", closeModal);

  // Close modal when clicking outside the window
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Copy Email to Clipboard
  if (copyBtn && copyLbl) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("ks1445674@gmail.com").then(() => {
        copyLbl.textContent = "COPIED ✔";
        copyLbl.style.color = "#22c55e";
        copyLbl.style.borderColor = "#22c55e";
        setTimeout(() => {
          copyLbl.textContent = "COPY";
          copyLbl.style.color = "var(--accent-blue)";
          copyLbl.style.borderColor = "var(--accent-blue)";
        }, 1500);
      }).catch(err => {
        console.error("Failed to copy text: ", err);
      });
    });
  }
}

// Bootstrap Portfolio
document.addEventListener("DOMContentLoaded", () => {
  // Start Stack Typer
  startStackTyping();



  // Start telemetry counter ticks
  startCommitCounter();

  // Run stats count ups
  initStatsCounter();

  // Initialize System simulation tabs
  initSystemTabs();

  // Initialize contact modal overlay
  initContactModal();

  // Add click trigger on the stack card to redo typing
  const stackCard = document.querySelector(".current-stack-card");
  if (stackCard) {
    stackCard.addEventListener("click", () => {
      startStackTyping();
    });
  }
});
