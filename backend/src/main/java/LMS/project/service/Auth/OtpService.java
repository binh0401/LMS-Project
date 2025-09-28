package LMS.project.service.Auth;


import LMS.project.modal.EmailOtp;
import LMS.project.repository.EmailOtpRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class OtpService {
    private static final SecureRandom RNG = new SecureRandom();
    private static final int TTL_MIN = 5;
    private static final int MAX_ATTEMPTS = 5;

    private final EmailOtpRepository repo;
    private final MailService mail;

    public OtpService(EmailOtpRepository repo, MailService mail) {
        this.repo = repo;
        this.mail = mail;
    }

    private String generateNumericCode(int digits) {
        int bound = (int) Math.pow(10, digits);
        int code = RNG.nextInt(bound);
        return String.format("%0" + digits + "d", code);
    }
    @Transactional
    public void sendOtpToEmail(String email){
        String code = generateNumericCode(6);
        String hash = BCrypt.hashpw(code, BCrypt.gensalt());

        EmailOtp rec = new EmailOtp();
        rec.setEmail(email);
        rec.setCodeHash(hash);
        rec.setExpiresAt(Instant.now().plus(TTL_MIN, ChronoUnit.MINUTES));
        repo.save(rec);

        mail.sendOtp(email, code, TTL_MIN);
    }
}