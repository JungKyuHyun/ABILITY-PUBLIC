package com.ability.controller.ajax;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ability.dto.custom.AuthenticationRequest;
import com.ability.dto.custom.AuthenticationToken;
import com.ability.dto.custom.DataData;
import com.ability.dto.custom.UserSimple;
import com.ability.service.UserService;

/**
 * @author 정규현
 * @summary 로그인 관련 레스트 컨트롤러
 */

@RestController
@RequestMapping("/user")
public class UserAjax {

	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserService userService;
	
	@Autowired
	RedisTemplate<String, Object> redisTemplate;
										
	public AuthenticationToken login(@RequestBody AuthenticationRequest authenticationRequest,
													HttpSession session) {
		return "secret";
		
	}
	
	public String loginIsCheck(@RequestParam(value="token") String token) {
		String result = "fail";
		ValueOperations<String, Object> vop = redisTemplate.opsForValue();
		DataData getData = (DataData) vop.get("islogin");
		if(getData.getItem().equals(token)) {
			result = "success";
		}
		return result;
	}
	
	
}
