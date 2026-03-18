# NBP Design System i Design Tokens

Stan analizy: 2026-03-18  
Źródło bazowe: `https://nbp.pl/`  
Zakres: analiza strony głównej NBP, DOM, computed styles, głównych klas CSS, assetów oraz translacja stylistyki do nowej aplikacji Chat AI.

## 1. Artefakty zapisane w repo

- Dokument: `docs/nbp-design-system.md`
- Surowa analiza DOM/CSS: `docs/nbp-design-system-artifacts/nbp-analysis.json`
- Główny arkusz stylów NBP: `docs/nbp-design-system-artifacts/nbp-main.min.css`
- Screenshot pełnej strony desktop: `docs/nbp-design-system-artifacts/screenshots/nbp-home-desktop-full.png`
- Screenshot viewport desktop: `docs/nbp-design-system-artifacts/screenshots/nbp-home-desktop-viewport.png`
- Screenshot viewport mobile: `docs/nbp-design-system-artifacts/screenshots/nbp-home-mobile-viewport.png`
- Screenshot headera: `docs/nbp-design-system-artifacts/screenshots/00000-header.png`
- Screenshot hero sekcji: `docs/nbp-design-system-artifacts/screenshots/00099-narodowy-bank-polski-o-finansowaniu-potrzeb-zbrojeniowych-polski.png`
- Screenshot sekcji aktualności: `docs/nbp-design-system-artifacts/screenshots/00728-aktualno-ci.png`
- Screenshot sekcji wydarzeń: `docs/nbp-design-system-artifacts/screenshots/00892-wydarzenia.png`
- Logo NBP: `assets/nbp/nbp-logo.svg`

## 2. Streszczenie wizualne

Strona NBP buduje wizerunek instytucjonalny, oficjalny i spokojny. Fundamentem jest ciemny granat jako kolor strukturalny, złoty jako akcent premium, dużo bieli i bardzo oszczędne użycie cieni oraz zaokrągleń. Typografia jest dwuwarstwowa:

- nagłówki i komunikaty wizerunkowe: `Brygada 1918`
- tekst UI, nawigacja, formularze, linki, meta dane: `Libre Franklin`

Kompozycja jest szeroka, oparta o siatkę bootstrapową z kontenerem do `1440px`. Strona jest mocno sekcyjna, z dużymi blokami treści rozdzielonymi pionowym rytmem i wyraźną, ciężką nawigacją górną. Ruch jest subtelny: głównie przejścia `0.2s` do `0.3s`, bez agresywnych animacji.

## 3. Tokeny marki

Poniżej najważniejsze tokeny bezpośrednio zaobserwowane na stronie lub w głównym CSS motywu.

### 3.1 Kolory podstawowe

| Token | Wartość | Rola |
| --- | --- | --- |
| `--main-blue` | `#152E52` | główny granat marki, header, footer, ciemne akcenty |
| `--bs-secondary` | `#152E52` | alias bootstrapowy tego samego koloru |
| `--main-gold` | `#D4AF37` | złoto marki zdefiniowane w CSS |
| `#BDAD7D` | zaobserwowany w CTA/header | aktywny złoty/beżowy akcent na przyciskach i separatorach |
| `--bs-primary` | `#4A74B0` | niebieski linków, borderów i outline buttonów |
| `--hover-btn` | `#285289` | ciemniejszy hover dla niebieskich akcentów |
| `--add-blue-link` | `#4A74B0` | link accent |
| `--main-black` | `#4B4B4B` | dodatkowy ciemny tekst systemowy |
| `--bs-body-color` | `#323232` | tekst bazowy w CSS frameworka |
| `--white` | `#FFFFFF` | tła, tekst na granacie, kontrasty |
| `--bg-1` | `#F3F3F3` | jasne neutralne tło pomocnicze |
| `--bg-2` | `#E9E7E3` | ciepłe neutralne tło pomocnicze |
| `--bs-gray-500` | `#E4E4E4` | delikatne obramowania i rozdzielacze |
| `--bs-danger` | `#E50040` | alert, stan krytyczny |
| `--bs-success` | `#58873E` | stan pozytywny |

### 3.2 Najczęściej występujące kolory w DOM

Wynik ze zliczenia computed styles:

| Kolor | Częstość | Interpretacja |
| --- | --- | --- |
| `#464646` | 2434 | dominujący tekst pomocniczy i copy |
| `#000000` | 1104 | elementy techniczne, inputy, icon fallback |
| `#FFFFFF` | 516 | tła i tekst na ciemnych powierzchniach |
| `#152E52` | 472 | strukturalny kolor brandu |
| `#141827` | 440 | dodatkowy ciemny granat/czerniony navy z pluginów i stanów |
| `#4A74B0` | 373 | linki, bordery, akcenty |
| `#333333` | 285 | dark body / fallback neutral |
| `#BDAD7D` | 104 | złoty akcent UI |

### 3.3 Typografia

#### Fonty

Bezpośrednio wykryte font-face:

- `Brygada 1918`: wagi `400`, `500`, `600`, `700`, także italic
- `Libre Franklin`: wagi `100`, `200`, `300`, `400`, `500`, `600`, `700` i wyżej w motywie, także italic

#### Role typograficzne

| Rola | Font | Rozmiar | Waga | Line-height | Uwagi |
| --- | --- | --- | --- | --- | --- |
| body | `Libre Franklin` | ok. `15.49px` | `400` | `24px` | bazowy tekst serwisu |
| nav utility | `Libre Franklin` | `14.46px` | `400` | `24px` | uppercase, tracking dodatni |
| small CTA / outline button | `Libre Franklin` | `13.43px` | `500` | `24px` | uppercase |
| small action label | `Libre Franklin` | `13.43px` | `700` | `24px` | np. „Zobacz wszystkie” |
| section switcher | `Libre Franklin` | `18.59px` | `400` | ok. `24px+` | duże przełączniki sekcji |
| hero/section heading | `Brygada 1918` | `33.05px` | `500` | `44px` | główny display style |

#### Tracking i case

- Utility linki i małe CTA często używają `text-transform: uppercase`
- Letter-spacing dla utility/CTA: około `0.826px`
- Nagłówki display zachowują naturalny casing, bez uppercase

### 3.4 Promienie, cienie, obramowania

#### Border radius

Zaobserwowane wartości:

- `0px` dla większości layoutu
- `4px` dla standardowych buttonów
- `6.19677px` dla pól wyszukiwarki
- wartości pochodne typu `8.26236px`, `12.3935px`, `16.5247px`, `33.0494px`, `41.3118px` wynikają z przeskalowanych komponentów i pluginów
- `50%` dla elementów kołowych

Wniosek: natywny język NBP jest prawie kanciasty, z małym radius, bez nowoczesnego „pill-heavy UI”.

#### Box shadow

Zaobserwowane:

- `rgba(0, 0, 0, 0.12) 0px 4px 14px 0px`
- `rgba(0, 0, 0, 0.12) 0px 2px 12px 0px`

Wniosek: cienie są bardzo oszczędne i pomocnicze. Interfejs nie powinien wyglądać „miękko” ani kartowo jak produkt startupowy.

#### Border

Wzorce:

- `1px solid rgb(74, 116, 176)` dla outline buttonów
- `1px solid rgb(191, 206, 221)` dla pola wyszukiwarki
- separatorowe linie w headerze w odcieniu złota `#BDAD7D`

### 3.5 Motion

Zaobserwowane przejścia:

- `color 0.3s ease-in-out`
- `0.3s ease-in-out`
- `opacity 0.3s`
- `box-shadow 0.15s ease-in-out`
- `transform 0.6s ease-in-out`
- `border 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out, box-shadow 0.3s ease-in-out`
- `transform 0.2s`

Nie wykryto istotnych custom animations. Ruch jest funkcjonalny, nie dekoracyjny.

## 4. Layout i responsywność

### 4.1 Grid i breakpointy

Motyw używa Bootstrap 5 z klasycznymi breakpointami:

- `576px`
- `768px`
- `992px`
- `1200px`
- `1400px`

Kontener:

- `max-width: 720px` od `576px`
- `max-width: 960px` od `768px`
- `max-width: 1140px` od `992px`
- `max-width: 1440px` od `1200px`

### 4.2 Struktura strony głównej

Zaobserwowane sekcje:

- header `99px` wysokości, granatowe tło
- hero / carousel `629px`
- aktualności `823px`
- wydarzenia jako blok poboczny
- stopy procentowe
- system płatniczy
- statystyka i sprawozdawczość
- polecamy
- brand strip
- footer `970px`

Wniosek: układ jest „instytucjonalny”, szeroki, sekcyjny, z mocnym rytmem pionowym i dużą ilością powietrza.

## 5. Główne wzorce komponentów

### 5.1 Header i nawigacja

Zaobserwowane klasy:

- `.navbar`
- `.navbar-expand-lg`
- `.nav-container`
- `.nav-wrapper`
- `.custom-logo-link`
- `.navbar-toggler`
- `.dropdown-menu`
- `.nav-link`

Charakterystyka:

- tło `#152E52`
- logo po lewej
- utility actions i menu po prawej
- pionowe dekoracyjne separatory w kolorze zbliżonym do `#BDAD7D`
- duży, prostokątny przycisk `Menu`
- uppercase i dodatni tracking dla mikrointerakcji
- transition `all .3s ease-in-out`

### 5.2 Hero / carousel

Zaobserwowane klasy:

- `.section__hero`
- `.hero-container`
- `.carousel-caption__title`
- `.carousel-caption__excerpt`

Charakterystyka:

- duże zdjęcie / slider jako nośnik komunikatu
- biały tekst na fotografii
- nagłówek w `Brygada 1918`
- CTA typu outline button
- bardziej redakcyjny niż produktowy charakter

### 5.3 Buttony

#### Outline primary

Zaobserwowany przykład `.btn.btn-outline-primary`:

- tekst biały na ciemnym hero
- tło transparentne
- border `1px solid #4A74B0`
- radius `4px`
- font `Libre Franklin`
- rozmiar `13.43px`
- waga `500`
- uppercase
- transition na border, background, color, box-shadow

#### Gold nav toggle

Zaobserwowany `.navbar-toggler`:

- tło `#BDAD7D`
- tekst `#152E52`
- radius `4px`
- padding `12.39px 26.85px`
- uppercase
- letter-spacing dodatni

#### Text action

Zaobserwowany `.gsearch`:

- brak tła
- brak bordera
- kolor `#152E52`
- font `13.43px`
- waga `700`

### 5.4 Formularze i wyszukiwarka

Zaobserwowane klasy:

- `.search-submit-btn`
- inputy bez miękkiego, nowoczesnego stylu

Charakterystyka:

- białe tło
- cienki border `1px solid rgb(191, 206, 221)`
- prawy radius `6.19677px` na przycisku submit
- brak cienia
- czysty, administracyjny styl

### 5.5 Moduły i karty treści

Najczęściej wykryte klasy treściowe:

- `.module`
- `.module-inner`
- `.module-item`
- `.module-links`
- `.module-title`

Wniosek:

- karty nie są silnie „card-based” jak w SaaS
- dominują bloki sekcyjne, listy linków i moduły informacyjne
- styl powinien być oparty raczej na separatorach, typografii i rytmie niż na dużych cieniach i tłach

### 5.6 Footer

Zaobserwowane klasy:

- `.footer`
- `.footer-logo`

Charakterystyka:

- tło `#152E52`
- biały tekst
- kontakt, adres, linki sekcyjne
- ciężka, instytucjonalna stopka

## 6. Klasy i system CSS, które warto zachować przy rekonstrukcji

### 6.1 Klasy motywu NBP z wysoką wartością referencyjną

- `.navbar`
- `.custom-logo-link`
- `.navbar-toggler`
- `.section`
- `.section__hero`
- `.section__news`
- `.section__interest-rates`
- `.section__payment`
- `.section__statistic`
- `.section__recommended`
- `.section__brands`
- `.hero-container`
- `.carousel-caption__title`
- `.carousel-caption__excerpt`
- `.module`
- `.module-title`
- `.module-item`
- `.module-links`
- `.footer`

### 6.2 Klasy frameworkowe / pluginowe obecne w DOM

Te klasy istnieją, ale nie powinny definiować nowego design systemu Chat AI:

- bootstrapowe: `.row`, `.col-lg-*`, `.d-flex`, `.align-items-center`, `.btn`, `.btn-primary`, `.btn-light`
- event calendar: `.tribe-*`
- WordPress: `.wp-*`

Wniosek: dla nowej aplikacji zachować język wizualny NBP, ale nie kopiować pluginowych klas 1:1.

## 7. Specyfikacja design systemu dla aplikacji Chat AI zgodnej z NBP

Ta sekcja zawiera adaptację. To nie jest bezpośrednio zaobserwowany komponent z `nbp.pl`, tylko rekomendacja wynikająca z brandingu i UI patterns strony.

### 7.1 Zasady nadrzędne

- Unikać estetyki startupowej, glassmorphism, dużych blurów i nasyconych gradientów.
- Trzymać interfejs formalny, oszczędny, stateczny.
- Nadawać priorytet czytelności i hierarchii nad „wow effect”.
- Wprowadzić obsługę trybu wysokiego kontrastu, bo NBP ma przełącznik accessibility/high contrast.

### 7.2 Proponowane tokeny dla nowej aplikacji

```css
:root {
  --nbp-color-brand-navy: #152E52;
  --nbp-color-brand-navy-2: #141827;
  --nbp-color-brand-blue: #4A74B0;
  --nbp-color-brand-blue-hover: #285289;
  --nbp-color-brand-gold: #BDAD7D;
  --nbp-color-brand-gold-deep: #D4AF37;
  --nbp-color-text: #464646;
  --nbp-color-text-strong: #323232;
  --nbp-color-text-inverse: #FFFFFF;
  --nbp-color-bg: #FFFFFF;
  --nbp-color-bg-subtle: #F3F3F3;
  --nbp-color-bg-warm: #E9E7E3;
  --nbp-color-border: #E4E4E4;
  --nbp-color-border-strong: #4A74B0;
  --nbp-color-success: #58873E;
  --nbp-color-danger: #E50040;

  --nbp-font-sans: "Libre Franklin", -apple-system, Arial, "Noto Sans", sans-serif;
  --nbp-font-serif: "Brygada 1918", Georgia, serif;

  --nbp-font-size-xs: 13px;
  --nbp-font-size-sm: 14px;
  --nbp-font-size-md: 15.5px;
  --nbp-font-size-lg: 18.5px;
  --nbp-font-size-xl: 24px;
  --nbp-font-size-display: 33px;

  --nbp-line-height-tight: 1.3;
  --nbp-line-height-base: 1.55;
  --nbp-line-height-display: 44px;

  --nbp-radius-none: 0;
  --nbp-radius-sm: 4px;
  --nbp-radius-md: 6px;
  --nbp-radius-round: 50%;

  --nbp-shadow-soft: 0 2px 12px rgba(0, 0, 0, 0.12);
  --nbp-shadow-raised: 0 4px 14px rgba(0, 0, 0, 0.12);

  --nbp-motion-fast: 0.2s ease;
  --nbp-motion-base: 0.3s ease-in-out;
  --nbp-motion-slow: 0.6s ease-in-out;
}
```

### 7.3 Mapowanie na komponenty czatowe

#### App shell

- top bar w `#152E52`
- logo NBP po lewej
- prawa strona na utility actions i status
- separatorowe pionowe linie w odcieniu złota

#### Sidebar

- tło białe lub `#F3F3F3`
- sekcje rozdzielane cienkim borderem `#E4E4E4`
- nagłówki sekcji w `Libre Franklin` semibold
- aktywny element z lewym akcentem `#4A74B0`, bez agresywnych filli

#### Chat header

- tytuł produktu lub wątku w `Brygada 1918`
- metadane i opis w `Libre Franklin`
- ewentualny badge statusu w granacie lub złocie, nie w jaskrawych kolorach

#### Bąble wiadomości

Rekomendacja, bo brak odpowiednika na stronie NBP:

- wiadomość użytkownika: białe tło, border `1px solid #E4E4E4`
- wiadomość AI: bardzo jasne tło `#F3F3F3` lub `#E9E7E3`
- tekst obu typów: `#464646`
- promień maksymalnie `6px`, nie „pill”
- brak dużych cieni

#### Prompt box

- białe tło
- border `1px solid rgb(191, 206, 221)` lub `#E4E4E4`
- radius `4px` do `6px`
- focus ring w `#4A74B0`
- przycisk wysyłki w granacie albo złotym akcencie zależnie od priorytetu

#### Primary CTA

- tło `#152E52` lub `#BDAD7D`
- tekst kontrastowy
- uppercase tylko dla mniejszych action buttonów
- radius `4px`

#### Secondary CTA

- transparent / white
- border `1px solid #4A74B0`
- tekst `#152E52` lub `#4A74B0`

#### Cards / panels

- preferować border i rytm pionowy zamiast dużego shadow
- shadow tylko przy stanach elevated lub dropdownach

## 8. Dostępność i kontrast

Zaobserwowane:

- NBP ma przełącznik wysokiego kontrastu
- silnie kontrastuje biały tekst na granacie
- utility controls mają wyraźne focus states w CSS

Wymagania dla nowej aplikacji:

- zachować tryb high contrast
- nie używać złota jako koloru drobnego tekstu na białym tle
- minimalna kombinacja akcji: granat + biel
- fokusy i selected states budować na outline, nie tylko na zmianie koloru

## 9. Co kopiować 1:1, a czego nie kopiować

### Kopiować 1:1

- relację kolorów: granat + złoty + biel + chłodny niebieski
- duet fontów `Brygada 1918` i `Libre Franklin`
- mały radius
- stonowane motion
- formalny, instytucjonalny ton layoutu
- szeroki układ z dużym rytmem sekcji

### Nie kopiować bezpośrednio

- klas pluginów `.tribe-*`
- specyficznego HTML WordPressa
- bardzo treściocentrycznych sekcji homepage 1:1
- slidera jako głównego wzorca interakcji dla aplikacji czatowej

## 10. Minimalny zestaw do implementacji w nowej aplikacji

Agent AI budujący nowy frontend powinien mieć zapewnione:

- fonty `Brygada 1918` i `Libre Franklin`
- logo z `assets/nbp/nbp-logo.svg`
- tokeny kolorów z sekcji 7.2
- header/nav inspirowany `.navbar`
- button system oparty na gold CTA i blue outline CTA
- lekkie bordery i małe radiusy
- brak nowoczesnych „soft cards”
- tryb wysokiego kontrastu
- zrzuty referencyjne z `docs/nbp-design-system-artifacts/screenshots/`
- surowe dane DOM/CSS z `docs/nbp-design-system-artifacts/nbp-analysis.json`

## 11. Uwagi końcowe

Analiza została wykonana na stronie głównej NBP w dniu `2026-03-18`, więc treści redakcyjne mogą się zmieniać, ale rdzeń systemu wizualnego jest spójny i dobrze uchwycony. Jeżeli kolejny etap ma obejmować wdrożenie tego design systemu do istniejącego frontendu w repo, ten dokument jest wystarczającą specyfikacją startową, a `nbp-main.min.css` i `nbp-analysis.json` pełnią rolę materiału referencyjnego do doprecyzowania detali.
