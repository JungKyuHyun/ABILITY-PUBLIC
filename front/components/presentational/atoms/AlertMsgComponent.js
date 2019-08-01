import React from 'react';

/**
 * @author 정규현
 * @summary 로그인 메인화면 쪽지 알람용 아이콘
 */
const msgCss={
    fontSize:"1.8rem",
    borderRadius:"50%",
    color:"#a29bfe",
    padding:"0.4rem",
    marginRight:"0.4rem"
}

const AlertMsgComponent = () =>
    <div style={{verticalAlign: "middle"}}>
        <div style={msgCss}><i className="far fa-envelope"></i></div>    
    </div>

export default AlertMsgComponent;