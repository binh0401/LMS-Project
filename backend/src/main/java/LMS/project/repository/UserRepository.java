package LMS.project.repository;

import LMS.project.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    // ============= SIGN UP RELATED METHODS =============

    /**
     * Check if email already exists in the database
     * Used during sign up to prevent duplicate emails
     */
    boolean existsByEmail(String email);





}