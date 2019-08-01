import React from 'react';
import TagList from '../molecules/TagList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { Container ,Row,Col } from 'react-bootstrap';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import ko from 'react-timeago/lib/language-strings/ko';
import { JobContentComponent, JobPeriodComponent } from '../atoms/AbilityComponent';

const formatter = buildFormatter(ko);
/**
 * 
 * @auth 곽호원
 * @summary 구인공고 리스트 페이지 1개의 컴포넌트
 * @수정 신선하 UI 수정
 * 
 */
const divRight = {
    flex: '0.5',
    color:'grey',    
    textAlign: 'right',
    margin : '20px 0 0.5rem 0'
    
}

const add = {
    fontSize:'0.75rem',
    margin : '0 0 0.5rem 0'
}

const title = {
    fontSize:'12px',
    margin : '0 0 1rem 0'
}

const HireList = (props) => {
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
  
<>
            <Container style={{padding : '0rem 0rem 1rem 0rem'}}>
                <Row style={{borderBottom : "1px solid #e2e2e2", width:"99.5%"}}>
                    <Col md={9}>
                        <Link href={{pathname:"/job/detail" ,query: {seq : props.seq} }} as={"/content/"+props.seq} replace>
                            <a style={{height:'100%', color : "#5f4b8b", fontSize:"18px"}} onClick={props.onClick}>
                                [{props.subtitle}]&nbsp;
                                {props.hireTitle2}&nbsp;<JobPeriodComponent css={value.styles} val={value.text}></JobPeriodComponent>
                            </a>                   
                        </Link> 
                        <br></br>
                        <div style={title}>
                            {props.subCompany}&nbsp;{props.Title}
                        </div>
                        <div style={add}>
                            <span style={{color:'#cd6133'}}>{props.company}</span>&nbsp;&nbsp;
                            <span style={{color:'darkblue'}}>{props.loaction}</span>
                        </div>
                            <TagList hashtag={props.hashtag}/>                         
                    </Col>
                    <Col md={3}>
                    <div style={divRight}>
                        <FontAwesomeIcon icon={faEye} style={{textAlign:'right', color:"#5f4b8b"}}/>&nbsp;{props.hits}<br></br>
                        <TimeAgo date={props.date} formatter={formatter} /><br></br>
                    { props.scrap === 0?
                    <>
                      <span style={{color:"rgb(198, 186, 223)"}}>★</span> <JobContentComponent val={"+"+props.allscrap} style={{fontSize:"18px"}}></JobContentComponent>
                    </>
                    :<> 
                    <span style={{color:"orange"}}>★</span> <JobContentComponent val={"+"+props.allscrap} style={{fontSize:"18px"}}></JobContentComponent>
                    </>
                    }

                    </div>
                    </Col>
                </Row>
            </Container>
       </>
    );
};

export default HireList;