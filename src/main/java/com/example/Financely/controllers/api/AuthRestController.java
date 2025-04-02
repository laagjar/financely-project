package com.example.Financely.controllers.api;

import com.example.Financely.model.dto.RegistrationRequest;
import com.example.Financely.model.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthRestController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        String result = userService.registerUser(
                request.getUserName(),
                request.getUserEmail(),
                request.getRawPassword(),
                request.getConfirmPass()
        );
        if ("User registered successfully".equals(result)) {
            return ResponseEntity.ok().body(Map.of("message", "User registered successfully"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", result));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication auth) {
        if (auth != null && auth.isAuthenticated()) {
            return ResponseEntity.ok().body(Map.of("email", auth.getName()));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
    }
}