/**
 * @author 정규현
 * @summary 비밀번호 찾기 로직 구현
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
};


function isIncludeSpace(str) {
    const pattern = /\s/;
    if (str.match(pattern)) return true;
    else return false;
};

const closeWindow = ()=>{
	setTimeout(window.close(),10000);
};

const successComplete = ()=>{
	swal({
		title:"입력하신 이메일로 임시비밀번호가 발급되었습니다.",
		icon:"success",
		className:"swal-hover"
	});
};

async function successHandler(){
	await successComplete();
	await closeWindow();
}


$(function(){
	$("#a-find-submit-btn").click(()=>{
		if(isEmpty($('#find-name').val())||isEmpty($('#find-email').val())){
			swal({
				title:"모든 값을 입력해 주세요.",
				icon:"warning",
				className:"swal-hover"
			});
			return false;
		}else if(isIncludeSpace($('#find-email').val())) {
			$('#a-find-submit').empty();
			$('#a-find-submit').html("<p style='color:red'>이메일에는 공백을 포함할 수 없습니다</p>")
			return false;
		}else if(isIncludeSpace($('#find-name').val())) {
			$('#a-find-submit').empty();
			$('#a-find-submit').html("<p style='color:red'>이름에는 공백을 포함할 수 없습니다</p>")
			return false;
		}else if(!isEmail($('#find-email').val())){
			$('#a-find-submit').empty();
			$('#a-find-submit').html("<p style='color:red'>이메일 형식을 확인해 주세요</p>");
			return false;
		}else{
			const csrf = $('#find-csrf').val();
			console.log(csrf);
			$.ajax({
				url:"user/find",
				dataType:"html",
				type:"POST",
				data:{
					email:$('#find-email').val(),
					name:$('#find-name').val()
				},
				beforeSend : function(xhr) {
					$('#a-find-submit').empty();
					$('#a-find-submit').html("<p style='color:green'>확인중...잠시만 기달려 주세요.</p>");
					$('a-find-submit-btn').attr('disabled',true);
					
					 xhr.setRequestHeader('X-CSRF-Token', csrf);
				},
				success: (data)=>{
					if(data==="false"){
						$('a-find-submit-btn').removeAttr('disabled');
						$('#a-find-submit').empty();
						$('#a-find-submit').html("<p style='color:red'>일치하는 회원정보가 없습니다.</p>");
						return false;
					}else{
						successHandler();
					}
				}
			})
		}
	}); //a-find-submit-btn End

	
	
	
})