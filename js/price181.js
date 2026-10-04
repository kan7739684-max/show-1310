/* Интерактивный блок «Сколько стоит одно занятие»: 2 900 ₽ ÷ 16 = 181 ₽. Без библиотек. */
(function(){
  var root = document.querySelector('[data-p181]');
  if (!root) return;
  var card = root.querySelector('.p181-card'), grid = root.querySelector('.p181-grid'),
      valEl = root.querySelector('.p181-val'), numEl = root.querySelector('.p181-num'),
      divEl = root.querySelector('.p181-div b'), subEl = root.querySelector('.p181-sub'),
      cmp = root.querySelector('.p181-compare'), stack = root.querySelector('.p181-stack'),
      stage = root.querySelector('.p181-stage'), sr = root.querySelector('.p181-sr');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TOTAL = 2900, N = 16, NB = '\u00a0';

  var P = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
  var ICONS = {
    spark:'<path '+P+' d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.5 2.5M15.2 15.2l2.5 2.5M6.3 17.7l2.5-2.5M15.2 8.8l2.5-2.5"/>',
    clap:'<path '+P+' d="M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 10l-.6-3.2a1 1 0 0 1 .8-1.2l13.8-2.4a1 1 0 0 1 1.2.8l.4 2.4L4 10zM8.5 5.3l2.3 3.3M13.5 4.4l2.3 3.3"/>',
    wand:'<path '+P+' d="M4 20 15 9M13 7l4 4M17 3v3M15.5 4.5h3M20 9v2M19 10h2M9 4v2M8 5h2"/>',
    film:'<circle '+P+' cx="12" cy="12" r="8.5"/><circle '+P+' cx="12" cy="7.5" r="1.6"/><circle '+P+' cx="12" cy="16.5" r="1.6"/><circle '+P+' cx="7.5" cy="12" r="1.6"/><circle '+P+' cx="16.5" cy="12" r="1.6"/>',
    palette:'<path '+P+' d="M12 3.5a8.5 8.5 0 1 0 0 17c1.3 0 1.9-.9 1.9-1.8 0-1.4-1.2-1.7-1.2-3 0-1 .8-1.7 1.8-1.7h2.2a3.8 3.8 0 0 0 3.8-3.8C20.5 6.6 16.7 3.5 12 3.5z"/><circle cx="7.6" cy="11" r="1.3" fill="currentColor"/><circle cx="10.4" cy="7.4" r="1.3" fill="currentColor"/><circle cx="15" cy="7.6" r="1.3" fill="currentColor"/>',
    note:'<path '+P+' d="M9 18V5.5l10-2V16"/><circle '+P+' cx="6.5" cy="18" r="2.5"/><circle '+P+' cx="16.5" cy="16" r="2.5"/>',
    cam:'<path '+P+' d="M3.5 8h11a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM15.5 11.5l5-3v9l-5-3"/><circle '+P+' cx="6" cy="5" r="2"/><circle '+P+' cx="11.5" cy="5" r="2"/>',
    brush:'<path '+P+' d="M19.5 4.5 11 13M9.5 14.5c-2.2-.4-4 1.3-4 3.4 0 1-.6 1.6-1.5 2.1 3.9.9 7.6-.4 7.1-4z"/><path '+P+' d="m10.5 12 1.8 1.8"/>',
    book:'<path '+P+' d="M12 6.5c-2-1.6-4.8-2-8-1.5v13c3.2-.5 6 0 8 1.5 2-1.5 4.8-2 8-1.5V5c-3.2-.5-6-.1-8 1.5zM12 6.5v13"/>',
    mic:'<rect '+P+' x="9" y="3" width="6" height="11" rx="3"/><path '+P+' d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/>',
    bulb:'<path '+P+' d="M9 17.5h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2v1.7h5.2v-1.7c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>',
    star:'<path '+P+' d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    heart:'<path '+P+' d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/>',
    pen:'<path '+P+' d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4"/>',
    globe:'<circle '+P+' cx="12" cy="12" r="8.5"/><path '+P+' d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5z"/>',
    crown:'<path '+P+' d="M4 17.5 3 7.5l5 4 4-6 4 6 5-4-1 10zM4.5 20.5h15"/>'
  };
  var ORDER = ['spark','clap','wand','film','palette','note','cam','brush','book','mic','bulb','star','heart','pen','globe','crown'];

  function fmt(n){ n = Math.round(n); var s = String(n); return n >= 1000 ? s.slice(0, -3) + NB + s.slice(-3) : s; }

  var tiles = [], coins = [];
  ORDER.forEach(function(k, i){
    var li = document.createElement('li');
    li.className = 'p181-t ' + (i < 4 ? 'b' : 'g');
    li.innerHTML = '<span class="p181-ti"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[k] + '</svg><small>181' + NB + '₽</small></span>';
    var a = (i * 137.5) * Math.PI / 180;            /* «разлёт» с разных сторон, детерминированно */
    li.style.setProperty('--fx', Math.round(Math.cos(a) * 140) + 'px');
    li.style.setProperty('--fy', Math.round(Math.sin(a) * 120 - 60) + 'px');
    li.style.setProperty('--fr', ((i % 2 ? 1 : -1) * (12 + (i * 7) % 24)) + 'deg');
    grid.appendChild(li); tiles.push(li);
  });
  for (var c = 0; c < 11; c++){                     /* 11 монет ≈ 1 000 ₽, 2 монеты ≈ 181 ₽ (в 5,5 раза меньше) */
    var co = document.createElement('i'); co.className = 'p181-coin' + (c >= 2 ? ' x' : ''); co.style.setProperty('--i', c);
    stack.appendChild(co); coins.push(co);
  }

  var timers = [], raf = 0, shown = TOTAL, played = false;
  function later(fn, ms){ timers.push(setTimeout(fn, ms)); }
  function setVal(v){ shown = v; valEl.textContent = fmt(v); }
  function tween(to, ms){
    cancelAnimationFrame(raf);
    var from = shown, t0 = performance.now();
    (function step(t){ var p = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - p, 3);
      setVal(from + (to - from) * e); if (p < 1) raf = requestAnimationFrame(step); })(t0);
    numEl.classList.remove('tick'); void numEl.offsetWidth; numEl.classList.add('tick');
  }
  function setMode(m){
    cmp.classList.toggle('is-soyuz', m === 'soyuz'); stage.dataset.mode = m;
    cmp.querySelectorAll('[data-mode]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.mode === m)); });
  }
  function setState(s){ card.dataset.state = s; cmp.setAttribute('aria-hidden', String(s === 'idle' || s === 'split')); }
  function burst(){
    if (reduce) return;
    var badge = root.querySelector('.p181-badge'), r = badge.getBoundingClientRect(), cr = card.getBoundingClientRect();
    var cols = ['#ffe2a0','#f6c86a','#9fd8ff','#7dffb0'];
    for (var i = 0; i < 18; i++){
      var s = document.createElement('i'), a = i / 18 * Math.PI * 2, d = 60 + (i % 3) * 30;
      s.className = 'p181-burst';
      s.style.cssText = 'left:' + (r.left - cr.left + r.width / 2 - 4) + 'px;top:' + (r.top - cr.top + r.height / 2 - 4) + 'px;--c:' + cols[i % 4] + ';--bx:' + Math.round(Math.cos(a) * d * 1.6) + 'px;--by:' + Math.round(Math.sin(a) * d) + 'px';
      card.appendChild(s); later((function(el){ return function(){ el.remove(); }; })(s), 1000);
    }
  }
  function finish(){
    setState('done'); later(burst, 150);
    sr.textContent = '2 900 ₽ ÷ 16 занятий = 181,25 ₽ за занятие. Обычно занятие стоит от 1 000 ₽ — в Союзе в 5,5 раза выгоднее.';
  }
  function reset(){
    timers.forEach(clearTimeout); timers = []; cancelAnimationFrame(raf);
    tiles.forEach(function(t){ t.classList.remove('on'); });
    setVal(TOTAL); divEl.textContent = '1'; subEl.textContent = 'вступительный взнос'; setMode('usual'); setState('idle'); sr.textContent = '';
  }
  function showAll(){                                /* мгновенно — для prefers-reduced-motion */
    reset(); tiles.forEach(function(t){ t.classList.add('on'); });
    setVal(TOTAL / N); divEl.textContent = N; subEl.textContent = 'за занятие · точно 181,25' + NB + '₽'; setMode('soyuz'); finish();
  }
  function play(){
    played = true;
    if (reduce) return showAll();
    reset(); setState('split'); subEl.textContent = 'делим на занятия…';
    var step = 230, t0 = 250;
    tiles.forEach(function(t, i){
      later(function(){ t.classList.add('on'); divEl.textContent = i + 1; tween(TOTAL / (i + 1), step * .9); }, t0 + i * step);
    });
    var tEnd = t0 + N * step + 250;
    later(function(){ subEl.textContent = 'за занятие · точно 181,25' + NB + '₽'; setState('compare'); }, tEnd);
    later(function(){ setMode('soyuz'); }, tEnd + 1300);
    later(finish, tEnd + 2100);
  }

  root.querySelector('.p181-play').addEventListener('click', play);
  root.querySelector('.p181-replay').addEventListener('click', play);
  cmp.querySelectorAll('[data-mode]').forEach(function(b){
    b.addEventListener('click', function(){ setMode(b.dataset.mode); if (card.dataset.state === 'compare'){ timers.forEach(clearTimeout); timers = []; later(finish, 700); } });
  });

  /* автозапуск, когда блок попал в экран (один раз) */
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting && !played){ io.disconnect(); later(play, 400); } });
    }, { threshold: .35 });
    io.observe(grid);
  }
  reset();
  window.P181 = { play: play, reset: reset, showAll: showAll };   /* для отладки/скриншотов */
})();
