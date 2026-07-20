document.addEventListener('DOMContentLoaded', () => {

  // Sticky nav
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Active link
  const path = location.pathname.toLowerCase();
  document.querySelectorAll('.nav__link').forEach(l => {
    const href = l.getAttribute('href') || '';
    const name = href.toLowerCase().replace('.html', '');
    
    const isActive = (name === 'index' && (path === '/' || path.endsWith('/') || path.includes('index'))) || 
                     (name !== 'index' && name !== '' && path.includes(name));
                     
    l.classList.toggle('active', isActive);
  });

  // Hamburger
  const burger = document.getElementById('nav-hamburger');
  const links  = document.getElementById('nav-links');
  burger?.addEventListener('click', () => links.classList.toggle('open'));

  // More button dropdown
  const moreBtn = document.getElementById('nav-more-btn');
  const moreDropdown = document.getElementById('nav-more-dropdown');
  const moreIcon = moreBtn?.querySelector('.nav__more-icon');

  if (moreBtn && moreDropdown) {
    moreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = moreDropdown.classList.toggle('open');
      moreBtn.setAttribute('aria-expanded', isOpen);
      if (moreIcon) {
        moreIcon.style.transform = isOpen ? 'rotate(180deg)' : 'none';
      }
    });

    document.addEventListener('click', (e) => {
      if (!moreBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
        moreDropdown.classList.remove('open');
        moreBtn.setAttribute('aria-expanded', 'false');
        if (moreIcon) {
          moreIcon.style.transform = 'none';
        }
      }
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => obs.observe(el));

  // Stat counter
  const countTo = (el, target) => {
    if (!target || isNaN(target)) return;
    const suffix = el.textContent.replace(/[0-9]/g,'').trim();
    let n = 0;
    const step = target / 60;
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = Math.floor(n) + suffix;
      if (n >= target) clearInterval(t);
    }, 24);
  };
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const txt = el.textContent;
      if (txt.startsWith('58')) countTo(el, 58);
      else if (txt.startsWith('25')) countTo(el, 25);
      else if (txt.startsWith('3000')) countTo(el, 3000);
      statObs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.stat__num').forEach(el => statObs.observe(el));

  // Preloader fade out
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.add('loaded');
      }, 2500);
    });
    // Fallback in case window load is delayed
    setTimeout(() => {
      if (!preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        document.body.classList.add('loaded');
      }
    }, 4000);
  }

});
