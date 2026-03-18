# Design System i Design Tokens NBP

Data audytu: 2026-03-18  
Źródło: produkcyjna strona [https://nbp.pl/](https://nbp.pl/)  
Zakres: analiza wizualna, DOM, klas CSS, głównego theme CSS oraz computed styles strony głównej.

## 1. Cel dokumentu

Ten dokument opisuje język wizualny Narodowego Banku Polskiego na podstawie aktualnej strony `nbp.pl`, tak aby można było zbudować nową aplikację Chat AI spójną z identyfikacją i stylistyką serwisu NBP.

Dokument łączy:

- obserwację interfejsu i screenshotów,
- analizę DOM i najczęściej używanych klas CSS,
- extracted tokens z `:root`,
- computed styles najważniejszych komponentów,
- praktyczne zalecenia implementacyjne dla nowej aplikacji.

## 2. Wygenerowane artefakty

### Dokumentacja

- `docs/nbp-design-system.md` - ten dokument

### Surowe dane audytu

- `assets/nbp/data/nbp-design-audit.json` - pełny eksport stylów, klas, komponentów i assetów
- `assets/nbp/data/nbp-main.min.css` - zapisany główny arkusz CSS motywu NBP

### Screenshoty

- `assets/nbp/screenshots/nbp-home-desktop-above-fold.png`
- `assets/nbp/screenshots/nbp-home-desktop-full.png`
- `assets/nbp/screenshots/nbp-home-mobile-above-fold.png`

### Assety marki

- `assets/nbp/logo.svg` - logo NBP pobrane z `https://nbp.pl/wp-content/uploads/2022/07/nbp-logo.svg`
- `assets/nbp/favicon.ico` - favicon pobrany z `https://nbp.pl/favicon.ico`

## 3. Charakter stylistyczny marki NBP

Stylistyka strony NBP jest formalna, państwowa, konserwatywna i instytucjonalna. Nie jest to UI startupowe ani technologicznie agresywne. Dominują:

- ciemny granat jako kolor zaufania i autorytetu,
- złoto jako akcent prestiżowy,
- jasne tła w odcieniach bieli i szarości,
- editorialowa typografia nagłówków,
- proste komponenty o niskim stopniu dekoracyjności,
- oszczędna animacja, głównie hover, opacity i transition.

Wrażenie końcowe: urząd publiczny premium, nowoczesny, ale zdyscyplinowany.

## 4. Architektura frontu i charakter CSS

Strona jest hybrydą:

- WordPress
- motyw własny `wp-content/themes/nbp/assets/main.min.css`
- Bootstrapowy system klas i gridu
- dodatkowe pluginy, m.in. kalendarz wydarzeń i wyszukiwarka

Najczęściej spotykane klasy i wzorce:

- `navbar`, `navbar-expand-lg`, `navbar-toggler`
- `nav-link`, `dropdown-item`, `dropdown-toggle`, `menu-item`
- `btn`, `btn-primary`, `btn-outline-primary`, `btn-light`
- `card`, `card-module`, `card-body`, `card-image`
- `carousel-item`, `carousel-caption__title`
- `module-title`
- `footer`

Wniosek: do budowy nowej aplikacji Chat AI najlepiej użyć prostego systemu komponentów inspirowanego Bootstrapem, ale nie kopiować całego Bootstrap look-and-feel. Należy przejąć tokeny, proporcje i semantykę wizualną NBP.

## 5. Główne design tokens

Poniżej zestaw najważniejszych tokenów znalezionych w CSS motywu i potwierdzonych przez computed styles.

### 5.1. Brand colors

| Token | Wartość | Rola |
|---|---:|---|
| `--main-blue` | `#152E52` | główny granat marki, header, footer, mocne akcenty |
| `--main-gold` | `#D4AF37` | złoty akcent brandowy |
| `--main-black` | `#4B4B4B` | ciemny neutral tekstowy |
| `--hover-btn` | `#285289` | hover dla elementów interaktywnych |
| `--add-blue-link` | `#4A74B0` | linki, primary buttons, akcent informacyjny |
| `--add-dark-gray` | `#606060` | dodatkowy neutral dla tekstów i metadanych |

### 5.2. Bootstrap-aligned theme tokens

| Token | Wartość |
|---|---:|
| `--bs-primary` | `#4A74B0` |
| `--bs-secondary` | `#152E52` |
| `--bs-success` | `#58873E` |
| `--bs-danger` | `#E50040` |
| `--bs-light` | `#D9D9D9` |
| `--bs-dark` | `#333333` |
| `--bs-body-color` | `#323232` |
| `--bs-body-bg` | `#FFFFFF` |

### 5.3. Neutral backgrounds

| Token | Wartość | Zastosowanie |
|---|---:|---|
| `--white` | `#FFFFFF` | podstawowe tło |
| `--bg-1` | `#F3F3F3` | delikatne sekcje i podkłady |
| `--bg-2` | `#E9E7E3` | cieplejsze, lekko papierowe tło |
| `--bs-gray-100` | `#F9F8F8` | bardzo jasne powierzchnie |
| `--bs-gray-200` | `#F1EFEF` | karty, separacje |
| `--bs-gray-300` | `#F0F0F0` | subtelne tła pomocnicze |
| `--bs-gray-500` | `#E4E4E4` | obramowania i separatory |
| `--bs-gray-700` | `#C4C4C4` | neutral średni |
| `--bs-gray-800` | `#949191` | teksty drugorzędne |
| `--bs-gray-900` | `#323232` | główny tekst |

### 5.4. Kolory zaobserwowane w realnym DOM

Najczęściej występujące kolory tekstu:

- `rgb(70, 70, 70)` - podstawowy tekst użytkowy
- `rgb(21, 46, 82)` - granat NBP
- `rgb(20, 24, 39)` - ciemny tekst pomocniczy z pluginów
- `rgb(50, 50, 50)` - body text
- `rgb(255, 255, 255)` - tekst na ciemnych tłach
- `rgb(74, 116, 176)` - linki i CTA

Najczęściej występujące tła:

- `rgb(255, 255, 255)` - baza
- `rgb(74, 116, 176)` - primary surface / CTA
- `rgb(247, 247, 247)` - sekcje
- `rgb(196, 196, 196)` i `rgb(217, 217, 217)` - neutralne separacje
- `rgb(21, 46, 82)` - header/footer
- `rgb(189, 173, 125)` - złoty przycisk menu w runtime

Uwaga: złoty kolor na działającej stronie pojawia się w interaktywnych elementach także jako `rgb(189, 173, 125)`, więc do implementacji warto przyjąć dwa poziomy gold:

- brand gold token: `#D4AF37`
- runtime gold / muted gold UI: `#BDAD7D`

## 6. Typografia

### 6.1. Font families

Fonty podstawowe:

- `Libre Franklin` - główny krój interfejsu, tekstów, nawigacji, przycisków
- `Brygada 1918` - nagłówki, hero, bardziej reprezentacyjne elementy

Fallbacki:

- `Arial`
- `Noto Sans`
- systemowe sans-serif

### 6.2. Typographic scale

Tokeny znalezione w CSS:

| Token | Wartość |
|---|---:|
| `--wp--preset--font-size--small` | `13px` |
| `--wp--preset--font-size--normal` | `16px` |
| `--wp--preset--font-size--medium` | `20px` |
| `--wp--preset--font-size--large` | `36px` |
| `--wp--preset--font-size--x-large` | `42px` |

Najczęstsze realne rozmiary z computed styles:

- `13.4263px`
- `15.4919px`
- `16px`
- `16.5247px`
- `18.5903px`
- `19.6231px`
- `24.7871px`
- `33.0494px`

### 6.3. Wagi i line-height

Dominujące wagi:

- `400` - body copy
- `500` - hero heading / wybrane elementy premium
- `600` - module titles i mocniejsze nagłówki sekcji
- `700` - linki i mocne CTA tekstowe

Dominujące line-height:

- `24px` - podstawowy tekst
- `32px` - śródtytuły
- `44px` - duże nagłówki / hero

### 6.4. Zalecenia dla Chat AI

- Używaj `Libre Franklin` jako fontu aplikacyjnego.
- Używaj `Brygada 1918` tylko do headline, nazwy produktu, hero paneli i wybranych section titles.
- Nie stosuj bardzo technicznych fontów ani nowoczesnych grotesków w stylu startupowym.

## 7. Layout i spacing

Strona ewidentnie opiera się o Bootstrapowy grid i breakpointy:

- `576px`
- `768px`
- `992px`
- `1200px`
- `1400px`

Wnioski układowe:

- layout jest szeroki, ale modułowy,
- header i footer są pełnoszerokościowe,
- sekcje treści są osadzane w kontenerach,
- spacing jest dość oddechowy, ale regularny,
- dużo pionowego rytmu budowanego przez marginesy około `16px`, `24px`, `32px`, `48px+`.

Przykładowe wartości spacingowe zaobserwowane w theme/pluginach:

- `4px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `80px`

## 8. Kształt, obramowania, cienie

### 8.1. Border radius

Najczęstsze wartości:

- `4px` - podstawowy radius przycisków i prostych kontrolek
- `50%` - ikony kołowe / elementy okrągłe
- `6.19677px` - pola wyszukiwania i niektóre kontrolki z pluginów
- `9.5px` - komponenty kalendarza

Wniosek: bazowy radius dla Chat AI powinien być niewielki. Nie iść w mocno zaokrąglony nowoczesny styl.

### 8.2. Cienie

Najczęściej widoczne cienie:

- `0 6px 24px 0 rgb(241, 239, 239)` - delikatne, miękkie podbicie jasnych kart
- `0 2px 12px 0 rgba(0, 0, 0, 0.12)` - dropdown / overlay
- `0 4px 14px 0 rgba(0, 0, 0, 0.12)` - większe warstwy
- inset shadows dla niektórych kontrolek

Wniosek: UI NBP używa subtelnej elevacji. Cienie są pomocnicze, nie dekoracyjne.

## 9. Motion i interakcja

Najczęstsze transition patterns:

- `all 0.3s ease-in-out`
- `color 0.3s ease-in-out`
- `border/background/color/box-shadow 0.3s ease-in-out`
- `opacity 0.3s ease`
- `transform 0.6s ease-in-out`
- `box-shadow 0.15s ease-in-out`

Wniosek:

- motion ma być spokojny i instytucjonalny,
- bez bouncy micro-interactions,
- hover powinien być oparty o zmianę koloru, opacity i delikatny cień,
- transformy tylko tam, gdzie jest to naturalne, np. slider lub reveal.

## 10. Kluczowe komponenty wizualne

### 10.1. Header

Observed:

- tło: `#152E52`
- tekst i ikony: biały lub granat zależnie od stanu
- styl: formalny, zwarty, pełnoszerokościowy
- kluczowe klasy: `navbar`, `navbar-expand-lg`, `nav-link`, `dropdown-item`, `dropdown-toggle`

### 10.2. Nawigacja

Wynik z CSS:

- `.nav-link { color: #152E52; font-weight: 400; transition: color/background/border .15s ease-in-out; }`
- aktywne i sekcyjne przełączniki są większe, z mocniejszym spacingiem i większym fontem

Wniosek dla Chat AI:

- zastosować top bar lub left nav w granacie,
- linki w granacie, aktywne sekcje lekko podbite tłem jasnym lub złotą linią,
- dropdowny i panele menu utrzymywać w prostym, editorialowym stylu.

### 10.3. Hero / główny baner

Najważniejszy wizualnie komponent strony głównej.

Cecha:

- duże zdjęcia lub grafiki,
- białe nagłówki na obrazie,
- `Brygada 1918`,
- font-size około `33px`,
- line-height `44px`,
- wrażenie powagi i komunikatu instytucji.

### 10.4. Tytuły sekcji

Przykład:

- `.module-title`
- computed size około `24.7871px`
- waga `600`
- kolor `#152E52`
- duży dolny margines

### 10.5. Przyciski

Zidentyfikowane style:

- `.btn-primary { color:#fff; background-color:#4A74B0; border-color:#4A74B0; }`
- `.btn-outline-primary { color:#4A74B0; border-color:#4A74B0; }`
- `navbar-toggler` runtime: tło zgaszone złoto `rgb(189, 173, 125)`, tekst granatowy, radius `4px`

Wniosek:

- primary CTA: niebieski `#4A74B0`
- institutional CTA / special CTA: muted gold `#BDAD7D` z granatowym tekstem
- outline CTA: białe lub jasne tło, granatowa albo niebieska ramka

### 10.6. Karty

Zaobserwowane klasy:

- `card`
- `card-module`
- `card-body`
- `card-image`

Źródłowa reguła:

- `.card-module { border:none; padding:0; box-shadow:none; }`

Wniosek:

- karty NBP są bardziej contentowe niż produktowe,
- powinny być lekkie, bez mocnych neonów i bez grubych obramowań,
- można używać bardzo subtelnego cienia lub separatora.

### 10.7. Footer

Źródłowa reguła:

- `.footer { background-color:#152E52; color:#fff; }`

Wniosek:

- stopka w Chat AI powinna trzymać granat, biały tekst i bardzo prostą hierarchię.

## 11. Rekomendowany design system dla aplikacji Chat AI w stylu NBP

### 11.1. Product direction

Aplikacja powinna wyglądać jak oficjalne narzędzie instytucji publicznej, nie jak konsumencki chatbot.

Dlatego:

- granat buduje shell aplikacji,
- złoto jest akcentem statusowym, nie dominującym,
- biel i jasne szarości stanowią główne powierzchnie treści,
- tytuły sekcji i ekranów powinny korzystać z `Brygada 1918`,
- teksty, formularze, czat, listy i nawigacja z `Libre Franklin`.

### 11.2. Rekomendowane tokeny implementacyjne

```css
:root {
  --nbp-color-brand-navy: #152E52;
  --nbp-color-brand-blue: #4A74B0;
  --nbp-color-brand-gold: #D4AF37;
  --nbp-color-brand-gold-muted: #BDAD7D;
  --nbp-color-text-primary: #323232;
  --nbp-color-text-secondary: #606060;
  --nbp-color-surface-base: #FFFFFF;
  --nbp-color-surface-subtle: #F3F3F3;
  --nbp-color-surface-alt: #E9E7E3;
  --nbp-color-border-soft: #E4E4E4;
  --nbp-color-border-medium: #D3D3D3;
  --nbp-color-success: #58873E;
  --nbp-color-danger: #E50040;

  --nbp-font-body: "Libre Franklin", Arial, "Noto Sans", sans-serif;
  --nbp-font-display: "Brygada 1918", Arial, "Noto Sans", sans-serif;

  --nbp-font-size-xs: 13px;
  --nbp-font-size-sm: 16px;
  --nbp-font-size-md: 20px;
  --nbp-font-size-lg: 25px;
  --nbp-font-size-xl: 33px;
  --nbp-font-size-2xl: 42px;

  --nbp-line-height-body: 24px;
  --nbp-line-height-title: 32px;
  --nbp-line-height-hero: 44px;

  --nbp-radius-sm: 4px;
  --nbp-radius-md: 6px;

  --nbp-shadow-soft: 0 6px 24px 0 rgba(241, 239, 239, 1);
  --nbp-shadow-overlay: 0 2px 12px 0 rgba(0, 0, 0, 0.12);

  --nbp-motion-fast: 0.15s ease-in-out;
  --nbp-motion-base: 0.3s ease-in-out;
  --nbp-motion-slow: 0.6s ease-in-out;
}
```

### 11.3. Mapowanie na UI aplikacji Chat AI

Shell:

- top bar lub left rail w `--nbp-color-brand-navy`
- logo NBP w lewym górnym rogu
- biały lub jasny workspace

Chat:

- tło główne `--nbp-color-surface-base`
- sekcje pomocnicze `--nbp-color-surface-subtle`
- border `--nbp-color-border-soft`
- nagłówek czatu w `Brygada 1918`

Wiadomości:

- user bubble: jasny granat / niebieski o niskiej saturacji
- assistant bubble: biały lub lekko szary
- system/status: złoty muted lub neutral gray

Przyciski:

- primary: `--nbp-color-brand-blue`
- secondary/outline: transparent + border `--nbp-color-brand-blue`
- special / official action: `--nbp-color-brand-gold-muted`

Form fields:

- niewielki radius
- jasne tło
- granatowy focus ring lub cienka ramka `#4A74B0`

## 12. Ograniczenia i uwagi

- Analiza została wykonana na produkcyjnej stronie głównej NBP w dniu 2026-03-18.
- Część klas i tokenów pochodzi z pluginów WordPressa, nie z rdzenia brandu. W nowej aplikacji należy odróżnić branding NBP od przypadkowych styli pluginowych.
- Najbardziej wiarygodne źródła brandowe w tym audycie to:
  - logo,
  - główny theme CSS,
  - header/footer,
  - hero,
  - typografia `Libre Franklin` + `Brygada 1918`,
  - tokeny `main-blue`, `main-gold`, `bs-primary`, `bs-secondary`.

## 13. Najważniejsze wnioski końcowe

Jeśli nowa aplikacja Chat AI ma wyglądać jak produkt NBP, trzeba pilnować pięciu rzeczy:

1. Granat `#152E52` ma budować zaufanie i strukturę aplikacji.
2. `Brygada 1918` powinna być używana oszczędnie, ale w kluczowych nagłówkach.
3. Złoto ma być akcentem reprezentacyjnym, nie dominującym kolorem interakcji.
4. Komponenty powinny być proste, mało zaokrąglone i bez przesadnej dekoracyjności.
5. Motion powinien być spokojny i formalny, głównie `0.15s-0.3s ease-in-out`.
