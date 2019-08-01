package com.ability.dto.custom;

import java.util.List;




public class DeveloperBoardListPaging {
	private List<DeveloperDetailList> postBoardList;
	private int totalPage;
	private int currentPage;
	private int startPageBlock;
	private int endPageBlock;
	private int pageSize;
	private int totalListCount;
	private int Allcount;
	
	
	public List<DeveloperDetailList> getPostBoardList() {
		return postBoardList;
	}
	public void setPostBoardList(List<DeveloperDetailList> postBoardList) {
		this.postBoardList = postBoardList;
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
	public int getAllcount() {
		return Allcount;
	}
	public void setAllcount(int allcount) {
		Allcount = allcount;
	}
	
	
	
	
}
