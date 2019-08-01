package com.ability.dto.custom;

import java.util.List;

/**
 * @author 강기훈
 * @summary 관리자페이지, 유저리스트 + 페이징 정보  
 */

public class UserListPaging {
    private List<UserDetail> userList;
    private int totalPage;
	private int currentPage;
	private int startPageBlock;
	private int endPageBlock;
	private int pageSize;
	private int totalListCount;
	
	
	public List<UserDetail> getUserList() {
		return userList;
	}
	public void setUserList(List<UserDetail> userList) {
		this.userList = userList;
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
