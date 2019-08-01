package com.ability.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.ability.dto.Banner;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardList;

public interface MainMapper {
	public List<String> getPostBoardAllTags();
	public List<String> getJobBoardAllTags();
	public List<String> getUserDetailAllTags();
	
	public int setTags(@Param("tags") String tags,@Param("count") int count);
	public List<PostBoardList> getCommunityList(Map<String, String> view);
	public List<ProjectBoardList> listSelect(Map<String, String> view);
	
	public List<Banner> getBannerList();
}
