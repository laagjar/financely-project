package com.example.Financely.controllers.api;

import com.example.Financely.model.dto.ProfileRequest;
import com.example.Financely.model.entities.Profile;
import com.example.Financely.model.entities.User;
import com.example.Financely.model.repositories.UserRepository;
import com.example.Financely.model.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/profiles")
public class ProfileRestController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getProfiles(Authentication authentication) {
        String currentEmail = authentication.getName();
        User currentUser = userRepository.findByUserEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Profile> profiles = profileService.getProfilesByUser(currentUser.getId());

        return ResponseEntity.ok(profiles);
    }

    @PostMapping
    public ResponseEntity<?> createProfile(@RequestBody ProfileRequest profileRequest, Authentication authentication) {
        String currentEmail = authentication.getName();
        User currentUser = userRepository.findByUserEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        profileService.createProfile(currentUser.getId(), profileRequest.getProfileName(), profileRequest.getBudget(), profileRequest.getCurrency());

        return ResponseEntity.ok().body(Map.of("message", "Profile created successfully"));
    }

    @DeleteMapping("/{profileId}")
    public ResponseEntity<?> deleteProfile(@PathVariable Long profileId,
                                           Authentication authentication) {
        String currentEmail = authentication.getName();
        User currentUser = userRepository.findByUserEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean result = profileService.deleteProfile(profileId, currentUser.getId());

        if (!result) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied or profile not found"));
        }

        return ResponseEntity.ok(Map.of("message", "Profile deleted successfully"));
    }
}