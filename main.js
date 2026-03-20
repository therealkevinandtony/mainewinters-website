// Maine Winters LLC — Website JS v2

// ── Nav scroll effect ──────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Scroll-triggered fade-in ───────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.product-card, .compare-card, .value-item, .kt-stat-box, .proof-item, .comparison-row, .kt-teaser'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// ── Hero entrance animation ────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const els = [
    document.querySelector('.hero-badge'),
    document.querySelector('.hero-headline'),
    document.querySelector('.hero-sub'),
    document.querySelector('.hero-actions'),
  ];
  els.forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    el.style.transitionDelay = `${i * 110}ms`;
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 60);
    });
  });
});

// ── Contact form ───────────────────────────────────
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#10b981';
    btn.style.boxShadow = '0 0 20px rgba(16,185,129,0.3)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

// ── How-to accordion ──────────────────────────────
document.querySelectorAll('.howto-header').forEach(header => {
  const toggle = () => {
    const block = header.closest('.howto-block');
    const isOpen = block.classList.toggle('is-open');
    header.setAttribute('aria-expanded', isOpen);
  };
  header.addEventListener('click', toggle);
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
});

// ── Smooth nav link active state ──────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#fff' : '';
  });
}, { passive: true });
