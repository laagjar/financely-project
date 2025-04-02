package com.example.Financely.model.repositories;

import com.example.Financely.model.entities.Payment;
import com.example.Financely.model.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByProfile(Profile profile);
}