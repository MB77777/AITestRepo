# Loan Decision Copilot MVP PRD

## 1. Problem Statement
Customers seeking a loan often face a slow and fragmented early-stage process. They must explain their need, provide identification details, answer eligibility questions, and wait for an initial assessment. In traditional flows, this first step depends on human availability, inconsistent questioning, and manual review of existing customer records.

This creates practical business and user problems:

- Customers wait too long for an initial answer.
- Early intake is inconsistent across cases.
- Existing customer data is not used efficiently, so customers repeat information the bank may already hold.
- Customers may abandon the journey if the process feels slow or unclear.
- Recommendation outcomes are difficult to trust if reasons are not clearly explained.
- Compliance risk increases if interactions, retrieved data, and decisions are not fully traceable.

The MVP addresses this by replacing the first human interaction with an AI-led chat that detects loan intent, identifies the customer using `PESEL` or `VAT ID`, gathers only the required information, retrieves available internal data, produces a preliminary recommendation, and logs a complete audit trail.

## 2. Users / Personas

### Persona 1: Individual Applicant
- Role and responsibility:
  Retail customer applying for a personal or cash loan through self-service chat.
- Key goals when using the system:
  Get a quick preliminary decision, avoid repeating known information, and understand what happens next.
- Pain points and frustrations:
  Long wait times, repetitive questions, unclear rejection reasons, and confusing next steps.
- Technical proficiency level:
  Medium.
- Working context:
  Self-service on mobile or desktop, often outside branch hours.

### Persona 2: Small Business Applicant
- Role and responsibility:
  Business owner or representative applying for a basic business loan using `VAT ID`.
- Key goals when using the system:
  Receive a fast initial assessment and complete only relevant steps.
- Pain points and frustrations:
  Overly generic flows, excessive data entry, and poor explanation of non-approval outcomes.
- Technical proficiency level:
  Medium to high.
- Working context:
  Office or remote, usually time-constrained.

### Persona 3: Compliance / Operations Reviewer
- Role and responsibility:
  Internal user reviewing completed cases and audit history after customer interaction.
- Key goals when using the system:
  Reconstruct what the customer entered, what the system retrieved, and why the recommendation was produced.
- Pain points and frustrations:
  Missing event logs, weak traceability, and no distinction between customer input and system output.
- Technical proficiency level:
  Medium.
- Working context:
  Back-office review, not part of the customer journey.

## 3. Main Flow
Happy path:

1. The customer opens chat and expresses intent to get a loan.
2. The AI detects loan intent and starts the loan application flow.
3. The AI asks whether the customer is applying as an individual or a business.
4. The AI requests `PESEL` for individuals or `VAT ID` for businesses.
5. The customer submits the identifier.
6. The system validates identifier format.
7. The system searches for an exact single customer match.
8. If a match is found, the AI confirms the process can continue.
9. The AI determines the likely loan type from the conversation. If confidence is low, it asks the customer to choose.
10. The system generates a dynamic question flow based on loan type and amount.
11. The backend retrieves available customer and financial history data and uses it to reduce duplicate questions.
12. The customer provides missing or updated data.
13. The system validates required inputs.
14. The system calculates a score and generates one of three outcomes:
   approval,
   rejection,
   needs verification.
15. The AI presents the result as a preliminary assessment, with a plain-language explanation of the top factors.
16. The AI presents the next step:
   continue to application processing,
   await verification,
   or end the flow.
17. All material actions are logged in the audit trail.

Decision points:
- If intent confidence is low, the AI asks for confirmation.
- If the identifier format is invalid, the AI asks for correction.
- If no exact single match is found, the AI stops automated recommendation and returns a fallback message.
- If data is incomplete, conflicting, or borderline, the result is `needs verification`.
- If the scoring process fails, the result is `needs verification` rather than a false approval or rejection.

## 4. User Stories
1. As a customer, I want the AI to recognize that I want a loan, so that I can begin the process immediately.
2. As a customer, I want to identify myself with `PESEL` or `VAT ID`, so that the bank can find my existing data.
3. As a customer, I want the system to validate my identifier instantly, so that I can fix mistakes without restarting.
4. As a customer, I want the system to ask only relevant questions, so that the process is fast and clear.
5. As a customer, I want the system to use existing data where possible, so that I do not re-enter known details.
6. As a customer, I want to receive a plain-language preliminary recommendation, so that I understand my likely outcome.
7. As a customer, I want unclear cases to move to verification instead of failing silently, so that I know what happens next.
8. As a compliance reviewer, I want all critical actions logged, so that I can verify traceability.
9. As a compliance reviewer, I want audit history to distinguish customer input, retrieved data, and system outputs, so that I can reconstruct the decision path.
10. As a product team member, I want the system to fail safely when lookup or scoring breaks, so that the customer experience remains controlled.

## 5. Acceptance Criteria

### User Story 1
- Loan intent is detected within 2 seconds for 95% of cases.
- If confidence is below threshold, the AI asks for explicit confirmation.
- Intent detection is logged with timestamp and session ID.

### User Story 2
- The system requires customer type selection before requesting identifier.
- The system accepts `PESEL` for individuals and `VAT ID` for businesses.
- Identifier entry is logged with masked value, identifier type, timestamp, and session ID.

### User Story 3
- Identifier format is validated within 1 second.
- Invalid format does not trigger a customer lookup.
- The customer receives a plain-language correction prompt.
- Validation result is logged.

### User Story 4
- Follow-up questions vary by loan type and amount.
- Additional questions appear when amount crosses a defined threshold.
- Each next step is shown within 2 seconds after the customer response.
- Generated question flow is logged.

### User Story 5
- Existing matched customer data is used to reduce duplicate questions.
- Only minimal data needed for recommendation is displayed in chat.
- Customer-supplied updates are stored as new declarations, not silent overwrites.
- Data retrieval completes within 3 seconds for 95% of requests.
- Retrieval event is logged.

### User Story 6
- The system returns only `approval`, `rejection`, or `needs verification`.
- The result is displayed within 3 seconds for 95% of valid submissions.
- The result is always labeled as a preliminary assessment.
- The explanation contains at least 3 top factors in plain language.
- Recommendation generation and display are logged separately.

### User Story 7
- Missing, conflicting, borderline, or unavailable scoring cases return `needs verification`.
- The customer receives a clear next-step message.
- Trigger reason category is logged.

### User Story 8
- The audit trail records at minimum:
  intent detected,
  customer type selected,
  identifier entered,
  identifier validated,
  lookup attempted,
  match result,
  loan type selected/detected,
  questions generated,
  customer answers submitted,
  data retrieved,
  validation failures,
  score calculated,
  recommendation generated,
  recommendation shown,
  flow ended.
- Every event includes timestamp, session ID, actor type, and case reference where applicable.
- Audit records are immutable in the operational UI.

### User Story 9
- Audit history shows whether each data element came from customer input, bank data, or system output.
- Audit events are shown in chronological order.
- Audit view is restricted to authorized internal reviewers.

### User Story 10
- If lookup fails, the customer receives a controlled message within 3 seconds.
- If scoring fails, the system does not produce approval or rejection.
- No step remains in indefinite loading beyond 10 seconds without status feedback.
- Failure events are logged with category and timestamp.

## 6. Non-Functional Constraints and Risks

### Non-Functional Constraints

#### Performance
- Support at least 300 concurrent chat sessions.
- Intent detection within 2 seconds for 95% of cases.
- Identifier validation within 1 second.
- Data retrieval within 3 seconds for 95% of requests.
- Recommendation generation within 3 seconds for 95% of valid cases.
- Visible status feedback if a step exceeds 2 seconds.

#### Availability and Uptime
- Target 99.5% availability during operating hours.
- Database unavailability must stop recommendation flow safely.
- Scoring unavailability must produce `needs verification` or temporary unavailable status.

#### Security
- Data in transit must be protected.
- Because there is no authentication in Phase 1, only minimal customer data may be displayed.
- Full financial history must not be exposed in chat.
- Identifiers must be masked in logs and operational views.
- Internal review screens must remain access-controlled.

#### Compliance
- Every material action must be logged.
- Recommendation justification must be retained with the result.
- Retrieved data use must be traceable.
- Audit history must be tamper-resistant for standard users.
- Records must support reconstruction of the decision path.

### Risks

| Risk | Type | Likelihood | Impact | Mitigation |
|---|---|---:|---:|---|
| Someone enters another person’s `PESEL` or company `VAT ID` | Security / Compliance | High | High | Treat output as preliminary only, minimize visible data, log all lookups |
| Incorrect identifier match | Technical / Compliance | Medium | High | Proceed only on exact single match |
| Sensitive data exposure in unauthenticated flow | Security / Compliance | High | High | Show minimal data only, mask identifiers, do not expose raw history |
| Stale or incomplete bank data | Technical | High | High | Accept customer updates as declarations, route uncertain cases to verification |
| Scoring logic produces misleading outcomes | Business / Compliance | Medium | High | Use transparent rules, keep borderline cases in verification |
| Customer interprets result as final approval | User / Compliance | Medium | High | Always label result as preliminary assessment |
| Slow chat experience reduces completion rate | UX / Business | Medium | Medium | Enforce response targets and status feedback |
| Missing audit events | Compliance | Low | High | Define mandatory events and verify in QA |

## 7. MVP Scope / Out of Scope

### In Scope
- Customer-facing AI chat
- Loan intent detection
- Individual and business entry paths
- `PESEL` / `VAT ID` collection and validation
- Exact single-match customer lookup
- Dynamic question flow by loan type and amount
- Use of existing customer data to reduce duplicate input
- Basic validation of required responses
- Preliminary recommendation:
  approval,
  rejection,
  needs verification
- Plain-language explanation of top factors
- Controlled no-match, invalid ID, incomplete data, and failure handling
- Full audit trail
- Internal audit/review interface for authorized staff

### Out of Scope
- Human consultant participation in Phase 1 primary flow
- Authentication or identity proofing
- Manual override by branch staff
- Full exposure of customer financial history in chat
- End-to-end loan origination after recommendation
- Mobile app
- Third-party APIs
- Advanced reporting dashboards
- Multi-currency support
- Fraud detection
- Document upload and OCR
- AI fine-tuning in MVP
- Binding legal credit decision

## 8. Test Data Assumptions

### Demo Scenarios
1. Individual approval
- High income, permanent employment, clean history
- Valid exact-match `PESEL`
- Personal loan, moderate amount
- Expected result: approval

2. Individual rejection
- Low income, recent delinquencies, unstable employment
- Valid exact-match `PESEL`
- Personal loan, high amount
- Expected result: rejection

3. Borderline verification
- Medium income, moderate debt, one historical issue
- Valid exact-match `PESEL`
- Cash loan, medium-high amount
- Expected result: needs verification

4. Business verification
- Short business history, mixed payment profile
- Valid exact-match `VAT ID`
- Basic business loan, moderate amount
- Expected result: needs verification

5. No-match safe failure
- Valid-format identifier with no exact customer record
- Expected result: no recommendation, controlled fallback response

### Edge Cases
- Invalid `PESEL`
- Invalid `VAT ID`
- Amount exactly on the threshold for extra questions
- Low-confidence intent detection
- Missing mandatory answer
- Conflicting customer declaration vs retrieved data
- Lookup timeout
- Scoring failure
- Customer leaves chat mid-flow

### Test Data Guidelines
- Use synthetic data only.
- Cover both retail and business flows.
- Cover all 3 recommendation outcomes.
- Include incomplete-data scenarios.
- Include minimal-data-display verification.
- Include one full audit reconstruction scenario.

### Assumptions
- Phase 1 is fully customer-facing.
- No authentication is used.
- `PESEL` is for individuals and `VAT ID` is for businesses.
- Supported products are personal loan, cash loan, and basic business loan.
- All outcomes are preliminary assessments, not final binding decisions.
- No exact single match means no automated recommendation.
- Customer corrections are stored as declared updates, not trusted replacements of source data.
- Internal reviewers have a separate controlled audit view.
- Source data may be stale or incomplete, so uncertain cases route to verification.
