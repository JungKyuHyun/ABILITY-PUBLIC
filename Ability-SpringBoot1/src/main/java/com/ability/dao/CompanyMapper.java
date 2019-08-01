package com.ability.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ability.dto.User_Company_Detail;
import com.ability.dto.custom.HireBoardList;
import com.ability.dto.custom.JobBoardDetailList;

/**
 * Company 관련 Mapper
 * 
 * @author 정진호
 * @summary 기업등록 Dao
 * 
 */

public interface CompanyMapper {
	
	public int insert(@Param(value = "company_area") String company_area,
					  @Param(value = "company_email") String company_email,
					  @Param(value = "homepage_url")  String homepage_url,
					  @Param(value = "register_number") String register_number,
					  @Param(value = "userid")  int userid,
					  @Param(value = "company_tel")  String company_tel,
					  @Param(value = "manager_tel")  String manager_tel,
					  @Param(value = "register_file")String register_file,
					  @Param(value = "xloc")  String xloc,
					  @Param(value = "yloc")  String yloc,
					  @Param(value = "company_name")String company_name);
	public User_Company_Detail getCompany(@Param("userid")String userid);
	
	public int setCompanyRole(@Param(value="userid")int userid);
	
	public String isCompanyEmail(@Param(value ="company_email")String company_email); 
	
	public List<HireBoardList> getJobBoard(Map<String,String> viewmap);
	
	public int insertCompany(Map<String,String> boardlist);
	
	public JobBoardDetailList getDetail(Map<String,String> user);
	
	public int getTotalCount();
	
	public int UpdateViewCount(Map<String,String> id);
	
	public int setLogo(Map<String,String> logo);
	
	public int setResume(Map<String,String> resume);
	
	public int delete(int seq);
	
	public int setScrap(Map<String,String> scrap);
	
	public Integer getScrap(Map<String,String> scrap);
	
	public int deleteScrap(Map<String,String> scrap);
	
	public int updateJobBoard(Map<String,String> board);
	
	public int getTotalSearchCount(Map<String,String> board);
	
	public List<HireBoardList> getSearchResult(Map<String,String> board);
	
	public int JobboardSearchCount(Map<String,String> count);
}
