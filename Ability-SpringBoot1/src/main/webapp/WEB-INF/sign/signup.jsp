<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link rel="shortcut icon" href="<c:url value="/image/favicon.ico" />" />
<title>ABILITY SIGN UP</title>
<!-- dependency -->
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous">
<link
	href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap"
	rel="stylesheet">
<link href="<c:url value="/css/signup.css" />" rel="stylesheet">
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</head>
<body>

<form action="user/signupok" method="post">
<div class="signup-form">
	<h1><b>ABILITY</b>&nbsp;<small>회원가입</small></h1>
	<div class="txtb">
		<label>이름 :</label>
		<input type="text" name="name" id="name" maxlength="20" placeholder="Enter Your Full-Name">
	</div>
	
	<div class="txtb">
		<div class="row">
		<div class="col-9">
			<label>닉네임 :<span id="nick_name_check"></span></label>
			<input type="text" name="nick_name" id="nick_name" maxlength="10" placeholder="Enter Your Display-Name">
			
		</div>
		<div class="col-3">
			<button type="button" id="nick_name_btn" class="btn btn-sm">중복확인</button>
		</div>	
		</div>
	
	</div>
	<div class="txtb">
		<label>지역 :</label>
		<input type="text" name="area" id="area" list="search-email" maxlength="50" placeholder="Enter Your Location">
			<datalist id="search-email">
				
			</datalist>
	</div>
	
	<div class="txtb">
		<div class="row">
		<div class="col-9">
		<label>이메일 :<span id="email_check"></span></label>
		<input type="email" name="email" id="email" maxlength="100" placeholder="Enter Your Email">
		</div>
		<div class="col-3">
			<button type="button" id="email_btn" class="btn btn-sm">중복확인</button>
		</div>	
		</div>
	</div>
	
	<div class="txtb">
		<label>비밀번호 :<span id="password_check"></span></label>
		<input type="password" name="password" id="password" maxlength="20" placeholder="Enter Your Password">
	</div>
	
	<div class="txtb">
		<label>비밀번호 확인 :<span id="password_recheck"></span></label>
		<input type="password" name="repassword" id="repassword" maxlength="30" placeholder="Re-Enter Password">
	</div>
	<hr/>
	<span id="signup_check">&nbsp;</span>
	<input name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}">
	<button type="submit" name="signup" id="signup" class="btn btn-secondary btn-sm">회원가입</button>
</div>
</form>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=?&libraries=places&callback=initMap"></script>
    <script>
    function init() {
        var options = {
		types: ['(cities)']
	};
        
	var input = document.getElementById('area');
	var autocomplete = new google.maps.places.Autocomplete(input, options);
}
    google.maps.event.addDomListener(window, 'load', init);
    </script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

	<script type="text/javascript" src="<c:url value="/js/signup.js" />"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
		integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
		crossorigin="anonymous"></script>
	<script
		src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
		integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
		crossorigin="anonymous"></script>
</body>
</html>