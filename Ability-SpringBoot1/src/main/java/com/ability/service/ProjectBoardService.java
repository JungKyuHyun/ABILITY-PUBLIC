package com.ability.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ability.dao.ProjectMapper;
import com.ability.dto.custom.ProjectBoardComment;
import com.ability.dto.custom.ProjectBoardList;
import com.ability.dto.custom.ProjectBoardModify;
import com.ability.dto.custom.ReplyBoard;
import com.ability.dto.custom.UserSimple;
import com.ability.utils.CreateRandomPassword;
import com.ability.utils.FindPasswordMail;
import com.ability.utils.RandomImageAPI;
import com.ability.utils.SignUpAuthMail;

/**
 * 
 * @author 신선하
 * @summary 회원가입, 로그인 등 회원 관련 서비스를 처리하는 로직
 * 
 */

@Service
public class ProjectBoardService {
	
	@Autowired
	ProjectMapper projectMapper;
	
	@Autowired
	SignUpAuthMail signUpAuthMail;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	FindPasswordMail findPasswordMail;
	
	@Autowired
	CreateRandomPassword createRandomPassword;
	
	
	
	
	//confirm overlap nick_name 
	public Boolean isOverlapNickName(String nickname) {
		Boolean result = false;
		try {
			if(projectMapper.isOverlapNickName(nickname) != 0) {
				result = true;
			}
		} catch (Exception e) {
			e.getStackTrace();
		}
		return result;
	}
	
	//check account
	public int checkAccount(String email, String name) {
		int userid = -1;
		
		try {
			userid = projectMapper.isExistAccount(email, name);
			if(userid != -1) {
				String temporaryPassword = createRandomPassword.randomPassword();
				String ecoded = passwordEncoder.encode(temporaryPassword);
				projectMapper.updateTemporaryPassword(userid, ecoded);
				findPasswordMail.SendSignUpAuthMail(email, temporaryPassword);	
			}
			
		} catch (Exception e) {
			userid = -1;
		}
		
		return userid;
	}
	
	//community board list
	public List<ProjectBoardList> getProjectList(Map<String, String> view) {
		 return projectMapper.getProjectList(view);
	}
	
	//insert board
	public int setBoard(Map<String,String> content) {
		int result = projectMapper.insertProjectBoard(content);
			if(result > 0) {
				return result;
			}
		return -1;
	}
	
	//getTotalBoardContentCount
	public int totalContentCount(String category_id) {
		int result = 0;
		try {
			result = projectMapper.getTotalBoardContentCount(category_id);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	
	//getTotalBoardSearchContentCount
	public int getTotalBoardSearchContentCount(Map<String, String> view) {
		int result = 0;
		try {
			result = projectMapper.getTotalBoardSearchContentCount(view);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	
	//getPostListOne
	public ProjectBoardList getProjectListOne(Map<String, String> view) {
		return projectMapper.listDetail(view);
	}
	
	//setProjectBoardUpdate
	public int setProjectBoardUpdate(Map<String,String> content) {
		int result = projectMapper.updateProjectBoard(content);
		if(result > 0) {
			return result;
		}else {
			return -1;
		}
	}
	
	//updateViewCount
	public void updateViewCount(Map<String, String> boardid) {
		projectMapper.updateViewCount(boardid);
	}
	
	//getModifyContent
	public ProjectBoardModify getModifyContent(Map<String, String> seq) {
		return projectMapper.getModifyContent(seq);
	}
	
	//getReply
	public List<ReplyBoard> getReply(Map<String, String> seq){
		return projectMapper.getReply(seq);
	}
	
	//setReply
	public int setReply(Map<String, String> contents) {
		return projectMapper.setReply(contents);
	}
	
	//setComment
	public int setComment(Map<String, String> contnents) {
		return projectMapper.setComment(contnents);
	}
	
	//getCommentList
	public List<ProjectBoardComment> getCommentList(Map<String,String> contents){
		return projectMapper.getCommentList(contents);
	}
	
	//checkPostVote
	public Boolean checkPostVote(Map<String, String> contents) {
		Boolean result = true;
		try {
			if(projectMapper.checkPostVote(contents) != 1 && projectMapper.checkPostVote(contents) != -1) {
				result = false;
				projectMapper.insertPostVote(contents);
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
			if(projectMapper.checkPostVote(contents) != 1) {
				result="minus";
			}
			projectMapper.cancelPostVote(contents);
		} catch (Exception e) {
			result = "fail";
		}
		
		return result;
	}
	
	
	//checkPostReplyVote
	public Boolean checkPostReplyVote(Map<String, String> contents) {
		Boolean result = true;
		try {
			if(projectMapper.checkPostReplyVote(contents) != 1 && projectMapper.checkPostReplyVote(contents) != -1) {
				result = false;
				projectMapper.insertPostReplyVote(contents);
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
			if(projectMapper.checkPostReplyVote(contents) != 1) {
				result="minus";
			}
			projectMapper.cancelPostReplyVote(contents);
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
			projectMapper.cancelPostMark(contents);
		} catch (Exception e) {
			System.out.println("cancelPostVote 오류발생!! > "+e.getMessage());
			result = "fail";
		}
		
		return result;
	}
	
	//checkPostCommentVote
		public Boolean checkPostCommentVote(Map<String, String> contents) {
			Boolean result = true;
			try {
				if(projectMapper.checkPostCommentVote(contents) != 1 && projectMapper.checkPostCommentVote(contents) != -1) {
					result = false;
					projectMapper.insertPostCommentVote(contents);
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
				if(projectMapper.checkPostCommentVote(contents) != 1) {
					result="minus";
				}
				projectMapper.cancelPostCommentVote(contents);
			} catch (Exception e) {
				result = "fail";
			}
			
			return result;
		}
		
		
	//fakeDelete
	public Boolean fakeDelete(Map<String, String> contents) {
		Boolean result = false;
		try {
			projectMapper.fakeDelete(contents);
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
			projectMapper.fakeReplyDelete(contents);
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
			projectMapper.fakeCommentDelete(contents);
			result = true;
		} catch (Exception e) {
			e.printStackTrace();
			result = false;
		}
		return result;
	}
	
	//postBoardCommentModify
	public String ProjectBoardCommentModify(Map<String, String> contents) {
		String result = "fail";
		
		try {
			projectMapper.projectBoardCommentModify(contents);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		
		return result;
	}
	
	//getSearchResult
	public List<ProjectBoardList> getSearchResult(Map<String, String> view) {
		 return projectMapper.getSearchResult(view);
	}
	
	//setPostBoardMark
	public int setPostBoardMark(Map<String, String> view) {
		int result = -1;
		try {
			if(projectMapper.checkPostBoardMark(view) == 0) {
				projectMapper.setPostBoardMark(view);
				result = 1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result = -1;
		}
		
		return result;
	}
	
	
	
	
}
