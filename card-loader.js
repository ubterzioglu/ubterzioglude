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
     ===================================================== */
  register("cv", () => `
    <div id="cv" class="detail-card card-color-1">
      <div class="card-buttons">
        <a href="index.html"><img src="/home.png" class="btn-icon" alt="Home" /></a>
        <a href="#top"><img src="/up.png" class="btn-icon" alt="Up" /></a>
      </div>

      <h2 class="section-title">My CV</h2>
      <p>📌 Placeholder: CV links will be placed here.</p>
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
        <div>🏆 Placeholder achievement item</div>
        <div>🚀 Placeholder achievement item</div>
        <div>📈 Placeholder achievement item</div>
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
        <h4>Category</h4>
        <p>Placeholder • Placeholder • Placeholder</p>

        <h4>Category</h4>
        <p>Placeholder • Placeholder • Placeholder</p>
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

      <div class="exp-section">
        <div class="exp-header">
          <img src="/plfirmalogo.png" class="exp-logo" alt="Company logo" />
          <div class="exp-title">
            <h3 class="exp-role">Role (Placeholder)</h3>
            <h4 class="exp-company">Company (Placeholder)</h4>
            <p class="exp-sub">Dates • Location</p>
          </div>
        </div>

        <ul class="exp-list">
          <li>✅ Placeholder responsibility<br /><span>🤖 Tools placeholder</span></li>
          <li>✅ Placeholder responsibility<br /><span>🤖 Tools placeholder</span></li>
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
        <div class="proj-item">
          <img src="/phlogo.png" class="proj-logo" alt="Project logo" />
          <div>
            <h4 class="proj-title">Project Title (Placeholder)</h4>
            <p>Placeholder description text.</p>
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
        <div class="proj-item">
          <img src="/phlogo.png" class="proj-logo" alt="Project logo" />
          <div>
            <h4 class="proj-title">Project Title (Placeholder)</h4>
            <p>Placeholder description text.</p>
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
     4) PUBLIC API (window.cardLoader)
     ===================================================== */
  window.cardLoader = { register, renderInto };
})();
/* END of file: card-loader.js */
