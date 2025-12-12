/* =====================================================
   CARD LOADER — UBT
   - Tüm kart component'leri burada tanımlanır
   - Sayfalar sadece "hangi kartlar?" der
   - Navigation MANUAL kalır (senin kontrolün)
   ===================================================== */

(function () {
  /* =====================================================
     1) INTERNAL REGISTRY
     - register(): kart template'lerini kaydeder
     - renderInto(): seçilen kartları root'a basar
     ===================================================== */

  // -----------------------------
  // Registry (name -> templateFn)
  // -----------------------------
  const registry = {};

  /**
   * Register a card template function by name.
   * @param {string} name
   * @param {() => string} templateFn
   */
  function register(name, templateFn) {
    registry[name] = templateFn;
  }

  /**
   * Render selected cards into a container element.
   * @param {string} rootId - element id (e.g. "cards-root")
   * @param {string[]} cardNames - registered card keys
   */
  function renderInto(rootId, cardNames) {
    const root = document.getElementById(rootId);
    if (!root) return;

    const html = cardNames
      .map((name) => (registry[name] ? registry[name]() : missingCard(name)))
      .join("\n");

    root.innerHTML = html;
  }
  /* END of block: Internal Registry */


  /* =====================================================
     2) FALLBACKS + HELPERS
     - missingCard(): kart bulunamazsa uyarı kartı basar
     - escapeHtml(): XSS / kırılma önler
     ===================================================== */

  function missingCard(name) {
    return `
      <div class="detail-card card-color-5">
        <h2 class="section-title">Missing card: ${escapeHtml(name)}</h2>
        <p>Card is not registered in card-loader.js</p>
      </div>
      <!-- END of block: Missing Card -->
    `;
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
  /* END of block: Fallbacks + Helpers */


  /* =====================================================
     3) CARD TEMPLATES (PLACEHOLDERS)
     - ID'ler navigation ile eşleşmeli
     - Sınıflar mevcut CSS ile uyumlu
     ===================================================== */


  /* =====================================================
     CARD: HERO (RECRUITER)
     ===================================================== */
  register("heroRecruiter", () => `
    <div id="hero" class="card hero-card">
      <div class="hero-top">
        <div class="hero-logo-box">
          <img src="/ubtlogo.png" class="hero-logo" alt="UBT logo" />
          <span class="hero-domain">ubterzioglu.de</span>
        </div>
        <a href="index.html">
          <img src="/home.png" class="home-icon" alt="Home" />
        </a>
      </div>

      <h1>Hello Recruiter!</h1>
      <p class="title">Everything you need to evaluate my profile efficiently.</p>
    </div>
    <!-- END of block: Hero (Recruiter) -->
  `);
  /* END of block: Card Template — heroRecruiter */


  /* =====================================================
     CARD: HERO (COLLEAGUE)
     ===================================================== */
  register("heroColleague", () => `
    <div id="hero" class="card hero-card">
      <div class="hero-top">
        <div class="hero-logo-box">
          <img src="/ubtlogo.png" class="hero-logo" alt="UBT logo" />
          <span class="hero-domain">ubterzioglu.de</span>
        </div>
        <a href="index.html">
          <img src="/home.png" class="home-icon" alt="Home" />
        </a>
      </div>

      <h1>Hello Colleague!</h1>
      <p class="title">Quick overview for collaboration and context.</p>
    </div>
    <!-- END of block: Hero (Colleague) -->
  `);
  /* END of block: Card Template — heroColleague */


 /* =====================================================
   CARD: CV
   - Two clean CTA blocks (EN/DE)
   - Keeps your existing CSS, only adds small inline styling
   ===================================================== */
register("cv", () => `
  <div id="cv" class="detail-card card-color-1">
    <div class="card-buttons">
      <a href="index.html"><img src="/home.png" class="btn-icon" alt="Home" /></a>
      <a href="#top"><img src="/up.png" class="btn-icon" alt="Up" /></a>
    </div>

    <h2 class="section-title">My CV</h2>

    <div style="display:flex; flex-direction:column; gap:14px; margin-top:10px;">

      <!-- EN -->
      <div style="background:rgba(255,255,255,0.18); padding:14px 16px; border-radius:14px;">
        🇬🇧 <strong>English CV</strong><br />
        <a
          href="https://drive.google.com/file/d/1T5yUafZI9nRv1aVWeEKBHcU6apZOojP2/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          style="color:inherit; text-decoration:underline; font-weight:600;"
        >
          View / Download (PDF)
        </a>
      </div>

      <!-- DE -->
      <div style="background:rgba(255,255,255,0.18); padding:14px 16px; border-radius:14px;">
        🇩🇪 <strong>German CV</strong><br />
        <a
          href="https://drive.google.com/file/d/15_4pguyDYAYtoqYs_7rwCCzdHknfvZ6D/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          style="color:inherit; text-decoration:underline; font-weight:600;"
        >
          View / Download (PDF)
        </a>
      </div>

    </div>

    <p style="margin-top:14px; opacity:.9; font-size:13px;">
      PDF • ATS-friendly • Updated regularly
    </p>
  </div>
  <!-- END of block: CV -->
`);
/* END of block: Card Template — cv */



  /* =====================================================
   CARD: ACHIEVEMENTS
   ===================================================== */
register("achievements", () => `
  <div id="achievements" class="detail-card card-color-2">
    <div class="card-buttons">
      <a href="index.html"><img src="/home.png" class="btn-icon" alt="Home" /></a>
      <a href="#top"><img src="/up.png" class="btn-icon" alt="Up" /></a>
    </div>

    <h2 class="section-title">Key Achievements</h2>

    <div class="ach-list">
      <div>🏆 Created 5000+ test cases using HP ALM, Jira, and Polarion over 10+ years of hands-on testing experience.</div>
      <div>🚀 Increased test coverage from 50% to 90% for Daimler projects through systematic test design techniques.</div>
      <div>📈 Achieved 95% test coverage for Swisslog projects using modular test design.</div>
      <div>🤖 Implemented Ranorex automation for three major Daimler systems, integrating CI/CD pipelines (Jenkins).</div>
      <div>⚡ Automated 1000+ test cases with Ranorex & C#, reducing execution time by 40% through optimization.</div>
      <div>🔍 Reviewed automation of 1000+ Selenium–Java test cases, improving execution efficiency by 30%.</div>
      <div>🧭 Defined and implemented a new test strategy for the Daimler PDM System, boosting efficiency by 25%.</div>
      <div>📦 Planned & coordinated 50+ releases for 40,000+ users in the Daimler PDM ecosystem.</div>
      <div>🔧 Managed HP ALM → Jira migration, reducing manual effort by 25% and project costs by 22%.</div>
      <div>💬 Resolved 1000+ support tickets, ensuring quick turnaround and high stakeholder satisfaction.</div>
      <div>👥 Onboarded, mentored, and led 30+ QA colleagues at Daimler & Swisslog.</div>
      <div>📊 Created KPI-based reports in Excel & Polarion, improving visibility and saving 500 man-hours monthly.</div>
      <div>🧪 Conducted 50+ customer sessions (UAT, FAT, SAT) across enterprise-level projects.</div>
    </div>
  </div>
  <!-- END of block: Achievements -->
`);
/* END of block: Card Template — achievements */



  /* =====================================================
   CARD: TECH STACK
   ===================================================== */
register("techStack", () => `
  <div id="tech" class="detail-card card-color-3">
    <div class="card-buttons">
      <a href="index.html"><img src="/home.png" class="btn-icon" alt="Home" /></a>
      <a href="#top"><img src="/up.png" class="btn-icon" alt="Up" /></a>
    </div>

    <h2 class="section-title">Tech Stack</h2>

    <div class="tech-section">

      <h4>Automation & Frameworks</h4>
      <p>Selenium • Ranorex • Maven • TestNG • JUnit • Cucumber • Gherkin</p>

      <h4>Programming Languages</h4>
      <p>Java • C# • Python</p>

      <h4>API & Integration Testing</h4>
      <p>REST • SOAP • Postman • SoapUI • API Mocking</p>

      <h4>CI/CD & DevOps Pipeline</h4>
      <p>Jenkins • Docker • Git • GitHub</p>

      <h4>Test Management & Tracking</h4>
      <p>JIRA • Xray • HP ALM • Polarion</p>

      <h4>Development & IDE Tools</h4>
      <p>IntelliJ IDEA • Visual Studio • VS Code • Eclipse</p>

      <h4>Methodologies & QA Approach</h4>
      <p>Agile • SCRUM • Waterfall • CI/CD</p>

    </div>
  </div>
  <!-- END of block: Tech Stack -->
`);
/* END of block: Card Template — techStack */


  /* =====================================================
   CARD: EXPERIENCE
   ===================================================== */
register("experience", () => `
  <div id="experience" class="detail-card card-color-4">
    <div class="card-buttons">
      <a href="index.html"><img src="/home.png" class="btn-icon" alt="Home" /></a>
      <a href="#top"><img src="/up.png" class="btn-icon" alt="Up" /></a>
    </div>

    <h2 class="section-title">Experience</h2>

    <!-- ======================
         Swisslog — Test Lead
         ====================== -->
    <div class="exp-section">
      <div class="exp-header">
        <img src="/plfirmalogo.png" class="exp-logo" alt="Swisslog logo" />
        <div class="exp-title">
          <h3 class="exp-role">Test Lead</h3>
          <h4 class="exp-company">Swisslog</h4>
          <p class="exp-sub">2021 – 2025 · Dortmund</p>
        </div>
      </div>

      <ul class="exp-list">
        <li>✅ Designed & executed 1,000+ test cases<br /><span>🤖 Polarion, Selenium, Java</span></li>
        <li>✅ Test Lead for one of Swisslog’s largest projects with 500 users & 10 modules<br /><span>🤖 Polarion, WMS, WES</span></li>
        <li>✅ Executed 20+ FAT & SAT sessions with customers<br /><span>🤖 WMS, WES, SynQ, Polarion</span></li>
        <li>✅ Delivered 50+ detailed test & defect reports to Project Management<br /><span>🤖 Polarion, Excel, SCRUM</span></li>
        <li>✅ Prepared 5 complete project-level test plans<br /><span>🤖 Risk-Based Testing, SCRUM, Polarion</span></li>
        <li>✅ Reviewed automation of 1,000+ test cases<br /><span>🤖 Selenium, Java, CI Pipelines</span></li>
        <li>✅ Provided on-site customer support for 5 go-lives / rollouts<br /><span>🤖 WMS, WES, SynQ, Polarion</span></li>
        <li>✅ Mentored & onboarded 15+ colleagues<br /><span>🤖 SCRUM, Knowledge Transfer, Agile Coaching</span></li>
      </ul>
    </div>

    <!-- ======================
         Daimler — Senior Process Manager
         ====================== -->
    <div class="exp-section">
      <div class="exp-header">
        <img src="/plfirmalogo.png" class="exp-logo" alt="Daimler logo" />
        <div class="exp-title">
          <h3 class="exp-role">Senior Process Manager</h3>
          <h4 class="exp-company">Daimler – Mercedes-Benz</h4>
          <p class="exp-sub">2020 – 2021 · Istanbul</p>
        </div>
      </div>

      <ul class="exp-list">
        <li>✅ Built the complete test structure for Daimler’s Part Management System (SRM)<br /><span>🤖 JIRA, Xray, HP ALM, Ranorex, C#</span></li>
        <li>✅ Designed the full test structure for Daimler’s internal communication system (DARRS)<br /><span>🤖 JIRA, HP ALM, Engineering Client, Smaragd</span></li>
        <li>✅ Selected & evaluated test tools via scoring model<br /><span>🤖 JIRA, Xray, Ranorex, HP ALM</span></li>
        <li>✅ Global responsibility for Daimler AG’s Part Management System (SRM)<br /><span>🤖 ~40,000 users · Engineering Client, Smaragd, DARRS</span></li>
        <li>✅ Provided 1st & 2nd level support with 1,000+ resolved tickets<br /><span>🤖 JIRA Service Desk, Defect & Incident Management</span></li>
        <li>✅ Process & test automation with 250+ automated/reviewed test cases<br /><span>🤖 Ranorex, C#, CI Pipelines</span></li>
        <li>✅ Planned & coordinated 10+ enterprise-level releases for SRM<br /><span>🤖 JIRA, Confluence, SCRUM</span></li>
        <li>✅ Prepared 50+ test & management reports for stakeholders<br /><span>🤖 JIRA Dashboards, Excel, Confluence</span></li>
        <li>✅ Onboarded & mentored 5+ colleagues<br /><span>🤖 Agile, Knowledge Transfer, Mentorship</span></li>
      </ul>
    </div>

    <!-- ======================
         Daimler — Senior Test Manager
         ====================== -->
    <div class="exp-section">
      <div class="exp-header">
        <img src="/plfirmalogo.png" class="exp-logo" alt="Daimler logo" />
        <div class="exp-title">
          <h3 class="exp-role">Senior Test Manager</h3>
          <h4 class="exp-company">Daimler – Mercedes-Benz</h4>
          <p class="exp-sub">2017 – 2020 · Istanbul</p>
        </div>
      </div>

      <ul class="exp-list">
        <li>✅ Created the software test strategy for Daimler PDM systems<br /><span>🤖 JIRA, Xray, HP ALM, SCRUM</span></li>
        <li>✅ Quality & release management for PDM system “Smaragd” (10+ releases)<br /><span>🤖 JIRA, Confluence, SCRUM</span></li>
        <li>✅ Executed E2E test activities for core PDM modules<br /><span>🤖 JIRA, HP ALM, E2E Testing</span></li>
        <li>✅ Managed HP ALM → XRAY migration for Smaragd<br /><span>🤖 HP ALM, XRAY, JIRA</span></li>
        <li>✅ Applied SCRUM methodology across test processes<br /><span>🤖 SCRUM, JIRA, Confluence</span></li>
        <li>✅ Selected test tools via scoring model & technical evaluation<br /><span>🤖 Ranorex, JIRA, XRAY, HP ALM, C#</span></li>
        <li>✅ Built JIRA projects from scratch for Daimler test activities<br /><span>🤖 JIRA Administration, Workflow Design, Defect Management</span></li>
        <li>✅ Automated 1,000+ test cases for PDM System “Smaragd”<br /><span>🤖 Ranorex, C#</span></li>
        <li>✅ Mentored & onboarded 20+ colleagues<br /><span>🤖 SCRUM, Knowledge Transfer, Agile Coaching</span></li>
      </ul>
    </div>

    <!-- ======================
         Daimler — Development Engineer
         ====================== -->
    <div class="exp-section">
      <div class="exp-header">
        <img src="/plfirmalogo.png" class="exp-logo" alt="Daimler logo" />
        <div class="exp-title">
          <h3 class="exp-role">Development Engineer</h3>
          <h4 class="exp-company">Daimler – Mercedes-Benz</h4>
          <p class="exp-sub">2007 – 2017</p>
        </div>
      </div>

      <ul class="exp-list">
        <li>✅ Interior design & vehicle components development<br /><span>🤖 Catia V4/V5, Siemens NX, SAP, DOORS, SWAN</span></li>
        <li>✅ Integration team – Project Next Generation Conecto<br /><span>🤖 Catia V5, Siemens NX, SAP, DOORS</span></li>
        <li>✅ Factory support for customer special order vehicles (Mannheim)<br /><span>🤖 Catia V5, SAP, DOORS</span></li>
        <li>✅ Prototype assembly support for NCI E6 vehicles<br /><span>🤖 Catia V5, Siemens NX, SAP, DOORS</span></li>
        <li>✅ Integration support for Setra vehicle assembly projects<br /><span>🤖 Catia V5, Siemens NX, SAP, DOORS</span></li>
      </ul>
    </div>

  </div>
  <!-- END of block: Experience -->
`);
/* END of block: Card Template — experience */



  /* =====================================================
   CARD: CORPORATE PROJECTS
   ===================================================== */
register("corporateProjects", () => `
  <div id="projects-corporate" class="detail-card card-color-5">
    <div class="card-buttons">
      <a href="index.html"><img src="/home.png" class="btn-icon" alt="Home" /></a>
      <a href="#top"><img src="/up.png" class="btn-icon" alt="Up" /></a>
    </div>

    <h2 class="section-title">🚀 Corporate Projects</h2>

    <div class="proj-wrapper">

      <!-- Smaragd -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Smaragd logo" />
        <div>
          <h4 class="proj-title">Smaragd – Daimler / Mercedes-Benz</h4>
          <p>
            A global Product Data Management system used by thousands of engineers across Mercedes-Benz.
            Test strategy, quality processes, and release management were established and executed
            throughout the project lifecycle. The system supported highly complex engineering workflows
            and integrations.
          </p>
        </div>
      </div>

      <!-- SRM -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="SRM logo" />
        <div>
          <h4 class="proj-title">SRM – Daimler / Mercedes-Benz</h4>
          <p>
            A critical Supply & Parts Management platform serving tens of thousands of internal users.
            End-to-end testing, test automation processes, and global rollout support were delivered.
            The project played a key role in ensuring stability across global supply chain operations.
          </p>
        </div>
      </div>

      <!-- DARRS -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="DARRS logo" />
        <div>
          <h4 class="proj-title">DARRS – Daimler / Mercedes-Benz</h4>
          <p>
            An internal communication and reporting system used for operational and management-level
            decision processes. Functional, integration, and user acceptance testing activities were
            carried out. The system directly supported data-driven corporate operations.
          </p>
        </div>
      </div>

      <!-- Swisslog TKL -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Swisslog TKL logo" />
        <div>
          <h4 class="proj-title">Swisslog – TKL</h4>
          <p>
            A warehouse automation and robotics integration project for logistics operations.
            Software and hardware synchronization tests were executed across robotic and conveyor systems.
            The project required high reliability under real-time operational conditions.
          </p>
        </div>
      </div>

      <!-- Swisslog Kruitbosch -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Swisslog Kruitbosch logo" />
        <div>
          <h4 class="proj-title">Swisslog – Kruitbosch</h4>
          <p>
            A warehouse management system supporting retail distribution operations.
            Order picking, stock management, and shipment processes were tested across automated workflows.
            Close interaction between physical automation and software systems was a key success factor.
          </p>
        </div>
      </div>

      <!-- Swisslog Albert Heijn -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Swisslog Albert Heijn logo" />
        <div>
          <h4 class="proj-title">Swisslog – Albert Heijn</h4>
          <p>
            A high-volume warehouse automation project for one of Europe’s largest retail chains.
            System validation, go-live support, and data integrity testing were delivered under heavy
            operational load. The project operated in a high-availability production environment.
          </p>
        </div>
      </div>

      <!-- Swisslog EDEKA -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Swisslog EDEKA logo" />
        <div>
          <h4 class="proj-title">Swisslog – EDEKA</h4>
          <p>
            A large-scale automation project for Germany’s leading supermarket group.
            Pre-go-live validation, integration testing, and operational stability checks were conducted.
            The system ensured uninterrupted warehouse operations during transition phases.
          </p>
        </div>
      </div>

    </div>
  </div>
  <!-- END of block: Corporate Projects -->
`);
/* END of block: Card Template — corporateProjects */


  /* =====================================================
   CARD: PRIVATE PROJECTS
   ===================================================== */
register("privateProjects", () => `
  <div id="projects-private" class="detail-card card-color-1">
    <div class="card-buttons">
      <a href="index.html"><img src="/home.png" class="btn-icon" alt="Home" /></a>
      <a href="#top"><img src="/up.png" class="btn-icon" alt="Up" /></a>
    </div>

    <h2 class="section-title">🌟 Private Projects</h2>

    <div class="proj-wrapper">

      <!-- UBT Testing -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="UBT Testing logo" />
        <div>
          <h4 class="proj-title">UBT – Testing</h4>
          <p>
            A personal quality assurance brand focused on sharing real-world testing experience
            and best practices. The platform covers test strategies, tools, and career-related
            insights, serving as a professional personal knowledge hub.
          </p>
        </div>
      </div>

      <!-- All in 2 Minutes -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="All in 2 Minutes logo" />
        <div>
          <h4 class="proj-title">All in 2 Minutes!</h4>
          <p>
            A short-form content series designed to explain complex topics in under two minutes.
            The concept focuses on speed, clarity, and entertainment—combining educational value
            with engaging presentation.
          </p>
        </div>
      </div>

      <!-- Press Enter to Code -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Press Enter to Code logo" />
        <div>
          <h4 class="proj-title">Press Enter to Code</h4>
          <p>
            A personal tech and coding content channel focused on development, testing, and
            productivity. Content includes programming concepts, automation topics, and learning
            strategies targeting both developers and QA professionals.
          </p>
        </div>
      </div>

      <!-- Software Tester Network -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Software Tester Network logo" />
        <div>
          <h4 class="proj-title">Software Tester Network</h4>
          <p>
            A professional QA community created to connect software testers globally.
            Knowledge sharing, technical discussions, and career-focused content are actively
            supported, promoting collaboration across different QA expertise levels.
          </p>
        </div>
      </div>

      <!-- CAL Community -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="CAL Community logo" />
        <div>
          <h4 class="proj-title">CAL Community</h4>
          <p>
            A digital alumni and social community platform built to strengthen long-term connections.
            The project focuses on engagement, event sharing, and collective interaction, achieving
            strong organic growth in a short time.
          </p>
        </div>
      </div>

      <!-- Picked Scenes -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Picked Scenes logo" />
        <div>
          <h4 class="proj-title">Picked Scenes!</h4>
          <p>
            A curated digital project highlighting powerful moments from films and series.
            Each post focuses on storytelling, emotion, and cinematic impact, combining visual
            culture with short-form editorial content.
          </p>
        </div>
      </div>

      <!-- Loved Your T-Shirt -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Loved Your T-Shirt logo" />
        <div>
          <h4 class="proj-title">Loved Your T-Shirt</h4>
          <p>
            A social content concept built around street culture, identity, and visual expression
            through clothing. The project connects fashion, humor, and spontaneous interaction,
            emphasizing creativity in everyday moments.
          </p>
        </div>
      </div>

      <!-- Factovium -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Factovium logo" />
        <div>
          <h4 class="proj-title">Factovium</h4>
          <p>
            An educational micro-content platform built around daily “Did you know?” facts.
            The project focuses on curiosity, learning, and knowledge sharing, designed to be
            short, informative, and engaging.
          </p>
        </div>
      </div>

      <!-- Don’t Follow Just Like -->
      <div class="proj-item">
        <img src="/phlogo.png" class="proj-logo" alt="Don’t Follow Just Like logo" />
        <div>
          <h4 class="proj-title">Don’t Follow Just Like</h4>
          <p>
            An entertainment-focused digital brand built on irony, humor, and experimental social
            content. The concept plays with reversed social-media dynamics and is designed purely
            for engagement and creative expression.
          </p>
        </div>
      </div>

    </div>
  </div>
  <!-- END of block: Private Projects -->
`);
/* END of block: Card Template — privateProjects */



  /* =====================================================
   CARD: CONTACT
   ===================================================== */
register("contact", () => `
  <div id="contact" class="detail-card card-color-2">
    <div class="card-buttons">
      <a href="index.html"><img src="/home.png" class="btn-icon" alt="Home" /></a>
      <a href="#top"><img src="/up.png" class="btn-icon" alt="Up" /></a>
    </div>

    <h2 class="section-title">Contact</h2>
    <p>
      ✉ <strong>Email:</strong> ubterzioglu@gmail.com<br />
      📱 <strong>Phone:</strong> +49 173 956 94 29<br />
      📍 <strong>Location:</strong> Dortmund, Germany
    </p>
  </div>
  <!-- END of block: Contact -->
`);
/* END of block: Card Template — contact */


/* =====================================================
   CARD: ABOUT ME
   ===================================================== */
register("aboutMe", () => `
  <div id="aboutme" class="detail-card card-color-3">

    <div class="card-buttons">
      <a href="index.html">
        <img src="/home.png" class="btn-icon" alt="Home" />
      </a>
      <a href="#top">
        <img src="/up.png" class="btn-icon" alt="Up" />
      </a>
    </div>

    <h2 class="section-title">About Me</h2>

    <!-- Profile photo -->
    <div style="display:flex; justify-content:center; margin:16px 0;">
      <img 
        src="/profile-placeholder.png"
        alt="Profile photo"
        style="
          width:120px;
          height:120px;
          border-radius:50%;
          object-fit:cover;
          box-shadow:0 6px 18px rgba(0,0,0,.25);
        "
      />
    </div>

    <!-- Description -->
    <p style="font-size:14.5px; line-height:1.6;">
      Senior Software Quality Assurance Engineer with 15+ years of experience
      in test management, test automation, and process optimization.
      Proven expertise in leading global testing initiatives, implementing
      automation frameworks, and managing cross-functional teams.
      Specialized in Agile/SCRUM methodologies, CI/CD pipelines, and quality
      assurance for enterprise systems.
      Strong background in coordinating FAT and SAT activities, mentoring
      teams, and delivering high-quality software solutions.
    </p>

  </div>
  <!-- END of block: About Me -->
`);
/* END of block: Card Template — aboutMe */




  /* =====================================================
     4) PUBLIC API (window.cardLoader)
     ===================================================== */
  window.cardLoader = { register, renderInto };
})();
/* END of file: card-loader.js */
