package com.ability.controller.ajax;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ability.service.UserService;

/**
 * 
 * @author 정규현
 * @summary 비밀번호 찾기에서 비동기를 처리하기 위한 처리
 * 
 */

@RestController
public class IsExistAccountAjax {

	@Autowired
	UserService userService;

	public String isOverlapEmail(Model model, @Param("email") String email, @Param("name") String name) {

		String result = "false";
		if(userService.checkAccount(email, name)!=-1) {
			result = "true";
		}
		return result;
	}
	
	
}
