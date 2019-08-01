package com.ability.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ability.dao.AdminMapper;
import com.ability.dto.custom.AnswerRate;
import com.ability.dto.custom.BannerClickCountToday;
import com.ability.dto.custom.BannerList;
import com.ability.dto.custom.HireBoardList;
import com.ability.dto.custom.PostBoardList;
import com.ability.dto.custom.ProjectBoardList;
import com.ability.dto.custom.UserDetail;
import com.ability.dto.custom.UserMonthlyStatistics;

/**
 * 관리자페이지 관련 서비스
 * 
 * @author 강기훈
 * 
 * 
 */

@Service
public class AdminService {
    
	@Autowired
	AdminMapper adminMapper;
	
	public int allPostCount() {
		int result = adminMapper.allPostCount();
		return result;
	}
	
	public int userCount() {
		 int result = adminMapper.userCount();
		 return result;
	}
	
	public int leaveMember() {
		 int result = adminMapper.leaveMember();
		 return result;
	}
	
	public int todayJoinCount() {
		 int result = adminMapper.todayJoinCount();
		 return result;
	}
	
	public int questionCount() {
		 int result = adminMapper.questionCount();
		 return result;
	}
	
	public int freeboardCount() {
		 int result = adminMapper.freeboardCount();
		 return result;
	}
	
	public int projectCount() {
		 int result = adminMapper.projectCount();
		 return result;
	}
	
	public int accuseCount() {
		 int result = adminMapper.accuseCount();
		 return result;
	}
	
	public int getDeleteCount() {
		 int result = adminMapper.getDeleteCount();
		 return result;
	}
	
	public int noAnswerCount() {
		 int result = adminMapper.noAnswerCount();
		 return result;
	}

	public int jobCount() {
		 int result = adminMapper.jobCount();
		 return result;
	}
	
	public int deleteJobPost(int id) {
		 int result = adminMapper.deleteJobPost(id);
		 return result;
	}
	
	public int recoverJobPost(int id) {
		 int result = adminMapper.recoverJobPost(id);
		 return result;
	}
	
	public int deletePost(int id) {
		 int result = adminMapper.deletePost(id);
		 return result;
	}
	
	public int recoverPost(int id) {
		 int result = adminMapper.recoverPost(id);
		 return result;
	}
	
	public int deleteUser(int id) {
		int result = adminMapper.deleteUser(id);
		return result;
	}
	
	public int recoverUser(int id) {
		int result = adminMapper.recoverUser(id);
		return result;
	}
	
	public List<UserMonthlyStatistics> monthJoin() {
		List<UserMonthlyStatistics> monthjoin = adminMapper.monthJoin();
		 return monthjoin;
	}
	
	public List<UserMonthlyStatistics> monthLeave() {
		List<UserMonthlyStatistics> monthleave = adminMapper.monthLeave();
		 return monthleave;
	}
	
	 public List<String> getTags() {
		 List <String> taglist = adminMapper.getTags();
		 return taglist;
	 }
	 
	 public List<PostBoardList> getPostBoard(int categoryid) {
		 List <PostBoardList> postList = adminMapper.getPostBoard(categoryid);
		 return postList;
	 }
	 
	 public List<PostBoardList> getJobBoard() {
		 List <PostBoardList> postList = adminMapper.getJobBoard();
		 return postList;
	 }
	 
	 public List<AnswerRate> getReplyCount() {
		 List <AnswerRate> chartData = adminMapper.getReplyCount();
		 return chartData;
	 }
	 
	 public List<AnswerRate> getQuestionCount() {
		 List <AnswerRate> chartData2 = adminMapper.getQuestionCount();
		 return chartData2;
	 }
	 
	 public int totalContentCount(String category_id) {
			int result = 0;
			try {
				result = adminMapper.getTotalBoardContentCount(category_id);
			} catch (Exception e) {
				result = 0;
			}
			return result;
		}
	 
	 public int totalDeleteContentCount(String category_id) {
			int result = 0;
			try {
				result = adminMapper.getTotalDeleteContentCount(category_id);
			} catch (Exception e) {
				result = 0;
			}
			return result;
		}
	 
	//getTotalBoardSearchContentCount
		public int getTotalBoardSearchContentCount(Map<String, String> view) {
			int result = 0;
			try {
				result = adminMapper.getTotalBoardSearchContentCount(view);
			} catch (Exception e) {
				result = 0;
			}
			return result;
		}
		
		public int getTotalUserSearchContentCount(Map<String, String> view) {
			int result = 0;
			try {
				result = adminMapper.getTotalUserSearchContentCount(view);
			} catch (Exception e) {
				result = 0;
			}
			return result;
		}
		
		public int getTotalDeleteSearchContentCount(Map<String, String> view) {
			int result = 0;
			try {
				result = adminMapper.getTotalDeleteSearchContentCount(view);
			} catch (Exception e) {
				result = 0;
			}
			return result;
		}
		public int getTotalDeleteUserSearchContentCount(Map<String, String> view) {
			int result = 0;
			try {
				result = adminMapper.getTotalDeleteUserSearchContentCount(view);
			} catch (Exception e) {
				result = 0;
			}
			return result;
		}
		
		public int getTotalCount() {
			int result = adminMapper.getTotalCount();
			
			return result;
		}
		
		public int getTotalSearchCount(Map<String, String> view) {
			int result = 0;
			try {
				result = adminMapper.getTotalSearchCount(view);
			} catch (Exception e) {
				result = 0;
			}
			return result;
		}
		
		public List<HireBoardList> getJobBoardList(Map<String,String> viewmap){
			List<HireBoardList> list = adminMapper.getJobBoardList(viewmap);
			return list;
		}
	 
	     public List<HireBoardList> getJobSearchResult(Map<String,String> board){
			return adminMapper.getJobSearchResult(board);
		}
	 
		public List<ProjectBoardList> getProjectList(Map<String, String> view) {
			 return adminMapper.getProjectList(view);
		}
		
		public List<ProjectBoardList> getProjectSearchResult(Map<String, String> view) {
			 return adminMapper.getProjectSearchResult(view);
		}
		
		//community board list
		public List<PostBoardList> getPostList(Map<String, String> view) {
			 return adminMapper.getCommunityList(view);
		}
		
		public List<PostBoardList> getSearchResult(Map<String, String> view) {
			 return adminMapper.getSearchResult(view);
		}
		
		public List<UserDetail> getUserList(Map<String, String> view) {
			List<UserDetail> userlist = adminMapper.getUserList(view);
			 return userlist;
		}
		
		public List<UserDetail> getUserSearchResult(Map<String, String> view) {
			List<UserDetail> userlist = adminMapper.getUserSearchResult(view);
			return userlist;
		}
		
		public int JobboardSearchCount(Map<String,String> count) {
			int result = 0;
			result = adminMapper.JobboardSearchCount(count);
			if(result > 0) {
				return result;
			}
			return result;
		}
		
		public List<UserDetail> getExcelUserList() {
			List<UserDetail> userlist = adminMapper.getExcelUserList();
			 return userlist;
		}
		
		public int changeRole(Map<String,Integer> viewmap) {
			int result = 0;
			result = adminMapper.changeRole(viewmap);
			return result;
		}
		
		public List<BannerList> getBanner(){
			List<BannerList> bannerList = new ArrayList<BannerList>();
			bannerList = adminMapper.getBanner();
			return bannerList;
		}
		
		public BannerClickCountToday clickToday(int id){
			BannerClickCountToday banner = new BannerClickCountToday();
			banner = adminMapper.clickToday(id);
			return banner;
		}
		
		
		
}
