package LMS.project.service;

import LMS.project.modal.User;
import LMS.project.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

public class AuthService {


    @Service
    public class UserService {

        private final UserRepository userRepository;
        private final BCryptPasswordEncoder passwordEncoder;

        // constructor injection
        public UserService(UserRepository userRepository) {
            this.userRepository = userRepository;
            this.passwordEncoder = new BCryptPasswordEncoder(); // you can @Bean this too
        }

        /**
         * Check if a user with the given email already exists.
         */
        public boolean existsByEmail(String email) {
            return userRepository.existsByEmail(email);
        }

        /**
         * Add a new user (with password hashing).
         */
        public User addUser(User user) {
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new IllegalArgumentException("Email already in use: " + user.getEmail());
            }

            // Hash the password before saving
            user.setHashedPassword(passwordEncoder.encode(user.getHashedPassword()));

            return userRepository.save(user);
        }
}
