package com.lahiiru.cognitoreactspringboot.web;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/secure")
public class SecuredController {
    @GetMapping("/hello")
    public Map<String, String> secureEndpoint(Authentication authentication) {
        return Map.of("message", "Hello from secured backend!. Your identifier is " + authentication.getName());
    }
}
