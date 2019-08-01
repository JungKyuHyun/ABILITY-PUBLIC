package com.ability.utils;

import org.springframework.stereotype.Component;

/**
 * @author 정규현
 * @summary 페이징을 위한 클래스 생성
 */

@Component
public class Pagination {
	private int pageSize;
	private int curPage;

	public Pagination() {
		pageSize = 15;
		curPage = 1;
	}
	
	public int totalPage(int totalListCount, int pageSize) {
		int totalPage = totalListCount / pageSize;
		if(totalListCount % pageSize>0) {
			totalPage++;
		}
		return totalPage;
	}

	public int startPageBlock(int currentPage, int pageSize) {
		int startPage =(currentPage / pageSize)*pageSize+1;
		if(currentPage!=1 && currentPage%pageSize ==0) {
			startPage =((currentPage-1) / pageSize)*pageSize+1;
		}
		return startPage;
	}
	
	public int endPageBlock(int startPage, int pageSize, int totalPage) {
		int endPage = startPage + pageSize -1;
		if(endPage>totalPage) {
			endPage=totalPage;
		}
		return endPage;		
	}
	
	public int printStart(int currentPage, int pageSize) {
		int printStart = currentPage * pageSize -(pageSize -1);
		return printStart-1;
	}
	
	public int printEnd(int currentPage, int pageSize) {
		int printEnd = currentPage * pageSize;
		return printEnd-1;
	}
	
	
	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}
}
