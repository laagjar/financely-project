package com.example.Financely.model.services;

import com.example.Financely.model.entities.Profile;
import com.example.Financely.model.entities.User;
import com.example.Financely.model.repositories.ProfileRepository;
import com.example.Financely.model.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public boolean createProfile(Long userId, String profileName, double budget, String currency) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = new Profile();
        profile.setProfileName(profileName);
        profile.setBudget(budget);
        profile.setCurrency(currency);
        profile.setUser(user);

        profileRepository.save(profile);

        return true;
    }

    public List<Profile> getProfilesByUser(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return profileRepository.findByUser(user);
    }

    public boolean deleteProfile(Long profileId, Long userId) {
        Optional<Profile> optProfile = profileRepository.findById(profileId);

        if (optProfile.isEmpty()) {
            return false;
        }

        Profile profile = optProfile.get();

        if (!profile.getUser().getId().equals(userId)) {
            return false;
        }

        profileRepository.delete(profile);

        return true;
    }

}