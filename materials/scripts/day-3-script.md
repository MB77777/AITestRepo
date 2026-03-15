# Day 3 Script — Budowa rdzenia aplikacji

## Outcome dnia
Po Day 3 uczestnicy mają:
- uruchomiony, wspólnie zbudowany rdzeń aplikacji w małych, kontrolowanych slice’ach,
- przećwiczony Codex-first workflow dla backendu, danych i podstawowej integracji UI,
- prostą metodykę pracy: prompt → diff → test → poprawka → commit,
- lepsze rozumienie, jak zachować audytowalność, guardrails i approvale w środowisku enterprise,
- przygotowany materiał wejściowy do Day 4: testy, review, bezpieczeństwo i refaktoryzacja.

## Linki dnia / mapa zależności
- Prompty dla Day 3: `prompts/02-module-prompts.md#day-3--implementacja-rdzenia-codex-first`
  - D3-M1 Mały slice: `prompts/02-module-prompts.md#d3-m1-prompt-implementacyjny-mały-slice`
  - D3-M2 Debugging: `prompts/02-module-prompts.md#d3-m2-prompt-debugowy`
  - D3-M3 Refaktor: `prompts/02-module-prompts.md#d3-m3-prompt-refaktoryzacyjny-bez-zmiany-zachowania`
- Ćwiczenia Day 3: `exercises/03-exercises.md#day-3--implementacja-rdzenia`
  - D3-E1 Backend/API: `exercises/03-exercises.md#d3-e1--backendapi--podstawowe-guardrails`
  - D3-E2 Integracja UI/CLI: `exercises/03-exercises.md#d3-e2--integracja-uicli-z-backendem`
- Scenariusz demo na dziś: `materials/04-demo-scenarios.md#scenariusz-b--ekspert-sqldb-który-chce-konkretu-i-bezpieczeństwa`
- Failure scenario na dziś: `materials/04-demo-scenarios.md#f1--halucynacja-apifeature`
- Dzień poprzedni: `materials/scripts/day-2-script.md`
- Dzień następny: `materials/scripts/day-4-script.md`
- Referencja modułu terminalowego: `materials/references/wezterm-mini-module.md`
- Referencja modułu bezpieczeństwa: `materials/references/sandbox-safety-module.md`

## Agenda dnia
- 09:00–09:20 — Handoff z Day 2 i plan budowy na dziś
- 09:20–10:05 — Pierwszy slice: backend skeleton + kontrakt funkcjonalny
- 10:05–11:00 — Warstwa danych i bezpieczne decyzje implementacyjne
- 11:00–11:15 — Przerwa
- 11:15–12:05 — Podłączenie prostego UI i przepływu end-to-end
- 12:05–13:00 — Pętla bezpiecznej iteracji: diff, test, poprawka, commit
- 13:00–13:30 — Przerwa obiadowa
- 13:30–14:20 — Debugging z AI: diagnoza błędów bez utraty kontroli
- 14:20–14:30 — Krótkie porównanie: Codex vs Claude vs IntelliJ + mikro‑moduł WezTerm
- 14:30–14:40 — Opcjonalna krótka przerwa
- 14:40–15:25 — Refaktoryzacja i porządkowanie kodu pod Day 4
- 15:25–16:00 — Demo postępu, decyzje architektoniczne i handoff do Day 4

---

## 09:00–09:20 — Handoff z Day 2 i plan budowy na dziś

### Co mówię
"Wczoraj zrobiliśmy coś bardzo niedocenianego: przygotowaliśmy architekturę, backlog i granice. Dzisiaj zbieramy za to nagrodę. Zamiast pytać AI: ‘zrób aplikację’, będziemy prowadzić je jak dobrego, szybkiego, ale czasem nadgorliwego stażystę z dostępem do terminala. Czyli z szacunkiem i z checklistą."

"Celem Day 3 nie jest napisanie wszystkiego. Celem jest zbudowanie rdzenia aplikacji w taki sposób, żeby każdy widział, jak pracować z agentem bez chaosu: mały slice, jasny prompt, sprawdzenie diffu, uruchomienie testu, decyzja co dalej. To jest workflow, który potem da się przenieść do zespołu, do banku i do środowiska on-prem."

### Co pokazuję
- Krótkie przypomnienie artefaktów z Day 2: problem framing, ograniczenia, architektura, model danych, backlog slice’ów.
- Dzienny cel: z backlogu wybieramy 2–3 małe slice’y, które dają działający przepływ end-to-end.
- Prostą mapę dnia: backend → dane → UI → debug → refactor → handoff do jakości i bezpieczeństwa.

### Co wklejam na chat
```text
Plan Day 3:
1) bierzemy mały slice z backlogu,
2) piszemy precyzyjny prompt dla Codexa,
3) sprawdzamy diff i uruchamiamy test,
4) poprawiamy tylko to, co trzeba,
5) pokazujemy działający przepływ zamiast „magii AI”.
```

### Ćwiczenie
- Core: uczestnicy wskazują, które 2–3 slice’y z Day 2 dają najszybszy sensowny efekt demonstracyjny.
- Stretch: dopisać, jaki artefakt audytowy chcemy mieć przy każdym slice’ie, np. commit, opis decyzji albo wynik testu.

### Feedback loop
Trener zbiera propozycje, grupa głosuje kciukiem w górę na najbardziej sensowną sekwencję. Powstaje wspólna kolejność implementacji na resztę dnia.

### Szacowany czas
20 minut

### Czego się nauczymy
- Jak przejść z planowania do implementacji bez utraty kontekstu.
- Jak wybierać slice’y, które szybko pokazują wartość.

### Dlaczego warto
W realnych projektach nie wygrywa ten, kto wygeneruje najwięcej kodu, tylko ten, kto najszybciej pokazuje kontrolowany postęp. To obniża stres, poprawia komunikację i buduje zaufanie do AI.

### Kahneman cues
- S1: szybkie wskazanie, które elementy backlogu wydają się najważniejsze.
- S2: świadome ułożenie kolejności tak, by ryzyko i zależności miały sens.

---

## 09:20–10:05 — Pierwszy slice: backend skeleton + kontrakt funkcjonalny

### Co mówię
"Zaczynamy od czegoś, co lubią i developerzy, i managerowie: mały kawałek, który da się opisać jednym zdaniem. Na przykład endpoint, serwis albo prosty przypadek użycia. Agent nie ma od razu pisać połowy systemu. Ma dowieźć mały, sprawdzalny kontrakt funkcjonalny."

"To jest ważny moment dla wszystkich, którzy mają doświadczenie w Javie, bazach danych albo low-code. Nieważne, czy piszecie kod codziennie. Ważne, żeby umieć powiedzieć: jaki input, jaki output, jaka walidacja, jaki błąd i jaki warunek akceptacji. To jest język, który AI rozumie bardzo dobrze."

### Co pokazuję
- Przykład małego slice’a: kontroler + serwis + jedna ścieżka sukcesu i jeden błąd.
- Jak napisać prompt do Codexa z wejściem, wyjściem, ograniczeniami i Definition of Done.
- Jak odwołać się do planowanych materiałów: `prompts/02-module-prompts.md` i `exercises/03-exercises.md`.

### Co wklejam na chat
```text
Szablon promptu dla pierwszego slice’a:
- Cel biznesowy: co ma działać?
- Zakres techniczny: które pliki/warstwy wolno ruszyć?
- Wejście/wyjście: jaki kontrakt ma powstać?
- Walidacja: jakie błędy obsługujemy teraz?
- Done: po czym poznajemy, że slice jest gotowy?
```

### Ćwiczenie
- Core: uczestnicy w parach piszą prompt do pierwszego slice’a backendowego.
- Stretch: dopisać krótką sekcję „czego NIE robimy w tej iteracji”, żeby ograniczyć rozlewanie zakresu.

### Feedback loop
2–3 pary czytają swoje prompty. Grupa wskazuje, czy prompt jest wystarczająco konkretny, czy nadal zostawia agentowi zbyt wiele swobody. Trener dopina jedną wersję referencyjną.

### Szacowany czas
45 minut

### Czego się nauczymy
- Jak z backlogu zrobić prompt implementacyjny zamiast luźnego życzenia.
- Jak ustawić jasny kontrakt dla pierwszego backendowego slice’a.

### Dlaczego warto
Dobrze napisany prompt obniża liczbę poprawek, skraca czas pracy i daje lepszy materiał do review. To się opłaca bardziej niż późniejsze gaszenie pożarów.

### Kahneman cues
- S1: szybkie proponowanie struktury rozwiązania.
- S2: doprecyzowanie kontraktu, błędów i warunków akceptacji przed generowaniem kodu.

---

## 10:05–11:00 — Warstwa danych i bezpieczne decyzje implementacyjne

### Co mówię
"Drugi krok to dane, bo wiele aplikacji wygląda pięknie, dopóki nie trzeba zapisać czegoś sensownego i odtworzyć decyzji po tygodniu. W środowisku bankowym pytanie nie brzmi tylko ‘czy działa?’, ale też ‘czy wiemy, co się stało, dlaczego i gdzie to sprawdzić?’."

"Dlatego przy warstwie danych dokładamy guardrails: jawne założenia, walidacje, logowanie decyzji i minimalny sensowny ślad audytowy. Nie budujemy od razu kombajnu. Budujemy podstawę, którą da się wyjaśnić audytorowi bez pocenia się jak serwer bez swapu."

### Co pokazuję
- Jak z modelu danych z Day 2 wybrać minimalny zestaw encji do pierwszej iteracji.
- Przykład promptu do warstwy danych: encja, repozytorium, walidacja, logika błędu.
- Dwa warianty narracji:
  - cloud-max: szybka iteracja z Codexem i zewnętrznym modelem,
  - adaptacja on-prem: ten sam workflow, ale z lokalnym modelem/custom endpointem, przy zachowaniu tych samych kontraktów i kryteriów jakości.

### Co wklejam na chat
```text
Checklist dla warstwy danych:
- Jakie encje są naprawdę potrzebne w tym slice’ie?
- Jakie pola są obowiązkowe?
- Co walidujemy już teraz?
- Co logujemy lub zapisujemy pod audyt?
- Jaką decyzję odkładamy na później, żeby nie przeładować iteracji?
```

### Ćwiczenie
- Core: rozpisać minimalny model danych dla pierwszego działającego przepływu.
- Stretch: wskazać jeden element, który w wersji bankowej wymagałby później mocniejszego security lub compliance review.

### Feedback loop
Trener porównuje 2 warianty modelu danych i pyta grupę, który lepiej równoważy prostotę z bezpieczeństwem. Finalizujemy wspólną wersję do dalszej implementacji.

### Szacowany czas
55 minut

### Czego się nauczymy
- Jak podejmować minimalne, ale rozsądne decyzje o danych i walidacji.
- Jak od początku myśleć o audytowalności i guardrails.

### Dlaczego warto
W praktyce najwięcej bólu pojawia się później tam, gdzie dane były potraktowane „na szybko”. Dobrze ustawiona warstwa danych daje spokojniejszy rozwój, mniej regresji i łatwiejsze tłumaczenie decyzji.

### Kahneman cues
- S1: intuicyjne wskazanie najważniejszych encji i pól.
- S2: świadome ustalenie walidacji, wyjątków i śladu audytowego.

---

## 11:00–11:15 — Przerwa

---

## 11:15–12:05 — Podłączenie prostego UI i przepływu end-to-end

### Co mówię
"Teraz robimy coś bardzo ważnego psychologicznie: domykamy pierwszy przepływ end-to-end. Nawet prosty ekran i podstawowe połączenie z backendem zmieniają odbiór projektu. Nagle przestajemy mówić o potencjale, a zaczynamy pokazywać działanie."

"To jest też moment, żeby podkreślić: na kursie pokazujemy React jako szybki nośnik demonstracyjny, ale logika podejścia jest przenaszalna. Jeśli ktoś pracuje w Angularze albo w środowisku low-code, to nadal korzysta z tych samych zasad: jasny kontrakt, mały slice, walidacja, test i kontrolowany diff."

### Co pokazuję
- Prosty widok lub formularz, który korzysta z wcześniej zbudowanego slice’a backendowego.
- Jak opisać agentowi minimalny zakres UI: pola, walidacja, stan loading/error/success.
- Powiązanie z planowanymi artefaktami: `materials/04-demo-scenarios.md` i `exercises/03-exercises.md`.

### Co wklejam na chat
```text
Minimalny slice UI:
- jeden ekran / jeden formularz / jeden kluczowy przepływ,
- stany: ładowanie, sukces, błąd,
- żadnych „upiększeń na zapas”,
- celem jest działający obieg danych od UI do backendu i z powrotem.
```

### Ćwiczenie
- Core: uczestnicy opisują minimalny zakres ekranu potrzebny do pokazania wartości biznesowej.
- Stretch: dopisać komunikat błędu i komunikat sukcesu tak, aby były zrozumiałe również dla nietechnicznego odbiorcy.

### Feedback loop
Grupa porównuje dwa warianty UI pod kątem prostoty i czytelności. Trener wybiera wersję, która najlepiej wspiera demo i dalsze testowanie.

### Szacowany czas
50 minut

### Czego się nauczymy
- Jak połączyć backend i UI bez rozjechania zakresu.
- Jak pokazać wartość biznesową przez mały, działający przepływ.

### Dlaczego warto
W codziennej pracy działający przepływ end-to-end szybciej przekonuje interesariuszy niż 20 slajdów o architekturze. Daje też dużo lepszy materiał do testów i dyskusji o jakości.

### Kahneman cues
- S1: intuicyjne projektowanie prostego przepływu użytkownika.
- S2: świadome ograniczenie zakresu do minimum potrzebnego na dziś.

---

## 12:05–13:00 — Pętla bezpiecznej iteracji: diff, test, poprawka, commit

### Co mówię
"To jest najważniejszy nawyk dnia: nie generujemy i nie wierzymy. Generujemy i sprawdzamy. AI nie zastępuje odpowiedzialności inżynierskiej. Ono przyspiesza pracę, ale to my decydujemy, czy diff ma sens, czy test jest wystarczający i czy commit opisuje realną zmianę."

"W praktyce ta pętla wygląda tak: mały prompt, mały diff, szybki test, poprawka, commit. Jeżeli agent zrobił za dużo, cofamy zakres. Jeżeli zrobił za mało, doprecyzowujemy prompt. To jest nudne w najlepszym możliwym sensie — bo przewidywalność wygrywa z widowiskiem."

### Co pokazuję
- Jak czytać diff po pracy agenta: co jest zgodne z zakresem, co jest podejrzane, co jest „sprytnym dodatkiem”, którego nie chcieliśmy.
- Przykład pojedynczego, celowanego testu zamiast odpalania wszystkiego naraz.
- Minimalny workflow commitowania po małych krokach.

### Co wklejam na chat
```text
Pętla bezpiecznej iteracji:
1) uruchom mały slice,
2) przeczytaj diff,
3) odpal celowany test,
4) popraw prompt albo kod,
5) zrób mały commit z jasnym opisem.

Zasada: jeśli diff jest za duży, to nie jest sukces — to sygnał, że prompt był za szeroki.
```

### Ćwiczenie
- Core: uczestnicy oceniają przykładowy diff i wskazują, co zostawić, co poprawić, a co wyrzucić.
- Stretch: napisać krótką wiadomość do agenta z informacją zwrotną po nieudanej iteracji.

### Feedback loop
Szybkie głosowanie: które fragmenty diffu są „safe to keep”, a które wymagają korekty. Trener pokazuje, jak z feedbacku zrobić kolejny, lepszy prompt.

### Szacowany czas
55 minut

### Czego się nauczymy
- Jak utrzymać kontrolę nad pracą agenta.
- Jak zamieniać review i test na konkretną informację zwrotną.

### Dlaczego warto
To jest dokładnie ten moment, który odróżnia dojrzały workflow AI od chaosu. Bez tej pętli łatwo wpaść w zachwyt albo frustrację. Z nią mamy proces, który skaluje się na zespół.

### Kahneman cues
- S1: szybkie zauważenie „czy to wygląda sensownie”.
- S2: spokojna, inżynierska ocena diffu, testu i zakresu zmiany.

---

## 13:00–13:30 — Przerwa obiadowa

---

## 13:30–14:20 — Debugging z AI: diagnoza błędów bez utraty kontroli

### Co mówię
"Po obiedzie robimy coś bardziej życiowego niż idealny greenfield: błędy. I bardzo dobrze, bo prawdziwa wartość AI nie wychodzi wtedy, gdy wszystko działa, tylko wtedy, gdy umiemy szybciej zawęzić problem, zrozumieć przyczynę i poprawić go bez psucia innych rzeczy."

"Kluczowa zasada brzmi: nie wrzucamy agentowi komunikatu ‘nie działa, napraw’. Dajemy objawy, kroki reprodukcji, zakres, logi i hipotezę. AI świetnie pomaga w diagnozie, gdy dostaje materiał dowodowy. Bez tego będzie raczej poetą niż diagnostą."

### Co pokazuję
- Przykład błędu: walidacja, problem z mapowaniem danych, błąd integracji UI-backend lub nieudany test.
- Jak ułożyć prompt debugowy: objaw, expected vs actual, logi, ograniczenie zakresu.
- Jak odróżniać diagnozę od naprawy „na ślepo”.

### Co wklejam na chat
```text
Szablon promptu debugowego:
- Objaw: co dokładnie nie działa?
- Kroki reprodukcji: jak to odtworzyć?
- Expected vs actual: co miało być, a co jest?
- Dowody: log, stack trace, diff, wynik testu.
- Zakres: gdzie wolno szukać i co można zmienić?
```

### Ćwiczenie
- Core: uczestnicy opisują prompt debugowy dla jednego konkretnego błędu.
- Stretch: dopisać hipotezę przyczyny i propozycję najmniejszej możliwej poprawki.

### Feedback loop
Trener wybiera 2 prompty debugowe i porównuje, który lepiej prowadzi do diagnozy. Grupa wskazuje, gdzie prompt był zbyt emocjonalny, a za mało informacyjny.

### Szacowany czas
50 minut

### Czego się nauczymy
- Jak używać AI do diagnozy błędów, a nie tylko do generowania kodu.
- Jak formułować problemy w sposób, który przyspiesza naprawę.

### Dlaczego warto
W pracy najwięcej czasu znika nie na napisanie happy path, ale na znalezienie, dlaczego coś się wysypało. Dobry debugging workflow to realna oszczędność czasu i nerwów.

### Kahneman cues
- S1: intuicyjne szukanie „co tu śmierdzi”.
- S2: uporządkowana diagnoza na podstawie logów, testów i zakresu zmian.

---

## 14:20–14:30 — Krótkie porównanie: Codex vs Claude vs IntelliJ + mikro‑moduł WezTerm

### Co mówię
"Core naszego kursu pozostaje prosty: Codex-first. To jest świadoma decyzja, żeby nie rozproszyć grupy. Ale uczciwie pokazujemy też, gdzie inne narzędzia mogą być sensowne jako uzupełnienie, a nie nowa religia technologiczna."

"Claude Code warto pokazać krótko wtedy, gdy chcemy porównać styl planowania, wyjaśniania lub pracy z dłuższą narracją. IntelliJ AI Assistant ma sens jako przykład dla zespołów mocno osadzonych w IDE JetBrains, zwłaszcza jeśli ktoś chce zostać bliżej codziennego środowiska pracy. Dodatkowo robimy szybki mikro‑moduł WezTerm: kiedy pomaga bardziej niż Windows Terminal w sesjach TUI i powiadomieniach. Pokazujemy to krótko, rzeczowo i wracamy do głównego toru."

### Co pokazuję
- Jedną tabelę porównawczą: Codex jako workflow główny, Claude Code i IntelliJ jako opcjonalny kontekst.
- 2–3 min mikro‑moduł WezTerm wg `materials/references/wezterm-mini-module.md`: TUI UX, splity, powiadomienia i kiedy nie warto zmieniać terminala.
- Konkretne kryteria: kiedy narzędzie pomaga, a kiedy tylko zwiększa tool sprawl.
- 2-min przypomnienie bezpiecznych defaultów z `materials/references/sandbox-safety-module.md` (sandbox vs no-sandbox, WSL != izolacja, bash vs PowerShell).

### Co wklejam na chat
```text
Krótka zasada narzędziowa:
- Codex = główny workflow kursu,
- Claude Code = krótki punkt porównawczy,
- IntelliJ AI Assistant = opcja dla zespołów IDE-first,
- WezTerm = opcjonalna ergonomia terminala (TUI/splity/powiadomienia),
- nie uczymy 5 narzędzi naraz, bo celem jest metodyka, nie kolekcjonowanie ikonek.
```

### Ćwiczenie
- Core: uczestnicy wskazują, w jakim jednym scenariuszu ich zespół mógłby chcieć krótkiego porównania narzędzi.
- Stretch: dopisać ryzyko organizacyjne wynikające z nadmiaru narzędzi.

### Feedback loop
Krótka runda ustna: 2–3 osoby mówią, które porównanie byłoby dla nich najbardziej praktyczne i dlaczego. Trener dopina zasadę: porównujemy, ale nie rozbijamy głównego workflow.

### Szacowany czas
10 minut

### Czego się nauczymy
- Jak pokazywać alternatywy bez rozmycia celu kursu.
- Jak odróżniać sensowne porównanie od tool sprawl.

### Dlaczego warto
Uczestnicy widzą szerszy krajobraz narzędzi, ale nadal wychodzą z jedną spójną metodą pracy. To dużo bardziej użyteczne niż przegląd katalogu aplikacji.

### Kahneman cues
- S1: szybkie skojarzenie z własnym środowiskiem pracy.
- S2: świadoma ocena kosztu poznawczego i organizacyjnego dodatkowych narzędzi.

---

## 14:30–14:40 — Opcjonalna krótka przerwa

---

## 14:40–15:25 — Refaktoryzacja i porządkowanie kodu pod Day 4

### Co mówię
"Gdy pierwszy przepływ działa, pojawia się pokusa, żeby ogłosić zwycięstwo i uciec w stronę demo. Ale to właśnie teraz warto zrobić mały porządek. Refaktoryzacja po pierwszej iteracji nie jest luksusem. To moment, w którym oddzielamy kod ‘już działa’ od kodu ‘da się z tym żyć jutro’."

"AI potrafi pomóc też tutaj, ale znowu: mały zakres, jasny cel i zero romantycznych wizji typu ‘przepisz mi cały moduł na czyściej’. Dziś uczymy się porządkować tylko to, co realnie poprawia czytelność, testowalność albo bezpieczeństwo przed wejściem w Day 4."

### Co pokazuję
- Przykłady małych refaktoryzacji: nazwy, wydzielenie metody, uproszczenie warunku, poprawa walidacji, usunięcie duplikacji.
- Jak napisać prompt refaktoryzacyjny bez zmiany zachowania.
- Jak zaznaczyć elementy, które Day 4 powinien objąć testami lub review security.

### Co wklejam na chat
```text
Prompt do bezpiecznej refaktoryzacji:
- nie zmieniaj zachowania biznesowego,
- popraw tylko czytelność / strukturę / testowalność,
- zachowaj istniejące kontrakty,
- wskaż, co warto przetestować po zmianie,
- jeśli zakres rośnie, zatrzymaj się i zaproponuj mniejszy krok.
```

### Ćwiczenie
- Core: uczestnicy wybierają jeden fragment kodu, który warto uporządkować przed Day 4.
- Stretch: dopisać mini-checklistę, co po tej refaktoryzacji trzeba sprawdzić testem lub review.

### Feedback loop
Grupa ocenia, czy proponowana refaktoryzacja jest naprawdę mała i bezpieczna. Trener pokazuje, jak odróżnić realny porządek od kuszącego, ale ryzykownego „jeszcze tylko przepiszmy pół modułu”.

### Szacowany czas
45 minut

### Czego się nauczymy
- Jak robić małe, bezpieczne refaktoryzacje z pomocą AI.
- Jak przygotować kod do testów, review i bezpieczeństwa.

### Dlaczego warto
To właśnie tutaj rodzi się dług techniczny albo jego brak. Mały porządek dziś oszczędza dużo frustracji jutro, kiedy wejdziemy w testy i security.

### Kahneman cues
- S1: szybkie wskazanie fragmentów „które bolą w oczy”.
- S2: świadoma decyzja, które zmiany są bezpieczne, a które trzeba odłożyć.

---

## 15:25–16:00 — Demo postępu, decyzje architektoniczne i handoff do Day 4

### Co mówię
"Na koniec dnia nie robimy maratonu kolejnych zmian. Zatrzymujemy się i porządkujemy to, co już mamy. Pokazujemy działający fragment, przypominamy decyzje, które podjęliśmy, i świadomie zapisujemy, co wchodzi do Day 4: testy, quality gate, security i legacy thinking."

"To też ważny moment mentalny dla uczestników. Chcę, żeby wyszli z poczuciem: ‘umiem poprowadzić AI przez implementację’. Nie ‘AI zrobiło coś za mnie’, tylko ‘umiem ustawić proces, który daje wynik’. To jest dokładnie ten rodzaj pewności siebie, który warto zabrać do pracy."

### Co pokazuję
- Krótkie demo działającego przepływu end-to-end.
- Listę decyzji architektonicznych i implementacyjnych, które potwierdziliśmy lub odłożyliśmy.
- Most do Day 4: gdzie jutro wejdą testy, review, security scanning i praca z legacy.

### Co wklejam na chat
```text
Podsumowanie Day 3:
- mamy działający rdzeń aplikacji,
- pracowaliśmy w małych, kontrolowanych slice’ach,
- każdy ważny krok przechodził przez diff + test + decyzję,
- jutro domykamy jakość: testy, review, bezpieczeństwo i refaktoryzacja legacy.
```

### Ćwiczenie
- Core: każdy zapisuje jedną rzecz, którą jutro koniecznie trzeba zweryfikować testem albo review.
- Stretch: dopisać jedno pytanie, które warto zadać przed wdrożeniem tego workflow w zespole enterprise lub on-prem.

### Feedback loop
Krótka runda końcowa: 3 osoby mówią, co było dziś najbardziej praktyczne i co nadal budzi ostrożność. Trener zapisuje te punkty jako wejście do Day 4.

### Szacowany czas
35 minut

### Czego się nauczymy
- Jak zamykać dzień implementacyjny z czytelnym stanem projektu.
- Jak przygotować naturalne przejście do jakości, testów i bezpieczeństwa.

### Dlaczego warto
Bez świadomego domknięcia łatwo zgubić decyzje, kontekst i ryzyka. Dobre podsumowanie sprawia, że kolejny dzień startuje z rozpędu, a nie od odtwarzania pamięci.

### Kahneman cues
- S1: szybkie wskazanie, co dziś realnie zadziałało.
- S2: uporządkowanie decyzji, ryzyk i priorytetów na Day 4.

---

## Notatki dla trenera
- Trzymaj Codex jako główny tor i wracaj do niego po każdym krótkim porównaniu.
- Gdy grupa zaczyna odpływać w „a jeszcze można by…”, wróć do zasady małego slice’a.
- Podkreślaj, że cloud-max pokazujemy po to, by zrozumieć maksimum możliwości, ale każdą ważną praktykę da się później przełożyć na środowisko on-prem/local models.
- Dla uczestników z Java/DB/low-code mix stale tłumacz wspólny mianownik: kontrakt, walidacja, przepływ, test, audit trail.
- Jeśli energia grupy spada po lunchu, wybierz bardziej życiowy przykład błędu i zagraj nim jak małą zagadką detektywistyczną — bankowy Sherlock, tylko z logami zamiast fajki.
