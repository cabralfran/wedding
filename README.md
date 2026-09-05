# Invitación — Eugenia & Francisco

**Sábado 6 de marzo de 2027 · 18:00 hs · Posta Natural, Tandil**

Sitio estático: **HTML + CSS + JS**, sin build, sin dependencias.

```
index.html      → todo el contenido
styles.css      → estilos (variables de color arriba de todo)
script.js       → menú mobile, countdown, copiar alias, animaciones
img/
  posta-natural.jpg   → foto real del lugar
  pareja-hero.svg     → PLACEHOLDER (hero)
  pareja-1/2/3.svg    → PLACEHOLDERS (hospedaje + galería)
```

## Ver en local
Abrí `index.html` con doble click. Si querés servirlo:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Reemplazar las fotos de la pareja
Poné las fotos reales en `img/` y cambiá las rutas en `index.html`:

| Dónde | Línea con | Reemplazar por |
|---|---|---|
| Hero | `img/pareja-hero.svg` | foto vertical, idealmente 1200×1600 |
| Hospedaje | `img/pareja-1.svg` | vertical 3:4 |
| Carrusel | `img/pareja-1/2/3.svg` | fotos verticales 3:4 |

Comprimí antes de subir (https://squoosh.app), apuntá a < 400 KB por foto.

## Agregar fotos al carrusel
En `index.html`, sección `#fotos`, sumá un `<li>` más dentro de `.carousel__track`:

```html
<li class="carousel__slide">
  <img src="img/pareja-4.jpg" alt="Eugenia y Francisco" width="900" height="1200" loading="lazy">
</li>
```

Los puntitos y las flechas se generan solos. Si todas las fotos entran en pantalla
(3 o menos en desktop) los controles se ocultan; a partir de la cuarta aparecen.
Se ven de a 1 en celular, 2 en tablet y 3 en desktop, y se arrastra con el dedo.

## Cambiar colores
Arriba de `styles.css`, en `:root`:

```css
--crema:#faf7f2;   /* fondo */
--tinta:#2e3128;   /* texto */
--salvia:#6e7f63;  /* verde acento */
--terracota:#b4694a; /* acento cálido / botones */
```

## Datos configurables
- **Formulario de confirmación**: *pendiente*. En `index.html`, sección `#confirmar`, pegá la URL del Google Form en el `href` de `#rsvpBtn` y borrá el atributo `data-pendiente` (hasta entonces el botón muestra un aviso en vez de navegar).
- **Fecha del countdown**: `script.js`, constante `FECHA` — hoy `Date.UTC(2027, 2, 6, 21, 0, 0)` (mes base 0; 18:00 ART = 21:00 UTC).
- **Alias**: `index.html`, `#aliasValue` (`francisco.cabral`, BBVA).
- **WhatsApp hospedaje**: `https://wa.me/5491155775902`.
- **Mapa**: coordenadas `-37.336091,-59.173875`.

## Publicar
Cualquiera de estas, gratis y en 2 minutos:
- **Netlify Drop** — https://app.netlify.com/drop, arrastrás la carpeta.
- **Vercel** — `npx vercel` en la carpeta.
- **GitHub Pages** — push al repo, Settings → Pages.

Después conectás un dominio propio si querés (`eugeyfran.com.ar`).
