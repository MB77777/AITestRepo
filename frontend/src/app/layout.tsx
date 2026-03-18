import type { Metadata } from "next";
import "./globals.css";
import { LoanCopilotProvider } from "./components/loan-copilot-provider";

export const metadata: Metadata = {
  title: "Loan Decision Copilot",
  description: "CopilotKit frontend for the AG-UI loan decision backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoanCopilotProvider>{children}</LoanCopilotProvider>
      </body>
    </html>
  );
}
