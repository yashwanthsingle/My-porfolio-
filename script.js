// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => obs.observe(el));

// Animated background particles
function createBackgroundParticles() {
  const container = document.body;
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = Math.random() * 20 + 15 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(particle);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createBackgroundParticles);
} else {
  createBackgroundParticles();
}

// Enhanced mouse glow on project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
    card.classList.add('glow-active');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('glow-active');
  });
});

// Enhanced skill tags with ripple effect
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    this.appendChild(ripple);
  });
});

// Animated counter
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const dur = 1500;
  const step = timestamp => {
    if (!start) start = timestamp;
    const prog = Math.min((timestamp - start) / dur, 1);
    const val = Math.floor(prog * target);
    el.textContent = val + suffix;
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-num');
      nums.forEach(n => {
        const t = n.textContent;
        const num = parseInt(t);
        const suf = t.replace(num.toString(), '');
        animateCounter(n, num, suf);
      });
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObs.observe(heroStats);

// Interactive text glow on hover
document.querySelectorAll('.hero-name, .section-title').forEach(element => {
  element.addEventListener('mouseover', function() {
    this.style.textShadow = '0 0 20px rgba(0, 217, 255, 0.8), 0 0 40px rgba(255, 0, 110, 0.6)';
  });
  element.addEventListener('mouseout', function() {
    this.style.textShadow = '';
  });
});

// Button hover with dynamic glow
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-purple').forEach(btn => {
  btn.addEventListener('mouseover', function() {
    this.style.filter = 'brightness(1.2) drop-shadow(0 0 15px rgba(0, 217, 255, 0.6))';
  });
  btn.addEventListener('mouseout', function() {
    this.style.filter = 'brightness(1)';
  });
});

// Card semi-transparent reveal on hover
document.querySelectorAll('.goal-card').forEach(card => {
  card.addEventListener('mouseover', function() {
    this.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.4), inset 0 0 30px rgba(0, 217, 255, 0.1)';
  });
  card.addEventListener('mouseout', function() {
    this.style.boxShadow = '';
  });
});

// Scroll-based opacity for hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('#hero');
  if (hero) {
    const scrolled = window.scrollY;
    const opacity = Math.max(1 - scrolled / 500, 0.3);
    hero.style.opacity = opacity;
  }
});

// Parallax effect for background
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const particles = document.querySelectorAll('.particle');
  particles.forEach((particle, index) => {
    particle.style.transform = `translateY(${scrolled * 0.5 * (index % 2 ? 1 : -1)}px)`;
  });
});

// Lamp dropdown functionality
const navLamp = document.getElementById('nav-lamp');
const lampDropdown = document.getElementById('lamp-dropdown');

if (navLamp && lampDropdown) {
  // Toggle dropdown on click
  navLamp.addEventListener('click', (e) => {
    e.stopPropagation();
    lampDropdown.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLamp.contains(e.target)) {
      lampDropdown.classList.remove('active');
    }
  });

  // Close dropdown on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lampDropdown.classList.remove('active');
    }
  });
}

// Contact form validation
const contactForm = document.querySelector('#contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      return;
    }

    // Form will proceed to mailto
  });
}