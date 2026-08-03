const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
    setHeader();
    addEventListener('scroll', setHeader, { passive: true });

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Menü öffnen');
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Menü öffnen' : 'Menü schließen');
      nav.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      }), { threshold: .12, rootMargin: '0px 0px -40px' });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } else {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    }

    document.getElementById('project-form').addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const name = String(data.get('name') || '').trim();
      const phone = String(data.get('phone') || '').trim();
      const email = String(data.get('email') || '').trim();
      const project = String(data.get('project') || '').trim();
      const subject = encodeURIComponent('Projektanfrage von ' + name);
      const body = encodeURIComponent(`Guten Tag Herr Epp,\n\nich möchte folgendes Projekt anfragen:\n\n${project}\n\nName: ${name}\nTelefon: ${phone || '—'}\nE-Mail: ${email}\n\nMit freundlichen Grüßen\n${name}`);
      document.getElementById('form-status').textContent = 'Ihr E-Mail-Programm wird geöffnet …';
      window.location.href = `mailto:schlosserei-epp@web.de?subject=${subject}&body=${body}`;
    });
    document.getElementById('year').textContent = new Date().getFullYear();
