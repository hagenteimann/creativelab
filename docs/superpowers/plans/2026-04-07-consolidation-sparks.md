# Konsolidierung + Goldene Funken Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** CSS-Basisklassen für Buttons und Badges konsolidieren, `.work-label` mit `.overline` zusammenführen, und ein Canvas-basiertes goldenes Funken-Overlay beim Scrollen hinzufügen.

**Architecture:** Alle CSS-Änderungen in `index.html` (inline `<style>`-Block). Neue `.btn`-Basisklasse und `.badge`-Basisklasse reduzieren Duplikate. Canvas + JS-Block am Ende der Datei für die Funken. Kein visueller Unterschied durch die Konsolidierung.

**Tech Stack:** Vanilla HTML/CSS/JS, Single-File (`index.html`)

---

## Kontext für alle Tasks

**Datei:** `C:\Users\Hagen\Desktop\Buiness\Creativ Lab\index.html`

Relevante Zeilenbereiche:
- `:root` Tokens: Zeilen 12–38
- `.overline`: Zeile 60
- `.btn-primary` / `.btn-ghost` / `.btn-outline` / `.btn-glow`: Zeilen 179–207
- `.work-label`: Zeile 226
- `.uc-badge`: Zeilen 317–324
- `.popular-badge`: Zeilen 386–391
- `.cta-badge`: Zeilen 398–402
- `.price-btn` / `.price-btn-dark` / `.price-btn-gold`: Zeilen 377–385
- `</script>` (Ende JS-Block): Zeile 1174
- HTML Buttons: Zeilen 678, 679, 696, 908, 909
- HTML `.work-label`: Zeile 702

---

## Task 1: `.btn` Basisklasse

**Files:**
- Modify: `C:\Users\Hagen\Desktop\Buiness\Creativ Lab\index.html` — CSS Zeilen 179–207, HTML Zeilen 678/679/696/908/909

**Ziel:** Gemeinsame Properties von `.btn-primary`, `.btn-ghost`, `.btn-outline` in eine `.btn`-Basisklasse extrahieren.

- [ ] **Schritt 1: `.btn`-Basisklasse vor `.btn-primary` einfügen (Zeile 179)**

Direkt vor `.btn-primary{` einfügen:
```css
/* ── BUTTONS ── */
.btn{
  padding:14px 24px;border-radius:var(--r-sm);
  font-size:14px;line-height:1.6;
  display:inline-block;transition:background .2s,transform .2s;
}
```

- [ ] **Schritt 2: Redundante Properties aus `.btn-primary` entfernen**

`.btn-primary` (Zeilen 179–184) wird zu:
```css
.btn-primary{background:var(--n100);color:var(--s500)}
.btn-primary:hover{background:var(--g100);transform:translateY(-2px)}
```

(Entfernt: `padding`, `border-radius`, `font-size`, `line-height`, `display`, `transition` — kommen von `.btn`)

- [ ] **Schritt 3: Redundante Properties aus `.btn-ghost` entfernen**

`.btn-ghost` (Zeilen 186–192) wird zu:
```css
.btn-ghost{
  background:rgba(255,255,255,.10);color:var(--n100);
  border:1px solid rgba(255,255,255,.12);
}
.btn-ghost:hover{background:rgba(255,255,255,.16);transform:translateY(-2px)}
```

- [ ] **Schritt 4: Redundante Properties aus `.btn-outline` entfernen**

`.btn-outline` (Zeilen 194–200) wird zu:
```css
.btn-outline{
  background:transparent;color:var(--n100);
  border:1px solid var(--s0);
  transition:border-color .2s,color .2s,transform .2s;
}
.btn-outline:hover{border-color:var(--n100);color:var(--n100);transform:translateY(-2px)}
```

(`.btn-outline` überschreibt `transition` von `.btn` mit eigener spezifischerer Transition — das ist korrekt)

- [ ] **Schritt 5: `btn`-Klasse zu allen Button-Elementen im HTML hinzufügen**

Folgende HTML-Zeilen anpassen:

Zeile 678: `class="btn-primary"` → `class="btn btn-primary"`
Zeile 679: `class="btn-ghost"` → `class="btn btn-ghost"`
Zeile 696: `class="btn-glow"` — NICHT ändern (`.btn-glow` hat andere `padding` und `border-radius`)
Zeile 908: `class="btn-primary"` → `class="btn btn-primary"`
Zeile 909: `class="btn-outline"` → `class="btn btn-outline"`

- [ ] **Schritt 6: Visuell prüfen**

Browser öffnen → Hero-Buttons, CTA-Buttons sehen identisch zu vorher aus. Keine Größenänderungen.

- [ ] **Schritt 7: Commit**

```bash
cd "C:/Users/Hagen/Desktop/Buiness/Creativ Lab"
git add index.html
git commit -m "refactor: .btn Basisklasse für btn-primary/ghost/outline — padding/font-size/display/transition dedupliziert, HTML-Elemente mit .btn Klasse versehen"
```

---

## Task 2: `.badge` Basisklasse + `.work-label` + `.price-btn-gold` Konsolidierung

**Files:**
- Modify: `C:\Users\Hagen\Desktop\Buiness\Creativ Lab\index.html` — CSS + HTML

**Ziel:** Gemeinsame Badge-Properties extrahieren, `.work-label` mit `.overline` zusammenführen, `.price-btn-gold` Duplikat entfernen.

### Teil A: `.badge` Basisklasse

- [ ] **Schritt 1: `.badge`-Basisklasse direkt vor `.uc-badge` einfügen (vor Zeile 317)**

```css
/* ── BADGE ── */
.badge{
  display:inline-flex;align-items:center;justify-content:center;
  padding:4px 8px;border-radius:var(--r-pill);
  font-size:12px;font-weight:500;width:fit-content;
}
```

- [ ] **Schritt 2: Redundante Properties aus `.uc-badge` entfernen**

`.uc-badge` (Zeilen 317–324) wird zu:
```css
.uc-badge{
  border:1px solid var(--n300);background:#000;
  letter-spacing:1px;color:var(--n300);
  white-space:nowrap;margin-top:16px;
  transition:border-color .2s,color .2s;
}
```

(Entfernt: `display`, `align-items`, `justify-content`, `padding`, `border-radius`, `font-size`, `font-weight`, `width:fit-content` — kommen von `.badge`)

- [ ] **Schritt 3: Redundante Properties aus `.popular-badge` entfernen**

`.popular-badge` (Zeilen 386–391) wird zu:
```css
.popular-badge{
  background:var(--s300);border:1px solid var(--s0);
  letter-spacing:3px;color:var(--n300);
}
```

- [ ] **Schritt 4: `.badge`-Klasse im HTML hinzufügen**

Zeile 874: `class="popular-badge"` → `class="badge popular-badge"`

Alle 4 `.uc-badge` Spans (Zeilen 786, 793, 800, 807):
`class="uc-badge"` → `class="badge uc-badge"`

Hinweis: `.cta-badge` (Zeile 904) ist KEIN Pill-Badge (hat `--r-sm`) — bleibt unverändert.

### Teil B: `.work-label` mit `.overline` zusammenführen

- [ ] **Schritt 5: `.work-label` CSS-Regel entfernen**

Die gesamte CSS-Regel `.work-label{...}` (Zeile 226) löschen:
```css
.work-label{font-size:12px;font-weight:500;letter-spacing:3px;color:var(--n300);text-align:center;line-height:1.3}
```
(Diese Zeile komplett entfernen)

- [ ] **Schritt 6: Modifier-Klasse zu `.overline` hinzufügen**

Direkt nach `.overline{...}` (Zeile 60) eine neue Zeile einfügen:
```css
.overline.neutral{color:var(--n300);text-transform:none}
```

- [ ] **Schritt 7: HTML Zeile 702 anpassen**

`class="work-label reveal"` → `class="overline neutral reveal"`

### Teil C: `.price-btn-gold` Duplikat bereinigen

- [ ] **Schritt 8: `.price-btn-gold` Base-Properties entfernen**

Aktuell:
```css
.price-btn-dark{background:#000;border:1px solid var(--s0);color:var(--n100)}
.price-btn-dark:hover{background:var(--s400)}
.price-btn-gold{background:#000;border:1px solid var(--s0);color:var(--n100)}
.price-btn-gold:hover{background:var(--g700)}
```

`.price-btn-gold` Base ist identisch mit `.price-btn-dark` Base. Entfernen und Multi-Selektor nutzen:
```css
.price-btn-dark,.price-btn-gold{background:#000;border:1px solid var(--s0);color:var(--n100)}
.price-btn-dark:hover{background:var(--s400)}
.price-btn-gold:hover{background:var(--g700)}
```

- [ ] **Schritt 9: Commit**

```bash
cd "C:/Users/Hagen/Desktop/Buiness/Creativ Lab"
git add index.html
git commit -m "refactor: .badge Basisklasse für uc-badge/popular-badge, .work-label → .overline.neutral, price-btn-dark/gold Base-Properties dedupliziert"
```

---

## Task 3: Goldene Funken Canvas

**Files:**
- Modify: `C:\Users\Hagen\Desktop\Buiness\Creativ Lab\index.html` — CSS (neues `#sparks`), HTML (`<canvas>`), JS (neuer Block vor `</script>`)

**Ziel:** Beim Scrollen erscheinen 2 winzige goldene Punkte die aufsteigen und verblassen.

- [ ] **Schritt 1: `#sparks` CSS hinzufügen**

Im CSS-Block (nach `/* ── PROGRESS BAR ── */`, ca. Zeile 73) einfügen:
```css
/* ── SPARKS ── */
#sparks{position:fixed;inset:0;pointer-events:none;z-index:9997;opacity:.6}
```

- [ ] **Schritt 2: `<canvas>` ins HTML einfügen**

Direkt nach dem öffnenden `<body>`-Tag (vor dem ersten `<div id="cursor">`):
```html
<canvas id="sparks"></canvas>
```

- [ ] **Schritt 3: Sparks-JS direkt vor `</script>` einfügen (Zeile 1174)**

Den folgenden Block direkt vor dem schließenden `</script>`-Tag einfügen:

```javascript
/* ── SPARKS ── */
(function(){
  const canvas=document.getElementById('sparks');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let particles=[];

  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
  resize();
  window.addEventListener('resize',resize);

  function spawn(){
    for(let i=0;i<2;i++){
      particles.push({
        x:Math.random()*window.innerWidth,
        y:Math.random()*window.innerHeight,
        r:1.5+Math.random(),
        vy:-(0.4+Math.random()*0.4),
        a:0.5+Math.random()*0.2
      });
    }
    if(particles.length>40)particles=particles.slice(-40);
  }

  let ticking=false;
  window.addEventListener('scroll',function(){
    if(!ticking){requestAnimationFrame(function(){spawn();ticking=false;});ticking=true;}
  });

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles=particles.filter(function(p){return p.a>0;});
    for(let i=0;i<particles.length;i++){
      const p=particles[i];
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(201,169,110,'+p.a+')';
      ctx.fill();
      p.y+=p.vy;
      p.a-=0.008;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
```

- [ ] **Schritt 4: Visuell prüfen**

Browser öffnen → scrollen → vereinzelt erscheinen winzige goldene Punkte die aufsteigen und verblassen. Max. 2 pro Scroll-Event. Kein visueller Impact auf bestehende Elemente (pointer-events:none).

- [ ] **Schritt 5: Commit**

```bash
cd "C:/Users/Hagen/Desktop/Buiness/Creativ Lab"
git add index.html
git commit -m "feat: Goldene Funken Canvas-Overlay — scroll-getriggert, 2 Partikel/Event, 1.5-2.5px rgba(201,169,110), aufsteigend verblassend, max 40 aktiv, z-index 9997"
```

---

## Spec-Selbst-Review

| Spec-Anforderung | Task | Abgedeckt |
|---|---|---|
| `.btn` Basisklasse für primary/ghost/outline | Task 1 | ✅ |
| `.btn`-Klasse im HTML | Task 1 | ✅ |
| `.badge` Basisklasse für uc-badge/popular-badge | Task 2 | ✅ |
| `.work-label` → `.overline.neutral` | Task 2 | ✅ |
| `.price-btn-gold` Duplikat entfernen | Task 2 | ✅ |
| Canvas `#sparks` CSS + HTML | Task 3 | ✅ |
| Scroll-Trigger: 2 Partikel/Event | Task 3 | ✅ |
| Partikel: 1.5–2.5px, rgba(201,169,110) | Task 3 | ✅ |
| Aufsteigen + Verblassen in ~1.5s | Task 3 | ✅ |
| Max. 40 aktive Partikel | Task 3 | ✅ |
| Z-Index 9997 (unter Cursor) | Task 3 | ✅ |
| `.btn-glow` bleibt unverändert | Task 1 | ✅ |
| `.cta-badge` bleibt unverändert | Task 2 | ✅ |
