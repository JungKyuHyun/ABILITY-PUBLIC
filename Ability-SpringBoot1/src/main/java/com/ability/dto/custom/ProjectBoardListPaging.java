package com.ability.dto.custom;

import java.util.List;

/**
 * @author 신선하
 * @summary 비디오 게시판 리스트 + 페이징 정보  
 */

public class ProjectBoardListPaging {
	private List<ProjectBoardList> projectBoardList;
	private int totalPage;
	private int currentPage;
	private int startPageBlock;
	private int endPageBlock;
	private int pageSize;
	private int totalListCount;
	
	
	
	public List<ProjectBoardList> getProjectBoardList() {
		return projectBoardList;
	}
	public void setProjectBoardList(List<ProjectBoardList> projectBoardList) {
		this.projectBoardList = projectBoardList;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getStartPageBlock() {
		return startPageBlock;
	}
	public void setStartPageBlock(int startPageBlock) {
		this.startPageBlock = startPageBlock;
	}
	public int getEndPageBlock() {
		return endPageBlock;
	}
	public void setEndPageBlock(int endPageBlock) {
		this.endPageBlock = endPageBlock;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getTotalListCount() {
		return totalListCount;
	}
	public void setTotalListCount(int totalListCount) {
		this.totalListCount = totalListCount;
	}
	
	
	
	
	
}
