/* ==========================================================
   Save the date — cuenta regresiva
   Lo único que necesita JS en toda la pieza.
   ========================================================== */
(function () {
  'use strict';

  /* 06/03/2027 18:00 hora de Argentina (UTC-3) = 21:00 UTC */
  var FECHA = Date.UTC(2027, 2, 6, 21, 0, 0);

  var caja = document.getElementById('cuenta');
  if (!caja) return;

  var lista = caja.querySelector('.cuenta__lista');
  var titulo = caja.querySelector('.cuenta__titulo');
  var hoy = caja.querySelector('.cuenta__hoy');

  var u = {
    dias: lista.querySelector('[data-u="dias"]'),
    horas: lista.querySelector('[data-u="horas"]'),
    minutos: lista.querySelector('[data-u="minutos"]'),
    segundos: lista.querySelector('[data-u="segundos"]')
  };

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var falta = FECHA - Date.now();

    if (falta <= 0) {
      titulo.hidden = true;
      lista.hidden = true;
      hoy.hidden = false;
      clearInterval(reloj);
      return;
    }

    var seg = Math.floor(falta / 1000);
    u.dias.textContent = Math.floor(seg / 86400);
    u.horas.textContent = pad(Math.floor(seg / 3600) % 24);
    u.minutos.textContent = pad(Math.floor(seg / 60) % 60);
    u.segundos.textContent = pad(seg % 60);
  }

  var reloj = setInterval(tick, 1000);
  tick();
})();
