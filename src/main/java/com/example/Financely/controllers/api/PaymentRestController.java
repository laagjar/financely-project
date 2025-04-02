package com.example.Financely.controllers.api;

import com.example.Financely.model.dto.PaymentRequest;
import com.example.Financely.model.entities.Payment;
import com.example.Financely.model.entities.Profile;
import com.example.Financely.model.entities.User;
import com.example.Financely.model.repositories.PaymentRepository;
import com.example.Financely.model.repositories.ProfileRepository;
import com.example.Financely.model.repositories.UserRepository;
import com.example.Financely.model.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentRestController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getPayments(@RequestParam Long profileId, Authentication authentication) {
        String currentEmail = authentication.getName();
        User currentUser = userRepository.findByUserEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        if (!profile.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }
        List<Payment> payments = paymentRepository.findByProfile(profile);
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPayments(Authentication authentication) {
        String currentEmail = authentication.getName();
        User currentUser = userRepository.findByUserEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Profile> userProfiles = profileRepository.findByUser(currentUser);
        List<Payment> allPayments = new ArrayList<>();

        for (Profile p : userProfiles) {
            allPayments.addAll(paymentRepository.findByProfile(p));
        }

        return ResponseEntity.ok(allPayments);
    }

    @PostMapping
    public ResponseEntity<?> createPayment(@RequestBody PaymentRequest paymentRequest, Authentication authentication) {
        String currentEmail = authentication.getName();
        User currentUser = userRepository.findByUserEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findById(paymentRequest.getProfileId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (!profile.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }

        paymentService.savePayment(
                paymentRequest.getProfileId(),
                paymentRequest.getPaymentName(),
                paymentRequest.getAmount(),
                paymentRequest.getCategory(),
                paymentRequest.getColor(),
                paymentRequest.isRecurring(),
                paymentRequest.getPaymentDate()
        );

        return ResponseEntity.ok().body(Map.of("message", "Payment created successfully"));
    }

    @DeleteMapping("/{paymentId}")
    public ResponseEntity<?> deletePayment(@PathVariable Long paymentId,
                                           Authentication authentication) {
        String currentEmail = authentication.getName();
        User currentUser = userRepository.findByUserEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean result = paymentService.deletePayment(paymentId, currentUser.getId());

        if (!result) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied or payment not found"));
        }

        return ResponseEntity.ok(Map.of("message", "Payment deleted successfully"));
    }
}