package com.silkycoders1.jsystemssilkycodders1.agui.template;

import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;

import java.time.LocalDate;
import java.util.Locale;

public class TemplateTools {

    @Tool(description = "Send an email after user approval")
    public String sendEmail(
            @ToolParam(description = "Destination email address") String to,
            @ToolParam(description = "Email subject") String subject,
            @ToolParam(description = "Email body") String body
    ) {
        return "Email queued for %s with subject '%s'. Body preview: %s".formatted(to, subject, body);
    }

    @Tool(description = "Return a short profile summary for a loan applicant")
    public String loadApplicantProfile(
            @ToolParam(description = "Applicant identifier") String applicantId
    ) {
        return """
                Applicant %s
                - net income: 14 500 PLN
                - monthly liabilities: 2 300 PLN
                - current employer tenure: 3 years
                - requested product: mortgage pre-check
                """.formatted(applicantId);
    }

    @Tool(description = "Return a deterministic sample market note used by the demo")
    public String marketContext(
            @ToolParam(description = "Country code or locale") String locale
    ) {
        var normalized = locale == null ? "pl-PL" : locale.toLowerCase(Locale.ROOT);
        return "Market note for %s on %s: stable rates, stricter affordability checks, moderate demand.".formatted(
                normalized,
                LocalDate.now()
        );
    }
}
