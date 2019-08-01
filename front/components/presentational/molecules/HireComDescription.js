import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import Highlight from 'react-highlight';

/**
 * 
 * @auth 곽호원
 * @summary 회사 소개하는 컴포넌트
 * 
 */
const comTitlecss ={
    marginLeft : "1%",
    marginTop : "3%",
    fontSize : "1.3em"
}

const comExDescriptioncss = {
    marginLeft : "1%",
    fontSize : "1em"
}
const ComDescription = (props) => {
    return (
        <Container>
            <Row style={comTitlecss}>
                기업소개  
            </Row>
                <hr />
            <Row style={comExDescriptioncss}> 
                <Highlight innerHTML={true}>
                    {props.comDescription}
                </Highlight>
            </Row>
    </Container>
    );
};

export default ComDescription;