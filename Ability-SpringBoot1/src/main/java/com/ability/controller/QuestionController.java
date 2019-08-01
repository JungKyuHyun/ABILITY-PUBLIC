package com.ability.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ability.dto.custom.BoardListPaging;
import com.ability.dto.custom.PostBoardList;
import com.ability.service.QuestionBoardService;
import com.ability.service.UserService;
import com.ability.utils.Pagination;

/**
 * 질문게시판 관련 컨트롤러
 * 
 * @author 정진호
 * @category 질문게시판 rest 컨트롤러
 * 
 */

@RestController
public class QuestionController {
	
	@Autowired
	QuestionBoardService postboardlistservice;
	
	@Autowired
	Pagination pagination;
	
	@Autowired
	UserService service;
	
	public BoardListPaging getboardList(@PathVariable("view")String view,
										@RequestParam(value="currentpage",required=false,defaultValue="1")String currentPage) {

		BoardListPaging boardListPaging = new BoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		
		int totalcount = postboardlistservice.getTotalCount();
		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalcount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int endpage = pagination.printEnd(pagination.getCurPage(), pageSize);
		
		if(endpage > totalcount){
			endpage=totalcount;
		}
		
		viewmap.put("view", view);
		viewmap.put("category","1");
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		
		boardListPaging.setPostBoardList(postboardlistservice.getPostList(viewmap));
		boardListPaging.setCurrentPage(pagination.getCurPage());
		boardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		boardListPaging.setPageSize(pageSize);
		boardListPaging.setStartPageBlock(startPageBlock);
		boardListPaging.setTotalListCount(totalcount);
		boardListPaging.setTotalPage(totalPage);
		
		
		return boardListPaging;
		 
	}
	public PostBoardList getBoardListOne(@RequestParam(value="seq")String seq) {
		Map<String,String> viewmap = new HashMap<String,String>();
		viewmap.put("id", seq);
		PostBoardList plist = postboardlistservice.getPostListOne(viewmap);
	
		return plist;
		
	}
	
	public int setPostBoardInsert(@RequestParam(value="userid")String userid,
								  @RequestParam(value="title")String title,
							      @RequestParam(value="content")String content,
								  @RequestParam(value="tags",required=false,defaultValue="null")String tags) {
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("userid", userid);
		contents.put("title", title);
		contents.put("content", content);
		contents.put("tags", tags);
		
		int result = postboardlistservice.setPostBoard(contents);
		if(result > 0) {
			return result;
		}
		return -1;
		
	}
	
	public PostBoardList listOne(@RequestParam(value="seq")String seq) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id", seq);
		PostBoardList list = postboardlistservice.getPostListOne(contents);
		if(list != null) {
			return list;
		}
		return list;
	}
	public int modifyWrite(@RequestParam(value="seq")String seq,
						   @RequestParam(value="title")String title,
						   @RequestParam(value="tags",required=false, defaultValue="null")String tags,
						   @RequestParam(value="content")String content) { 
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id",seq);
		contents.put("title", title);
		contents.put("tags", tags);
		contents.put("content", content);
		int result = postboardlistservice.setPostBoardUpdate(contents);
		if(result >0) {
			
			return result;
		}
		
		return -1;
	}
	
	public int deleteBoard(@RequestParam(value="seq")String seq) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id", seq);
		int result = postboardlistservice.deletePostBoard(contents);
		if(result >0) {
			return result;
		}
		return -1;
	}
	
	public List<PostBoardList> SeachList(@RequestParam(value="title")String title){
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("title", title);
		List<PostBoardList> list = postboardlistservice.SeachList(contents);
		return list;
	}
	
	public String postRecommand(@RequestParam(value="seq") String seq,
								@RequestParam(value="userid") String userid,
								@RequestParam(value="counta") String counta) {
		String result = "fail";
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("seq",seq);
		contents.put("userid",userid);
		contents.put("counta",counta);
		if(counta.equals("0")) {
			return postboardlistservice.cancelPostVote(contents);
		}
		if(!postboardlistservice.checkPostVote(contents)) {
			result = "success";
		}
		
		return result;
	}
	
	public String postBoardMark(@RequestParam(value="seq") String seq,
								@RequestParam(value="userid") String userid,
								@RequestParam(value="num",required=false,defaultValue="null") String num) {
		String result = "-1";
		Map<String,String> view = new HashMap<String,String>();
		view.put("seq",seq);
		view.put("userid",userid);
		view.put("category_id", "1");
		if(num.equals("1")) {
			return postboardlistservice.cancelPostMark(view);
		}
		if(postboardlistservice.setPostBoardMark(view) != -1 ) {
			result = "1";
		}
		
		return result;
	}
	
	
	public BoardListPaging getboardList(@RequestParam(value="orderby", required=false,defaultValue="0") String orderby,
										@RequestParam(value="currentpage",required=false,defaultValue="1") String currentPage,
										@RequestParam(value="word",required=false,defaultValue="1") String word) {

		BoardListPaging boardListPaging = new BoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		int totalListCount =0;

		Map<String,String> view = new HashMap<String,String>();
		view.put("word", word);
		totalListCount = postboardlistservice.getTotalBoardSearchContentCount(view);
		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage)); 
		int totalPage = pagination.totalPage(totalListCount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int printEnd = pagination.printEnd(pagination.getCurPage(), pageSize);
		boardListPaging.setAllcount(postboardlistservice.AllSearchCount(view));
		if(printEnd>totalListCount) {
			printEnd=totalListCount;
		}
		
		viewmap.put("orderby", orderby);
		viewmap.put("start",String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		viewmap.put("word", word);
		boardListPaging.setPostBoardList(postboardlistservice.getSearchResult(viewmap));	

		
		boardListPaging.setCurrentPage(pagination.getCurPage());
		boardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		boardListPaging.setPageSize(pageSize);
		boardListPaging.setStartPageBlock(startPageBlock);
		boardListPaging.setTotalListCount(totalListCount);
		boardListPaging.setTotalPage(totalPage);
		
		return boardListPaging;
	}
	
}