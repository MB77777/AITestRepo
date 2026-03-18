package com.silkycoders1.jsystemssilkycodders1.agui.sdk;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class AGUISSEController {

    private final AGUIAbstractLangGraphAgent agUiAgent;
    private final ObjectMapper objectMapper;

    public AGUISSEController(AGUIAbstractLangGraphAgent agUiAgent, ObjectMapper objectMapper) {
        this.agUiAgent = agUiAgent;
        this.objectMapper = objectMapper;
    }

    @PostMapping(value = "/sse/{agentId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<Flux<String>> streamDataWithFlux(
            @PathVariable("agentId") String agentId,
            @RequestBody AGUIParameters parameters
    ) {
        var body = agUiAgent.run(parameters.toRunAgentParameters())
                .map(event -> {
                    try {
                        return " %s".formatted(objectMapper.writeValueAsString(event));
                    } catch (Exception e) {
                        throw new IllegalStateException("Unable to serialize AG-UI event for agent " + agentId, e);
                    }
                });

        return ResponseEntity.ok()
                .cacheControl(CacheControl.noCache())
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(body);
    }
}
