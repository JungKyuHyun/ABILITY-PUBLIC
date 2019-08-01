package com.ability.dto.custom;

import java.sql.Date;

/**
 * 
 * @author 신선하
 * @summary 댓글을 받기 위한 디티오
 *
 */

public class ProjectBoardComment {
	private int id;
	private int reply_id;
	private int userid;
	private Date date_created;
	private String comment_content;
	private int counta;
	private int reputation;
	private String nick_name;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getReply_id() {
		return reply_id;
	}
	public void setReply_id(int reply_id) {
		this.reply_id = reply_id;
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
	public String getComment_content() {
		return comment_content;
	}
	public void setComment_content(String comment_content) {
		this.comment_content = comment_content;
	}
	public int getReputation() {
		return reputation;
	}
	public void setReputation(int reputation) {
		this.reputation = reputation;
	}
	public String getNick_name() {
		return nick_name;
	}
	public void setNick_name(String nick_name) {
		this.nick_name = nick_name;
	}
	public int getCounta() {
		return counta;
	}
	public void setCounta(int counta) {
		this.counta = counta;
	}

}
