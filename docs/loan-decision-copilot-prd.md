# Loan Decision Copilot MVP PRD

## 1. Problem Statement
Bank employees handling consumer loan requests often work across fragmented tools, manual checklists, and partially complete customer records. In a typical branch or call center interaction, the employee must first determine whether the customer is actually requesting a loan, then collect application details, manually look up customer history, assess affordability, and document the basis for the decision. This creates avoidable delay, inconsistency, and compliance exposure.

Current pain points for bank employees:
- Intent capture is manual. Employees spend time clarifying whether a customer is asking a general question, requesting a quote, or starting an application.
- Data collection is repetitive. Employees re-enter customer information that already exists in internal systems and still need to ask follow-up questions when mandatory data is missing.
- Credit decision preparation is slow. Employees must interpret income, liabilities, repayment history, and requested amount before reaching even a preliminary recommendation.
- Explanations are inconsistent. Two employees may give different justifications for similar cases, reducing trust and making QA difficult.
- Audit evidence is incomplete. In many manual flows, it is hard to reconstruct which data was used, which score was calculated, what recommendation was shown, and whether the employee accepted or overrode it.

Current pain points for customers:
- The process feels slow and opaque, especially when a simple eligibility question turns into a long intake flow.
- Customers are asked for information the bank may already know, which increases frustration.
- They may receive a decision outcome without understanding the main reasons behind it or what additional information is needed.

For this MVP, the product solves those issues by giving the employee a guided chat-based interface that detects loan intent, generates the right form at the right time, retrieves customer context automatically, produces a recommendation with clear rationale, and records a complete audit trail. The target improvement for the MVP is to reduce preliminary decision preparation time from an estimated 10-15 minutes in a manual demo flow to under 3 minutes in the assisted flow, while ensuring every decision step is logged.

## 2. Users / Personas

### Persona 1: Loan Advisor
- Role and responsibility: Frontline bank employee responsible for handling consumer loan requests, gathering application details, and communicating the preliminary outcome to the customer.
- Key goals when using the system: Start applications quickly, avoid retyping known data, receive a clear recommendation, and explain the outcome confidently.
- Pain points and frustrations: Too many manual checks, inconsistent information across screens, missing data discovered late in the process, and pressure to move quickly while staying compliant.
- Technical proficiency level: Medium. Comfortable with standard banking systems and forms, but not expected to understand scoring logic implementation details.
- Working context: Branch office or back-office operations desk.

### Persona 2: Contact Center Agent
- Role and responsibility: Handles inbound customer chat or phone-assisted chat sessions, qualifies intent, captures application details, and escalates cases when needed.
- Key goals when using the system: Detect loan-related requests fast, keep the conversation moving, minimize handling time, and know when a case requires manual verification.
- Pain points and frustrations: Customers often describe needs imprecisely, conversations branch unpredictably, and manual note-taking increases error risk.
- Technical proficiency level: Medium to low. Strong process knowledge, but limited patience for complex interfaces.
- Working context: Call center or remote support environment, often under time-based performance targets.

### Persona 3: Compliance / Audit Reviewer
- Role and responsibility: Reviews decision records to confirm the bank can explain and evidence how a recommendation was produced and what the employee did with it.
- Key goals when using the system: Reconstruct the full decision path, confirm required controls were followed, and identify missing or inconsistent records.
- Pain points and frustrations: Partial logs, unclear links between retrieved data and final recommendations, and difficulty proving whether an employee saw or overrode the system output.
- Technical proficiency level: Medium. Comfortable with structured records and policy evidence, but not dependent on engineering-level system knowledge.
- Working context: Central office or hybrid compliance function.

## 3. Main Flow
Happy path from intent detection to recommendation delivery:

1. The employee begins a chat session with a customer or continues an existing customer service conversation.
2. The customer expresses a need related to borrowing money, such as asking for a personal loan or financing a purchase.
3. The AI agent classifies the message as loan-application intent with sufficient confidence.
4. The system responds in chat with a short confirmation, for example that it can help start a loan application, and presents a dynamic form in the conversation pane.
5. The form is tailored to the detected loan type and requested amount range. Required fields are shown first; irrelevant fields are hidden.
6. The employee reviews any prefilled fields sourced from existing customer records and asks the customer only for missing or changed information.
7. The employee submits the form.
8. The system validates that all required fields are present and correctly formatted. If validation fails, the system highlights the missing or invalid fields and prevents scoring until corrected.
9. After successful validation, the system retrieves existing customer data and financial history relevant to the application context.
10. The system calculates the credit score and derives a recommendation outcome: approve, reject, or needs verification.
11. The system generates a plain-language justification that cites the main decision factors, such as affordability, prior repayment behavior, or missing verification.
12. The recommendation is displayed in the chat interface with:
- The recommendation status.
- A confidence or rule-match summary appropriate for internal staff.
- The main reasons behind the recommendation.
- Any missing documents or next actions if the case needs verification.
13. The employee opens the recommendation details view and discusses the result with the customer.
14. The employee either accepts the recommendation, records a final manual decision if the MVP supports this step, or marks the case for follow-up verification.
15. The system records all relevant actions in the audit trail, including intent detection, form display, data retrieval, scoring, recommendation generation, recommendation view, and employee action.

Key decision points and system responses:
- If loan intent is not detected confidently, the system continues normal chat and does not show the application form.
- If mandatory input is missing, the system blocks submission and explains what must be completed.
- If customer data retrieval is incomplete, the system returns a "needs verification" recommendation rather than a silent failure.
- If scoring produces a reject result, the system must still show the top contributing factors in clear, non-technical language suitable for internal staff communication.

## 4. User Stories
1. As a contact center agent, I want the system to detect when a customer intends to apply for a loan, so that I can start the correct process without manually interpreting every message.
2. As a loan advisor, I want the system to display a dynamic loan application form inside the chat flow, so that I can collect only the information relevant to the current request.
3. As a loan advisor, I want known customer details to be prefilled from existing records, so that I do not need to ask for or re-enter information the bank already has.
4. As a loan advisor, I want the system to validate required application fields before submission, so that I can avoid incomplete or invalid applications entering the scoring step.
5. As a loan advisor, I want the system to retrieve the customer's financial history for the application automatically, so that I can assess the case without switching tools.
6. As a loan advisor, I want the system to calculate a credit score and recommendation, so that I can receive a consistent preliminary decision.
7. As a loan advisor, I want the recommendation to include a clear justification, so that I can explain the outcome to the customer and understand the main decision drivers.
8. As a compliance reviewer, I want every decision-related system and employee action logged, so that I can reconstruct the case for audit and regulatory review.
9. As a loan advisor, I want the system to show when a recommendation requires manual verification, so that I know which cases cannot be completed immediately.
10. As a supervisor or QA reviewer, I want to see whether an employee accepted, rejected, or overrode the system recommendation, so that I can monitor process adherence and training needs.

## 5. Acceptance Criteria

### User Story 1: Intent detection
- The system classifies loan-application intent from a customer message and triggers the loan flow when intent confidence meets the configured threshold.
- For test utterances defined in the MVP test set, the system identifies loan-related intent correctly in at least 90% of positive examples and does not trigger the flow in at least 85% of non-loan examples.
- When the threshold is met, the dynamic form appears within 2 seconds of the triggering message.
- When the threshold is not met, the system does not display the form and continues the general chat flow.
- The audit trail stores the triggering message ID, detected intent label, confidence score, timestamp, and employee user ID tied to the session.

### User Story 2: Dynamic form display
- The system displays a form embedded in the chat interface after loan intent is detected.
- The form layout changes based on loan type and amount band, showing only relevant fields for the detected scenario.
- Required fields are visually marked before submission.
- The employee can complete and submit the form without leaving the chat screen.
- The form renders on supported desktop screen sizes from 1366x768 upward without horizontal scrolling in the main content area.
- The audit trail logs form version, fields shown, timestamp, and session ID.

### User Story 3: Prefilled customer details
- When an existing customer is identified, the system prepopulates available fields such as name, customer ID, employment status, known monthly income, and current liabilities if those values exist in the source records.
- Prefilled values are visually distinguishable from manually entered values.
- The employee can edit prefilled fields if the customer states the information has changed.
- Fields with no source value remain empty and editable.
- Data retrieval and prefill complete within 2 seconds for 95% of requests under normal load.
- The audit trail logs which fields were prefilled, the source retrieval event, and whether the employee changed any prefilled value.

### User Story 4: Input validation
- The system prevents form submission when required fields are empty, incorrectly formatted, or outside allowed ranges.
- Validation messages identify the exact field and required correction.
- Numeric fields reject non-numeric characters except permitted separators.
- The allowed loan amount range for the MVP is enforced consistently based on the product rules defined for demo scenarios.
- Validation feedback appears within 500 milliseconds after submission attempt.
- Failed submission attempts are logged with field-level error codes, timestamp, and employee user ID.

### User Story 5: Financial history retrieval
- After valid form submission, the system retrieves the customer's relevant financial history needed for decisioning.
- The retrieval includes, at minimum, current income, employment status, existing liabilities, repayment history, and prior delinquency indicators if available.
- If all required data is available, the system proceeds automatically to scoring.
- If critical data is missing or retrieval fails, the system produces a "needs verification" outcome instead of an approval or rejection.
- Data retrieval finishes within 3 seconds for 95% of requests under normal MVP load.
- The audit trail logs the retrieval start and end timestamps, data categories retrieved, customer record identifier, success or failure status, and any missing-data flags.

### User Story 6: Score and recommendation calculation
- The system calculates a score using the defined MVP rules immediately after successful data retrieval.
- The system maps the score or rule outcome to one of exactly three statuses: `Approve`, `Reject`, or `Needs Verification`.
- The same input data must always return the same score and recommendation.
- Score calculation and recommendation generation complete within 1 second after data retrieval for 95% of requests.
- If scoring cannot be completed due to inconsistent input data, the system returns `Needs Verification` and records the reason.
- The audit trail logs the score value, recommendation status, rule set version, calculation timestamp, and key decision factors used.

### User Story 7: Recommendation justification
- The recommendation view includes a short written explanation containing the top 2-4 factors that most influenced the outcome.
- The explanation avoids internal engineering terminology and is understandable by bank employees without model expertise.
- For `Reject` and `Needs Verification` outcomes, the explanation includes at least one actionable next step or missing requirement where applicable.
- The employee can expand a details view to inspect the underlying factors that contributed to the recommendation.
- The recommendation view loads within 1 second after the recommendation is produced.
- The audit trail logs recommendation generation, recommendation display, and the employee's first view timestamp.

### User Story 8: Audit logging
- The system logs every required event in a complete case timeline tied to session ID and employee user ID.
- Required logged actions for MVP are intent detected, form displayed, form submitted, validation failure if any, customer data retrieved from the database, credit score calculated, recommendation generated, employee viewed recommendation, and employee accepted, rejected, or overrode the recommendation.
- Each logged action must include a timestamp.
- The log entries are ordered and queryable by case.
- No decision can be finalized in the MVP workflow without a corresponding audit record for recommendation generation and employee action.
- Audit records must be retained for all demo/test sessions unless deliberately purged by a non-MVP administrative process.

### User Story 9: Manual verification handling
- When required verification conditions are met, the system shows `Needs Verification` instead of `Approve` or `Reject`.
- The UI clearly distinguishes `Needs Verification` from an error state.
- The recommendation explains what additional review or missing information is required.
- The employee can mark the case as pending follow-up from the same view.
- The system records the manual-verification reason code and any employee note captured during handoff.

### User Story 10: Employee final action tracking
- After viewing the recommendation, the employee can record one of three actions: `Accept Recommendation`, `Reject Recommendation`, or `Override Recommendation`.
- If `Override Recommendation` is selected, the employee must provide a mandatory reason.
- The system saves the employee action within 1 second of submission.
- Supervisory review data must include the original recommendation, the employee action, the override reason if applicable, and timestamp.
- The audit trail records the action event, acting user ID, recommendation state at the time of action, and any note entered.

## 6. Non-Functional Constraints and Risks

### Non-Functional Constraints

#### Performance
- The MVP must support at least 100 concurrent chat sessions without loss of core functionality.
- Intent detection response time must be no more than 2 seconds for 95% of requests.
- Form prefill and customer data retrieval must complete within 3 seconds for 95% of requests.
- Recommendation generation after data retrieval must complete within 1 second for 95% of requests.
- End-to-end time from valid form submission to displayed recommendation should not exceed 5 seconds for 95% of requests.

#### Availability and uptime requirements
- Target availability for the educational MVP is 99.0% during scheduled demo and testing windows.
- The system must fail visibly rather than silently; if a recommendation cannot be produced, the employee must see a clear system status or `Needs Verification` outcome.
- Active chat sessions should not lose already entered form data during a transient refresh or reconnect within the same session window.

#### Security requirements
- All customer data displayed in the UI must be restricted to authenticated bank staff with role-based access appropriate to their function.
- Sensitive customer data must be encrypted in transit and protected from exposure in UI logs or browser storage beyond the active session.
- The UI must display only the minimum customer information needed to support the decision task.
- Employee actions must be attributable to a unique user ID; shared anonymous usage is not acceptable for auditable flows.

#### Compliance requirements
- Every decision-related step must be logged with timestamp, user ID, session ID, and case identifier.
- The system must preserve the rationale shown to the employee at the time of decision so that later reviewers can reconstruct what the employee saw.
- The recommendation must be explainable at a business level and cannot be presented as an unexplained black-box result.
- The product must support internal control review by distinguishing system recommendation from employee final action.

### Risks

| Risk | Type | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| Incorrect or unstable scoring outcomes due to faulty rules | Technical | Medium | High | Use deterministic MVP rules, version them, and validate against fixed test scenarios before demos |
| Customer data retrieval failure or timeout | Technical | Medium | High | Return `Needs Verification`, surface clear UI messaging, and log retrieval failure reasons |
| Poor data quality in customer financial history | Technical | High | High | Prepare curated demo data, flag missing critical fields, and avoid silent assumptions in scoring |
| Intent detector triggers the form on unrelated messages | Technical | Medium | Medium | Use a threshold, maintain negative test examples, and let employee dismiss the form |
| Employees rely on recommendation without understanding limitations | Business | Medium | High | Show clear justification, label as preliminary recommendation, and require explicit employee action |
| Decision bias from oversimplified scoring factors | Business | Medium | High | Keep rules transparent, review scenarios for unfair outcomes, and position MVP as educational rather than production-ready |
| Regulatory concern over incomplete audit evidence | Business | Low | High | Make audit logging a release blocker and test required log events in QA |
| Low user adoption because the chat flow feels slower than a form | Business | Medium | Medium | Optimize the happy path, prefill known data, and keep the form embedded in chat rather than redirecting users |
| Employees misunderstand `Needs Verification` as a system error | User | Medium | Medium | Use explicit status wording, action guidance, and a distinct UI treatment for verification-required cases |
| Users distrust recommendations if explanations are too vague | User | Medium | Medium | Require explanation quality in acceptance tests and show top contributing factors consistently |

## 7. MVP Scope / Out of Scope

### In Scope
- Chat-based interface for bank employees handling customer loan conversations.
- Loan intent detection from customer conversation.
- Dynamic in-chat application form tailored by loan type and amount band.
- Prefill of existing customer and financial profile data where available.
- Field validation before submission.
- Automatic retrieval of customer financial history relevant to decisioning.
- Deterministic MVP scoring and recommendation with three outcomes: approval, rejection, needs verification.
- Recommendation view with clear business justification.
- Complete audit trail for decision-related system and employee actions.
- Basic employee action capture for accepting, rejecting, or overriding the recommendation.

### Out of Scope
- CRM integration or synchronization with external relationship-management platforms.
- Multi-currency support.
- Advanced reporting dashboards beyond case-level review.
- Mobile application.
- Public or third-party API exposure.
- AI model training, fine-tuning, or self-learning behavior in production.
- Custom workflow rules per branch, team, or product line.
- Real credit bureau integration.
- KYC, AML, fraud screening, e-signature, or disbursement workflows.
- Complex approval chains involving multiple approvers.
- Production-grade adverse action notice generation.

## 8. Test Data Assumptions
The MVP should be prepared with at least 5 demo scenarios covering all recommendation outcomes and key edge cases. All test data must be synthetic and clearly labeled as non-production.

### Recommended demo scenarios

| Scenario | Customer profile | Loan type | Loan amount | Expected recommendation |
|---|---|---|---|---|
| 1. Strong applicant | Stable full-time employment, high disposable income, no delinquency, low existing debt | Personal loan | 20,000 | Approval |
| 2. High debt burden | Full-time employment, moderate income, multiple active liabilities, high debt-to-income ratio | Personal loan | 35,000 | Rejection |
| 3. Missing income verification | Self-employed, irregular income records, no serious delinquency, incomplete latest income documentation | Cash loan | 15,000 | Needs Verification |
| 4. Prior repayment issues | Employed, acceptable income, recent late payments or delinquency event | Car loan | 25,000 | Rejection |
| 5. Borderline but recoverable | New employment, medium income, low liabilities, thin credit history | Personal loan | 10,000 | Needs Verification |

### Scenario details
- Scenario 1: Income level is high and stable, credit history is clean, employment is permanent for more than 24 months, and the expected result is `Approval` because affordability is strong and repayment history is positive.
- Scenario 2: Income level is medium, credit history has no major delinquency but current obligations are heavy, employment is permanent, and the expected result is `Rejection` because debt burden exceeds the acceptable threshold.
- Scenario 3: Income level is variable, credit history is neutral to positive, employment is self-employed, and the expected result is `Needs Verification` because critical supporting data is missing or unstable.
- Scenario 4: Income level is medium to high, credit history includes recent missed payments, employment is permanent, and the expected result is `Rejection` because past repayment behavior breaches the MVP rule set.
- Scenario 5: Income level is medium, credit history is thin or limited, employment changed recently, and the expected result is `Needs Verification` because affordability may be acceptable but stability evidence is incomplete.

### Edge cases and boundary conditions
- Minimum allowed loan amount.
- Maximum allowed loan amount.
- Applicant with zero existing liabilities.
- Applicant with missing employment status.
- Applicant with contradictory data between prefilled records and manually entered form values.
- Intent message that mentions money but is not actually a loan request.
- Very high requested amount that should force rejection or verification according to MVP rules.
- Existing customer with no repayment history on file.

### Assumptions
- The customer data source is available during normal MVP operation, but the system must handle temporary unavailability gracefully.
- Existing customer records are sufficiently current for demo purposes, though employees may still edit prefilled values when the customer provides updated information.
- The recommendation produced by the MVP is a preliminary internal recommendation, not a final legally binding credit decision.
- Employee users are authenticated and have a unique internal user ID available for audit logging.
- Loan products in the MVP are limited to a small, predefined set of demo loan types and amount ranges.
