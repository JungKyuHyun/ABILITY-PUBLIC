package com.ability.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ability.dto.ChatRoom;

public interface ChattingMapper {

	/**
	 * 채팅게시판 관련 Mapper
	 * 
	 * @author 강기훈
	 * @summary 채팅게시판 DAO
	 * 
	 */
	
	public int insert(@Param(value="room_id") String room_id,
			          @Param(value="room_name") String room_name,
			          @Param(value="max_people") int max_people,
			          @Param(value="tags") String tags
			);
	public List <ChatRoom>getRoomList();
			
	public ChatRoom getRoomById(@Param(value="room_id") String room_id);
	
	public int delete(@Param(value="room_id") String room_id);
}
