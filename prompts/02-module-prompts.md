# 02-module-prompts.md — Prompty modułowe (NBP, wersja trenerska)

Cel pliku: gotowe, krótkie prompty „copy/paste na czat” + wersje rozszerzone dla trenera.

## Zasady użycia
- Najpierw wrzucaj wersję **CHAT (krótka)** na Zoom/Teams.
- Gdy grupa potrzebuje więcej kontekstu, przechodź do **WERSJA ROZSZERZONA**.
- Każdy prompt zakłada workflow: **mały zakres → diff → test → review → poprawka**.
- W miejscach `<...>` wstawiamy kontekst aktualnego modułu.

---

## Day 1 — Fundamenty, onboarding, pierwszy workflow

### D1-M1: Start kursu i kontrakt pracy (AI + bezpieczeństwo)
**CHAT (krótka):**
```text
Ćwiczenie startowe (5 min):
1) Napisz 1 zdaniem: gdzie AI realnie pomaga Ci dziś w pracy.
2) Napisz 1 ryzyko, którego najbardziej chcesz uniknąć.
Format odpowiedzi: „Pomaga: ... | Ryzyko: ...”
```

**WERSJA ROZSZERZONA (trener):**
```text
Pracujemy praktycznie: małe kroki, szybki feedback, bez wstydu i bez „idealnych odpowiedzi”.
Podaj proszę:
- 1 konkretny obszar, gdzie AI może skrócić czas pracy w Twoim projekcie,
- 1 ryzyko (jakość, bezpieczeństwo, zgodność, koszt), które dziś jest dla Ciebie kluczowe.
Za 5 minut zbieramy odpowiedzi i mapujemy je do planu tygodnia.
```

### D1-M2: Quiz diagnostyczny (anonimowy)
**CHAT (krótka):**
```text
Quiz (anonimowy): wypełnij proszę formularz z podstaw AI.
Cel: dopasowanie tempa i akcentów kursu (nie ocena uczestników).
Link: <wstaw_link_do_quizu>
```

**WERSJA ROZSZERZONA (trener):**
```text
To quiz kalibracyjny, nie egzamin. Wyniki posłużą do tego, żeby:
- mniej czasu poświęcić na rzeczy oczywiste,
- więcej czasu dać tam, gdzie grupa ma realne pytania.
Po quizie robimy krótkie, pozytywne omówienie pojęć niejasnych.
```

### D1-M3: Pierwszy prompt „z pomysłu do planu”
**CHAT (krótka):**
```text
Prompt #1 (plan funkcji):
„Przygotuj plan implementacji funkcji <NAZWA_FUNKCJI> dla aplikacji <NAZWA_APP>.
Zwróć: 1) cel biznesowy, 2) kryteria akceptacji, 3) ryzyka, 4) najmniejszy sensowny zakres na dziś.
Bez kodu. Odpowiedź po polsku, punktami.”
```

**WERSJA ROZSZERZONA (trener):**
```text
Działasz jako AI asystent techniczny w projekcie regulowanym.
Kontekst: <krótki_opis_domeny>
Ograniczenia: <stack>, <czas>, <wymogi_bezpieczeństwa>
Zadanie:
1) Zaproponuj plan funkcji <NAZWA_FUNKCJI>,
2) Dodaj Definition of Done,
3) Dodaj listę pytań otwartych do Product Ownera,
4) Zaproponuj kolejność realizacji (3 małe kroki).
Format: markdown, max 20 punktów.
```

---

## Day 2 — Architektura, dane, ADR, zasady dla agentów

### D2-M1: ADR (decyzja architektoniczna)
**CHAT (krótka):**
```text
Prompt ADR:
„Stwórz ADR dla decyzji: <TEMAT_DECYZJI> w projekcie <NAZWA_APP>.
Uwzględnij: kontekst, opcje, decyzję, konsekwencje, ryzyka, wpływ na bezpieczeństwo i audyt.”
```

**WERSJA ROZSZERZONA (trener):**
```text
Przygotuj ADR-0001.
Kontekst projektu: <kontekst>
Opcje do porównania: <opcja_A>, <opcja_B>, <opcja_C>
Kryteria oceny: prostota wdrożenia, utrzymanie, koszt, zgodność, obserwowalność.
Dodaj rekomendację i plan walidacji decyzji po 2 sprintach.
```

### D2-M2: Model danych i reguły domenowe
**CHAT (krótka):**
```text
„Zaproponuj model danych dla <obszar_domeny>.
Zwróć: encje, relacje, kluczowe atrybuty, 5 reguł walidacji, 3 przykładowe edge-case’y.”
```

### D2-M3: System prompt / zasady pracy agenta
**CHAT (krótka):**
```text
„Napisz zwięzły system prompt dla agenta codingowego.
Wymuś: małe diffy, brak zmian poza zakresem, jawne założenia, checklistę testów, brak sekretów w kodzie.”
```

**WERSJA ROZSZERZONA (trener):**
```text
Przygotuj system prompt do pracy w repo <repo_name>.
Wymagania:
- najpierw plan 3-7 kroków,
- implementacja tylko w uzgodnionym zakresie,
- po każdej zmianie: co zmieniono i dlaczego,
- obowiązkowo propozycja testu,
- zakaz dodawania sekretów i danych wrażliwych,
- gdy niepewność > jasno zgłoś pytania.
Format: gotowy blok markdown do AGENTS.md.
```

---

## Day 3 — Implementacja rdzenia (Codex-first)

### D3-M1: Prompt implementacyjny (mały slice)
**CHAT (krótka):**
```text
„Zaimplementuj mały slice: <nazwa_slice>.
Zakres: tylko <pliki/moduły>.
Wynik: diff + krótki opis + lista testów do uruchomienia.
Nie zmieniaj nic poza zakresem.”
```

### D3-M2: Prompt debugowy
**CHAT (krótka):**
```text
„Pomóż zdebugować błąd.
Objaw: <objaw>
Expected: <oczekiwane>
Actual: <faktyczne>
Logi: <fragment>
Zaproponuj: hipotezy, kroki weryfikacji, minimalną poprawkę.”
```

### D3-M3: Prompt refaktoryzacyjny (bez zmiany zachowania)
**CHAT (krótka):**
```text
„Zrefaktoryzuj <moduł> dla czytelności i utrzymania.
Nie zmieniaj zachowania biznesowego.
Dodaj krótkie uzasadnienie zmian i checklistę regresji.”
```

---

## Day 4 — Jakość, testy, security, CI/CD

### D4-M1: Generowanie testów do konkretnego zachowania
**CHAT (krótka):**
```text
„Wygeneruj testy dla zachowania: <opis_przypadku>.
Bez zmian kodu produkcyjnego, chyba że to konieczne — wtedy opisz dlaczego.
Dodaj przypadki pozytywne, negatywne i edge-case.”
```

### D4-M2: Audit security (legacy/JFTP)
**CHAT (krótka):**
```text
„Przeprowadź mini-audyt bezpieczeństwa modułu <moduł_legacy>.
Zwróć: top 5 ryzyk, poziom ryzyka, rekomendację naprawy, priorytet wdrożenia.”
```

**WERSJA ROZSZERZONA (trener):**
```text
Kontekst: system legacy, ograniczony czas, nacisk na szybkie ograniczenie ryzyka.
Przeanalizuj:
- walidację wejścia,
- autoryzację,
- sekrety i konfigurację,
- logowanie danych wrażliwych,
- zależności i podatności.
Wynik: tabela (ryzyko | wpływ | łatka szybka | poprawka docelowa).
```

### D4-M3: CI/CD cloud vs on-prem
**CHAT (krótka):**
```text
„Porównaj workflow CI/CD dla:
A) GitHub Actions (cloud)
B) Jenkins + GitHub Enterprise (on-prem)
Dla obu: approvals, security gates, audit trail, koszt utrzymania.”
```

---

## Day 5 — Utrwalenie, on-prem adaptacja, plan 30 dni

### D5-M1: Finalny audit rozwiązania końcowego
**CHAT (krótka):**
```text
„Zrób finalny przegląd rozwiązania <nazwa_app>.
Oceń: jakość kodu, testowalność, bezpieczeństwo, gotowość do wdrożenia.
Zaproponuj 3 poprawki o najwyższym ROI.”
```

### D5-M2: Adaptacja cloud → on-prem
**CHAT (krótka):**
```text
„Przygotuj plan adaptacji workflow z cloud do on-prem/local models.
Uwzględnij: model hosting, sekrety, logowanie, approvals, ograniczenia sieciowe.”
```

### D5-M3: Plan 30 dni po szkoleniu
**CHAT (krótka):**
```text
„Przygotuj plan 30 dni wdrożenia AI workflow w zespole developerskim.
Podziel na tygodnie, dodaj KPI, ryzyka i szybkie wygrane.”
```

---

## Szybkie prompty awaryjne (fallback na żywo)

### F1: Agent zrobił za duży diff
```text
„Zatrzymaj. Cofnij się do minimalnego zakresu: <zakres>.
Podziel zadanie na 2-3 mniejsze kroki i wykonaj tylko krok 1.”
```

### F2: Odpowiedź zbyt ogólna
```text
„Doprecyzuj odpowiedź operacyjnie:
- konkretne kroki,
- konkretne pliki,
- konkretne testy,
- kryterium zakończenia.”
```

### F3: Wątpliwość compliance/security
```text
„Wskaż założenia i ryzyka zgodności (dane, audyt, uprawnienia).
Jeśli brakuje danych — wypisz pytania blokujące zamiast zgadywać.”
```

---

## Powiązania
- Skrypty dzienne: `materials/scripts/day-1-script.md` ... `day-5-script.md`
- Ćwiczenia (kolejny krok planu): `exercises/03-exercises.md`
- Scenariusze demo: `materials/04-demo-scenarios.md`
- Indeks materiałów: `materials/12-materials-index.md`
