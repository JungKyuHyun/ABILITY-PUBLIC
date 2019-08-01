package com.ability.dao;

import java.util.List;
import java.util.Map;

import com.ability.dto.custom.HashtagComment;
import com.ability.dto.custom.HashtagReply;

/**
 * CkEditor @태그 이름나오게하기
 * 
 * @author 정진호
 * @summary Ckeditor tag
 * 
 */
public interface HashtagNicknameMapper {
	
	public List<HashtagComment> getComment(Map<String,String> list);
	public List<HashtagReply> getReply(Map<String,String> list);
}
