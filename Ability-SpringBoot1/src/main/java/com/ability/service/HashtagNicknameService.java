package com.ability.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ability.dao.HashtagNicknameMapper;
import com.ability.dto.custom.HashtagComment;
import com.ability.dto.custom.HashtagReply;

/**
 * Ckeditor tag 관련 서비스
 * 
 * @author 정진호
 * @category Ckeditor tag 서비스
 * 
 */

@Service
public class HashtagNicknameService {
	
	@Autowired
	HashtagNicknameMapper hashtagNicknameMapper;
	
	public List<HashtagComment> getComment(Map<String,String> list){
		List<HashtagComment> nicknames = hashtagNicknameMapper.getComment(list);
		return nicknames;
		
	}
	public List<HashtagReply> getReply(Map<String,String> list){
		List<HashtagReply> nicknames = hashtagNicknameMapper.getReply(list);
		return nicknames;
		
	}
}
