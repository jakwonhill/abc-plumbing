// ============================================================
//  ABC PLUMBING — SCRIPT.JS
// ============================================================
 
// ---- Mobile navigation toggle ----
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
 
hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('is-open');
  hamburger.setAttribute('aria-expanded', isOpen);
});
 
// Close nav when any link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});
 
// ---- Sticky header shadow on scroll ----
const header = document.getElementById('header');
 
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,0.12)'
    : '0 1px 4px rgba(0,0,0,0.07)';
}, { passive: true });
 
// ---- Active nav link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');
 
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
 
sections.forEach(s => sectionObserver.observe(s));
 
// ---- Smooth scroll with sticky-header offset ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});
 
// ---- Scroll-reveal animation ----
// Cards and list items fade up as they enter the viewport
const revealItems = document.querySelectorAll(
  '.service-card, .review-card, .area-card, .why-item, .cinfo-item'
);
 
revealItems.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(18px)';
  el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
});
 
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
 
revealItems.forEach(el => revealObserver.observe(el));
 
// ---- Contact form handler ----
// Simulates a submission — later you'll replace this with
// Netlify Forms (free) so real submissions get emailed to the client.
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
 
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
 
    // Show a loading state on the button
    const btn = this.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
 
    // Submit the form data to Netlify
    const formData = new FormData(contactForm);
 
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      // On success, hide the form and show the thank-you message
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
    })
    .catch(() => {
      // On failure, re-enable the button and show an error
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send My Request';
      alert('Something went wrong. Please call us directly at (505) 342-7890.');
    });
  });
}
