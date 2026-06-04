// Progressive ripple effect — lightweight, keyboard-friendly, respects reduced-motion
(function () {
  const SELECTOR = '.btn-primary, .embla__btn, .interactive, [data-ripple]';
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function createRipple(e) {
    try {
      if ('button' in e && e.button !== 0) return; // ignore non-left clicks

      const el = e.currentTarget;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';

      const clientX = (typeof e.clientX === 'number') ? e.clientX : (rect.left + rect.width / 2);
      const clientY = (typeof e.clientY === 'number') ? e.clientY : (rect.top + rect.height / 2);

      const x = clientX - rect.left - size / 2;
      const y = clientY - rect.top - size / 2;
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.setAttribute('aria-hidden', 'true');

      // insert before children so ripple sits under text/content
      el.insertBefore(ripple, el.firstChild);

      if (reducedMotion) {
        ripple.style.opacity = '0.3';
        setTimeout(() => { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 120);
        return;
      }

      ripple.addEventListener('animationend', () => {
        if (ripple && ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, { once: true });
    } catch (err) {
      // Fail silently — progressive enhancement
      console.error('ripple error', err);
    }
  }

  function onKeyDown(e) {
    // trigger ripple for keyboard activation (Enter / Space)
    if (e.key === 'Enter' || e.key === ' ') {
      const el = e.target.closest(SELECTOR);
      if (el) {
        createRipple({ currentTarget: el, clientX: null, clientY: null, button: 0 });
      }
    }
  }

  function init() {
    document.querySelectorAll(SELECTOR).forEach(el => {
      if (el.dataset.rippleInit) return;
      el.dataset.rippleInit = '1';
      const cs = window.getComputedStyle(el);
      if (cs.position === 'static') el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.addEventListener('pointerdown', createRipple);
    });

    document.addEventListener('keydown', onKeyDown, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

})();
