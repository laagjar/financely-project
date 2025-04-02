package com.example.Financely.model.dto;

public class RegistrationRequest {
    private String userName;
    private String userEmail;
    private String rawPassword;
    private String confirmPass;

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getRawPassword() { return rawPassword; }
    public void setRawPassword(String rawPassword) { this.rawPassword = rawPassword; }

    public String getConfirmPass() { return confirmPass; }
    public void setConfirmPass(String confirmPass) { this.confirmPass = confirmPass; }
}