var stompClient = null;
var roomID = $('#roomId').val();
var nick_name = $('#nick_name').val();
var user_image = $('#user_image').val();
var userId = $('#userid').val();
var userlist = $('#userlist').val();

function setConnected(connected) {
	$("#chat").html("");
}

function connect() {
	var socket = new SockJS("http://192.168.1.42:8090/ability3/chat");
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		setConnected(true);

		stompClient.subscribe('/topic/chat/room/' + roomID, function(message) {
			var message = JSON.parse(message.body);
			if (message.hello == "hello") {
				showHello(message);
			} else if (message.deleteUser == "bye") {
				showBye(message);
			} else if (message.refresh == "refresh") {
				showRefresh(message);
			} else {
				showDetail(message);
			}
		});
		sendHello();
	});
}

function disconnect() {
	if (stompClient !== null) {
		stompClient.disconnect();
	}
	setConnected(false);
	console.log("Disconnected");
}

function sendHello() {
	stompClient.send("/ability3/chat/join", {}, JSON.stringify({
		name : nick_name,
		hello : "hello",
		roomId : roomID,
		imgSrc : user_image,
		userid : userId
	}));
}

function sendDetail() {
	stompClient.send("/ability3/chat/message", {}, JSON.stringify({
		name : nick_name,
		contents : $('#btn-input').val(),
		roomId : roomID,
		imgSrc : user_image,
		userid : userId
	}));
}

function sendEditorDetail() {
	stompClient.send("/ability3/chat/message", {}, JSON.stringify({
		name : nick_name,
		contents : returnMessage(),
		roomId : roomID,
		imgSrc : user_image,
		userid : userId
	}));
}

function deleteUserImage() {
	stompClient.send("/ability3/chat/exit", {}, JSON.stringify({
		name : nick_name,
		deleteUser : "bye",
		roomId : roomID,
		imgSrc : user_image,
		userid : userId
	}));
}

function refreshPage() {
	stompClient.send("/ability3/chat/refresh", {}, JSON.stringify({
		name : nick_name,
		refresh : "refresh",
		roomId : roomID,
		imgSrc : user_image,
		userid : userId
	}));
}

function messageTime(sendDate) {
	const now = new Date(sendDate);
	console.log(now);
	let hour = now.toString().substring(16, 18);
	let min = now.toString().substring(19, 21);
	const ampm = hour > 12 ? 'PM' : 'AM';

	if (hour > 12) {
		hour = hour % 12;
	} else if (hour < 10) {
		hour = hour.toString().substring(1, 2);

	}

	const sendTime = `${hour}:${min} ${ampm}`;

	return sendTime;

}

function helloTime(sendDate) {
	const now = new Date(sendDate);
	console.log(now);
	let year = now.toString().substring(11, 15);
	let month = now.toString().substring(4, 7);
	if (month == "Jul") {
		month = 7;
	}
	let numdate = now.toString().substring(8, 10);
	let day = now.toString().substring(0, 3);
	if (day == "Mon") {
		day = "월요일";
	} else if (day == "Tue") {
		day = "화요일";
	} else if (day == "Wed") {
		day = "수요일";
	} else if (day == "Thu") {
		day = "목요일";
	} else if (day == "Fri") {
		day = "금요일";
	} else if (day = "Sat") {
		day = "토요일";
	} else {
		day = "일요일";
	}
	const sendTime = `${month}월 ${numdate}일 ${day}`;

	return sendTime;

}

function showDetail(message) {
	var html = "";
	if (message.name == nick_name) {
		html += '<li class="left clearfix">';
		html += '	<span class="chat-img pull-left">'
		html += '		<img src=' + message.imgSrc + ' class="img-circle">';
		html += '	</span>';
		html += '	<div class="chat-body clearfix">';
		html += '		<div class="header">';
		html += '		<strong class="primary-font">' + message.name + '</strong>';
		html += '<span id="myId">(me)</span>';
		html += '		<small class="text-muted">';
		html += '			' + messageTime(message.sendDate);
		html += '		</small>';
		html += '	</div>';
		html += '	<div class="contents">';
		html += message.contents;
		html += '	</div>';
		html += '	</div>';
		html += '</li>';
	} else {
		html += '<li class="left clearfix">';
		html += '	<span class="chat-img pull-left">'
		html += '			<img src=' + message.imgSrc + ' class="img-circle">';
		html += '	</span>';
		html += '	<div class="chat-body clearfix">';
		html += '		<div class="header">';
		html += '		<strong class="primary-font">' + message.name + '</strong>';
		html += '		<small class="text-muted">';
		html += '			' + messageTime(message.sendDate);
		html += '		</small>';
		html += '	</div>';
		html += '	<div class="contents">';
		html += message.contents;
		html += '	</div>';
		html += '	</div>';
		html += '</li>';
	}

	$(".chat").append(html);
	$('.panel-body').scrollTop($(".chat")[0].scrollHeight);
}

function showHello(message) {
	if (message.name == nick_name) {
		var html = "";
		html += '<li class="left clearfix">';
		html += '	<div class="chat-body clearfix">';
		html += '<div id="hello">';
		html += '	<div class="header enterRoom">';
		html += '		<strong class="primary-font helloFont">' + message.name
				+ '</strong><span> 님이 입장하였습니다.</span><br>';
		html += '' + helloTime(message.sendDate);
		html += '   </div>';
		html += '	</div>';
		html += '	</div>';
		html += '</li>';
		html += '<hr>';
		$(".chat").append(html);
		$('.panel-body').scrollTop($(".chat")[0].scrollHeight);
	} else {
		var html = '';
		html += '<li class="left clearfix">';
		html += '	<div class="chat-body clearfix">';
		html += '<div id="hello">';
		html += '	<div class="header enterRoom">';
		html += '		<strong class="primary-font helloFont">' + message.name
				+ '</strong><span> 님이 입장하였습니다.</span><br>';
		html += '' + helloTime(message.sendDate);
		html += '   </div>';
		html += '	</div>';
		html += '	</div>';
		html += '</li>';
		html += '<hr>';
		$(".chat").append(html);

		var html2 = '';
		html2 = '<a class="user" id=' + message.userid
				+ ' href="http://localhost:3060/developer/page?userid='
				+ message.userid + '" title=' + message.name
				+ '><img class="currentUser" src=' + message.imgSrc + '></a>';

		$('.userZone').append(html2)

		$('.panel-body').scrollTop($(".chat")[0].scrollHeight);

	}
}

function showBye(message) {

	var html = "";
	html += '<li class="left clearfix">';
	html += '	<div class="chat-body clearfix">';
	html += '<div id="hello">';
	html += '	<div class="header enterRoom">';
	html += '		<strong class="primary-font helloFont">' + message.name
			+ '</strong><span> 님이 퇴장하였습니다.</span><br>';
	html += '   </div>';
	html += '	</div>';
	html += '	</div>';
	html += '</li>';
	html += '<hr>';
	$(".chat").append(html);
	$('.panel-body').scrollTop($(".chat")[0].scrollHeight);

	document.getElementById(message.userid).remove();

}

function showRefresh(message) {
	document.getElementById(message.userid).remove();
}

function returnMessage() {
	var message = CKEDITOR.instances.p_content.getData();
	return message;
}

window.onbeforeunload = function() {
	refreshPage();
	baseURL = "http://192.168.1.42:8090/ability3"
	$.ajax({
		url : baseURL + "/chat/deleteuser",
		type : "POST",
		data : "roomID=" + roomID + "&userId=" + userId,
		success : function(response) {
			console.log("유저삭제성공");
			console.log(response);
		}
	})
	disconnect();
}

$(function() {

	connect();

	$("form").on('submit', function(e) {
		e.preventDefault();
	});

	$("#disconnect").click(function() {
		baseURL = "http://192.168.1.42:8090/ability3"
		deleteUserImage();
		$.ajax({
			url : baseURL + "/chat/deleteuser",
			type : "POST",
			data : "roomID=" + roomID + "&userId=" + userId,
			success : function(response) {
				console.log("유저삭제성공");
				console.log(response);
			}
		})
		disconnect();
		// window.location.href = "http://localhost:3000/chat/board";
		window.close();
	});

	$("#btn-chat").click(function() {
		if (!$('#btn-input').val()) {
			$('#btn-input').val('');
		} else {
			sendDetail();
			$('#btn-input').val('');
		}
	});

	$("#editorBtn").click(function() {
		var message = CKEDITOR.instances.p_content.getData();
		if (!message) {
			CKEDITOR.instances.p_content.setData("");
		} else {
			sendEditorDetail();
			CKEDITOR.instances.p_content.setData("");

		}
	});
});