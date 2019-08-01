package com.ability.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ability.dto.User_Company_Detail;
import com.ability.dto.custom.Reputation;
import com.ability.service.CompanyService;
import com.ability.service.UserService;

/**
 * 로그인, 로그아웃, 회원가입 관련 컨트롤러
 * 
 * @author 정규현
 * @address /user
 * 
 */

@Controller
public class HomeController {

	@Autowired
	UserService userService;

	@Autowired
	CompanyService companyService;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	

	public String signUpEmailAuth(@RequestParam(value = "authkey") String authkey) {
		String url = "redirect:http://team-ability.com";
		if (!userService.signUpMailAuthConfirm(authkey)) {
			url = "error";
		}
		return url;
	}

	
	@RequestMapping(path="/login/forgot", method=RequestMethod.GET)
	public String forgotPassword() {
		return "secret";
	}
	
	public String passwordFindOk(@RequestParam(value="name") String name,
								@RequestParam(value="email") String email) {
		return "secret";
	}
	
	
	/**
	 * Company 관련 컨트롤러
	 * @author 정진호
	 * @summary 기업 등록 서비스
	 * @version 파일업로드 구현
	 */
	
	public String companySignUp(@RequestParam("userid")String userid,Model model) {
			model.addAttribute("userid", userid);
		return "secret";
	}

	public String companySignUpOk(@RequestParam("company_name")String company_name,
   								  @RequestParam("userid") int userid,
								  @RequestParam("company_area")String company_area,
								  @RequestParam("company_email")String company_email,
								  @RequestParam("company_tel")String company_tel,
								  @RequestParam("manager_tel")String manager_tel,
								  @RequestParam("homepage_url")String homepage_url,
								  @RequestParam("register_number")String register_number,
								  @RequestParam("files") List<MultipartFile> files,
								  @RequestParam("xloc")String xloc,
								  @RequestParam("yloc")String yloc,
								  HttpServletRequest request,Model model
								 ) {
		User_Company_Detail user_Company_Detail = new User_Company_Detail();

		user_Company_Detail.setCompany_name(company_name);
		user_Company_Detail.setUserid(userid);
		user_Company_Detail.setCompany_area(company_area);
		user_Company_Detail.setCompany_email(company_email);
		user_Company_Detail.setCompany_tel(company_tel);
		user_Company_Detail.setManager_tel(manager_tel);
		user_Company_Detail.setHomepage_url(homepage_url);
		user_Company_Detail.setRegister_number(register_number);
		user_Company_Detail.setFiles(files);
		user_Company_Detail.setXloc(xloc);
		user_Company_Detail.setYloc(yloc);
		String url = "";
		int result = companyService.insert(user_Company_Detail, request);
		if(result != -1) {
			companyService.setCompanyRole(userid);
			model.addAttribute("name", "기업 등록");
			model.addAttribute("login","다시 로그인");
			url = "jsp/Signok";
		}else {
			url = "error";
		}
		return url;
	}
	
	public String Chattingtest() {
		
		return "chatting/chat";
	}
	
	@ResponseBody
	public Reputation getReputation(@RequestParam("userid")int userid) {
		Reputation requtation = userService.getReputation(userid);
		return requtation;
	}
	

}
