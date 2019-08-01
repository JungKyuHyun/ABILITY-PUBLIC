import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';
import Link from 'next/link';

/**
 * @auth 신선하
 * @summary 에러페이지
 */

const title ={
    textAlign : 'center',
    fontSize : '36px',
    margin : '1rem 0 0.5rem 0'
    }

const middle = {
    textAlign : 'center',
    fontSize : '18px',
    marginBottom : '0.5rem'
    }

const content = {
    textAlign : 'center',
    fontSize : '17px',
    marginBottom : '1rem'    
    }

const img = {
    width : "30%",
    height : "auto",
    lineHeight : 'auto',
    verticalAlign : 'middle',
    textAlign : "center"
    }

const textAlignCenter = {
    textAlign : 'center'
    }

const fontColor = {
    color:'#5F4B8B'
    }


const ErrorPage = (props) => {    
    return (
        <>
        <br/>      
        
        <Row>
            <div style={textAlignCenter}>
            <Image 
                src="/static/image/ErrorRobot.png" 
                alt="404"  
                style={img}               
                />
            </div>
        </Row>
        <Row>
            <Col sm={6} md={12} style={{padding:'0 0 0 30px'}}>
                <div style={title}>
                    <b>
                    요청하신 페이지를 <span style={fontColor}> 찾을 수 없습니다&nbsp;[{props.errorNum}]   
                    </span>
                    </b>
                </div><br/>                
                <div style={middle}>
                    <b>
                    찾으시려는 웹페이지의 이름이 바뀌었거나 삭제되어 현재 사용할 수 없습니다.
                    </b>
                </div>

                <div style={content}>
                입력하신 페이지 주소가 정확한지 다시 한번 확인해보시기 바랍니다.<br/>
                
                </div><br/>
                <div style={textAlignCenter}>
                    <Link href="/">
                        <a><ButtonComponent name="메인페이지 바로가기" /></a>
                    </Link>                    
                </div>
            </Col>
        </Row>
        <br/>
        </>
    );
};

export default ErrorPage;