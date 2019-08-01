package com.ability.dto;

import java.sql.Date;

public class Accuse {
	private int id;
	private int prosecutor;
	private int category_id;
	private String content;
	private int board_id;
	private Date date_created;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProsecutor() {
		return prosecutor;
	}

	public void setProsecutor(int prosecutor) {
		this.prosecutor = prosecutor;
	}

	public int getCategory_id() {
		return category_id;
	}

	public void setCategory_id(int category_id) {
		this.category_id = category_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
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

	@Override
	public String toString() {
		return "Accuse [id=" + id + ", prosecutor=" + prosecutor + ", category_id=" + category_id + ", content="
				+ content + ", board_id=" + board_id + ", date_created=" + date_created + "]";
	}

}
