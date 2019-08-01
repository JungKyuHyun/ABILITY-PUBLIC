package com.ability.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ability.dao.DbMapper;
import com.ability.dto.custom.PostBoardComment;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.PostBoardModify;
import com.ability.dto.custom.ReplyBoard;
import com.ability.dto.custom.Reputation;
import com.ability.dto.custom.UserSimple;
import com.ability.utils.CreateRandomPassword;
import com.ability.utils.FindPasswordMail;
import com.ability.utils.RandomImageAPI;
import com.ability.utils.SignUpAuthMail;

/**
 * 
 * @author jkh
 * @summary 회원가입, 로그인 등 회원 관련 서비스를 처리하는 로직
 * 
 */

@Service
public class UserService {
	
	@Autowired
	DbMapper mapper;
	
	@Autowired
	SignUpAuthMail signUpAuthMail;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	FindPasswordMail findPasswordMail;
	
	@Autowired
	CreateRandomPassword createRandomPassword;
	
	
	//login
	public UserSimple authenticate(String email, String password) {
		UserSimple userSimple = null;
		
		return userSimple;
	}
	
	//sign up
	public int signUpUser(String email, String password, String nick_name, String name, String area) {
		
		return result;
	}
	
	//sign up mail_security_key 
	public Boolean signUpMailAuthConfirm(String security_key) {
	
		return result;
	}
	
	//confirm overlap email 
	public Boolean isOverlapEmail(String email) {
		Boolean result = false;
		
		return result;
	}
	
	//confirm overlap nick_name 
	public Boolean isOverlapNickName(String nickname) {
	
		return result;
	}
	
	//check account
	public int checkAccount(String email, String name) {
	
		return userid;
	}
	
	//community board list
	public List<PostBoardList> getPostList(Map<String, String> view) {
		 return mapper.getCommunityList(view);
	}
	
	//insert board
	public int setBoard(Map<String,String> content) {
		int result = mapper.insertBoard(content);
			if(result > 0) {
				return result;
			}
		return -1;
	}
	
	//getTotalBoardContentCount
	public int totalContentCount(String category_id) {
		int result = 0;
		try {
			result = mapper.getTotalBoardContentCount(category_id);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	
	//getTotalBoardSearchContentCount
	public int getTotalBoardSearchContentCount(Map<String, String> view) {
		int result = 0;
		try {
			result = mapper.getTotalBoardSearchContentCount(view);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	
	//getPostListOne
	public PostBoardList getPostListOne(Map<String, String> view) {
		return mapper.listDetail(view);
	}
	
	//setPostBoardUpdate
	public int setPostBoardUpdate(Map<String,String> content) {
		int result = mapper.updatePostBoard(content);
		if(result > 0) {
			return result;
		}else {
			return -1;
		}
	}
	
	//updateViewCount
	public void updateViewCount(Map<String, String> boardid) {
		mapper.updateViewCount(boardid);
	}
	
	//getModifyContent
	public PostBoardModify getModifyContent(Map<String, String> seq) {
		return mapper.getModifyContent(seq);
	}
	
	//getReply
	public List<ReplyBoard> getReply(Map<String, String> seq){
		return mapper.getReply(seq);
	}
	
	//setReply
	public int setReply(Map<String, String> contents) {
		return mapper.setReply(contents);
	}
	
	//setComment
	public int setComment(Map<String, String> contnents) {
		return mapper.setComment(contnents);
	}
	
	//getCommentList
	public List<PostBoardComment> getCommentList(Map<String,String> contents){
		return mapper.getCommentList(contents);
	}
	
	//checkPostVote
	public Boolean checkPostVote(Map<String, String> contents) {
		Boolean result = true;
		try {
			if(mapper.checkPostVote(contents) != 1 && mapper.checkPostVote(contents) != -1) {
				result = false;
				mapper.insertPostVote(contents);
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
			if(mapper.checkPostVote(contents) != 1) {
				result="minus";
			}
			mapper.cancelPostVote(contents);
		} catch (Exception e) {
			result = "fail";
		}
		
		return result;
	}
	
	
	//checkPostReplyVote
	public Boolean checkPostReplyVote(Map<String, String> contents) {
		Boolean result = true;
		try {
			if(mapper.checkPostReplyVote(contents) != 1 && mapper.checkPostReplyVote(contents) != -1) {
				result = false;
				mapper.insertPostReplyVote(contents);
			}
		} catch (Exception e) {
			result = true;
		}
		
		return result;
	}
	
	//cancelPostVote
	public String cancelPostReplyVote(Map<String, String> contents) {
		String result = "plus";
		try {
			if(mapper.checkPostReplyVote(contents) != 1) {
				result="minus";
			}
			mapper.cancelPostReplyVote(contents);
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
			mapper.cancelPostMark(contents);
		} catch (Exception e) {
			result = "fail";
		}
		
		return result;
	}
	
	//checkPostCommentVote
		public Boolean checkPostCommentVote(Map<String, String> contents) {
			Boolean result = true;
			try {
				if(mapper.checkPostCommentVote(contents) != 1 && mapper.checkPostCommentVote(contents) != -1) {
					result = false;
					mapper.insertPostCommentVote(contents);
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
				if(mapper.checkPostCommentVote(contents) != 1) {
					result="minus";
				}
				mapper.cancelPostCommentVote(contents);
			} catch (Exception e) {
				result = "fail";
			}
			
			return result;
		}
		
		
	//fakeDelete
	public Boolean fakeDelete(Map<String, String> contents) {
		Boolean result = false;
		try {
			mapper.fakeDelete(contents);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}
	
	//fakeReplyDelete
	public Boolean fakeReplyDelete(Map<String, String> contents) {
		Boolean result = false;
		try {
			mapper.fakeReplyDelete(contents);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}
	
	//fakeCommentDelete
	public Boolean fakeCommentDelete(Map<String, String> contents) {
		Boolean result = false;
		try {
			mapper.fakeCommentDelete(contents);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}
	
	//postBoardCommentModify
	public String postBoardCommentModify(Map<String, String> contents) {
		String result = "fail";
		
		try {
			mapper.postBoardCommentModify(contents);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		
		return result;
	}
	
	//getSearchResult
	public List<PostBoardList> getSearchResult(Map<String, String> view) {
		 return mapper.getSearchResult(view);
	}
	
	//setPostBoardMark
	public int setPostBoardMark(Map<String, String> view) {
		int result = -1;
		try {
			if(mapper.checkPostBoardMark(view) == 0) {
				mapper.setPostBoardMark(view);
				result = 1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result = -1;
		}
		
		return result;
	}
	
	//setModifyReplyOk
	public String setModifyReplyOk(Map<String, String> view) {
		String result = "fail";
		try {
			mapper.setModifyReplyOk(view);
			result = "success";
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	public Reputation getReputation(int userid) {
		return mapper.getReputation(userid);
	}
}
