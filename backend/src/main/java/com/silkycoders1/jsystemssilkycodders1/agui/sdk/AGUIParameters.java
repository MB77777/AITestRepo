package com.silkycoders1.jsystemssilkycodders1.agui.sdk;

import com.agui.core.agent.RunAgentParameters;
import com.agui.core.context.Context;
import com.agui.core.message.BaseMessage;
import com.agui.core.state.State;
import com.agui.core.tool.Tool;

import java.util.List;

public class AGUIParameters {

    private String threadId;
    private String runId;
    private List<Tool> tools;
    private List<Context> context;
    private Object forwardedProps;
    private List<BaseMessage> messages;
    private State state;

    public void setThreadId(String threadId) {
        this.threadId = threadId;
    }

    public String getThreadId() {
        return threadId;
    }

    public void setRunId(String runId) {
        this.runId = runId;
    }

    public String getRunId() {
        return runId;
    }

    public void setTools(List<Tool> tools) {
        this.tools = tools;
    }

    public List<Tool> getTools() {
        return tools;
    }

    public void setContext(List<Context> context) {
        this.context = context;
    }

    public List<Context> getContext() {
        return context;
    }

    public void setForwardedProps(Object forwardedProps) {
        this.forwardedProps = forwardedProps;
    }

    public Object getForwardedProps() {
        return forwardedProps;
    }

    public void setMessages(List<BaseMessage> messages) {
        this.messages = messages;
    }

    public List<BaseMessage> getMessages() {
        return messages;
    }

    public void setState(State state) {
        this.state = state;
    }

    public State getState() {
        return state;
    }

    public RunAgentParameters toRunAgentParameters() {
        return RunAgentParameters.builder()
                .threadId(getThreadId())
                .runId(getRunId())
                .messages(getMessages())
                .tools(getTools())
                .context(getContext())
                .forwardedProps(getForwardedProps())
                .state(getState())
                .build();
    }
}
