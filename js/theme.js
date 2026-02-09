/* =========================
   Menta Core JS
   Shared across all panels
========================= */

(() => {
  initTheme();
  initMobileSidebar();
})();

/* =========================
   Theme (Light / Dark)
========================= */
function initTheme() {
  const root = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');

  const THEME_KEY = 'theme';
  const THEMES = {
    light: 'light',
    dark: 'dark',
  };

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) || THEMES.light;
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateToggleIcon(theme);

    // Notify other scripts/or pages
    document.dispatchEvent(
      new CustomEvent('theme:change', { detail: theme })
    );
  }

  function updateToggleIcon(theme) {
    if (!themeToggle) return;

    const icon =
      themeToggle.querySelector('[data-icon]') || themeToggle;
    icon.textContent = theme === THEMES.dark ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const current =
      root.getAttribute('data-theme') || THEMES.light;
    const next =
      current === THEMES.dark ? THEMES.light : THEMES.dark;
    setTheme(next);
  }

  // Init theme on load
  setTheme(getSavedTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

/* =========================
   Mobile Sidebar (Admin)
========================= */
function initMobileSidebar() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebarArea = document.querySelector('.sidebar-area');

  // Guard: only admin pages
  if (!menuToggle || !sidebarArea) return;

  menuToggle.addEventListener('click', () => {
    sidebarArea.classList.toggle('open');
  });

  // Close sidebar when clicking outside (mobile UX)
  document.addEventListener('click', (e) => {
    if (
      sidebarArea.classList.contains('open') &&
      !sidebarArea.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      sidebarArea.classList.remove('open');
    }
  });
}
