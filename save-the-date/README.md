# Save the date — Eugenia & Francisco

**Sábado 6 de marzo de 2027 · 18 hs · Posta Natural, Tandil**

Pieza corta, para mandar primero por WhatsApp. Una sola pantalla, sin dependencias
(el único JS es la cuenta regresiva). Comparte paleta con la invitación; las tipografías
viven en `fonts/` (Cormorant Garamond + Montserrat), así no depende de Google Fonts.

```
index.html    → toda la pieza
styles.css    → estilos (variables de color y tipografías arriba de todo)
script.js     → la cuenta regresiva, nada más
evento.ics    → el evento que se descarga con "Agendar la fecha"
img/
  posta-natural.jpg → fondo (foto real del lugar)
  pareja.svg        → PLACEHOLDER, por si preferís una foto de los dos
```

## Ver en local
Doble click en `index.html`. O bien:

```bash
python3 -m http.server 8000
```

> El botón "Agendar la fecha" descarga un archivo: para probarlo tal cual lo va a
> ver un invitado, usá el servidor, no `file://`.

## Cambiar la foto de fondo
En `index.html`, el `<img>` dentro de `.fondo`. Si querés una foto de ustedes dos,
poné el archivo en `img/` y cambiá el `src`. Elegí una **horizontal y con aire
en el centro** — la tarjeta se apoya justo ahí. Si la foto es clara, subí un poco
la opacidad del velo en `styles.css` → `.fondo::after`.

## Si cambia la fecha
Hay que tocarla en tres lugares:
1. `index.html` → bloque `.fecha`
2. `index.html` → el link de Google Calendar (`dates=...`, en UTC)
3. `evento.ics` → `DTSTART` / `DTEND` (también en UTC)
4. `script.js` → la constante `FECHA` (el mes va con base 0: marzo = `2`)

18:00 hora de Argentina = **21:00 UTC** del mismo día.

## Publicar
Es una carpeta aparte de la invitación, así que podés:

- **Subirla sola** a Netlify Drop / Vercel → te queda una URL corta para mandar ahora.
- O, como vive dentro de la carpeta de la invitación, subir todo junto: la
  invitación queda en `/` y esto en `/save-the-date/`. Un solo deploy, dos links.

Mandá el link con un texto corto: la vista previa de WhatsApp ya muestra la foto,
el título y la fecha (están en los `og:` del `<head>`).
