// ─── NAV ───
function initNav(activePage) {
  const nav = document.getElementById('main-nav');
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'services.html', label: 'Services' },
    { href: 'portfolio.html', label: 'Portfolio' },
    { href: 'contact.html', label: 'Contact' }
  ];
  const links = pages.map(p =>
    `<a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');
  nav.innerHTML = `
    <a class="nav-logo" href="index.html">QC<span>ITS</span></a>
    <div class="nav-links">
      ${links}
      <a class="btn-cta nav-cta" href="contact.html">Get a Quote</a>
    </div>
    <button class="hamburger" onclick="toggleMenu()" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>`;

  // mobile menu
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.innerHTML = pages.map(p =>
      `<a href="${p.href}">${p.label}</a>`
    ).join('') + `<a href="contact.html" style="color:var(--accent-purple);">Get a Quote →</a>`;
  }
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ─── FOOTER ───
function initFooter() {
  const el = document.getElementById('main-footer');
  if (!el) return;
  el.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="nav-logo" href="index.html">QC<span style="color:var(--accent-cyan)">ITS</span></a>
        <p>Quarantine Coders IT Solutions — building digital products that move businesses forward.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="services/web-development.html">Web Development</a></li>
          <li><a href="services/mobile-apps.html">Mobile Apps</a></li>
          <li><a href="services/ai-ml.html">AI & ML</a></li>
          <li><a href="services/seo.html">SEO</a></li>
          <li><a href="services/hosting.html">Web Hosting</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="about.html#team">Our Team</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Connect</h4>
        <ul>
          <li><a href="mailto:hello@qcits.space">hello@qcits.space</a></li>
          <li><a href="https://github.com/QuarantineCoders" target="_blank">GitHub</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Twitter / X</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span id="footer-year"></span> Quarantine Coders IT Solutions — <a href="https://qcits.space">qcits.space</a></p>
      <p style="font-size:0.75rem;color:var(--text-muted);">Sri Lanka 🇱🇰</p>
    </div>`;
  document.getElementById('footer-year').textContent = new Date().getFullYear();
}

// ─── PARTICLE CANVAS ───
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,111,247,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,111,247,${0.08 * (1 - d / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

// ─── TYPEWRITER ───
function initTypewriter(elId, words, speed = 80) {
  const el = document.getElementById(elId);
  if (!el) return;
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    el.textContent = (deleting ? word.slice(0, ci--) : word.slice(0, ci++));
    if (!deleting && ci > word.length) { deleting = true; setTimeout(tick, 1500); return; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; setTimeout(tick, 400); return; }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

// ─── COUNT-UP ───
function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 25);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => observer.observe(el));
}

// ─── SCROLL REVEAL ───
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));

  const style = document.createElement('style');
  style.textContent = `.reveal{opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease}.reveal.revealed{opacity:1;transform:none}`;
  document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCountUp();
});
