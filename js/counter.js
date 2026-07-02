/* ============================================
   SMILE BEST DENTAL — COUNTER JS
   CountUp.js triggered on scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-countup]');
  if (!counters.length) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const el = entry.target;
      const target = parseFloat(el.dataset.countup);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const duration = 2200;

      if (typeof CountUp !== 'undefined') {
        const cu = new CountUp(el, target, {
          startVal: 0,
          duration: duration / 1000,
          decimalPlaces: decimals,
          suffix,
          prefix,
          useEasing: true,
          easingFn: (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
          },
        });
        cu.start();
      } else {
        // Fallback if CountUp.js not loaded
        const start = performance.now();
        function update(time) {
          const elapsed = time - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          el.textContent = prefix + (decimals ? value.toFixed(decimals) : Math.floor(value)) + suffix;
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = prefix + target + suffix;
        }
        requestAnimationFrame(update);
      }
    });
  }, observerOptions);

  counters.forEach(c => observer.observe(c));
});
