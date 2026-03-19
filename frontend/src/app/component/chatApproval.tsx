"use client";

import { useCopilotAction } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";

export function ChatWithApproval() {
  useCopilotAction({
    name: "sendEmail",
    description: "Sends an email after user approval.",
    parameters: [
      { name: "to", type: "string" },
      { name: "subject", type: "string" },
      { name: "body", type: "string" }
    ],
    renderAndWaitForResponse: ({ args, status, respond }) => {
      if (status === "inProgress") {
        return (
          <div className="approval-overlay">
            <div className="approval-card">
              <h2>Preparing approval</h2>
              <p>The agent is preparing an email proposal for your confirmation.</p>
            </div>
          </div>
        );
      }

      if (status === "executing") {
        return (
          <div className="approval-overlay">
            <div className="approval-card">
              <h2>Confirm outbound action</h2>
              <p>
                Send email to <strong>{args.to}</strong> with subject <strong>{args.subject}</strong>?
              </p>
              <p>{args.body}</p>
              <div className="approval-actions">
                <button className="approval-approve" onClick={() => respond?.("APPROVED")}>
                  Approve
                </button>
                <button className="approval-reject" onClick={() => respond?.("REJECTED")}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      }

      return null;
    }
  });

  return (
    <CopilotSidebar
      className="h-full"
      instructions="You are the template assistant for a loan copilot application. Keep answers short and actionable."
      labels={{
        title: "Loan Copilot",
        initial: "Start with a question about an applicant, a decision memo, or ask me to draft an email."
      }}
    />
  );
}
