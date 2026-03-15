# Day 4 Script — Jakość, testy, bezpieczeństwo, legacy

## Outcome dnia
Po Day 4 uczestnicy mają:
- uporządkowaną metodykę pracy z agentem pod jakość: prompt → diff → test → review → poprawka → commit,
- praktyczne rozumienie, jak z AI robić testy, review i security bez ślepego zaufania,
- przećwiczony workflow modernizacji legacy code w małych, bezpiecznych krokach,
- jasny most między szybkim trybem cloud a późniejszym wdrożeniem on-prem / enterprise,
- materiał wejściowy do Day 5: demo końcowe, wdrożeniowe nawyki i plan „co dalej po szkoleniu”.

## Linki dnia / mapa zależności
- Prompty modułowe (planowane uzupełnienie): `prompts/02-module-prompts.md`
- Ćwiczenia kursowe (planowane uzupełnienie): `exercises/03-exercises.md`
- Scenariusze demo (planowane uzupełnienie): `materials/04-demo-scenarios.md`
- Quiz i kalibracja z Day 1: `materials/quizzes/day-1-anonymous-ai-basics-quiz.md`
- Dzień poprzedni: `materials/scripts/day-3-script.md`
- Dzień następny: `materials/scripts/day-5-script.md`

## Agenda dnia
- 09:00–09:20 — Handoff z Day 3: co już działa i gdzie dziś grozi chaos
- 09:20–10:05 — Testy z AI: od kryteriów akceptacji do sensownych test cases
- 10:05–11:00 — Review wygenerowanego kodu: diff, ryzyka, feedback do agenta
- 11:00–11:15 — Przerwa
- 11:15–12:05 — Security i audyt: jak nie zachwycić się kodem, który właśnie otworzył wszystkie drzwi
- 12:05–13:00 — Legacy code z agentem: od strachu do kontrolowanej refaktoryzacji
- 13:00–13:30 — Przerwa obiadowa
- 13:30–14:20 — CI/CD i automatyzacja: cloud-max vs on-prem bez bajek dla zarządu
- 14:20–14:30 — Krótkie porównanie: kiedy warto wspomnieć Claude Code lub IntelliJ AI Assistant
- 14:30–14:40 — Opcjonalna krótka przerwa
- 14:40–15:25 — Warsztat naprawczy: poprawki po testach, review i security findings
- 15:25–16:00 — Podsumowanie jakościowe i handoff do Day 5 demo

---

## 09:00–09:20 — Handoff z Day 3: co już działa i gdzie dziś grozi chaos

### Co mówię
"Wczoraj zbudowaliśmy działający rdzeń. Dziś wchodzimy w etap, który odróżnia fajne demo od rozwiązania, którego nie boimy się pokazać zespołowi, liderowi albo audytorowi. AI świetnie przyspiesza start, ale bez jakości i bezpieczeństwa potrafi też przyspieszyć katastrofę. Bardzo efektywnie, rzecz jasna."

"Celem Day 4 nie jest udowodnienie, że AI samo zapewni jakość. Celem jest pokazanie, jak człowiek i agent tworzą razem pętlę kontroli jakości. Testy, code review, security review i praca z legacy nie są dodatkiem po projekcie. To jest środek projektu, jeśli chcemy używać AI profesjonalnie."

### Co pokazuję
- Krótkie przypomnienie efektów z Day 3: działający slice, podstawowy przepływ, decyzje architektoniczne.
- Mapę ryzyk na dziś:
  - brak testów lub zbyt powierzchowne testy,
  - zbyt szerokie zmiany w diffie,
  - security holes ukryte pod „ładnym” kodem,
  - chaos przy dotykaniu legacy.
- Dzienną pętlę pracy: kryteria → test → diff review → security check → poprawka → commit.

### Co wklejam na chat
```text
Day 4 = nie „więcej kodu”, tylko lepszy kod.
Dzisiejsza pętla:
1) ustalamy kryteria jakości,
2) generujemy / poprawiamy testy,
3) robimy review diffu,
4) sprawdzamy security,
5) poprawiamy tylko to, co trzeba.
```

### Ćwiczenie
- Core: uczestnicy wskazują, co w ich projektach najczęściej psuje się po pierwszej „udanej” iteracji z AI.
- Stretch: dopisują jedną rzecz, którą chcieliby mieć jako obowiązkowy punkt review w swoim zespole.

### Feedback loop
Szybka runda na czacie lub głosowo. Trener grupuje odpowiedzi w 3 koszyki: jakość, bezpieczeństwo, kontrola zakresu. To staje się wspólną checklistą dnia.

### Szacowany czas
20 minut

### Czego się nauczymy
- Jak przejść z „działa” do „działa i można to utrzymać”.
- Jak myśleć o jakości jako części workflowu z agentem.

### Dlaczego warto
Najdroższy kod to nie ten, którego nie ma. Najdroższy jest ten, który „działał na demo”, a potem tydzień później trzeba go rozkopywać na produkcji. Day 4 uczy, jak tego uniknąć.

### Kahneman cues
- S1: szybkie wychwycenie intuicyjnych miejsc ryzyka.
- S2: świadome zamienienie intuicji w konkretną checklistę review.

---

## 09:20–10:05 — Testy z AI: od kryteriów akceptacji do sensownych test cases

### Co mówię
"Z testami AI ma dwie supermoce i jedną wadę. Supermoce: szybko produkuje dużo wariantów i nie nudzi się przy edge-case’ach. Wada: potrafi wygenerować testy, które wyglądają profesjonalnie, a realnie sprawdzają tyle, co parasol na dnie basenu. Dlatego zaczynamy od kryteriów akceptacji, nie od samego kodu testów."

"Dziś pokazujemy prosty wzorzec: najpierw opis zachowania, potem testy. Nie odwrotnie. W środowisku bankowym szczególnie ważne są scenariusze błędu, walidacja danych, autoryzacja i logika wyjątków. Agent ma pomóc pisać testy, ale to my decydujemy, co jest ważne biznesowo i ryzykowne technicznie."

### Co pokazuję
- Jak z istniejącego slice’a wyciągnąć 4–6 kryteriów akceptacji.
- Różnicę między:
  - testem powierzchownym,
  - testem zachowania,
  - testem chroniącym przed realną regresją.
- Przykład promptu do agenta: „wygeneruj testy dla konkretnego zachowania, nie zmieniając produkcyjnego kodu bez wyraźnej potrzeby”.

### Co wklejam na chat
```text
Zanim poprosisz AI o testy, zapisz:
- co ma działać,
- jaki jest warunek błędu,
- jaki przypadek graniczny najbardziej boli,
- po czym poznasz, że test faktycznie chroni przed regresją.
```

### Ćwiczenie
- Core: uczestnicy rozpisują 3 kryteria akceptacji i 2 edge-case’y dla jednego slice’a z Day 3.
- Stretch: dopisują, który test warto odpalić jako pierwszy w CI, jeśli czasu i zasobów jest mało.

### Feedback loop
2–3 osoby pokazują swoje kryteria. Trener dopina wersję referencyjną i razem oceniamy, czy kryteria są mierzalne i czy rzeczywiście chronią najważniejsze zachowania.

### Szacowany czas
45 minut

### Czego się nauczymy
- Jak używać AI do testów bez produkowania pustego ceremoniału.
- Jak przełożyć zachowanie biznesowe na sensowne test cases.

### Dlaczego warto
Dobre testy oszczędzają czas dopiero wtedy, gdy są osadzone w ryzyku i logice produktu. AI przyspiesza ich pisanie, ale jakość bierze się z dobrego framingu.

### Kahneman cues
- S1: szybkie proponowanie przypadków pozytywnych i negatywnych.
- S2: selekcja testów, które naprawdę mają wartość ochronną.

---

## 10:05–11:00 — Review wygenerowanego kodu: diff, ryzyka, feedback do agenta

### Co mówię
"Największy błąd przy pracy z agentem to nie to, że model coś źle wymyślił. Największy błąd to przestać czytać diff. Gdy AI zaczyna działać szybko, rośnie pokusa: ‘wygląda sensownie, to lecimy dalej’. I wtedy pojawia się ten klasyczny moment: wszystko było świetnie, dopóki nie zajrzał ktoś trzeci."

"Dobre review przy AI nie polega na czytaniu każdej linijki jak kodeksu Hammurabiego. Chodzi o kilka pytań: czy zakres jest zgodny z zadaniem, czy nie ma bocznych zmian, czy nazwy i kontrakty są spójne, czy nie wprowadziliśmy ukrytego długu, czy commit da się obronić. A jeśli nie — karmimy agenta precyzyjnym feedbackiem, zamiast pisać obrażony esej do monitora."

### Co pokazuję
- Jak czytać diff warstwami:
  - zakres zmian,
  - logika biznesowa,
  - nazewnictwo i spójność,
  - przypadkowe side effects,
  - rzeczy do cofnięcia.
- Jak pisać feedback do agenta:
  - co jest ok,
  - co jest niezgodne,
  - czego nie ruszać w poprawce,
  - po czym poznamy, że poprawka jest dobra.
- Przykład małej iteracji „redo tylko tej części”.

### Co wklejam na chat
```text
Checklist review diffu:
1) Czy zakres zmian zgadza się z zadaniem?
2) Czy agent nie ruszył rzeczy „przy okazji”?
3) Czy nazwy / kontrakty / błędy są spójne?
4) Czy commit da się wyjaśnić jednym zdaniem?
5) Jaki feedback dam agentowi w następnej iteracji?
```

### Ćwiczenie
- Core: uczestnicy dostają przykładowy diff i oznaczają 3 rzeczy do akceptacji i 3 rzeczy do poprawy.
- Stretch: piszą gotowy feedback do agenta tak, by zawęzić poprawkę do konkretnego obszaru.

### Feedback loop
Trener zbiera przykłady „zbyt miękkiego” i „dobrego” feedbacku. Wspólnie poprawiamy komunikat do wersji, którą można od razu wkleić agentowi.

### Szacowany czas
55 minut

### Czego się nauczymy
- Jak robić szybkie, ale sensowne review wygenerowanego kodu.
- Jak sterować kolejną iteracją bez utraty kontroli nad zakresem.

### Dlaczego warto
Największa oszczędność czasu nie bierze się z tego, że agent wygeneruje 500 linii. Bierze się z tego, że umiesz powiedzieć: „ten kawałek zostaje, ten poprawiamy, tego nie ruszaj”.

### Kahneman cues
- S1: szybkie wykrywanie podejrzanych miejsc w diffie.
- S2: świadome formułowanie feedbacku ograniczającego chaos i scope creep.

---

## 11:00–11:15 — Przerwa

---

## 11:15–12:05 — Security i audyt: jak nie zachwycić się kodem, który właśnie otworzył wszystkie drzwi

### Co mówię
"To jest ten fragment, w którym przypominamy sobie, że ‘działa’ i ‘jest bezpieczne’ to nie synonimy. AI bardzo chętnie pomoże nam napisać endpoint, który pięknie przyjmuje dane, zapisuje je do bazy i jeszcze szeroko otwiera okno na SQL injection, zbyt szerokie uprawnienia albo wyciek danych do logów. Z energią godną juniora po trzech energetykach."

"Dlatego security nie pokazujemy jako osobny świat dla pentesterów. Pokazujemy je jako codzienny nawyk zespołu: pytamy o walidację wejścia, autoryzację, sekrety, logowanie danych wrażliwych, zależności, prompt injection w częściach AI i bezpieczne użycie narzędzi. W realiach NBP szczególnie ważne są ślady audytowe, minimalizacja danych i jawne granice uprawnień."

### Co pokazuję
- Prosty security checklist dla wygenerowanego slice’a:
  - input validation,
  - auth / authz,
  - sekrety i konfiguracja,
  - logi i dane wrażliwe,
  - zależności i ich aktualność,
  - prompt/data boundary przy komponentach AI.
- Jak AI może pomóc w security review, ale nie zastępuje finalnej decyzji człowieka.
- Jak odróżniać „pytanie do security” od „blokera na teraz”.

### Co wklejam na chat
```text
Security mini-check przed commitem:
- Czy walidujemy input?
- Czy nie logujemy danych wrażliwych?
- Czy zakres uprawnień nie jest zbyt szeroki?
- Czy sekretów nie ma w kodzie / promptach / repo?
- Czy agent nie dostał polecenia, które zwiększa ryzyko bez kontroli?
```

### Ćwiczenie
- Core: uczestnicy robią szybki audit jednego fragmentu rozwiązania i wskazują 3 najważniejsze ryzyka.
- Stretch: dopisują jedno pytanie, które zadaliby zespołowi security lub architektowi przed wdrożeniem.

### Feedback loop
Trener porównuje odpowiedzi i odróżnia rzeczy krytyczne od „dobrze byłoby dopracować później”. Powstaje praktyczna lista: co poprawiamy dziś, co trafia do backlogu ryzyk.

### Szacowany czas
50 minut

### Czego się nauczymy
- Jak robić prosty, powtarzalny security review przy pracy z agentami.
- Jak łączyć szybkość AI z enterprise’ową ostrożnością.

### Dlaczego warto
Wiele zespołów boi się AI nie dlatego, że modele są słabe, tylko dlatego, że proces jest nieprzezroczysty. Gdy security review staje się nawykiem, zaufanie rośnie.

### Kahneman cues
- S1: szybkie wychwycenie „czerwonych flag”.
- S2: uporządkowanie ryzyk według wpływu i pilności.

---

## 12:05–13:00 — Legacy code z agentem: od strachu do kontrolowanej refaktoryzacji

### Co mówię
"Legacy to nie jest kod stary. Legacy to kod, którego boimy się ruszyć. A skoro się boimy, to kuszące staje się marzenie: może AI nam to wszystko magicznie uporządkuje. Niestety, jeśli wrzucimy agentowi zbyt duży i zbyt mętny problem, dostaniemy nowoczesny bałagan w nowym opakowaniu."

"Dlatego pokazujemy wzorzec pracy z legacy: najpierw zrozumienie fragmentu, potem mikro-zmiana, potem test/regresja, potem kolejny krok. AI jest świetne do czytania, streszczania, proponowania strategii migracji i szkicowania testów ochronnych. Ale tempo dyktuje człowiek. W legacy wygrywa metodyczność, nie brawura."

### Co pokazuję
- Przykład pracy na małym fragmencie legacy:
  - opis odpowiedzialności modułu,
  - identyfikacja zależności i ryzyk,
  - minimalny refactor,
  - test/regresja po zmianie.
- Jak poprosić agenta o mapę kodu i bezpieczny plan zmian zamiast „przepisz wszystko”.
- Jak oznaczać rzeczy do późniejszej migracji, by nie rozlać zakresu.

### Co wklejam na chat
```text
Legacy workflow z AI:
1) poproś o streszczenie odpowiedzialności modułu,
2) wskaż ryzykowne zależności,
3) wybierz mikro-zmianę,
4) zabezpiecz ją testem lub scenariuszem regresji,
5) dopiero wtedy rób kolejną iterację.
```

### Ćwiczenie
- Core: uczestnicy opisują plan modernizacji jednego małego fragmentu legacy w 3 krokach.
- Stretch: dopisują, jakie informacje muszą trafić do commit message albo ADR, żeby zmiana była audytowalna.

### Feedback loop
Trener wybiera jeden plan zbyt szeroki i jeden sensownie ograniczony. Grupa porównuje, który da się realnie zrobić w zespole bez paraliżu.

### Szacowany czas
55 minut

### Czego się nauczymy
- Jak rozkładać pracę z legacy na bezpieczne, małe kroki.
- Jak używać AI do zrozumienia i modernizacji, nie do hazardu refaktoryzacyjnego.

### Dlaczego warto
W większości firm największy zwrot z AI nie pojawi się przy greenfieldzie, tylko przy mozolnym porządkowaniu istniejących systemów. To tam zysk bywa naprawdę namacalny.

### Kahneman cues
- S1: szybkie intuicje, które miejsca legacy wyglądają najgroźniej.
- S2: wybór jednej mikro-zmiany zamiast szerokiej „rewolucji”.

---

## 13:00–13:30 — Przerwa obiadowa

---

## 13:30–14:20 — CI/CD i automatyzacja: cloud-max vs on-prem bez bajek dla zarządu

### Co mówię
"Po jakości lokalnej przychodzi pytanie: jak to przenieść do procesu zespołowego? I tu często pojawia się magia slajdów: na konferencji wszystko samo się buduje, samo testuje, samo reviewuje, a na końcu jeszcze samo odpowiada za incydenty. My pokażemy to uczciwie: co dziś da się zrobić łatwo w cloud, a co wymaga więcej pracy w środowisku on-prem."

"Wersja cloud-max daje szybkość: łatwe integracje, bogatsze modele, prostszy start. Wersja enterprise/on-prem daje większą kontrolę nad danymi, politykami i środowiskiem, ale zwykle wymaga więcej scaffolding’u. Ważne jest to, że sam workflow pozostaje podobny: mały task, jasny prompt, walidacja wyniku, approvals, testy i ślad audytowy. Zmieniają się narzędzia i ograniczenia, nie zasada myślenia."

### Co pokazuję
- Uproszczone porównanie dwóch światów:
  - cloud-max: GitHub + CLI agent + CI w chmurze,
  - on-prem: GitHub Enterprise/Jenkins/lokalne modele lub custom endpointy.
- Gdzie w pipeline dodać:
  - testy,
  - review/approval,
  - security gates,
  - artefakty audytowe.
- Krótką uczciwą narrację: co jest łatwe dziś, co trzeba dopracować w organizacji.

### Co wklejam na chat
```text
Cloud vs on-prem:
- Cloud = szybszy start i bogatszy ekosystem.
- On-prem = większa kontrola nad danymi i politykami.
- W obu światach potrzebujesz tego samego rdzenia procesu:
  prompt → diff → test → review → approval → commit / deploy.
```

### Ćwiczenie
- Core: uczestnicy rysują prosty pipeline jakości dla swojego kontekstu (cloud albo on-prem).
- Stretch: dopisują, które kroki muszą mieć manual approval w realiach bankowych.

### Feedback loop
Trener zestawia 2–3 pipeline’y i wskazuje wspólny rdzeń oraz elementy zależne od polityk organizacji. Powstaje zwięzły model referencyjny do użycia po kursie.

### Szacowany czas
50 minut

### Czego się nauczymy
- Jak rozmawiać o agentach i automatyzacji bez przesady i bez halucynacji procesowych.
- Jak przełożyć lokalne nawyki pracy na pipeline zespołowy.

### Dlaczego warto
Największa blokada wdrożenia AI w firmach rzadko jest techniczna. Zwykle chodzi o zaufanie, governance i odpowiedzialność. Ten blok daje język do takich rozmów.

### Kahneman cues
- S1: szybkie myślenie o „idealnym” pipeline.
- S2: świadome dopasowanie pipeline’u do ograniczeń compliance i środowiska.

---

## 14:20–14:30 — Krótkie porównanie: kiedy warto wspomnieć Claude Code lub IntelliJ AI Assistant

### Co mówię
"Główny workflow kursu pozostaje Codex-first. Ale warto uczciwie pokazać, że rynek nie kończy się na jednym narzędziu. Claude Code bywa mocny w analizie i iteracjach tekstowo-kodowych, IntelliJ AI Assistant dobrze wpisuje się w środowiska JetBrains. Tylko nie robimy z tego festiwalu zakładek i benchmarków."

"Nasza zasada jest prosta: najpierw jeden stabilny workflow, potem krótkie porównania. Uczestnicy mają wyjść z nawykiem pracy, nie z kolekcją logo w notatkach. Jeśli ktoś pracuje na co dzień w IntelliJ albo z polityką narzędziową organizacji, to ma dostać most, nie nowy chaos."

### Co pokazuję
- 3–5 minutowe porównanie:
  - gdzie Codex jest dziś osią kursu,
  - gdzie Claude Code można pokazać jako krótką alternatywę,
  - gdzie IntelliJ AI Assistant jest naturalnym pomostem dla zespołów JetBrains.
- Jasny komunikat: workflow ważniejszy niż marka narzędzia.

### Co wklejam na chat
```text
Porównania narzędzi robimy krótko i praktycznie:
- Codex = główna ścieżka kursu,
- Claude Code = krótki punkt odniesienia,
- IntelliJ AI Assistant = pomost dla środowisk JetBrains.
Najpierw workflow. Potem narzędzia.
```

### Ćwiczenie
- Core: uczestnicy wskazują, które elementy workflow są przenaszalne między narzędziami.
- Stretch: dopisują jedną politykę zespołową, która byłaby ważniejsza niż wybór konkretnego narzędzia.

### Feedback loop
Trener zamyka blok jednym zdaniem referencyjnym: „narzędzia się zmieniają, ale dobra pętla pracy zostaje”.

### Szacowany czas
10 minut

### Czego się nauczymy
- Jak rozsądnie porównywać narzędzia bez rozbijania głównej ścieżki szkolenia.
- Jak oddzielić workflow od vendor lock-in w myśleniu o AI.

### Dlaczego warto
To zmniejsza lęk przed zmianą narzędzi i ułatwia adaptację do polityk firmy.

### Kahneman cues
- S1: szybkie skojarzenia „które narzędzie jest lepsze”.
- S2: cofnięcie się do pytania, jaki workflow chcemy utrwalić niezależnie od narzędzia.

---

## 14:30–14:40 — Opcjonalna krótka przerwa

---

## 14:40–15:25 — Warsztat naprawczy: poprawki po testach, review i security findings

### Co mówię
"To jest najważniejszy moment dnia, bo tutaj pokazujemy dojrzałość procesu. Nie chodzi o to, żeby każda pierwsza odpowiedź agenta była idealna. Chodzi o to, żeby po testach, review i security checku umieć wykonać jedną, dwie sensowne iteracje naprawcze bez rozsadzania całego rozwiązania."

"W praktyce wiele zespołów wygrywa nie tym, że generuje kod szybciej, ale tym, że poprawia go mądrzej. Dlatego ćwiczymy zawężanie poprawek: napraw tylko walidację, nie zmieniaj kontraktu; dodaj test regresji, nie przebudowuj modułu; popraw nazwy i obsługę błędu, nie ruszaj warstwy danych. To jest ta dyscyplina, która robi ogromną różnicę."

### Co pokazuję
- Jak na podstawie findings przygotować krótki prompt naprawczy.
- Jak odróżnić:
  - poprawkę lokalną,
  - poprawkę systemową,
  - temat do backlogu technicznego.
- Jak sprawdzić, czy poprawka nie zepsuła innych obszarów.

### Co wklejam na chat
```text
Szablon poprawki do agenta:
- Problem: co dokładnie wykryliśmy?
- Zakres: co wolno poprawić?
- Zakaz: czego NIE zmieniamy w tej iteracji?
- Weryfikacja: jaki test / check ma przejść po poprawce?
```

### Ćwiczenie
- Core: uczestnicy piszą prompt naprawczy dla jednego konkretnego findingu.
- Stretch: dopisują, jaki commit message najlepiej opisze tę poprawkę po wdrożeniu.

### Feedback loop
Trener wybiera jedną odpowiedź zbyt szeroką i jedną dobrze zawężoną. Grupa porównuje, która wersja daje większą przewidywalność i mniejsze ryzyko regresji.

### Szacowany czas
45 minut

### Czego się nauczymy
- Jak robić krótkie, skuteczne iteracje naprawcze z agentem.
- Jak połączyć findings z konkretną akcją i weryfikacją.

### Dlaczego warto
Właśnie tutaj AI zaczyna dawać realne oszczędności zespołowe: szybkie poprawki, mniej chaosu i czytelniejsza odpowiedzialność za zmianę.

### Kahneman cues
- S1: szybka potrzeba „naprawmy wszystko od razu”.
- S2: świadome zawężenie poprawki do minimalnego bezpiecznego zakresu.

---

## 15:25–16:00 — Podsumowanie jakościowe i handoff do Day 5 demo

### Co mówię
"Dziś przeszliśmy drogę od ‘mamy działający slice’ do ‘mamy proces, który daje zaufanie’. To jest ogromna różnica. W praktyce firmy nie wdrażają AI dlatego, że ktoś zrobił imponujące demo. Wdrażają je wtedy, gdy zespół potrafi pokazać kontrolę: testy, review, bezpieczeństwo, ślad decyzji i sensowny plan wdrożeniowy."

"Jutro domkniemy całość: pokażemy gotowe demo, opowiemy decyzje techniczne tak, by były zrozumiałe dla różnych odbiorców, i zbudujemy plan przeniesienia tych praktyk do pracy po szkoleniu. Czyli kończymy nie hasłem ‘AI jest super’, tylko konkretnym ‘wiemy, jak tego używać od poniedziałku’."

### Co pokazuję
- Tabelę podsumowującą, co dziś doszło do procesu:
  - testy,
  - review,
  - security,
  - legacy strategy,
  - CI/CD framing.
- Handoff do Day 5:
  - demo końcowe,
  - komunikacja decyzji,
  - plan wdrożenia po kursie.

### Co wklejam na chat
```text
Po Day 4 mamy nie tylko „działający kod”, ale proces:
- testowalny,
- reviewowalny,
- bardziej bezpieczny,
- gotowy do pokazania zespołowi i do dalszego wdrażania.
Jutro: demo + decyzje techniczne + plan „co dalej po szkoleniu”.
```

### Ćwiczenie
- Core: każdy uczestnik zapisuje 1 nawyk jakościowy, który chce zabrać do pracy od razu po szkoleniu.
- Stretch: dopisać, jaki argument przekonałby ich zespół lub przełożonego do takiej zmiany.

### Feedback loop
Krótka runda końcowa. Trener zbiera 3–5 przykładów i wzmacnia pozytywnie konkretne, wykonalne nawyki zamiast ogólnych deklaracji.

### Szacowany czas
35 minut

### Czego się nauczymy
- Jak zamykać dzień z jasnym zbiorem praktyk, a nie tylko listą tematów.
- Jak przygotować grunt pod końcowe demo i wdrożenie nawyków po kursie.

### Dlaczego warto
Bez świadomego domknięcia uczestnicy pamiętają zwykle tylko pojedyncze narzędzia. Z domknięciem pamiętają proces i potrafią go odtworzyć w pracy.

### Kahneman cues
- S1: szybkie wskazanie, co „najbardziej siadło”.
- S2: zamiana inspiracji w konkretny nawyk do wdrożenia.

---

## Checklist trenera po Day 4
- Czy grupa rozumie różnicę między testami „ładnymi” a ochronnymi?
- Czy był pokazany workflow review diffu i precyzyjnego feedbacku do agenta?
- Czy security zostało omówione jako codzienny nawyk, nie tylko osobny dział?
- Czy legacy było pokazane jako seria małych kroków, a nie jednorazowy refactor-boom?
- Czy padło uczciwe porównanie cloud-max vs on-prem bez technoshow?
- Czy przejście do Day 5 jest jasne: demo, komunikacja decyzji, plan wdrożenia po szkoleniu?
