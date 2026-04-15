# Design Spec: Surgical Refinement — Aus einem Guss
**Datum:** 2026-04-07
**Ansatz:** A — Surgical Refinement

---

## Ziel

Die bestehende Seite wird verfeinert, nicht neu gebaut. Ziel ist ein kohärentes, hochwertiges Erscheinungsbild mit edlen Akzenten — clean, nicht überladen. Gold wird sparsam eingesetzt. Glassmorphism bleibt als zentrales Design-Element, wird aber auf ein einheitliches System reduziert.

---

## 1. Radius-System

Alle Border-Radii werden auf 4 CSS-Variablen normiert:

| Variable    | Wert   | Verwendung                              |
|-------------|--------|-----------------------------------------|
| `--r-sm`    | 8px    | Inputs, Buttons, kleine Elemente        |
| `--r-md`    | 12px   | Karten, Panels, Formulare               |
| `--r-lg`    | 16px   | Große Container, Modal                  |
| `--r-pill`  | 100px  | Tags, Tab-Buttons, Badges               |

**Vorher:** 8, 10, 12, 15, 20, 100px gemischt im gesamten CSS.

---

## 2. Farb-System 60/30/10

**60% Schwarz** — alle Background-Tokens (`--bg`, `--s0` bis `--s700`) bleiben unverändert.

**30% Weiß/Neutral** — Text, Divider, Borders (`--n100` bis `--n500`) bleiben unverändert.

**10% Akzent** — aufgeteilt in zwei Rollen:
- **~7% Gold** (`--g300`, `--g400`): Overlines, aktiver Nav-Link, primärer CTA-Button, Testimonial-Anführungszeichen, Progress Bar
- **~3% Blau** (`rgba(102,136,170,x)`): Hover-Shadows, sekundäre Glow-Effekte, Hero-Drop-Shadow

**Neue Regel:** Gold wird **nicht mehr als Fläche** eingesetzt. Die aktuelle `price-card.pro` mit Gold-Background wird auf Gold-Border auf dunklem Grund umgestellt.

---

## 3. Glassmorphism-Konsolidierung

Eine einzige `.glass`-Klasse ersetzt alle manuellen `rgba(255,255,255,.10)` + `backdrop-filter` Wiederholungen:

```css
.glass {
  background: rgba(255,255,255,.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: var(--r-md);
}
```

**Betroffene Komponenten:** `.work-card`, `.uc-card`, `.testi-card`, `.price-card`, `.contact-form`, `.nav-links`

Opacity von `.10` auf `.08` reduziert — subtiler, edler.

---

## 4. Gold-Regel: Nur 5 Einsatzpunkte

Gold (`--g300`, `--g400`, `--g500`) darf nur an diesen Stellen erscheinen:

1. **Overlines** — die kleinen `letter-spacing`-Labels über Section-Headings
2. **Aktiver Nav-Link** — `.nav-links a.active`
3. **Primärer CTA-Button** — ein einziger pro Page (der Haupt-Call-to-Action)
4. **Testimonial-Anführungszeichen** — `.testi-q`
5. **Progress Bar** — `#progress-bar`

Alle anderen Gold-Einsätze (Hover-States, Borders, Shadows außer dem einen CTA) werden auf Weiß/Neutral umgestellt oder entfernt.

---

## 5. Noble Details

### Divider
```css
.divider {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.12), transparent);
}
```
Wirkt schwebend statt hart.

### Section-Trennungen
Hauchdünner Top-Border ersetzt harte Farbwechsel zwischen Sections:
```css
border-top: 1px solid rgba(255,255,255,.04);
```

### Hover-Karten (einheitlich)
Alle Karten bekommen denselben Hover-State:
```css
transform: translateY(-3px);
box-shadow: 0 12px 40px rgba(0,0,0,.4);
```
Aktuell variieren die translateY-Werte zwischen -3px und -4px, und nicht alle Karten haben box-shadow.

### Focus-States
Input-Felder fokussieren mit Blau statt Gold:
```css
border-color: rgba(102,136,170,.6);
```

---

## Was wird NICHT geändert

- Farbpalette (`--g*`, `--n*`, `--s*` Tokens) bleibt unverändert
- Hero-Typografie (Alumni Sans SC, Playfair Display SC, Sarpanch) bleibt
- Animations-System (`fadeUp`, `.reveal`) bleibt
- Custom Cursor bleibt
- Alle Inhalte, Texte, Bilder bleiben

---

## Implementierungs-Scope

Alle Änderungen sind **rein CSS** — kein JavaScript, kein HTML-Umbau außer `.glass`-Klassen hinzufügen. Die Seite bleibt eine Single-File (`index.html`).
