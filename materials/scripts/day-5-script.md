# Day 5 Script — Demo końcowe, wdrożenie w zespole, plan „co dalej”

## Outcome dnia
Po Day 5 uczestnicy mają:
- domknięty obraz pełnego workflowu: od pomysłu, przez implementację i jakość, do prezentacji rozwiązania,
- przećwiczony sposób opowiadania o decyzjach technicznych, ryzykach i kompromisach przy pracy z AI,
- jasną mapę: co jest „max możliwości” w cloud, a co da się wdrożyć w realiach on-prem / local models,
- praktyczny plan pierwszych 30 dni po szkoleniu: narzędzia, zasady, małe pilotaże, metryki i guardraile,
- motywujące zakończenie kursu bez efektu „fajnie było, ale co teraz?”.

## Linki dnia / mapa zależności
- Prompty dla Day 5: `prompts/02-module-prompts.md#day-5--utrwalenie-on-prem-adaptacja-plan-30-dni`
  - D5-M1 Finalny audit: `prompts/02-module-prompts.md#d5-m1-finalny-audit-rozwiązania-końcowego`
  - D5-M2 Adaptacja cloud→on-prem: `prompts/02-module-prompts.md#d5-m2-adaptacja-cloud--on-prem`
  - D5-M3 Plan 30 dni: `prompts/02-module-prompts.md#d5-m3-plan-30-dni-po-szkoleniu`
- Ćwiczenia Day 5: `exercises/03-exercises.md#day-5--demo-audyt-końcowy-plan-wdrożenia`
  - D5-E1 Final demo: `exercises/03-exercises.md#d5-e1--final-demo--decyzje-techniczne`
  - D5-E2 Security audit końcowy: `exercises/03-exercises.md#d5-e2--security-audit-końcowego-rozwiązania`
  - D5-E3 Plan 30 dni: `exercises/03-exercises.md#d5-e3--plan-wdrożenia-po-kursie-30-dni`
- Scenariusz demo na dziś: `materials/04-demo-scenarios.md#scenariusz-c--architekttech-lead-governance-cicd-i-ryzyko`
- Failure scenario na dziś: `materials/04-demo-scenarios.md#f3--testy-przechodzą-ale-wymaganie-biznesowe-niespełnione`
- Opcjonalny most mobile (10–15 min): `materials/research/mobile-extension-micro-support.md`
- Dzień poprzedni: `materials/scripts/day-4-script.md`
- Indeks materiałów (do dodania w późniejszym TODO): `materials/12-materials-index.md`

## Agenda dnia
- 09:00–09:20 — Wejście w Day 5: z „działa” do „umiem to obronić i wdrożyć”
- 09:20–10:05 — Finałowe demo rozwiązania: narracja, nie tylko ekran
- 10:05–11:00 — Decyzje techniczne i kompromisy: jak mówić o nich jasno i spokojnie
- 11:00–11:15 — Przerwa
- 11:15–12:05 — Cloud-max vs on-prem/local models: dwa światy, jedna metodyka
- 12:05–13:00 — Agentic workflows i MCP: co warto wdrożyć, a czego dziś nie komplikować
- 13:00–13:30 — Przerwa obiadowa
- 13:30–14:20 — Plan wdrożenia po szkoleniu: pierwsze 30 dni w zespole
- 14:20–14:30 — Krótkie porównanie: gdzie jeszcze mieszczą się Claude Code i IntelliJ AI Assistant
- 14:30–14:40 — Opcjonalna krótka przerwa
- 14:40–15:25 — Warsztat końcowy: mini-playbook dla własnego środowiska uczestnika
- 15:25–16:00 — Zamknięcie kursu: podsumowanie, pytania, „co dalej” i pozytywne domknięcie

---

## 09:00–09:20 — Wejście w Day 5: z „działa” do „umiem to obronić i wdrożyć”

### Co mówię
"Wczoraj dopięliśmy jakość, review, bezpieczeństwo i legacy. Dziś nie robimy już wyścigu na kolejne ficzery. Day 5 jest o czymś dużo bardziej praktycznym: jak pokazać efekt, jak opowiedzieć decyzje techniczne i jak wrócić po szkoleniu do pracy z planem, zamiast z pięknym chaosem."

"W wielu firmach problem nie polega na tym, że AI nie umie pomóc. Problem polega na tym, że zespół nie umie jeszcze uzgodnić, gdzie AI pomaga bezpiecznie, gdzie trzeba approvala, a gdzie lepiej zwolnić. Dzisiaj domykamy właśnie ten most: od demo do realnego wdrożenia. Czyli mniej magii, więcej sterowności. Taki finał godny ludzi, którzy lubią mieć i szybkość, i dowody."

### Co pokazuję
- Krótką mapę całego tygodnia: Day 1 fundamenty → Day 2 architektura → Day 3 budowa → Day 4 jakość → Day 5 wdrożenie i komunikacja.
- Cele dnia:
  - umieć zaprezentować rozwiązanie,
  - umieć obronić decyzje techniczne,
  - umieć zaplanować pierwszy mały rollout AI w pracy.
- Różnicę między „demo technologii” a „demo wartości biznesowej”.

### Co wklejam na chat
```text
Day 5 = nie dokładamy chaosu.
Domykamy 3 rzeczy:
1) umiem pokazać rozwiązanie,
2) umiem wyjaśnić decyzje i ryzyka,
3) wiem, co wdrożyć w zespole od jutra w małej skali.
```

### Ćwiczenie
- Core: uczestnicy zapisują jedną rzecz z tygodnia, którą już widzą jako użyteczną u siebie w pracy.
- Stretch: dopisują jedną obawę, która nadal ich hamuje przed szerszym użyciem AI.

### Feedback loop
Trener grupuje odpowiedzi w 3 koszyki: produktywność, jakość, ryzyko. Te trzy koszyki wrócą później w planie 30-dniowym.

### Szacowany czas
20 minut

### Czego się nauczymy
- Jak zamknąć projekt szkoleniowy w sposób użyteczny zawodowo.
- Jak przejść od „fajnego warsztatu” do planu działania.

### Dlaczego warto
Najlepsze szkolenie to nie takie, po którym uczestnik mówi „było inspirująco”, tylko takie, po którym wraca do pracy i wie, co zrobić w poniedziałek rano.

### Kahneman cues
- S1: szybkie przypomnienie najważniejszych momentów tygodnia.
- S2: świadome ustawienie końcowego celu: wdrożenie, nie tylko entuzjazm.

---

## 09:20–10:05 — Finałowe demo rozwiązania: narracja, nie tylko ekran

### Co mówię
"Dobre demo nie polega na tym, że klikamy szybko i modlimy się, żeby nic się nie wysypało. Dobre demo ma narrację: jaki problem rozwiązujemy, dla kogo, co działa, jakie decyzje podjęliśmy i czego świadomie jeszcze nie robimy. AI może pomóc zbudować demo szybciej, ale to człowiek nadaje mu sens."

"W środowisku bankowym, enterprise’owym albo po prostu odpowiedzialnym technicznie samo ‘patrzcie, działa’ nie wystarcza. Trzeba jeszcze umieć powiedzieć: jakie były ograniczenia, co sprawdziliśmy, jak pilnujemy ryzyka i jak to rozwinąć później. Demo bez narracji jest jak commit bez message — niby coś jest, ale wszyscy patrzą podejrzliwie."

### Co pokazuję
- Referencyjny schemat demo końcowego:
  1. problem i użytkownik,
  2. główny przepływ end-to-end,
  3. jedno miejsce, gdzie AI realnie przyspieszyło,
  4. jedno miejsce, gdzie człowiek musiał przejąć stery,
  5. ryzyka i następne kroki.
- Jak mówić prostym językiem o architekturze i decyzjach bez technicznego dymu zasłonowego.
- Jak przygotować „plan B” w demo, gdy coś przestanie działać.

### Co wklejam na chat
```text
Struktura demo końcowego:
1) problem,
2) użytkownik i scenariusz,
3) pokaz przepływu,
4) co zrobił agent, a co sprawdził człowiek,
5) ryzyka i następny krok.
```

### Ćwiczenie
- Core: uczestnicy układają 5-zdaniową narrację do demo swojego rozwiązania.
- Obowiązkowy checkpoint (final app audit): przed demo przypinają status bramki bezpieczeństwa `GO / GO WITH CONDITIONS / NO-GO` i 3 najważniejsze ryzyka.
- Stretch: dopisują wersję „dla managera / architekta / security”, zmieniając akcenty, ale nie gubiąc sensu.

### Feedback loop
2–3 osoby prezentują mini-demo bez ekranu, tylko słownie. Trener poprawia kolejność, język i poziom konkretu.

### Szacowany czas
45 minut

### Czego się nauczymy
- Jak prowadzić demo rozwiązania stworzonego z pomocą AI.
- Jak pokazać wartość bez ukrywania kompromisów.

### Dlaczego warto
W realnym świecie decyzje zapadają nie tylko na podstawie kodu, ale też na podstawie tego, czy potrafisz spokojnie wyjaśnić, co zrobiliście i dlaczego temu ufać.

### Kahneman cues
- S1: naturalna, szybka opowieść o tym, „co tu się dzieje”.
- S2: uporządkowanie demo tak, by było obronione merytorycznie.

---

## 10:05–11:00 — Decyzje techniczne i kompromisy: jak mówić o nich jasno i spokojnie

### Co mówię
"Na kursie łatwo wpaść w pułapkę: skoro coś dało się zbudować szybko, to znaczy, że nie było trudnych decyzji. Były. Po prostu część z nich podjęliśmy świadomie, a część świadomie odłożyliśmy. I to jest bardzo ważna kompetencja: umieć powiedzieć nie tylko ‘co zrobiliśmy’, ale też ‘czego nie zrobiliśmy jeszcze i dlaczego’."

"Dziś ćwiczymy język kompromisów. Na przykład: wybraliśmy prostszy frontend w React, bo trener ma do niego gotowe assety i dzięki temu kurs nie zamienia się w warsztat z frameworków. Albo: pokazujemy cloud-max, ale zawsze dokładamy notkę, jak przełożyć to na on-prem. Dojrzałość techniczna to nie perfekcyjność. To umiejętność nazywania granic."

### Co pokazuję
- Matrycę decyzji:
  - szybkość vs kontrola,
  - prostota vs elastyczność,
  - cloud convenience vs on-prem compliance,
  - demo value vs produkcyjna gotowość.
- Przykładowe sformułowania, które są jasne i nie brzmią defensywnie.
- Jak z tygodnia wyciągnąć 3–5 najważniejszych decyzji architektonicznych do opowiedzenia.

### Co wklejam na chat
```text
Dobra decyzja techniczna w demo brzmi tak:
- wybraliśmy X, bo zależało nam na Y,
- nie robimy jeszcze Z, bo zwiększałoby to złożoność / ryzyko,
- jeśli projekt pójdzie dalej, następnym krokiem będzie A.
```

### Ćwiczenie
- Core: uczestnicy wybierają 3 decyzje z projektu i zapisują dla każdej: wybór, powód, koszt uboczny.
- Stretch: dopisują, jak opowiedzieliby tę samą decyzję osobie nietechnicznej.

### Feedback loop
Trener zbiera przykłady i dopracowuje je do wersji krótkiej, konkretnej i „do powiedzenia na spotkaniu”.

### Szacowany czas
55 minut

### Czego się nauczymy
- Jak komunikować kompromisy bez chaosu i bez przesadnej obronności.
- Jak zamieniać decyzje techniczne w zrozumiałe argumenty.

### Dlaczego warto
Zespoły szybciej akceptują użycie AI, gdy widzą nie tylko rezultat, ale też dojrzałość w opisie ryzyk i ograniczeń.

### Kahneman cues
- S1: intuicyjne wskazanie najważniejszych decyzji.
- S2: świadome zamienienie intuicji w argumentację, którą da się obronić.

---

## 11:00–11:15 — Przerwa

---

## 11:15–12:05 — Cloud-max vs on-prem/local models: dwa światy, jedna metodyka

### Co mówię
"To jest jeden z najważniejszych fragmentów całego kursu. Chcemy uczciwie pokazać dwa światy. Pierwszy: ‘max możliwości’ — chmura, wygodne logowanie, szybkie modele, integracje, często najlepsze UX. Drugi: ‘realia organizacji’ — on-prem, lokalne modele, proxy, własne endpointy, approvale, compliance, mniejsza wygoda, ale większa kontrola."

"Kluczowy przekaz brzmi: metodyka pozostaje podobna. Nadal mamy małe slice’y, nadal potrzebujemy dobrego kontekstu, nadal czytamy diffy, nadal testujemy i dokumentujemy decyzje. Zmieniają się narzędzia, koszty, czas i ograniczenia. Nie chcemy budować w głowach fałszywego podziału: ‘cloud jest nowoczesny, on-prem jest smutny’. Chcemy pokazać: oba światy da się prowadzić sensownie, tylko trzeba inaczej ustawić tor jazdy."

### Co pokazuję
- Tabelę porównawczą:
  - modele cloud vs local,
  - wygoda vs kontrola,
  - koszty zmienne vs koszty infrastrukturalne,
  - łatwość startu vs trudność utrzymania.
- Przykłady adaptacji:
  - prompt workflow pozostaje ten sam,
  - approvale i sandboxing pozostają ważne,
  - zmienia się sposób podłączenia modeli i narzędzi.
- Krótkie przykłady CI/CD i governance:
  - cloud demo z GitHub/Codex,
  - on-prem wariant z Jenkins/GitHub Enterprise/local endpoint.

### Co wklejam na chat
```text
Cloud-max i on-prem to nie dwa różne zawody.
To ta sama metodyka w innych ograniczeniach:
- małe zadania,
- dobry kontekst,
- diff + test + review,
- jawne approvale,
- świadome koszty i ryzyka.
```

### Ćwiczenie
- Core: uczestnicy dopasowują 3 elementy z cloud workflow do swojego realnego środowiska on-prem / enterprise.
- Stretch: wskazują, co byłoby u nich najtrudniejsze: modele, polityki bezpieczeństwa, integracja, koszty czy kultura zespołu.

### Feedback loop
Trener zbiera odpowiedzi i układa wspólną mapę: „co przenosimy 1:1”, „co wymaga adaptacji”, „co na razie zostawiamy poza zakresem”.

### Szacowany czas
50 minut

### Czego się nauczymy
- Jak uczciwie porównywać cloud i on-prem bez uproszczeń.
- Jak zachować workflow AI mimo różnych ograniczeń organizacyjnych.

### Dlaczego warto
Wiele szkoleń pokazuje tylko idealny świat. Tutaj uczestnik ma zobaczyć, jak wrócić do swojej firmy i nadal mieć z tego realny pożytek.

### Kahneman cues
- S1: szybkie zauważenie różnic i pokus uproszczenia.
- S2: uporządkowanie tego w praktyczny model adaptacji.

---

## 12:05–13:00 — Agentic workflows i MCP: co warto wdrożyć, a czego dziś nie komplikować

### Co mówię
"Na koniec tygodnia naturalnie pojawia się pytanie: skoro agent potrafi robić coraz więcej, to może od razu podłączmy wszystko — repo, Jira, CI, dokumentację, bazy, Slacka, Teamsy i jeszcze ekspres do kawy, żeby miał pełny kontekst. Odpowiedź brzmi: spokojnie. Agentic workflows są potężne, ale warto je wdrażać warstwowo."

"MCP i integracje narzędziowe są świetne wtedy, gdy rozwiązują konkretny ból: wyszukiwanie kodu, dokumentacji, bezpieczny odczyt stanu systemu, automatyczne tworzenie małych artefaktów. Jeśli jednak na start dokładamy za dużo, zespół szybciej zbuduje sobie teatr konfiguracji niż praktyczny workflow. Dziś pokazujemy zasadę: najpierw jedna użyteczna integracja, potem dopiero kolejne."

### Co pokazuję
- Prosty model dojrzałości:
  - poziom 1: chat / research,
  - poziom 2: agent lokalny z edycją plików,
  - poziom 3: agent z narzędziami i jasnymi granicami,
  - poziom 4: automatyzacja w CI/CD i repo.
- Przykładowe wartościowe integracje dla środowiska Java / SQL / enterprise.
- Gdzie kończy się sensowna automatyzacja, a zaczyna się niepotrzebne ryzyko.

### Co wklejam na chat
```text
Zasada na start:
1) wybierz 1 ból,
2) dodaj 1 integrację, która realnie go zmniejsza,
3) ustaw granice i approvale,
4) dopiero potem myśl o kolejnych narzędziach.
```

### Ćwiczenie
- Core: uczestnicy wskazują jedną integrację lub jeden typ narzędzia, który dałby im największą wartość już teraz.
- Stretch: dopisują, jaki guardrail musi istnieć, żeby ta integracja była akceptowalna w ich organizacji.

### Feedback loop
Trener porównuje propozycje i pomaga odróżnić integracje wartościowe od „gadżetowych”.

### Szacowany czas
55 minut

### Czego się nauczymy
- Jak myśleć o agentic workflows etapami.
- Jak nie rozbudować ekosystemu szybciej niż dojrzałość zespołu.

### Dlaczego warto
Najskuteczniejsze wdrożenia AI zwykle zaczynają się od jednego dobrze dobranego przypadku użycia, a nie od wielkiej architektury wszystkiego naraz.

### Kahneman cues
- S1: szybki entuzjazm wobec nowych możliwości.
- S2: świadome ograniczenie scope’u do czegoś, co da się utrzymać.

---

## 13:00–13:30 — Przerwa obiadowa

---

## 13:30–14:20 — Plan wdrożenia po szkoleniu: pierwsze 30 dni w zespole

### Co mówię
"To jest chyba najpraktyczniejszy blok całego tygodnia. Nie chcemy, żeby po szkoleniu zostało pięć notatek, dziesięć screenshotów i jedna szlachetna myśl, że ‘musimy kiedyś wdrożyć AI’. Chcemy planu na 30 dni: mały pilot, jasny zakres, konkretna metryka, konkretne ryzyko, konkretne osoby."

"Najlepszy pierwszy krok to nie ‘zautomatyzujmy wszystko’. Najlepszy pierwszy krok to jeden typ zadania, który jest częsty, mierzalny i umiarkowanie bezpieczny. Na przykład: przygotowanie test cases, analiza diffu, streszczanie legacy modułu, przygotowanie checklisti do review, generowanie szkicu dokumentacji technicznej. Mały sukces buduje zaufanie. A zaufanie jest walutą wdrożeń."

### Co pokazuję
- Szablon planu 30-dniowego:
  - problem do poprawy,
  - jeden workflow AI,
  - właściciel,
  - guardrails,
  - metryka sukcesu,
  - termin przeglądu.
- Przykłady sensownych pierwszych pilotaży w środowisku enterprise.
- Jak mierzyć efekt bez udawania „naukowego laboratorium”: czas, liczba iteracji, jakość review, liczba poprawek, komfort zespołu.

### Co wklejam na chat
```text
Plan 30 dni po szkoleniu:
- 1 proces,
- 1 właściciel,
- 1 metryka sukcesu,
- 1 guardrail,
- 1 termin przeglądu.
Małe wdrożenie > wielka prezentacja bez efektu.
```

### Ćwiczenie
- Core: każdy uczestnik wypełnia mini-plan 30-dniowy dla swojego środowiska.
- Stretch: dopisuje, jak pokaże wynik przełożonemu lub zespołowi po miesiącu.

### Feedback loop
Trener wybiera 2–3 przykłady i pomaga je odchudzić lub doprecyzować, żeby były realne, a nie „piękne na slajdzie”.

### Szacowany czas
50 minut

### Czego się nauczymy
- Jak przełożyć inspirację ze szkolenia na mały, sensowny rollout.
- Jak wybrać use case, który ma szansę przeżyć zderzenie z rzeczywistością.

### Dlaczego warto
Wdrożenia nie umierają dlatego, że brakuje pomysłów. Umierają dlatego, że pierwszy krok jest za duży, zbyt mglisty albo niczyj.

### Kahneman cues
- S1: szybkie generowanie pomysłów na wdrożenie.
- S2: zawężenie pomysłu do czegoś mierzalnego i odpowiedzialnego.

---

## 14:20–14:30 — Krótkie porównanie: gdzie jeszcze mieszczą się Claude Code i IntelliJ AI Assistant

### Co mówię
"Przez cały tydzień trzymaliśmy się ścieżki Codex-first, bo kurs potrzebuje jednego głównego workflowu. To była świadoma decyzja dydaktyczna, nie religia narzędziowa. Warto jednak umieć uczciwie powiedzieć, gdzie mieszczą się inne opcje."

"Claude Code bywa bardzo dobry do rozmowy o planie, refaktoryzacji i iteracjach z mocnym językiem naturalnym. IntelliJ AI Assistant / Junie ma naturalny sens tam, gdzie zespół i tak żyje w IntelliJ i chce bardziej oswojonego wejścia. Ale nie chcemy, żeby uczestnik wyjechał z kursu z sześcioma równoległymi ścieżkami i jedną wielką migreną narzędziową."

### Co pokazuję
- Krótką tabelę porównawczą:
  - Codex: główny workflow CLI + app,
  - Claude Code: alternatywny mocny partner do iteracji i analizy,
  - IntelliJ AI Assistant / Junie: wygodne wejście w środowisku JetBrains.
- Gdzie każde z narzędzi może mieć sens w banku / enterprise.

### Co wklejam na chat
```text
Główny tor kursu: Codex.
Dodatkowe orientacyjne role:
- Claude Code: mocny partner do iteracji i rozmowy o zmianach,
- IntelliJ AI Assistant / Junie: wygodne wejście dla zespołów żyjących w JetBrains.
Najpierw jeden workflow. Potem porównania.
```

### Ćwiczenie
- Core: uczestnicy zapisują, które narzędzie najłatwiej byłoby im wprowadzić u siebie jako pierwszy krok.
- Stretch: dopisują, jakie ograniczenie organizacyjne może o tym zdecydować.

### Feedback loop
Szybkie głosowanie i komentarz trenera: wybór narzędzia powinien zależeć od kontekstu pracy, nie od mody.

### Szacowany czas
10 minut

### Czego się nauczymy
- Jak osadzić inne narzędzia bez rozbijania głównej ścieżki.
- Jak rozmawiać o wyborze narzędzia pragmatycznie.

### Dlaczego warto
Tool sprawl zjada uwagę szybciej niż brak narzędzi. Jeden mocny workflow jest więcej wart niż pięć ledwo rozpoczętych eksperymentów.

### Kahneman cues
- S1: naturalna ciekawość „a co z innymi narzędziami?”.
- S2: uporządkowanie tej ciekawości w praktyczny wybór, a nie kolekcję zabawek.

---

## 14:30–14:40 — Opcjonalna krótka przerwa

---

## 14:40–15:25 — Warsztat końcowy: mini-playbook dla własnego środowiska uczestnika

### Co mówię
"Teraz robimy coś, co bardzo lubię na końcu szkoleń: zamiast zostawiać wszystko w głowie, zamieniamy wiedzę na mały playbook. Nie wielką strategię AI transformacji, tylko praktyczny dokument: jaki typ zadań, jakie narzędzie, jakie zasady, jakie approvale, jaka metryka, jakie ryzyka. Tyle. I aż tyle."

"Jeżeli uczestnik wyjdzie stąd z takim szkicem, to po kursie nie zaczyna od zera. Ma pierwszy artefakt, który może pokazać liderowi, architektowi albo po prostu samemu sobie za tydzień. To jest też bardzo dobra obrona przed entuzjazmem bez wykonania. Nerd humor aside: nawet najlepszy prompt nie zastąpi kalendarza i właściciela zadania."

### Co pokazuję
- Szablon mini-playbooka:
  - kontekst zespołu,
  - pierwszy use case,
  - dozwolone narzędzia,
  - niedozwolone praktyki,
  - approvale / review,
  - metryka,
  - checkpoint za 2 tygodnie.
- 2 przykładowe wersje:
  - zespół Java + Jenkins + on-prem,
  - zespół bardziej cloudowy z GitHubem.
- Opcjonalnie (dla chętnych): 10–15 min "most mobile" na bazie `materials/research/mobile-extension-micro-support.md` (bez pełnej implementacji mobile na zajęciach).

### Co wklejam na chat
```text
Mini-playbook po kursie:
1) gdzie użyję AI?
2) do czego NIE użyję AI bez zgody / review?
3) jakie narzędzie będzie pierwsze?
4) jak sprawdzę, że to działa?
5) kiedy robię przegląd po 2 tygodniach?
```

### Ćwiczenie
- Core: każdy uczestnik tworzy własny mini-playbook na 1 stronę.
- Stretch: dopisuje sekcję „jak wyjaśnię ten plan komuś, kto ma obawy wobec AI”.
- Opcjonalny stretch mobile (tylko jeśli grupa zgłasza potrzebę): opisz 1 flow z kursowej aplikacji w wersji mobile (ekrany + walidacje + stany błędów) wg `materials/research/mobile-extension-micro-support.md`.

### Feedback loop
Trener wybiera kilka fragmentów i pomaga je skrócić do formy, którą rzeczywiście da się wykorzystać po kursie.

### Szacowany czas
45 minut

### Czego się nauczymy
- Jak zamienić tydzień szkolenia na konkretny, własny artefakt wdrożeniowy.
- Jak przygotować prosty zestaw zasad dla pracy z AI.

### Dlaczego warto
Po kursie pamięć bywa selektywna, ale dobry artefakt zostaje. Mini-playbook zwiększa szansę, że wiedza przejdzie w praktykę.

### Kahneman cues
- S1: szybkie spisanie intuicyjnego planu.
- S2: dopracowanie zasad, granic i odpowiedzialności.

---

## 15:25–16:00 — Zamknięcie kursu: podsumowanie, pytania, „co dalej” i pozytywne domknięcie

### Co mówię
"Na początku tygodnia zaczynaliśmy od fundamentów, ostrożności i pytań. Dziś kończymy z działającym workflowem, wspólnym językiem i planem dalszych kroków. To nie znaczy, że od jutra wszystko będzie perfekcyjne. To znaczy, że macie sposób, żeby eksperymentować mądrze, a nie chaotycznie. I to już jest bardzo dużo."

"Chciałbym, żebyście wyszli z tego kursu z poczuciem sprawczości, nie presji. AI nie ma zrobić z Was operatorów losowej magii. Ma pomóc Wam szybciej analizować, budować, sprawdzać i komunikować decyzje. Jeśli po tym tygodniu zrobicie jeden mały, sensowny pilot w zespole — to jest bardzo dobry wynik. A potem krok po kroku dokładacie kolejne elementy."

### Co pokazuję
- Podsumowanie tygodnia w 5 punktach, po jednym na każdy dzień.
- Najważniejsze wzorce, które warto zabrać:
  - małe slice’y,
  - dobry kontekst,
  - diff + test + review,
  - jawne granice i approvale,
  - adaptacja cloud ↔ on-prem.
- Lista „co dalej”:
  - wrócić do mini-playbooka,
  - wybrać pilot,
  - ustawić termin przeglądu efektów,
  - nie zaczynać od pięciu narzędzi naraz.

### Co wklejam na chat
```text
Najważniejsze po kursie:
- zaczynaj od małych, mierzalnych use case’ów,
- trzymaj jeden główny workflow,
- zawsze czytaj diff i testuj,
- nie ukrywaj ryzyk — nazywaj je,
- adaptuj narzędzia do realiów firmy, nie odwrotnie.
Dziękuję za wspólną misję 🤓
```

### Ćwiczenie
- Core: każdy zapisuje swój „pierwszy krok po kursie” w jednym zdaniu.
- Stretch: każdy zapisuje też jedno ryzyko, które będzie świadomie monitorować.

### Feedback loop
Krótka runda końcowa. Trener wzmacnia konkretne, realistyczne deklaracje i dziękuje grupie za współpracę.

### Szacowany czas
35 minut

### Czego się nauczymy
- Jak domknąć naukę w sposób wzmacniający sprawczość.
- Jak zakończyć kurs z planem, a nie tylko z wrażeniem.

### Dlaczego warto
Dobre zakończenie zwiększa szansę, że uczestnicy naprawdę wrócą do materiału i użyją go w pracy. A o to tu chodzi — nie o ładne slajdy, tylko o realny ruch do przodu.

### Kahneman cues
- S1: emocjonalne i motywacyjne domknięcie tygodnia.
- S2: świadome zapisanie pierwszego kroku i ryzyka do monitorowania.

---

## Notatki trenerskie do Day 5
- Pilnuj, by Day 5 nie zamienił się w luźne Q&A bez struktury. Trzymaj agendę i artefakty końcowe.
- W każdej dyskusji wracaj do pytania: „jak to wdrożyć małym, bezpiecznym krokiem u Was?”.
- Nie obiecuj zbyt wiele w obszarze full autonomy. Podkreślaj sterowalność, review i scope control.
- W narracji końcowej unikaj języka braków typu „jeszcze mało umiecie”. Lepiej: „macie już solidny start i jasną ścieżkę kolejnych kroków”.
- Jeśli grupa jest zmęczona, skracaj dygresje, ale nie rezygnuj z planu 30-dniowego i mini-playbooka — to są kluczowe artefakty wdrożeniowe.

## Kontrola jakości Day 5 — szybki self-check
- [x] Pełny harmonogram 09:00–16:00 z przerwami.
- [x] Każdy blok ma: co mówię / co pokazuję / co wklejam / ćwiczenie / feedback / czas.
- [x] Jest Codex-first i tylko krótkie porównanie Claude / IntelliJ.
- [x] Jest cloud-max vs on-prem/local models.
- [x] Jest domknięcie wdrożeniowe: plan 30 dni + mini-playbook.
- [x] Ton jest praktyczny, motywujący, po polsku.
