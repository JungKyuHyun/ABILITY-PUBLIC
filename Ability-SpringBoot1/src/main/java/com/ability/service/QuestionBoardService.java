package com.ability.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ability.dao.QuestionMapper;
import com.ability.dto.custom.PostBoardList;

/**
 * 질문게시판 관련 서비스
 * 
 * @author 정진호
 * @category 질문게시판 서비스
 * 
 */


@Service
public class QuestionBoardService {
	
	@Autowired
	QuestionMapper questionMapper;
	
	public List<PostBoardList> getPostList(Map<String, String> view) {
		
		List<PostBoardList> list = questionMapper.listSelect(view);
		
		return list;
	}
	
	public PostBoardList getPostListOne(Map<String, String> view) {
		
		PostBoardList listOne = questionMapper.listDetail(view);
		
		return listOne;
	}
	
	public int setPostBoard(Map<String,String> content) {
		int result = questionMapper.insertPostBoard(content);
			if(result > 0) {
				return result;
			}
		return -1;
	}
	
	public int setPostBoardUpdate(Map<String,String> content) {
		int result = questionMapper.updatePostBoard(content);
		if(result > 0) {
			return result;
		}else {
			return -1;
		}
	}
	
	public int deletePostBoard(Map<String, String> content) {
		int result = questionMapper.deletePostBoard(content);
		if(result > 0) {
			return result;
		}else {
			return -1;
		}
	}
	
	public List<PostBoardList> SeachList(Map<String,String> content) {
		List<PostBoardList> list = questionMapper.SeachList(content);
		return list;
	}
	
	public int getTotalCount() {
		int result = questionMapper.getTotalCount();
		
		return result;
	}
	
	//checkPostVote
		public Boolean checkPostVote(Map<String, String> contents) {
			Boolean result = true;
			try {
				if(questionMapper.checkPostVote(contents) != 1 && questionMapper.checkPostVote(contents) != -1) {
					result = false;
					questionMapper.insertPostVote(contents);
				}
			} catch (Exception e) {
				result = true;
			}
			
			return result;
		}
		
		//cancelPostVote
		public String cancelPostVote(Map<String, String> contents) {
			String result = "plus";
			try {
				if(questionMapper.checkPostVote(contents) != 1) {
					result="minus";
				}
				questionMapper.cancelPostVote(contents);
			} catch (Exception e) {
				result = "fail";
			}
			
			return result;
		}
		
		//cancelPostMark
		public String cancelPostMark(Map<String, String> contents) {
			String result = "fail";
			try {
				result="success";
				questionMapper.cancelPostMark(contents);
			} catch (Exception e) {
				result = "fail";
			}
			
			return result;
		}
		
		public int setPostBoardMark(Map<String, String> view) {
			int result = -1;
			try {
				if(questionMapper.checkPostBoardMark(view) == 0) {
					questionMapper.setPostBoardMark(view);
					result = 1;
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				result = -1;
			}
			
			return result;
		}
		
		
	public List<PostBoardList> getSearchResult(Map<String, String> view) {
			 return questionMapper.getSearchResult(view);
	}
	public int getTotalBoardSearchContentCount(Map<String, String> view) {
			int result = 0;
			try {
				result = questionMapper.getTotalBoardSearchContentCount(view);
			} catch (Exception e) {
				result = 0;
			}
			return result;
		}
	public int totalContentCount() {
		int result = 0;
		try {
			result = questionMapper.getTotalBoardContentCount();
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	
	public int AllSearchCount(Map<String,String> count) {
		int result = 0;
		result = questionMapper.AllSearchCount(count);
		if(result > 0) {
			return result;
		}
		return result;
	}
		
}

