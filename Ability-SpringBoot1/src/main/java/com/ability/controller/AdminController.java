package com.ability.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ability.dto.custom.AnswerRate;
import com.ability.dto.custom.BannerClickCountToday;
import com.ability.dto.custom.BannerList;
import com.ability.dto.custom.BoardListPaging;
import com.ability.dto.custom.JobBoardListPaging;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardListPaging;
import com.ability.dto.custom.UserDetail;
import com.ability.dto.custom.UserListPaging;
import com.ability.dto.custom.UserMonthlyStatistics;
import com.ability.service.AdminService;
import com.ability.utils.CustomerExcelWriter;
import com.ability.utils.Pagination;
/**
 * 관리자페이지 관련 컨트롤러
 * 
 * @author 강기훈
 * @address /auth/admin
 * 
 */

@RestController
public class AdminController {

	@Autowired
	AdminService adminService;

	@Autowired
	Pagination pagination;

	public int allPostCount() {
		int result = 0;
		result = adminService.allPostCount();
		return result;
	}

	public int userCount() {
		int result = 0;
		result = adminService.userCount();
		return result;
	}

	public int leaveMember() {
		int result = 0;
		result = adminService.leaveMember();
		return result;
	}

	public int todayJoinCount() {
		int result = 0;
		result = adminService.todayJoinCount();
		return result;
	}

	public int questionCount() {
		int result = 0;
		result = adminService.questionCount();
		return result;
	}

	public int freeboardCount() {
		int result = 0;
		result = adminService.freeboardCount();
		return result;
	}

	public int projectCount() {
		int result = 0;
		result = adminService.projectCount();
		return result;
	}

	public int accuseCount() {
		int result = 0;
		result = adminService.accuseCount();
		return result;
	}

	public List<UserMonthlyStatistics> monthJoin() {
		List<UserMonthlyStatistics> monthjoin = adminService.monthJoin();
		return monthjoin;
	}

	public List<UserMonthlyStatistics> monthLeave() {
		List<UserMonthlyStatistics> monthleave = adminService.monthLeave();
		return monthleave;
	}

	public List<String> getTags() {
		List<String> taglist = new ArrayList<>();

		taglist = adminService.getTags();

		return taglist;
	}
	
	public int getDeleteCount() {
		int result = 0;
		result = adminService.getDeleteCount();
		return result;
	}
	
	public int noAnswerCount() {
		int result = 0;
		result = adminService.noAnswerCount();
		return result;
	}
	
	public int jobCount() {
		int result = 0;
		result = adminService.jobCount();
		return result;
	}
	
	public String deletePost(@RequestParam(value = "id")int id) {
		int result = 0;
		result = adminService.deletePost(id);
		
		if(result>0) {
			return "success";
		}else {
			return "false";
		}
	}
	
	@RequestMapping(path = "/deleteuser", method = RequestMethod.PUT)
	public String deleteUser(@RequestParam(value = "idList")ArrayList<Integer> id) {
		int result = 0;
		for(int i=0; i<id.size();i++) {
		   result+=adminService.deleteUser(id.get(i));
			
		}
		if(result>0) {
			return "success";
		}else {
			return "false";
		}
	}
	
	public String recoverUser(@RequestParam(value = "idList")ArrayList<Integer> id) {
		int result = 0;
		for(int i=0; i<id.size();i++) {
		   result+=adminService.recoverUser(id.get(i));
			
		}
		if(result>0) {
			return "success";
		}else {
			return "false";
		}
	}
	
	
	public String recoverPost(@RequestParam(value = "id")int id) {
		int result = 0;
		result = adminService.recoverPost(id);
		
		if(result>0) {
			return "success";
		}else {
			return "false";
		}
	}
	
	public String deleteJobPost(@RequestParam(value = "id")int id) {
		int result = 0;
		result = adminService.deleteJobPost(id);
		
		if(result>0) {
			return "success";
		}else {
			return "false";
		}
	}
	
	public String recoverJobPost(@RequestParam(value = "id")int id) {
		int result = 0;
		result = adminService.recoverJobPost(id);
		
		if(result>0) {
			return "success";
		}else {
			return "false";
		}
	}

	public List<PostBoardList> getPostBoard(@RequestParam(value = "categoryid") int categoryid) {
		List<PostBoardList> postList = new ArrayList<>();

		postList = adminService.getPostBoard(categoryid);

		return postList;
	}
	
	public List<PostBoardList> getJobBoard() {
		List<PostBoardList> postList = new ArrayList<>();

		postList = adminService.getJobBoard();

		return postList;
	}
	
	public List<AnswerRate> getChartbar() {
		List<AnswerRate> replyCount = new ArrayList<>();
		List<AnswerRate> questionCount = new ArrayList<>();
		replyCount = adminService.getReplyCount();
		questionCount = adminService.getQuestionCount();
		for(int i= 0;i<replyCount.size();i++) {
			replyCount.get(i).setPostcount(Math.round((replyCount.get(i).getPostcount()/questionCount.get(i).getPostcount())*100));
		}
		return replyCount;
	}

	public BoardListPaging getboardList(@RequestParam(value = "orderby") String orderby,
			@RequestParam(value = "currentpage", required = false, defaultValue = "1") String currentPage,
			@RequestParam(value = "word", required = false, defaultValue = "1") String word,
			@RequestParam(value = "categoryid") String categoryid
			) {
    
		BoardListPaging boardListPaging = new BoardListPaging();
		Map<String, String> viewmap = new HashMap<String, String>();
		int totalListCount = 0;
		if (word.equals("1")) {
			if(orderby.equals("3")) {
			  totalListCount = adminService.totalDeleteContentCount(categoryid);
			}else {
			  totalListCount = adminService.totalContentCount(categoryid);
			}
			
		} else {
			Map<String, String> view = new HashMap<String, String>();
			view.put("category_id", categoryid);
			view.put("word", word);
			
		    if(orderby.equals("3")) {
		    	totalListCount = adminService.getTotalDeleteSearchContentCount(view);
		    }else {
				totalListCount = adminService.getTotalBoardSearchContentCount(view);
		    }
			
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
		
			if (word.equals("1")) {
				boardListPaging.setPostBoardList(adminService.getPostList(viewmap));
			} else {
				viewmap.put("word", word);
				boardListPaging.setPostBoardList(adminService.getSearchResult(viewmap));
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
										@RequestParam(value="currentpage",
													  required=false,
													  defaultValue="1") String currentPage,
										@RequestParam(value="word",
													  required=false,
													  defaultValue="1") String word,
	                                    @RequestParam(value = "categoryid") String categoryid)	
	{
		ProjectBoardListPaging projectBoardListPaging = new ProjectBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		int totalListCount =0;
		if(word.equals("1")) {
			totalListCount = adminService.totalContentCount("2");
		}else {
			Map<String,String> view = new HashMap<String,String>();
			view.put("category_id", "2");
			view.put("word", word);
			totalListCount = adminService.getTotalBoardSearchContentCount(view);	
		}
		
		int pageSize = pagination.getPageSize();
		pagination.setCurPage(Integer.parseInt(currentPage)); 
		int totalPage = pagination.totalPage(totalListCount, pageSize);
		int startPageBlock = pagination.startPageBlock(pagination.getCurPage(), pageSize);
		int printEnd = pagination.printEnd(pagination.getCurPage(), pageSize);
		
		if(printEnd>totalListCount) {
			printEnd=totalListCount;
		}
		
		viewmap.put("orderby", orderby);
		viewmap.put("category", "2");
		viewmap.put("start",String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		if(word.equals("1")) {
			projectBoardListPaging.setProjectBoardList(adminService.getProjectList(viewmap));	
		}else {
			viewmap.put("word", word);
			projectBoardListPaging.setProjectBoardList(adminService.getProjectSearchResult(viewmap));	
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
										  @RequestParam(value="userid", required=false,defaultValue="0")String userid,
										  @RequestParam(value="word",required=false,defaultValue="1") String word										  
			) {
		JobBoardListPaging boardListPaging = new JobBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		int totalcount = 0;
		if(word.equals("1")) {
			totalcount = adminService.getTotalCount();
		}else {
			Map<String,String> view = new HashMap<String,String>();
			view.put("word", word);
			totalcount = adminService.getTotalSearchCount(view);	
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
		boardListPaging.setPostBoardList(adminService.getJobBoardList(viewmap));
		}else {
			viewmap.put("word", word);
			boardListPaging.setCount(adminService.JobboardSearchCount(viewmap));
			boardListPaging.setPostBoardList(adminService.getJobSearchResult(viewmap));	
		}
		boardListPaging.setCurrentPage(pagination.getCurPage());
		boardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		boardListPaging.setPageSize(pageSize);
		boardListPaging.setStartPageBlock(startPageBlock);
		boardListPaging.setTotalListCount(totalcount);
		boardListPaging.setTotalPage(totalPage);
		return boardListPaging;
	}
	
	public UserListPaging gerUserList(@RequestParam(value = "orderby") String orderby,
			@RequestParam(value = "currentpage", required = false, defaultValue = "1") String currentPage,
			@RequestParam(value = "word", required = false, defaultValue = "1") String word
			) {
    
		UserListPaging userListPaging = new UserListPaging();
		Map<String, String> viewmap = new HashMap<String, String>();
		int totalListCount = 0;
		if (word.equals("1")) {
			if(orderby.equals("3")) {
			  totalListCount = adminService.leaveMember();
			}else {
			  totalListCount = adminService.userCount();
			}
			
		} else {
			Map<String, String> view = new HashMap<String, String>();
			view.put("word", word);
			
		    if(orderby.equals("3")) {
		    	totalListCount = adminService.getTotalDeleteUserSearchContentCount(view);
		    }else {
				totalListCount = adminService.getTotalUserSearchContentCount(view);
		    }
			
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
		viewmap.put("start", String.valueOf(pagination.printStart(pagination.getCurPage(), pageSize)));
		viewmap.put("end", String.valueOf(pageSize));
		
			if (word.equals("1")) {
				userListPaging.setUserList(adminService.getUserList(viewmap));
			} else {
				viewmap.put("word", word);
				userListPaging.setUserList(adminService.getUserSearchResult(viewmap));
			}
		
			userListPaging.setCurrentPage(pagination.getCurPage());
			userListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
			userListPaging.setPageSize(pageSize);
			userListPaging.setStartPageBlock(startPageBlock);
			userListPaging.setTotalListCount(totalListCount);
			userListPaging.setTotalPage(totalPage);

		return userListPaging;
	}
	
	    public void excelDownload(HttpServletResponse response)
	            throws Exception {
		 
	        List<UserDetail> list = adminService.getExcelUserList();
	        
	        CustomerExcelWriter excelWriter = new CustomerExcelWriter();
	        //xls 파일 쓰기
	        excelWriter.xlsWriter(list, response);
	        
	        
	    }
	 
		public String changeRole(@RequestParam(value = "userid")int userid,
			                    @RequestParam(value = "role_name")String role_name
				) {
			Map<String, Integer> viewmap = new HashMap<String, Integer>();
			int result = 0;
			int role = 0;
			if(role_name.equals("user")) {
				role = 1;
				viewmap.put("role", role);
				viewmap.put("userid",userid);
				result = adminService.changeRole(viewmap);
			}else if(role_name.equals("company")) {
				role = 2;
				viewmap.put("role", role);
				viewmap.put("userid",userid);
				result = adminService.changeRole(viewmap);
			}else {
				role = 3;
				viewmap.put("role", role);
				viewmap.put("userid",userid);
				result = adminService.changeRole(viewmap);
			}
			if(result>0) {
				return "success";
			}else {
				return "false";
			}
		}
		
		public List<BannerList> getBanner() {
			List<BannerList> bannerList = new ArrayList<BannerList>();
			bannerList= adminService.getBanner();
			return bannerList;
		}
		
		public BannerClickCountToday clickToday(@RequestParam(value="id") int id) {
			BannerClickCountToday banner = new BannerClickCountToday();
			banner= adminService.clickToday(id);
			return banner;
		}
		
		

}
