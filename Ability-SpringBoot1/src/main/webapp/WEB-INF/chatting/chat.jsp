<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>Ability Chatting</title>
<link href="/ability3/webjars/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
<!-- <link href="<c:url value="/css/chat.css" />" rel="stylesheet"> -->
<script src="/ability3/webjars/jquery/jquery.min.js"></script>
<script src="/ability3/webjars/sockjs-client/sockjs.min.js"></script>
<script src="/ability3/webjars/stomp-websocket/stomp.min.js"></script>
<script type="text/javascript"
	src="<c:url value='/ckeditor/ckeditor.js'/>"></script>
<style type="text/css">

#main-content {
	margin-left: 20px;
	background-color: #fff;
	width: 98%;
}

.chat-panel {
   border:none;
}

.chat-panel .panel-body {
	height: 650px;
	padding:0;
	overflow-y: auto;
  }
::-webkit-scrollbar-track {
  background: white;
}
	
}

.chat {
	list-style: none;
	margin: 0px;
	padding: 0px;
}

.chat li {
	margin-bottom: 10px;
	padding-bottom: 5px;
}

.form-group {
	margin-bottom: 0px !important;
}

.panel .panel-heading {
	background-color: #5F4B8B;
	color: white;
}

#subcontainer {
	
	margin-right: 20px;
	margin-top: 45px;
}

#gridcontainer {
	display: grid;
	grid-template-columns: 60% 40%;
	grid-template-rows: 800px;
}

.connection {
	display: flex;
	flex-direction: column;
	text-align: right;
}

.namefield {
	display:flex;
	justify-content: space-between;
	margin-top:5px;
	margin-bottom:5px;
}

.chattingTitle {
	color: #5F4B8B;
	font-weight: bold;
    margin-bottom:43px;
    font-size:
}

.btn-default { 
   background-color:#5F4B8B;
   border-color: #5F4B8B;
   color:white;
}

.btn-default:hover {
   background-color: white;
   color:#5F4B8B;
   border-color: #5F4B8B;
}


.roomTitle {
  color: #5F4B8B;
  font-weight: bold;
  font-size:25px;
}

.namespace {
  width:180px;
  border-color: #5F4B8B;
  color:#5F4B8B;
  
}

.namespace::placeholder {
  color:#b9abce;
}

.input-sm::placeholder {
  color:#b9abce;
}

#cke_1_top {
 background-color: #ebe7f1;
}

#cke_p_content {
 border:1px solid #b9abce;
}

.panel-footer {
  background-color: white;
  border:2px solid #b9abce;
  padding:0;
}

.input-sm {
  border:none;
  font-size: 15px;
  width:100%;
  height:40px;
  
} 

.input-sm:focus{
    outline: none;
  
} 

.input-group{
   width:100%;
   
}

#btn-chat {
	border: none;
    padding:0;
    
}

.form-group #sendBtn {
 margin-bottom: 10px;
}

.form-group {
  display:flex;
  justify-content: space-between;
}

.form-group #sendBtn {
   background: #5F4B8B;
   color: white;
   padding: 10px;
   height: 40px;
   font-size: 20px;
   margin:0;
}

#sendMessage {
  text-align: right;
  margin-top:10px;

}

.editorBtn {
  width:100%;
  height:34px;
  border-radius: 6px;
  background-color: #5F4B8B;
  color:white;
  margin-bottom:5px;
  border:1px solid #5F4B8B;
  
}

.editorBtn:hover {
  background-color: white;
  color: #5F4B8B;
  margin-bottom:5px;
  border:1px solid #5F4B8B;
  
}

.chat {
   list-style-type: none;
   padding-left:10px;
}

.contents {
  margin-top:5px;
}

.primary-font{
  font-size:15px;
}

.img-circle {
  border-radius: 6px;
  margin-right:6px;
  width:50px;
  height:50px;
}


.enterRoom {
  text-align: center;
  display:inline-block;
  width:100%;
  height: 45px;
  background-color:white;
  border-radius:15px;
  color:black;
}

 #hello {
  text-align: center;
}

#myId {
   font-size:14px;
   color:#0984e3;
   margin-left:3px;
}
.currentUser {
  width:50px;
  heigth:50px;
}

.currentUser:hover {
  opacity:0.4;
  cursor:pointer;
}
.userZone {
 diplay:grid;
 grid-template-columns:7% 7% 7% 7% 7% 7% 7% 7% 7% 7% 7% 7% 7% 7% 7%;  
}

.user {
 margin-right:5px;
}

</style>
</head>
<body>
	<noscript>
		<h2 style="color: #ff0000">Seems your browser doesn't support
			Javascript! Websocket relies on Javascript being enabled. Please
			enable Javascript and reload this page!</h2>
	</noscript>
	<input type="hidden" id="roomId" value="${room.roomId}"/>
	<input type="hidden" id="nick_name" value="${nick_name}"/>
	<input type="hidden" id="user_image" value="${user_image}"/>
	<input type="hidden" id="userid" value="${userid}"/>
	<input type="hidden" id="userlist" value="${userlist}"/>
	
	<div id="gridcontainer">
		<div id="main-content" class="container">
			<h1 class="chattingTitle">${room.name}</h1>

			<div class="connection">
				<form class="form-inline buttonfield">
				   <div class="namefield">
				    <span class="roomTitle"></span>
				    <div class="form-group">
						<button id="disconnect" class="btn btn-default" type="submit">나가기</button>
					</div>
					</div>
                 </form>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="chat-panel panel panel-default">
						<!-- /.panel-heading -->
						<div class="panel-body">
							<ul class="chat" id="chat">
							</ul>
						</div>
						<!-- /.panel-body -->
						<div class="panel-footer">
							<form class="form">
								<div class="form-group">
									
										<input id="btn-input" type="text"
											class="input-sm" placeholder="메세지를 입력하세요..."
											autocomplete="off"> 
											<button class="btn-warning btn-sm" id="btn-chat"
												type="submit"><i class="fas fa-pen" id="sendBtn"></i></button>
										
								</div>
							</form>
						</div>
						<!-- /.panel-footer -->
					</div>
				</div>
			</div>
		</div>
		<div id="subcontainer">
		  <div class="userZone">
		    <c:forEach var="userlist" items="${userlist}">
		     <a class="user" id="${userlist.userid}" href="http://localhost:3060/developer/page?userid=${userlist.userid}" title="${userlist.nick_name}"><img class="currentUser" src="${userlist.user_image}"></a>
		    </c:forEach>
		   </div>
		    <div id="sendMessage">
			<button class="editorBtn" id="editorBtn">Send</button>
			</div>
			<textarea class="form-control" id="p_content"></textarea>
			<input id="filename" type="hidden" value="${filename}"/>
			<input id="filepath" type="hidden" value="${filepath}"/>  
			<script type="text/javascript">
			var filename = $('#filename').val();
			var filepath = $('#filepath').val();
		
			CKEDITOR.replace('p_content', {
				 height : 650,
				
				 //filebrowserBrowseUrl:"/ability3/chat/fileUpload?"
			});
			</script>
			
		</div>
	</div>
</body>
<script type="text/javascript" src="<c:url value='/js/chat.js' />"></script>
</html>

