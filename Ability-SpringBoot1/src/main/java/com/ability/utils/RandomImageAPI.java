package com.ability.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Component;

/**
 * @author 신선하
 * @summary 랜덤 이미지 생성
 * 
 */
@Component
public class RandomImageAPI {

	public static String RandomProfileImage(String email) {
		
		return "http://www.gravatar.com/avatar/";
	}
}
