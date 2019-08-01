package com.ability.dto;

import java.sql.Date;

public class Reply {
	private int id;
	private int category_id; 
	private int board_id;
	private int userid;
	private Date date_created;
	private Date last_updated;
	private String reply_content;
	private int vote_count;
	private int enabled;
	
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
	public int getBoard_id() {
		return board_id;
	}
	public void setBoard_id(int board_id) {
		this.board_id = board_id;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
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
	public String getReply_content() {
		return reply_content;
	}
	public void setReply_content(String reply_content) {
		this.reply_content = reply_content;
	}
	public int getVote_count() {
		return vote_count;
	}
	public void setVote_count(int vote_count) {
		this.vote_count = vote_count;
	}
	public int getEnabled() {
		return enabled;
	}
	public void setEnabled(int enabled) {
		this.enabled = enabled;
	}
	
	@Override
	public String toString() {
		return "Reply [id=" + id + ", category_id=" + category_id + ", board_id=" + board_id + ", userid=" + userid
				+ ", date_created=" + date_created + ", last_updated=" + last_updated + ", reply_content="
				+ reply_content + ", vote_count=" + vote_count + ", enabled=" + enabled + "]";
	}
	
	
}