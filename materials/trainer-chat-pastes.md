# Trainer Chat Pastes — NBP (zsynchronizowane z Day 1–Day 5)

Cel: jeden szybki plik do wklejek na Zoom/Teams.
Źródło prawdy: sekcje `Szybkie copy-paste dla trenera (Day X)` w skryptach dziennych.

---

## Day 1

### Start i kontrakt pracy
```text
Ćwiczenie startowe (5 min):
1) Napisz 1 zdaniem: gdzie AI realnie pomaga Ci dziś w pracy.
2) Napisz 1 ryzyko, którego najbardziej chcesz uniknąć.
Format: „Pomaga: ... | Ryzyko: ...”.
```

### Quiz kalibracyjny
```text
Quiz jest anonimowy i służy do dopasowania tempa kursu.
To nie egzamin. Po wynikach robimy krótkie, pozytywne omówienie pojęć niejasnych.
Link do quizu: materials/quizzes/day-1-anonymous-ai-basics-quiz.md
```

### MVP scope
```text
Przygotuj roboczy zakres MVP dla aplikacji „SOC Copilot Incident Triage”.
Zwróć: cel biznesowy, user story, kryteria akceptacji, out-of-scope, 3 ryzyka i pierwszy mały slice.
```

---

## Day 2

### Problem framing
```text
Przygotuj problem statement + personę + kryteria akceptacji dla SOC Copilot Incident Triage.
Uwzględnij kontekst bankowy i wymagania audytu.
```

### ADR
```text
Stwórz ADR-0001 dla kluczowej decyzji architektonicznej.
Uwzględnij: kontekst, opcje, decyzję, konsekwencje, ryzyka, wpływ na bezpieczeństwo i audit trail.
```

### Bridge React -> Angular
```text
React na kursie jest nośnikiem demo. Przygotuj translację na Angular:
co jest 1:1 (kontrakty, testy, slicing), a co wymaga translacji frameworkowej.
```

---

## Day 3

### Mały slice implementacyjny
```text
Zaimplementuj mały slice: <nazwa_slice>.
Zakres: tylko <pliki/moduły>.
Wynik: diff + lista testów do uruchomienia.
```

### Debug loop
```text
Objaw: <objaw>
Expected: <oczekiwane>
Actual: <faktyczne>
Logi: <fragment>
Podaj: hipotezy, plan weryfikacji i minimalną poprawkę.
```

### Refactor bez zmiany zachowania
```text
Zrefaktoryzuj <moduł> dla czytelności i utrzymania.
Bez zmiany zachowania biznesowego.
Dodaj checklistę regresji.
```

---

## Day 4

### Testy
```text
Wygeneruj testy dla krytycznego zachowania: <opis_przypadku>.
Dodaj pozytywne, negatywne i edge-case.
```

### Legacy JFTP security checkpoint
```text
Zrób security audit legacy JFTP:
- min. 5 ryzyk,
- klasyfikacja CRITICAL/HIGH/MEDIUM/LOW,
- dla CRITICAL/HIGH: fix now + fix next sprint,
- decyzja: fix now / mitigate / accept (z uzasadnieniem).
```

### CI/CD cloud vs on-prem
```text
Porównaj pipeline:
A) GitHub Actions (cloud)
B) Jenkins + GitHub Enterprise (on-prem)
Dla obu: approvals, security gates, audit trail, fallback.
```

---

## Day 5

### Finalny audit rozwiązania
```text
Zrób finalny przegląd SOC Copilot Incident Triage.
Oceń: jakość kodu, testowalność, bezpieczeństwo, gotowość do wdrożenia.
```

### Cloud -> on-prem
```text
Przygotuj plan przejścia z cloud na on-prem/local models
(z sekrety, logowanie, approvals, ograniczenia sieciowe).
```

### 30-day adoption plan
```text
Przygotuj plan 30 dni wdrożenia AI workflow.
Podziel na tygodnie, dodaj KPI, ryzyka i szybkie wygrane.
```

---

## Notatka trenerska
- Wklejki są celowo krótkie.
- Dłuższe wersje: `prompts/02-module-prompts.md` i sekcje promptów w skryptach dziennych.
- W środowisku regulowanym przypominaj: bez danych wrażliwych w promptach.