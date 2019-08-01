package com.ability.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ability.dto.custom.ProjectBoardComment;
import com.ability.dto.custom.ProjectBoardList;
import com.ability.dto.custom.ProjectBoardListPaging;
import com.ability.dto.custom.ProjectBoardModify;
import com.ability.dto.custom.ReplyBoard;
import com.ability.service.ProjectBoardService;
import com.ability.utils.Pagination;

/**
 * @author 신선하
 * @summary 비디오게시판 레스트 컨트롤러
 */

@RestController
public class ProjectController {
	
	@Autowired
	ProjectBoardService service;
	
	@Autowired
	Pagination pagination;
	
	public ProjectBoardListPaging getProjectBoardList(
										@RequestParam(value="orderby") String orderby,
										@RequestParam(value="currentpage",
													  required=false,
													  defaultValue="1") String currentPage,
										@RequestParam(value="word",
													  required=false,
													  defaultValue="1") String word) {
		ProjectBoardListPaging projectBoardListPaging = new ProjectBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		int totalListCount =0;
		if(word.equals("1")) {
			totalListCount = service.totalContentCount("2");
		}else {
			Map<String,String> view = new HashMap<String,String>();
			view.put("category_id", "2");
			view.put("word", word);
			totalListCount = service.getTotalBoardSearchContentCount(view);	
		}
		
		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage)); 
		int totalPage = pagination.totalPage(totalListCount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int printEnd = pagination.printEnd(pagination.getCurPage(), pageSize);
		
		if(printEnd>totalListCount) {
			printEnd=totalListCount;
		}
		
		viewmap.put("orderby", orderby);
		viewmap.put("category", "2");
		viewmap.put("start",String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		if(word.equals("1")) {
			projectBoardListPaging.setProjectBoardList(service.getProjectList(viewmap));	
		}else {
			viewmap.put("word", word);
			projectBoardListPaging.setProjectBoardList(service.getSearchResult(viewmap));	
		}
		
		projectBoardListPaging.setCurrentPage(pagination.getCurPage());
		projectBoardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		projectBoardListPaging.setPageSize(pageSize);
		projectBoardListPaging.setStartPageBlock(startPageBlock);
		projectBoardListPaging.setTotalListCount(totalListCount);
		projectBoardListPaging.setTotalPage(totalPage);
		
		return projectBoardListPaging;
	}
	
	public int setProjectBoardInsert(@RequestParam(value="userid")String userid,
								  @RequestParam(value="title")String title,
							      @RequestParam(value="content")String content,
							      @RequestParam(value="file_path")String file_path,
								  @RequestParam(value="tags",required=false,defaultValue="null")String tags) {
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("userid", userid);
		contents.put("title", title);
		contents.put("content", content);
		contents.put("tags", tags);
		contents.put("file_path", file_path);
		
		int result = service.setBoard(contents);
		if(result > 0) {
			return result;
		}
		return -1;
	}
	
	public ProjectBoardList listOne(@RequestParam(value="seq") String seq) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id", seq);
		service.updateViewCount(contents);
		ProjectBoardList list = service.getProjectListOne(contents);
		if(list != null) {
			return list;
		}
		return list;
	}
	
	public int modifyWrite(@RequestParam(value="seq")String seq,
						   @RequestParam(value="title")String title,
						   @RequestParam(value="tags")String tags,
						   @RequestParam(value="file_path")String file_path,
						   @RequestParam(value="content")String content) { 
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id",seq);
		contents.put("title", title);
		contents.put("tags", tags);
		contents.put("content", content);
		contents.put("file_path", file_path);
		int result = service.setProjectBoardUpdate(contents);
		if(result >0) {
			return result;
		}
		return -1;
	}
	
	public ProjectBoardModify modifyContent(@RequestParam(value="seq") String seq) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("seq",seq);
		
		return service.getModifyContent(contents);
	}
	
	public List<ReplyBoard> getReply(@RequestParam(value="seq") String seq){
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("seq",seq);
		
		return service.getReply(contents);
	}
	
	public int insertReply(@RequestParam(value="userid") String userid,
						@RequestParam(value="reply") String reply,
						@RequestParam(value="seq") String seq) {

		Map<String, String> contents = new HashMap<String, String>();
		contents.put("userid", userid);
		contents.put("reply", reply);
		contents.put("seq", seq);
		service.setReply(contents);
		
		return 0;
	}
	
	public int insertComment(@RequestParam(value="replyid") String replyid,
							@RequestParam(value="userid") String userid,
							@RequestParam(value="comment") String comment) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("replyid", replyid);
		contents.put("userid", userid);
		contents.put("comment", comment);
		service.setComment(contents);
		return 0;
	}
	
	public List<ProjectBoardComment> getCommentList(@RequestParam(value="replyid") String replyid){
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("replyid", replyid);
		
		return service.getCommentList(contents);
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
			return service.cancelPostVote(contents);
		}
		if(!service.checkPostVote(contents)) {
			result = "success";
		}
		
		return result;
	}
	
	public String postBoardFakeDelete(@RequestParam(value="seq") String seq) {
		String result = "fail";
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("seq",seq);
		
		if(service.fakeDelete(contents)) {
			result = "success";
		}
		
		return result;
	}
	
	public String postReplyRecommand(@RequestParam(value="seq") String seq,
								@RequestParam(value="userid") String userid,
								@RequestParam(value="counta") String counta) {
		String result = "fail";
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("seq",seq);
		contents.put("userid",userid);
		contents.put("counta",counta);
		contents.put("category_id", "2");
		if(counta.equals("0")) {
			return service.cancelPostReplyVote(contents);
		}
		if(!service.checkPostReplyVote(contents)) {
			result = "success";
		}
		
		return result;
	}
	
	public String postBoardReplyFakeDelete(@RequestParam(value="seq") String seq) {
		String result = "fail";
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("seq",seq);
		contents.put("category_id", "2");
		
		if(service.fakeReplyDelete(contents)) {
			result = "success";
		}
		
		return result;
	}
	
	public String postBoardCommentFakeDelete(@RequestParam(value="seq") String seq) {
		String result = "fail";
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("seq",seq);
		contents.put("category_id", "2");
		
		if(service.fakeCommentDelete(contents)) {
			result = "success";
		}
		
		return result;
	}
	
	public String postBoardCommentModify(@RequestParam(value="commentid") String commentid,
										@RequestParam(value="content") String content) {
		
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("commentid",commentid);
		contents.put("content",content);
		contents.put("category_id", "2");
		
		return service.ProjectBoardCommentModify(contents);
	}
	
	public String postCommentRecommand(@RequestParam(value="seq") String seq,
								@RequestParam(value="userid") String userid,
								@RequestParam(value="counta") String counta) {
		String result = "fail";
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("seq",seq);
		contents.put("userid",userid);
		contents.put("counta",counta);
		contents.put("category_id", "2");
		if(counta.equals("0")) {
			return service.cancelPostCommentVote(contents);
		}
		if(!service.checkPostCommentVote(contents)) {
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
		view.put("category_id", "2");
		if(num.equals("1")) {
			return service.cancelPostMark(view);
		}
		if(service.setPostBoardMark(view) != -1 ) {
			result = "1";
		}
		
		return result;
	}
}