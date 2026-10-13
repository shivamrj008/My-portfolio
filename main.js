/**
 * ==========================================================================
 * SHIVAM RAJPUT — LUXURY FASHION-EDITORIAL PORTFOLIO
 * Main Interactive Engine: Ultra-Smooth Animations, Dynamic Projects & Micro-Interactions
 * ==========================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DEFAULT DATASET (Guaranteed Fallback Baseline)
  // --------------------------------------------------------------------------
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

  // Expose for Admin Panel usage
  window.DEFAULT_PORTFOLIO_DATA = DEFAULT_PORTFOLIO_DATA;

  function getStoredData() {
    try {
      const stored = localStorage.getItem('shivam_portfolio_data');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using default data', e);
    }
    return DEFAULT_PORTFOLIO_DATA;
  }

  // --------------------------------------------------------------------------
  // 2. DYNAMIC CONTENT RENDERING
  // --------------------------------------------------------------------------
  function applyPortfolioData() {
    const data = getStoredData();

    // Hero Text Overrides
    const heroKicker = document.getElementById('hero-kicker');
    if (heroKicker && data.heroKicker) heroKicker.textContent = data.heroKicker;

    const heroTagline = document.getElementById('hero-tagline');
    if (heroTagline && data.heroTagline) heroTagline.textContent = data.heroTagline;

    const roleVal = document.getElementById('hero-role-val');
    if (roleVal && data.role) roleVal.textContent = data.role;

    const focusVal = document.getElementById('hero-focus-val');
    if (focusVal && data.focus) focusVal.textContent = data.focus;

    const locationVal = document.getElementById('hero-location-val');
    if (locationVal && data.location) locationVal.textContent = data.location;

    // Render Projects
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer && Array.isArray(data.projects) && data.projects.length > 0) {
      projectsContainer.innerHTML = '';

      data.projects.forEach((proj, idx) => {
        const delayClass = idx % 2 === 1 ? 'delay-1' : '';
        const tagsHtml = (proj.tags || [])
          .map(tag => `<span class="tech-tag">${escapeHtml(tag.trim())}</span>`)
          .join('');

        const card = document.createElement('article');
        card.className = `project-card reveal ${delayClass}`;
        card.innerHTML = `
          <div class="project-preview">
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <span class="mockup-status-dot">${escapeHtml(proj.previewHeader || 'ACTIVE PROJECT')}</span>
                <span>${escapeHtml(proj.categoryType || 'SYSTEM')}</span>
              </div>
              <div class="mockup-center">
                <h4>${escapeHtml(proj.previewTitle || proj.title)}</h4>
                <p>${escapeHtml(proj.previewSubtitle || 'DEVELOPER SHOWCASE')}</p>
              </div>
              <div class="mockup-footer">
                <span>${escapeHtml(proj.previewFooter || 'PRODUCTION GRADE')}</span>
                <span>${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}</span>
              </div>
            </div>
          </div>

          <div class="project-info">
            <div class="project-meta-bar">
              <span class="project-index">${escapeHtml(proj.categoryIndex || ('0' + (idx + 1) + ' / PROJECT'))}</span>
              <span class="project-type">${escapeHtml(proj.categoryType || 'WEB APP')}</span>
            </div>

            <h3 class="project-title">${escapeHtml(proj.title)}</h3>

            <p class="project-desc">
              ${escapeHtml(proj.description)}
            </p>

            <div class="project-tech-tags">
              ${tagsHtml}
            </div>

            <div class="project-actions">
              <a href="${escapeHtml(proj.demoLink || '#contact')}" class="btn btn-sm btn-outline">
                ${escapeHtml(proj.demoText || 'VIEW DETAILS')}
                <span class="arrow-icon">→</span>
              </a>
              <a href="${escapeHtml(proj.codeLink || 'https://github.com')}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                ${escapeHtml(proj.codeText || 'SOURCE CODE')}
                <span class="arrow-icon">↗</span>
              </a>
            </div>
          </div>
        `;
        projectsContainer.appendChild(card);
      });
    }
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

  // --------------------------------------------------------------------------
  // 3. DYNAMIC COPYRIGHT YEAR
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 4. STICKY HEADER
  // --------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 25) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --------------------------------------------------------------------------
  // 5. INTERSECTION OBSERVER REVEAL ANIMATIONS
  // --------------------------------------------------------------------------
  function setupRevealObserver() {
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      });

      reveals.forEach(el => revealObserver.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('revealed'));
    }
  }

  // --------------------------------------------------------------------------
  // 6. ACTIVE SECTION NAVIGATION SPY
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyScroll = () => {
    const scrollPos = window.scrollY + 180;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', spyScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 7. MOBILE NAVIGATION DRAWER
  // --------------------------------------------------------------------------
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', toggleMenu);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  // --------------------------------------------------------------------------
  // 8. CUSTOM DESKTOP CURSOR (Disabled on touch & reduced-motion)
  // --------------------------------------------------------------------------
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isTouch && !prefersReduced) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');

    if (dot && ring) {
      let mouseX = -100;
      let mouseY = -100;
      let ringX = -100;
      let ringY = -100;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }, { passive: true });

      const animateRing = () => {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        requestAnimationFrame(animateRing);
      };
      requestAnimationFrame(animateRing);

      const attachCursorHover = () => {
        const interactiveSelector = 'a, button, input, textarea, select, .project-card, .category-card';
        document.querySelectorAll(interactiveSelector).forEach(el => {
          el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
          el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
        });
      };
      attachCursorHover();

      document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
      });
    }
  }

  // --------------------------------------------------------------------------
  // 9. CLIENT-SIDE CONTACT FORM HANDLER
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status-message');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields before proceeding.';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please provide a valid email address.';
        return;
      }

      const currentData = getStoredData();
      const targetEmail = currentData.email || 'suburajput800@gmail.com';

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Shivam,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      formStatus.className = 'form-status success';
      formStatus.innerHTML = `<strong>Thank you, ${escapeHtml(name)}!</strong> Opening your email client to dispatch to <em>${escapeHtml(targetEmail)}</em>. You can also write directly anytime.`;
      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // INITIALIZE DYNAMIC DATA & OBSERVERS
  // --------------------------------------------------------------------------
  applyPortfolioData();
  setupRevealObserver();

})();
