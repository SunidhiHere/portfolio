// ================================
// CUSTOM CURSOR
// ================================
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

if (cursor && trail) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
    }, 80);
  });

  document.querySelectorAll('a, button, .btn, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2)';
      trail.style.opacity = '0.15';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.opacity = '0.5';
    });
  });
}

// ================================
// TERMINAL TYPING EFFECT
// ================================
const termCmd = document.getElementById('termCmd');
const commands = [
  'run portfolio.py',
  'import pandas as pd',
  'model.fit(X_train, y_train)',
  'accuracy_score(y_test, y_pred)',
  'plt.show()'
];

let cmdIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeCmd() {
  if (!termCmd) return;
  const current = commands[cmdIdx];

  if (!isDeleting) {
    termCmd.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeCmd, 1800);
      return;
    }
  } else {
    termCmd.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      cmdIdx = (cmdIdx + 1) % commands.length;
    }
  }

  setTimeout(typeCmd, isDeleting ? 40 : 75);
}

setTimeout(typeCmd, 800);

// ================================
// NAV SCROLL EFFECT
// ================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ================================
// HAMBURGER MENU
// ================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});

// ================================
// SCROLL REVEAL
// ================================
const revealEls = document.querySelectorAll(
  '.about__grid, .skill-block, .project-row, .contact__left, .contact__form, .about__code-block'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));

// ================================
// SKILL BARS ANIMATE ON SCROLL
// ================================
const skillBlocks = document.querySelectorAll('.skill-block');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBlocks.forEach(b => skillObserver.observe(b));

// ================================
// ACTIVE NAV LINK
// ================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ================================
// SMOOTH SCROLL
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ================================
// GLITCH EFFECT ON NAME HOVER
// ================================
document.querySelectorAll('.name-line').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.textShadow = '2px 0 #ff4466, -2px 0 #00ffaa';
    setTimeout(() => { el.style.textShadow = ''; }, 300);
  });
});

// ================================
// CONTACT FORM
// ================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<span class="btn-text">SENDING...</span> <i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        btn.innerHTML = '<span class="btn-text">MESSAGE SENT</span> <i class="fas fa-check"></i>';
        contactForm.reset();
      } else throw new Error();
    } catch {
      btn.innerHTML = '<span class="btn-text">ERROR — TRY AGAIN</span> <i class="fas fa-times"></i>';
      btn.style.background = '#ff4466';
    }

    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.background = '';
    }, 3500);
  });
}
