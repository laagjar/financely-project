package com.example.Financely.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    @JsonIgnore
    private Profile profile;

    private String paymentName;
    private double amount;
    private String category;
    private String color;
    private boolean recurring;
    private LocalDate paymentDate;

    public Payment() {
    }

    public Payment(Long id, Profile profile, String paymentName,
                   double amount, String category, String color,
                   boolean recurring, LocalDate paymentDate) {

        this.id = id;
        this.profile = profile;
        this.paymentName = paymentName;
        this.amount = amount;
        this.category = category;
        this.color = color;
        this.recurring = recurring;
        this.paymentDate = paymentDate;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Profile getProfile() { return profile; }
    public void setProfile(Profile profile) { this.profile = profile; }

    public String getPaymentName() { return paymentName; }
    public void setPaymentName(String paymentName) { this.paymentName = paymentName; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public boolean isRecurring() { return recurring; }
    public void setRecurring(boolean recurring) { this.recurring = recurring; }

    public LocalDate getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDate paymentDate) { this.paymentDate = paymentDate; }
}