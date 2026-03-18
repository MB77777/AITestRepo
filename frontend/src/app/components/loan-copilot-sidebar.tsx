"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";

type ApprovalArgs = {
  customerId?: string;
  recommendation?: string;
  employeeAction?: string;
  reason?: string;
};

export function LoanCopilotSidebar() {
  useCopilotAction({
    name: "recordDecisionOutcome",
    description: "Stores a final employee decision after explicit approval.",
    parameters: [
      { name: "customerId", type: "string", description: "Case customer identifier." },
      { name: "recommendation", type: "string", description: "System recommendation shown in chat." },
      { name: "employeeAction", type: "string", description: "Chosen employee action." },
      { name: "reason", type: "string", description: "Audit note or override reason." },
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      const approvalArgs = (args ?? {}) as ApprovalArgs;

      if (status === "inProgress") {
        return <div className="approval-card">Preparing approval request...</div>;
      }

      if (status !== "executing") {
        return <></>;
      }

      return (
        <div className="approval-card">
          <h3>Approve decision write</h3>
          <p>The assistant wants to save a decision to the audit trail.</p>
          <div className="approval-list">
            <span>
              <strong>Customer:</strong> {approvalArgs.customerId}
            </span>
            <span>
              <strong>Recommendation:</strong> {approvalArgs.recommendation}
            </span>
            <span>
              <strong>Employee action:</strong> {approvalArgs.employeeAction}
            </span>
            <span>
              <strong>Reason:</strong> {approvalArgs.reason}
            </span>
          </div>
          <div className="approval-actions">
            <button className="btn-primary" onClick={() => respond?.("APPROVED")}>
              Approve write
            </button>
            <button className="btn-secondary" onClick={() => respond?.("REJECTED")}>
              Reject
            </button>
          </div>
        </div>
      );
    },
  });

  return (
    <CopilotSidebar
      instructions={
        "You are the Loan Decision Copilot UI. Help a bank employee gather loan details, call the backend agent, and keep explanations concise and auditable."
      }
      labels={{
        title: "Loan Decision Copilot",
        initial:
          "Ask about a customer, paste a loan request, or instruct the assistant to fetch profile data and score the case.",
      }}
      defaultOpen
      clickOutsideToClose={false}
    />
  );
}
