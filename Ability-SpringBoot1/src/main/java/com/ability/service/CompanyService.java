package com.ability.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ability.dao.CompanyMapper;
import com.ability.dto.User_Company_Detail;
import com.ability.dto.custom.HireBoardList;
import com.ability.dto.custom.JobBoardDetailList;
import com.ability.utils.ResumeSendMail;
/**
 * Company 관련 서비스
 * 
 * @author 정진호
 * @summary 기업등록 서비스
 * 
 */
@Service
public class CompanyService {

	@Autowired
	CompanyMapper companyMapper;
	@Autowired
	ResumeSendMail resumeSendMail;
	
	public Boolean isCompanyEmail(String company_email) {
		Boolean result = false;
		try {
			if(companyMapper.isCompanyEmail(company_email).equals(company_email)) {
				result = true;
			}
		} catch (Exception e) {
			e.getStackTrace();
		}
		return result;
		
	}
	
	public int insert(User_Company_Detail user_Company_Detail, HttpServletRequest request) {
		List<MultipartFile> files = user_Company_Detail.getFiles();
		List<String> filenames = new ArrayList<String>();
		int result = 0;
		if (files != null && files.size() > 0) {
			for (MultipartFile file : files) {
				String filename = file.getOriginalFilename();
				String path = request.getServletContext().getRealPath("/WEB-INF/classes/static/image/");
				String fpath = path + "\\" + filename;
				if (!filename.equals("")) {
					try {
						FileOutputStream out = new FileOutputStream(fpath);
						try {
							out.write(file.getBytes());
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
				filenames.add(filename);
			}
		}
		//DB저장---------
		user_Company_Detail.setRegister_file(filenames.get(0));
		result = companyMapper.insert(user_Company_Detail.getCompany_area(),
									  user_Company_Detail.getCompany_email(),
									  user_Company_Detail.getHomepage_url(),
									  user_Company_Detail.getRegister_number(),
									  user_Company_Detail.getUserid(),
									  user_Company_Detail.getCompany_tel(),
									  user_Company_Detail.getManager_tel(),
									  user_Company_Detail.getRegister_file(),
									  user_Company_Detail.getXloc(),
									  user_Company_Detail.getYloc(),
									  user_Company_Detail.getCompany_name());
									  
		return result;
	}
	
	public List<HireBoardList> getJobBoard(Map<String,String> viewmap){
		List<HireBoardList> list = companyMapper.getJobBoard(viewmap);
		return list;
	}
	
	public JobBoardDetailList getDetail(Map<String,String> user) {
		JobBoardDetailList ucd = companyMapper.getDetail(user);
		return ucd;
	}
	
	public int getTotalCount() {
		int result = companyMapper.getTotalCount();
		
		return result;
	}
	
	public int UpdateViewCount(Map<String,String> id) {
		return companyMapper.UpdateViewCount(id);
	}
	
	public int setLogo(String userid,String path,HttpServletRequest request) {
		Map<String,String> list = new HashMap<String,String>();
		list.put("userid", userid);
		list.put("logo", path);
		return companyMapper.setLogo(list);
	}
	public int setResume(String userid,String path,HttpServletRequest request) {
		Map<String,String> list = new HashMap<String,String>();
		list.put("userid", userid);
		list.put("resume", path);
		return companyMapper.setResume(list);
	}
	public int insertCompany(Map<String,String> boardlist) {
		int result = companyMapper.insertCompany(boardlist);
		
		if(result > 0) {
			return result;
		}else {
			return -1;
		}
	}
	public int updateJobBoard(Map<String,String> board) {
		return companyMapper.updateJobBoard(board);
	}
	public int getTotalSearchCount(Map<String, String> view) {
		int result = 0;
		try {
			result = companyMapper.getTotalSearchCount(view);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
	public List<HireBoardList> getSearchResult(Map<String,String> board){
		return companyMapper.getSearchResult(board);
	}
	
	public int delete(int seq) {
		int result = companyMapper.delete(seq);
		
		if(result >0) {
			return result;
		}else {
			return 0;			
		}
	}
	
	public int setCompanyRole(int userid) {
		return companyMapper.setCompanyRole(userid);
	}
	
	public Integer getScrap(Map<String,String> scrap) {
		return companyMapper.getScrap(scrap);
	}
	public int setScrap(Map<String,String> scrap) {
		return companyMapper.setScrap(scrap);
	}
	public int deleteScrap(Map<String,String> scrap) {
		return companyMapper.deleteScrap(scrap);
	}
	public int JobboardSearchCount(Map<String,String> count) {
		int result = 0;
		result = companyMapper.JobboardSearchCount(count);
		if(result > 0) {
			return result;
		}
		return result;
	}
	
	public int ResumeSendMail(String email,String introduce,MultipartFile resume,HttpServletRequest request) {
		MultipartFile files = resume;
		String filename ="";
		int result = 1;
		String path="";
			if (files != null) {
				filename = files.getOriginalFilename();
				path = request.getServletContext().getRealPath("/WEB-INF/classes/static/image/")+filename;
				if (!filename.equals("")) {
					try {
						FileOutputStream out = new FileOutputStream(path);
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
			try {
			resumeSendMail.ResumeMail(email, path, filename ,introduce);
			}catch (Exception e) {
				e.getStackTrace();
			}
			return result;
	}

}


