# Day 1 Script — Start szybko, pracuj bezpiecznie

## Outcome dnia
Po Day 1 uczestnicy mają:
- działający workflow Codex-first,
- ustawione bezpieczne domyślne zasady pracy (sandbox + approvals + granice repo),
- wspólny obraz celu kursu i zakresu MVP,
- pierwszy sensowny artefakt PRD/AGENTS lub mały wynik repo,
- większy spokój: „wiem, jak zacząć i nie narobić szkód”.

## Czego się nauczymy (perspektywa całego dnia)
- Jak uruchomić i utrzymać Codex-first workflow w bezpiecznych granicach.
- Jak zamieniać ogólny pomysł na konkret: zakres MVP, PRD/AGENTS i pierwszy mały artefakt.
- Jak prowadzić review wygenerowanych wyników tak, by zachować kontrolę jakości.

## Dlaczego warto (perspektywa całego dnia)
- Bo zespołowi szybciej rośnie zaufanie do AI, gdy pierwszy dzień daje realne, namacalne efekty.
- Bo bez bezpiecznych nawyków i jasnych reguł nawet dobry agent workflow szybko zamienia się w chaos.
- Bo ten fundament skraca pracę już od Day 2: mniej zgadywania, więcej powtarzalnego tempa.

## Linki dnia / mapa zależności
- Quiz otwarcia: `materials/quizzes/day-1-anonymous-ai-basics-quiz.md`
- Prompty dla Day 1: `prompts/02-module-prompts.md#day-1--fundamenty-onboarding-pierwszy-workflow`
- Prompt pack Day 1 (quick copy): `prompts/day-1/day-1-prompt-pack.md`
  - D1-M1 Start i kontrakt: `prompts/02-module-prompts.md#d1-m1-start-kursu-i-kontrakt-pracy-ai--bezpieczeństwo`
  - D1-M2 Quiz diagnostyczny: `prompts/02-module-prompts.md#d1-m2-quiz-diagnostyczny-anonimowy`
  - D1-M3 Z pomysłu do planu: `prompts/02-module-prompts.md#d1-m3-pierwszy-prompt-z-pomysłu-do-planu`
- Ćwiczenia Day 1: `exercises/03-exercises.md#day-1--start-bez-chaosu`
  - D1-E1 Safe setup: `exercises/03-exercises.md#d1-e1--safe-setup--workflow-start`
  - D1-E1 starter: `exercises/day-1/d1-e1-safe-setup-starter.md`
  - D1-E2 Quiz + adaptacja: `exercises/03-exercises.md#d1-e2--quiz-kalibracyjny--plan-adaptacji`
  - D1-E2 starter: `exercises/day-1/d1-e2-quiz-adaptation-starter.md`
- Scenariusz demo na dziś: `materials/04-demo-scenarios.md#scenariusz-a--junior-dev-który-boi-się-zepsuć-produkcję`
- Failure scenario na dziś: `materials/04-demo-scenarios.md#f4--prompt-zbyt-ogólny-chaotyczna-odpowiedź`
- Materiał zbiorczy do wrzutek na czat: `prompts/02-module-prompts.md`
- Referencja modułu terminalowego: `materials/references/wezterm-mini-module.md`
- Referencja modułu bezpieczeństwa: `materials/references/sandbox-safety-module.md`
- Referencja modułu głosowego (opcjonalnie): `materials/references/handy-computer-mini-module.md`

## Agenda dnia
- 09:00–09:20 — Zoom onboarding + zasady pracy
- 09:20–09:40 — Krótka runda zapoznawcza
- 09:40–10:00 — Anonimowy quiz AI basics
- 10:00–10:25 — Mission kickoff: po co ten tydzień i po co ten workflow
- 10:25–11:00 — Codex-first safe setup + pierwszy mały sukces
- 11:00–11:15 — PRZERWA
- 11:15–11:35 — Krótkie porównanie: Codex vs Claude vs IntelliJ AI Assistant
- 11:35–12:05 — Projekt tygodnia i zakres MVP
- 12:05–13:00 — PRD + AGENTS mini-workshop
- 13:00–13:30 — PRZERWA
- 13:30–14:15 — Pierwszy widoczny artefakt repo
- 14:15–14:30 — Review loop: generated draft ≠ truth
- 14:30–14:40 — OPCJONALNA PRZERWA
- 14:40–15:20 — Dedykowany mini‑moduł WezTerm: ergonomia terminala, powiadomienia i TUI UX
- 15:20–15:45 — Dedykowany mini‑moduł bezpieczeństwa: sandbox, WSL, bash vs PowerShell
- 15:45–16:00 — Podsumowanie dnia (bez obowiązkowej pracy domowej)

## Mapa momentów System 1 / System 2 (Kahneman)
- **System 1 (szybki, intuicyjny):** 09:20 runda zapoznawcza, 09:40 quiz, 10:00 mission kickoff i analogie z codziennej pracy.
- **System 2 (wolny, analityczny):** 10:25 safe setup krok po kroku, 11:15 porównanie narzędzi na kryteriach, 13:30 prompt anatomy.
- **Przełącznik S1→S2:** po każdym szybkim demo pada pytanie „jak to zweryfikujemy w praktyce?” i przechodzimy do checklisty.
- **Przełącznik S2→S1:** po technicznym bloku krótkie „co to daje jutro w Waszym zespole?”, żeby domknąć sens i motywację.

## 09:00–09:20 — Zoom onboarding + zasady pracy
### Why this matters in daily work
- Nawet najlepszy warsztat siada, jeśli komunikacja i rytm pracy są chaotyczne.
- Dobre zasady od początku skracają przestoje, pytania „co teraz?” i techniczny hałas.

### Co mówię
- „Zaczynamy praktycznie: mało slajdów, dużo małych kroków i szybkich efektów.”
- „Kamerki są mile widziane — łatwiej mi wyczuć, czy jedziemy za szybko czy za wolno.”
- „Pytania wrzucacie od razu na czat. Nie czekamy na idealny moment.”
- „Reakcja 👍 = jasne / działa / jestem z Wami. To nasz mini-protokół synchronizacji.”
- „Nasza misja: zwiększyć tempo pracy programisty bez speedrunu do produkcyjnej katastrofy.”

### Co pokazuję
- Agendę całego dnia i godziny przerw.
- Zasady pracy na Zoomie: audio, chat, reakcje, tempo, pytania.
- 5-dniową mapę kursu i końcowy efekt tygodnia.

### Co wklejam na chat
- `Zasady pracy: 1) 👍 = jasne / działa, 2) pytania wrzucamy od razu na czat, 3) kamerki mile widziane, 4) po każdym większym bloku robimy mini-ćwiczenie, 5) AI traktujemy jako draft + przyspieszenie, nie wyrocznię.`

### Ćwiczenie
- Core: każdy daje reakcję 👍 lub mówi/pisze swoje uwagi

### Feedback loop (Kolb)
- Doświadczenie: wszyscy używają jednego prostego kanału synchronizacji.
- Refleksja: czy taka forma komunikacji jest wygodna?
- Konceptualizacja: jasne zasady = mniej tarcia poznawczego.
- Testowanie: używamy tego protokołu przez cały dzień.

### Szacowany czas
- 20 min

## 09:20–09:40 — Krótka runda zapoznawcza
### Why this matters in daily work
- Mieszana grupa (Java / DB / low-code / architektura) potrzebuje wspólnego obrazu poziomu i realnych pain pointów.
- Dzięki temu łatwiej dobrać przykłady, tempo i poziom szczegółu.

### Co mówię
- „Max 2-3 minuty na osobę: rola, stack, jak dziś używacie AI i co Was najbardziej frustruje w pracy z AI (pain points).”
- „To nie jest autoprezentacja na LinkedIn, tylko szybki radar dla mnie.”
- „Szukamy wspólnych problemów / celów, bo to one dadzą nam najlepsze przykłady na resztę tygodnia.”

### Co pokazuję
- 4 pytania na slajdzie lub w prostym ekranie współdzielonym.
- Miejsca wspólne między uczestnikami: np. SQL, dokumentacja, review, legacy, onboarding.

### Co wklejam na chat
- `Runda intro (max 2-3 min/os): 1) rola, 2) stack, 3) jak dziś używasz AI, 4) największy pain point.`

### Ćwiczenie
- Core: szybka runda ustna.

### Feedback loop (Kolb)
- Doświadczenie: zbieramy realny kontekst z grupy.
- Refleksja: które problemy powtarzają się najczęściej?
- Konceptualizacja: szkolenie ma odpowiadać na prawdziwe potrzeby, nie ogólniki.
- Testowanie: wracamy do tych pain pointów w kolejnych blokach i sprawdzamy, czy je odczarowaliśmy.

### Szacowany czas
- 20 min

## 09:40–10:00 — Anonimowy quiz AI basics
### Why this matters in daily work
- Bez diagnozy łatwo przestrzelić z poziomem: dla części grupy będzie za wolno, dla części za szybko.
- Quiz daje wspólny język do pojęć, które później wpływają na jakość promptów i review.

### Co mówię
- „To nie egzamin. To radar, żebym wiedział, gdzie zwolnić, a gdzie przyspieszyć.”
- „Jeśli czegoś nie wiecie — super. Znaczy, że jest po co tu być.”
- „Nie chcemy sztucznej pewności. Wolimy szybko odkryć luki niż później ufać złym założeniom.”

### Co pokazuję
- Quiz z pliku `materials/quizzes/day-1-anonymous-ai-basics-quiz.md`.
- Krótkie omówienie tematów: token, context window, hallucination, alignment, sandbox, agent vs assistant.

### Co wklejam na chat
- `Quiz jest anonimowy. Celem jest dobrać tempo szkolenia, nie wystawić ocenę. Jeśli coś brzmi obco — idealnie, właśnie po to tu jesteśmy.`

### Ćwiczenie
- Core: uczestnicy rozwiązują quiz.
- Stretch: chętni zaznaczają, które pytanie było najbardziej mylące i dlaczego.

### Feedback loop (Kolb)
- Doświadczenie: każdy konfrontuje intuicję z podstawami.
- Refleksja: które pojęcia są najmniej stabilne w grupie?
- Konceptualizacja: dobra praca z AI zaczyna się od dobrych modeli mentalnych.
- Testowanie: w dalszych blokach sprawdzamy, czy te pojęcia przekładają się na lepsze decyzje.

### Szacowany czas
- 20 min

## 10:00–10:25 — Mission kickoff: po co ten tydzień i po co ten workflow
### Why this matters in daily work
- Ludzie wdrażają workflow nie dlatego, że jest „modny”, tylko dlatego, że widzą sens i przewagę w swojej codziennej pracy.
- Potrzebujemy wspólnej odpowiedzi na pytanie: „co ja z tego realnie mam?”.

### Co mówię
- „AI nie ma zastąpić myślenia. Ma skrócić drogę od pomysłu do sprawdzonego wyniku.”
- „Przez tydzień budujemy jeden spójny case, zamiast skakać po losowych demach.”
- „Rider chce logiki, Elephant chce bezpieczeństwa i poczucia, że to jest dla mnie. Dajemy obu to, czego potrzebują.”
- „Będziemy szybsi, ale nie w stylu: YOLO, merge, modlitwa i rollback.”

### Co pokazuję
- 5-dniową mapę kursu.
- Finalny efekt tygodnia: repo, materiały, prompty, ćwiczenia i praktyczny workflow.
- Gdzie ten workflow pomaga na co dzień: analiza wymagań, PRD, slice’y, kod, review, dokumentacja.

### Co wklejam na chat
- `Cel tygodnia: zbudować działający, sensowny mini-case i nauczyć się workflow, który realnie skraca pracę bez oddawania kontroli.`

### Ćwiczenie
- Core: uczestnicy wskazują 1 obszar, w którym chcieliby odzyskać czas dzięki AI.
- Stretch: dopisują 1 obawę związaną z użyciem AI w środowisku regulowanym.

### Feedback loop (Kolb)
- Doświadczenie: uczestnicy nazywają własne potrzeby i obawy.
- Refleksja: co jest dla nich największą wartością, a co największym ryzykiem?
- Konceptualizacja: dobry workflow musi zwiększać tempo i kontrolę jednocześnie.
- Testowanie: w kolejnych blokach mierzymy, czy faktycznie to dostajemy.

### Szacowany czas
- 25 min

## 10:25–11:00 — Codex-first safe setup + pierwszy mały sukces
### Why this matters in daily work
- Jeśli pierwszy kontakt z agentem jest zbyt trudny albo zbyt ryzykowny, zespół szybko wróci do starych nawyków.
- Dobre wejście to mały, szybki sukces w bezpiecznych granicach.

### Co mówię
- „Codex jest naszym głównym torem jazdy w tym kursie: prosty, szybki, terminal-first.”
- „Najpierw uczymy się bezpiecznej autonomii: sandbox, approvals, granice repo, małe zadania.”
- „Nie chcemy rozpędzić agenta bez kierownicy. Najpierw trasa, potem gaz.”
- „Najlepszy prompt na start nie jest najdłuższy — jest najjaśniejszy.”

### Co pokazuję
- Pierwsze uruchomienie Codex w bezpiecznym katalogu.
- Różnicę między sandbox + approvals a zbyt luźnym trybem pracy.
- Mały task startowy, np. szkic PRD albo propozycję backlog slice’ów dla aplikacji NBP DevCopilot.

### Co wklejam na chat
- `Checklist startowa: [1] narzędzie działa, [2] pracujemy w dedykowanym repo, [3] sandbox + approvals ustawione, [4] pierwszy mały task zakończony, [5] wynik sprawdzony przez człowieka.`

### Ćwiczenie
- Core: każdy uruchamia pierwszy mały task w Codex.
- Stretch: dopracowuje prompt tak, by wynik był bardziej konkretny i testowalny.

### Feedback loop (Kolb)
- Doświadczenie: uczestnicy sami wykonują pierwszy przebieg agentowy.
- Refleksja: co zadziałało, a co było niejasne?
- Konceptualizacja: małe taski + bezpieczne granice = większa kontrola i mniej frustracji.
- Testowanie: potem powtórzymy ten sam wzorzec na bardziej realnych artefaktach.

### Szacowany czas
- 35 min

## 11:00–11:15 — PRZERWA

## 11:15–11:35 — Krótkie porównanie: Codex vs Claude vs IntelliJ AI Assistant
### Why this matters in daily work
- Zespół musi wiedzieć, dlaczego wybieramy główny workflow, zamiast tonąć w tool sprawl.
- Świadomy wybór narzędzia zmniejsza chaos i spory „czym to robić”.

### Co mówię
- „Primary path w tym kursie to Codex CLI/App. Reszta jest porównaniem, nie równoległym curriculum.”
- „Claude pokazujemy krótko jako kontrast, IntelliJ AI Assistant jako most do środowiska IDE.”
- „Chodzi o workflow, nie o kolekcjonowanie Pokemonów AI.”
- „W praktyce: jeden główny tor + świadomość ograniczeń pozostałych opcji.”

### Co pokazuję
- Krótką tabelę: Codex / Claude / IntelliJ AI Assistant.
- Gdzie Codex wygrywa dydaktycznie: prostota, terminal-first, praca zadaniowa.
- Gdzie IntelliJ pomaga jako editor/review/debug bridge, ale nie zastępuje głównego toru kursu.

### Co wklejam na chat
- `Na tym kursie: Codex = workflow główny. Claude i IntelliJ pokazujemy krótko jako porównanie i kontekst, nie jako drugi pełny tor szkolenia.`

### Ćwiczenie
- Core: uczestnicy wpisują, które narzędzie znają najlepiej i czego im w nim brakuje.
- Stretch: dopisują, czego oczekują od narzędzia „głównego” w pracy zespołowej.

### Feedback loop (Kolb)
- Doświadczenie: porównujemy realne oczekiwania wobec narzędzi.
- Refleksja: co daje wartość, a co tylko zwiększa szum?
- Konceptualizacja: mniej narzędzi, więcej powtarzalności workflow.
- Testowanie: cały tydzień lecimy głównie jednym torem i oceniamy, czy to było słuszne.

### Szacowany czas
- 20 min

## 11:35–12:05 — Projekt tygodnia i zakres MVP
### Why this matters in daily work
- Agent bez jasnego zakresu produkuje chaos szybciej niż człowiek bez kawy.
- Wyraźny MVP pomaga zamieniać pomysły w małe, widoczne slice’y.

### Co mówię
- „Budujemy jeden spójny case, żeby nie tracić energii na przełączanie kontekstu.”
- „MVP ma być małe, sensowne i przewidywalne. Nice to have zostają na smyczy.”
- „Naszym celem nie jest wszystko naraz. Naszym celem jest kontrolowany postęp.”

### Co pokazuję
- Zakres aplikacji NBP DevCopilot.
- Przykładowe funkcje must-have vs later.
- Ryzyka dla środowiska regulowanego i gdzie potrzebujemy guardrails.

### Co wklejam na chat
- `MVP = ma działać bezpiecznie i przewidywalnie. Funkcje ekstra dokładamy dopiero po stabilnej bazie.`

### Ćwiczenie
- Core: każdy wybiera 1 funkcję must-have i 1 funkcję later.
- Stretch: formułuje 1 ograniczenie bezpieczeństwa lub jakości dla wybranej funkcji.

### Feedback loop (Kolb)
- Doświadczenie: uczestnicy sami odróżniają zakres podstawowy od dodatków.
- Refleksja: co naprawdę daje wartość już teraz?
- Konceptualizacja: dobre scope’owanie jest paliwem dla sensownej automatyzacji.
- Testowanie: ten zakres posłuży za bazę do PRD i kolejnych artefaktów.

### Szacowany czas
- 30 min

## 12:05–13:00 — PRD + AGENTS mini-workshop
### Why this matters in daily work
- Dobra specyfikacja i zasady pracy z agentem skracają iteracje, poprawiają jakość i zmniejszają ilość losowych odpowiedzi.
- To jest moment, w którym „promptowanie” zamienia się w inżynierię pracy.

### Co mówię
- „Dobry PRD to nie korpo-esej. To narzędzie redukcji chaosu.”
- „AGENTS.md traktujemy jak kontrakt pracy z agentem: co wolno, czego nie, jak sprawdzamy wynik.”
- „Im lepsze reguły i acceptance criteria, tym mniej trzeba ratować później.”

### Co pokazuję
- Szkic PRD dla NBP DevCopilot.
- Szkic AGENTS.md: styl pracy, granice, testy, review, bezpieczeństwo.
- Jak z krótkiego briefu zrobić lepszy, bardziej operacyjny prompt.

### Co wklejam na chat
- `Prompt startowy: Stwórz zwięzły PRD + AGENTS.md dla aplikacji NBP DevCopilot z naciskiem na bezpieczeństwo, mały scope MVP i testowalność.`

### Ćwiczenie
- Core: w parach dopracować PRD lub AGENTS dla jednego modułu.
- Stretch: dopisać acceptance criteria oraz 2 „red flags”, które powinny zatrzymać zbyt śmiały output AI.

### Feedback loop (Kolb)
- Doświadczenie: uczestnicy zamieniają ogólny pomysł w operacyjny dokument.
- Refleksja: gdzie agent najbardziej potrzebuje doprecyzowania?
- Konceptualizacja: jakość wejścia silnie wpływa na jakość autonomii.
- Testowanie: po lunchu użyjemy tych artefaktów do wygenerowania pierwszego wyniku repo.

### Szacowany czas
- 55 min

## 13:00–13:30 — PRZERWA

## 13:30–14:15 — Pierwszy widoczny artefakt repo
### Why this matters in daily work
- Sam PRD nie daje jeszcze poczucia postępu. Widoczny artefakt tak.
- Zespoły szybciej ufają workflow, gdy już pierwszego dnia widzą coś namacalnego.

### Co mówię
- „Po lunchu chcemy czegoś, co można pokazać, ocenić i poprawić.”
- „Małe, testowalne efekty są lepsze niż wielkie deklaracje bez kodu.”
- „Pierwszy artefakt ma być skromny, ale sensowny: README slice, szkic endpointu, walidator, kontrakt API, test placeholder.”

### Co pokazuję
- Jak z PRD/AGENTS przejść do małego zadania dla agenta.
- Przykładowy prompt na pierwszy wynik repo.
- Gdzie ten wynik powinien wylądować i jak sprawdzić, czy jest „good enough for first pass”.

### Co wklejam na chat
- `Mini-zadanie: wygeneruj 1 mały, widoczny artefakt repo i dopisz kryterium done. Przykład: szkic endpointu, walidator, kontrakt API, README modułu albo test placeholder.`

### Ćwiczenie
- Core: każdy zespół tworzy 1 mały artefakt powiązany z uzgodnionym MVP.
- Stretch: dopisuje prosty review checklist lub acceptance criteria do tego artefaktu.

### Feedback loop (Kolb)
- Doświadczenie: uczestnicy widzą realny output, nie tylko teorię.
- Refleksja: co było dobre, a co zbyt ogólne albo zbyt ambitne?
- Konceptualizacja: agent działa najlepiej na małych, jasno zamkniętych zadaniach.
- Testowanie: kolejne dni będą rozwijać dokładnie ten rytm pracy.

### Szacowany czas
- 45 min

## 14:15–14:30 — Review loop: generated draft ≠ truth
### Why this matters in daily work
- Największa wartość seniora nie znika przy AI — przesuwa się mocniej w stronę oceny, kontroli i decyzji.
- Bez review AI daje szybkość, ale nie daje gwarancji trafności.

### Co mówię
- „Generated ≠ approved. Output AI to draft, nie prawo natury.”
- „Sprawdzamy: zgodność z wymaganiem, bezpieczeństwo, minimalny scope, testowalność, czytelność.”
- „W środowisku regulowanym review i ślad decyzji są równie ważne jak tempo.”

### Co pokazuję
- Krótki checklist review.
- 1 przykład czegoś, co wygląda dobrze, ale wymaga korekty.
- Jak szybko poprawić prompt lub ręcznie dopisać brakujący warunek.

### Co wklejam na chat
- `Review checklist: 1) czy to odpowiada na zadanie, 2) czy jest bezpieczne, 3) czy scope nie urósł za bardzo, 4) czy da się to przetestować, 5) co poprawiamy zanim uznamy wynik za użyteczny?`

### Ćwiczenie
- Core: zespoły robią szybki review własnego artefaktu.
- Stretch: wymieniają się artefaktami i robią peer review w 3 punktach.

### Feedback loop (Kolb)
- Doświadczenie: uczestnicy przechodzą z trybu „wow, coś wygenerowało” do trybu „czy to jest dobre?”.
- Refleksja: jakie błędy najłatwiej przeoczyć?
- Konceptualizacja: kontrola jakości jest częścią workflow, nie dodatkiem.
- Testowanie: stosujemy ten sam rytm review w następnych dniach.

### Szacowany czas
- 15 min

## 14:30–14:40 — OPCJONALNA PRZERWA

## 14:40–15:20 — Dedykowany mini‑moduł WezTerm: ergonomia terminala, powiadomienia i TUI UX
### Why this matters in daily work
- Nawet dobry agent workflow boli, jeśli obsługa środowiska jest męcząca i zbyt krucha.
- Ergonomia wpływa na to, czy ludzie naprawdę wdrożą workflow po szkoleniu.

### Co mówię
- „Nie chodzi o mieć 100 narzędzi. Chodzi o mieć 1 workflow, który działa codziennie bez tarcia.”
- „Krótko pokażę ergonomię terminala i dlaczego niektóre środowiska są wygodniejsze do pracy z agentami.”
- „To nie jest konkurs na najbardziej cyberpunkowy terminal.”

### Co pokazuję
- Krótkie demo ergonomii pracy terminal-first.
- 5-min porównanie WezTerm vs Windows Terminal na podstawie `materials/references/wezterm-mini-module.md` (splity, TUI, powiadomienia, stabilność sesji).
- Jak utrzymać prosty, przewidywalny setup zamiast tool sprawl.

### Co wklejam na chat
- `WezTerm nie jest obowiązkowy. Pokazujemy go, bo często lepiej znosi TUI/splity/powiadomienia przy dłuższej pracy z agentami. Jeśli Twój obecny terminal działa stabilnie — zostajesz przy nim.`

### Ćwiczenie
- Core: uczestnicy identyfikują 1 element swojego setupu, który najbardziej ich spowalnia.
- Stretch: dopisują, jaką małą zmianę mogą przetestować jeszcze w tym tygodniu.

### Feedback loop (Kolb)
- Doświadczenie: grupa porównuje własne ograniczenia i potrzeby.
- Refleksja: co realnie przeszkadza w codziennej pracy?
- Konceptualizacja: ergonomia to część produktywności, nie kosmetyka.
- Testowanie: wybieramy 1 małą poprawkę środowiska do sprawdzenia w kolejnych dniach.

### Szacowany czas
- 40 min

## 15:20–15:45 — Dedykowany mini‑moduł bezpieczeństwa: sandbox, WSL, bash vs PowerShell
### Why this matters in daily work
- W środowisku enterprise największe ryzyko to nie wolniejszy kod, tylko szybki błąd z dużym zasięgiem.
- Zespół musi umieć odróżnić wygodne środowisko pracy od realnej izolacji bezpieczeństwa.

### Co mówię
- „Sandbox to pas bezpieczeństwa dla pracy z agentem: ma ograniczać skutki błędu, nie Waszą produktywność.”
- „WSL poprawia UX i kompatybilność narzędzi, ale sam w sobie nie jest granicą bezpieczeństwa.”
- „Bash i PowerShell są oba OK, ale mają inną składnię i inne pułapki — agent musi dostać jasny kontekst.”
- „Zasada dnia: AI generuje draft, człowiek zatwierdza decyzję i bierze odpowiedzialność.”

### Co pokazuję
- 5-min porównanie sandbox vs no-sandbox na bazie `materials/references/sandbox-safety-module.md`.
- Krótkie wyjaśnienie: WSL != izolacja bezpieczeństwa.
- Mini przykład różnic bash vs PowerShell (quoting/pipeline/komendy) i jak to wpływa na prompty do agenta.
- Bezpieczne ustawienia domyślne: sandbox ON, approvals ON, małe taski, review diffu, test, commit.

### Co wklejam na chat
- `Bezpieczny start z agentem: dedykowany branch/repo, sandbox + approvals ON, małe taski, czytamy każdy diff, odpalamy celowany test i dopiero commit.`

### Ćwiczenie
- Core: uczestnicy oceniają swój bieżący setup i zaznaczają 1 ryzyko, które redukują od razu po module.
- Stretch: przygotowują mini-checklistę „safe defaults” dla własnego zespołu (5 punktów max).

### Feedback loop (Kolb)
- Doświadczenie: uczestnicy mapują swój realny workflow na model bezpieczeństwa.
- Refleksja: gdzie do tej pory myliliśmy wygodę z izolacją?
- Konceptualizacja: guardrails to część tempa pracy, nie hamulec.
- Testowanie: od jutra stosujemy checklistę safe defaults w każdej iteracji z agentem.

### Szacowany czas
- 25 min

## 15:45–16:00 — Podsumowanie dnia (bez obowiązkowej pracy domowej)
### Why this matters in daily work
- Ludzie zapamiętują lepiej to, co nazwą, podsumują i zamkną konkretnym następnym krokiem.
- Dzień bez domknięcia łatwo zamienia się w „coś tam było o AI”.

### Co mówię
- „Dziś zrobiliśmy fundament: wspólny język, bezpieczny start, scope, pierwsze artefakty.”
- „Jutro przechodzimy mocniej w architekturę, slice’y i delegowanie bardziej złożonych zadań.”
- „Jeśli dziś było trochę chaosu — dobrze. Chaos został nazwany, a to już połowa porządku.”

### Co pokazuję
- Checklistę tego, co już powstało.
- Co przenosimy na Day 2.
- Gdzie w repo będą kolejne materiały dnia.

### Co wklejam na chat
- `Brak obowiązkowej pracy domowej. Opcjonalnie: dokończ fragment, którego nie udało się domknąć (np. przez limit/tempo) i zapisz 1 pytanie na jutro.`

### Ćwiczenie
- Core: każdy zapisuje 1 rzecz, którą jutro chce robić lepiej z AI niż dziś.
- Stretch: każdy dopisuje 1 ryzyko, które będzie chciał świadomie kontrolować.

### Feedback loop (Kolb)
- Doświadczenie: uczestnicy podsumowują własny postęp.
- Refleksja: co już działa lepiej po pierwszym dniu?
- Konceptualizacja: workflow AI to seria małych, świadomych decyzji.
- Testowanie: praca domowa przygotowuje grunt pod Day 2.

### Szacowany czas
- 15 min
