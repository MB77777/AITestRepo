# 03 — Ćwiczenia kursowe (Core + Stretch)

Ten plik jest główną mapą ćwiczeń dla całego tygodnia (Day 1–Day 5).
Każde ćwiczenie ma:
- **Track Core** (obowiązkowy, realistyczny w czasie bloku),
- **Track Stretch** (dla szybszych osób),
- **Expected output** (co ma powstać i jak poznać, że jest OK).

> Zasada trenera: najpierw dowozimy Core, dopiero potem Stretch.

## Linki powiązane
- Skrypty dzienne: `materials/scripts/day-1-script.md` … `materials/scripts/day-5-script.md`
- Prompty: `prompts/02-module-prompts.md`
- Demo scenariusze: `materials/04-demo-scenarios.md` *(uzupełniane w B3)*
- Quiz Day 1: `materials/quizzes/day-1-anonymous-ai-basics-quiz.md`

---

## Day 1 — Start bez chaosu

### D1-E1 — Safe setup + workflow start
**Cel:** uruchomić Codex-first workflow z bezpiecznymi domyślnymi ustawieniami.

**Core**
- Skonfiguruj lokalne środowisko pracy pod kurs (repo, terminal, podstawowe zasady pracy).
- Przygotuj krótki plik zasad zespołowych (np. mini AGENTS/rules dla ćwiczeń).
- Wykonaj pierwszy mały task „hello workflow” z pełnym review wygenerowanego wyniku.

**Stretch**
- Dodaj checklistę review (bezpieczeństwo, logika, edge cases, testowalność).
- Zaproponuj 2 warianty pracy: cloud-max i on-prem/local-model-ready.

**Expected output**
- Krótki dokument zasad pracy (8–15 punktów) + decyzje dot. approval/sandbox.
- 1 mały, działający artefakt (plik/draft/commit lokalny) z opisem co zrobił agent, a co zweryfikował człowiek.
- Notatka „co było ryzykowne i jak to ograniczyliśmy”.

---

### D1-E2 — Quiz kalibracyjny + plan adaptacji
**Cel:** dostroić tempo i poziom kursu do grupy.

**Core**
- Przeprowadź quiz z `materials/quizzes/day-1-anonymous-ai-basics-quiz.md`.
- Zbierz 3 obszary, które wymagają doprecyzowania w kolejnych dniach.

**Stretch**
- Zmapuj wyniki quizu na konkretne decyzje trenera (np. więcej czasu na kontekst, mniej teorii o benchmarkach).

**Expected output**
- Krótki summary wyników (tematy mocne/słabsze, bez oceniania uczestników).
- Lista 3–5 decyzji adaptacyjnych do Day 2–Day 3.

---

## Day 2 — Od problemu do architektury

### D2-E1 — Problem framing + acceptance criteria
**Cel:** przejść od pomysłu do precyzyjnego zakresu MVP.

**Core**
- Opisz użytkownika, problem, wartość i granice MVP.
- Zdefiniuj założenia, ograniczenia i kryteria akceptacji.

**Stretch**
- Dodaj kryteria jakości i bezpieczeństwa dla 2 kluczowych modułów.
- Dopisz ryzyka specyficzne dla środowiska regulowanego.

**Expected output**
- Jednostronicowy brief problemu + tabela assumptions/constraints/acceptance.
- Jasna lista „out of scope” (co świadomie pomijamy w tej iteracji).

---

### D2-E2 — Architektura + model danych + ADR
**Cel:** przygotować techniczny handoff do implementacji Day 3.

**Core**
- Szkic architektury high-level (komponenty, przepływy, granice).
- Wstępny model danych dla wspólnego case’u kursowego.
- 1 ADR z decyzją i kompromisami.

**Stretch**
- Dodaj wariant wdrożeniowy cloud-max vs on-prem.
- Wskaż miejsca, gdzie wymagane będą logi audytowe.

**Expected output**
- Diagram/logiczna mapa komponentów + opis przepływu end-to-end.
- Wersja robocza modelu danych (encje + relacje + kluczowe walidacje).
- ADR zawierający: kontekst, decyzję, alternatywy, konsekwencje.

---

### D2-E3 — Task slicing pod agenta
**Cel:** rozbić pracę na małe zadania gotowe do realizacji przez człowieka + AI.

**Core**
- Rozpisz backlog na małe, testowalne slice’y.
- Dla każdego slice’a dopisz minimalne Definition of Done.

**Stretch**
- Dodaj priorytetyzację i plan iteracji (co robimy najpierw i dlaczego).
- Dopisz „failure mode” dla 2 slice’ów (co może pójść źle i jak szybko wykryć).

**Expected output**
- Backlog 8–15 zadań, każde z celem i kryterium ukończenia.
- Handoff gotowy na Day 3 bez niejasności „od czego zacząć”.

---

## Day 3 — Implementacja rdzenia

### D3-E1 — Backend/API + podstawowe guardrails
**Cel:** zbudować pierwszy działający pion funkcjonalny.

**Core**
- Zaimplementuj 1–2 kluczowe flow backendowe (np. endpoint + walidacja + zapis).
- Dodaj podstawowe guardrails (walidacja wejścia, podstawowe błędy, bezpieczne logowanie).

**Stretch**
- Dodaj dodatkowy endpoint lub wariant ścieżki biznesowej.
- Przygotuj prostą warstwę audytu (kto/co/kiedy na potrzeby demo).

**Expected output**
- Działający pion: request → logika → dane → odpowiedź.
- Kod czytelny + opis decyzji, które elementy były wspierane przez AI.
- Lista 2–3 miejsc do poprawy na Day 4 (jakość/safety).

---

### D3-E2 — Integracja UI/CLI z backendem
**Cel:** pokazać użytkowy przepływ zamiast izolowanych kawałków kodu.

**Core**
- Podłącz prosty interfejs (UI lub CLI) do głównego flow backendowego.
- Obsłuż podstawowe stany: sukces, błąd, brak danych.

**Stretch**
- Dodaj prostą warstwę obserwowalności (czytelne logi + identyfikator żądania).
- Dodaj mini-symulację „co jeśli model/API chwilowo zawiedzie”.

**Expected output**
- End-to-end demo jednego scenariusza użytkownika.
- Lista edge-case’ów zauważonych podczas testu manualnego.

---

## Day 4 — Jakość, bezpieczeństwo, legacy, CI/CD

### D4-E1 — Testy i review pętli AI
**Cel:** domknąć jakość i przewidywalność zmian.

**Core**
- Uruchom testy dla kluczowego flow i popraw wykryte problemy.
- Wykonaj review zmian wygenerowanych przez AI (logika, bezpieczeństwo, czytelność).

**Stretch**
- Dodaj 1 test integracyjny lub scenariusz kontraktowy.
- Dodaj checklistę „co musi przejść przed merge”.

**Expected output**
- Zielony zestaw krytycznych testów dla głównego flow.
- Krótki raport review: co poprawiono i dlaczego.

---

### D4-E2 — Security audit (legacy JFTP)
**Cel:** przećwiczyć audyt bezpieczeństwa na starszym fragmencie systemu.

**Core**
- Przeanalizuj wskazany legacy fragment JFTP pod kątem ryzyk.
- Wypisz podatności/problemy i zaproponuj minimalne remediacje.

**Checkpoint obowiązkowy (legacy JFTP)**
- Oznacz każde ryzyko etykietą: `CRITICAL`, `HIGH`, `MEDIUM` lub `LOW`.
- Dla każdego `CRITICAL/HIGH` dopisz: szybkie działanie „na dziś” oraz trwałe działanie „na sprint”.
- Zapisz decyzję: `fix now` / `mitigate` / `accept (z uzasadnieniem)`.

**Stretch**
- Uszereguj ryzyka wg wpływu i kosztu naprawy.
- Dodaj plan „quick wins (24h) vs hardening (2–4 tyg.)”.

**Expected output**
- Lista ryzyk z priorytetami (minimum 5 pozycji).
- Konkretne rekomendacje naprawcze z krótkim uzasadnieniem.
- Jednostronicowa tabela decyzji auditowych (co robimy teraz vs po kursie).

---

### D4-E3 — CI/CD: cloud vs on-prem
**Cel:** pokazać realistyczne ścieżki wdrożeniowe dla obu światów.

**Core**
- Opisz minimalny pipeline cloud (np. GitHub Actions) dla kursowego repo.
- Opisz odpowiednik on-prem (np. Jenkins/GHE) i różnice kontrolne.

**Stretch**
- Dodaj punkt kontroli approvals i audit trail.
- Dodaj fallback, gdy model/cloud jest niedostępny.

**Expected output**
- Porównawcza tabela cloud vs on-prem (kroki, ryzyka, kontrole).
- Krótki „playbook wdrożeniowy” dla środowiska regulowanego.

---

## Day 5 — Demo, audyt końcowy, plan wdrożenia

### D5-E1 — Final demo + decyzje techniczne
**Cel:** zaprezentować spójne MVP i uzasadnić kluczowe wybory.

**Core**
- Przygotuj i przeprowadź demo end-to-end.
- Wyjaśnij 3 najważniejsze decyzje techniczne i ich kompromisy.

**Stretch**
- Pokaż alternatywny wariant implementacji (co byśmy zmienili przy większym budżecie/czasie).
- Dodaj mini retrospective: „co działało najlepiej we współpracy z AI”.

**Expected output**
- Stabilny scenariusz demo + plan awaryjny (gdy coś nie zadziała live).
- Krótki dokument „tech decisions recap”.

---

### D5-E2 — Security audit końcowego rozwiązania
**Cel:** sprawdzić gotowość rozwiązania przed „produkcyjnym myśleniem”.

**Core**
- Przejdź checklistę bezpieczeństwa dla finalnej wersji aplikacji.
- Oznacz obszary: OK / wymaga poprawy / poza zakresem MVP.

**Stretch**
- Dodaj plan kolejnych kroków hardeningu na 30 dni.
- Dopisz wymagania monitoringowe i audytowe dla wdrożenia bankowego.

**Expected output**
- Końcowy raport bezpieczeństwa z priorytetami.
- Jasny podział: co możemy wdrażać teraz, co wymaga dalszych prac.

---

### D5-E3 — Plan wdrożenia po kursie (30 dni)
**Cel:** zamienić wiedzę szkoleniową na plan działania po powrocie do pracy.

**Core**
- Zbuduj plan 30-dniowy: quick wins, standardy pracy, pierwsze wdrożenie.
- Wskaż właścicieli działań i miary postępu.

**Stretch**
- Dodaj wariant dla zespołu cloud-first i wariant dla on-prem-first.
- Dopisz plan komunikacji do interesariuszy (IT + biznes + security).

**Expected output**
- Realny plan 30 dni z kolejnością działań.
- 3–5 metryk, które pomogą ocenić efekt wdrożenia AI workflow.

---

## Zasady oceny ukończenia ćwiczeń (dla trenera)

Ćwiczenie uznajemy za ukończone, gdy:
1. Powstał **konkretny artefakt** (nie tylko rozmowa o pomysłach).
2. Artefakt ma **jasne kryterium jakości** (minimum checklista / DoD).
3. Uczestnik/para potrafi odpowiedzieć:
   - co zrobił AI,
   - co sprawdził człowiek,
   - jakie ryzyko zostało i jak je ograniczyć.

## Notatka organizacyjna
Szczegółowe starter files pod ćwiczenia będą dokładane etapami w backlogu:
- `F1` (mapa ćwiczeń),
- `F2` (starter files),
- `F3` (prompt packs).
Ten dokument już teraz pełni rolę master-map dla pracy trenera i uczestników.
pełni rolę master-map dla pracy trenera i uczestników.
