package com.ability.dto.custom;

import java.util.List;

import com.ability.dto.Banner;

/**
 * 
 * @author 정규현
 * @summary 메인 페이지 컨트롤러
 */

public class IndexTotalList {
	private List<PostBoardList> fBoard; 
	private List<PostBoardList> qBoard;
	private List<ProjectBoardList> pBoard;
	private List<Banner> banner;
	
	
	
	public IndexTotalList(List<PostBoardList> fBoard, List<PostBoardList> qBoard, List<ProjectBoardList> pBoard,
			List<Banner> banner) {
		super();
		this.fBoard = fBoard;
		this.qBoard = qBoard;
		this.pBoard = pBoard;
		this.banner = banner;
	}
	public List<Banner> getBanner() {
		return banner;
	}
	public void setBanner(List<Banner> banner) {
		this.banner = banner;
	}
	public List<PostBoardList> getfBoard() {
		return fBoard;
	}
	public void setfBoard(List<PostBoardList> fBoard) {
		this.fBoard = fBoard;
	}
	public List<PostBoardList> getqBoard() {
		return qBoard;
	}
	public void setqBoard(List<PostBoardList> qBoard) {
		this.qBoard = qBoard;
	}
	public List<ProjectBoardList> getpBoard() {
		return pBoard;
	}
	public void setpBoard(List<ProjectBoardList> pBoard) {
		this.pBoard = pBoard;
	}
	
	
}
