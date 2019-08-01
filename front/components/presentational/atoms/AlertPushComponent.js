import React from 'react';

/**
 * @author 정규현
 * @summary 로그인 메인화면 push 알람용 아이콘
 */
const bellCss={
    fontSize:"1.8rem",
    borderRadius:"50%",
    color:"#a29bfe",
    padding:"0.4rem",
    marginRight:"0.4rem"
}

const AlertPushComponent = () =>
    <div style={{verticalAlign: "middle"}}>
        <div style={bellCss}><i className="far fa-bell"></i></div>    
    </div>

export default AlertPushComponent;