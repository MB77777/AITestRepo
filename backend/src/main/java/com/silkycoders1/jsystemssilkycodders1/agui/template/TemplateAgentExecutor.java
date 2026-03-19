package com.silkycoders1.jsystemssilkycodders1.agui.template;

import com.agui.core.agent.RunAgentParameters;
import com.agui.core.message.BaseMessage;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.AGUIAbstractLangGraphAgent;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.Approval;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.GraphData;
import com.silkycoders1.jsystemssilkycodders1.config.OpenRouterProperties;
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
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.model.ChatModel;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.bsc.langgraph4j.utils.CollectionsUtils.lastOf;

public class TemplateAgentExecutor extends AGUIAbstractLangGraphAgent {

    private final MemorySaver saver = new MemorySaver();
    private final ChatModel chatModel;
    private final TemplateTools tools;
    private final OpenRouterProperties properties;

    public TemplateAgentExecutor(ChatModel chatModel, TemplateTools tools, OpenRouterProperties properties) {
        this.chatModel = chatModel;
        this.tools = tools;
        this.properties = properties;
    }

    @Override
    protected GraphData buildStateGraph() throws GraphStateException {
        var agent = AgentExecutorEx.builder()
                .chatModel(chatModel)
                .streaming(true)
                .emitStreamingEnd(true)
                .toolsFromObject(tools)
                .approvalOn("sendEmail", (nodeId, state) -> InterruptionMetadata.builder(nodeId, state).build())
                .build();

        log.info("Template agent model: {}", properties.getModel());
        log.info("Template agent fallback model configured: {}", properties.getFallbackModel());
        log.info("Graph representation:\n{}", agent.getGraph(GraphRepresentation.Type.PLANTUML, "Loan Copilot Template", false).content());

        var compileConfig = CompileConfig.builder()
                .checkpointSaver(saver)
                .build();

        return new GraphData(agent.compile(compileConfig));
    }

    @Override
    protected GraphInput buildGraphInput(RunAgentParameters input) {
        var lastUserMessage = lastOf(input.getMessages())
                .map(BaseMessage::getContent)
                .orElseThrow(() -> new IllegalStateException("last user message not found"));

        return GraphInput.args(Map.of(
                "messages", List.of(
                        new SystemMessage("""
                                You are a template CopilotKit + LangGraph4j assistant for a loan decision workflow.
                                Be concise.
                                Use tools when useful.
                                If you want to send an email, call the sendEmail tool and wait for approval.
                                """),
                        new UserMessage(lastUserMessage)
                )));
    }

    @Override
    protected <S extends AgentState> List<Approval> onInterruption(RunAgentParameters input, InterruptionMetadata<S> state) {
        var messages = state.state()
                .<List<Message>>value("messages")
                .orElseThrow(() -> new IllegalStateException("messages not found in state"));

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
