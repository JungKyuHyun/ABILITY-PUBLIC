package com.ability.controller.ajax;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ability.dto.custom.IndexTotalList;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardList;
import com.ability.service.MainService;

/**
 * 
 * @author 정규현
 * @summary 메인 페이지 컨트롤러
 */

@RestController
public class HomeAjax {
	
	@Autowired
	MainService service;

	public IndexTotalList getboardList() {

		Map<String,String> view = new HashMap<String,String>();
		view.put("category", "7");
		List<PostBoardList> fBoard = service.getPostList(view);
		
		Map<String,String> view2 = new HashMap<String,String>();
		view2.put("category", "1");
		List<PostBoardList> qBoard = service.getPostList(view2);
		
		Map<String,String> view3 = new HashMap<String,String>();
		view3.put("category", "2");
		List<ProjectBoardList> pBoard = service.getVideoList(view3);
		
		return new IndexTotalList(fBoard, qBoard, pBoard, service.getBannerList());
		 
	}
}
