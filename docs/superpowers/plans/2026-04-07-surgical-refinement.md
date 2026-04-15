# Surgical Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Das bestehende Design der `index.html` wird in 4 unabhängigen Tasks verfeinert — kohärentes Radius-System, konsolidiertes Glassmorphism, strenge Gold-Regel, noble Details.

**Architecture:** Alle Änderungen sind rein CSS (inline `<style>`-Block in `index.html`) plus minimale HTML-Klassen-Ergänzungen. Keine neuen Dateien. Keine JavaScript-Änderungen.

**Tech Stack:** Vanilla HTML/CSS, Single-File (`index.html`)

---

## Kontext für alle Tasks

**Datei:** `C:\Users\Hagen\Desktop\Buiness\Creativ Lab\index.html`

Der CSS-Block beginnt bei Zeile 10 mit `<style>` und endet ca. bei Zeile 600+. Die `:root`-Tokens stehen ganz oben (Zeilen 12–34). Alle Tasks modifizieren ausschließlich diese eine Datei.

**Bestehende `:root` Tokens (relevant):**
```css
--bg: #0c0c0c;
--s0: #2a2a2a; --s100: #222; --s200: #1c1c1c; --s300: #141414;
--s400: #111; --s500: #0d0d0d; --s700: #000;
--n100: #f5f5f0; --n300: #a8a8a0; --n400: #8a8a82; --n500: #5a5a55;
--g0: #fdf8f0; --g100: #f5ead5; --g200: #edd9b5; --g300: #e8c99a;
--g400: #d4a574; --g500: #c9a96e; --g600: #b8965a; --g700: #8a6e3a;
--glow: 0 0 10.2px 0 #c9a96e;
```

**Testing:** Da kein Build-System existiert, ist der Test für jeden Task: Datei im Browser öffnen und visuell prüfen. Konkrete Prüfpunkte stehen in jedem Task.

---

## Task 1: Radius-System normieren

**Files:**
- Modify: `index.html` — `:root` Block + alle `border-radius`-Werte im CSS

**Ziel:** Alle 6 verschiedenen Border-Radius-Werte (8, 10, 12, 15, 20, 100px) auf 4 CSS-Variablen normieren.

- [ ] **Schritt 1: CSS-Variablen zu `:root` hinzufügen**

Im `:root`-Block (ca. Zeile 12–34) am Ende ergänzen:
```css
--r-sm:   8px;
--r-md:   12px;
--r-lg:   16px;
--r-pill: 100px;
```

- [ ] **Schritt 2: Alle `border-radius`-Werte ersetzen**

Folgende Ersetzungen im gesamten CSS-Block vornehmen:

| Alter Wert | Neuer Wert | Klassen betroffen |
|---|---|---|
| `border-radius:8px` | `border-radius:var(--r-sm)` | `.btn-primary`, `.btn-ghost`, `.btn-outline`, `.price-btn`, `.field input`, `.field textarea`, `.cta-badge`, `.contact-icon`, `.nav-burger span` (bleibt 2px) |
| `border-radius:10px` | `border-radius:var(--r-md)` | `.contact-form` |
| `border-radius:12px` | `border-radius:var(--r-md)` | `.nav-cta`, `.work-card`, `.uc-card`, `.testi-card`, `.price-card`, `.btn-glow` |
| `border-radius:15px` | `border-radius:var(--r-md)` | `.port-slot` |
| `border-radius:20px` | `border-radius:var(--r-pill)` | `.nav-links` |
| `border-radius:100px` | `border-radius:var(--r-pill)` | `.tab-bar`, `.tab-btn`, `.uc-badge`, `.popular-badge`, `.cta-badge` (falls 100px) |

Achtung: `.nav-burger span` hat `border-radius:2px` — dieser Wert bleibt unverändert (kein passender Token).

- [ ] **Schritt 3: Visuell prüfen**

Browser öffnen → alle Karten, Buttons, Inputs, Tags sehen rund/konsistent aus. Kein Element wirkt kantig oder zu rund im Vergleich zu vorher.

- [ ] **Schritt 4: Commit**

```bash
cd "C:/Users/Hagen/Desktop/Buiness/Creativ Lab"
git add index.html
git commit -m "refactor: Border-Radius auf 4 CSS-Variablen normiert (--r-sm 8px / --r-md 12px / --r-lg 16px / --r-pill 100px) — ersetzt 8/10/12/15/20/100px Chaos"
```

---

## Task 2: Glassmorphism-Konsolidierung

**Files:**
- Modify: `index.html` — neues CSS `.glass` + HTML-Klassen auf betroffenen Elementen + redundante CSS-Props entfernen

**Ziel:** Eine einzige `.glass`-Klasse ersetzt alle manuellen `rgba(255,255,255,.10)` + `backdrop-filter`-Wiederholungen. Opacity von `.10` auf `.08` reduziert.

- [ ] **Schritt 1: `.glass`-Klasse im CSS definieren**

Im CSS-Block nach `/* ── SHARED ── */` (ca. Zeile 54) einfügen:
```css
/* ── GLASS ── */
.glass{
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.08);
  border-radius:var(--r-md);
}
```

- [ ] **Schritt 2: Redundante Background-Props aus Karten-CSS entfernen**

Aus folgenden CSS-Regeln die Properties `background`, `backdrop-filter`, `-webkit-backdrop-filter` entfernen (sie kommen nun von `.glass`). `border` und `border-radius` ebenfalls entfernen wo sie mit `.glass` übereinstimmen:

- `.work-card` — entfernen: `background:rgba(255,255,255,.10)`, `backdrop-filter:blur(2px)`, `border-radius:12px`
- `.uc-card` — entfernen: `background:rgba(255,255,255,.10)`, `border-radius:12px`
- `.testi-card` — entfernen: `background:rgba(255,255,255,.10)`, `border:1px solid var(--s0)`, `border-radius:12px`
- `.price-card` — entfernen: `background:rgba(255,255,255,.10)`, `border:1px solid var(--s0)`, `border-radius:12px`
- `.contact-form` — entfernen: `background:rgba(255,255,255,.10)`, `border:1px solid var(--s100)`, `border-radius:10px`
- `.nav-links` — entfernen: `background:linear-gradient(90deg,rgba(68,68,68,.3),rgba(102,136,170,.3))` → durch `.glass` ersetzt, ABER: `.nav-links` behält `border-radius:var(--r-pill)` als Override (`.glass` setzt `--r-md`, Nav-Links brauchen `--r-pill`)

Für `.nav-links` also nach dem Glass-Entfernen noch hinzufügen:
```css
.nav-links{ border-radius:var(--r-pill); }
```

- [ ] **Schritt 3: `.glass`-Klasse im HTML hinzufügen**

Folgende HTML-Elemente bekommen die Klasse `glass` hinzugefügt:

```html
<!-- work-cards: -->
<div class="work-card glass">

<!-- uc-cards: -->
<div class="uc-card glass">

<!-- testi-cards: -->
<div class="testi-card glass">

<!-- price-cards (nicht .pro): -->
<div class="price-card glass">

<!-- contact-form: -->
<div class="contact-form glass">

<!-- nav-links: -->
<div class="nav-links glass">
```

Achtung: `.price-card.pro` bekommt **kein** `.glass` — diese wird in Task 3 separat behandelt.

- [ ] **Schritt 4: form-submit Button anpassen**

Der `.form-submit` Button hat aktuell `background:linear-gradient(90deg,rgba(68,68,68,.3),rgba(102,136,170,.3))`. Diesen auf `.glass` umstellen indem die Klasse `glass` im HTML hinzugefügt wird:
```html
<button class="form-submit glass" ...>
```
Und aus `.form-submit` CSS entfernen: `background:linear-gradient(...)`.

- [ ] **Schritt 5: Visuell prüfen**

Browser öffnen → alle Karten haben konsistentes Glas-Appearance. Nav-Links hat Pill-Form. Pro-Pricing-Card sieht noch gleich aus (wird Task 3). Kein Element hat doppelte Borders.

- [ ] **Schritt 6: Commit**

```bash
cd "C:/Users/Hagen/Desktop/Buiness/Creativ Lab"
git add index.html
git commit -m "refactor: Glassmorphism auf .glass-Klasse konsolidiert — background opacity .10→.08, blur 12px, alle Karten/Nav/Form unified, redundantes CSS entfernt"
```

---

## Task 3: Gold-Regel & price-card.pro Umbau

**Files:**
- Modify: `index.html` — CSS für Gold-Stellen, `.price-card.pro` komplett umbauen

**Ziel:** Gold nur noch an 5 definierten Stellen. `price-card.pro` von Gold-Fläche auf dunkle Karte mit Gold-Border umbauen.

**Die 5 erlaubten Gold-Stellen:**
1. `.overline` (Overlines)
2. `.nav-links a.active` (aktiver Nav-Link)
3. Ein primärer CTA-Button (`.btn-primary`)
4. `.testi-q` (Testimonial-Anführungszeichen)
5. `#progress-bar` (Progress Bar)

- [ ] **Schritt 1: Gold-Stellen inventarisieren**

Alle `var(--g*)` Vorkommen im CSS durchgehen. Folgende sind **erlaubt** (behalten):
- `.overline { color: var(--g300) }` ✅
- `.nav-links a.active { color: var(--g300) }` ✅
- `.btn-primary` (Hintergrund `var(--g0)`, Text `var(--s500)`) ✅ — bleibt als einziger gold-getönter CTA
- `.testi-q { color: var(--g300) }` ✅
- `#progress-bar { background: linear-gradient(...var(--g*)) }` ✅

- [ ] **Schritt 2: Nicht erlaubte Gold-Stellen entfernen/ersetzen**

| CSS-Klasse | Property | Alt | Neu |
|---|---|---|---|
| `.nav-cta` | `box-shadow` | `var(--glow)` | entfernen (kein Glow) |
| `.nav-cta:hover` | `box-shadow` | `0 0 18px 2px #c9a96e` | `0 8px 24px rgba(0,0,0,.4)` |
| `.btn-glow` | `box-shadow` | `var(--glow)` | entfernen → durch normale Shadow ersetzen: `box-shadow: 0 4px 16px rgba(0,0,0,.3)` |
| `.btn-glow:hover` | `box-shadow` | `0 0 18px 2px #c9a96e` | `0 8px 24px rgba(0,0,0,.5)` |
| `.work-label` | `color` | `var(--g400)` | `var(--n300)` |
| `.about-role` | `color` | `var(--g400)` | `var(--n300)` |
| `.uc-card:hover .uc-badge` | `border-color/color` | `var(--g300)` | `var(--n100)` |
| `.testi-accent` | `background` | `rgba(201,169,110,.28)` | `rgba(255,255,255,.12)` |
| `.testi-stars` | `color` | `var(--g300)` | `var(--n300)` |
| `.field input:focus,.field textarea:focus` | `border-color` | `var(--g300)` | `rgba(102,136,170,.6)` |
| `.price-custom-lbl` | `color` | `var(--g300)` | `var(--n100)` |
| `.popular-badge` | `border-color` | `var(--g700)` | `var(--s0)` |
| `.popular-badge` | `color` | `var(--g600)` | `var(--n300)` |
| `.price-btn-gold` | `border-color` | `var(--g700)` | `var(--s0)` |
| `.price-btn-gold` | `color` | `var(--g0)` | `var(--n100)` |
| `.footer-col a:hover` | `color` | bleibt `var(--n100)` | ✅ (kein Gold) |
| `.nav-mobile a:hover` | `color` | `var(--g300)` | `var(--n100)` |

- [ ] **Schritt 3: `.price-card.pro` von Gold-Fläche auf Gold-Border umbauen**

Altes CSS für `.price-card.pro`:
```css
.price-card.pro{
  border:2px solid var(--g300);
  background:var(--g300);
}
```

Neues CSS:
```css
.price-card.pro{
  border:1px solid rgba(201,169,110,.45);
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
}
```

Alle `.price-card.pro .xyz { color: #000 }` Overrides entfernen (da kein Gold-Hintergrund mehr):
- `.price-card.pro .price-name { color: #000 }` → entfernen
- `.price-card.pro .price-num { color: #000 }` → entfernen
- `.price-card.pro .price-per { color: #000 }` → entfernen
- `.price-card.pro .price-tag { color: #000 }` → entfernen
- `.price-card.pro .price-feat { color: #000 }` → entfernen

Die Pro-Card erbt nun normale `.price-card` + `.glass` Farben. Im HTML: `class="price-card pro glass"` hinzufügen.

- [ ] **Schritt 4: `.btn-primary` farblich prüfen**

`.btn-primary` hat `background:var(--g0)` (fast weiß/cream) und `color:var(--s500)` (sehr dunkel). Das ist der einzige Akzent-Button — prüfen ob er nach den anderen Änderungen noch als Haupt-CTA erkennbar ist. Wenn er zu blass wirkt:
```css
.btn-primary{
  background:var(--n100);
  color:var(--s500);
}
```
(Reines Weiß/Crème statt gold-getöntem Weiß — cleaner)

- [ ] **Schritt 5: Visuell prüfen**

Browser öffnen → Gold ist jetzt nur noch sichtbar bei: Overlines, aktivem Nav-Link, primärem CTA-Button, Testimonial-Quotes, Progress Bar. Pro-Card ist eine edle dunkle Glasskarte mit feinem Gold-Border. Keine gold-leuchtenden Buttons mehr außer dem einen CTA.

- [ ] **Schritt 6: Commit**

```bash
cd "C:/Users/Hagen/Desktop/Buiness/Creativ Lab"
git add index.html
git commit -m "refactor: Gold auf 5 Einsatzpunkte reduziert — price-card.pro von Gold-Fläche auf Glass+Gold-Border, alle übrigen Gold-Glows/Hovers auf Neutral umgestellt"
```

---

## Task 4: Noble Details

**Files:**
- Modify: `index.html` — Divider, Section-Borders, Hover-States, Focus-States

**Ziel:** Feine Details die die Seite zusammenhalten — schwebende Divider, einheitliche Hover-Karten, subtile Section-Trennungen.

- [ ] **Schritt 1: Divider auf Gradient-Fade umstellen**

Altes CSS:
```css
.divider{width:768px;height:1px;background:var(--s0);margin:0 auto;flex-shrink:0}
```

Neues CSS:
```css
.divider{width:768px;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);margin:0 auto;flex-shrink:0}
```

- [ ] **Schritt 2: Section-Trennungen mit feinem Top-Border**

Folgende Sections bekommen `border-top: 1px solid rgba(255,255,255,.04)` hinzugefügt:

```css
#about{ border-top: 1px solid rgba(255,255,255,.04); }
#portfolio{ border-top: 1px solid rgba(255,255,255,.04); }
#use-cases{ border-top: 1px solid rgba(255,255,255,.04); }
#social-proof{ border-top: 1px solid rgba(255,255,255,.04); }
#cta{ border-top: 1px solid rgba(255,255,255,.04); }
#contact{ border-top: 1px solid rgba(255,255,255,.04); }
```

Sections mit eigenem dunklen Background (`#services`, `#pricing`) bekommen keinen Border — der Farbwechsel ist Trennung genug.

- [ ] **Schritt 3: Hover-States aller Karten vereinheitlichen**

Alle Karten-Hover auf einen einheitlichen State:
```css
transform: translateY(-3px);
box-shadow: 0 12px 40px rgba(0,0,0,.4);
```

Konkret folgende Hover-CSS-Regeln anpassen:

```css
/* Vorher: .work-card:hover{background:rgba(255,255,255,.15);transform:translateY(-4px)} */
.work-card:hover{background:rgba(255,255,255,.12);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.4)}

/* Vorher: .uc-card:hover{background:rgba(255,255,255,.15);transform:translateY(-4px)} */
.uc-card:hover{background:rgba(255,255,255,.12);transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.4)}

/* Vorher: .testi-card:hover{transform:translateY(-3px)} */
.testi-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.4)}

/* Vorher: .price-card:hover{transform:translateY(-4px)} */
.price-card:hover{transform:translateY(-3px);box-shadow:0 12px 40px rgba(0,0,0,.4)}

/* Port-Slot bleibt: transform:scale(1.03) — das ist bewusst anders für Bilder */
```

- [ ] **Schritt 4: Focus-States auf Blau umstellen**

Bereits in Task 3 für `.field input:focus,.field textarea:focus` auf `rgba(102,136,170,.6)` umgestellt. Prüfen ob es noch andere Focus-States gibt — falls ja, ebenfalls auf Blau:
```css
.field input:focus,.field textarea:focus{border-color:rgba(102,136,170,.6)}
```

- [ ] **Schritt 5: Transition auf allen Karten prüfen**

Alle Karten sollten `transition` mit denselben Properties haben:
```css
transition: background .25s, transform .25s, box-shadow .25s;
```

Ergänzen bei: `.work-card`, `.uc-card`, `.testi-card`, `.price-card` (falls `box-shadow` noch nicht in `transition` steht).

- [ ] **Schritt 6: Visuell prüfen**

Browser öffnen:
- Divider sehen schwebend aus (Gradient-Fade)
- Sections haben kaum sichtbare aber vorhandene Trennlinien
- Alle Karten heben sich beim Hover gleichmäßig um 3px an mit derselben Shadow
- Formular-Input-Focus leuchtet blau statt gold

- [ ] **Schritt 7: Commit**

```bash
cd "C:/Users/Hagen/Desktop/Buiness/Creativ Lab"
git add index.html
git commit -m "refine: Noble Details — Divider als Gradient-Fade, Section-Border rgba(255,255,255,.04), Hover-Karten einheitlich translateY(-3px)+shadow, Focus-States auf Blau"
```

---

## Selbst-Review gegen Spec

| Spec-Anforderung | Task | Status |
|---|---|---|
| Radius auf 4 Variablen normiert (8/12/16/100px) | Task 1 | ✅ |
| `.glass` Klasse konsolidiert, opacity .08 | Task 2 | ✅ |
| Glassmorphism nicht übertrieben | Task 2 | ✅ (subtile Werte) |
| Gold an max. 5 Stellen | Task 3 | ✅ |
| Gold nicht als Fläche | Task 3 | ✅ (price-card.pro umgebaut) |
| 60/30/10 Farbregel | Task 3 | ✅ |
| Divider Gradient-Fade | Task 4 | ✅ |
| Section-Borders | Task 4 | ✅ |
| Hover-Karten einheitlich | Task 4 | ✅ |
| Focus-States Blau | Task 3+4 | ✅ |
| Farbpalette unverändert | Alle | ✅ (Tokens nicht geändert) |
| Hero-Typografie unverändert | — | ✅ (kein Task nötig) |
| Animations-System unverändert | — | ✅ (kein Task nötig) |
| Nur CSS+Klassen, kein JS | Alle | ✅ |
