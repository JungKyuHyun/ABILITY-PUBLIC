package com.ability.controller.ajax;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ability.service.UserService;

/**
 * 
 * @author jkh
 * @summary 회원 가입 페이지에서 비동기를 처리하기 위한 처리
 * 
 */

@RestController
public class SignUpAjax {

	@Autowired
	UserService userService;

	public String isOverlapEmail(Model model,@Param("email") String email) {
		String result = "true";
		if(!userService.isOverlapEmail(email)) {
			result = "false";
		}
		return result;
	}
	
	public String isCheckNickName(@RequestParam(value="nickname") String nickname) {
		String result = "true";
		if(!userService.isOverlapNickName(nickname)) {
			result = "false";
		}
		return result;
	}
}
