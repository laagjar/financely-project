package com.example.Financely.model.services;

import com.example.Financely.model.entities.Payment;
import com.example.Financely.model.entities.Profile;
import com.example.Financely.model.repositories.PaymentRepository;
import com.example.Financely.model.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.time.LocalDate;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public boolean savePayment(Long profileId, String paymentName, double amount,
                               String category, String color, boolean recurring, LocalDate paymentDate) {

        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        Payment payment = new Payment();
        payment.setProfile(profile);
        payment.setPaymentName(paymentName);
        payment.setAmount(amount);
        payment.setCategory(category != null ? category : "");
        payment.setColor(color != null ? color : "#FFFFFF");
        payment.setRecurring(recurring);
        LocalDate finalDate = (paymentDate != null) ? paymentDate : LocalDate.now();
        payment.setPaymentDate(finalDate);

        paymentRepository.save(payment);

        return true;
    }

    public boolean deletePayment(Long paymentId, Long userId) {
        Optional<Payment> optPayment = paymentRepository.findById(paymentId);

        if (optPayment.isEmpty()) {
            return false;
        }

        Payment payment = optPayment.get();
        Profile profile = payment.getProfile();

        if (!profile.getUser().getId().equals(userId)) {
            return false;
        }

        paymentRepository.delete(payment);

        return true;
    }
}