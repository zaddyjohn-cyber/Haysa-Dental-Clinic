/* ============================================
   SMILE BEST DENTAL — GSAP ANIMATIONS
   ScrollTrigger, VanillaTilt, Splitting.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Wait for GSAP and ScrollTrigger
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── SPLITTING.JS TEXT ANIMATION ──
  if (typeof Splitting !== 'undefined') {
    Splitting();

    // Hero headline chars
    const heroChars = document.querySelectorAll('.hero-headline .char');
    if (heroChars.length) {
      gsap.from(heroChars, {
        opacity: 0,
        y: 80,
        rotation: 5,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.025,
        delay: 2.5,
      });
    }

    // Section headline reveals
    document.querySelectorAll('[data-split="chars"]').forEach(el => {
      Splitting({ target: el });
      gsap.from(el.querySelectorAll('.char'), {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
      });
    });

    // Word-level splits
    document.querySelectorAll('[data-split="words"]').forEach(el => {
      Splitting({ target: el, by: 'words' });
      gsap.from(el.querySelectorAll('.word'), {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power2.out',
      });
    });
  }

  // ── HERO ELEMENTS ──
  const heroTL = gsap.timeline({ delay: 2.3 });
  heroTL
    .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0)
    .to('.hero-subline', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.4)
    .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.6)
    .to('.scroll-indicator', { opacity: 1, duration: 1, ease: 'power2.out' }, 0.9);

  // ── FADE UP — GENERIC SECTIONS ──
  gsap.utils.toArray('.gsap-fade-up').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power3.out',
    });
  });

  // ── FADE LEFT / RIGHT ──
  gsap.utils.toArray('.gsap-fade-left').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 0,
      x: -50,
      duration: 1,
      ease: 'power3.out',
    });
  });

  gsap.utils.toArray('.gsap-fade-right').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 0,
      x: 50,
      duration: 1,
      ease: 'power3.out',
    });
  });

  // ── BEFORE/AFTER CARDS STAGGER ──
  const baCards = gsap.utils.toArray('.ba-card');
  if (baCards.length) {
    gsap.from(baCards, {
      scrollTrigger: {
        trigger: baCards[0].parentElement,
        start: 'top 85%',
      },
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });
  }

  // ── SERVICE CARDS STAGGER ──
  const serviceCards = gsap.utils.toArray('.service-card');
  if (serviceCards.length) {
    gsap.from(serviceCards, {
      scrollTrigger: {
        trigger: serviceCards[0].parentElement,
        start: 'top 85%',
      },
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
    });
  }

  // ── TESTIMONIAL CARDS STAGGER ──
  const testimonialCards = gsap.utils.toArray('.testimonial-card');
  if (testimonialCards.length) {
    gsap.from(testimonialCards, {
      scrollTrigger: {
        trigger: testimonialCards[0].parentElement,
        start: 'top 85%',
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }

  // ── WHY SPLIT SECTIONS ── (image pins while text scrolls)
  const whySplits = document.querySelectorAll('.why-split');
  whySplits.forEach(section => {
    const img = section.querySelector('.why-image-wrap');
    const content = section.querySelector('.why-content');

    if (!img || !content) return;

    gsap.from(img, {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      opacity: 0,
      x: section.classList.contains('reverse') ? 60 : -60,
      duration: 1.1,
      ease: 'power3.out',
    });

    gsap.from(content.children, {
      scrollTrigger: { trigger: section, start: 'top 80%' },
      opacity: 0,
      x: section.classList.contains('reverse') ? -40 : 40,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power2.out',
    });
  });

  // ── TIMELINE ITEMS ──
  const timelineItems = gsap.utils.toArray('.timeline-item');
  timelineItems.forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: 'top 88%' },
      opacity: 0,
      x: 30,
      duration: 0.7,
      delay: i * 0.05,
      ease: 'power2.out',
      onComplete: () => item.style.opacity = 1,
    });
  });

  // ── SERVICES PAGE STICKY NAV HIGHLIGHT ──
  const serviceBlocks = document.querySelectorAll('.service-block');
  serviceBlocks.forEach((block, i) => {
    ScrollTrigger.create({
      trigger: block,
      start: 'top 200px',
      end: 'bottom 200px',
      onEnter: () => updateServiceNav(i),
      onEnterBack: () => updateServiceNav(i),
    });

    // Animate service block elements
    const num = block.querySelector('.service-block-number');
    const heading = block.querySelector('h2');
    const para = block.querySelector('p');
    const img = block.querySelector('.service-block-image');

    if (heading) {
      gsap.from(heading, {
        scrollTrigger: { trigger: block, start: 'top 80%' },
        opacity: 0,
        x: 40,
        duration: 0.9,
        ease: 'power3.out',
      });
    }

    if (img) {
      gsap.from(img, {
        scrollTrigger: { trigger: block, start: 'top 75%' },
        opacity: 0,
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.1,
        ease: 'power3.out',
      });
    }
  });

  function updateServiceNav(activeIndex) {
    document.querySelectorAll('.service-nav-item').forEach((item, i) => {
      item.classList.toggle('active', i === activeIndex);
    });
  }

  // ── INSTAGRAM GRID ──
  gsap.utils.toArray('.ig-post').forEach((post, i) => {
    gsap.from(post, {
      scrollTrigger: { trigger: post.parentElement, start: 'top 85%' },
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power2.out',
    });
  });

  // ── SECTION LABEL LINES ──
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: 'power2.out',
    });
  });

  // ── GOLD DIVIDER DRAW ──
  gsap.utils.toArray('.gold-divider').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      scaleX: 0,
      transformOrigin: 'left',
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // ── PULL QUOTE REVEAL ──
  const pullQuote = document.querySelector('.pull-quote');
  if (pullQuote) {
    gsap.from(pullQuote, {
      scrollTrigger: { trigger: pullQuote, start: 'top 80%' },
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
    });
  }

  // ── STATS BAR PARALLAX ──
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    gsap.from(statsBar.querySelectorAll('.stat-item'), {
      scrollTrigger: { trigger: statsBar, start: 'top 85%' },
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }

  // ── INNER HERO ELEMENTS ──
  const innerHero = document.querySelector('.inner-hero');
  if (innerHero) {
    gsap.from(innerHero.querySelectorAll('h1, h2, p, .label-tag, .btn'), {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 2.3,
    });
  }

  // ── PARALLAX IMAGES ──
  gsap.utils.toArray('.parallax-img-wrap img').forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: -80,
      ease: 'none',
    });
  });

  // ── FLOATING ELEMENTS (multiple depth planes) ──
  gsap.utils.toArray('.float-layer-1').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
      y: -30,
      ease: 'none',
    });
  });

  gsap.utils.toArray('.float-layer-2').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -60,
      ease: 'none',
    });
  });

  gsap.utils.toArray('.float-layer-3').forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -100,
      ease: 'none',
    });
  });

  // ── VANILLA TILT ──
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.service-card'), {
      max: 12,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.03,
    });

    VanillaTilt.init(document.querySelectorAll('.testimonial-card'), {
      max: 8,
      speed: 400,
      glare: false,
      scale: 1.02,
    });

    VanillaTilt.init(document.querySelectorAll('.team-card'), {
      max: 10,
      speed: 300,
      glare: true,
      'max-glare': 0.1,
      scale: 1.03,
    });

    VanillaTilt.init(document.querySelectorAll('.specialty-card'), {
      max: 8,
      speed: 300,
      glare: false,
    });
  }
});
