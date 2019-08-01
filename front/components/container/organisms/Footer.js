import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

/**
 * @auth 신선하
 * @summary 푸터디자인
 */


const footer = {
    backgroundColor:'#5F4B8B',
    color:'#FFF',
    marginTop:"2.5rem",
    textAlign:"center",
}

const footer2 = {
    backgroundColor:'#5F4B8B',
}

const title ={
    margin : '1.5rem 1rem 1rem 1rem',
    fontSize : '15px'
}

const content = {
    margin : '1rem',
    lineHeight : '1.5rem',
    textAlign:'center',
    color:'#FFF',
    fontSize : '11px'
}

const content1 = {
    lineHeight : '1.5rem',
    textAlign : 'right',
    color:'#FFF',
    fontSize : '11px'
}

const content2 = {
    lineHeight : '1.5rem',
    textAlign :'left',
    color:'#FFF',
    fontSize : '11px'
}

const content5 = {
    lineHeight : '1.5rem',
    textAlign :'center',
    color:'#FFF',
    fontSize : '11px'
}

const icon = {
    width:"auto",
    height:"14px"
}

const copyRight = {
    textAlign:"title",
    color:'#FFF',
    textAlign:'center',
    fontSize:'11px'
}

export const GitLink = (props) => {
    return (
        <>
        
        <Link href={props.href} >
            <a id={props.id} style={{color:"white!important"}} target="_blank">
            {props.name}&nbsp;
            <FontAwesomeIcon 
                id={props.id}
                style={icon} 
                icon={faGithub}
                /></a>
        </Link>
        </>
    )
}

export const Footer = () => {
    return (
        <>
        <style>
            {`
            #footer {
                color : white!important
            }
            `}
            </style>
        <Row style={footer}>
            <Col sm={4} md={4}>
                <div style={title}>
                    <b>About Ability</b>
                </div>
                <Row>
                    <Col sm={4} md={3} />
                    <Col sm={4} md={6}>                
                        <div style={content5}>
                            <Link href="/ability/Info">
                                <a id="footer">소개영상</a>
                            </Link><br/>
                            <Link href="/donation/board">
                                <a id="footer">후원하기</a>
                            </Link><br/>
                            <Link href="/user/reputation">
                                <a id="footer">능력치 제도</a>
                            </Link>
                        </div>
                    </Col>
                    <Col sm={4} md={3} />
                </Row>
            </Col>
            <Col sm={4} md={4}>
                <div style={title}>
                    <b>Contact</b>
                </div>
                <div style={content}>
                    <FontAwesomeIcon 
                        style={{width:"auto",height:"14px"}} 
                        icon={faEnvelope}
                        />&nbsp;
                        ability-master@team-ability.com<br/>
                    <FontAwesomeIcon 
                        style={icon} 
                        icon={faMapMarkerAlt}
                        />&nbsp;
                        서울특별시 강남구 테헤란로5길 11 YBM빌딩 2층
                        
                </div>                    
            </Col>                              
            <Col sm={4} md={4}>
                <div style={title}>
                    <b>Members</b>
                </div>
                    <Row id="named">
                        <Col sm={4} md={6} style={{paddingRight:'7.5px'}} id="nameline">
                            <div style={content1}>
                                <GitLink id="footer" name="정규현" href="https://github.com/JungKyuHyun" /><br/>
                                <GitLink id="footer" name="강기훈" href="https://github.com/alkalisummer" /><br/>
                                <GitLink id="footer" name="신선하" href="https://github.com/sunha-shin" /><br/>                                            
                            </div>
                        </Col>
                        <Col sm={4} md={6} style={{paddingLeft:'7.5px'}} id="nameline" >
                            <div style={content2}> 
                                <GitLink id="footer" name="곽호원" href="https://github.com/kwakhowon" /><br/>
                                <GitLink id="footer" name="정진호" href="https://github.com/jhguma" /><br/>     
                                <GitLink id="footer" name="우세림" href="https://github.com/selim0915" /><br/>                            
                            </div>
                        </Col> 
                    </Row>                                       
                </Col>
        </Row>
        <Row style={footer2}>
            <Col sm={6} md={2} />
            <Col sm={6} md={8} style={copyRight} > 
                ⓒ 2019 <b>team-ability.</b> All rights reserved.<br/><br/>
            </Col>
            <Col sm={6} md={2} />
        </Row>
        </>
    );
};