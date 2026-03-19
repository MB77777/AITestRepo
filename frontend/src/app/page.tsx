"use client";

import { useCoAgent } from "@copilotkit/react-core";
import { ChatWithApproval } from "./component/chatApproval";

export default function Home() {
  const { state, setState } = useCoAgent<{ locale: string; workflow: string }>({
    name: "agent",
    initialState: {
      locale: "pl-PL",
      workflow: "loan-copilot-template"
    }
  });

  return (
    <main className="shell">
      <section className="hero">
        <article className="hero-card">
          <div className="eyebrow">CopilotKit Template</div>
          <h1 className="hero-title">Loan Decision Copilot Starter</h1>
          <p className="hero-copy">
            This base app wires a Next.js CopilotKit UI to a Spring Boot backend using AG-UI and LangGraph4j.
            It already supports streaming answers and tool approval handoffs.
          </p>

          <div className="pill-row">
            <span className="pill">AG-UI transport</span>
            <span className="pill">LangGraph4j agent</span>
            <span className="pill">OpenRouter model</span>
            <span className="pill">Approval workflow</span>
          </div>

          <div className="toolbar">
            <button
              className="primary-btn"
              onClick={() =>
                setState({
                  ...state,
                  locale: state.locale === "pl-PL" ? "en-US" : "pl-PL"
                })
              }
            >
              Toggle Locale
            </button>
            <button
              className="secondary-btn"
              onClick={() =>
                setState({
                  ...state,
                  workflow: state.workflow === "loan-copilot-template" ? "custom-workflow" : "loan-copilot-template"
                })
              }
            >
              Toggle Workflow
            </button>
          </div>

          <div className="meta-grid">
            <div className="meta-box">
              <span className="meta-label">Agent</span>
              <span className="meta-value">agent</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Locale</span>
              <span className="meta-value">{state.locale}</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Workflow</span>
              <span className="meta-value">{state.workflow}</span>
            </div>
            <div className="meta-box">
              <span className="meta-label">Try asking</span>
              <span className="meta-value">Draft a decision memo and email it</span>
            </div>
          </div>
        </article>

        <section className="chat-card">
          <ChatWithApproval />
        </section>
      </section>
    </main>
  );
}
