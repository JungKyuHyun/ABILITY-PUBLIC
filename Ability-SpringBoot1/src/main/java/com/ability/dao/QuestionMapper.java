package com.ability.dao;

import java.util.List;
import java.util.Map;

import com.ability.dto.custom.PostBoardList;

/**
 * 질문게시판 관련 Mapper
 * 
 * @author 정진호
 * @summary 질문게시판 DAO
 * 
 */

public interface QuestionMapper {
	
	public List<PostBoardList> listSelect(Map<String, String> view);
	// 질문 상세페이지 함수
	public PostBoardList listDetail(Map<String, String> view);
	
	public int insertPostBoard(Map<String, String> content);
	
	// 질문 수정 페이지
	public int updatePostBoard(Map<String, String> content);
		
	public int deletePostBoard(Map<String, String> content);
	
	public List<PostBoardList> SeachList(Map<String, String> content);
	
	//페이징
	public int getTotalCount();
	
	public int checkPostVote(Map<String, String> contents) throws Exception;
	public int insertPostVote(Map<String, String> contents) throws Exception;
	public int cancelPostVote(Map<String, String> contents) throws Exception;
	
	public int setPostBoardMark(Map<String, String> view) throws Exception;
	public int cancelPostMark(Map<String, String> view) throws Exception;
	public int checkPostBoardMark(Map<String, String> contents) throws Exception;
	
	public List<PostBoardList> getSearchResult(Map<String, String> view);
	public int getTotalBoardSearchContentCount(Map<String, String> view) throws Exception;
	public int getTotalBoardContentCount() throws Exception;
	public int AllSearchCount(Map<String,String> count);
}
