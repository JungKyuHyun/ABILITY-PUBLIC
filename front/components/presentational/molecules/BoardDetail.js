import React, {memo} from 'react';
import {Card,Col,Row} from 'react-bootstrap';
import {UserImageComponent2} from "../atoms/UserImageComponent";
import {Recommend2} from './Recommend';
import {AbilityComponent} from '../atoms/AbilityComponent';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
import ko from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

import Highlight from 'react-highlight'



const formatter = buildFormatter(ko);

/**
 * @author 정규현

 */

const imgCss={
    padding:'0',
    borderRadius:"50%",
    width:"30px",
    height:"30px",
    marginRight:"0.5rem"
};

const BoardDetail = (props) =>{
    return (
        <Row style={{width:"99%"}}>
            <Col md={11} style={{paddingRight:"0"}}>
                <Card style={{border:"1px solid #5F4B8B!important"}}>
                    <Card.Header className="text-muted text-right" style={{padding:"0.4rem 1rem"}}>
                        <UserImageComponent2 imagepath={props.img} css={imgCss}/>
                            <Link href={{pathname:"/developer/page",query:{userid:props.userid}}}>
                                <a>{props.nickname}</a>
                            </Link>&nbsp;
                        <AbilityComponent val={props.ability}/>&nbsp;
                        - <i><TimeAgo date={props.date} formatter={formatter} /></i>
                    </Card.Header>
                    <Card.Body style={{minHeight:"20rem"}}>
                        <Card.Text >
                                <Highlight innerHTML={true} >
                                {props.content}
                                </Highlight>
                        </Card.Text>
                        <br/>
                    </Card.Body>
                    
                </Card>
                <br/><br/>
                </Col>
            <Col md={1} className="text-left" style={{padding:"0"}}>
                <Recommend2 count={props.count} onClickUp={props.onClickUp} 
                        onClickDown={props.onClickDown} onClickMark={props.onClickMark}/>
            </Col>
        </Row>
    );    
}

export default BoardDetail;