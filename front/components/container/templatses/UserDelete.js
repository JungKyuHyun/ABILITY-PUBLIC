import React ,{Component}from 'react';
import { InputTextBox} from '../../presentational/atoms/InputboxComponent';
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';

/**
 * @author 우세림
 * @summary 개발자들 회원탈퇴
 */

const user_mod_input_css ={
    height: "35px"
}

class UserModify extends Component { 
    render(){

        return (
            <>
                <h5 className="user_add_title">
                    회원탈퇴
                </h5>

                <div className="user_del">
                    <div className="user_md_profile_div">
                        <span className="user_md_profile_span">비밀번호</span>
                        <InputTextBox css={user_mod_input_css} type="password"/>
                    </div>
                    <div className="user_md_profile_div">
                        <span className="user_md_profile_span">비밀번호 확인</span>
                        <InputTextBox css={user_mod_input_css} type="password"/>
                    </div>
                </div>

                <div className="user_md_btn">
                    <ButtonComponent name="취소" /> &nbsp;&nbsp;
                    <ButtonComponent name="탈퇴하기" />
                </div>
            </>
        );
    }
}


export default UserModify;