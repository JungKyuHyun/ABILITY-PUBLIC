import React,{useState,useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {b1Css,b2Css,btnCss,containerCss,h1Css,tboxCss,tboxInputCss} from '../../static/css/LoginCss';
import {  LOG_IN_REQUEST } from '../../reducers/user';

/**
 * @author 정규현
 * @summary 비동기 rest 로그인 
 * @version 정규현 리덕스 추가 
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const ConnectSpringSignUp = ()=>{
    const screenW = screen.availWidth;  // 스크린 가로사이즈
    const screenH = screen.availHeight; // 스크린 세로사이즈
    const posL=( screenW-430 ) / 2;   // 띄울창의 가로 포지션 
    const posT=( screenH-796 ) / 2;   // 띄울창의 세로 포지션 
    window.open(backUrl+"/signup","ABILITY SIGN UP","width=430, height=796,top="+posT+",left="+posL+", toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no");
};

const ConnectSpringForgotPassword = () =>{
    const screenW = screen.availWidth;  // 스크린 가로사이즈
    const screenH = screen.availHeight; // 스크린 세로사이즈
    const posL=( screenW-430 ) / 2;   // 띄울창의 가로 포지션 
    const posT=( screenH-796 ) / 2;   // 띄울창의 세로 포지션 
    window.open(backUrl+"/login/forgot","ABILITY Forgot Password","width=430, height=796,top="+posT+",left="+posL+", toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no");
}

const isEmpty = (value) =>{
    if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
		return true
	}else{
		return false
	}
};

const isEmail = (email) => {
    const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (pattern.test(email)) return true;
    else return false;
};

const isPassword = (str) => { 
    const pattern1 = /[0-9]/;	
    const pattern2 = /[a-zA-Z]/;
    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/;	
   
    if(!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < 8) {
         return false; 
    }else { 
         return true; 
    }
 };

const isIncludeSpace =(str)=> {
    const pattern = /\s/;
    if (str.match(pattern)) return true;
    else return false;
};


const Login = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [loginErrors, setLoginErrors] = useState('');

    const {isLoggingIn, logInErrorReason} = useSelector(state=>state.user)
    const dispatch = useDispatch();

    const handleChangeEmail = useCallback((e) =>{
        setInputEmail(e.target.value);
        setLoginErrors('');
    },[inputEmail,loginErrors]);

    const handleChangePassword = useCallback((e) =>{
        setInputPassword(e.target.value);
        setLoginErrors('');
    },[inputPassword,loginErrors]);

    const handleSubmit = useCallback((e) =>{
        e.preventDefault();

        if(isEmpty(inputEmail)){
            setLoginErrors('이메일을 입력해 주세요.');
            return;
        }else if(!isEmail(inputEmail)){
            setLoginErrors('올바른 이메일 형식이 아닙니다.');
            return;
        }else if(!isPassword(inputPassword)){
            setLoginErrors("비밀번호 8~20자리, 영문, 숫자, 특수문자 1자리 이상 포함입니다");
            return;
        }else if(isIncludeSpace(inputEmail)){
            setLoginErrors('이메일에는 공백을 포함할 수 없습니다.');
            return;
        }else if(isIncludeSpace(inputPassword)){
            setLoginErrors('비밀번호에는 공백을 포함할 수 없습니다.');
            return;
        }else{
            dispatch({
                type: LOG_IN_REQUEST,
                data:{
                    inputEmail, inputPassword
                }
            });
        }
    },[inputEmail,inputPassword,loginErrors]);
    
      return (
          <>
            <div className='container' style={containerCss}>
            <h1 style={h1Css}><b>ABILITY</b></h1>
                <form>
                    <div className="tbox" style={tboxCss}>
                        <input style={tboxInputCss} type="text" id="login-email" name="inputEmail" maxLength="100" placeholder="Email" value={inputEmail} onChange={handleChangeEmail}/> 
                    </div>
                    <div className="tbox" style={tboxCss}>
                        <input type="password" style={tboxInputCss} id="login-password" name="inputPassword" maxLength="20" placeholder="password" value={inputPassword} onChange={handleChangePassword} /> 
                    </div>
                        {<div style={{color:'red',fontWeight:"bold"}}>{loginErrors}</div>}
                        {<div style={{color:'red',fontWeight:"bold"}}>{logInErrorReason}</div>}
                        <input className="btn" style={btnCss} id="a-login-submit-btn" type="submit" name="button" value="LOG IN" onClick={handleSubmit} disabled={isLoggingIn}/>
                </form>
                <span className="b1" style={b1Css} onClick={ConnectSpringSignUp}>회원가입</span>
                <span className="b2" style={b2Css} onClick={ConnectSpringForgotPassword}>Forgot Password?</span>
            </div>
            </>
      );
  };

export default Login;