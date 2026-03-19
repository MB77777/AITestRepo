package com.silkycoders1.jsystemssilkycodders1.agui.sdk;

import static java.util.Objects.requireNonNull;

public record Approval(String toolId, String toolName, String toolArgs) {

    public Approval {
        requireNonNull(toolId, "toolId cannot be null");
        requireNonNull(toolName, "toolName cannot be null");
        requireNonNull(toolArgs, "toolArgs cannot be null");
    }
}
