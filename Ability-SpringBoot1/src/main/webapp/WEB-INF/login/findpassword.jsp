<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<%-- <meta id="_csrf" name="_csrf" th:content="${_csrf.token}"/>
<meta id="_csrf_header" name="_csrf_header" th:content="${_csrf.headerName}"/> --%>

<link rel="shortcut icon" href="<c:url value="/image/favicon.ico" />" />
<title>ABILITY Forgot Password</title>
<!-- dependency -->
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous">
<link
	href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap"
	rel="stylesheet">
<link href="<c:url value="/css/findpassword.css" />" rel="stylesheet">
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

</head>
<body>

		
<div class="container">
	
	<h1><b>ABILITY</b></h1>
	<h6>비밀번호 찾기</h6>
	
		<div class="tbox">
			<input type="text" id="find-name" name="name" maxlength="20" placeholder="이름"> 
		</div>
		<div class="tbox">
			<input type="text" id="find-email" name="email" maxlength="100" placeholder="이메일"> 
		</div>
		<input id="find-csrf" name="${_csrf.parameterName}" type="hidden" value="${_csrf.token}">
		<span id='a-find-submit'>&nbsp;</span>
		<input class="btn" id="a-find-submit-btn" type="submit" name="submit" value="이메일로 임시 비밀번호 받기">
	
	<a class="b1" href="/ability3/signup">회원가입</a>
	<!-- <a class="b2" href="/ability3/user/login">로그인하러 가기</a> -->
	
</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script type="text/javascript" src="<c:url value="/js/findpassword.js" />"></script>
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