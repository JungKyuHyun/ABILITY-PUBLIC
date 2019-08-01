import React from 'react';
import {ButtonComponent,ButtonComponent2} from "../atoms/ButtonComponent";
import {_} from 'underscore';
import {Col, Row} from "react-bootstrap";
import Router from 'next/router';
import Link from 'next/link';
import {TagListBoard} from './TagList';

/**
 * @author  곽호원
 * @summary 글제목 + 글쓰기 컴포넌트  
 * @see 정규현 컴포넌트 추가(커스텀)
 * @see 정규현 커스텀 컴포넌트 추가/ 보드용
 * */

const button = {
    width : "90px",
}
const divcss ={
        minWidth : "194px"
}
const rowcss = {
        paddingTop : "1.5rem"
    }
const colcss ={
        padding:"0px",
        textAlign:"center"
}

const ContentTitle = (props) => {
        const userid = localStorage.getItem("userid");
        return(
        <>
                <Col md={8} style={{color: "#8278ad"}}>
                  <h5>{props.title}</h5>
                  </Col> 
                  <Col md={4} style={{padding : "0px",paddingRight:"8px", textAlign : "right"}} >
                          { props.userid == userid ?
                        <div style={divcss}>
                                <ButtonComponent2 css={{width : "90px", color:"#762873", border :"0.5px solid #762873"}} name="삭제" onclick={props.onclick3}/>
                                &nbsp;&nbsp;&nbsp;
                                <ButtonComponent2 css={{width : "90px", color:"#762873", border :"0.5px solid #762873"}} onclick={() =>Router.push(props.path, "/modify")}  name="수정"/>
                        </div>
                        : ""
                          }
                  </Col>
        </>
        )
}

export const ContentTitle2 = (props) => {

        return(
                <>
                <Row style={rowcss}>
                <Col md={9}>
                        <TagListBoard hashtag={props.tags} boardid={props.boardid} viewcount={props.viewcount}/>
                        <h5 style={{color: "#8278ad"}}>&nbsp;{props.title}</h5>
                </Col> 
                <Col md={3} style={colcss} >
                {props.writer !== 0 && props.userid !== 0 ?         
                        <>  
                        { props.writer == props.userid ?  
                                <div style={divcss}>
                                        <ButtonComponent variant="info" css={button} name="삭제" onclick={props.onclick3}/>
                                        &nbsp;&nbsp;&nbsp;
                                        <Link href={props.to ? props.to : "/"}>  
                                                <ButtonComponent css={button} onclick={() =>Router.push("/community/modify?seq="+props.seq, '/community/modify')}  name="수정"/>
                                        </Link>
                                </div>
                                :""
                        }
                        </>
                : ""
                }
                </Col>            
                </Row>
        </>
        )

        }
export default ContentTitle;
