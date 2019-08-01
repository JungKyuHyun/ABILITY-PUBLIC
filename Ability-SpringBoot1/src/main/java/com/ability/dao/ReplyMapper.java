package com.ability.dao;

import java.util.List;
import java.util.Map;

import com.ability.dto.Reply;
import com.ability.dto.Reply_Vote;
import com.ability.dto.custom.ReplyCustom;

public interface ReplyMapper {

	public List<ReplyCustom> listSelect(Map<String, String> view);
	
	public int insertReply(Map<String, String> view);
	public int updateReply(Map<String, String> view);
	
	public int deleteReply(Map<String, String> view);
	
	public int view_count(Map<String,String> view);
	public Reply getModifyContent(Map<String, String> seq); 
	public int checkReplyVote(Map<String, String> contents) throws Exception;
	public int cancelReplyVote(Map<String, String> contents) throws Exception;
	public int insertReplyVote(Map<String, String> contents) throws Exception;
	public int setModifyReplyOk(Map<String, String> view) throws Exception;
	public Reply listSelectOne(Map<String,String> view);
	public Reply_Vote checkReplyVoteByUserid(Map<String,String> view);
}
