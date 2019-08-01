package com.ability.dto;

import java.sql.Date;

public class Banner {
	private int id;
	private Date date_created;
	private Date last_updated;
	private String title;
	private String banner_desc;
	private String connect_url;
	private int enabled;
	private String client;
	private String file_path;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getDate_created() {
		return date_created;
	}
	public void setDate_created(Date date_created) {
		this.date_created = date_created;
	}
	public Date getLast_updated() {
		return last_updated;
	}
	public void setLast_updated(Date last_updated) {
		this.last_updated = last_updated;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getBanner_desc() {
		return banner_desc;
	}
	public void setBanner_desc(String banner_desc) {
		this.banner_desc = banner_desc;
	}
	public String getConnect_url() {
		return connect_url;
	}
	public void setConnect_url(String connect_url) {
		this.connect_url = connect_url;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}

    
}