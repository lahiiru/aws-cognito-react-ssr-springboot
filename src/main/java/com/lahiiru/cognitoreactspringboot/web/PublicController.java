package com.lahiiru.cognitoreactspringboot.web;

import com.lahiiru.cognitoreactspringboot.config.CognitoConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicController {
    private final String issuerUri;
    private final CognitoConfig cognitoConfig;

    public PublicController(
            @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}") String issuerUri,
            CognitoConfig cognitoConfig
    ) {
        this.issuerUri = issuerUri;
        this.cognitoConfig = cognitoConfig;
    }

    @GetMapping("/oauth2/info")
    public Map<String, String> secureEndpoint() {
        return Map.of(
            "authority", this.issuerUri,
            "client_id", cognitoConfig.getClientId(),
            "redirect_uri", cognitoConfig.getRedirectUri(),
            "response_type", cognitoConfig.getResponseType(),
            "scope", cognitoConfig.getScope()
        );
    }
}
