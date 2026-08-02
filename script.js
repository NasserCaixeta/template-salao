(() => {
  const body = document.body;
  const entry = document.getElementById('entry');
  const header = document.getElementById('header');
  const soundToggle = document.getElementById('soundToggle');
  const menuToggle = document.getElementById('menuToggle');
  const menuPanel = document.getElementById('menuPanel');
  const cursor = document.querySelector('.cursor');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let soundEnabled = false;
  let audioCtx = null;
  let lastScroll = 0;

  body.classList.add('is-locked');

  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  }

  function chime(frequency = 660, duration = 0.12, volume = 0.025) {
    if (!soundEnabled) return;
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.32, audioCtx.currentTime + duration);
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration + 0.03);
  }

  function enterSite(withSound) {
    soundEnabled = withSound;
    soundToggle?.classList.toggle('is-muted', !soundEnabled);
    if (soundEnabled) { initAudio(); chime(440, .32, .035); }
    body.classList.remove('is-locked');

    if (window.gsap && !reduceMotion) {
      gsap.timeline({ onComplete: () => entry.remove() })
        .to('.entry__content', { y: -35, opacity: 0, duration: .7, ease: 'power3.in' })
        .to('.entry__veil', { scale: 1.22, duration: 1.1, ease: 'power2.inOut' }, 0)
        .to(entry, { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'power4.inOut' }, .35)
        .from('.hero__image--back', { scale: 1.2, duration: 1.8, ease: 'power3.out' }, .6)
        .from('.hero__topline, .hero__kicker, .hero__bottom, .hero__scroll', { opacity: 0, y: 18, duration: .9, stagger: .09 }, .95);
    } else {
      entry.remove();
    }
  }

  document.querySelectorAll('[data-enter]').forEach(btn => {
    btn.addEventListener('click', () => enterSite(btn.dataset.enter === 'sound'));
  });

  soundToggle?.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.classList.toggle('is-muted', !soundEnabled);
    if (soundEnabled) { initAudio(); chime(600, .16, .03); }
  });

  // Cursor and magnetic interactions
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    document.querySelectorAll('a, button, .service-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });
  }

  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      if (!window.matchMedia('(pointer:fine)').matches) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * .15;
      const y = (e.clientY - r.top - r.height / 2) * .15;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
    el.addEventListener('mouseenter', () => chime(880, .05, .009));
  });

  // Menu
  function setMenu(open) {
    menuToggle.classList.toggle('is-open', open);
    menuPanel.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('is-locked', open);
    if (window.gsap) {
      gsap.set(menuPanel, { visibility: 'visible' });
      gsap.to(menuPanel, {
        clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
        duration: .8,
        ease: 'power4.inOut',
        onComplete: () => { if (!open) gsap.set(menuPanel, { visibility: 'hidden' }); }
      });
      gsap.fromTo('.menu-panel nav a', { y: open ? 55 : 0, opacity: open ? 0 : 1 }, { y: 0, opacity: open ? 1 : 0, duration: .65, stagger: .06, delay: open ? .25 : 0, ease: 'power3.out' });
    } else {
      menuPanel.style.visibility = open ? 'visible' : 'hidden';
      menuPanel.style.clipPath = open ? 'inset(0)' : 'inset(0 0 100% 0)';
    }
    chime(open ? 520 : 390, .12, .02);
  }
  menuToggle?.addEventListener('click', () => setMenu(!menuToggle.classList.contains('is-open')));
  menuPanel?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Header behavior
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > innerHeight * .72);
    if (y > 400) header.classList.toggle('is-hidden', y > lastScroll && Math.abs(y-lastScroll) > 4);
    else header.classList.remove('is-hidden');
    lastScroll = y;
  }, { passive: true });

  if (!window.gsap || reduceMotion) {
    document.querySelectorAll('.reveal-block, .reveal-media').forEach(el => el.style.opacity = 1);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling
  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: .9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Text splitting
  document.querySelectorAll('.split-lines').forEach(el => {
    const nodes = Array.from(el.childNodes);
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const words = node.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach(word => {
          if (!word.trim()) { frag.appendChild(document.createTextNode(word)); return; }
          const outer = document.createElement('span');
          outer.className = 'split-word';
          const inner = document.createElement('span');
          inner.textContent = word;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        node.replaceWith(frag);
      }
    });
  });

  gsap.from('.hero__title .split-word > span', { yPercent: 115, rotate: 3, duration: 1.15, stagger: .045, delay: 1.25, ease: 'power4.out' });

  gsap.to('.hero__image--back', {
    scale: 1.18,
    yPercent: 8,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero__content', {
    yPercent: 18, opacity: .22, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  document.querySelectorAll('section:not(.hero) .split-lines').forEach(el => {
    gsap.from(el.querySelectorAll('.split-word > span'), {
      yPercent: 110, rotate: 2, duration: .95, stagger: .025, ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 86%' }
    });
  });

  document.querySelectorAll('.reveal-block').forEach(el => {
    gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } });
  });
  document.querySelectorAll('.reveal-media').forEach(el => {
    gsap.from(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.25, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 82%' } });
  });

  gsap.from('.principles__grid article', {
    y: 55, opacity: 0, duration: .8, stagger: .14, ease: 'power3.out',
    scrollTrigger: { trigger: '.principles__grid', start: 'top 78%' }
  });

  // Desktop horizontal services
  const mediaDesktop = window.matchMedia('(min-width: 741px)');
  if (mediaDesktop.matches) {
    const track = document.querySelector('.horizontal-track');
    const shell = document.querySelector('.horizontal-shell');
    const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    gsap.to(track, {
      x: () => -getDistance(), ease: 'none',
      scrollTrigger: {
        trigger: shell,
        start: 'top top',
        end: () => `+=${getDistance() + innerHeight * .5}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true
      }
    });
  }

  // Method sequence
  const method = document.querySelector('.method');
  const methodSteps = [...document.querySelectorAll('.method-step')];
  const methodImages = [...document.querySelectorAll('.method__image')];
  const current = document.getElementById('methodCurrent');

  ScrollTrigger.create({
    trigger: method,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => {
      const index = Math.min(2, Math.floor(self.progress * 3));
      methodSteps.forEach((el, i) => el.classList.toggle('is-active', i === index));
      methodImages.forEach((el, i) => el.classList.toggle('is-active', i === index));
      current.textContent = `0${index + 1}`;
    }
  });

  gsap.from('.booking__content', { y: 70, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.booking', start: 'top 70%' } });
  gsap.to('.booking__orb', { yPercent: 14, xPercent: -8, rotate: 18, ease: 'none', scrollTrigger: { trigger: '.booking', start: 'top bottom', end: 'bottom top', scrub: true } });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
