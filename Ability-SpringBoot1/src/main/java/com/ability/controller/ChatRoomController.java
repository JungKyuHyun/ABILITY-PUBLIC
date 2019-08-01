package com.ability.controller;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ability.dto.ChatRoom;
import com.ability.dto.ChatUser;
import com.ability.dto.Chat_FileUpload;
import com.ability.service.ChatRoomRepository;
import com.google.gson.JsonObject;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatRoomController {

	 private final ChatRoomRepository repository;
	 public List<ChatUser>userList = new ArrayList<ChatUser>(); 
	 public List<ChatRoom>roomList = new ArrayList<ChatRoom>();
	 
	
	 
	@Autowired
    public ChatRoomController(ChatRoomRepository repository) {
        this.repository = repository;
        roomList = room();
    }
	    
	@ResponseBody// 모든 채팅방 목록 반환 
	public List<ChatRoom> room() {
	   
		return repository.findAllRoom();
	}
	
	@ResponseBody// 채팅방 생성 
	public ChatRoom createRoom(@RequestParam(value="name")String name,
		                       @RequestParam(value="people")String people,
		                       @RequestParam(value="tags")String tags
			){	
		
		  ChatRoom newRoom = repository.createChatRoom(name, people, tags); 
		  roomList.add(newRoom);
		
		return newRoom;			
	}
	
	public String roomDetail(@PathVariable("roomId") String roomId,
			 				  String nick_name,
			 				  String user_image,  
			 				  int userid,
			 				 			  Model model
			                 
			) {
		ChatUser user = new ChatUser(Integer.parseInt(Integer.toString(userid)),nick_name,user_image);
		ChatRoom room = repository.findRoomById(roomId);
		a:for(int i=0; i<roomList.size(); i++) {
			if(roomList.get(i).getRoomId().equals(room.getRoomId())) {
				for(int j=0; j<roomList.get(i).getUserList().size();j++) {
					 if(roomList.get(i).getUserList().get(j).getUserid()==user.getUserid()) {
						  break a;
					 }	
				}
				roomList.get(i).joinRoom(user);
			}
		}
		
		
		for(int i=0; i<roomList.size(); i++) {
			if(roomList.get(i).getRoomId().equals(room.getRoomId())) {
				model.addAttribute("userlist",roomList.get(i).getUserList());
		      }
		}
		model.addAttribute("room",room);
		model.addAttribute("nick_name",nick_name);
		model.addAttribute("user_image",user_image);
		model.addAttribute("userid",userid);
		
        return "chatting/chat";
	}
	
	@ResponseBody
	public int deleteRoom(@RequestParam(value="roomId")String roomId) {
        return repository.deleteRoom(roomId);
	}
	
	@ResponseBody
	public int deleteuser(@RequestParam(value="userId")String userId,
		                  @RequestParam(value="roomID")String roomID
	){
		int userCount = 0;
		a:for(int i=0; i<roomList.size(); i++) {
			if(roomList.get(i).getRoomId().equals(roomID)) {
				for(int j=0; j<roomList.get(i).getUserList().size();j++) {
					 if(roomList.get(i).getUserList().get(j).getUserid()==Integer.parseInt(userId)) {
						 roomList.get(i).getUserList().remove(j);
						 userCount=roomList.get(i).getUserList().size();
						 break a;
					 }	
				}
			}
		}
		
        return userCount;
	}
	
	@ResponseBody
	public List<ChatUser>getUserList(@RequestParam(value="roomID")String roomID){
		List<ChatUser>userList = new ArrayList<>();
		for(int i=0; i<roomList.size(); i++) {
			   if(roomList.get(i).getRoomId().equals(roomID)) {
				   userList= roomList.get(i).getUserList();
			   }
			   }
		return userList;
	}
	
	@ResponseBody
	public int getUserCount(@RequestParam(value="roomID")String roomID){
		int userCount = 0;
		for(int i=0; i<roomList.size(); i++) {
			   if(roomList.get(i).getRoomId().equals(roomID)) {
				   userCount= roomList.get(i).getUserList().size();
			   }
			   }
		return userCount;
	}
	
	 @ResponseBody
	    public String fileUpload(@RequestParam MultipartFile upload ,@ModelAttribute("Chat_FileUpload") Chat_FileUpload chat_FileUpload ,HttpServletResponse response, HttpServletRequest request , Model model){
		    JsonObject json = new JsonObject();
		    HttpSession session = request.getSession();
	        String rootPath = session.getServletContext().getRealPath("/WEB-INF/classes/static/image");
	        OutputStream out = null;
	        PrintWriter printWriter = null;
	        upload = chat_FileUpload.getUpload();
	        byte[] bytes = null;
			try {
				bytes = upload.getBytes();
			} catch (IOException e1) {
				e1.printStackTrace();
			}
	        String filename = "";
	        String fileurl="";
	        if(upload != null){
	            filename = upload.getOriginalFilename();
	            filepath= rootPath+"/"+filename;
	            chat_FileUpload.setFilename(filename);
	            fileurl = request.getContextPath() +"/resources/static/image/bg1.jpeg";
	            try{
	                File file = new File(rootPath+"/"+filename);
	                
	                upload.transferTo(file);
	            }catch(IOException e){
	                System.out.println(e.getMessage());
	            }  
	        }
	        try {
				out = new FileOutputStream(new File(rootPath+"/"+filename));
				 try {
					out.write(bytes);
					printWriter = response.getWriter();
			        response.setContentType("text/html");

		            json.addProperty("uploaded", 1);
	                json.addProperty("fileName",filename);
	                json.addProperty("url",fileurl);
	                printWriter.println(json);
	                
				} catch (IOException e) {
					e.printStackTrace();
				}
		        
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}finally {
				 if(out!=null) {
	            	   try {
						out.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
	               }
	               if(printWriter != null) {
	            	   printWriter.close();
	               }
			}
           

	        return null;
	    }
	
	
}
