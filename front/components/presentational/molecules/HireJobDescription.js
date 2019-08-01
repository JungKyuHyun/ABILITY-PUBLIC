import React from 'react';
import {Col, Row,Container} from 'react-bootstrap';

/**
 * 
 * @auth 곽호원
 * @summary 회사의 직무 소개 컴포넌트
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
const HireJobDescription = (props) => {
    return (
        <Container style={{}}>
            <Row style={comTitlecss}>
                업무 설명서   
            </Row>
                <hr />
            <Row style={comExDescriptioncss}> 
                <div dangerouslySetInnerHTML={ {__html: props.jobDescription} } ></div>
            </Row>
    </Container>
    );
};

export default HireJobDescription;