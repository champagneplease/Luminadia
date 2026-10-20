# Luminadia — Sistema de Diseño y Dirección Visual (DESIGN.md)

Este documento establece la dirección visual, tokens de diseño, tipografías, componentes y estándares de accesibilidad para la plataforma web de **Luminadia** (San Fernando del Valle de Catamarca, Argentina), especializada en láminas de control solar de alta tecnología para sectores automotriz, residencial y corporativo.

---

## 1. Filosofía y Dirección Visual: *High-Tech Solar Architecture*

Inspirado en la dirección **`dark-room`** del estudio de diseño Taste Skill v2 y en las *Vercel Web Interface Guidelines*:
- **Atmósfera:** Precisión técnica, sofisticación sobria, pureza arquitectónica y confianza automotriz. El diseño evoca cristales templados con control solar, reflexión controlada de la radiación infrarroja y protección UV.
- **Espacio y Composición:** Fondos continuos oscuros en grafito profundo, sin bloques de colores chillones ni degradados arbitrarios. Las imágenes de proyectos reales actúan como focos de luz natural.
- **Sin artificios ("Anti-Slop"):**
  - Prohibido el glassmorphism excesivo o fondos borrosos sin justificación funcional.
  - Prohibidas las filas de tarjetas idénticas repetidas con iconos genéricos.
  - Prohibidos los degradados en textos y botones principales.
  - Prohibidas las sombras difusas flotantes en elementos estáticos.
  - Cero testimonios o especificaciones inventadas; contenido honesto y editable.

---

## 2. Paleta de Colores

La paleta se fundamenta en tonos minerales y metálicos de control solar con un acento cálido que representa el espectro solar filtrado con precisión:

| Rol | Token CSS | Hex / Valor | Uso |
| :--- | :--- | :--- | :--- |
| **Ground (Fondo Principal)** | `--color-ground` | `#0e1110` | Fondo general de la plataforma. Grafito profundo con subtono carbón. |
| **Surface (Superficie 1)** | `--color-surface` | `#161a19` | Paneles, cards contenidas y barras de navegación. |
| **Surface Elevada** | `--color-surface-elevated` | `#1e2422` | Modales, popovers y selectores interactivos. |
| **Borde / Separación** | `--color-border` | `#2a322f` | Separadores estructurales de bajo contraste y alto refinamiento. |
| **Ink (Texto Principal)** | `--color-ink` | `#f4f3ef` | Tipografía principal (blanco cálido). Ratio de contraste > 11:1. |
| **Ink Muted (Secundario)** | `--color-ink-muted` | `#9aa19d` | Descripciones, unidades de medida y notas técnicas. Ratio > 5.5:1. |
| **Accent (Acento Solar)** | `--color-accent` | `#d97706` / `#e29b38` | Acento ámbar solar de alta tecnología. Exclusivo para CTA primario y estado activo. |
| **Accent Hover** | `--color-accent-hover` | `#b45309` | Estado presionado/hover del acento. |
| **Accent Text / Ink** | `--color-accent-ink` | `#0e1110` | Texto sobre botón de acento (máximo contraste WCAG AAA). |
| **Success** | `--color-success` | `#22c55e` | Confirmación de cálculo e inputs válidos. |
| **Warning** | `--color-warning` | `#f59e0b` | Avisos técnicos sobre curvas de cristales y márgenes de rollo. |
| **Danger** | `--color-danger` | `#ef4444` | Errores de validación de medidas. |

---

## 3. Tipografía y Jerarquía

- **Display & Titulares:** `Plus Jakarta Sans` / `Outfit` / `Hanken Grotesk` (geométrica, moderna, altamente legible en resoluciones retina).
- **Cuerpo y Datos Técnicos:** `Inter` / `system-ui` con soporte explícito para cifras tabulares (`font-variant-numeric: tabular-nums`) en medidas de calculadora y dimensiones de bobinas.

### Escala tipográfica:
- **Display 1 (Hero principal):** `clamp(2.5rem, 5vw + 1rem, 4.5rem)` — `line-height: 1.05`, `tracking: -0.025em`, máximo 2 líneas.
- **H2 (Secciones principales):** `clamp(1.75rem, 3vw + 0.5rem, 2.75rem)` — `line-height: 1.15`, `tracking: -0.02em`.
- **H3 (Subsecciones y pasos):** `clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)` — `line-height: 1.25`.
- **Cuerpo de lectura:** `1rem` (16px) a `1.125rem` (18px) — `line-height: 1.6`.
- **Notas técnicas y etiquetas:** `0.875rem` (14px) — nunca inferior a 13px.

> **Regla de oro de formulario:** Todos los campos de entrada de datos (`<input>`, `<select>`, `<textarea>`) tienen tamaño de fuente de **al menos 16px** para evitar el auto-zoom indeseado en dispositivos iOS Safari.

---

## 4. Espaciado y Retícula (Grid)

- Retícula base de 8px (tokens de 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px).
- Márgenes laterales móviles: `16px` a `20px`.
- Márgenes laterales de escritorio: `clamp(24px, 4vw, 64px)`.
- Espacio entre secciones principales: `80px` en móvil, `120px` a `160px` en escritorio (respetando el ritmo arquitectónico del contenido).

---

## 5. Bordes, Radios y Sombras

- **Radios:**
  - Botones y campos de formulario: `8px` (`rounded-lg`) — precisión sobria, ni redondeado excesivo ni filos agresivos.
  - Paneles de sección: `12px` (`rounded-xl`).
  - Badges técnicos: `4px` o `6px`.
- **Sombras:**
  - Cero sombras difusas decorativas en reposo.
  - En flotantes activos (dropdowns y diálogos modales): `0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7)`.
  - Bordes sólidos sutiles de `1px solid var(--color-border)`.

---

## 6. Sistema de Componentes Reutilizables

1. **Botones (`Button`):**
   - *Primary:* Fondo ámbar solar sólido (`#d97706`), texto oscuro de alto contraste, foco visible accesible `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500`.
   - *Secondary:* Fondo superficie `#161a19`, borde sutil `#2a322f`, texto blanco cálido.
   - *Ghost / Link:* Sin fondo, subrayado en hover o transición suave de color.
2. **Campos de Calculadora (`NumberInput`, `SelectField`):**
   - Etiqueta vinculada explícita (`<label htmlFor="...">`).
   - Sufijos claros de unidad (`cm`, `m`, `mm`, `unidades`).
   - Mensaje de validación accesible con `aria-live="polite"`.
   - Soporte numérico con flechas cómodas o entrada directa.
3. **Selector de Categoría:**
   - Tres botones de estado exclusivo para Automotriz, Hogares y Comercios/Empresas.
4. **Resumen de Materiales (`CalculatorSummary`):**
   - Cifras con `tabular-nums`.
   - Cuadro comparativo claro entre **Superficie neta a cubrir ($m^2$)** vs **Largo de rollo a retirar ($m$ lineales)**.
   - Panel de advertencias y supuestos técnicos destacados.
5. **Modal de Solicitud y Enlace de WhatsApp:**
   - Botón directo para abrir WhatsApp con texto formateado sin perder el cálculo.
   - Formulario integrado para guardar la consulta en el sistema administrativo.

---

## 7. Accesibilidad (WCAG 2.2 Nivel AA)

- Foco visible sin ambigüedades en cada control interactivo.
- Botones de iconos con `aria-label` descriptivo.
- Iconos decorativos con `aria-hidden="true"`.
- Soporte total para `prefers-reduced-motion` eliminando traslaciones físicas y manteniendo opacidad instantánea o transiciones de 150ms.
- Navegación por teclado completa (Tab, Shift+Tab, Enter, Escape en modales y menú móvil).

---

## 8. Adaptabilidad Responsive

| Breakpoint | Dispositivo de referencia | Layout |
| :--- | :--- | :--- |
| **320px - 430px** | Smartphones (iPhone SE a 16 Pro Max, Pixel, Galaxy) | 1 columna continua, botones táctiles de $\ge 44px$ de altura, menú deslizable accesible. |
| **768px - 1024px** | Tablets vertical / horizontal | 2 columnas balanceadas, calculadora con vista previa lateral fijada. |
| **1280px - 1920px** | Desktop estándar a ultra-wide | Ancho de contenido restringido a `max-w-7xl` (1280px) o editorial amplio con alineación rigurosa. |
