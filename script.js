document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Sticky nav background ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  /* ---------- Inquiry modal ---------- */
  const inquiryModal = document.getElementById('inquiryModal');
  const inquiryClose = document.getElementById('inquiryModalClose');
  const inquiryTriggers = [
    document.getElementById('inquiryBtnNav'),
    document.getElementById('inquiryBtnHero'),
    document.getElementById('inquiryBtnTraining')
  ].filter(Boolean);

  const openInquiry = (e) => {
    e.preventDefault();
    inquiryModal.classList.add('is-open');
  };
  const closeInquiry = () => inquiryModal.classList.remove('is-open');

  inquiryTriggers.forEach(btn => btn.addEventListener('click', openInquiry));
  inquiryClose.addEventListener('click', closeInquiry);
  inquiryModal.addEventListener('click', (e) => {
    if (e.target === inquiryModal) closeInquiry();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeInquiry();
  });

  /* ---------- Lightbox for gallery ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery__item[data-full]').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.getAttribute('data-full');
      lightboxImg.alt = item.querySelector('img')?.alt || '';
      lightbox.classList.add('is-open');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.about__media, .about__text, .service-card, .training__video-card, .training__gallery figure, .look, .gallery__item, .contact__intro, .contact__form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contact form ---------- */
  /* No backend yet — submitting opens a pre-filled email to the studio inbox.
     For a no-popup, "lands in an inbox silently" experience instead, sign up
     free at https://formspree.io, then swap this for a fetch() POST to your
     Formspree endpoint. */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const LEAD_EMAIL = 'trendingneedle@gmail.com';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const interest = document.getElementById('interest').value;
    const message = document.getElementById('message').value.trim();

    const subject = `New inquiry from ${name} — ${interest}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Interested in: ${interest}\n\n` +
      `Message:\n${message}`;

    const mailtoLink = `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;

    status.textContent = 'Opening your email app to send this to Trendle Luxe — just hit send there.';
    form.reset();
  });

});
