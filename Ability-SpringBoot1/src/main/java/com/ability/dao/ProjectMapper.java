package com.ability.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ability.dto.TestUserDto;
import com.ability.dto.custom.ProjectBoardComment;
import com.ability.dto.custom.ProjectBoardList;
import com.ability.dto.custom.ProjectBoardModify;
import com.ability.dto.custom.ReplyBoard;
import com.ability.dto.custom.UserSimple;

/**
 * @author 신선하
 * @summary 마이바티스 사용을 위한 인터페이스 정의
 */

public interface ProjectMapper {
	public List<TestUserDto> getList() throws Exception;
	public UserSimple getUser(@Param("email") String email) throws Exception;
	public int signUpUser(@Param("email") String email, 
						@Param("password") String password,
						@Param("nick_name") String nick_name,
						@Param("name") String name, 
						@Param("area") String area, 
						@Param("user_image") String user_image)	throws Exception;
	public String getSecurityKey(@Param("email") String email) throws Exception;
	public int confirmSecurityKey(@Param("security_key") String security_key) throws Exception;
	public int isOverlapEmail(@Param("email") String email) throws Exception;
	public int isOverlapNickName(@Param("nickname") String nickname) throws Exception;
	public int isExistAccount(@Param("email") String email,@Param("name") String name) throws Exception;
	public int updateTemporaryPassword(@Param("userid") int userid, 
									@Param("temporaryPassword") String temporaryPassword) throws Exception;
	public List<ProjectBoardList> getProjectList(Map<String, String> view);
	public List<ProjectBoardList> getSearchResult(Map<String, String> view);
	public int insertProjectBoard(Map<String, String> content);
	public int getTotalBoardContentCount(@Param("category_id") String category_id) throws Exception;
	public int getTotalBoardSearchContentCount(Map<String, String> view) throws Exception;
	
	public ProjectBoardList listDetail(Map<String, String> view);
	public int updateProjectBoard(Map<String, String> content);
	
	public void updateViewCount(Map<String, String> boardid);
	public ProjectBoardModify getModifyContent(Map<String, String> seq); 
	public List<ReplyBoard> getReply(Map<String, String> seq);
	public int setReply(Map<String, String> contents);
	public int setComment(Map<String,String> contents);
	public List<ProjectBoardComment> getCommentList(Map<String,String> contents);
	
	public int checkPostVote(Map<String, String> contents) throws Exception;
	public int insertPostVote(Map<String, String> contents) throws Exception;
	public int cancelPostVote(Map<String, String> contents) throws Exception;
	
	public int fakeDelete(Map<String, String> contents) throws Exception;
	public int fakeReplyDelete(Map<String, String> contents) throws Exception;
	public int fakeCommentDelete(Map<String, String> contents) throws Exception;
	
	public int checkPostReplyVote(Map<String, String> contents) throws Exception;
	public int cancelPostReplyVote(Map<String, String> contents) throws Exception;
	public int insertPostReplyVote(Map<String, String> contents) throws Exception;
	
	public int projectBoardCommentModify(Map<String, String> contents) throws Exception;
	public int checkPostCommentVote(Map<String, String> contents) throws Exception;
	public int cancelPostCommentVote(Map<String, String> contents) throws Exception;
	public int insertPostCommentVote(Map<String, String> contents) throws Exception;
	
	public int setPostBoardMark(Map<String, String> view) throws Exception;
	public int cancelPostMark(Map<String, String> view) throws Exception;
	public int checkPostBoardMark(Map<String, String> contents) throws Exception;
}




//package com.ability.dao;
//
//import java.util.List;
//import java.util.Map;
//
//import org.apache.ibatis.annotations.Param;
//
//import com.ability.dto.custom.HashtagComment;
//import com.ability.dto.custom.PostBoardComment;
//import com.ability.dto.custom.PostBoardList;
//import com.ability.dto.custom.PostBoardModify;
//import com.ability.dto.custom.ProjectBoardComment;
//import com.ability.dto.custom.ProjectBoardDetailList;
//import com.ability.dto.custom.ProjectBoardList;
//import com.ability.dto.custom.ProjectBoardModify;
//import com.ability.dto.custom.ReplyBoard;
//import com.ability.dto.custom.UserSimple;
//
///**
// * 프로젝트게시판 관련 Mapper
// * 
// * @author 신선하
// * @summary 프로젝트 게시판 DAO
// * 
// */
//
//public interface ProjectMapper {
//	
//	public List<ProjectBoardList> listSelect(Map<String, String> view);
//	public ProjectBoardList listDetail(Map<String, String> view);	
//	public int insertProjectBoard(Map<String, String> content);	
//	public int updateProjectBoard(Map<String, String> content);	
//	public int deleteProjectBoard(Map<String, String> content);	
//	
//	
//	public UserSimple getUser(@Param("email") String email) throws Exception;
//	public int signUpUser(@Param("email") String email, 
//			@Param("password") String password,
//			@Param("nick_name") String nick_name,
//			@Param("name") String name, 
//			@Param("area") String area, 
//			@Param("user_image") String user_image)	throws Exception;
//	
//	public String getSecurityKey(@Param("email") String email) throws Exception;
//	public int confirmSecurityKey(@Param("security_key") String security_key) throws Exception;
//	public int isOverlapEmail(@Param("email") String email) throws Exception;
//	public int isOverlapNickName(@Param("nickname") String nickname) throws Exception;
//	public int isExistAccount(@Param("email") String email,@Param("name") String name) throws Exception;
//	public int updateTemporaryPassword(@Param("userid") int userid, 
//							@Param("temporaryPassword") String temporaryPassword) throws Exception;
//	public List<ProjectBoardList> getProjectList(Map<String, String> view);
//	public int insertBoard(Map<String, String> content);
//	public int getTotalBoardContentCount(@Param("category_id") String category_id) throws Exception;
//	
//	
//	public List<ProjectBoardList> SearchList(Map<String, String> content);
//	
//	public void updateViewCount(Map<String, String> boardid);
//	public ProjectBoardModify getModifyContent(Map<String, String> seq); 
//	public List<ReplyBoard> getReply(Map<String, String> seq);
//	public int setReply(Map<String, String> contents);
//	public int setComment(Map<String,String> contents);
//	
//	
//	public int checkPostVote(Map<String, String> contents) throws Exception;
//	public int insertPostVote(Map<String, String> contents) throws Exception;
//	public int cancelPostVote(Map<String, String> contents) throws Exception;
//	
//	public int fakeDelete(Map<String, String> contents) throws Exception;
//	public int fakeReplyDelete(Map<String, String> contents) throws Exception;
//	
//	public int checkPostReplyVote(Map<String, String> contents) throws Exception;
//	public int cancelPostReplyVote(Map<String, String> contents) throws Exception;
//	public int insertPostReplyVote(Map<String, String> contents) throws Exception;
//	public List<ProjectBoardComment> getCommentList(Map<String, String> contents);
//}
