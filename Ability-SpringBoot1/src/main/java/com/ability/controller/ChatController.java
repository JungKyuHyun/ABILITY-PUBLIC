package com.ability.controller;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.ability.dto.Chat_Message;

import lombok.RequiredArgsConstructor;


@Controller
@RequiredArgsConstructor
public class ChatController {
    
	
	private final SimpMessagingTemplate template;
	
	@Autowired
	public ChatController(SimpMessagingTemplate template) {
		this.template = template;
	}

	public void hello(Chat_Message message) throws Exception {
		message.setSendDate(LocalDateTime.now());
	    template.convertAndSend("/topic/chat/room/"+message.getRoomId(), message);
	}
	
	public void message(Chat_Message message) throws Exception {
		message.setSendDate(LocalDateTime.now());
	    template.convertAndSend("/topic/chat/room/"+message.getRoomId(), message);
	}
	
	public void exit(Chat_Message message) throws Exception {
		message.setSendDate(LocalDateTime.now());
	    template.convertAndSend("/topic/chat/room/"+message.getRoomId(), message);
	}
	
	public void refresh(Chat_Message message) throws Exception {
		message.setSendDate(LocalDateTime.now());
	    template.convertAndSend("/topic/chat/room/"+message.getRoomId(), message);
	}
	
	Set<String> mySet = Collections.newSetFromMap(new ConcurrentHashMap<String, Boolean>());

	@EventListener
	private void onSessionConnectedEvent(SessionConnectedEvent event) {
	    StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
	    mySet.add(sha.getSessionId());
	}

	@EventListener
	private void onSessionDisconnectEvent(SessionDisconnectEvent event) {
	    StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());
	    mySet.remove(sha.getSessionId());
	}
	
     
   
}
