import React from 'react';
import { Jumbotron, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faUsers, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


/**
 * @author 신선하
 * @summary admin 회색 통계박스
 * @see 정규현 반응형으로 리펙토링 
 */

const css={
    padding: "15px 0",  
    position: 'relative',
    color: '#212529',
    padding: '1rem',
    marginRight: '0',
    marginLeft: '0',
    borderRadius: '8px',
    backgroundColor:'white'
}

const post={
    backgroundColor:"white",
    width:"95%",
    height:"105px",
    color:"#5F4B8B",
    display:"grid",
    gridTemplateColumns:"40% 60%",
    borderRadius:"6px",
    border:"1px solid #5F4B8B",
    margin:"auto"
}

const postIcon_div={
  marginLeft:"30px",
  fontSize:"45px",
  marginTop:"15px"

}

const post_content={
  
  fontFamily:"sans-serif",
  fontWeight:"bold",
  margin:"auto"

}

const AdminBox = (props) => {
    return (
        <Jumbotron fluid style={css}>
          <Container>
              <Row>
                <Col sm={12} md={4} style={top_css}>
                <div style={post}>
                 <div style={postIcon_div}>
                <FontAwesomeIcon icon={faClipboardList} style={{width:"45px"}}/>
                </div>
                <div style={post_content}>
                총 게시물 : {props.total+props.jobcount}<br/>
                질문 게시판 : {props.question}<br/>
                프로젝트 게시판 : {props.project}<br/>
                자유 게시판:{props.freeboard}<br/>
                구인 구직:{props.jobcount}
                </div>
                </div>
                </Col>
                <Col sm={12} md={4}>
                <div style={post}>
                 <div style={postIcon_div}>
                <FontAwesomeIcon icon={faUsers} style={{width:"45px"}}/>
                </div>
                <div style={post_content}>
                총 유저수 : {props.totaluser}<br></br>
                금일 신규회원 수 : {props.newuser}<br></br>
                탈퇴회원 수 : {props.outuser}<br></br>
                </div>
                </div>
                </Col>
                <Col sm={12} md={4}>
                <div style={post}>
                 <div style={postIcon_div}>
                <FontAwesomeIcon icon={faTrashAlt} style={{width:"45px"}}/>
                </div>
                <div style={post_content}>
                삭제된 게시물 : {props.delete}<br></br>
                미답변 게시물 : {props.noanswer}<br></br>
                </div>
                </div>
                </Col>
              </Row>            
              
          </Container>
        </Jumbotron>
    );
};

export default AdminBox;