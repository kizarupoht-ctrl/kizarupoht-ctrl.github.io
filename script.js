(function () {
  var KEY = 'cookie-consent';
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // ---- Согласие на cookie ----
  var box = document.getElementById('cookie');
  function loadAds() {
    // ВСТАВЬТЕ СЮДА подключение рекламы и статистики (скрипт AdSense, Яндекс Метрика и т. п.).
    // Функция вызывается ТОЛЬКО после того, как посетитель нажал «Принять все».
  }
  var saved = get(KEY);
  if (saved === null) { box.hidden = false; }
  else if (saved === 'all') { loadAds(); }
  document.getElementById('cookie-all').addEventListener('click', function () {
    set(KEY, 'all'); box.hidden = true; if (saved !== 'all') { saved = 'all'; loadAds(); }
  });
  document.getElementById('cookie-min').addEventListener('click', function () {
    var was = saved; set(KEY, 'necessary'); saved = 'necessary'; box.hidden = true;
    if (was === 'all') { location.reload(); }  // убираем уже загруженные рекламные скрипты
  });
  document.getElementById('cookie-open').addEventListener('click', function () { box.hidden = false; });

  // ---- Страница чтения: размер шрифта и полоса прогресса ----
  var read = document.querySelector('.read');
  if (!read) return;
  var fs = parseFloat(get('font-size')) || 1.2;
  function apply() { read.style.setProperty('--rs', fs + 'rem'); }
  apply();
  document.getElementById('fs-up').addEventListener('click', function () { fs = Math.min(1.8, fs + 0.1); set('font-size', fs); apply(); });
  document.getElementById('fs-down').addEventListener('click', function () { fs = Math.max(1.0, fs - 0.1); set('font-size', fs); apply(); });
  var bar = document.getElementById('bar');
  function prog() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? Math.min(100, window.scrollY / h * 100) : 0) + '%';
  }
  window.addEventListener('scroll', prog, { passive: true }); prog();
})();
