package LMS.project.service.Auth;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
public class MailService {
    private final JavaMailSender mailSender;
    public MailService(JavaMailSender mailSender){ this.mailSender = mailSender; }

    public void sendOtp(String to, String code, int ttlMinutes){
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("Your verification code");
        msg.setText("Your OTP is: " + code + "\nIt expires in " + ttlMinutes + " minutes.");
        mailSender.send(msg);
    }
}