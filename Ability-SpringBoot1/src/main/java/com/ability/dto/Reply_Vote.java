package com.ability.dto;

import java.sql.Date;

public class Reply_Vote {
	private int category_id;
	private int voter;
	private int board_id;
	private int counta;
	private Date date_created;
	
    
	
	public int getCounta() {
		return counta;
	}

	public void setCounta(int counta) {
		this.counta = counta;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public int getVoter() {
		return voter;
	}

	public void setVoter(int voter) {
		this.voter = voter;
	}

	public int getBoard_id() {
		return board_id;
	}

	public void setBoard_id(int board_id) {
		this.board_id = board_id;
	}

	public Date getDate_created() {
		return date_created;
	}

	public void setDate_created(Date date_created) {
		this.date_created = date_created;
	}

}
