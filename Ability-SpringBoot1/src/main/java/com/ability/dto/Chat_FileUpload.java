package com.ability.dto;

import org.springframework.web.multipart.MultipartFile;

public class Chat_FileUpload {
  
	private String attachPath; 

    private String Filename; 
    
    private MultipartFile upload;

    private String CKEditorFuncNum;//CKEditor가 이미지 첨부할때 보내는 데이터
                                    //꼭 대소문자 저렇게 구분해서 줘야 modelAttribute가 인식해서 받아줌 

	public String getAttachPath() {
		return attachPath;
	}

	public void setAttachPath(String attachPath) {
		this.attachPath = attachPath;
	}

	public String getFilename() {
		return Filename;
	}

	public void setFilename(String filename) {
		Filename = filename;
	}

	public MultipartFile getUpload() {
		return upload;
	}

	public void setUpload(MultipartFile upload) {
		this.upload = upload;
	}

	public String getCKEditorFuncNum() {
		return CKEditorFuncNum;
	}

	public void setCKEditorFuncNum(String cKEditorFuncNum) {
		CKEditorFuncNum = cKEditorFuncNum;
	}
    
    
}
