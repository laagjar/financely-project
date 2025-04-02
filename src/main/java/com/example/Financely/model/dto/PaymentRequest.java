package com.example.Financely.model.dto;

import java.time.LocalDate;

public class PaymentRequest {
    private Long profileId;
    private String paymentName;
    private double amount;
    private String category;
    private String color;
    private boolean recurring;
    private LocalDate paymentDate;

    public Long getProfileId() { return profileId; }
    public void setProfileId(Long profileId) { this.profileId = profileId; }

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