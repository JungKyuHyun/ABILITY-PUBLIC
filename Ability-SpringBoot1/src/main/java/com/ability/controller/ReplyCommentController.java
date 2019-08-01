package com.ability.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ability.dto.Reply_Comment;
import com.ability.dto.custom.ReplyCommentCustom;
import com.ability.service.ReplyCommentService;

@RestController
public class ReplyCommentController {

	@Autowired
	ReplyCommentService commentService;
	
	public List<ReplyCommentCustom> getReplyCommentList(@RequestParam(value="seq")String seq,
														@RequestParam(value="reply_id")String reply_id){
		Map<String, String> viewReplyComment = new HashMap<String, String>();
		viewReplyComment.put("id", seq);
		viewReplyComment.put("reply_id", reply_id);
		
		
		return commentService.getReplyCommentList(viewReplyComment);
	}
	
	public Reply_Comment getReplyCommentListOne(@RequestParam(value="id")String id){
		Map<String, String> viewReplyComment = new HashMap<String, String>();
		viewReplyComment.put("id", id);
		
		
		return commentService.getReplyCommentListOne(viewReplyComment);
	}
	
	public int setReplyCommentInsert(@RequestParam(value="seq")String seq,
									 @RequestParam(value="userid") String userid,
									 @RequestParam(value="comment_content") String comment_content, 
									 @RequestParam(value="reply_id") String reply_id){
									 
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("seq", seq);
		contents.put("reply_id", reply_id);
		contents.put("userid", userid);
		contents.put("comment_content", comment_content);
		
		int result = commentService.replyCommentInsert(contents);
		
		if(result > 0) {
			return result;
		}
		return -1;
	}
	
	public int modifyReplyComment(@RequestParam(value="id")String id,
								  @RequestParam(value="comment_content")String comment_content){
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id", id);
		contents.put("comment_content", comment_content);
		
		int result = commentService.replyCommentUpdate(contents);
		if(result > 0) {
			return result;
		}
		
		return -1;
	}
	
	public int deleteReplyComment(@RequestParam(value="id")String id) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id", id);
		
		int result = commentService.replyCommentDelete(contents);
		if(result > 0) {
			return result;
		}
		return -1;
		
	}
	
	public String postCommentRecommand(@RequestParam(value="seq") String seq,
								@RequestParam(value="userid") String userid,
								@RequestParam(value="counta") String counta) {
		String result = "fail";
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("seq",seq);
		contents.put("userid",userid);
		contents.put("counta",counta);
		contents.put("category_id", "1");
		if(counta.equals("0")) {
			return commentService.cancelPostCommentVote(contents);
		}
		if(!commentService.checkPostCommentVote(contents)) {
			result = "success";
		}
		
		return result;
	}
	
	
}
