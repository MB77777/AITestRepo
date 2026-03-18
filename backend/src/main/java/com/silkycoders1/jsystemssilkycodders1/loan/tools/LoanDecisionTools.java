package com.silkycoders1.jsystemssilkycodders1.loan.tools;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;

import java.util.Map;

public class LoanDecisionTools {

    private static final Map<String, String> CUSTOMER_PROFILES = Map.of(
            "CUST-1001", """
                    customerId: CUST-1001
                    segment: strong-applicant
                    employmentStatus: full-time
                    employmentMonths: 38
                    monthlyIncome: 9200
                    monthlyLiabilities: 1200
                    recentDelinquency: false
                    incomeVerified: true
                    creditHistory: clean
                    recommendedLoanType: personal-loan
                    """,
            "CUST-2002", """
                    customerId: CUST-2002
                    segment: high-debt-burden
                    employmentStatus: full-time
                    employmentMonths: 24
                    monthlyIncome: 5600
                    monthlyLiabilities: 3200
                    recentDelinquency: false
                    incomeVerified: true
                    creditHistory: leveraged
                    recommendedLoanType: personal-loan
                    """,
            "CUST-3003", """
                    customerId: CUST-3003
                    segment: missing-income-verification
                    employmentStatus: self-employed
                    employmentMonths: 16
                    monthlyIncome: 6400
                    monthlyLiabilities: 900
                    recentDelinquency: false
                    incomeVerified: false
                    creditHistory: mixed
                    recommendedLoanType: cash-loan
                    """
    );

    @Tool(description = "Fetch a synthetic loan-copilot customer profile from demo data by customer identifier.")
    public String lookupCustomerProfile(
            @ToolParam(description = "Bank customer identifier, for example CUST-1001.") String customerId
    ) {
        return CUSTOMER_PROFILES.getOrDefault(customerId, """
                customerId: unknown
                segment: unknown
                employmentStatus: unknown
                employmentMonths: 0
                monthlyIncome: 0
                monthlyLiabilities: 0
                recentDelinquency: false
                incomeVerified: false
                creditHistory: thin
                recommendedLoanType: personal-loan
                note: No curated profile found. Ask the user for the missing details.
                """);
    }

    @Tool(description = "Evaluate a consumer loan application with deterministic MVP rules and return recommendation plus rationale.")
    public String assessLoanApplication(
            @ToolParam(description = "Customer identifier used for audit and lookup.") String customerId,
            @ToolParam(description = "Requested loan type, for example personal-loan, cash-loan, or car-loan.") String loanType,
            @ToolParam(description = "Requested loan amount in PLN.") int requestedAmount,
            @ToolParam(description = "Employment status declared by the applicant.") String employmentStatus,
            @ToolParam(description = "Number of months in current employment.") int employmentMonths,
            @ToolParam(description = "Verified net monthly income in PLN.") double monthlyIncome,
            @ToolParam(description = "Current monthly liabilities in PLN.") double monthlyLiabilities,
            @ToolParam(description = "Whether income verification documents are complete.") boolean incomeVerified,
            @ToolParam(description = "Whether recent repayment issues or delinquency exist.") boolean recentDelinquency,
            @ToolParam(description = "Short credit history label such as clean, thin, leveraged, or mixed.") String creditHistory
    ) {
        if (monthlyIncome <= 0) {
            return """
                    outcome: Needs Verification
                    rationale:
                    - Monthly income is missing or invalid.
                    - Request updated income evidence before continuing.
                    nextAction: Ask for corrected financial data.
                    """;
        }

        var estimatedInstallment = requestedAmount / 36.0;
        var debtRatio = (monthlyLiabilities + estimatedInstallment) / monthlyIncome;

        if (!incomeVerified) {
            return """
                    outcome: Needs Verification
                    rationale:
                    - Income documentation is incomplete.
                    - The case cannot be auto-approved without updated proof of income.
                    nextAction: Request income verification and resume the case.
                    """;
        }

        if (recentDelinquency) {
            return """
                    outcome: Reject
                    rationale:
                    - Recent delinquency or late-payment history breaches MVP policy.
                    - Explain that repayment history must improve before reconsideration.
                    nextAction: Record rejection and communicate business reasons.
                    """;
        }

        if (debtRatio > 0.55) {
            return """
                    outcome: Reject
                    rationale:
                    - Debt-to-income ratio exceeds the safe demo threshold of 55%.
                    - Existing liabilities leave insufficient repayment capacity.
                    nextAction: Offer a smaller amount or capture a manual override reason.
                    """;
        }

        if (employmentMonths < 6 || "thin".equalsIgnoreCase(creditHistory) || requestedAmount > 50000) {
            return """
                    outcome: Needs Verification
                    rationale:
                    - The applicant requires additional manual review due to stability or policy boundary checks.
                    - Borderline cases should not be auto-decided in the MVP.
                    nextAction: Escalate for manual verification with supporting notes.
                    """;
        }

        return """
                outcome: Approve
                rationale:
                - Disposable income and current liabilities support the requested amount.
                - Employment and repayment indicators are within the safe MVP range.
                - Recommendation is deterministic and based on the current demo policy.
                nextAction: Present recommendation and capture employee action if needed.
                summary:
                - customerId: %s
                - loanType: %s
                - requestedAmount: %d
                - debtRatio: %.2f
                - employmentStatus: %s
                """.formatted(customerId, loanType, requestedAmount, debtRatio, employmentStatus);
    }

    @Tool(description = "Persist the employee decision or override after explicit human approval.")
    public String recordDecisionOutcome(
            @ToolParam(description = "Customer identifier tied to the case.") String customerId,
            @ToolParam(description = "System recommendation shown to the employee.") String recommendation,
            @ToolParam(description = "Employee action such as accept, reject, or override.") String employeeAction,
            @ToolParam(description = "Short audit note or override reason.") String reason
    ) {
        return "Decision saved for %s with recommendation=%s and employeeAction=%s. Audit note: %s"
                .formatted(customerId, recommendation, employeeAction, reason);
    }
}
