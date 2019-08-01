package com.ability.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ability.dao.MainMapper;
import com.ability.dto.Banner;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardList;
import com.ability.utils.Vaildation;
import com.google.gson.Gson;

/**
 * 
 * @author 정규현
 * @summary 메인 화면 서비스 처리
 * 
 */

@Service
public class MainService {
	private static Logger logger = LoggerFactory.getLogger(MainService.class);
	
	@Autowired
	MainMapper mapper;
	
	@Autowired
	Vaildation vaildation;
	
	public void getSelectAllTags(){
		
		logger.info("Current Thread : {}", Thread.currentThread().getName());
		HashMap<String, Integer> hashmap = new HashMap<String, Integer>();
		
		List<String> newList = new ArrayList<String>();
		if(mapper.getPostBoardAllTags() != null) {
			newList.addAll(mapper.getPostBoardAllTags());	
		}
		if(mapper.getJobBoardAllTags() != null) {
			newList.addAll(mapper.getJobBoardAllTags());
		}
		if(mapper.getUserDetailAllTags() != null) {
			newList.addAll(mapper.getUserDetailAllTags());
		}
		if(newList.size() > 0) {
			String str = newList.toString().replace(" ", "");
			String parse = Vaildation.removeSpecialCharacters(str);
			
			StringTokenizer stringTokenizer = new StringTokenizer(parse,",");
			
			while (stringTokenizer.hasMoreTokens()){
				String key = stringTokenizer.nextToken();
				if(!hashmap.containsKey(key)) {
					hashmap.put(key, 1);
				}else {
					hashmap.put(key, hashmap.get(key)+1);
				}
				
			}

			Gson gson = new Gson();
			
			mapper.setTags(gson.toJson(hashmap), hashmap.size());
		}else {
			mapper.setTags(" ", 0);
		}
	}
	
	//board list(qa, community board)
	public List<PostBoardList> getPostList(Map<String, String> view) {
		 return mapper.getCommunityList(view);
	}
	
	//project board list
	public List<ProjectBoardList> getVideoList(Map<String, String> view) {		
		return  mapper.listSelect(view);
	}
	
	//getBannerList
	public List<Banner> getBannerList(){
		return mapper.getBannerList();
	}
}
