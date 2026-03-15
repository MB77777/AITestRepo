# NBP — Opcje konceptu aplikacji (Phase E1)

Data: 2026-03-15  
Cel: przygotować 3–5 realnych opcji projektu końcowego na 5-dniowy kurs (profil: bank, mieszany poziom seniority, Java + DB/SQL + TS/full-stack), w podejściu Codex-first.

## Kryteria oceny (1–5)
- **Wartość edukacyjna** dla grupy NBP (bank, Java/DB/full-stack mix)
- **Złożoność implementacji** (niżej = lepiej dla 5 dni)
- **Zaangażowanie** (historia, stawka, „nerd fun”, motywacja)
- **Dopasowanie do 5 dni**
- **Dopasowanie do Codex-first** (CLI/App + workflow agenta)
- **Nauka „jak agent działa w środku”** (tools, JSON schema, system prompt, guardrails)
- **Czy AG-UI/CopilotKit/langgraph4j ma sens** (value vs complexity)

---

## Opcja 1 — SOC Copilot „Incident Triage” (SQL + hacker-defense)
**Opis:** wewnętrzny asystent SOC do triage incydentów: konsoliduje logi, proponuje priorytety, generuje checklistę działań i raport audytowy.  
**Dlaczego pasuje do NBP:** bankowy kontekst bezpieczeństwa, silny komponent SQL/analizy danych, łatwe osadzenie ćwiczeń audytowych.

- Wartość edukacyjna: **5/5**
- Złożoność implementacji: **3/5**
- Zaangażowanie: **5/5**
- Fit do 5 dni: **4/5**
- Fit do Codex-first: **5/5**
- Agent internals: **5/5**
- AG-UI/CopilotKit/langgraph4j: **raczej NIE jako core**; ewentualnie krótki optional demo (wysoka złożoność, mały zwrot w 5-dniowym kursie)

**Ryzyka:** łatwo „odpłynąć” w cyber-szczegóły; trzeba trzymać scope (symulowany dataset, nie pełny SIEM).

---

## Opcja 2 — Legacy Refactor & Risk Assistant (JFTP-style)
**Opis:** asystent do przeglądu starego modułu (np. JFTP-like): wykrywa ryzyka, proponuje refaktoryzacje, checklistę testów i plan migracji.  
**Dlaczego pasuje:** idealny most do Day 4/5 (quality + security + legacy), bardzo praktyczny dla zespołów enterprise.

- Wartość edukacyjna: **5/5**
- Złożoność implementacji: **2/5**
- Zaangażowanie: **4/5**
- Fit do 5 dni: **5/5**
- Fit do Codex-first: **5/5**
- Agent internals: **4/5**
- AG-UI/CopilotKit/langgraph4j: **NIEpotrzebne** do celu kursu; klasyczny chat + pipeline narzędzi wystarczy

**Ryzyka:** mniej „wow” produktowo; trzeba dodać narrację „misji” i konkretną stawkę biznesową.

---

## Opcja 3 — Compliance Q&A + Evidence Builder
**Opis:** asystent odpowiadający na pytania compliance i budujący „evidence pack” (cytaty z polityk, ślad decyzji, lista luk).  
**Dlaczego pasuje:** bankowy use-case, mocne połączenie RAG + audytowalność + kontrola halucynacji.

- Wartość edukacyjna: **4/5**
- Złożoność implementacji: **3/5**
- Zaangażowanie: **3/5**
- Fit do 5 dni: **4/5**
- Fit do Codex-first: **4/5**
- Agent internals: **5/5**
- AG-UI/CopilotKit/langgraph4j: **opcjonalne tylko pokazowo**; bez tego też osiągamy cele dydaktyczne

**Ryzyka:** może wyjść „zbyt dokumentowo”; trzeba dodać dynamiczny incident thread i decyzje GO/NO-GO.

---

## Opcja 4 — Data Quality & SQL Guard Copilot
**Opis:** asystent do walidacji jakości danych i bezpieczeństwa zapytań SQL (detekcja anty-patternów, sugestie indeksów, kontrola ryzyk).  
**Dlaczego pasuje:** mocny DB/SQL angle, dobre dla uczestników z backend i analityką.

- Wartość edukacyjna: **4/5**
- Złożoność implementacji: **2/5**
- Zaangażowanie: **3/5**
- Fit do 5 dni: **5/5**
- Fit do Codex-first: **4/5**
- Agent internals: **4/5**
- AG-UI/CopilotKit/langgraph4j: **NIE**; overkill względem efektu

**Ryzyka:** mniejsza „story value” dla części frontend/full-stack; wymaga dobrego framingu biznesowego.

---

## Opcja 5 — Team Delivery Copilot (Jira + CI/CD + PR coach)
**Opis:** asystent wspierający flow zespołu: przygotowuje plan tasków, checklisty PR, analizę ryzyk release i sugestie pipeline (cloud vs on-prem).  
**Dlaczego pasuje:** bezpośrednio łączy temat agenta z codziennym delivery i CI/CD.

- Wartość edukacyjna: **4/5**
- Złożoność implementacji: **3/5**
- Zaangażowanie: **4/5**
- Fit do 5 dni: **4/5**
- Fit do Codex-first: **4/5**
- Agent internals: **4/5**
- AG-UI/CopilotKit/langgraph4j: **NIE jako core**; można dodać 5-min wzmiankę o AG-UI

**Ryzyka:** duże ryzyko „slajdowości”, jeśli brak realistycznego mini-datasetu i konkretnych artefaktów.

---

## E2 — Analiza gałęzi `origin/Lucas-sinsay-2nd-February-CopilotKit` jako baza reuse

Źródło analizy: lokalny branch w repo `JSystems-SilkyCoders-1` + diff do `origin/master`.

### Co ta gałąź realnie zawiera
- Duży, pełny PoC end-to-end: **Spring Boot WebFlux + LangGraph4j + AG-UI/SSE + Next.js 16 + CopilotKit + testy E2E**.
- Bardzo szeroki zakres zmian (duża liczba plików, frontend + backend + docs + test harness).
- Wiele commitów naprawczych dotyczących niezawodności flow (routing grafu, form resume, fallback modeli, payload zdjęć, test flakiness).

### Co jest wartościowe do reuse w kursie NBP (high value)
1. **Narracja i artefakty architektoniczne**
   - ADR PoC, opis przepływu AG-UI/SSE, mapa komponentów.
   - Bardzo dobry materiał do pokazania „jak agent działa od środka” (eventy, tool call, system prompt, fallback).

2. **Wzorce jakości i test-honesty**
   - Widoczne podejście do testów integracyjnych i E2E oraz walka z flaky testami.
   - Dobre przykłady do Day 4/5 (quality + security + audytowalność + nieoszukiwanie testów).

3. **Wzorce bezpieczeństwa/prywatności danych wejściowych**
   - Obsługa zdjęć (resize, limity payloadu, logowanie z truncation), kontrola śladu i błędów.
   - Cenny materiał pod checkpointy bezpieczeństwa i „GO/NO-GO”.

### Co jest ryzykiem jako rdzeń 5-dniowego kursu (high risk)
1. **Zbyt wysoka złożoność startowa**
   - Stack naraz: WebFlux, LangGraph4j, AG-UI, CopilotKit, Next.js, SSE, testy E2E.
   - Ryzyko przeciążenia grupy mixed-level i utraty tempa w D1–D3.

2. **Duży narzut operacyjny i debugowy**
   - Historia commitów pokazuje liczne naprawy edge-case’ów (form flow, routing, fallback, payloady, test instability).
   - To dobry materiał dla advanced track, ale niebezpieczny jako wspólny core dla całej grupy.

3. **Ryzyko odejścia od celu „Codex-first”**
   - Uczestnicy mogą skupić się na frameworkowych detalach AG-UI/CopilotKit zamiast na uniwersalnym workflow agenta.

### Decyzja reuse (dla NBP)
- **Reuse TAK (core):**
  - wybrane diagramy/flow z ADR,
  - przykłady narzędziowego przepływu agenta (tool call → formularz → werdykt),
  - case’y jakości i stabilności testów jako materiał dydaktyczny.
- **Reuse TAK (optional demo):**
  - 5–10 min pokaz AG-UI/CopilotKit „jak to może wyglądać” na gotowym fragmencie.
- **Reuse NIE (core implementation):**
  - pełne odtwarzanie brancha CopilotKit jako głównej ścieżki implementacyjnej w tym kursie.

## Wnioski po E1+E2 (bez finalnej rekomendacji E3)
- Najmocniejsze edukacyjnie i najbardziej „bankowo-praktyczne” są:
  1) **SOC Copilot Incident Triage**,
  2) **Legacy Refactor & Risk Assistant**.
- Obie opcje najlepiej wspierają cel kursu: **pokazać pracę agenta end-to-end**, a nie tylko „chat z LLM”.
- Branch CopilotKit to **świetna baza referencyjna i demo-optional**, ale **zbyt ciężka jako rdzeń** 5-dniowej ścieżki dla mixed audience.
- **AG-UI/CopilotKit/langgraph4j**: w tej edycji kursu jako **opcjonalny krótki wgląd**, nie jako core.

> Kolejne kroki:
> - E3: finalna rekomendacja (single preferred + fallback).
