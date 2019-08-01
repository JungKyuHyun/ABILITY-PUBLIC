package com.ability.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ability.dto.custom.AnswerRate;
import com.ability.dto.custom.BannerClickCountToday;
import com.ability.dto.custom.BannerList;
import com.ability.dto.custom.HireBoardList;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardList;
import com.ability.dto.custom.UserDetail;
import com.ability.dto.custom.UserMonthlyStatistics;

/**
 * 관리자페이지 관련 Mapper
 * 
 * @author 강기
 * @summary 관리자페이지 DAO
 * 
 */
public interface AdminMapper {
	
    public int allPostCount();
	
    public int userCount();

    public int leaveMember();
    
    public int todayJoinCount();
    
    public int questionCount();
    
    public int freeboardCount();
    
    public int projectCount();
    
    public int accuseCount();
    
    public int getDeleteCount();
    
    public int noAnswerCount();
    
    public int jobCount();
    
    public int deletePost(int id);
    
    public int recoverPost(int id);
    
    public int deleteJobPost(int id);
    
    public int recoverJobPost(int id);
    
    public List<UserMonthlyStatistics> monthJoin();
    
    public List<UserMonthlyStatistics> monthLeave();
    
    public List<String> getTags();
    
    public List<PostBoardList> getPostBoard(int categoryid);
    
    public List<PostBoardList> getJobBoard();
    
    public List<AnswerRate> getReplyCount();
    
    public List<AnswerRate> getQuestionCount();
    
    public List<ProjectBoardList> getProjectList(Map<String, String> view);
    
    public List<ProjectBoardList> getProjectSearchResult(Map<String, String> view);
    
    public int getTotalBoardContentCount(@Param("category_id") String category_id) throws Exception;
    
    public int getTotalDeleteContentCount(@Param("category_id") String category_id);
    
    public int getTotalBoardSearchContentCount(Map<String, String> view) throws Exception;
    
    public int getTotalDeleteSearchContentCount(Map<String, String> view) throws Exception;
    
    public List<PostBoardList> getCommunityList(Map<String, String> view);
    
    public List<PostBoardList> getSearchResult(Map<String, String> view);
    
    public int getTotalSearchCount(Map<String, String> view);
    
    public List<HireBoardList> getJobBoardList(Map<String,String> viewmap);
    
    public List<HireBoardList> getJobSearchResult(Map<String,String> board);
    
    public int getTotalCount();
    
    public int getTotalUserSearchContentCount(Map<String, String> view);
    
    public int getTotalDeleteUserSearchContentCount(Map<String, String> view);
    
    public List<UserDetail> getUserList(Map<String, String> view);
    
    public List<UserDetail> getUserSearchResult(Map<String, String> view);
    
    public int deleteUser(int id);
    
    public int recoverUser(int id);
    
    public int JobboardSearchCount(Map<String,String> count);
    
    public List<UserDetail> getExcelUserList();
    
    public int changeRole(Map<String,Integer> viewmap);
    
    public List<BannerList> getBanner();
    
    public BannerClickCountToday clickToday(int id);
   
}
