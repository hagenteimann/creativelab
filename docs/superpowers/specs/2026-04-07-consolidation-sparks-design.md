# Design Spec: CSS-Konsolidierung + Goldene Funken
**Datum:** 2026-04-07

---

## Ziel

Zwei unabhängige Verbesserungen:
1. **CSS-Konsolidierung** — Basisklassen für Buttons, Badges, Overlines. Kein visueller Unterschied, ~60 Zeilen CSS weniger.
2. **Goldene Funken** — Canvas-basiertes Scroll-Partikel-Overlay. Sehr subtile goldene Punkte die beim Scrollen aufsteigen und verblassen.

Beide Änderungen erfolgen in `index.html` (Single-File).

---

## Teil 1: CSS-Konsolidierung

### 1a. `.btn` Basisklasse

Neue Basisklasse die von `.btn-primary`, `.btn-ghost`, `.btn-outline` gemeinsam genutzt wird:

```css
.btn {
  padding: 14px 24px;
  border-radius: var(--r-sm);
  font-size: 14px;
  line-height: 1.6;
  display: inline-block;
  transition: background .2s, transform .2s;
}
```

`.btn-primary`, `.btn-ghost`, `.btn-outline` behalten nur noch ihre differenzierenden Properties (Farbe, Border, spezifische Transitions).

Im HTML: alle Button-Elemente bekommen zusätzlich die Klasse `btn` — z.B. `class="btn btn-primary"`.

### 1b. `.price-btn-dark` und `.price-btn-gold` zusammenführen

Beide Klassen sind identisch außer dem Hover-Hintergrund:
- `.price-btn-dark:hover` → `var(--s400)`
- `.price-btn-gold:hover` → `var(--g700)`

Gemeinsame Properties werden in `.price-btn-dark` konsolidiert (als Basis). `.price-btn-gold` behält nur seinen spezifischen Hover-Override. Kein HTML-Änderungsbedarf.

### 1c. `.badge` Basisklasse

Neue Basisklasse für alle Pill-Badges:

```css
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: var(--r-pill);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  width: fit-content;
}
```

Betroffene Klassen: `.uc-badge`, `.popular-badge`, `.cta-badge` — behalten nur noch ihre differenzierenden Properties (border-color, color, background).

Im HTML: alle Badge-Elemente bekommen zusätzlich `badge` als Klasse.

### 1d. `.overline` als Basis für `.work-label`

`.work-label` ist identisch mit `.overline` außer der Farbe (`--n300` statt `--g300`). Die `.work-label`-CSS-Regel wird entfernt. Im HTML werden `.work-label`-Elemente zu `class="overline"` mit einer zusätzlichen CSS-Override-Regel:

```css
.overline.muted { color: var(--n300); }
```

Oder alternativ: `.work-label` wird direkt durch `.overline` ersetzt und die Farbe wird inline überschrieben — je nachdem was sauberer ist im bestehenden HTML.

---

## Teil 2: Goldene Funken (Canvas)

### HTML

Ein einzelnes Canvas-Element direkt nach dem öffnenden `<body>`-Tag:

```html
<canvas id="sparks"></canvas>
```

### CSS

```css
#sparks {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9997;
  opacity: 0.6;
}
```

Z-Index 9997: unter dem Cursor-Ring (9998) und Cursor-Dot (9999), über allem anderen Content.

### JavaScript

```javascript
(function(){
  const canvas = document.getElementById('sparks');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let lastScroll = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function spawn() {
    const count = 2;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 1.5 + Math.random(),           // 1.5–2.5px
        vy: -(0.4 + Math.random() * 0.4), // aufsteigen
        a: 0.5 + Math.random() * 0.2      // alpha 0.5–0.7
      });
    }
    // Deckel: max. 40 aktive Partikel
    if (particles.length > 40) particles = particles.slice(-40);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        spawn();
        ticking = false;
      });
      ticking = true;
    }
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.a > 0);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,169,110,${p.a})`;
      ctx.fill();
      p.y += p.vy;
      p.a -= 0.008;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
```

**Verhalten:**
- Beim Scrollen: 2 Funken spawnen an zufälligem X, zufälligem Y im sichtbaren Bereich
- Jeder Funke steigt mit 0.4–0.8px/Frame auf
- Alpha sinkt um 0.008/Frame → Lebensdauer ~62–87 Frames (~1–1.5s bei 60fps)
- Max. 40 gleichzeitig aktive Partikel
- Throttled über `requestAnimationFrame` (kein Scroll-Spam)

---

## Was wird NICHT geändert

- Visuelles Erscheinungsbild der Buttons (nur CSS-Struktur)
- Visuelles Erscheinungsbild der Badges (nur CSS-Struktur)
- Alle Inhalte, Farben, Abstände
- JavaScript außer dem neuen Sparks-Block
