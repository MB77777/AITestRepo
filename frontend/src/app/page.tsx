import { LoanCopilotSidebar } from "./components/loan-copilot-sidebar";

export default function Home() {
  return (
    <main className="loan-shell">
      <section className="loan-hero">
        <span className="loan-kicker">AG-UI over HTTP/SSE</span>
        <h1 className="loan-title">Loan Decision Copilot</h1>
        <p className="loan-copy">
          Assistant dla pracownika banku. Rozpoznaje flow pożyczkowy, dopytuje o brakujące dane,
          uruchamia deterministyczny scoring MVP i zostawia approval tylko dla działań skutkowych.
        </p>
        <div className="loan-metrics">
          <article className="loan-metric">
            <strong>Transport</strong>
            POST <code>/sse/loan-decision-agent</code> kompatybilny z <code>@ag-ui/client</code>.
          </article>
          <article className="loan-metric">
            <strong>State</strong>
            <code>threadId</code> jest utrzymywany w <code>localStorage</code>, więc checkpoint i resume
            działają między wiadomościami.
          </article>
          <article className="loan-metric">
            <strong>Approval</strong>
            Potwierdzenie jest wymagane tylko przy zapisie decyzji do audit trail.
          </article>
        </div>
      </section>
      <section className="loan-chat">
        <div className="loan-chat-card">
          <LoanCopilotSidebar />
        </div>
      </section>
    </main>
  );
}
