// ── NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── BURGER / MOBILE MENU
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── CUSTOM CURSOR (desktop only)
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
if (window.matchMedia('(hover: hover)').matches && cursor) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  }, { passive: true });
  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  // Scale on interactive elements
  const interactives = document.querySelectorAll('a, button, .svc, .gm-item, .rv');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1.8)';
      ring.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.opacity = '0.5';
    });
  });
}

// ── SCROLL REVEAL
const io = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in'), i * 70);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));

// ── SMOOTH ANCHOR SCROLL (for nav links)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── FORM SUBMIT
const form = document.getElementById('contactForm');
const formBtn = form?.querySelector('.form-btn');

if (form) {
  form.addEventListener('submit', (e) => {
    const inputs = form.querySelectorAll('.fg input, .fg textarea, .fg select');
    let valid = true;

    inputs.forEach(inp => {
      if (!inp.value.trim() && inp.type !== 'hidden') {
        inp.style.borderColor = 'rgba(220,80,80,0.6)';
        valid = false;
        setTimeout(() => inp.style.borderColor = '', 2000);
      }
    });

    // ONLY block submission if invalid
    if (!valid) {
      e.preventDefault();
      return;
    }

    // Do NOT fake success here — Formspree handles real result
  });
}