package com.ability.dao;

import java.util.List;
import java.util.Map;

import com.ability.dto.Reply_Comment;
import com.ability.dto.custom.ReplyCommentCustom;

public interface ReplyCommentMapper {
	
	public List<ReplyCommentCustom> listSelect(Map<String, String> view);
	
	public Reply_Comment listSelectOne(Map<String,String> view);
	
	public int insertReplyComment(Map<String, String> view);
	
	public int updateReplyComment(Map<String, String> view);
	
	public int deleteReplyComment(Map<String, String> view);
	
	public int checkPostCommentVote(Map<String, String> contents) throws Exception;
	public int cancelPostCommentVote(Map<String, String> contents) throws Exception;
	public int insertPostCommentVote(Map<String, String> contents) throws Exception;
}
