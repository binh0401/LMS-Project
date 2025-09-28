package LMS.project.repository;

import LMS.project.modal.EmailOtp;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmailOtpRepository extends JpaRepository<EmailOtp, Long> {
    Optional<EmailOtp> findTopByEmailAndUsedIsFalseOrderByIdDesc(String email);
}