package com.silkycoders1.jsystemssilkycodders1.config;

import com.agui.core.event.BaseEvent;
import com.agui.json.ObjectMapperFactory;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.StreamReadFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.AGUIAbstractLangGraphAgent;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.serialization.AgUiEventSerializationMixin;
import com.silkycoders1.jsystemssilkycodders1.agui.template.TemplateAgentExecutor;
import com.silkycoders1.jsystemssilkycodders1.agui.template.TemplateTools;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

@Configuration
@EnableConfigurationProperties(OpenRouterProperties.class)
public class ApplicationConfig {

    @Bean
    public ObjectMapper objectMapper() {
        var factory = JsonFactory.builder()
                .enable(StreamReadFeature.INCLUDE_SOURCE_IN_LOCATION)
                .build();
        var result = new ObjectMapper(factory);
        ObjectMapperFactory.addMixins(result);
        result.addMixIn(BaseEvent.class, AgUiEventSerializationMixin.class);
        return result;
    }

    @Bean
    public ChatModel chatModel(OpenRouterProperties properties) {
        if (!StringUtils.hasText(properties.getApiKey())) {
            throw new IllegalStateException("OPENROUTER_API_KEY or OPENAI_API_KEY must be set");
        }

        var normalizedBaseUrl = normalizeOpenAiCompatibleBaseUrl(properties.getBaseUrl());
        var api = OpenAiApi.builder()
                .baseUrl(normalizedBaseUrl)
                .apiKey(properties.getApiKey())
                .build();

        return OpenAiChatModel.builder()
                .openAiApi(api)
                .defaultOptions(OpenAiChatOptions.builder()
                        .model(properties.getModel())
                        .temperature(properties.getTemperature())
                        .build())
                .build();
    }

    private String normalizeOpenAiCompatibleBaseUrl(String baseUrl) {
        if (!StringUtils.hasText(baseUrl)) {
            return "https://openrouter.ai/api";
        }

        var normalized = baseUrl.trim().replaceAll("/+$", "");
        if (normalized.endsWith("/v1")) {
            return normalized.substring(0, normalized.length() - 3);
        }
        return normalized;
    }

    @Bean
    public TemplateTools templateTools() {
        return new TemplateTools();
    }

    @Bean
    public AGUIAbstractLangGraphAgent aguiAgent(ChatModel chatModel, TemplateTools templateTools, OpenRouterProperties properties) {
        return new TemplateAgentExecutor(chatModel, templateTools, properties);
    }
}
