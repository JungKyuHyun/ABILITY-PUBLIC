/**
 * @author 정규현
 * @summary 로그인 로직 구현
 */

let isEmpty = (value)=> {
	if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
		return true
	}else{
		return false
	}
};

function isEmail(email) {
    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (pattern.test(email)) return true;
    else return false;
}

function isPassword(password) {
    const pattern = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;
    if (pattern.test(password)) return true;
    else return false;
}

function isIncludeSpace(str) {
    const pattern = /\s/;
    if (str.match(pattern)) return true;
    else return false;
}

$(function(){
	$("#a-login-submit-btn").click(()=>{
		if(isEmpty($('#login-email').val())||isEmpty($('#login-password').val())){
			swal({
				title:"모든 값을 입력해 주세요.",
				icon:"warning",
				className:"swal-hover"
			});
			return false;
		}else if(isIncludeSpace($('#login-email').val())) {
			$('#a-login-submit').empty();
			$('#a-login-submit').html("<p style='color:red'>이메일에는 공백을 포함할 수 없습니다</p>")
			return false;
		}else if(!isEmail($('#login-email').val())){
			$('#a-login-submit').empty();
			$('#a-login-submit').html("<p style='color:red'>이메일 형식을 확인해 주세요</p>");
			return false;
		}else if(!isPassword($('#login-password').val())){
			$('#a-login-submit').empty();
			$('#a-login-submit').html("<p style='color:red'>비밀번호 8~20자리</p><p style='color:red'>영문, 숫자, 특수문자 1자리 이상 포함입니다</p>");
			return false;
		}
	}); //a-login-submit-btn End

	
	
	
})