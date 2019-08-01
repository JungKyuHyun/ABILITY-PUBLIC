import React from 'react';
import './css/Button.css';
import {ButtonComponent} from '../atoms/ButtonComponent';
import {NavLink} from 'react-router-dom';

/**
 * @author 정진호
 * @summary Top 영역에 들어가는 로그인/회원가입 버튼
 * @see 정규현 기존 버튼 수정 / 스프링 부트(시큐리티 적용완료)와 로그인 회원가입 연동
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const ConnectSpringSignUp = ()=>{
  window.open(backUrl+"/signup","ABILITY SIGN UP","width=430, height=796,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no");
};

const btnCss = {
  left: "80%",
  top: "0.9rem",
  zIndex: "1",
  position: "absolute",
  width:"11.5625rem",
  height:"auto",
  marginLeft:"0",
  marginRight:"auto",
  padding:"0"
};

const NavLayOut = () =>
<>
  <div className="SighForm" style={btnCss}>
  <NavLink to="/login">
    <ButtonComponent name="로그인" id="Login"/>
  </NavLink>
    <ButtonComponent onclick={ConnectSpringSignUp} name="회원가입" id="Sihgup"/>
  </div>

</>  
export default NavLayOut;