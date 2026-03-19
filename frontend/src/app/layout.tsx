import type { Metadata } from "next";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Copilot Template",
  description: "CopilotKit + LangGraph4j + AG-UI starter wired to a Spring backend"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CopilotKit runtimeUrl="/api/copilotkit" agent="agent">
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
