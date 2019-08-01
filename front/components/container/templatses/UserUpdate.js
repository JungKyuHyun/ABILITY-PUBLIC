import React ,{Component}from 'react';
import { UserImageComponent } from '../../presentational/atoms/UserImageComponent';
import { InputTextBox, InputTextBoxReadonly, InputTextarea } from '../../presentational/atoms/InputboxComponent';
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';
import CkeditorOne from '../../presentational/atoms/CkeditorOne';

/**
 * @author 우세림
 * @summary 개발자들 정보수정
 */

const user_mod_input_css ={
    height: "35px",
    width: "100%"
}

const user_mod_input_css2 ={
    height: "35px",
    width: "85%",
    marginRight: "10px"
}

const user_mod_input_css3 ={
    height: "35px",
    width: "45%"
}

const user_md_img_btn ={
    width: "100%",
    marginTop: "15px"
}

const user_btn = {
    height: "35px",
}

class UserUpdate extends Component { 
    render(){

        return (
            <>
                <div className="user_md">
                    <div className="user_image">
                        <UserImageComponent/>
                        <ButtonComponent css={user_md_img_btn} name="이미지 변경" />
                    </div>
                    
                    <div className="user_md_profile">
                        <div className="user_md_profile_div">
                            <span className="user_md_profile_span">이름</span>
                            <InputTextBoxReadonly formcss={user_mod_input_css} placeholder="이름" />
                        </div>
                        <div className="user_md_profile_div">
                            <span className="user_md_profile_span">닉네임</span>
                            <InputTextBox formcss={user_mod_input_css2} placeholder="닉네임"/>
                            <ButtonComponent css={user_btn} name="중복확인" />
                        </div>
                        <div className="user_md_profile_div">
                            <span className="user_md_profile_span">이메일</span>
                            <InputTextBox formcss={user_mod_input_css2} placeholder="이메일"/>
                            <ButtonComponent css={user_btn} name="중복확인" />
                        </div>
                        <div className="user_md_profile_div">
                            <span className="user_md_profile_span">전화번호</span>
                            <InputTextBox formcss={user_mod_input_css3} placeholder="전화번호"/>
                            <span className="user_md_profile_span2">위치</span>
                            <InputTextBox formcss={user_mod_input_css3} placeholder="위치"/>
                        </div>
                        <div className="user_md_profile_div">
                            <span className="user_md_profile_span">태그</span>
                            <InputTextarea row="3" formcss={user_mod_input_css} placeholder="태그, 태그"/>
                        </div>
                    </div> 
                </div>

                <div>
                    <span className="user_md_profile_span2">소개</span>
                    <hr/>
                    <CkeditorOne />
                </div>

                <div className="user_md_btn">
                    <ButtonComponent name="취소" /> &nbsp;&nbsp;
                    <ButtonComponent name="확인" />
                </div>
            </>
        );
    }
}


export default UserUpdate;