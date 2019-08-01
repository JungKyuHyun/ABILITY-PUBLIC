package com.ability.dto.custom;

import java.sql.Date;

/**
 * 
 * @author 우세림
 * @summary 유저게시판 user, user_detail Join		
 * 
 */

public class DeveloperDetailList {
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
	private long tel;
	private String user_info;
	private String tags;
	private String role_name;
	
	
	
	
	public String getRole_name() {
		return role_name;
	}
	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
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
	public long getTel() {
		return tel;
	}
	public void setTel(long tel) {
		this.tel = tel;
	}
	public String getUser_info() {
		return user_info;
	}
	public void setUser_info(String user_info) {
		this.user_info = user_info;
	}
	
	@Override
	public String toString() {
		return "DeveloperDetailList [userid=" + userid + ", email=" + email + ", password=" + password + ", nick_name="
				+ nick_name + ", name=" + name + ", enabled=" + enabled + ", area=" + area + ", data_created="
				+ date_created + ", reputation=" + reputation + ", last_updated=" + last_updated + ", user_image="
				+ user_image + ", tel=" + tel + ", user_info=" + user_info + "]";
	}
	
}
