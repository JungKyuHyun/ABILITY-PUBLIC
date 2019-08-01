import React from 'react';
import {Card} from "react-bootstrap";

/**
 * 
 * @author 정규현
 * @summary 디테일 영역에 사용할 카드 영역 입니다.
 * 
 */
const CardArea = (props)=>{
    return(
        <Card border="Secondary" style={{ width: '30rem' }}>
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            {props.content}
          </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default CardArea;