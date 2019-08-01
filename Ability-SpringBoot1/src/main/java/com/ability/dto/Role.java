package com.ability.dto;


public class Role {
	private int userid;
	private String role_name;
	
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	
	@Override
	public String toString() {
		return "Roll [userid=" + userid + ", role_name=" + role_name + "]";
	}
	
}