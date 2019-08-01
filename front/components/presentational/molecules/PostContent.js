import React from 'react';
import {Col} from "react-bootstrap";

/**
 * 
 * @auth 곽호원
 * @summary 질의 응답 상세페이지 코드와 에러 위치 설명 등등 컴포넌트
 * 
 */
const PostContent = (props) => {
    return (
        
        <Col xs={10}>
                <p>{props.content}</p>
                </Col>
    );
};

export default PostContent;