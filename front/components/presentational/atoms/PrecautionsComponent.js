import React from 'react';

/**
 * 
 * @author 곽호원
 * @summary 구인공고 등록시 주의사항 컴포넌트 
 */

const icon= {
    tdor : "red"
}

const descriptioncss = {
    
    padding : "10px",
    borderRadius : "10px",
    backgroundColor : "#f7f7f7"
}
export const PrecautionsComponent = (props) => 
    <div style={descriptioncss}> 
      {props.description}
        2017년 7월 13일부터는 회사 정보 등록 및 인증을 받은 회원만 구인 게시판에 등록이 가능합니다.<br />
        (7/13 이전까지는 '건너뛰기'로 회사 정보 등록 없이 작성 가능)<br />
        별도의 인증 절차가 필요하오니 구인 게시판을 이용하실 기업 회원분들은 사전에 등록 및 인증을 받으시기를 바랍니다.  <br /><br />

        구인 게시판을 이용하시는 모든 회원분들께 보다 많은 혜택과 서비스를 제공하기 위함이니 적극적으로 협조해 주시면 고맙겠습니다.<br /><br />

        <span style={icon}>*</span> 항목은 필수 입력 입니다.<br />
      </div>