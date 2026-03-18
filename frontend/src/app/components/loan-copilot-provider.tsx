"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { useEffect, useState } from "react";

const STORAGE_KEY = "loan-copilot-thread-id";

function getOrCreateThreadId() {
  if (typeof window === "undefined") {
    return "loan-copilot-thread";
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return stored;
  }

  const nextId = window.crypto?.randomUUID?.() ?? `loan-copilot-${Date.now()}`;
  window.localStorage.setItem(STORAGE_KEY, nextId);
  return nextId;
}

export function LoanCopilotProvider({ children }: { children: React.ReactNode }) {
  const [threadId, setThreadId] = useState("loan-copilot-thread");

  useEffect(() => {
    setThreadId(getOrCreateThreadId());
  }, []);

  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="loanDecisionAgent" threadId={threadId}>
      {children}
    </CopilotKit>
  );
}
