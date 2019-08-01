/**
 * @author jkh
 * @summary 회원 관련 로직 구현
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

function isIncludePasswordSpace(password) {
    const pattern = /\s/;
    if (password.match(pattern)) return true;
    else return false;
}

function isIncludePasswordSpecial(password) {
    const pattern = /[`~!@#$%^&*|\\\'\";:\/?]/;
    if (password.match(pattern)) return true;
    else return false;
}

function isIncludeEnglish(str) {
    const pattern = /[a-zA-Z]/;
    if (str.match(pattern)) return true;
    else return false;
}

function isIncludeNumber(str) {
    const pattern = /[0-9]/;
    if (str.match(pattern)) return true;
    else return false;
}

function isIncludeKorean(str) {
    const pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (str.match(pattern)) return true;
    else return false;
}

const closeWindow = ()=>{
	window.close();
}

$(function(){
	$("#signup").click(()=>{
		if(isEmpty($('#name').val())||isEmpty($('#nick_name').val())||isEmpty($('#area').val())||isEmpty($('#email').val())||isEmpty($('#password').val())||isEmpty($('#repassword').val())){
			swal({
				title:"모든 값을 입력해 주세요.",
				icon:"warning",
				className:"swal-hover"
			});
			return false;
		}else if($('#nick_name_btn').text()!="확인완료" || $('#email_btn').text()!="확인완료") {
			$('#signup_check').empty();
			$('#signup_check').html("<b style='color:red'> &nbsp;중복 확인을 해주세요.</b>")
			return false;
		}else if($('#password_recheck').text().trim()!="비밀번호 일치"){
			$('#signup_check').empty();
			$('#signup_check').html("<b style='color:red'> &nbsp;비밀번호 일치 여부 확인을 해주세요.</b>");
			return false;
		}else{
			const email = $('#email').val();
			swal({
				title:email,
				text:"이메일 주소로 인증번호가 발송되었습니다. 24시간 동안만 유효한 인증번호이며, 24시간 경과시 회원가입 이력은 삭제됩니다.",
				icon:"success",
			}).then((bntValue)=>{
				window.close();
			})
		}
	}); //signup end
	
	$('#nick_name').click(()=>{
		$('#nick_name_btn').attr('background','#5F4B8B');
		$('#nick_name_btn').html('중복확인');
		$('#nick_name_btn').removeAttr('disabled');
		$('#nick_name_check').empty();
		$('#nick_name').val('');
	}); //nick_name click event end
	
	$('#nick_name_btn').click(()=>{
		let nick_name = $("#nick_name").val();
		if(isEmpty(nick_name)){
			$('#nick_name_check').html('<b style="color:red"> &nbsp;닉네임을 입력해 주세요.</b>');
		}else if(isIncludePasswordSpace(nick_name)){
			$('#nick_name_check').html('<b style="color:red"> &nbsp;공백은 사용할 수 없습니다.</b>');
			$('#nick_name').val('');
		}else{
			$.ajax({
				url:"user/ajax/nick",
				dataType:"html",
				type:"GET",
				data:{
					nickname:nick_name
				},
				success: (data)=>{
					if(data=="true"){
						$('#nick_name_check').html('<b style="color:red"> &nbsp;이미 존재하는 닉네임 입니다.</b>');
						$('#nick_name').focus();
					}else{
						$('#nick_name_check').html('<b style="color:green"> &nbsp;사용할 수 있는 닉네임 입니다.</b>');
						$('#nick_name_btn').attr('disabled',true);
						$('#nick_name_btn').empty();
						$('#nick_name_btn').html('<b>확인완료</b>');
						$('#nick_name_btn').attr('background','#c6badf');
						$('#area').focus();
					}
				}
			})
		}
		
	}); // nick_name_btn click event end
	
	$('#email').click(()=>{
		$('#email_btn').attr('background','#5F4B8B');
		$('#email_btn').html('중복확인');
		$('#email_btn').removeAttr('disabled');
		$('#email_check').empty();
		$('#email').val('');
	}); //email click event end
	
	
	$("#email_btn").click(()=>{
		let email = $("#email").val();
		if(isEmpty(email)){
			$('#email_check').html('<b style="color:red"> &nbsp;이메일을 입력해 주세요.</b>');
		}else if(!isEmail(email)){
			$('#email_check').html('<b style="color:red"> &nbsp;옳바른 이메일 형식이 아닙니다.</b>');
		}else{
			$.ajax({
				url:"user/ajax/email",
				dataType:"html",
				type:"GET",
				data:{
					email:email
				},
				success: (data)=>{
					if(data=="true"){
						$('#email_check').html('<b style="color:red"> &nbsp;이미 존재하는 이메일 입니다.</b>');
						$('#email').focus();
					}else{
						$('#email_check').html('<b style="color:green"> &nbsp;사용할 수 있는 이메일 입니다.</b>');
						$('#email_btn').attr('disabled',true);
						$('#email_btn').empty();
						$('#email_btn').html('<b>확인완료</b>');
						$('#email_btn').attr('background','#c6badf');
						$('#password').focus();
					}
				}
				
			})
		}
	}); // email_btn click event end
	
	
	
	$('#password, #repassword').keyup(()=>{
		if($('#password').val().length<8){
			$('#password_check').empty();
			$('#password_recheck').empty();
			$('#password_check').html('<b> &nbsp;영문, 숫자, 특수문자 포함 8~20자리 입력</b>')
		
		}else if(!isIncludeEnglish($('#password').val())){
			$('#password_check').empty();
			$('#password_check').html('<b style="color:red"> &nbsp;영문자를 포함해 주세요</b>');

		}else if(!isIncludePasswordSpecial($('#password').val())){
			$('#password_check').empty();
			$('#password_check').html('<b style="color:red"> &nbsp;특수문자를 포함해 주세요</b>');
			
		}else if(!isIncludeNumber($('#password').val())){
			$('#password_check').empty();
			$('#password_check').html('<b style="color:red"> &nbsp;숫자를 포함해 주세요</b>');
			
		}else if($('#password').val() != $('#repassword').val()){
			$('#password_check').empty();
			$('#password_recheck').html('<b style="color:red"> &nbsp;비밀번호 불일치</b>');
		
		}else{
			$('#password_recheck').html('<b style="color:green"> &nbsp;비밀번호 일치</b>');
		}
			
	}); //#password confirm event end
	
	
	
})