import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import { HttpAgent } from "@ag-ui/client";
import { NextRequest } from "next/server";

const backendUrl =
  process.env.BACKEND_SSE_URL ?? "http://localhost:8080/sse/loan-decision-agent";

const serviceAdapter = new ExperimentalEmptyAdapter();
const httpAgent = new HttpAgent({
  url: backendUrl,
  initialState: {
    product: "loan-decision-copilot",
  },
});

const runtime = new CopilotRuntime({
  agents: {
    loanDecisionAgent: httpAgent as never,
  },
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
