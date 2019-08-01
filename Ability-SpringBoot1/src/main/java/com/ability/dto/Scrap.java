package com.ability.dto;

import java.sql.Date;

public class Scrap {
	private int id;
	private int userid;
	private int category_id;
	private String title;
	private String url;
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

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
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

	public Date getDate_created() {
		return date_created;
	}

	public void setDate_created(Date date_created) {
		this.date_created = date_created;
	}

	@Override
	public String toString() {
		return "Scrap [id=" + id + ", userid=" + userid + ", category_id=" + category_id + ", title=" + title + ", url="
				+ url + ", date_created=" + date_created + "]";
	}

}
