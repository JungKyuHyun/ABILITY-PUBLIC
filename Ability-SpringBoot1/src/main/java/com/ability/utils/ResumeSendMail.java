package com.ability.utils;

import java.util.Properties;

import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

/**
 * 
 * @author 정진호
 * @summary 이력서 지원했을때 파일 첨부 메일 보내기. 
 * 
 */

@Component
public class ResumeSendMail {
	Transport transport;
	
	private final String FROM = "";
	private final String FROMNAME = "";
	private final String SMTP_USERNAME = "";
	private final String SMTP_PASSWORD = "";
	private final String HOST = "";
	private final int PORT = ;
	
	public void ResumeMail(String to_email,String filepath, String filename ,String introduce){
		String to = to_email; 
		String subject = "[ABILITY] - 올리신 구인공고에 지원 신청서가 도착했습니다.";

		Properties props = System.getProperties();
		props.put("mail.transport.protocol", "smtp");
		props.put("mail.smtp.port", PORT);
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.auth", "true");

		Session session = Session.getDefaultInstance(props);

	    try {
			MimeMessage message = new MimeMessage(session);
	        MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
	        messageHelper.setFrom(new InternetAddress(FROM, FROMNAME));
	        messageHelper.setTo(new InternetAddress(to));
	        messageHelper.setSubject(subject);
	        messageHelper.setText(introduce);
	        // 파일첨부
	        FileSystemResource fsr = new FileSystemResource(filepath);
	        messageHelper.addAttachment(filename, fsr);
	        
	        transport = session.getTransport();
	        
			
				transport.connect(HOST, SMTP_USERNAME, SMTP_PASSWORD);
				transport.sendMessage(message, message.getAllRecipients());
			} catch (Exception ex) {
				System.out.println("Error message: " + ex.getMessage());
			} finally {
				try {
					transport.close();
				} catch (MessagingException e) {
					e.printStackTrace();
				}
			}

		}
}
