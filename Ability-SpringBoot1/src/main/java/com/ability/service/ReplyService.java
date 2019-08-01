package com.ability.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ability.dao.ReplyMapper;
import com.ability.dto.Reply;
import com.ability.dto.Reply_Vote;
import com.ability.dto.custom.ReplyCustom;

@Service
public class ReplyService {
	
	@Autowired
	ReplyMapper replyMapper;
	
	public List<ReplyCustom> getReplyList(Map<String, String> view){
		List<ReplyCustom> list = replyMapper.listSelect(view);

		return list;
	}
	
	public int replyInsert(Map<String, String> view) {
		int result = replyMapper.insertReply(view);

		if(result > 0) {
			return result;
		}
		return -1;
	}
	
	public int replyUpdate(Map<String, String> view) {
		int result = replyMapper.updateReply(view);
		
		if(result >0) {
			return result;
		}
		return -1;
	}
	
	public int replyDelete(Map<String, String> view) {
		int result = replyMapper.deleteReply(view);
		if(result > 0) {
			return result;
		}
		return -1;
	}
	
	//checkPostReplyVote
		public Boolean checkReplyVote(Map<String, String> contents) {
			Boolean result = true;
			try {
				if(replyMapper.checkReplyVote(contents) != 1 && replyMapper.checkReplyVote(contents) != -1) {
					result = false;
					replyMapper.insertReplyVote(contents);
				}
			} catch (Exception e) {
				result = true;
			}
			
			return result;
		}
		
		//cancelPostVote
		public String cancelReplyVote(Map<String, String> contents) {
			String result = "plus";
			try {
				if(replyMapper.checkReplyVote(contents) != 1) {
					result="minus";
				}
				replyMapper.cancelReplyVote(contents);
			} catch (Exception e) {
				result = "fail";
			}
			
			return result;
		}
		
		
		public Reply getModifyContent(Map<String, String> seq) {
			return replyMapper.getModifyContent(seq);
		}
		
		//setModifyReplyOk
		public String setModifyReplyOk(Map<String, String> view) {
			String result = "fail";
			try {
				replyMapper.setModifyReplyOk(view);
				result = "success";
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			return result;
		}
		
		public Reply getReplyListOne(Map<String, String> view) {
			
			return replyMapper.listSelectOne(view);
		}
		
		public Reply_Vote checkReplyVoteByUserid(Map<String, String> view) {
			
			return replyMapper.checkReplyVoteByUserid(view);
		}
}
