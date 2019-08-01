package com.ability.dao;

import java.util.List;
import java.util.Map;

import com.ability.dto.custom.DeveloperCompanyList;
import com.ability.dto.custom.DeveloperDetailList;
import com.ability.dto.custom.DeveloperPost;
import com.ability.dto.custom.DeveloperPostChart;
import com.ability.dto.custom.DeveloperPostCount;
import com.ability.dto.custom.HireBoardList;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardList;

/**
 * 유저게시판 관련 Mapper
 * 
 * @author 우세림
 * @summary 유저게시판 DAO
 * 
 */
public interface DeveloperMapper {
	
	public DeveloperDetailList listSelect(Map<String, String> view);
	
//	public List<DeveloperDetailList> getDeveloperListByAbility();
//	
//	public List<DeveloperDetailList> getDeveloperListByUser();
//	
//	public List<DeveloperDetailList> getDeveloperListByName();
	
	public List<PostBoardList> getQuestionList(Map<String, String> view);
	
	public List<DeveloperPost> getAnswerList(Map<String, String> view);
	
//	public List<DeveloperPost> getCommentList(Map<String, String> view);
    
	public DeveloperPostCount getPostCount(Map<String, String> view);
	
	public List<DeveloperDetailList> searchDeveloper(String nick_name);
	
	public List<DeveloperDetailList> searchDeveloperByTags(String tags);
	
	public int getdeveloperUpdate(Map<String, String> view);
	
	public int getdeveloperInsert(Map<String, String> view);
	
	public int getdeveloperSelect(Map<String, String> view);
	
	public int getEnabled(Map<String, String> view);
	
	public int getPasswordChange(Map<String, String> view);

	public String getPasswordOk(String userid);
	
	public int getImageChange(Map<String, String> view);
	
	public List<DeveloperPostChart> getPostChart(Map<String, String> view);
	
	/////내가 쓴게시판 추가
	public int getTotalBoardContentCount(Map<String, String> view) throws Exception;
    
    public int getTotalBoardSearchContentCount(Map<String, String> view) throws Exception;
    
    public int getTotalCount();
    
    public int getTotalSearchCount(Map<String, String> view);
    
    public int getuserTotalCount(); 
    
    public int getuserSearchTotalCount(Map<String, String> view);
    
    public List<DeveloperDetailList> getMemberPostList(Map<String, String> view);
   
    public List<DeveloperDetailList> SeachList(Map<String, String> view);
    
    public List<PostBoardList> getCommunityList(Map<String, String> view);
    
    public List<PostBoardList> getSearchResult(Map<String, String> view);
    
    public List<PostBoardList> getPostListMark(Map<String, String> view);
    
    public List<PostBoardList> getSearchResultMark(Map<String, String> view);
    
    public List<ProjectBoardList> getProjectList(Map<String, String> view);
     
    public List<ProjectBoardList> getProjectSearchResult(Map<String, String> view);
    
    public List<ProjectBoardList> getProjectMarkList(Map<String, String> view);
    
    public List<ProjectBoardList> getProjectSearchMarkResult(Map<String, String> view);

    public List<HireBoardList> getJobBoardList(Map<String,String> viewmap);
    
    public List<HireBoardList> getJobSearchResult(Map<String,String> board);
    
    public List<HireBoardList> getJobBoardMarkList(Map<String,String> viewmap);
    
    public List<HireBoardList> getJobSearchMarkResult(Map<String,String> board);
    
    
    
    //기업회원
    public List<DeveloperCompanyList> CompanylistSelect(Map<String, String> view);
    
    public List<HireBoardList> userCompanyBoard(Map<String, String> view);
    
	public int companyProfile(Map<String, String> view);
	
	public int companyLoc(Map<String, String> view);
    
}

