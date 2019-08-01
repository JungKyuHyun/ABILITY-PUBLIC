package com.ability.utils;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Component;

/**
 * 
 * @author jkh
 * @summary 임시 비밀번호 메일을 보내기 위한 로직. 
 * 
 */

@Component
public class FindPasswordMail {
	private final String FROM = "";
	private final String FROMNAME = "admin";
	private final String SMTP_USERNAME = "";
	private final String SMTP_PASSWORD = "";
	private final String HOST = "";
	private final int PORT = ;

	public void SendSignUpAuthMail(String to_email, String temporaryPassword) throws AddressException, MessagingException, UnsupportedEncodingException {
		String to = to_email;
		String subject = "[ABILITY] 임시 비밀번호 발급 안내";
		String body = "";

		Properties props = System.getProperties();
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.smtp.port", PORT);
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.auth", "true");

		Session session = Session.getDefaultInstance(props);

		MimeMessage msg = new MimeMessage(session);
		msg.setFrom(new InternetAddress(FROM, FROMNAME));
		msg.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
		msg.setSubject(subject,"UTF-8");
		msg.setContent(body, "text/html;charset=utf-8");

		Transport transport = session.getTransport();

		try {
			transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);
			transport.sendMessage(msg, msg.getAllRecipients());
		} catch (Exception ex) {
			System.out.println("Error message: " + ex.getMessage());
		} finally {
			transport.close();
		}

	}
}
