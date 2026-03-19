package com.silkycoders1.jsystemssilkycodders1.agui.sdk;

import com.agui.core.agent.RunAgentParameters;
import com.agui.core.event.BaseEvent;
import com.agui.core.message.BaseMessage;
import com.agui.core.message.Role;
import com.agui.server.EventFactory;
import org.bsc.langgraph4j.GraphInput;
import org.bsc.langgraph4j.GraphResult;
import org.bsc.langgraph4j.GraphStateException;
import org.bsc.langgraph4j.LG4JLoggable;
import org.bsc.langgraph4j.NodeOutput;
import org.bsc.langgraph4j.RunnableConfig;
import org.bsc.langgraph4j.action.InterruptionMetadata;
import org.bsc.langgraph4j.agent.AgentEx;
import org.bsc.langgraph4j.state.AgentState;
import org.bsc.langgraph4j.streaming.StreamingOutput;
import org.bsc.langgraph4j.utils.TryFunction;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

import static org.bsc.langgraph4j.utils.CollectionsUtils.lastOf;

public abstract class AGUIAbstractLangGraphAgent implements LG4JLoggable {

    private final Map<String, GraphData> graphByThread = new ConcurrentHashMap<>();
    private final AtomicReference<String> streamingId = new AtomicReference<>();

    protected abstract GraphData buildStateGraph() throws GraphStateException;

    protected abstract GraphInput buildGraphInput(RunAgentParameters input);

    protected abstract <S extends AgentState> List<Approval> onInterruption(RunAgentParameters input, InterruptionMetadata<S> state);

    protected String newMessageId() {
        return String.valueOf(System.currentTimeMillis());
    }

    protected Optional<String> nodeOutputToText(NodeOutput<? extends AgentState> output) {
        return Optional.empty();
    }

    protected Collection<? extends BaseEvent> nodeOutputToEvents(RunAgentParameters input, NodeOutput<? extends AgentState> output) {
        return nodeOutputToText(output)
                .map(text -> {
                    var messageId = newMessageId();
                    return List.of(
                            EventFactory.textMessageStartEvent(messageId, Role.assistant.name()),
                            EventFactory.textMessageContentEvent(messageId, text),
                            EventFactory.textMessageEndEvent(messageId));
                })
                .orElseGet(List::of);
    }

    public final Flux<? extends BaseEvent> run(RunAgentParameters input) {
        var graphData = graphByThread.computeIfAbsent(input.getThreadId(), TryFunction.Try(key -> buildStateGraph()));

        try {
            var agent = graphData.compiledGraph();
            var runnableConfig = RunnableConfig.builder()
                    .threadId(input.getThreadId())
                    .build();

            final GraphInput graphInput;
            if (graphData.interruption()) {
                var lastResultMessage = lastOf(input.getMessages())
                        .map(BaseMessage::getContent)
                        .orElseThrow(() -> new IllegalStateException("last result message not found after interruption"));
                graphInput = GraphInput.resume(Map.of(AgentEx.APPROVAL_RESULT_PROPERTY, lastResultMessage));
            } else {
                graphInput = buildGraphInput(input);
            }

            var outputGenerator = agent.stream(graphInput, runnableConfig);

            var outputFlux = Flux.<BaseEvent>create(emitter -> {
                for (var event : outputGenerator) {
                    if (event instanceof StreamingOutput<? extends AgentState> output) {
                        var messageId = streamingId.get();
                        if (messageId == null) {
                            messageId = streamingId.updateAndGet(previous -> newMessageId());
                            emitter.next(EventFactory.textMessageStartEvent(messageId, Role.assistant.name()));
                            continue;
                        }
                        if (output.isStreamingEnd()) {
                            streamingId.set(null);
                            emitter.next(EventFactory.textMessageEndEvent(messageId));
                            continue;
                        }
                        if (output.chunk() != null && !output.chunk().isEmpty()) {
                            emitter.next(EventFactory.textMessageContentEvent(messageId, output.chunk()));
                        }
                    } else {
                        nodeOutputToEvents(input, event).forEach(emitter::next);
                    }
                }

                var result = GraphResult.from(outputGenerator);
                if (result.isInterruptionMetadata()) {
                    var interruptionMetadata = result.asInterruptionMetadata();
                    graphByThread.put(input.getThreadId(), graphData.withInterruption(true));

                    onInterruption(input, interruptionMetadata).forEach(approval -> {
                        var messageId = newMessageId();
                        emitter.next(EventFactory.toolCallStartEvent(messageId, approval.toolName(), approval.toolId()));
                        emitter.next(EventFactory.toolCallArgsEvent(approval.toolArgs(), approval.toolId()));
                        emitter.next(EventFactory.toolCallEndEvent(approval.toolId()));
                    });
                } else {
                    graphByThread.put(input.getThreadId(), graphData.withInterruption(false));
                }

                emitter.complete();
            });

            return Mono.<BaseEvent>just(EventFactory.runStartedEvent(input.getThreadId(), input.getRunId()))
                    .concatWith(outputFlux.subscribeOn(Schedulers.immediate()))
                    .concatWith(Mono.just(EventFactory.runFinishedEvent(input.getThreadId(), input.getRunId())));
        } catch (Exception exception) {
            return Flux.error(exception);
        }
    }
}
