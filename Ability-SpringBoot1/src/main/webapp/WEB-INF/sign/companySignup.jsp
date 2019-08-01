<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta
	content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
	name="viewport" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link rel="shortcut icon" href="<c:url value="/image/favicon.ico" />" />
<title>ABILITY</title>
<!-- dependency -->
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous">
<link
	href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap"
	rel="stylesheet">
<link href="<c:url value="/css/companySignup.css" />" rel="stylesheet">

<script>
	console.log(typeof(${userid}),"찍혔다 이거");
</script>
</head>
<body>
	<div class="container-flude">
		<nav class="navbar navbar-light bg-light">
			<div class="" style="text-align: center">
				<a class="navbar-brand" href="#"> <img
					src="<c:url value="/image/ability-logo.png" />" alt="ABILIY">
				</a>
			</div>
		</nav>
	</div>

	<form method="post" enctype="multipart/form-data">
		<div class="signup-form">
			<h1>
				<b>ABILITY</b>&nbsp;<small>기업 등록</small>
			</h1>

			<div class="txtwapper">

				<div class="txtb">
					<label>회사명 &nbsp;&nbsp;<b style="font-size: 10px;">정확히
							기재해 주세요.</b></label> <input type="text" name="company_name" id="company_name"
						placeholder="Enter Company Name">


				</div>

				<div class="txtb">
					<label>등록 번호</label> <input type="text" name="userid" id="userid"
						readonly="readonly" value="${userid}">

					<!-- 	<div class="col-3">
			<button type="button" id="nick_name_btn" class="btn btn-sm">중복확인</button>
		</div>	 -->

				</div>
				<div class="txtb">
					<div class="row">
						<div class="col-12">
							<label>회사 주소<span><small><b> 정확히 기재해 주세요.</b></small></span></label> <input type="text" name="company_area"
								id="company_area" placeholder="Enter Company Location">
						</div>
					</div>
				</div>

				<div class="txtb">
					<div class="row">
						<div class="col-9">
							<label>회사 이메일<span id="email_check"></span></label> <input
								type="email" name="company_email" id="company_email"
								maxlength="100" placeholder="Enter Company Email">
						</div>
						<div class="col-3">
							<button type="button" id="email_btn" class="btn btn-sm">중복확인</button>
						</div>
					</div>
				</div>

				<div class="txtb">
					<label>대표 번호<span id="company_tel_numbercheck"></span></label> <input type="text" name="company_tel"
						id="company_tel" placeholder="Enter Company Tel">
				</div>

				<div class="txtb">
					<label>담당자 번호</label> <input type="tel" name="manager_tel"
						id="manager_tel" placeholder="Enter Manager Tel">
				</div>
				<!-- 	<div class="txtb">
		<div class="row">
			<div class="col-9">
			<label>회사 로고</label>
			<label class="upload" for="logo">업로드</label>
			<input type="file" name="files" id="logo">
		</div>
		<div class="col-3">
			<img src="" id="logo_image" class="logo_image" alt="로고이미지"></img>
		</div>	
		</div>
	</div> -->
				<div class="txtb">
					<label>회사 도메인</label> <input type="text" name="homepage_url"
						id="homepage_url" placeholder="Enter Company Url">
				</div>
				<div class="txtb">
					<div class="row">
						<div class="col-9">
							<label>사업자 등록번호<span id="register_numbercheck"></span></label> <input
								type="text" name="register_number" id="register_number"
								placeholder="Enter Company Register_Number">
						</div>
						<div class="col-3">
							<button type="button" id="register_number_btn" class="btn btn-sm">중복확인</button>
						</div>
					</div>
				</div>
			</div>
			<div class="txtb">
				<div class="row">
					<div class="col-9">
						<label>사업자 등록증</label> <label class="upload" for="register_file">업로드</label>
						<input type="file" id="register_file" name="files">
					</div>
				</div>
				<div class="row">
					<img src="https://ability-email.s3.amazonaws.com/favicon-128.png"
						id="register_image" class="register_image" alt="image"/>
				</div>
			</div>
				<input type="hidden" id="xloc" name="xloc" value="">
				<input type="hidden" id="yloc" name="yloc" value="">
			<hr />
			<span id="signup_check"></span> <input name="${_csrf.parameterName}"
				type="hidden" value="${_csrf.token}">
			<button type="submit" name="signup" id="signup"
				class="btn btn-secondary btn-sm">등록하기</button>

		</div>
	</form>

	<script type="text/javascript"
		src="https://maps.googleapis.com/maps/api/js?key=?&libraries=places&callback=initMap"></script>
	<script>
		function init() {
			var input = document.getElementById('company_area');
			var autocomplete = new google.maps.places.Autocomplete(input);
			
			console.log(autocomplete,"<<<<<<");
		}

		google.maps.event.addDomListener(window, 'load', init);
	</script>

	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

	<script type="text/javascript"
		src="<c:url value="/js/companySignup.js" />"></script>
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