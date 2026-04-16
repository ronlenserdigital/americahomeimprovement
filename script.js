/* ================================================
   AMERICA AFFORDABLE HOME IMPROVEMENT — script.js
   ================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ── NAV ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── MOBILE MENU ── */
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  const open = menuBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── HERO ENTRANCE ── */
gsap.timeline({ delay: 0.1 })
  .from('#hero-badge',             { opacity:0, y:16, duration:0.55, ease:'power2.out' })
  .from('#hero-title .block',      { opacity:0, y:40, stagger:0.1,  duration:0.7, ease:'power3.out' }, '-=0.2')
  .from('#hero-sub',               { opacity:0, y:18, duration:0.55, ease:'power2.out' }, '-=0.3')
  .from('#hero-ctas a',            { opacity:0, y:14, stagger:0.1,  duration:0.5, ease:'power2.out' }, '-=0.25')
  .from('#hero-trust .trust-chip', { opacity:0, x:-10, stagger:0.07, duration:0.4, ease:'power2.out' }, '-=0.2')
  .from('#hero-logo-wrap',         { opacity:0, scale:0.88, duration:1.0, ease:'power3.out' }, 0.35)
  .from('#scroll-hint',            { opacity:0, y:8, duration:0.5, ease:'power2.out' }, '-=0.15');

/* Logo parallax */
ScrollTrigger.create({
  trigger: '.hero-section',
  start: 'top top', end: 'bottom top',
  onUpdate: s => gsap.set('#hero-logo-wrap', {
    y: s.progress * 45,
    opacity: 1 - s.progress * 0.2
  })
});

/* ── REUSABLE SCROLL REVEAL ── */
function revealItems(selector, staggerDelay = 0.08) {
  gsap.utils.toArray(selector).forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      delay: i * staggerDelay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true
      }
    });
  });
}

/* ── SECTION HEADER REVEALS (fade up, not invisible by default) ── */
gsap.utils.toArray('.section-hdr').forEach(el => {
  gsap.from(el, {
    opacity: 0,
    y: 22,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 82%', once: true }
  });
});

/* ── CARDS & ITEMS ── */
revealItems('[data-service]', 0.07);
revealItems('[data-process]', 0.1);
revealItems('[data-why]',     0.09);
revealItems('[data-area]',    0.08);

/* CTA block */
gsap.from('#cta-block .cta-glass', {
  opacity:0, y:28, scale:0.97, duration:0.85, ease:'power2.out',
  scrollTrigger: { trigger:'#cta-block', start:'top 82%', once:true }
});

/* Contact rows */
gsap.from('.contact-row', {
  opacity:0, x:-18, stagger:0.1, duration:0.6, ease:'power2.out',
  scrollTrigger: { trigger:'#contact', start:'top 80%', once:true }
});
gsap.from('.expect-box', {
  opacity:0, y:16, duration:0.6, ease:'power2.out',
  scrollTrigger: { trigger:'.expect-box', start:'top 88%', once:true }
});
gsap.from('.form-wrap', {
  opacity:0, x:22, duration:0.8, ease:'power2.out',
  scrollTrigger: { trigger:'.form-wrap', start:'top 85%', once:true }
});

/* Area travel note */
gsap.from('.area-travel-note', {
  opacity:0, y:16, duration:0.6, ease:'power2.out',
  scrollTrigger: { trigger:'.area-travel-note', start:'top 90%', once:true }
});

/* ── SMOOTH ANCHORS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.pageYOffset - 76,
        behavior: 'smooth'
      });
    }
  });
});

/* ── FORM FEEDBACK ── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const btn = form.querySelector('.form-submit');
    if (btn) {
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
      btn.innerHTML = 'Sending… <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>';
    }
  });
}
