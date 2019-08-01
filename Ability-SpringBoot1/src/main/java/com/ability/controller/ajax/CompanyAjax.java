package com.ability.controller.ajax;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ability.service.CompanyService;
/**
 * Company 관련 비동기컨트롤러
 * 
 * @author 정진호
 * @address /signup/ajax
 * @summary 기업등록 중복확인 비동기
 * 
 */
@RestController
public class CompanyAjax {
	
	@Autowired
	CompanyService companyService;
	
	public String isCompanyEmail(@Param("company_email")String company_email) {
		String result = "false";
		if(companyService.isCompanyEmail(company_email)) {
			result = "true";
		}
		return result;
	}
}
