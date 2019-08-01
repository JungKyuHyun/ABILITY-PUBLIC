package com.ability.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

public abstract class User {
	private int userid;
	private String email;
	private String password;
	private String nick_name;
	private String name;
	private int enabled;
	private String area;
	private Date date_created;
	private int reputation;
	private Date last_updated;
	private String user_image;
	private MultipartFile files;
	
	
	public MultipartFile getFiles() {
		return files;
	}
	public void setFiles(MultipartFile files) {
		this.files = files;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNick_name() {
		return nick_name;
	}
	public void setNick_name(String nick_name) {
		this.nick_name = nick_name;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public Date getDate_created() {
		return date_created;
	}
	public void setDate_created(Date data_created) {
		this.date_created = data_created;
	}
	public int getReputation() {
		return reputation;
	}
	public void setReputation(int reputation) {
		this.reputation = reputation;
	}
	public Date getLast_updated() {
		return last_updated;
	}
	public void setLast_updated(Date last_updated) {
		this.last_updated = last_updated;
	}
	public String getUser_image() {
		return user_image;
	}
	public void setUser_image(String user_image) {
		this.user_image = user_image;
	}
	@Override
	public String toString() {
		return "User [userid=" + userid + ", email=" + email + ", password=" + password + ", nick_name=" + nick_name
				+ ", name=" + name + ", enabled=" + enabled + ", area=" + area + ", data_created=" + date_created
				+ ", reputation=" + reputation + ", last_updated=" + last_updated + "]";
	}
}