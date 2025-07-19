package swd392.chatbotservice.infrastructure.thirdparty;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum AIModelAlias {

    GEMINI_2_FLASH("gemini-2.0-flash"),

    GEMINI_2_5_FLASH("gemini-2.5-flash"),

    GEMINI_2_5_PRO("gemini-2.5-pro"),

    N8N_AGENT("n8n-agent");

    public final String alias;

}
