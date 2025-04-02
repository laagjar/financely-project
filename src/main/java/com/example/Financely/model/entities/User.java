package com.example.Financely.model.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "users_info")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;

    @Column(name = "user_pass_hashed", nullable = false)
    private String userPassHashed;

    public User() {
    }

    public User(Long id, String userName, String userEmail, String userPassHashed) {
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userPassHashed = userPassHashed;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserPassHashed() { return userPassHashed; }
    public void setUserPassHashed(String userPassHashed) { this.userPassHashed = userPassHashed; }
}