import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import { JobPeriodComponent } from '../atoms/AbilityComponent';
import { Question } from '../atoms/LikeQnAComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
/**
 * 
 * @auth 곽호원
 * @summary 구인공고 상세페이지 회사 로고및 제목 위치 등등 컴포넌트
 * @수정 신선하
 * 
 * @auth 정진호
 * @version 실 데이터 반영 , css수정
 */
const comLogocss = {
    width : "56px",
    height : "56px",
}
const HireTitle = (props) => {

    const value = {
        text : "",
        styles : {
            backgroundColor : "",
            fontSize :"11px"
        }
    }
      const date = new Date();

      let year = date.getFullYear();
      let month = date.getMonth()+1;
      let day = date.getDate();
      if((day+"").length <2){
        day = "0"+day;
      }
      let temp = props.event.split("-");
      let results = Number(temp[0]);
          results += Number(temp[1]);
          results += Number(temp[2]);
      let getDates = year+month+day;
    if(eval(results) === eval(getDates)){
        value.text = "당일 마감"; 
        value.styles.backgroundColor = "red";
    }else if(eval(results-1) === eval(getDates)){
          value.text = "마감전";
          value.styles.backgroundColor = "red";
      }else if(eval(results) < eval(getDates)){
        value.text= "마감";
          value.styles.backgroundColor = "gray";
      }else{
          value.text ="모집중";
          value.styles.backgroundColor = "#cd6133";
      }
      

    return (
    <Container>
        <Row style={{padding : "5px",height:"110px", paddingTop:"20px", borderRadius:"4px",borderBottom:"1px solid #e2e2e2"}}>
            <Col xs={12} style={{display :"flex"}}>
                <div>
                <img style={comLogocss} src={props.image}/>
                </div>
                <div style={{paddingLeft:"14px",paddingTop:"0.7rem",width:"87%", minWidth:"184px"}}>
               <span style={{fontSize:"18px"}}>{props.title}</span> <JobPeriodComponent css={value.styles} val={value.text}></JobPeriodComponent>&nbsp;&nbsp;<small>+{props.allscrap}</small><br></br>
                <span style={{fontSize:"11px",color:"grey"}}>{props.company_name} | {props.company_area}</span>
                </div>
                <div style={{textAlign:"right",paddingTop:"40px",paddingRight:"10px",display:"flex", width:"100px"}}>
                <Question question={props.count}/> 
                <div style={{position:"relative", bottom:"7px",left:"1.5rem"}}>
                { props.scrapValue == 0 ?
                    <FontAwesomeIcon icon={faStar} style={{width:"30px",height:"30px",cursor:"pointer",color:"rgb(198, 186, 223)"}} onClick={props.scrap} />
                  : <FontAwesomeIcon icon={faStar} style={{width:"30px",height:"30px",cursor:"pointer",color:"orange"}} onClick={props.scrap} />
                }
                </div>
                </div>
            </Col>
        </Row>
    </Container>

    );
};

export default HireTitle;
