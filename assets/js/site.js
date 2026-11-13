(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var data = {};
  try { data = JSON.parse(document.getElementById('site-data').textContent); } catch (e) {}

  /* ---------- theme ---------- */
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  }
  function toggleTheme() { setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'); }
  var themeBtn = document.getElementById('theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  /* ---------- scroll progress ---------- */
  var bar = document.getElementById('progress-bar');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        // stagger elements that enter in the same batch
        el.style.transitionDelay = Math.min(n++, 5) * 80 + 'ms';
        el.classList.add('in');
        setTimeout(function () { el.style.transitionDelay = ''; }, 1400);
        io.unobserve(el);
        countUp(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- stat count-up ---------- */
  function countUp(scope) {
    if (reduce) return;
    scope.querySelectorAll('[data-count]').forEach(function (el) {
      var raw = el.getAttribute('data-count');
      var m = raw.match(/^(\d+)(.*)$/);
      if (!m || +m[1] === 0) return;
      var target = +m[1], suffix = m[2], start = null, dur = 900;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- name decode ---------- */
  var glyphs = '!<>-_\\/[]{}=+*^?#01';
  function scramble(el, delay) {
    var final = el.textContent, frame = 0, total = final.length * 3 + 12;
    el.setAttribute('aria-label', final);
    function tick() {
      var out = '';
      for (var i = 0; i < final.length; i++) {
        var settle = i * 3 + 10;
        if (final[i] === ' ' || frame >= settle) out += final[i];
        else out += glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (++frame <= total) requestAnimationFrame(tick);
      else el.textContent = final;
    }
    setTimeout(function () { requestAnimationFrame(tick); }, delay);
  }
  if (!reduce) {
    document.querySelectorAll('[data-scramble]').forEach(function (el, i) { scramble(el, 120 + i * 180); });
  }

  /* ---------- active nav section ---------- */
  var navLinks = document.querySelectorAll('.nav-links a[data-section]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('active', a.dataset.section === en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(function (a) {
      var s = document.getElementById(a.dataset.section);
      if (s) navIO.observe(s);
    });
  }

  /* ---------- project cards: expand + spotlight ---------- */
  document.querySelectorAll('.card').forEach(function (card) {
    var btn = card.querySelector('.card-toggle');
    var label = card.querySelector('.toggle-label');
    if (btn) {
      btn.addEventListener('click', function () {
        var open = card.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (label) label.textContent = open ? 'show less' : 'how it works';
      });
    }
    if (finePointer) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--x', (e.clientX - r.left) + 'px');
        card.style.setProperty('--y', (e.clientY - r.top) + 'px');
      });
    }
  });

  function openProject(id) {
    var card = document.getElementById(id);
    if (!card) return false;
    if (!card.classList.contains('open')) { var b = card.querySelector('.card-toggle'); if (b) b.click(); }
    card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    return true;
  }

  /* ---------- magnetic buttons ---------- */
  if (finePointer && !reduce) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
        el.style.setProperty('--mx', dx.toFixed(1) + 'px');
        el.style.setProperty('--my', dy.toFixed(1) + 'px');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });
  }

  /* ---------- terminal ---------- */
  var term = document.getElementById('term');
  var out = document.getElementById('term-out');
  var form = document.getElementById('term-form');
  var input = document.getElementById('term-in');
  var history = [], hIdx = 0, lastFocus = null, booted = false;
  var projects = data.projects || [];

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function print(html, cls) {
    var div = document.createElement('div');
    if (cls) div.className = cls;
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }
  function link(href, text) { return '<a href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(text || href) + '</a>'; }

  var commands = {
    help: function () {
      print([
        '<span class="t-acc">available commands</span>',
        '  whoami            who is this',
        '  ls [projects]     list things',
        '  cat about         short bio',
        '  open &lt;project&gt;    jump to a project on the page',
        '  repo &lt;project&gt;    open its GitHub repo',
        '  contact           how to reach me',
        '  theme             toggle light / dark',
        '  clear             clear the screen',
        '  exit              close this (or press esc)'
      ].join('\n'));
    },
    whoami: function () { print('naved — B.Tech CSE (4th year), building detection and security tooling. open to opportunities.'); },
    ls: function (args) {
      if (!args[0] || args[0] === '.' || args[0] === '~') {
        print('<span class="t-sig">projects/</span>  about  contact');
      } else if (/^projects\/?$/.test(args[0])) {
        print(projects.map(function (p) { return '<span class="t-sig">' + esc(p.id) + '</span>  <span class="t-dim">— ' + esc(p.tagline) + '</span>'; }).join('\n'));
      } else {
        print('ls: cannot access \'' + esc(args[0]) + '\': No such file or directory', 't-err');
      }
    },
    cat: function (args) {
      var f = (args[0] || '').replace(/^\.\//, '');
      if (f === 'about') {
        print('Security & systems engineer in progress. I write eBPF detection for Kubernetes nodes,\nlog investigation tools, tested KQL detections and scoped recon automation —\non a base of AWS, Terraform, Kubernetes and ~4 years of daily Linux.');
      } else if (f === 'contact') {
        commands.contact();
      } else if (!f) {
        print('cat: missing operand', 't-err');
      } else {
        print('cat: ' + esc(f) + ': No such file or directory', 't-err');
      }
    },
    open: function (args) {
      var id = (args[0] || '').replace(/^projects\//, '').replace(/\/$/, '').toLowerCase();
      var p = projects.filter(function (x) { return x.id.toLowerCase() === id; })[0];
      if (!p) { print('open: unknown project. try <span class="t-sig">ls projects</span>', 't-err'); return; }
      closeTerm();
      openProject(p.id);
    },
    repo: function (args) {
      var id = (args[0] || '').replace(/^projects\//, '').toLowerCase();
      var p = projects.filter(function (x) { return x.id.toLowerCase() === id; })[0];
      if (!p) { print('repo: unknown project. try <span class="t-sig">ls projects</span>', 't-err'); return; }
      print('opening ' + link(p.repo));
      window.open(p.repo, '_blank', 'noopener');
    },
    contact: function () {
      print([
        'email     <a href="mailto:' + esc(data.email) + '">' + esc(data.email) + '</a>',
        'github    ' + link(data.github),
        'linkedin  ' + link(data.linkedin),
        'notes     ' + link(data.blog)
      ].join('\n'));
    },
    theme: function () { toggleTheme(); print('theme → ' + root.getAttribute('data-theme'), 't-dim'); },
    clear: function () { out.innerHTML = ''; },
    exit: function () { closeTerm(); },
    sudo: function () { print('naved is not in the sudoers file. This incident will be reported.', 't-err'); },
    rm: function (args) { print(args.join(' ').indexOf('-rf') !== -1 ? 'nice try.' : 'rm: permission denied', 't-err'); },
    pwd: function () { print('/home/naved/portfolio'); },
    echo: function (args) { print(esc(args.join(' '))); },
    date: function () { print(new Date().toString()); }
  };
  commands.cd = function () { print('this shell only has one directory. it\'s a good one.', 't-dim'); };
  commands.vim = commands.nano = function () { print('you can check out any time you like, but you can never leave. (not here though — type exit)', 't-dim'); };

  function run(line) {
    var parts = line.trim().split(/\s+/);
    var cmd = (parts.shift() || '').toLowerCase();
    print('<span class="prompt">naved@portfolio:~$</span> <span class="t-cmd">' + esc(line) + '</span>');
    if (!cmd) return;
    if (commands[cmd]) commands[cmd](parts);
    else print(esc(cmd) + ': command not found. type <span class="t-sig">help</span>', 't-err');
  }

  function openTerm() {
    if (!term || !term.hidden) return;
    lastFocus = document.activeElement;
    term.hidden = false;
    document.body.style.overflow = 'hidden';
    if (!booted) {
      booted = true;
      print('<span class="t-dim">portfolio shell — type</span> <span class="t-sig">help</span> <span class="t-dim">to start</span>');
    }
    input.focus();
  }
  function closeTerm() {
    if (!term || term.hidden) return;
    term.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (term) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value;
      if (v.trim()) { history.push(v); }
      hIdx = history.length;
      input.value = '';
      run(v);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') { if (hIdx > 0) { hIdx--; input.value = history[hIdx]; } e.preventDefault(); }
      else if (e.key === 'ArrowDown') { if (hIdx < history.length) { hIdx++; input.value = history[hIdx] || ''; } e.preventDefault(); }
      else if (e.key === 'Tab') {
        e.preventDefault();
        var parts = input.value.split(/\s+/), last = parts[parts.length - 1].toLowerCase();
        var pool = parts.length === 1 ? Object.keys(commands) : projects.map(function (p) { return p.id; }).concat(['about', 'contact', 'projects']);
        var hits = pool.filter(function (c) { return c.indexOf(last) === 0; });
        if (hits.length === 1) { parts[parts.length - 1] = hits[0]; input.value = parts.join(' ') + ' '; }
        else if (hits.length > 1) print(hits.join('  '), 't-dim');
      }
    });
    term.addEventListener('click', function (e) {
      if (e.target === term) closeTerm();
      else if (!e.target.closest('a, button')) input.focus();
    });
    document.querySelectorAll('[data-open-term]').forEach(function (b) { b.addEventListener('click', openTerm); });
    document.querySelectorAll('[data-close-term]').forEach(function (b) { b.addEventListener('click', closeTerm); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeTerm(); return; }
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
      if ((e.key === '~' || e.key === '`') && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        openTerm();
      }
    });
  }
})();
