package com.ability.dto.custom;

/**
 * 
 * @author 정규현
 * @summary 로그인 사용
 * 	
 */

public class AuthenticationToken {
	private UserSimple user;
	private String token;
	
	public AuthenticationToken(UserSimple user, String token) {
		this.user = user;
		this.token = token;
	}
	
	public UserSimple getUser() {
		return user;
	}
	public void setUser(UserSimple user) {
		this.user = user;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	
}
