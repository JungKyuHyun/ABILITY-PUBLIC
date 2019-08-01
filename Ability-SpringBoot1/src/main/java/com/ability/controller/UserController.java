package com.ability.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ability.dto.custom.BoardListPaging;
import com.ability.dto.custom.DeveloperBoardListPaging;
import com.ability.dto.custom.DeveloperCompanyList;
import com.ability.dto.custom.DeveloperDetailList;
import com.ability.dto.custom.DeveloperPost;
import com.ability.dto.custom.DeveloperPostChart;
import com.ability.dto.custom.DeveloperPostCount;
import com.ability.dto.custom.HashtagComment;
import com.ability.dto.custom.HashtagReply;
import com.ability.dto.custom.HireBoardList;
import com.ability.dto.custom.JobBoardListPaging;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardListPaging;
import com.ability.service.DeveloperService;
import com.ability.service.HashtagNicknameService;
import com.ability.utils.Pagination;




@RestController
public class UserController {

	@Autowired
	DeveloperService developerService;

	@Autowired
	HashtagNicknameService hashtagNicknameService;
	
	@Autowired
	Pagination pagination;

	// 내 정보
	public DeveloperDetailList listSelect(@RequestParam(value = "userid") String userid) {
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		DeveloperDetailList s =developerService.listSelect(view);
		return developerService.listSelect(view);
	}

	// 내가 쓴 질문
	public List<PostBoardList> questionList(@RequestParam(value = "userid") String userid,
			@RequestParam(value = "start") String start, @RequestParam(value = "end") String end) {
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		view.put("start", start);
		view.put("end", end);
		return developerService.getQuestionList(view);
	}

	// 내가 쓴 답글
	public List<DeveloperPost> answerList(@RequestParam(value = "userid") String userid,
			@RequestParam(value = "start") String start, @RequestParam(value = "end") String end) {
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		view.put("start", start);
		view.put("end", end);
		return developerService.getAnswerList(view);
	}

	
	// 내가 쓴 게시물 수
	public DeveloperPostCount postCount(@RequestParam(value = "userid") String userid) {
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		return developerService.getPostCount(view);
	}

	// 정보 수정
	public int developerUpdate(@RequestParam(value = "userid") String userid, @RequestParam(value = "tel") String tel,
			@RequestParam(value = "user_info") String user_info, @RequestParam(value = "area") String area,
			@RequestParam(value = "tags") String tags) {
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		view.put("tel", tel);
		view.put("user_info", user_info);
		view.put("area", area);
		view.put("tags", tags);
		DeveloperDetailList detailList = new DeveloperDetailList();

		int temp = developerService.getdeveloperSelect(view);
		if (temp > 0) {
			int result = developerService.getdeveloperUpdate(view);
			if (result > 0) {
				return result;
			} else {
				return -1;
			}
		} else {
			return -1;
		}
	}

	public List<HashtagComment> getComment(@RequestParam(value = "seq") String seq) {

		Map<String, String> lists = new HashMap<String, String>();
		lists.put("seq", seq);
		List<HashtagComment> list = hashtagNicknameService.getComment(lists);

		return list;
	}

	public List<HashtagReply> getReply(@RequestParam(value = "seq") String seq) {

		Map<String, String> lists = new HashMap<String, String>();
		lists.put("seq", seq);

		List<HashtagReply> list = hashtagNicknameService.getReply(lists);

		return list;
	}

	public List<DeveloperDetailList> searchDeveloper(@RequestParam(value = "nick_name") String nick_name) {
		return developerService.searchDeveloper(nick_name);
	} 

	public List<DeveloperDetailList> searchDeveloperByTags(@RequestParam(value = "tags") String tags) {
		return developerService.searchDeveloperByTags(tags);
	}

	public int getPasswordOk(@RequestParam(value = "userid") String userid,
							 @RequestParam(value = "password") String password){
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		view.put("password", password);
		return developerService.getPasswordOk(view);
	}
	
	public int getPasswordChange(@RequestParam(value = "userid") String userid,
							 @RequestParam(value = "password") String password,
							 @RequestParam(value = "repassword") String repassword){
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		view.put("password", password);
		view.put("repassword", repassword);
		return developerService.getPasswordChange(view);
	}
	
	public int getImageChange(@RequestParam(value = "userid") String userid,
							  @RequestParam(value = "files") MultipartFile files,
							 HttpServletRequest request){
		return developerService.getImageChange(userid,files,request);
	}
	
	public List<DeveloperPostChart> getPostChart(@RequestParam(value = "userid") String userid){
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		return developerService.getPostChart(view);
	}
	
	public DeveloperBoardListPaging getuserList(@PathVariable("view")String view,
										@RequestParam(value="currentpage",required=false,defaultValue="1")String currentPage,
										@RequestParam(value = "word", required = false, defaultValue = "1") String word) {

		DeveloperBoardListPaging developerBoardListPaging = new DeveloperBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		int totalListCount = 0;
		if (word.equals("1")) {
			totalListCount = developerService.getuserTotalCount();
			
		} else {
			Map<String, String> list = new HashMap<String, String>();
			list.put("word", word);
		    totalListCount = developerService.getuserSearchTotalCount(list);
		}
		
		int totalcount = developerService.getuserTotalCount();
		int pageSize = (pagination.getPageSize())+5;
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalcount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int endpage = pagination.printEnd(pagination.getCurPage(), pageSize);
		
		if(endpage > totalcount){
			endpage=totalcount;
		}
		
		viewmap.put("view", view);
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		if (word.equals("1")) {
			developerBoardListPaging.setPostBoardList(developerService.getMemberPostList(viewmap));
		} else {
			viewmap.put("word", word);
			developerBoardListPaging.setPostBoardList(developerService.SeachList(viewmap));
		}
		
		developerBoardListPaging.setPostBoardList(developerService.getMemberPostList(viewmap));
		developerBoardListPaging.setCurrentPage(pagination.getCurPage());
		developerBoardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		developerBoardListPaging.setPageSize(pageSize);
		developerBoardListPaging.setStartPageBlock(startPageBlock);
		developerBoardListPaging.setTotalListCount(totalcount);
		developerBoardListPaging.setTotalPage(totalPage);
		
		
		return developerBoardListPaging;
	}
	
	public DeveloperBoardListPaging SeachList(@RequestParam(value="dropdown")String dropdown,
											   @RequestParam(value="content", required = false, defaultValue = "1")String content,
											   @RequestParam(value="currentpage",required=false,defaultValue="1")String currentPage
												){
		
		DeveloperBoardListPaging developerBoardListPaging = new DeveloperBoardListPaging();
		Map<String, String> list = new HashMap<String, String>();
		Map<String,String> viewmap = new HashMap<String,String>();
		
		int totalListCount = 0;
		if (dropdown.equalsIgnoreCase("id")) {
			list.put("content", content);
			list.put("dropdown", "1");
		    totalListCount = developerService.getuserSearchTotalCount(list);
		} else if (dropdown.equalsIgnoreCase("Tag")) {
			list.put("content", content);
			list.put("dropdown", "2");
		    totalListCount = developerService.getuserSearchTotalCount(list);
		} else {
			totalListCount = developerService.getuserTotalCount();
		}
		
		int totalcount = developerService.getuserTotalCount();
		int pageSize = (pagination.getPageSize())+5;
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalcount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int endpage = pagination.printEnd(pagination.getCurPage(), pageSize);
		
		if(endpage > totalcount){
			endpage=totalcount;
		}
		
		
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		if (dropdown.equalsIgnoreCase("Id")) {
			viewmap.put("content", content);
			viewmap.put("dropdown", "1");
			developerBoardListPaging.setPostBoardList(developerService.SeachList(viewmap));
		} else if (dropdown.equalsIgnoreCase("Tag")) {
			viewmap.put("content", content);
			viewmap.put("dropdown", "2");
			developerBoardListPaging.setPostBoardList(developerService.SeachList(viewmap));
		} else {
			developerBoardListPaging.setPostBoardList(developerService.getMemberPostList(viewmap));
		}
		
		developerBoardListPaging.setPostBoardList(developerService.SeachList(viewmap));
		developerBoardListPaging.setCurrentPage(pagination.getCurPage());
		developerBoardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		developerBoardListPaging.setPageSize(pageSize);
		developerBoardListPaging.setStartPageBlock(startPageBlock);
		developerBoardListPaging.setTotalListCount(totalcount);
		developerBoardListPaging.setTotalPage(totalPage);
		
		
		return developerBoardListPaging;
	}
	
	
	//내가 쓴 게시글 추가 /////
	public BoardListPaging getboardList(@RequestParam(value = "orderby") String orderby,
			@RequestParam(value = "currentpage", required = false, defaultValue = "1") String currentPage,
			@RequestParam(value = "word", required = false, defaultValue = "1") String word,
			@RequestParam(value = "categoryid") String categoryid,
			@RequestParam(value = "userid") String userid
			) {
		BoardListPaging boardListPaging = new BoardListPaging();
		Map<String, String> viewmap = new HashMap<String, String>();
		int totalListCount = 0;
		if (word.equals("1")) {
			Map<String, String> view = new HashMap<String, String>();
			view.put("categoryid",categoryid);
			view.put("userid",userid);
			totalListCount = developerService.getTotalBoardContentCount(view);
			
		} else {
			Map<String, String> view = new HashMap<String, String>();
			view.put("categoryid", categoryid);
			view.put("word", word);
			view.put("userid",userid);
		    totalListCount = developerService.getTotalBoardSearchContentCount(view);
		    
		}
		
		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalListCount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int printEnd = pagination.printEnd(pagination.getCurPage(), pageSize);

		if (printEnd > totalListCount) {
			printEnd = totalListCount;
		}

		viewmap.put("orderby", orderby);
		viewmap.put("category", categoryid);
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		viewmap.put("userid", userid);
		if (word.equals("1")) {
			boardListPaging.setPostBoardList(developerService.getPostList(viewmap));
		} else {
			viewmap.put("word", word);
			boardListPaging.setPostBoardList(developerService.getSearchResult(viewmap));
		}

		boardListPaging.setCurrentPage(pagination.getCurPage());
		boardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		boardListPaging.setPageSize(pageSize);
		boardListPaging.setStartPageBlock(startPageBlock);
		boardListPaging.setTotalListCount(totalListCount);
		boardListPaging.setTotalPage(totalPage);

		return boardListPaging;
	}
	
	public ProjectBoardListPaging getProjectBoardList(
										@RequestParam(value="orderby") String orderby,
										@RequestParam(value="currentpage", required=false, defaultValue="1") String currentPage,
										@RequestParam(value="word", required=false, defaultValue="1") String word,
	                                    @RequestParam(value ="categoryid") String categoryid,
	                                    @RequestParam(value="userid") String userid)	
	{
		ProjectBoardListPaging projectBoardListPaging = new ProjectBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		
		int totalListCount = 0;
		if (word.equals("1")) {
			Map<String, String> view = new HashMap<String, String>();
			view.put("categoryid",categoryid);
			view.put("userid",userid);
			totalListCount = developerService.getTotalBoardContentCount(view);
			
		} else {
			Map<String, String> view = new HashMap<String, String>();
			view.put("categoryid", categoryid);
			view.put("word", word);
			view.put("userid",userid);
		    totalListCount = developerService.getTotalBoardSearchContentCount(view);
		    
		}

		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalListCount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int printEnd = pagination.printEnd(pagination.getCurPage(), pageSize);

		if (printEnd > totalListCount) {
			printEnd = totalListCount;
		}

		viewmap.put("orderby", orderby);
		viewmap.put("category", categoryid);
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		viewmap.put("userid", userid);
		if(word.equals("1")) {
			projectBoardListPaging.setProjectBoardList(developerService.getProjectList(viewmap));	
		}else {
			viewmap.put("word", word);
			projectBoardListPaging.setProjectBoardList(developerService.getProjectSearchResult(viewmap));	
		}
		
		projectBoardListPaging.setCurrentPage(pagination.getCurPage());
		projectBoardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		projectBoardListPaging.setPageSize(pageSize);
		projectBoardListPaging.setStartPageBlock(startPageBlock);
		projectBoardListPaging.setTotalListCount(totalListCount);
		projectBoardListPaging.setTotalPage(totalPage);
		
		return projectBoardListPaging;
	}
	
	public BoardListPaging getboardMarkList(@RequestParam(value = "orderby") String orderby,
			@RequestParam(value = "currentpage", required = false, defaultValue = "1") String currentPage,
			@RequestParam(value = "word", required = false, defaultValue = "1") String word,
			@RequestParam(value = "categoryid") String categoryid,
			@RequestParam(value = "userid") String userid
			) {
		BoardListPaging boardListPaging = new BoardListPaging();
		Map<String, String> viewmap = new HashMap<String, String>();
		int totalListCount = 0;
		if (word.equals("1")) {
			Map<String, String> view = new HashMap<String, String>();
			view.put("categoryid",categoryid);
			view.put("userid",userid);
			totalListCount = developerService.getTotalBoardContentCount(view);
			
		} else {
			Map<String, String> view = new HashMap<String, String>();
			view.put("categoryid", categoryid);
			view.put("word", word);
			view.put("userid",userid);
		    totalListCount = developerService.getTotalBoardSearchContentCount(view);
		    
		}
		
		
		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalListCount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int printEnd = pagination.printEnd(pagination.getCurPage(), pageSize);

		if (printEnd > totalListCount) {
			printEnd = totalListCount;
		}

		viewmap.put("orderby", orderby);
		viewmap.put("category", categoryid);
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		viewmap.put("userid", userid);
		if (word.equals("1")) {
			boardListPaging.setPostBoardList(developerService.getPostListMark(viewmap));
		} else {
			viewmap.put("word", word);
			boardListPaging.setPostBoardList(developerService.getSearchResultMark(viewmap));
		}

		boardListPaging.setCurrentPage(pagination.getCurPage());
		boardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		boardListPaging.setPageSize(pageSize);
		boardListPaging.setStartPageBlock(startPageBlock);
		boardListPaging.setTotalListCount(totalListCount);
		boardListPaging.setTotalPage(totalPage);

		return boardListPaging;
	}
	
	public ProjectBoardListPaging getProjectMarkList(
										@RequestParam(value="orderby") String orderby,
										@RequestParam(value="currentpage", required=false, defaultValue="1") String currentPage,
										@RequestParam(value="word", required=false, defaultValue="1") String word,
	                                    @RequestParam(value ="categoryid") String categoryid,
	                                    @RequestParam(value="userid") String userid)	
	{
		ProjectBoardListPaging projectBoardListPaging = new ProjectBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		
		int totalListCount = 0;
		if (word.equals("1")) {
			Map<String, String> view = new HashMap<String, String>();
			view.put("categoryid",categoryid);
			view.put("userid",userid);
			totalListCount = developerService.getTotalBoardContentCount(view);
			
		} else {
			Map<String, String> view = new HashMap<String, String>();
			view.put("categoryid", categoryid);
			view.put("word", word);
			view.put("userid",userid);
		    totalListCount = developerService.getTotalBoardSearchContentCount(view);
		    
		}
		

		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalListCount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int printEnd = pagination.printEnd(pagination.getCurPage(), pageSize);

		if (printEnd > totalListCount) {
			printEnd = totalListCount;
		}

		viewmap.put("orderby", orderby);
		viewmap.put("category", categoryid);
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		viewmap.put("userid", userid);
		if(word.equals("1")) {
			projectBoardListPaging.setProjectBoardList(developerService.getProjectMarkList(viewmap));	
		}else {
			viewmap.put("word", word);
			projectBoardListPaging.setProjectBoardList(developerService.getProjectSearchMarkResult(viewmap));	
		}
		
		projectBoardListPaging.setCurrentPage(pagination.getCurPage());
		projectBoardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		projectBoardListPaging.setPageSize(pageSize);
		projectBoardListPaging.setStartPageBlock(startPageBlock);
		projectBoardListPaging.setTotalListCount(totalListCount);
		projectBoardListPaging.setTotalPage(totalPage);
		
		return projectBoardListPaging;
	}
	
	public JobBoardListPaging getJobBoard(@RequestParam(value="orderby")String orderby,
										  @RequestParam(value="currentpage",required=false,defaultValue="1")String currentPage,
										  @RequestParam(value="userid" )String userid,
										  @RequestParam(value="word",required=false,defaultValue="1") String word,
										  @RequestParam(value = "categoryid") String categoryid
			) {
		JobBoardListPaging boardListPaging = new JobBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		int totalcount = 0;
		if(word.equals("1")) {
			totalcount = developerService.getTotalCount();
		}else {
			Map<String,String> view = new HashMap<String,String>();
			view.put("word", word);
			totalcount = developerService.getTotalSearchCount(view);	
		}
		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalcount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int endpage = pagination.printEnd(pagination.getCurPage(), pageSize);
		
		if(endpage > totalcount){
			endpage=totalcount;
		}		
		viewmap.put("orderby", orderby);
		viewmap.put("userid", userid);
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		if(word.equals("1")) {
		boardListPaging.setPostBoardList(developerService.getJobBoardList(viewmap));
		}else {
			viewmap.put("word", word);
			boardListPaging.setPostBoardList(developerService.getJobSearchResult(viewmap));	
		}
		boardListPaging.setCurrentPage(pagination.getCurPage());
		boardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		boardListPaging.setPageSize(pageSize);
		boardListPaging.setStartPageBlock(startPageBlock);
		boardListPaging.setTotalListCount(totalcount);
		boardListPaging.setTotalPage(totalPage);
		return boardListPaging;
	}
	
	public JobBoardListPaging getJobBoardMark(@RequestParam(value="orderby")String orderby,
										  @RequestParam(value="currentpage",required=false,defaultValue="1")String currentPage,
										  @RequestParam(value="userid" )String userid,
										  @RequestParam(value="word",required=false,defaultValue="1") String word,
										  @RequestParam(value = "categoryid") String categoryid
			) {
		JobBoardListPaging boardListPaging = new JobBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		int totalcount = 0;
		if(word.equals("1")) {
			totalcount = developerService.getTotalCount();
		}else {
			Map<String,String> view = new HashMap<String,String>();
			view.put("word", word);
			totalcount = developerService.getTotalSearchCount(view);	
		}
		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage));
		int totalPage = pagination.totalPage(totalcount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int endpage = pagination.printEnd(pagination.getCurPage(), pageSize);
		
		if(endpage > totalcount){
			endpage=totalcount;
		}		
		viewmap.put("orderby", orderby);
		viewmap.put("userid", userid);
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		if(word.equals("1")) {
		boardListPaging.setPostBoardList(developerService.getJobBoardMarkList(viewmap));
		}else {
			viewmap.put("word", word);
			boardListPaging.setPostBoardList(developerService.getJobSearchMarkResult(viewmap));	
		}
		boardListPaging.setCurrentPage(pagination.getCurPage());
		boardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		boardListPaging.setPageSize(pageSize);
		boardListPaging.setStartPageBlock(startPageBlock);
		boardListPaging.setTotalListCount(totalcount);
		boardListPaging.setTotalPage(totalPage);
		return boardListPaging;
	}
	
	
	
	
	//기업회원
	public List<DeveloperCompanyList> getCompanylistSelect(@RequestParam(value = "userid") String userid) {
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		return developerService.getCompanylistSelect(view);
	}
	
	@RequestMapping(path="/users/company/board", method = RequestMethod.GET)
	public List<HireBoardList> getCompanyBoard(@RequestParam(value = "userid") String userid,
										   @RequestParam(value = "start") String start,
										   @RequestParam(value = "end") String end) {
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		view.put("start", start);
		view.put("end", end);
		return developerService.getCompanyBoard(view);
	}
	
	public int getcompanyProfile(@RequestParam(value = "userid") String userid, 
								@RequestParam(value = "company_tel") String company_tel,
								@RequestParam(value = "company_email") String company_email, 
								@RequestParam(value = "company_area") String company_area,
								@RequestParam(value = "homepage_url") String homepage_url,
								@RequestParam(value = "company_info") String company_info,
								@RequestParam(value = "xloc") String xloc,
								@RequestParam(value = "yloc") String yloc
								){
									
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		view.put("company_tel", company_tel);
		view.put("company_email", company_email);
		view.put("company_area", company_area);
		view.put("homepage_url", homepage_url);
		view.put("company_info", company_info);
		view.put("xloc", xloc);
		view.put("yloc", yloc);

		
		return developerService.getcompanyProfile(view);
	}
	
	public int companyLoc(@RequestParam(value = "userid") String userid,
								@RequestParam(value = "xloc") String xloc,
								@RequestParam(value = "yloc") String yloc
								){
									
		Map<String, String> view = new HashMap<String, String>();
		view.put("userid", userid);
		view.put("xloc", xloc);
		view.put("yloc", yloc);
		
		return developerService.companyLoc(view);
	}
	
}
