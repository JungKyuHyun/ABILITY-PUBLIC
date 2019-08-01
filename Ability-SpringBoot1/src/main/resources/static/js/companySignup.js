/**
 * @author 정진호
 * @summary Company 관련 js
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
    const pattern = /[`~!@#$%^&*|\\\'\";:\/?\-]/;
    if (password.match(pattern)) return true;
    else return false;
}
function isIncludeCompanyTelSpecial(company_tel) {
    const pattern = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (company_tel.match(pattern)) return true;
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
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#register_image').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("#register_file").change(function() {
    readURL(this);
});

$(function(){
	$("#signup").click(()=>{
		if(isEmpty($('#company_name').val())||isEmpty($('#userid').val())||isEmpty($('#company_area').val())||isEmpty($('#company_email').val())||isEmpty($('#company_tel').val())||isEmpty($('#manager_tel').val())||isEmpty($('#homepage_url').val())||isEmpty('#register_number').val()){
			alert("입력 사항을 모두 입력해주세요.");
			return false;
		}else if($('#email_check').text()!="확인완료"||$('#register_numbercheck').text()!="확인완료") {
			$('#signup_check').empty();
			$('#signup_check').html("<b style='color:red'> &nbsp;중복 확인을 해주세요.</b>")
			return false;
		}
	}); //signup end
	

	$('#register_number').click(()=>{
		$('#register_number_btn').attr('background','#5F4B8B');
		$('#register_number_btn').html('중복확인');
		$('#register_number_btn').removeAttr('disabled');
		$('#register_numbercheck').empty();
		$('#register_number').val('');
	}); //nick_name click event end
	
	$('#register_number_btn').click(()=>{
var address = "";
		
		var xloc="";
		var yloc="";
		address = document.getElementById('company_area').value;
		console.log(address);
		var geocoder= new google.maps.Geocoder();
		geocoder.geocode({'address':address,'partialmatch':true},googlexy);
		
		function googlexy(result,status){
			if(status=='OK'&&result.length > 0){
				console.log(result[0].geometry.location.lat()," : lat");
				console.log(result[0].geometry.location.lng()," : lng");
				xloc =result[0].geometry.location.lat();
				yloc =result[0].geometry.location.lng();
				$('#xloc').val(xloc);
				$('#yloc').val(yloc);
				console.log("xloc",$('#xloc').val());
				console.log("yloc",$('#yloc').val());
			}else{
				$('#email_btn').attr('background','#c6badf');
				$('#register_file').focus();
			}
		}
		const servicekey = "symAXnWHiNSYqRFu539flclz1pywUJVW%2FcCbpDlUqjvVIrBqauThBgLEMeCGVpolBXhU8C7WWx5tHq4N4ZzNbQ%3D%3D";
		let register_number = $("#register_number").val();
		if(isEmpty(register_number)){
			$('#register_numbercheck').html('<small style="color:red"> &nbsp;사업자 등록번호를 입력해 주세요.</small>');
		}else if(isIncludePasswordSpace(register_number)){
			$('#register_numbercheck').html('<small style="color:red"> &nbsp;공백은 사용할 수 없습니다.</small>');
			$('#register_numbercheck').val('');
		}else{
			$.ajax({
				url:"https://business.api.friday24.com/closedown/"+register_number,
				beforeSend : function(xhr){
					  xhr.setRequestHeader("Content-Type","application/json");
					  xhr.setRequestHeader('Authorization',"Bearer pcNNjoP5NLwxVw13qSoq");
				},
				type:"get",
				success: (data)=>{
					if(data.state === "normal") {
						$('#register_numbercheck').empty();
						$('#register_numbercheck').html('<small style="color:green">&nbsp;확인완료</small>')
					}else{
						$('#register_numbercheck').empty();
						$('#register_numbercheck').html('<small style="color:red">&nbsp;확인실패</small>')
					}
				},
				error: (xhr)=> {
					$('#register_numbercheck').empty();
					$('#register_numbercheck').html('<small style="color:red">&nbsp;올바른 사업자번호가 아닙니다.</small>')
				}
			})
		}
		
	}); // nick_name_btn click event end
	
	$('#company_email').click(()=>{
		$('#email_btn').attr('background','#5F4B8B');
		$('#email_btn').html('중복확인');
		$('#email_btn').removeAttr('disabled');
		$('#email_check').empty();
		$('#company_email').val('');
	}); //email click event end
	
	
	$("#email_btn").click(()=>{
		let email = $("#company_email").val();
		if(isEmpty(email)){
			$('#email_check').html('<small style="color:red"> &nbsp;이메일을 입력해 주세요.</small>');
		}else if(!isEmail(email)){
			$('#email_check').html('<small style="color:red"> &nbsp;올바른 이메일 형식이 아닙니다.</small>');
		}else{
			$.ajax({
				url:"ajax/companyemail",
				dataType:"html",
				type:"GET",
				data:{
					company_email:email
				},
				success: (data)=>{
					if(data=="true"){
						$('#email_check').html('<small style="color:red"> &nbsp;이미 존재하는 이메일 입니다.</small>');
						$('#company_email').focus();
					}else{
						$('#email_check').html('<small style="color:green"> &nbsp;사용할 수 있는 이메일 입니다.</small>');
						$('#email_btn').attr('disabled',true);
						$('#email_btn').empty();
						$('#email_btn').html('<b>확인완료</b>');
						$('#email_btn').attr('background','#c6badf');
						$('#company_tel').focus();
					}
				}
				
			})
		}
	}); // email_btn click event end
	$('#register_number').keyup(()=>{
		if(isIncludePasswordSpecial($('#register_number').val())){
			$('#register_numbercheck').empty();
			$('#register_numbercheck').html('<small style="color:red"> &nbsp;\"-\"는 생략해주세요</small>');
		}
	});
	
	
	$('#company_tel').keyup(()=>{
		if(isIncludeCompanyTelSpecial($('#company_tel').val())){
			$('#company_tel_numbercheck').empty();
			$('#company_tel_numbercheck').html('<small style="color:red"> &nbsp;올바르지 않는 형식입니다.</small>');
		}
	});
/*	$('#password, #repassword').keyup(()=>{
		if($('#password').val().length<8){
			$('#password_check').empty();
			$('#password_recheck').empty();
			$('#password_check').html('<small> &nbsp;영문, 숫자, 특수문자 포함 8~20자리 입력</small>')
		
		}else if(!isIncludeEnglish($('#password').val())){
			$('#password_check').empty();
			$('#password_check').html('<small style="color:red"> &nbsp;영문자를 포함해 주세요</small>');

		}else if(!isIncludePasswordSpecial($('#password').val())){
			$('#password_check').empty();
			$('#password_check').html('<small style="color:red"> &nbsp;특수문자를 포함해 주세요</small>');
			
		}else if(!isIncludeNumber($('#password').val())){
			$('#password_check').empty();
			$('#password_check').html('<small style="color:red"> &nbsp;숫자를 포함해 주세요</small>');
			
		}else if($('#password').val() != $('#repassword').val()){
			$('#password_check').empty();
			$('#password_recheck').html('<small style="color:red"> &nbsp;비밀번호 불일치</small>');
		
		}else{
			$('#password_recheck').html('<small style="color:green"> &nbsp;비밀번호 일치</small>');
		}
			
	});*/	
	
	
})