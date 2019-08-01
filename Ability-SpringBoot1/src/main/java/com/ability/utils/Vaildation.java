package com.ability.utils;

import org.springframework.stereotype.Component;

/**
 * 
 * @author 정규현
 * @summary 유효성 검사식
 *
 */

@Component
public class Vaildation {
   
	private Vaildation() {}
	
	public static String removeSpecialCharacters(String str){      
	      String match = "[^\uAC00-\uD7A3xfe0-9a-zA-Z\\s,]";
	      str =str.replaceAll(match, "");
	      
	      return str;
   }


		
}
