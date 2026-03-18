package com.silkycoders1.jsystemssilkycodders1.loan.workflow;

import com.agui.core.agent.RunAgentParameters;
import com.agui.core.message.BaseMessage;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.AGUIAbstractLangGraphAgent;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.Approval;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.GraphData;
import com.silkycoders1.jsystemssilkycodders1.loan.tools.LoanDecisionTools;
import org.bsc.langgraph4j.CompileConfig;
import org.bsc.langgraph4j.GraphInput;
import org.bsc.langgraph4j.GraphRepresentation;
import org.bsc.langgraph4j.GraphStateException;
import org.bsc.langgraph4j.action.InterruptionMetadata;
import org.bsc.langgraph4j.checkpoint.MemorySaver;
import org.bsc.langgraph4j.spring.ai.agentexecutor.AgentExecutorEx;
import org.bsc.langgraph4j.spring.ai.util.MessageUtil;
import org.bsc.langgraph4j.state.AgentState;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.bsc.langgraph4j.utils.CollectionsUtils.lastOf;

public class LoanDecisionAgent extends AGUIAbstractLangGraphAgent {

    private final MemorySaver saver = new MemorySaver();
    private final ChatModel chatModel;
    private final LoanDecisionTools loanDecisionTools;

    public LoanDecisionAgent(ChatModel chatModel, LoanDecisionTools loanDecisionTools) {
        this.chatModel = chatModel;
        this.loanDecisionTools = loanDecisionTools;
    }

    @Override
    protected GraphData buildStateGraph() throws GraphStateException {
        var agent = AgentExecutorEx.builder()
                .chatModel(chatModel)
                .emitStreamingEnd(true)
                .streaming(true)
                .toolsFromObject(loanDecisionTools)
                .approvalOn(
                        "recordDecisionOutcome",
                        (nodeId, state) -> InterruptionMetadata.builder(nodeId, state).build()
                )
                .build();

        log.info(
                "Loan Decision Agent graph:%n{}",
                agent.getGraph(GraphRepresentation.Type.PLANTUML, "Loan Decision Copilot", false).content()
        );

        return new GraphData(agent.compile(CompileConfig.builder().checkpointSaver(saver).build()));
    }

    @Override
    protected GraphInput buildGraphInput(RunAgentParameters input) {
        var lastUserMessage = lastOf(input.getMessages())
                .map(BaseMessage::getContent)
                .orElseThrow(() -> new IllegalStateException("last user message not found"));

        var stateSummary = input.getState() == null ? "none" : input.getState().toString();
        var prompt = """
                You are Loan Decision Copilot for bank employees.
                Work only within this MVP scope:
                - detect when the conversation is about a loan application,
                - collect or confirm missing application fields,
                - use lookupCustomerProfile for demo customer data,
                - use assessLoanApplication for deterministic recommendation,
                - use recordDecisionOutcome only when the user explicitly wants to save or override a decision.
                Business rules:
                - Keep explanations clear and non-technical.
                - Use Needs Verification whenever the data is incomplete or policy boundaries are unclear.
                - Do not invent missing financial facts if the tools or user did not provide them.
                - When a write action is needed, ask for confirmation through the approval flow.
                Frontend state summary: %s

                Latest employee message:
                %s
                """.formatted(stateSummary, lastUserMessage);

        return GraphInput.args(Map.of("messages", new UserMessage(prompt)));
    }

    @Override
    protected <S extends AgentState> List<Approval> onInterruption(
            RunAgentParameters input,
            InterruptionMetadata<S> state
    ) {
        var messages = state.state().<List<Message>>value("messages")
                .orElseThrow(() -> new IllegalStateException("messages not found in interrupted state"));

        return lastOf(messages)
                .flatMap(MessageUtil::asAssistantMessage)
                .filter(AssistantMessage::hasToolCalls)
                .map(AssistantMessage::getToolCalls)
                .map(toolCalls -> toolCalls.stream()
                        .map(toolCall -> {
                            var id = toolCall.id().isBlank() ? UUID.randomUUID().toString() : toolCall.id();
                            return new Approval(id, toolCall.name(), toolCall.arguments());
                        })
                        .toList())
                .orElseGet(List::of);
    }
}
