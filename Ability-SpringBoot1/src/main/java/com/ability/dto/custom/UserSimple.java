package com.ability.dto.custom;

/**
 * 
 * @author jkh
 * @summary 자주 쓰이는 데이터만 받아오는 UserDTO(as UserSimple).
 * @desc User 테이블과 role 테이블을 조인함.			
 * 
 */

public class UserSimple {
	private int userid;
	private String email;
	private String nick_name;
	private String user_image;
	private int reputation;
	private String role_name;
	private String password;
	private int enabled;
	
	public UserSimple() {}

	public UserSimple(int userid, String email, String nick_name, String user_image, int reputation, String role_name) {
		super();
		this.userid = userid;
		this.email = email;
		this.nick_name = nick_name;
		this.user_image = user_image;
		this.reputation = reputation;
		this.role_name = role_name;
	}

	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNick_name() {
		return nick_name;
	}
	public void setNick_name(String nick_name) {
		this.nick_name = nick_name;
	}
	public String getUser_image() {
		return user_image;
	}
	public void setUser_image(String user_image) {
		this.user_image = user_image;
	}
	public int getReputation() {
		return reputation;
	}
	public void setReputation(int reputation) {
		this.reputation = reputation;
	}
	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	
	
}
