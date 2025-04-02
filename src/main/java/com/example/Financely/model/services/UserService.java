package com.example.Financely.model.services;

import com.example.Financely.model.entities.User;
import com.example.Financely.model.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String registerUser(String userName, String userEmail, String rawPassword, String confirmPass) {

        if (userName.isEmpty() || userEmail.isEmpty() || rawPassword.isEmpty() ||
                !rawPassword.equals(confirmPass)) {
            return "Invalid data";
        }

        if (userRepository.existsByUserEmail(userEmail)) {
            return "User with this email already exists";
        }

        String hashed = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserName(userName);
        user.setUserEmail(userEmail);
        user.setUserPassHashed(hashed);

        userRepository.save(user);

        return "User registered successfully";
    }

    public boolean authenticateUser(String email, String rawPassword) {
        Optional<User> userOpt = userRepository.findByUserEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return passwordEncoder.matches(rawPassword, user.getUserPassHashed());
        }

        return false;
    }

    public Optional<User> findUserByEmail(String email){
        return userRepository.findByUserEmail(email);
    }
}