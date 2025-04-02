package com.example.Financely.controllers.api;

import com.example.Financely.model.entities.Payment;
import com.example.Financely.model.entities.Profile;
import com.example.Financely.model.entities.User;
import com.example.Financely.model.repositories.PaymentRepository;
import com.example.Financely.model.repositories.ProfileRepository;
import com.example.Financely.model.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/reports")
public class ReportsRestController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/categories/range")
    public ResponseEntity<?> getCategoriesInRange(
            @RequestParam Long profileId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
            Authentication auth
    ) {
        String email = auth.getName();

        User currentUser = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (!profile.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }

        List<Payment> payments = paymentRepository.findByProfile(profile);

        List<Payment> filtered = new ArrayList<>();

        for (Payment p : payments) {
            LocalDate d = p.getPaymentDate();

            if ((d.isEqual(start) || d.isAfter(start)) && (d.isEqual(end) || d.isBefore(end))) {
                filtered.add(p);
            }
        }

        Map<String, Double> categorySums = new HashMap<>();

        for (Payment p : filtered) {
            String cat = (p.getCategory() == null) ? "" : p.getCategory();
            double amt = p.getAmount();
            categorySums.put(cat, categorySums.getOrDefault(cat, 0.0) + amt);
        }

        double totalSpent = filtered.stream().mapToDouble(Payment::getAmount).sum();

        Map<String, Object> result = new HashMap<>();
        result.put("categorySums", categorySums);
        result.put("totalSpent", totalSpent);
        result.put("details", filtered);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/monthly")
    public ResponseEntity<?> getMonthlyReport(
            @RequestParam Long profileId,
            @RequestParam int year,
            Authentication auth
    ) {
        String email = auth.getName();

        User currentUser = userRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        if (!profile.getUser().getId().equals(currentUser.getId())) {
            return ResponseEntity.status(403).body(Map.of("error", "Access denied"));
        }

        List<Payment> payments = paymentRepository.findByProfile(profile);

        double[] monthlySums = new double[12];
        for (Payment p : payments) {
            LocalDate date = p.getPaymentDate();
            if (date.getYear() == year) {
                int monthIndex = date.getMonthValue() - 1;
                monthlySums[monthIndex] += p.getAmount();
            }
        }

        Map<Integer, Double> monthlyMap = new HashMap<>();

        for (int i = 0; i < 12; i++) {
            monthlyMap.put(i + 1, monthlySums[i]);
        }

        return ResponseEntity.ok(monthlyMap);
    }
}