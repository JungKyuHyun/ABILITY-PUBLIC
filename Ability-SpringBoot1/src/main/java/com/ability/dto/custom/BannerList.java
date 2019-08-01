package com.ability.dto.custom;

import java.util.Date;

public class BannerList {
    private int id;
    private int click_count;
    private String image;
    private Date date_created;
    private String title;
    private String url;
    private String client;
    private String banner_desc;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getClick_count() {
		return click_count;
	}
	public void setClick_count(int click_count) {
		this.click_count = click_count;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Date getDate_created() {
		return date_created;
	}
	public void setDate_created(Date date_created) {
		this.date_created = date_created;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
	public String getBanner_desc() {
		return banner_desc;
	}
	public void setBanner_desc(String banner_desc) {
		this.banner_desc = banner_desc;
	}
    
    
}
