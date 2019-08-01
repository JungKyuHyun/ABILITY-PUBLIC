package com.ability.dto;


public class ChatUser {
	private int userid;
	private String nick_name;
	private String user_image;
	

	public ChatUser(int userid, String nick_name, String user_image) {
		super();
		this.userid = userid;
		this.nick_name = nick_name;
		this.user_image = user_image;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
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
	@Override
	public String toString() {
		return "ChatUser [userid=" + userid + ", nick_name=" + nick_name + ", user_image=" + user_image + "]";
	}
	
}
