package com.ability.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ability.dao.DeveloperMapper;
import com.ability.dto.custom.DeveloperCompanyList;
import com.ability.dto.custom.DeveloperDetailList;
import com.ability.dto.custom.DeveloperPost;
import com.ability.dto.custom.DeveloperPostChart;
import com.ability.dto.custom.DeveloperPostCount;
import com.ability.dto.custom.HireBoardList;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardList;


@Service
public class DeveloperService {
	
	@Autowired
	DeveloperMapper developerMapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	
	//user Profile select
	public DeveloperDetailList listSelect(Map<String, String> view) {
		DeveloperDetailList developerDetailList = developerMapper.listSelect(view);
		return developerDetailList;
	}
	

	
	public List<PostBoardList> getQuestionList(Map<String, String> view){
		List<PostBoardList> questionList = developerMapper.getQuestionList(view);
		return questionList;
	}
	
	public List<DeveloperPost> getAnswerList(Map<String, String> view) {
		List<DeveloperPost> answerList = developerMapper.getAnswerList(view);
		return answerList;
	}
	
	
	public DeveloperPostCount getPostCount(Map<String, String> view) {
		DeveloperPostCount postCount = developerMapper.getPostCount(view);
		return postCount;
	}
	
	public List<DeveloperDetailList> searchDeveloper(String nick_name) {
		List<DeveloperDetailList> developer = developerMapper.searchDeveloper(nick_name);
		return developer;
	}
	
	public List<DeveloperDetailList> searchDeveloperByTags(String tags) {
		List<DeveloperDetailList> developer = developerMapper.searchDeveloperByTags(tags);
		return developer;
	}
	
	public int getdeveloperUpdate(Map<String, String> view) {
		int result = developerMapper.getdeveloperUpdate(view);
		if(result > 0) {
			return result;
		}else {
			return -1;
		}
	}
	
	public int getdeveloperInsert(Map<String, String> view) {
		int result = developerMapper.getdeveloperInsert(view);
		if(result > 0) {
			return result;
		}else {
			return -1;
		}
	}
	
	public int getdeveloperSelect(Map<String, String> view) {
		int result = developerMapper.getdeveloperSelect(view);
		if(result > 0) {
			return result;
		}else {
			developerMapper.getdeveloperInsert(view);
			result = developerMapper.getdeveloperSelect(view);
			if(result > 0) {
				return result;				
			}else {
				return -1;
			}
		}
	}
	
	public int getPasswordChange(Map<String, String> view) {
		String passwordOk = developerMapper.getPasswordOk(view.get("userid"));
		if(passwordEncoder.matches(view.get("password"), passwordOk)) {
			String encoded = passwordEncoder.encode(view.get("repassword"));
			view.put("password", encoded);
            return developerMapper.getPasswordChange(view);
        }else {
        	return 0;
        }
	}
	
	public int getPasswordOk(Map<String, String> view) {
		String passwordOk = developerMapper.getPasswordOk(view.get("userid"));
		if(passwordEncoder.matches(view.get("password"), passwordOk)) {
            return developerMapper.getEnabled(view);
        }else {
        	return 0;
        }
	}
	
	public int getImageChange(String userid, MultipartFile filess,HttpServletRequest request) {
		MultipartFile files = filess;
		String filename ="";
		int result = 0;
		String fpath="";
			if (files != null) {
				filename = files.getOriginalFilename();
				String path = request.getServletContext().getRealPath("/WEB-INF/classes/static/image/");
				fpath = path + "\\" + filename;
				if (!filename.equals("")) {
					try {
						FileOutputStream out = new FileOutputStream(fpath);
						try {
							out.write(files.getBytes());
						} catch (IOException e) {
							result = -1;
						} finally {
							try {
								out.close();
							} catch (IOException e) {
								result = -1;
							}
						}
					} catch (FileNotFoundException e) {
						result = -1;
					}
				}
			}
		Map<String,String> list = new HashMap<String,String>();
		list.put("user_image", filename);
		list.put("userid",userid);
		
		return developerMapper.getImageChange(list);
	}

	public List<DeveloperPostChart> getPostChart(Map<String, String> view) {
		List<DeveloperPostChart> PostChart = developerMapper.getPostChart(view);
		return PostChart;
	}
	
	//내가 쓴 게시판 추가//////
	public int getTotalBoardSearchContentCount(Map<String, String> view) {
		int result = 0;
		try {
			result = developerMapper.getTotalBoardSearchContentCount(view);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	
	public int getTotalBoardContentCount(Map<String, String> view) {
		int result = 0;
		try {
			result = developerMapper.getTotalBoardContentCount(view);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	
	public int getTotalCount() {
		int result = developerMapper.getTotalCount();
		
		return result;
	}
	
	public int getTotalSearchCount(Map<String, String> view) {
		int result = 0;
		try {
			result = developerMapper.getTotalSearchCount(view);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	
	public int getuserTotalCount() {
		return developerMapper.getuserTotalCount();
	}
	
	public int getuserSearchTotalCount(Map<String, String> view) {
		return developerMapper.getuserSearchTotalCount(view);
	}
	
	public List<DeveloperDetailList> getMemberPostList(Map<String, String> view) {
		 return developerMapper.getMemberPostList(view);
	}
	
	public List<DeveloperDetailList> SeachList(Map<String,String> content) {
		return developerMapper.SeachList(content);
	}
	
	public List<PostBoardList> getPostList(Map<String, String> view) {
		 return developerMapper.getCommunityList(view);
	}
	
	public List<PostBoardList> getSearchResult(Map<String, String> view) {
		 return developerMapper.getSearchResult(view);
	}
	
	public List<PostBoardList> getPostListMark (Map<String, String> view) {
		 return developerMapper.getPostListMark(view);
	}
	
	public List<PostBoardList> getSearchResultMark (Map<String, String> view) {
		 return developerMapper.getSearchResultMark(view);
	}
	
	public List<ProjectBoardList> getProjectList(Map<String, String> view) {
		 return developerMapper.getProjectList(view);
	}
	
	public List<ProjectBoardList> getProjectSearchResult(Map<String, String> view) {
		 return developerMapper.getProjectSearchResult(view);
	}
	
	public List<ProjectBoardList> getProjectMarkList(Map<String, String> view) {
		 return developerMapper.getProjectMarkList(view);
	}
	
	public List<ProjectBoardList> getProjectSearchMarkResult(Map<String, String> view) {
		 return developerMapper.getProjectSearchMarkResult(view);
	}
	
	public List<HireBoardList> getJobBoardList(Map<String,String> viewmap){
		return developerMapper.getJobBoardList(viewmap);
	}
 
     public List<HireBoardList> getJobSearchResult(Map<String,String> board){
		return developerMapper.getJobSearchResult(board);
	}
	
     public List<HireBoardList> getJobBoardMarkList(Map<String,String> viewmap){
 		return developerMapper.getJobBoardMarkList(viewmap);
 	}
  
      public List<HireBoardList> getJobSearchMarkResult(Map<String,String> board){
 		return developerMapper.getJobSearchMarkResult(board);
 	}
	
	
	
	
	//기업회원
	public List<DeveloperCompanyList> getCompanylistSelect(Map<String, String> view) {
		return developerMapper.CompanylistSelect(view);
	}
	
	public List<HireBoardList> getCompanyBoard(Map<String, String> view) {
		return developerMapper.userCompanyBoard(view);
	}
	  
	public int getcompanyProfile(Map<String, String> view) { //기업수정
		return developerMapper.companyProfile(view);
	}
	
	public int companyLoc(Map<String, String> view) {
		return developerMapper.companyLoc(view);
	}
	
	
}
