package com.ability.dto.custom;

/**
 * @author 신선하
 * @summary 프로젝트 보드 수정 DTO
 */


public class ProjectBoardModify {
	private String title;
	private String content;
	private String file_path;
	private String tags;
	
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
	public String getTags() {
		return tags;
	}
	public void setTags(String tags) {
		this.tags = tags;
	}
}
