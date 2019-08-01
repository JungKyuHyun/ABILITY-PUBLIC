package com.ability.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.ability.dao.ChattingMapper;
import com.ability.dto.ChatRoom;

@Service
@Repository
public class ChatRoomRepository {

	@Autowired
	ChattingMapper chattingMapper;	 
	
	 private Map<String, ChatRoom> chatRoomMap = new HashMap<String, ChatRoom>();
	    
	    @PostConstruct
	    private void init() {
	        chatRoomMap = new LinkedHashMap<>();
	    }
	 
	    public List<ChatRoom> findAllRoom() {
	        // 채팅방 생성순서 최근 순으로 반환
	    	
	        List<ChatRoom>chatRooms = new ArrayList<>();
	        chatRooms = chattingMapper.getRoomList();
	        Collections.reverse(chatRooms);
	        
	        
	        return chatRooms;
	    }
	 
	    public ChatRoom findRoomById(String id) {
	        ChatRoom chatRoom = chattingMapper.getRoomById(id);
	    	
	        return chatRoom;
	    }
	
	    
	    public ChatRoom createChatRoom(String name, String people, String tags) {
	    	int result = 0;
	        ChatRoom chatRoom = ChatRoom.create(name, people, tags);
	        
	        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
	        
	         result = chattingMapper.insert(chatRoom.getRoomId(), name, Integer.parseInt(people), tags);
	        return chatRoom;
	    }
	    
	    public int deleteRoom(String roomId) {
	    	int result = chattingMapper.delete(roomId);
	    	
	    	
	    	return result;
	    }
	    
	}
