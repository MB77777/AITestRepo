package com.silkycoders1.jsystemssilkycodders1.loan.config;

import com.agui.json.ObjectMapperFactory;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.StreamReadFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.silkycoders1.jsystemssilkycodders1.agui.sdk.AGUIAbstractLangGraphAgent;
import com.silkycoders1.jsystemssilkycodders1.loan.tools.LoanDecisionTools;
import com.silkycoders1.jsystemssilkycodders1.loan.workflow.LoanDecisionAgent;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaApi;
import org.springframework.ai.ollama.api.OllamaChatOptions;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LoanDecisionAgentConfig {

    @Bean
    Dotenv dotenv() {
        return Dotenv.configure()
                .directory(".")
                .filename(".env")
                .ignoreIfMalformed()
                .ignoreIfMissing()
                .load();
    }

    @Bean
    ObjectMapper objectMapper() {
        JsonFactory factory = JsonFactory.builder()
                .enable(StreamReadFeature.INCLUDE_SOURCE_IN_LOCATION)
                .build();
        var mapper = new ObjectMapper(factory);
        ObjectMapperFactory.addMixins(mapper);
        return mapper;
    }

    @Bean
    LoanDecisionTools loanDecisionTools() {
        return new LoanDecisionTools();
    }

    @Bean
    ChatModel loanDecisionChatModel(
            Dotenv dotenv,
            @Value("${loan-copilot.model.provider:auto}") String provider,
            @Value("${loan-copilot.model.openai.model:gpt-4o-mini}") String openAiModel,
            @Value("${loan-copilot.model.openrouter.base-url:https://openrouter.ai/api/v1}") String openRouterBaseUrl,
            @Value("${loan-copilot.model.openrouter.model:openai/gpt-5.2}") String openRouterModel,
            @Value("${loan-copilot.model.ollama.base-url:http://localhost:11434}") String ollamaBaseUrl,
            @Value("${loan-copilot.model.ollama.model:qwen2.5:7b}") String ollamaModel
    ) {
        var normalizedProvider = provider == null ? "auto" : provider.trim().toLowerCase();
        if ("openai".equals(normalizedProvider) || ("auto".equals(normalizedProvider) && hasValue(envValue(dotenv, "OPENAI_API_KEY")))) {
            return OpenAiChatModel.builder()
                    .openAiApi(OpenAiApi.builder()
                            .baseUrl("https://api.openai.com")
                            .apiKey(envValue(dotenv, "OPENAI_API_KEY"))
                            .build())
                    .defaultOptions(OpenAiChatOptions.builder()
                            .model(openAiModel)
                            .temperature(0.1)
                            .build())
                    .build();
        }
        if ("openrouter".equals(normalizedProvider) || ("auto".equals(normalizedProvider) && hasValue(envValue(dotenv, "OPENROUTER_API_KEY")))) {
            return OpenAiChatModel.builder()
                    .openAiApi(OpenAiApi.builder()
                            .baseUrl(openRouterBaseUrl)
                            .apiKey(envValue(dotenv, "OPENROUTER_API_KEY"))
                            .build())
                    .defaultOptions(OpenAiChatOptions.builder()
                            .model(openRouterModel)
                            .temperature(0.1)
                            .build())
                    .build();
        }
        if ("github".equals(normalizedProvider) || ("auto".equals(normalizedProvider) && hasValue(envValue(dotenv, "GITHUB_MODELS_TOKEN")))) {
            return OpenAiChatModel.builder()
                    .openAiApi(OpenAiApi.builder()
                            .baseUrl("https://models.github.ai/inference")
                            .apiKey(envValue(dotenv, "GITHUB_MODELS_TOKEN"))
                            .build())
                    .defaultOptions(OpenAiChatOptions.builder()
                            .model(openAiModel)
                            .temperature(0.1)
                            .build())
                    .build();
        }
        return OllamaChatModel.builder()
                .ollamaApi(OllamaApi.builder().baseUrl(ollamaBaseUrl).build())
                .defaultOptions(OllamaChatOptions.builder()
                        .model(ollamaModel)
                        .temperature(0.1)
                        .build())
                .build();
    }

    @Bean
    AGUIAbstractLangGraphAgent loanDecisionAgent(ChatModel loanDecisionChatModel, LoanDecisionTools loanDecisionTools) {
        return new LoanDecisionAgent(loanDecisionChatModel, loanDecisionTools);
    }

    private boolean hasValue(String value) {
        return value != null && !value.isBlank();
    }

    private String envValue(Dotenv dotenv, String key) {
        var systemValue = System.getenv(key);
        if (hasValue(systemValue)) {
            return systemValue;
        }
        return dotenv.get(key);
    }
}
