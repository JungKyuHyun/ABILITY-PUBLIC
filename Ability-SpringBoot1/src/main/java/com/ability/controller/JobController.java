package com.ability.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ability.dto.custom.JobBoardDetailList;
import com.ability.dto.custom.JobBoardListPaging;
import com.ability.service.CompanyService;
import com.ability.service.UploadFileUtilsS3Service;
import com.ability.utils.Pagination;
import com.ability.utils.S3Util;

/**
 * 구인게시판 컨트롤러
 * 
 * @author jkh
 * @address /job
 * 
 * @author 정진호
 * @version Job_Board게시판 구현
 */

@RestController
public class JobController {
	
	@Autowired
	CompanyService companyService;
	
	@Autowired
	Pagination pagination;
	
	@Autowired
	UploadFileUtilsS3Service uploadFileUtilsS3Service;
	
	S3Util s3 = new S3Util();
	String bucketName = "";

	
	public JobBoardListPaging getJobBoard(@RequestParam(value="orderby")String orderby,
										  @RequestParam(value="currentpage",required=false,defaultValue="1")String currentPage,
										  @RequestParam(value="userid", required=false,defaultValue="0")String userid,
										  @RequestParam(value="word",required=false,defaultValue="1") String word) {
		JobBoardListPaging boardListPaging = new JobBoardListPaging();
		Map<String,String> viewmap = new HashMap<String,String>();
		int totalcount = 0;
		if(word.equals("1")) {
			totalcount = companyService.getTotalCount();
		}else {
			Map<String,String> view = new HashMap<String,String>();
			view.put("word", word);
			totalcount = companyService.getTotalSearchCount(view);	
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
		boardListPaging.setPostBoardList(companyService.getJobBoard(viewmap));
		}else {
			viewmap.put("word", word);
			boardListPaging.setCount(companyService.JobboardSearchCount(viewmap));
			boardListPaging.setPostBoardList(companyService.getSearchResult(viewmap));	
		}
		boardListPaging.setCurrentPage(pagination.getCurPage());
		boardListPaging.setEndPageBlock(pagination.endPageBlock(startPageBlock, pageSize, totalPage));
		boardListPaging.setPageSize(pageSize);
		boardListPaging.setStartPageBlock(startPageBlock);
		boardListPaging.setTotalListCount(totalcount);
		boardListPaging.setTotalPage(totalPage);
		return boardListPaging;
	}
	public JobBoardDetailList getDetail(@RequestParam(value="seq")String seq,
										@RequestParam(value="userid",required=false,defaultValue="0")String userid) {
		Map<String,String> user = new HashMap<String,String>();
		user.put("id", seq);
		user.put("userid", userid);
		companyService.UpdateViewCount(user);
		JobBoardDetailList ucd = companyService.getDetail(user);
		return ucd;
	}
	
	@RequestMapping(path="/job/insert",method=RequestMethod.POST)
	public int insertCompany(@RequestParam(value="userid")String userid,
							 @RequestParam(value="title")String title,
							 @RequestParam(value="subtitle")String subtitle,
							 @RequestParam(value="period")String period,
							 @RequestParam(value="job_type")String job_type,
							 @RequestParam(value="job_time")String job_time,
							 @RequestParam(value="job_dept")String job_dept,
							 @RequestParam(value="scale")String scale,
							 @RequestParam(value="email")String email,
							 @RequestParam(value="phone")String phone,
							 @RequestParam(value="tags")String tags,
							 @RequestParam(value="content")String content,
							 @RequestParam(value="career")String career,
							 @RequestParam(value = "files") MultipartFile files,
							 @RequestParam(value = "files2") MultipartFile files2,
							 HttpServletRequest request) {
		
		String uploadpath = "spring/LogoImage";
		ResponseEntity<String> img_path = null;
		String user_imgPath = "";
		
		String resumeuploadpath = "spring/LogoImage";
		ResponseEntity<String> resume_path = null;
		String user_resumePath = "";
		try {
			img_path = new ResponseEntity<>(
					uploadFileUtilsS3Service.uploadFile(uploadpath, files.getOriginalFilename(), files.getBytes()),
					HttpStatus.CREATED);
			user_imgPath = (String) img_path.getBody();
			
			resume_path = new ResponseEntity<>(
					uploadFileUtilsS3Service.uploadFile(resumeuploadpath, files2.getOriginalFilename(), files2.getBytes()),
					HttpStatus.CREATED);
			user_resumePath = (String) resume_path.getBody();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		
		Map<String,String> board = new HashMap<String,String>();
		board.put("userid", userid);
		board.put("title", title);
		board.put("subtitle", subtitle);
		board.put("period", period);
		board.put("job_type", job_type);
		board.put("job_time", job_time);
		board.put("job_dept", job_dept);
		board.put("scale", scale);
		board.put("email", email);
		board.put("phone", phone);
		board.put("tags", tags);
		board.put("content", content);
		board.put("career", career);
		
		int result = companyService.setLogo(userid,user_imgPath,request);
		int result2 = companyService.setResume(userid, user_resumePath, request);
		if(result >0 && result2 >0) {
			int boardresult = companyService.insertCompany(board);
				if(boardresult > 0) {
					return boardresult;
					
				}else {
					return -1;
				}
		}else {
			return -1;
		}
	}
	
	public String Delete(@RequestParam("seq")String seq) {
		int result = companyService.delete(Integer.parseInt(seq));
			if(result > 0) {
				return "success";
			}else {
				return null;				
			}
	}
	
	public Integer getScrap(@RequestParam(value="userid", required=false,defaultValue="0")String userid,
						@RequestParam(value="boardid")String boardid,
						@RequestParam(value="category_id")String category_id) {
		Map<String,String> scrap = new HashMap<String,String>();
		scrap.put("userid", userid);
		scrap.put("boardid",boardid);
		scrap.put("category_id",category_id);
		Integer temp1 =0;
		try {
			if(companyService.getScrap(scrap) != null) {
				temp1 = companyService.getScrap(scrap);
			}
		}catch(Exception e){
			throw e;
		}			if(temp1 > 0) {
			companyService.deleteScrap(scrap);
			return 0;
		}else {
			companyService.setScrap(scrap);
			return 1;
	}

	}
	public int updateJobBoard(@RequestParam(value="id")String id,
							  @RequestParam(value="userid")String userid,
							  @RequestParam(value="title")String title,
							  @RequestParam(value="subtitle")String subtitle,
							  @RequestParam(value="period")String period,
							  @RequestParam(value="job_type")String job_type,
							  @RequestParam(value="job_time")String job_time,
							  @RequestParam(value="job_dept")String job_dept,
							  @RequestParam(value="email")String email,
							  @RequestParam(value="phone")String phone,
							  @RequestParam(value="tags")String tags,
							  @RequestParam(value="content")String content,
							  @RequestParam(value="career")String career) {
		Map<String,String> board = new HashMap<String,String>();
		board.put("id", id);
		board.put("userid", userid);
		board.put("title", title);
		board.put("subtitle", subtitle);
		board.put("period", period);
		board.put("job_type", job_type);
		board.put("job_time", job_time);
		board.put("job_dept", job_dept);
		board.put("email", email);
		board.put("phone", phone);
		board.put("tags", tags);
		board.put("content", content);
		board.put("career", career);
		
		int result = companyService.updateJobBoard(board);
		
		if(result > 0) {
			return result;
		}else {
			return 0;
		}
			
	}
	
	public String ResumeSendMail(@RequestParam("resume")MultipartFile resume,
								 @RequestParam("email")String email,
								 @RequestParam("introduce")String introduce,
								 HttpServletRequest request) {
		try {
		companyService.ResumeSendMail(email, introduce, resume, request);
		
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
		return "success";
	}
	
}
