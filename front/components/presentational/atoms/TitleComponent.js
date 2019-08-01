import React, {useState,useEffect} from 'react';
import { ButtonComponent } from './ButtonComponent';
import Link from 'next/link';
import {Row, Col} from 'react-bootstrap';
/**
 * @author 정규현
 * @summary 게시판별 리스트에 나타나는 메인 제목
 * @version 정규현 TitleAndButtonComponent 컴포넌트 추가 
 */

const css = {
    color:'#5F4b8b', 
    fontWeight:'700',
    marginTop:'1rem',
    marginBottom:'2.2rem'
};

const css1 = {
    fontWeight:'700',
    marginTop:'1rem',
    marginBottom:'2.2rem',
    textAlign:"right"
};

const TitleComponent = (props) =>
    <div style={css}>
        <h3>
            <b>
                {props.children}
                &nbsp; {props.title}
            </b>
        </h3>
    </div>


export const TitleAndButtonComponent = (props) =>{
    const [isauth, setIsauth] = useState("0");
    
    useEffect( () => {  
        const temp = localStorage.getItem('userid');
        setIsauth(temp);
    },[isauth]);

    return(
    <>
    <Row id="boardtitle">
        <Col sm={6} md={6} style={css} id="boardcol">
            <h3>
                <b>
                    {props.children}
                    &nbsp; {props.title}
                </b>
            </h3>
        </Col>    
        <Col sm={6} md={6} style={css1}>
            {isauth!== "0" && isauth !== null && isauth !== undefined
            ?
                <Link href={props.path}>
                <a><ButtonComponent name={props.name} onclick={props.onclick} css={props.style}/></a>
                </Link>
            :
                ""
            }    
        </Col>     
    </Row>
    
    </>
    )   
}

const css2 = {
    color:'#5F4b8b', 
    fontWeight:'700',
    marginTop:'1rem',
    marginBottom:'2.2rem',
    paddingRight: "0px"
};

export const TitleAndButtonComponent2 = (props) =>{
    const [isauth, setIsauth] = useState("0");
    
    useEffect( () => {  
        const temp = localStorage.getItem('userid');
        setIsauth(temp);
    },[isauth]);

    return(
    <>
    <Row>
        <Col sm={11} md={11} style={css2}>
            <h3>
                <b>
                    {props.children}
                    &nbsp; {props.title}
                </b>
            </h3>
        </Col>    
        <Col sm={1} md={1} style={css1}>
            {isauth!== "0" && isauth !== null && isauth !== undefined
            ?
                <Link href={props.path}>
                <a><ButtonComponent name={props.name} onclick={props.onclick} css={props.style}/></a>
                </Link>
            :
                ""
            }    
        </Col>     
    </Row>
    
    </>
    )   
}

export default TitleComponent;