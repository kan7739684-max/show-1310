(function(){
  /* обратный отсчёт до 13.10.2026 18:00 МСК (UTC+3) */
  var T = Date.UTC(2026,9,13,15,0,0);
  function tick(){
    var s = Math.max(0, Math.floor((T - Date.now())/1000));
    var d = Math.floor(s/86400), h = Math.floor(s%86400/3600), m = Math.floor(s%3600/60);
    document.getElementById('cd-d').textContent = d;
    document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
    document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
    if (s===0) document.getElementById('countdown').style.display='none';
  }
  tick(); setInterval(tick, 30000);

  /* регистрация: все золотые кнопки ведут на страницу регистрации GetCourse (адрес — в js/config.js).
     UTM-метки текущего визита (utm_*) дописываются к адресу, GetCourse сохраняет их в карточке пользователя. */
  var UTM_KEYS = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  var q = new URLSearchParams(location.search);
  function withUtm(url){
    try { var u = new URL(url, location.href); } catch(e){ return url; }
    UTM_KEYS.forEach(function(k){ var v = q.get(k); if (v) u.searchParams.set(k, v); });
    return u.toString();
  }
  var cfg = window.SHOW_CONFIG || {};
  var REG = String(cfg.REG_URL || '');
  var regReady = /^https?:\/\//.test(REG) && REG.indexOf('PLACEHOLDER') === -1;
  document.querySelectorAll('[data-reg]').forEach(function(a){
    if (regReady) { a.href = withUtm(REG); if (cfg.REG_NEW_TAB) { a.target = '_blank'; a.rel = 'noopener'; } }
    /* пока адрес не задан, кнопки ведут к блоку регистрации (#forma) */
  });
  /* кнопки оплаты Союза тоже несут UTM текущего визита */
  document.querySelectorAll('a[href*="iimatograf_pay"]').forEach(function(a){ a.href = withUtm(a.href); });

  /* видео: обложка + загрузка плеера по клику (быстрая загрузка страницы) */
  document.querySelectorAll('[data-vimeo]').forEach(function(b){
    b.addEventListener('click', function(){
      if (b.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.src = 'https://player.vimeo.com/video/' + b.dataset.vimeo + '?autoplay=1&dnt=1&title=0&byline=0&portrait=0';
      f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.title = b.getAttribute('aria-label');
      b.appendChild(f);
    });
  });

  /* искры */
  if (!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)){
    var box = document.getElementById('sparkles'), n = innerWidth < 600 ? 20 : 40, colors = ['#ffe2a0','#f6c86a','#ffd27a','#bfe6ff','#9fd8ff'];
    for (var i=0;i<n;i++){ var s=document.createElement('i'), sz=(Math.random()*4+2).toFixed(1);
      s.style.cssText='left:'+(Math.random()*100).toFixed(2)+'%;--s:'+sz+'px;--d:'+(10+Math.random()*16).toFixed(1)+'s;--delay:-'+(Math.random()*20).toFixed(1)+'s;--x:'+(Math.random()*80-40).toFixed(0)+'px;--o:'+(0.4+Math.random()*0.6).toFixed(2)+';--c:'+colors[i%colors.length];
      box.appendChild(s); }
  }

  /* появление при прокрутке */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }); }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    items.forEach(function(el){ io.observe(el); });
  } else items.forEach(function(el){ el.classList.add('in'); });

  /* липкая кнопка на мобильном: после первого экрана, скрыта у формы и финального блока */
  var sticky = document.getElementById('sticky'), heroBtn = document.querySelector('.hero .btn'),
      hide = [document.getElementById('forma'), document.getElementById('final')];
  function onScroll(){
    var hb = heroBtn.getBoundingClientRect();
    var near = hide.some(function(el){ var r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; });
    sticky.classList.toggle('show', hb.bottom < 0 && !near);
  }
  addEventListener('scroll', onScroll, {passive:true}); onScroll();
})();
