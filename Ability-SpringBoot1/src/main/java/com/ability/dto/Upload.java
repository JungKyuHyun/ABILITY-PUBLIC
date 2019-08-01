package com.ability.dto;

public class Upload {
	private int id;
	private int category_id;
	private int board_id;
	private String file_path;
	private String video_path;
	private String ppt_path;
	
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
	public String getFile_path() {
		return file_path;
	}
	public void setFile_path(String file_path) {
		this.file_path = file_path;
	}
	public String getVideo_path() {
		return video_path;
	}
	public void setVideo_path(String video_path) {
		this.video_path = video_path;
	}
	public String getPpt_path() {
		return ppt_path;
	}
	public void setPpt_path(String ppt_path) {
		this.ppt_path = ppt_path;
	}
	
	@Override
	public String toString() {
		return "Upload [id=" + id + ", category_id=" + category_id + ", board_id=" + board_id + ", file_path="
				+ file_path + ", video_path=" + video_path + ", ppt_path=" + ppt_path + "]";
	}
	
}
