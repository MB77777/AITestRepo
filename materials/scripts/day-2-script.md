# Day 2 Script — Od pomysłu do architektury i planu wdrożenia

## Outcome dnia
Po Day 2 uczestnicy mają:
- doprecyzowany problem biznesowy i techniczny dla wspólnego MVP,
- listę założeń, ograniczeń i kryteriów akceptacji,
- szkic architektury rozwiązania i modelu danych,
- pierwszy ADR oraz zarys promptów/system promptu pod agentów,
- rozpisany backlog małych, testowalnych slice’ów gotowych do wejścia w Day 3.

## Linki dnia / mapa zależności
- Prompty modułowe (planowane uzupełnienie): `prompts/02-module-prompts.md`
- Ćwiczenia kursowe (planowane uzupełnienie): `exercises/03-exercises.md`
- Scenariusze demo (planowane uzupełnienie): `materials/04-demo-scenarios.md`
- Quiz otwarcia z Day 1: `materials/quizzes/day-1-anonymous-ai-basics-quiz.md`
- Dzień następny: `materials/scripts/day-3-script.md`

## Agenda dnia
- 09:00–09:20 — Reset po Day 1 + cel dnia
- 09:20–10:05 — Problem framing: dla kogo, po co, po czym poznamy sukces
- 10:05–11:00 — Założenia, ograniczenia i kryteria akceptacji
- 11:00–11:15 — Przerwa
- 11:15–12:05 — Architektura wysokiego poziomu
- 12:05–13:00 — Model domeny, dane i granice odpowiedzialności
- 13:00–13:30 — Przerwa obiadowa
- 13:30–14:20 — UX/UI prototyping i przejście z ekranu do zadań dla AI
- 14:20–14:30 — ADR: decyzje architektoniczne i kompromisy
- 14:30–14:40 — Opcjonalna krótka przerwa
- 14:40–15:25 — Prompt/system prompt i zasady pracy agentów
- 15:25–16:00 — Task slicing + handoff do Day 3

---

## 09:00–09:20 — Reset po Day 1 + cel dnia

### Co mówię
"Wczoraj ustawiliśmy silnik i pasy bezpieczeństwa. Dzisiaj nie kodujemy jeszcze na oślep — robimy coś dużo bardziej opłacalnego: przygotowujemy projekt tak, żeby agent nie zgadywał. Day 2 jest o tym, jak zamienić pomysł w zestaw decyzji, które da się sensownie przekazać Codexowi, zespołowi i później audytorowi."

"Na koniec dnia chcę, żebyśmy mieli nie tylko ładne slajdy w głowie, ale konkretne artefakty: problem framing, kryteria akceptacji, szkic architektury, model danych, ADR i backlog slice’ów. Dzięki temu Day 3 będzie wejściem w kod bez chaosu."

### Co pokazuję
- Krótkie przypomnienie efektów Day 1.
- Agendę Day 2 i oczekiwane artefakty.
- Prostą mapę: problem → wymagania → architektura → dane → UI → prompt → backlog.

### Co wklejam na chat
```text
Plan na dziś:
1) doprecyzować problem,
2) ustalić kryteria sukcesu,
3) zrobić szkic architektury i danych,
4) przygotować backlog pod agentów,
5) wejść w Day 3 bez „no to zobaczymy, co AI wymyśli”.
```

### Ćwiczenie
- Core: każdy zapisuje w 2–3 zdaniach, jaki problem ma rozwiązać nasze MVP i kto jest jego głównym użytkownikiem.
- Stretch: dopisać, jaka decyzja biznesowa lub operacyjna ma być dzięki temu szybsza.

### Feedback loop
Szybka runda: 3 osoby czytają swoje wersje, grupa wskazuje, co jest zbyt szerokie lub zbyt ogólne. Trener dopina wspólną wersję roboczą.

### Szacowany czas
20 minut

### Czego się nauczymy
- Jak zacząć dzień od celu, a nie od narzędzia.
- Jak ustawić wspólną definicję problemu dla mixed-skill grupy.

### Dlaczego warto
W codziennej pracy najdroższy błąd to nie zły prompt, tylko zły problem do rozwiązania. Dobre otwarcie dnia oszczędza iteracje, nerwy i tokeny.

### Kahneman cues
- S1: szybkie, intuicyjne nazwanie problemu własnymi słowami.
- S2: doprecyzowanie zakresu i kryterium sukcesu przed wejściem w architekturę.

---

## 09:20–10:05 — Problem framing: dla kogo, po co, po czym poznamy sukces

### Co mówię
"Jeżeli damy agentowi ogólne: ‘zrób aplikację dla banku’, to dostaniemy bardzo kreatywną fantazję. Jeżeli damy mu: użytkownika, cel, 3 kluczowe scenariusze i miarę sukcesu, zaczyna się prawdziwa współpraca. Dzisiaj uczymy się pisać kontekst tak, żeby AI pomagało, a nie zgadywało."

"To jest też moment ważny dla osób nietypowo technicznych: analityk, DBA, low-code, Java developer — wszyscy tu mają wkład. Bo problem framing nie jest tylko techniczny. To jest wspólny język projektu."

### Co pokazuję
- Przykład słabego briefu vs dobrego briefu.
- Szablon: użytkownik / zadanie / ból / wartość / miara sukcesu.
- Powiązanie z plikami: `prompts/02-module-prompts.md` i `materials/04-demo-scenarios.md`.

### Co wklejam na chat
```text
Mini-szablon problem framing:
- Kto używa?
- Jaki problem rozwiązuje?
- Co użytkownik chce osiągnąć w 2–3 krokach?
- Po czym poznamy, że MVP działa?
- Czego na pewno NIE robimy w tej wersji?
```

### Ćwiczenie
- Core: w parach uzupełnić szablon dla wspólnego MVP kursowego.
- Stretch: dopisać 2 ryzyka domenowe, np. błędna interpretacja danych, zbyt szeroki zakres lub brak ścieżki audytu.

### Feedback loop
Pary wrzucają 1 wersję problem framing na czat. Trener grupuje odpowiedzi i wspólnie składa jedną wersję bazową dla reszty dnia.

### Szacowany czas
45 minut

### Czego się nauczymy
- Jak przejść od pomysłu do zwięzłego briefu projektowego.
- Jak od razu budować granice MVP.

### Dlaczego warto
W pracy to jest moment, w którym kończy się „fajny pomysł”, a zaczyna projekt, który można przekazać dalej: do AI, zespołu, klienta albo przełożonego.

### Kahneman cues
- S1: szybkie generowanie wariantów problemu i użytkownika.
- S2: świadome zawężanie zakresu i definiowanie mierzalnego efektu.

---

## 10:05–11:00 — Założenia, ograniczenia i kryteria akceptacji

### Co mówię
"Agent działa najlepiej wtedy, gdy zna nie tylko cel, ale też barierki. W środowisku bankowym te barierki są zaletą, nie przeszkodą. Ograniczenia typu bezpieczeństwo, audyt, zgodność, on-prem czy konkretna technologia nie spowalniają — one ustawiają tor, po którym AI ma jechać."

"Robimy teraz trzy listy: założenia, ograniczenia i kryteria akceptacji. To jest paliwo dla przyszłych promptów i dla backlogu. Bez tego agent zrobi coś ‘imponującego’, ale niekoniecznie użytecznego."

### Co pokazuję
- Tabelę: założenia / ograniczenia / acceptance criteria.
- Przykłady: Java + DB stack, logowanie decyzji, bezpieczeństwo danych, możliwość adaptacji cloud vs on-prem.
- Różnicę między ‘fajnie by było’ a ‘must have’.

### Co wklejam na chat
```text
Uzupełnij 3 sekcje:
1) Założenia — co przyjmujemy jako prawdę startową?
2) Ograniczenia — czego nie możemy lub nie chcemy zrobić?
3) Kryteria akceptacji — po czym obiektywnie poznamy, że blok działa?

Przykład ograniczenia:
- w demo pokazujemy ścieżkę cloud-first,
- ale każdą ważną decyzję umiemy potem przełożyć na on-prem/local models.
```

### Ćwiczenie
- Core: uczestnicy uzupełniają tabelę dla wspólnego MVP.
- Stretch: dopisać jedno kryterium jakości i jedno kryterium bezpieczeństwa dla każdego głównego modułu.

### Feedback loop
Grupa wybiera 5 najważniejszych ograniczeń i 5 kryteriów akceptacji. Trener redaguje finalną wersję „kursową”, która stanie się wejściem do architektury.

### Szacowany czas
55 minut

### Czego się nauczymy
- Jak definiować ograniczenia w sposób pomocny dla AI i ludzi.
- Jak pisać kryteria akceptacji, które później da się testować.

### Dlaczego warto
W realnym projekcie to zmniejsza liczbę nieporozumień, poprawek i sporów w stylu: „ale ja myślałem, że miało działać inaczej”.

### Kahneman cues
- S1: szybkie wypisanie wszystkiego, co może być ważne.
- S2: selekcja tego, co rzeczywiście powinno sterować architekturą i zakresem.

---

## 11:00–11:15 — Przerwa

---

## 11:15–12:05 — Architektura wysokiego poziomu

### Co mówię
"Teraz przechodzimy z języka potrzeb na język komponentów. Nie interesuje nas jeszcze każdy endpoint i każda klasa. Chcemy odpowiedzieć: jakie części systemu muszą istnieć, jak rozmawiają ze sobą i gdzie są punkty ryzyka."

"Tu bardzo pilnujemy jednej rzeczy: architektura ma być zrozumiała dla człowieka, a nie tylko imponująca dla slajdu. Jeśli nie umiemy jej opowiedzieć w 2–3 minuty, to agent też dostanie za dużo swobody i zacznie improwizować."

### Co pokazuję
- Prosty diagram high-level: UI / backend / baza / integracje / logowanie / audyt.
- Dwie ścieżki wdrożeniowe:
  - cloud-max: Codex + GitHub + zewnętrzne modele,
  - adaptacja on-prem: lokalne modele/Ollama/custom endpoints + wewnętrzne repo/pipeline.
- Gdzie w architekturze wchodzą approvale, logi i granice odpowiedzialności.

### Co wklejam na chat
```text
Pytania do szkicu architektury:
- Jakie są 4–6 głównych komponentów?
- Co wchodzi do backendu, a co zostaje poza MVP?
- Gdzie trzymamy dane i logi decyzji?
- Jakie są 2–3 najważniejsze przepływy między komponentami?
- Co musimy umieć łatwo przełączyć w wersji on-prem?
```

### Ćwiczenie
- Core: w małych grupach narysować szkic architektury na podstawie ustalonych ograniczeń.
- Stretch: zaznaczyć jeden przepływ błędu lub awarii i jak system ma się wtedy zachować.

### Feedback loop
Każda grupa pokazuje diagram w 90 sekund. Reszta wskazuje jedną mocną stronę i jedno ryzyko. Trener składa wspólną wersję referencyjną.

### Szacowany czas
50 minut

### Czego się nauczymy
- Jak tworzyć architekturę „wystarczająco precyzyjną” pod pracę z agentem.
- Jak wcześnie myśleć o bezpieczeństwie, logowaniu i adaptacji środowiskowej.

### Dlaczego warto
W pracy to pomaga uniknąć sytuacji, w której AI świetnie generuje kod do złej architektury. Diagram high-level to tani sposób na wychwycenie drogich błędów.

### Kahneman cues
- S1: szybkie szkicowanie komponentów i przepływów.
- S2: świadoma ocena kompromisów, ryzyk i granic odpowiedzialności.

---

## 12:05–13:00 — Model domeny, dane i granice odpowiedzialności

### Co mówię
"Dla wielu projektów prawda mieszka w danych. Jeżeli model domeny jest mętny, to potem prompt jest mętny, API jest mętne i testy też są mętne. Dlatego po architekturze schodzimy poziom niżej: encje, relacje, atrybuty, reguły i odpowiedzialności."

"To jest też dobry moment na współpracę między osobami bardziej backend/DB a osobami od analizy. Jedni lepiej widzą strukturę, drudzy lepiej widzą wyjątki i proces. Razem robi się mniej niespodzianek."

### Co pokazuję
- Przykładowy szkic domeny: encje, relacje, najważniejsze pola.
- Jak z domeny wynika API, walidacja i logika biznesowa.
- Jak zidentyfikować pola wrażliwe i elementy wymagające audytu.

### Co wklejam na chat
```text
Checklist do modelu danych:
- Jakie są główne encje?
- Jakie relacje są krytyczne?
- Które pola są wymagane, a które opcjonalne?
- Co podlega walidacji lub audytowi?
- Jakie dane pokażemy w demo, a jakich świadomie nie dotykamy?
```

### Ćwiczenie
- Core: stworzyć szkic modelu domeny i 5 najważniejszych reguł biznesowych.
- Stretch: dopisać jedno pytanie, które warto zadać analitykowi lub właścicielowi biznesowemu przed implementacją.

### Feedback loop
Krótki przegląd: trener wybiera 2 modele i porównuje ich mocne strony. Potem dopina wspólny model referencyjny oraz listę reguł do późniejszych ćwiczeń.

### Szacowany czas
55 minut

### Czego się nauczymy
- Jak przygotować dane i domenę pod sensowną implementację.
- Jak odróżnić istotne reguły biznesowe od technicznych szczegółów.

### Dlaczego warto
W praktyce dużo błędów AI nie wynika z „głupiego modelu”, tylko z niejasnej domeny. Dobrze rozpisane dane poprawiają kod, testy i rozmowę z biznesem.

### Kahneman cues
- S1: intuicyjne wskazanie encji i relacji.
- S2: doprecyzowanie reguł, wyjątków i odpowiedzialności systemu.

---

## 13:00–13:30 — Przerwa obiadowa

---

## 13:30–14:20 — UX/UI prototyping i przejście z ekranu do zadań dla AI

### Co mówię
"Teraz robimy ruch, który bywa pomijany: przechodzimy z architektury do interfejsu i przepływu użytkownika. Nie chodzi o konkurs piękności. Chodzi o to, żeby każdy ekran pomagał nam doprecyzować zachowanie systemu i zamienić je na konkretne zadania dla agenta."

"To ważne zwłaszcza w mixed audience. Nawet jeśli ktoś nie pisze frontendu, to potrafi powiedzieć: co ma widzieć użytkownik, jaki błąd jest akceptowalny, jaka decyzja ma być czytelna. To są złote informacje dla AI."

### Co pokazuję
- Prosty wireframe lub lista ekranów / stanów.
- Jak z jednego ekranu wyciągnąć: komponenty, akcje, walidacje, stany pusty/błąd/sukces.
- Powiązanie z `materials/04-demo-scenarios.md` i `exercises/03-exercises.md`.

### Co wklejam na chat
```text
Dla każdego ekranu odpowiedz:
- Co użytkownik widzi?
- Co może zrobić?
- Jakie są stany: success / empty / loading / error?
- Jakie dane są potrzebne?
- Który element najlepiej nadaje się na pierwszy mały slice do Day 3?
```

### Ćwiczenie
- Core: rozpisać 2–3 główne ekrany lub przepływy użytkownika dla MVP.
- Stretch: wskazać, które elementy najłatwiej pokazać najpierw w cloud-max demo, a które lepiej opisać jako późniejszą adaptację on-prem.

### Feedback loop
Uczestnicy pokazują po jednym ekranie lub przepływie. Trener wybiera pierwszy kandydat do implementacji i uzasadnia wybór pod kątem dydaktyki oraz wykonalności.

### Szacowany czas
50 minut

### Czego się nauczymy
- Jak przejść z poziomu architektury do interakcji użytkownika.
- Jak z prototypu wyciągać zadania implementacyjne dla agentów.

### Dlaczego warto
W codziennej pracy to skraca drogę między analizą a developmentem. AI działa lepiej, gdy dostaje nie abstrakcję, tylko konkretny ekran, akcję i kryterium sukcesu.

### Kahneman cues
- S1: szybkie wyobrażenie ekranu i przepływu.
- S2: sprawdzenie stanów wyjątkowych i dopasowanie do architektury.

---

## 14:20–14:30 — ADR: decyzje architektoniczne i kompromisy

### Co mówię
"ADR, czyli krótki zapis decyzji architektonicznej, to jeden z najlepszych prezentów, jakie możecie dać sobie i agentowi. Zamiast pamiętać w głowie, czemu coś wybraliśmy, zostawiamy ślad: decyzja, kontekst, alternatywy, konsekwencje."

"Nie potrzebujemy epopei. Potrzebujemy krótkiego dokumentu, który tłumaczy: dlaczego poszliśmy w tę stronę i jakie kompromisy świadomie zaakceptowaliśmy."

### Co pokazuję
- Mini-szablon ADR: kontekst / decyzja / alternatywy / konsekwencje.
- Przykład decyzji: prostsza architektura MVP teraz, z możliwością rozbudowy później.
- Jak ADR pomoże w Day 3 przy delegowaniu pracy agentom.

### Co wklejam na chat
```text
Mini ADR:
- Kontekst:
- Decyzja:
- Odrzucone alternatywy:
- Konsekwencje i ryzyka:
```

### Ćwiczenie
- Core: grupa tworzy 1 ADR dla najważniejszej decyzji dnia.
- Stretch: dopisać, co by się zmieniło w wariancie stricte on-prem.

### Feedback loop
Wspólny odczyt ADR. Trener dopina język tak, żeby dokument nadawał się i dla człowieka, i jako wejście dla AI.

### Szacowany czas
10 minut

### Czego się nauczymy
- Jak zapisywać decyzje projektowe krótko, ale użytecznie.
- Jak świadomie wybierać kompromisy zamiast ich niechcący dziedziczyć.

### Dlaczego warto
To ogranicza chaos przy powrotach do projektu, zmianie osób w zespole i kolejnych iteracjach z AI.

### Kahneman cues
- S1: intuicyjny wybór rozwiązania.
- S2: nazwanie powodów, alternatyw i ryzyk tej decyzji.

---

## 14:30–14:40 — Opcjonalna krótka przerwa

---

## 14:40–15:25 — Prompt/system prompt i zasady pracy agentów

### Co mówię
"Mamy już kontekst projektu. Teraz zamieniamy go na język, który agent naprawdę potrafi wykorzystać. Nie chodzi o magiczny superprompt. Chodzi o zestaw prostych, konkretnych instrukcji: cel, zakres, ograniczenia, definicja done, reguły bezpieczeństwa i oczekiwany format odpowiedzi."

"To też jest dobre miejsce, żeby pokazać dwa światy: dziś możemy pracować w wersji cloud-max, ale ten sam styl pracy da się potem przenieść do środowiska on-prem — z lokalnymi modelami, własnymi endpointami i bardziej zamkniętym pipeline’em. Zmienia się infrastruktura, nie myślenie."

### Co pokazuję
- Szkielet promptu zadaniowego i szkic system promptu.
- Jak z naszych artefaktów dnia powstaje wejście dla Codexa.
- Krótkie porównanie: gdzie Claude/IntelliJ mogą pomóc jako dodatkowa perspektywa, ale nie jako główny tor kursu.

### Co wklejam na chat
```text
Szkielet promptu dla agenta:
- Cel zadania:
- Kontekst projektu:
- Zakres i out-of-scope:
- Kryteria akceptacji:
- Ograniczenia techniczne i bezpieczeństwa:
- Oczekiwany format wyniku:
- Jakie pliki / artefakty ma zaktualizować:
```

### Ćwiczenie
- Core: napisać prompt do pierwszego małego slice’a, który jutro zrealizuje agent.
- Stretch: dopisać wersję „adaptacja on-prem”, wskazując co zmienia się w modelu, endpointach lub polityce pracy.

### Feedback loop
2–3 prompty czytane na głos. Grupa wskazuje, czy agent miałby wystarczająco jasny cel, granice i definition of done. Trener poprawia prompt do wersji referencyjnej.

### Szacowany czas
45 minut

### Czego się nauczymy
- Jak składać kontekst z całego dnia w zwięzłe instrukcje dla AI.
- Jak oddzielać prompt „na wow” od promptu „do pracy”.

### Dlaczego warto
To jest bezpośrednio przenoszalne do codziennych zadań: refinementu, spike’ów technicznych, przygotowania ticketów i delegowania pracy agentom.

### Kahneman cues
- S1: szybki draft promptu.
- S2: precyzyjne doszczelnienie zakresu, ograniczeń i formatu odpowiedzi.

---

## 15:25–16:00 — Task slicing + handoff do Day 3

### Co mówię
"Na koniec dnia robimy najważniejszy most: z dokumentów i decyzji przechodzimy do małych, testowalnych kawałków implementacji. Nie planujemy jednego wielkiego ‘zbuduj aplikację’. Rozpisujemy pracę tak, żeby agent i człowiek mieli jasny rytm: zrób, sprawdź, popraw, złącz."

"Jeżeli Day 2 zrobimy dobrze, to Day 3 nie zaczyna się od chaosu i pustego terminala, tylko od gotowej listy sensownych pierwszych kroków. I to jest bardzo niedoceniana supermoc zespołów pracujących z AI."

### Co pokazuję
- Rozbicie na małe slice’y: UI, backend, dane, walidacja, testy, logowanie.
- Przykład kolejności: najpierw najprostszy pionowy przepływ, potem uszczelnianie.
- Powiązanie z przyszłymi plikami: `exercises/03-exercises.md`, `prompts/02-module-prompts.md`, `materials/scripts/day-3-script.md`.

### Co wklejam na chat
```text
Checklist do task slicing:
- Czy zadanie jest małe i testowalne?
- Czy ma jedno główne kryterium sukcesu?
- Czy wiadomo, jakie pliki lub moduły dotknie?
- Czy da się je zademonstrować bez czekania na „całą aplikację”?
- Czy po tym kroku wiemy, co robić dalej?
```

### Ćwiczenie
- Core: rozbić projekt na 5–8 pierwszych slice’ów do Day 3.
- Stretch: przypisać, które slice’y najlepiej nadają się do pracy cloud-max, a które lepiej tylko omówić jako późniejszą adaptację on-prem.

### Feedback loop
Trener z grupą układa wspólną kolejność wdrożenia. Na koniec każdy uczestnik zapisuje, który slice najbardziej rozumie i z czym chce wejść w Day 3.

### Szacowany czas
35 minut

### Czego się nauczymy
- Jak przygotować backlog pod współpracę człowiek + agent.
- Jak redukować ryzyko przez małe, demonstracyjne przyrosty.

### Dlaczego warto
Tak pracuje się lepiej nie tylko na szkoleniu. W realnych projektach małe slice’y poprawiają przewidywalność, review, testowanie i poczucie kontroli nad AI.

### Kahneman cues
- S1: szybkie generowanie listy możliwych zadań.
- S2: selekcja i ułożenie kolejności pod ryzyko, wartość i wykonalność.

---

## Zamknięcie dnia

### Co mówię
"Dzisiaj zrobiliśmy coś, czego AI samo za nas nie zrobi sensownie: zbudowaliśmy wspólne rozumienie projektu. Jutro to zamienimy na działające kawałki aplikacji. Dzięki temu nie wchodzimy w kod z nadzieją, tylko z planem."

### Co pokazuję
- Listę artefaktów gotowych po Day 2.
- Most do Day 3: pierwszy slice, pierwszy prompt, pierwszy expected output.

### Co wklejam na chat
```text
Po Day 2 mamy gotowe:
- problem framing,
- założenia + ograniczenia + kryteria akceptacji,
- szkic architektury,
- model danych / domeny,
- mini ADR,
- szkic promptu dla agenta,
- backlog pierwszych slice’ów do implementacji.

Jutro wchodzimy w budowę rdzenia aplikacji na bazie tych artefaktów.
```

### Ćwiczenie
- Core: każdy zapisuje 1 rzecz, która dziś najbardziej porządkuje pracę z AI.
- Stretch: dopisać 1 pytanie, które warto zabrać do Day 3.

### Feedback loop
Szybki exit check na czacie: „co było dziś najbardziej praktyczne?” i „z czym wchodzisz jutro?”.

### Szacowany czas
5 minut

### Czego się nauczymy
- Jak domykać dzień konkretnym zestawem wejść do kolejnego etapu.

### Dlaczego warto
Dobre zamknięcie zwiększa transfer wiedzy do pracy i daje poczucie postępu, a nie tylko uczestnictwa w kolejnym bloku szkoleniowym.

### Kahneman cues
- S1: intuicyjne wskazanie najcenniejszego elementu dnia.
- S2: świadome przygotowanie wejścia do następnej sesji.
