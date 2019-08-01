import React from 'react';
import {Row, Col,Table, Container} from 'react-bootstrap';


/**
 * 
 * @auth 곽호원
 * @summary 구인공고 상세페이지 회사 소개하는 컴포넌트
 * 
 */
const hirecss = {
    textAlign : "right",
    fontSize : "1em",
    paddingBottom :"10px"
}

const jobWritecss = {
    fontSize : "1em",
    borderTop: "1px solid #e2e2e2",
    paddingTop :"20px",
    paddingBottom :"0.7rem"
}

const tablecss = {
    border : "none"
}
const HireTable = (props) => {
  function date(str){
    let dates = str.substr(0,11);
    return dates;
  }

  function autoHypenPhone(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if( str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else if(str.length < 11){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 3);
        tmp += '-';
        tmp += str.substr(6);
        return tmp;
    }else{              
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 4);
        tmp += '-';
        tmp += str.substr(7);
        return tmp;
    }
    return str;
}
    return (
      <Container>
        <Row>
          <Col style={{textAlign:"right",paddingBottom :"0.7rem", fontSize:"0.8rem"}}>
            공고 시작일 : {date(props.hireStartDate)}~
            <br/>
            공고 마감일 : {props.hireEndDate}
          </Col>
        </Row>
        <Row style={jobWritecss}>
          <Col style={{borderRight:"1px solid #e2e2e2"}}><span style={{}}>직업유형</span> : {props.jobType} </Col>
          <Col><span style={{}}>회사 규모</span> : {props.comScale} </Col>
        </Row>
        <Row style={jobWritecss}>
            <Col style={{borderRight:"1px solid #e2e2e2"}}><span style={{}}>근무 부서</span> : {props.jobdept}</Col>
            <Col><span style={{}}>도메인</span> : {props.domain}</Col>
        </Row>
        <Row style={jobWritecss}>
            <Col style={{borderRight:"1px solid #e2e2e2"}}><span style={{}}>근무시간</span> : {props.jobTime}</Col>
            <Col><span style={{}}>경력 수준 : {props.career}</span></Col>
        </Row>
        <Row style={jobWritecss}>
            <Col style={{borderRight:"1px solid #e2e2e2"}}><span style={{}}>담당자 연락처</span> : {autoHypenPhone(props.phone)}</Col>
            <Col><span style={{}}>담당자 이메일</span> : {props.email}</Col>
        </Row>

    </Container>
    );
};

export default HireTable;