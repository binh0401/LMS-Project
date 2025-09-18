package com.example.repository;

import com.example.entity.User;
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

    /**
     * Check if userID already exists in the database
     * Used when generating unique userIDs
     */
    boolean existsByUserId(String userId);

    /**
     * Find user by email (case insensitive)
     * Useful for login and email verification
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.email) = LOWER(:email)")
    Optional<User> findByEmailIgnoreCase(@Param("email") String email);

    /**
     * Check if email exists (case insensitive)
     * More robust email checking for sign up
     */
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE LOWER(u.email) = LOWER(:email)")
    boolean existsByEmailIgnoreCase(@Param("email") String email);

    /**
     * Find user by email for authentication
     * Returns user with all fields needed for login
     */
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmailForAuthentication(@Param("email") String email);

    // ============= GENERAL USER QUERIES =============

    /**
     * Find user by exact email match
     */
    Optional<User> findByEmail(String email);

    /**
     * Find users by role
     */
    List<User> findByRole(String role);

    /**
     * Find users by gender
     */
    List<User> findByGender(String gender);

    /**
     * Find users by role and gender combination
     */
    List<User> findByRoleAndGender(String role, String gender);

    /**
     * Find users by name containing a string (case insensitive)
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<User> findUsersByNameContainingIgnoreCase(@Param("name") String name);

    /**
     * Find users by partial name match
     */
    List<User> findByNameContainingIgnoreCase(String name);

    /**
     * Count total users
     */
    @Query("SELECT COUNT(u) FROM User u")
    long countTotalUsers();

    /**
     * Count users by role
     */
    long countByRole(String role);

    /**
     * Find users created after a certain date
     */
    @Query("SELECT u FROM User u WHERE u.createdAt >= :date")
    List<User> findUsersCreatedAfter(@Param("date") java.time.LocalDateTime date);

    /**
     * Find all users ordered by creation date (newest first)
     */
    @Query("SELECT u FROM User u ORDER BY u.createdAt DESC")
    List<User> findAllOrderByCreatedAtDesc();

    /**
     * Check if user exists by multiple criteria (useful for duplicate checking)
     */
    @Query("SELECT COUNT(u) > 0 FROM User u WHERE LOWER(u.email) = LOWER(:email) OR u.userId = :userId")
    boolean existsByEmailOrUserId(@Param("email") String email, @Param("userId") String userId);

    /**
     * Find users by email domain (useful for organization-based queries)
     */
    @Query("SELECT u FROM User u WHERE u.email LIKE CONCAT('%@', :domain)")
    List<User> findUsersByEmailDomain(@Param("domain") String domain);

    /**
     * Soft delete alternative - find only active users
     * (if you implement soft delete in the future)
     */
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findActiveUserByEmail(@Param("email") String email);

    /**
     * Custom method to validate user data integrity
     */
    @Query("SELECT u FROM User u WHERE u.email IS NULL OR u.name IS NULL OR u.hashedPassword IS NULL")
    List<User> findUsersWithMissingRequiredFields();

    /**
     * Find users by role with pagination support
     */
    @Query("SELECT u FROM User u WHERE u.role = :role ORDER BY u.createdAt DESC")
    List<User> findUsersByRoleOrderByCreatedAt(@Param("role") String role);

    /**
     * Advanced search method for admin purposes
     */
    @Query("SELECT u FROM User u WHERE " +
            "(:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
            "(:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%'))) AND " +
            "(:role IS NULL OR u.role = :role) AND " +
            "(:gender IS NULL OR u.gender = :gender)")
    List<User> findUsersByAdvancedSearch(@Param("name") String name,
                                         @Param("email") String email,
                                         @Param("role") String role,
                                         @Param("gender") String gender);
}