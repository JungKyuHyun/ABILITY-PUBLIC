package com.ability.utils;

import java.util.Random;

import org.springframework.stereotype.Component;

/**
 * @author 정규현
 * @summary 랜덤으로 패스워드를 생성 // 비밀번호 찾기 전용
 */

@Component
public class CreateRandomPassword {
	
	
	public String randomPassword() {
		String specialCharacters = "!#$^&*-=~";
		StringBuilder randomPassword = new StringBuilder();
		Random rnd = new Random();
		randomPassword.append((char) ((int) (rnd.nextInt(26)) + 65));
		for (int i = 0; i < 11; i++) {
		    int rIndex = rnd.nextInt(4);
		    switch (rIndex) {
		    case 0:
		        // a-z
		    	randomPassword.append((char) ((int) (rnd.nextInt(26)) + 97));
		        break;
		    case 1:
		        // A-Z
		    	randomPassword.append((char) ((int) (rnd.nextInt(26)) + 65));
		        break;
		    case 2:
		        // 0-9
		    	randomPassword.append((rnd.nextInt(10)));
		        break;
		    case 3:
		    	randomPassword.append(specialCharacters.charAt(rnd.nextInt(specialCharacters.length())));
		    	break;
		    }
		}
		return randomPassword.toString();
	}
}
