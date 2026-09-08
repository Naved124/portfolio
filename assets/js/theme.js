(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-switch');
  var label = document.getElementById('theme-switch-label');

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    if (btn) btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    if (label) label.textContent = theme === 'light' ? 'diazo' : 'cyanotype';
  }

  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}

  var prefersLight = window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches;

  apply(stored || (prefersLight ? 'light' : 'dark'));

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
})();
