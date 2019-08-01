package com.ability.dto;

import java.util.Date;

public class Post_Board {
	private int id;
	private int category_id;
	private int userid;
	private int enabled;
	private Date date_created;
	private Date last_updated;
	private int view_count;
	private String title;
	private String content;
	private String file_path;
	private int accuse;
	private int closed;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCategory_id() {
		return category_id;
	}
	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
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
	public int getView_count() {
		return view_count;
	}
	public void setView_count(int view_count) {
		this.view_count = view_count;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public int getAccuse() {
		return accuse;
	}
	public void setAccuse(int accuse) {
		this.accuse = accuse;
	}
	public int getClosed() {
		return closed;
	}
	public void setClosed(int closed) {
		this.closed = closed;
	}
	
	@Override
	public String toString() {
		return "Post_board [id=" + id + ", category_id=" + category_id + ", userid=" + userid + ", enabled=" + enabled
				+ ", date_created=" + date_created + ", last_updated=" + last_updated + ", view_count=" + view_count
				+ ", title=" + title + ", content=" + content + ", file_path=" + file_path + ", accuse=" + accuse
				+ ", closed=" + closed + "]";
	}
	
	
}