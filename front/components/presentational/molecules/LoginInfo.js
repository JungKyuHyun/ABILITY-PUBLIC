import React from 'react';
import {UserImageComponent2} from '../atoms/UserImageComponent';
import link from 'next/link';
import {Badge} from 'react-bootstrap';

import {badgeCss1,badgeCss2,divCss1,divCss2,imageCss,spanCss} from './css/LoginInfoCss';

/**
 * @author 정규현
 * @summary 로그인 성공시 나타날 상단바 메뉴 
 */


const LoginInfo = (props)=>
 <>
 <div className="row" style={props.style}>
 
    <div style={divCss1}>
        <UserImageComponent2 imagepath={localStorage.getItem('user_image')} css={imageCss}/>
    </div>
    <div style={divCss2}>
        <span style={spanCss}>{localStorage.getItem('nick_name')}<small>&nbsp;님</small></span>
        <span style={spanCss}> 
            <link href="/UserDetail">
                <Badge variant="primary" style={badgeCss1}>개인정보 수정</Badge>
            </link>
            <link to="/logout">
                <Badge variant="secondary" style={badgeCss2}>로그아웃</Badge>
            </link>
        </span>
    </div>

</div>
</>

 export default LoginInfo;