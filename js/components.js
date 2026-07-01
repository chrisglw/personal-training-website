const NAV_LINKS = [
  { href: 'index.html', label: 'Home' },
  { href: 'programs.html', label: 'Programs' },
  { href: 'bookme.html', label: 'Book Me', cta: true },
];

const SOCIAL_LINKS = [
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33v7.03C18.34 21.24 22 17.08 22 12.06Z"/></svg>',
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 3h2.94l-6.43 7.35L23 21h-5.96l-4.67-6.1L6.98 21H4.04l6.88-7.87L4 3h6.11l4.22 5.58L18.9 3Zm-1.03 16.17h1.63L7.21 4.74H5.46l12.41 14.43Z"/></svg>',
  },
];

function currentPage() {
  const path = window.location.pathname.split('/').pop();
  return path === '' ? 'index.html' : path;
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = currentPage();
    const navHtml = NAV_LINKS.map((link) => {
      const classes = [link.cta ? 'nav-cta' : ''].filter(Boolean).join(' ');
      return `<a href="${link.href}"${classes ? ` class="${classes}"` : ''}${
        link.href === page ? ' aria-current="page"' : ''
      }>${link.label}</a>`;
    }).join('');

    this.innerHTML = `
      <header>
        <div class="header-inner">
          <a id="logo_link" href="index.html" aria-label="Christian Guevara Personal Training — Home">
            <img class="logo" src="assets/logo1.png" alt="Christian Guevara Personal Training logo" width="140" height="40" />
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle menu">
            <span class="nav-toggle-bar"></span>
            <span class="nav-toggle-bar"></span>
            <span class="nav-toggle-bar"></span>
          </button>
          <nav id="primary-nav" aria-label="Primary">${navHtml}</nav>
        </div>
      </header>
    `;

    const toggle = this.querySelector('.nav-toggle');
    const nav = this.querySelector('#primary-nav');

    const closeNav = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') closeNav();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeNav();
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const socialHtml = SOCIAL_LINKS.map(
      (social) =>
        `<a href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="${social.label}">${social.icon}</a>`
    ).join('');

    this.innerHTML = `
      <footer>
        <div class="footer-inner">
          <div class="footer-brand">
            <a href="index.html" aria-label="Christian Guevara Personal Training — Home">
              <img src="assets/logo1.png" alt="Christian Guevara Personal Training logo" width="120" height="34" />
            </a>
            <p>Online &amp; in-person coaching to help you become the best version of yourself.</p>
          </div>
          <p class="footer-copyright">&copy; <span id="copyright-year">${year}</span> Christian Guevara. All rights reserved.</p>
          <div class="footer-social">
            <span class="footer-social-label">Follow Along</span>
            <div class="social">${socialHtml}</div>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
