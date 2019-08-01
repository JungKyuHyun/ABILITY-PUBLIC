package com.ability.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import com.ability.dto.custom.UserSimple;
import com.ability.service.UserService;

/**
 * @author jkh
 * @summary 스프링 시큐리티 유저 인증 프로바이저 구현 로직
 */

@Component
public class UserAuthenticationProvider implements AuthenticationProvider{

	@Autowired
	UserService userService;
	
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String email = authentication.getName();
		String password = (String) authentication.getCredentials();
		UserSimple userSimple = userService.authenticate(email, password);

		if(userSimple == null) {
			return null;
		}
		List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(userSimple.getRole_name()));

		return new UsernamePasswordAuthenticationToken(userSimple, null, authorities);
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
