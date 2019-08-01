package com.ability.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ability.dao.ReplyCommentMapper;
import com.ability.dto.Reply_Comment;
import com.ability.dto.custom.ReplyCommentCustom;

@Service
public class ReplyCommentService {

	@Autowired
	ReplyCommentMapper commentMapper;
	
	public List<ReplyCommentCustom> getReplyCommentList(Map<String, String> view){
		List<ReplyCommentCustom> list = commentMapper.listSelect(view);
		
		return list;
	}
	
	public Reply_Comment getReplyCommentListOne(Map<String, String> view) {
		Reply_Comment replyCommentOne = commentMapper.listSelectOne(view);
		
		return replyCommentOne;
	}
	
	public int replyCommentInsert(Map<String, String> view) {
		int result = commentMapper.insertReplyComment(view);
		
		if(result > 0) {
			return result;
		}
		return -1;
	}
	
	public int replyCommentUpdate(Map<String, String> view) {
		int result = commentMapper.updateReplyComment(view);
		
		if(result > 0) {
			return result;
		}
		return -1;
	}
	
	public int replyCommentDelete(Map<String, String> view) {
		int result = commentMapper.deleteReplyComment(view);
		
		if(result >0) {
			return result;
		}
		return -1;
	}
	
	//checkPostCommentVote
			public Boolean checkPostCommentVote(Map<String, String> contents) {
				Boolean result = true;
				try {
					if(commentMapper.checkPostCommentVote(contents) != 1 && commentMapper.checkPostCommentVote(contents) != -1) {
						result = false;
						commentMapper.insertPostCommentVote(contents);
					}
				} catch (Exception e) {
					result = true;
				}
				
				return result;
			}
			
			//cancelCommentVote
			public String cancelPostCommentVote(Map<String, String> contents) {
				String result = "plus";
				try {
					if(commentMapper.checkPostCommentVote(contents) != 1) {
						result="minus";
					}
					commentMapper.cancelPostCommentVote(contents);
				} catch (Exception e) {
					result = "fail";
				}
				
				return result;
			}
}
