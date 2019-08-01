import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSitemap,faCrown ,faQuestionCircle, faComments,faIdBadge } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Badge, Col } from 'react-bootstrap';

/**
 * @autho 정진호
 * @summary 능력치 제도 안내페이지
 */

const h3_css={
    color:"#5F4B8B",
    fontFamily:"sans-serif",
    fontWeight:"bold",
    marginLeft:"10px",
    marginBottom:"30px",
    fontSize:"28px"
}
const title={
    marginBottom:"60px",
    marginLeft:"20px",
    marginTop:"30px"
}
const icon ={
    width:"40px",
    height:"40px",
    color:"#5F4B8B",
   paddingBottom:0,
   paddingTop:"10px"
}
const icon2 ={
    width:"30px",
    height:"30px",
    color:"#5F4B8B",
   paddingBottom:0,
   paddingTop:"5px"
}
const p = {
    marginTop:"3px",
    marginBottom:"5px",

    fontWeight:"bold"
}
const reputation = () => {
    return (
        <>
         <div style={title}>
           <FontAwesomeIcon icon={faSitemap} style={icon}/>
          <span style={h3_css}>능력치 제도</span>
        </div>
            <Container style={{border :"1px solid #5f4b8b",height:"400px",borderRadius:"10px",borderBottom:"1px solid #5f4b8b",width:"90%"}}>
                <Row style={{height:"25%",justifyContent:"center",paddingBottom :"5px",borderBottom:"1px solid #5f4b8b"}}>
                    <div style={{textAlign:"center"}}>
                        <FontAwesomeIcon icon={faCrown} style={icon}/>
                        <br/>
                        <span style={{color : "#5f4b8b"}}><b>ABILITY</b></span><br/>
                        <Badge variant="light" style={{width :"60px",height:"20px",fontSize:"12px",backgroundColor :"#cd6133"}}>능력치 20</Badge>
                    </div>
                </Row>
                <Row style={{height:"25%",justifyContent:"center"}}>
                    <Col xs={6} style={{textAlign:"center",borderBottom:"1px solid #5f4b8b",borderRight:"1px solid #5f4b8b",paddingTop :"5px"}}>
                        <div>
                            <FontAwesomeIcon icon={faQuestionCircle} style={icon2}/> <br/>
                            <span style={{color : "#5f4b8b"}}><b>질의응답 답변 기준</b></span><br/>
                            <Badge variant="light" style={{width :"60px",height:"20px",fontSize:"12px",backgroundColor :"#cd6133"}}>능력치 20</Badge>
                        </div>
                    </Col>
                    <Col xs={6} style={{textAlign:"center",borderBottom:"1px solid #5f4b8b",paddingTop :"5px"}}>
                        <div>
                            <FontAwesomeIcon icon={faComments} style={icon2}/> <br/>
                            <span style={{color : "#5f4b8b"}}><b>채팅 접속 기준</b></span><br/>
                            <Badge variant="light" style={{width :"60px",height:"20px",fontSize:"12px",backgroundColor :"#cd6133"}}>능력치 10</Badge>
                        </div>
                    </Col>
                </Row>
                <Row style={{height:"50%",justifyContent:"center"}}>
                    <Col xs={6} style={{paddingTop:"3em",textAlign:"center",borderRight:"1px solid #5f4b8b"}}>
                        <FontAwesomeIcon icon={faIdBadge} style={icon2}/> <br/>
                        <span style={{color : "#5f4b8b"}}><b>개발자 모집</b></span><br/>
                        <p style={{marginTop:"1em"}}><b>기업 등록후 공고를 올리실 수 있습니다.</b></p>
                    </Col>
                    <Col xs={6} style={{textAlign:"center",paddingTop:"1em"}}> 
                        <span style={{color : "#5f4b8b",marginTop:"10px"}}><b>능력치 부여 기준</b></span>
                        <p style={p}>글 작성 +3</p>
                        <p style={p}>답변 작성 +5</p>
                        <p style={p}>본인 게시글 추천 받을 시 +5</p>
                        <p style={p}>게시글 추천시 +1</p>
                        <p style={p}>본인 답변 추천 받을 시 +3</p>
                        <p style={p}>답변 추천시 +1</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default reputation;