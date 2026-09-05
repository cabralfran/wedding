/* ==========================================================
   Eugenia & Francisco — invitación
   Sin dependencias. Todo vanilla.
   ========================================================== */
(function () {
  'use strict';

  /* ---------- Menú mobile ---------- */
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });

  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Nav con fondo al scrollear ---------- */
  function onScroll() {
    nav.classList.toggle('is-stuck', window.scrollY > window.innerHeight * 0.6);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Cuenta regresiva ----------
     06/03/2027 18:00 hora de Argentina (UTC-3) = 21:00 UTC */
  var FECHA = Date.UTC(2027, 2, 6, 21, 0, 0);
  var box = document.getElementById('countdown');
  var msg = document.getElementById('countdownMsg');
  var units = {
    dias: box.querySelector('[data-unit="dias"]'),
    horas: box.querySelector('[data-unit="horas"]'),
    minutos: box.querySelector('[data-unit="minutos"]'),
    segundos: box.querySelector('[data-unit="segundos"]')
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var falta = FECHA - Date.now();

    if (falta <= 0) {
      box.hidden = true;
      msg.hidden = false;
      clearInterval(timer);
      return;
    }

    var seg = Math.floor(falta / 1000);
    units.dias.textContent = Math.floor(seg / 86400);
    units.horas.textContent = pad(Math.floor(seg / 3600) % 24);
    units.minutos.textContent = pad(Math.floor(seg / 60) % 60);
    units.segundos.textContent = pad(seg % 60);
  }

  var timer = setInterval(tick, 1000);
  tick();

  /* ---------- Formulario todavía no cargado ---------- */
  var rsvp = document.getElementById('rsvpBtn');
  var rsvpAviso = document.getElementById('rsvpAviso');

  if (rsvp && rsvp.hasAttribute('data-pendiente')) {
    rsvp.removeAttribute('target');
    rsvp.addEventListener('click', function (e) {
      e.preventDefault();
      rsvpAviso.hidden = false;
    });
  }

  /* ---------- Copiar alias ---------- */
  var copyBtn = document.getElementById('copyAlias');
  var alias = document.getElementById('aliasValue').textContent.trim();

  copyBtn.addEventListener('click', function () {
    function ok() {
      copyBtn.textContent = '¡Copiado!';
      copyBtn.classList.add('is-done');
      setTimeout(function () {
        copyBtn.textContent = 'Copiar';
        copyBtn.classList.remove('is-done');
      }, 2000);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(alias).then(ok, fallback);
    } else {
      fallback();
    }

    // Safari viejo / http: seleccionamos el texto para copiar a mano
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = alias;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); ok(); } catch (err) { /* nada */ }
      document.body.removeChild(ta);
    }
  });

  /* ---------- Carrusel de fotos ---------- */
  (function () {
    var track = document.getElementById('carouselTrack');
    if (!track) return;

    var controls = document.getElementById('carouselControls');
    var dotsBox = document.getElementById('carouselDots');
    var arrows = controls.querySelectorAll('.carousel__arrow');
    var slides = Array.prototype.slice.call(track.children);
    var suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Un punto por slide */
    var dots = slides.map(function (slide, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel__dot';
      b.setAttribute('aria-label', 'Ir a la foto ' + (i + 1) + ' de ' + slides.length);
      b.addEventListener('click', function () { irA(i); });
      dotsBox.appendChild(b);
      return b;
    });

    function paso() {
      if (slides.length < 2) return track.clientWidth;
      return slides[1].offsetLeft - slides[0].offsetLeft;   // ancho de slide + gap
    }

    function indiceActual() {
      var i = Math.round(track.scrollLeft / paso());
      return Math.max(0, Math.min(i, slides.length - 1));
    }

    function irA(i) {
      track.scrollTo({ left: i * paso(), behavior: suave ? 'smooth' : 'auto' });
    }

    arrows.forEach(function (btn) {
      btn.addEventListener('click', function () {
        irA(indiceActual() + Number(btn.dataset.dir));
      });
    });

    function refrescar() {
      /* Si entran todas juntas en pantalla, no hace falta ningún control */
      var desborda = track.scrollWidth - track.clientWidth > 1;
      controls.hidden = !desborda;
      if (!desborda) return;

      var i = indiceActual();
      var fin = track.scrollLeft >= track.scrollWidth - track.clientWidth - 1;

      dots.forEach(function (d, n) {
        var activo = fin ? n === slides.length - 1 : n === i;
        d.classList.toggle('is-active', activo);
        d.setAttribute('aria-current', activo ? 'true' : 'false');
      });

      arrows[0].disabled = track.scrollLeft <= 1;
      arrows[1].disabled = fin;
    }

    var pendiente = false;
    track.addEventListener('scroll', function () {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(function () { pendiente = false; refrescar(); });
    }, { passive: true });

    window.addEventListener('resize', refrescar);
    if (window.ResizeObserver) new ResizeObserver(refrescar).observe(track);
    refrescar();
  })();

  /* ---------- Aparecer al scrollear ---------- */
  var reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  reveals.forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 90 + 'ms';
    io.observe(el);
  });
})();
