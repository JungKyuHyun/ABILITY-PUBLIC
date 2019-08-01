package com.ability.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ability.dto.Reply;
import com.ability.dto.Reply_Vote;
import com.ability.dto.custom.ReplyCustom;
import com.ability.service.ReplyService;

@RestController
public class ReplyController {
	
	@Autowired
	ReplyService replyService;
	
	public List<ReplyCustom> getReplyList(@RequestParam(value="seq")String seq){
		Map<String, String> viewReply = new HashMap<String, String>();
		viewReply.put("id", seq);
		List<ReplyCustom> rList = replyService.getReplyList(viewReply);
		
		return rList;
	}
	
	public int setReplyInsert(@RequestParam(value="userid")String userid,
							  @RequestParam(value="seq")String seq,
							  @RequestParam(value="reply_content")String reply_content) {
		Map<String, String>contents = new HashMap<String, String>();
		contents.put("board_id", seq);
		contents.put("userid", userid);
		contents.put("reply_content", reply_content);
		
		int result = replyService.replyInsert(contents);
		if(result > 0) {
			return result;
		}
		return -1;
		
	}
	
	public int modifyReply(@RequestParam(value="id")String id,
						   @RequestParam(value="reply_content")String reply_content) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id", id);
		contents.put("reply_content", reply_content);
		
		int result = replyService.replyUpdate(contents);
		if(result > 0) {
			return result;
		}
		return result;
	}
	public int deleteReply(@RequestParam(value="id")String id) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id", id);
		int result = replyService.replyDelete(contents);
		if(result > 0) {
			return result;
		}
		return -1;
	}
	
	public String postReplyRecommand(@RequestParam(value="seq") String seq,
								@RequestParam(value="userid") String userid,
								@RequestParam(value="counta") String counta) {
		String result = "fail";
		Map<String,String> contents = new HashMap<String,String>();
		contents.put("seq",seq);
		contents.put("userid",userid);
		contents.put("counta",counta);
		contents.put("category_id", "1");
		if(counta.equals("0")) {
			return replyService.cancelReplyVote(contents);
		}
		if(!replyService.checkReplyVote(contents)) {
			result = "success";
		}
		
		return result;
	}
	
	public Reply modifyContent(@RequestParam(value="seq") String seq) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("seq",seq);
		
		return replyService.getModifyContent(contents);
	}
	
	public String modifyContentOk(@RequestParam(value="seq")String seq,
								  @RequestParam(value="content")String content) {
		
		Map<String, String> view = new HashMap<String, String>();
		view.put("seq", seq);
		view.put("content", content);
		view.put("category_id", "1");
		return replyService.setModifyReplyOk(view);
	}
	
	public Reply getReplyListtOne(@RequestParam(value="id")String id){
		Map<String, String> viewReplyComment = new HashMap<String, String>();
		viewReplyComment.put("id", id);
		Reply rList = replyService.getReplyListOne(viewReplyComment);
		return rList;
	}
	
	public int modifyReplyComment(@RequestParam(value="id" )String id,
								  @RequestParam(value="reply_content") String reply_content)	{
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("id", id);
		contents.put("reply_content", reply_content);
		
		int result = replyService.replyUpdate(contents);
		if(result > 0) {
			return result;
		}
		
		return -1;
	}
	
	public Reply_Vote checkReplyVote(@RequestParam(value="seq")String seq,
									 @RequestParam(value="userid")String userid) {
		Map<String, String> contents = new HashMap<String, String>();
		contents.put("seq", seq);
		contents.put("userid", userid);
		
		Reply_Vote replyVote = replyService.checkReplyVoteByUserid(contents);
		if(replyVote != null) {
		return replyVote;
		}
		return null;
	}
	
	
}
