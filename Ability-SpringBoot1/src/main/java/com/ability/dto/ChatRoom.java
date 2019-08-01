package com.ability.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ChatRoom {
	private String room_id;
	private String room_name;
	private String max_people;
	private String tags;
	private List<ChatUser> userList= new ArrayList<>();
 	
	public static ChatRoom create(String name, String people, String tags ) {
		ChatRoom created = new ChatRoom();
		created.room_id = UUID.randomUUID().toString();
		created.room_name = name;
		created.max_people = people;
		created.tags= tags;
		return created;
	}
	
	
   public void joinRoom(ChatUser user) {
        userList.add(user);	   
   }
   
   
	
	public List<ChatUser> getUserList() {
		return userList;
	}


	public void setUserList(List<ChatUser> userList) {
		this.userList = userList;
	}


	public String getPeople() {
		return max_people;
	}



	public void setPeople(String people) {
		this.max_people = people;
	}



	public String getTags() {
		return tags;
	}



	public void setTags(String tags) {
		this.tags = tags;
	}



	public String getRoomId() {
		return room_id;
	}

	public void setRoomId(String room_id) {
		this.room_id = room_id;
	}

	public String getName() {
		return room_name;
	}

	public void setName(String room_name) {
		this.room_name = room_name;
	}


	@Override
	public String toString() {
		return "ChatRoom [room_id=" + room_id + ", room_name=" + room_name + ", max_people=" + max_people + ", tags="
				+ tags + ", userList=" + userList + "]";
	}
	
	

}
