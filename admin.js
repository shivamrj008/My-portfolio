/**
 * ==========================================================================
 * SHIVAM RAJPUT — STUDIO ADMIN DASHBOARD ENGINE
 * Interactive Project & Profile CMS with Real-Time LocalStorage Sync
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. AUTHENTICATION GATE
  // If not logged in, prompt or redirect to login.html
  const isAuth = sessionStorage.getItem('shivam_admin_auth');
  if (!isAuth) {
    const enteredPin = prompt('STUDIO ACCESS GATE: Please enter the Admin Key / Password (Default: shivam2026):');
    if (enteredPin === 'shivam2026' || enteredPin === 'admin' || enteredPin === 'shivam') {
      sessionStorage.setItem('shivam_admin_auth', 'true');
    } else {
      alert('Access Denied: Redirecting to login portal.');
      window.location.href = 'login.html';
      return;
    }
  }

  // 2. BASELINE DATA
  const DEFAULT_PORTFOLIO_DATA = {
    heroKicker: "BUILDING DIGITAL EXPERIENCES",
    heroTagline: "I design and develop modern websites that combine thoughtful design, clean code, and smooth interactions.",
    role: "WEB DEVELOPER",
    focus: "CREATIVE DEVELOPER",
    location: "INDIA",
    email: "suburajput800@gmail.com",
    projects: [
      {
        id: "landslideguard",
        title: "NER LandslideGuard AI",
        categoryIndex: "01 / DISASTER AI",
        categoryType: "FULL-STACK & IOT",
        previewHeader: "TELEMETRY ONLINE // ESP32 + WEBSOCKET",
        previewTitle: "NER LandslideGuard AI",
        previewSubtitle: "AI EARLY-WARNING RISK MONITORING",
        previewFooter: "HIMALAYAN SENSOR CLUSTER // GEMINI 2.5 SAFETY ENGINE",
        description: "An early-warning disaster risk monitoring platform designed for North Eastern India. Integrates field-deployable ESP32 sensor telemetry, real-time WebSockets, Google Gemini AI geotechnical safety analysis, Web Audio emergency sirens, and GIS Leaflet mapping.",
        tags: ["React", "TypeScript", "Node.js", "WebSockets", "Gemini AI", "Leaflet GIS", "ESP32 IoT"],
        demoLink: "#contact",
        demoText: "VIEW DETAILS",
        codeLink: "https://github.com",
        codeText: "SOURCE CODE"
      },
      {
        id: "pyqportal",
        title: "University PYQ Portal",
        categoryIndex: "02 / EDUCATION TECH",
        categoryType: "WEB APPLICATION",
        previewHeader: "ACADEMIC ARCHIVE // LIGHTWEIGHT WEB ENGINE",
        previewTitle: "University PYQ Portal",
        previewSubtitle: "EXAMINATION PAPERS & SYLLABUS HUB",
        previewFooter: "SEMESTER FILTERING // FAST STUDY REPOSITORY",
        description: "A dedicated academic question paper repository built to help engineering students rapidly search, filter by semester and subject, and access past examination papers without cumbersome ad clutter or broken download links.",
        tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI", "Fast Search"],
        demoLink: "#contact",
        demoText: "EXPLORE PLATFORM",
        codeLink: "https://github.com",
        codeText: "SOURCE CODE"
      },
      {
        id: "fasaliq",
        title: "FasalIQ Crop Intelligence",
        categoryIndex: "03 / AI HACKATHON",
        categoryType: "AGRICULTURAL INTELLIGENCE",
        previewHeader: "SIH PROTOTYPE // VITE + REACT ENGINE",
        previewTitle: "FasalIQ Agri-Tech",
        previewSubtitle: "AI CROP YIELD & OPTIMIZATION",
        previewFooter: "SOIL & WEATHER METRICS // PRECISION CALCULATORS",
        description: "A Smart India Hackathon agricultural optimization platform delivering algorithmic crop yield predictions, multi-crop comparisons, fertilizer requirement estimation, and irrigation planning calibrated for Indian farming conditions.",
        tags: ["React", "Vite", "Tailwind CSS", "Algorithms", "Local Storage"],
        demoLink: "#contact",
        demoText: "VIEW PROTOTYPE",
        codeLink: "https://github.com",
        codeText: "SOURCE CODE"
      },
      {
        id: "readyline",
        title: "Readyline Operations Center",
        categoryIndex: "04 / CIVIC RESILIENCE",
        categoryType: "DASHBOARD ARCHITECTURE",
        previewHeader: "COMMAND HUB // CRISIS RESPONSE",
        previewTitle: "Readyline Command",
        previewSubtitle: "DISASTER READINESS & RISK REGISTER",
        previewFooter: "INCIDENT WORKFLOWS // ZERO-DEPENDENCY RUNTIME",
        description: "A streamlined disaster readiness and community coordination dashboard featuring dynamic risk registers, operational action checklists, team role assignments, and emergency resource management workflows.",
        tags: ["JavaScript", "Modular CSS", "State Management", "Accessible DOM"],
        demoLink: "#contact",
        demoText: "VIEW DETAILS",
        codeLink: "https://github.com",
        codeText: "SOURCE CODE"
      }
    ]
  };

  // State
  let portfolioData = loadData();
  let editingProjectId = null;

  function loadData() {
    try {
      const stored = localStorage.getItem('shivam_portfolio_data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
  }

  function saveData() {
    try {
      localStorage.setItem('shivam_portfolio_data', JSON.stringify(portfolioData));
      showToast('Changes saved to live portfolio!', 'success');
    } catch (e) {
      console.error('Error saving data', e);
      showToast('Error saving data. Storage might be full.', 'error');
    }
  }

  // Toast Helper
  const toast = document.getElementById('admin-toast');
  function showToast(message, type = 'success') {
    if (!toast) return;
    toast.textContent = message;
    toast.className = `admin-toast show ${type}`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // 3. POPULATE PROFILE FORM
  function populateProfileForm() {
    const kickerInput = document.getElementById('field-hero-kicker');
    const taglineInput = document.getElementById('field-hero-tagline');
    const roleInput = document.getElementById('field-hero-role');
    const focusInput = document.getElementById('field-hero-focus');
    const locationInput = document.getElementById('field-hero-location');
    const emailInput = document.getElementById('field-email');

    if (kickerInput) kickerInput.value = portfolioData.heroKicker || '';
    if (taglineInput) taglineInput.value = portfolioData.heroTagline || '';
    if (roleInput) roleInput.value = portfolioData.role || '';
    if (focusInput) focusInput.value = portfolioData.focus || '';
    if (locationInput) locationInput.value = portfolioData.location || '';
    if (emailInput) emailInput.value = portfolioData.email || '';
  }

  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      portfolioData.heroKicker = document.getElementById('field-hero-kicker').value.trim();
      portfolioData.heroTagline = document.getElementById('field-hero-tagline').value.trim();
      portfolioData.role = document.getElementById('field-hero-role').value.trim();
      portfolioData.focus = document.getElementById('field-hero-focus').value.trim();
      portfolioData.location = document.getElementById('field-hero-location').value.trim();
      portfolioData.email = document.getElementById('field-email').value.trim();

      saveData();
    });
  }

  // 4. RENDER PROJECTS LIST
  const projectsList = document.getElementById('admin-projects-list');

  function renderProjectsList() {
    if (!projectsList) return;
    projectsList.innerHTML = '';

    if (!portfolioData.projects || portfolioData.projects.length === 0) {
      projectsList.innerHTML = '<p style="color: var(--text-muted); font-family: var(--font-mono); padding: 1rem;">No projects found. Click "Add New Project" to get started.</p>';
      return;
    }

    portfolioData.projects.forEach((proj, idx) => {
      const item = document.createElement('div');
      item.className = 'project-item';

      const tagsHtml = (proj.tags || [])
        .map(t => `<span class="project-tag-pill">${escapeHtml(t.trim())}</span>`)
        .join('');

      item.innerHTML = `
        <div class="project-item-left">
          <span class="project-item-index">${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}</span>
          <div class="project-item-meta">
            <span class="project-item-category">${escapeHtml(proj.categoryIndex || 'PROJECT')} &bull; ${escapeHtml(proj.categoryType || 'APP')}</span>
            <h4 class="project-item-title">${escapeHtml(proj.title)}</h4>
            <div class="project-item-tags">
              ${tagsHtml}
            </div>
          </div>
        </div>
        <div class="project-item-actions">
          <button class="btn btn-sm btn-outline edit-proj-btn" data-id="${escapeHtml(proj.id)}">EDIT</button>
          <button class="btn btn-sm btn-danger del-proj-btn" data-id="${escapeHtml(proj.id)}">DELETE</button>
        </div>
      `;

      projectsList.appendChild(item);
    });

    // Attach Edit Listeners
    document.querySelectorAll('.edit-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => openProjectModal(btn.dataset.id));
    });

    // Attach Delete Listeners
    document.querySelectorAll('.del-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteProject(btn.dataset.id));
    });
  }

  // 5. PROJECT MODAL (ADD / EDIT)
  const modalOverlay = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const projectForm = document.getElementById('project-form');
  const openAddBtn = document.getElementById('btn-add-project');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const cancelModalBtn = document.getElementById('btn-cancel-modal');

  function openProjectModal(id = null) {
    editingProjectId = id;
    projectForm.reset();

    if (id) {
      modalTitle.textContent = 'EDIT PROJECT';
      const proj = portfolioData.projects.find(p => p.id === id);
      if (proj) {
        document.getElementById('proj-title').value = proj.title || '';
        document.getElementById('proj-category-index').value = proj.categoryIndex || '';
        document.getElementById('proj-category-type').value = proj.categoryType || '';
        document.getElementById('proj-preview-title').value = proj.previewTitle || '';
        document.getElementById('proj-preview-subtitle').value = proj.previewSubtitle || '';
        document.getElementById('proj-desc').value = proj.description || '';
        document.getElementById('proj-tags').value = (proj.tags || []).join(', ');
        document.getElementById('proj-demo-link').value = proj.demoLink || '';
        document.getElementById('proj-code-link').value = proj.codeLink || '';
      }
    } else {
      modalTitle.textContent = 'ADD NEW PROJECT';
      const nextNum = (portfolioData.projects.length + 1);
      document.getElementById('proj-category-index').value = `${nextNum < 10 ? '0' + nextNum : nextNum} / PROJECT`;
      document.getElementById('proj-category-type').value = 'WEB APPLICATION';
    }

    modalOverlay.classList.add('open');
  }

  function closeProjectModal() {
    modalOverlay.classList.remove('open');
    editingProjectId = null;
  }

  if (openAddBtn) openAddBtn.addEventListener('click', () => openProjectModal());
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeProjectModal);

  if (projectForm) {
    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('proj-title').value.trim();
      const categoryIndex = document.getElementById('proj-category-index').value.trim();
      const categoryType = document.getElementById('proj-category-type').value.trim();
      const previewTitle = document.getElementById('proj-preview-title').value.trim();
      const previewSubtitle = document.getElementById('proj-preview-subtitle').value.trim();
      const description = document.getElementById('proj-desc').value.trim();
      const tagsRaw = document.getElementById('proj-tags').value.trim();
      const demoLink = document.getElementById('proj-demo-link').value.trim() || '#contact';
      const codeLink = document.getElementById('proj-code-link').value.trim() || 'https://github.com';

      const tags = tagsRaw
        ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean)
        : ['Frontend', 'JavaScript'];

      if (editingProjectId) {
        // Update existing
        const idx = portfolioData.projects.findIndex(p => p.id === editingProjectId);
        if (idx !== -1) {
          portfolioData.projects[idx] = {
            ...portfolioData.projects[idx],
            title,
            categoryIndex,
            categoryType,
            previewTitle: previewTitle || title,
            previewSubtitle,
            description,
            tags,
            demoLink,
            codeLink
          };
        }
      } else {
        // Create new
        const newId = 'proj_' + Date.now();
        portfolioData.projects.push({
          id: newId,
          title,
          categoryIndex,
          categoryType,
          previewHeader: 'ONLINE // ' + categoryType.toUpperCase(),
          previewTitle: previewTitle || title,
          previewSubtitle: previewSubtitle || 'DEVELOPER SHOWCASE',
          previewFooter: 'PRODUCTION GRADE',
          description,
          tags,
          demoLink,
          demoText: 'VIEW DETAILS',
          codeLink,
          codeText: 'SOURCE CODE'
        });
      }

      saveData();
      renderProjectsList();
      closeProjectModal();
    });
  }

  function deleteProject(id) {
    const proj = portfolioData.projects.find(p => p.id === id);
    if (!proj) return;

    if (confirm(`Are you sure you want to delete "${proj.title}" from your portfolio?`)) {
      portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
      saveData();
      renderProjectsList();
    }
  }

  // 6. BACKUP & EXPORT
  const exportBtn = document.getElementById('btn-export-json');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `shivam-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Portfolio configuration exported successfully!', 'success');
    });
  }

  // 7. RESET TO DEFAULTS
  const resetBtn = document.getElementById('btn-reset-defaults');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Warning: This will restore the factory original projects and clear local custom edits. Proceed?')) {
        portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
        saveData();
        populateProfileForm();
        renderProjectsList();
        showToast('Restored default portfolio data!', 'success');
      }
    });
  }

  // 8. LOGOUT
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('shivam_admin_auth');
      window.location.href = 'index.html';
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize
  populateProfileForm();
  renderProjectsList();

})();
