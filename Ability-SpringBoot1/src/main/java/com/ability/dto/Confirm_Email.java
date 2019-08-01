package com.ability.dto;

import java.sql.Date;

public class Confirm_Email {
	private int id;
	private int userid;
	private String securitiy_key;
	private Date date_created;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getSecuritiy_key() {
		return securitiy_key;
	}
	public void setSecuritiy_key(String securitiy_key) {
		this.securitiy_key = securitiy_key;
	}
	public Date getDate_created() {
		return date_created;
	}
	public void setDate_created(Date date_created) {
		this.date_created = date_created;
	}
	
	
}
