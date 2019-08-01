package com.ability.dto;


import java.time.LocalDateTime;



public class Chat_Message {

	private String name;
	private String contents;
	private LocalDateTime sendDate;
	private String roomId;
	private String imgSrc;
	private int userid;
	private String deleteUser;
    private String refresh;
	private String hello;
	
	protected Chat_Message(){}
	
	public Chat_Message(String name, String contents, LocalDateTime sendDate, String roomId, String imgSrc, int userid,
			String deleteUser, String refresh, String hello) {
		this.name = name;
		this.contents = contents;
		this.sendDate = sendDate;
		this.roomId = roomId;
		this.imgSrc = imgSrc;
		this.userid = userid;
		this.deleteUser = deleteUser;
		this.refresh = refresh;
		this.hello = hello;
	}

	public String getHello() {
		return hello;
	}

	public void setHello(String hello) {
		this.hello = hello;
	}

	public String getDeleteUser() {
		return deleteUser;
	}

	public void setDeleteUser(String deleteUser) {
		this.deleteUser = deleteUser;
	}

	public String getRefresh() {
		return refresh;
	}

	public void setRefresh(String refresh) {
		this.refresh = refresh;
	}

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getImgSrc() {
		return imgSrc;
	}

	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}

	public String getRoomId() {
		return roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public LocalDateTime getSendDate() {
		return sendDate;
	}
	public void setSendDate(LocalDateTime sendDate) {
		this.sendDate = sendDate;
	}
	
	
}
