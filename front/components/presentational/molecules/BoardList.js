import React from 'react';
import {DateCreatedComponentability} from '../atoms/WriteDetail';
import {Like, Question, Answer} from '../atoms/LikeQnAComponent';
import {UserImageComponent2} from '../atoms/UserImageComponent'
import Link from 'next/link';
import Badge from 'react-bootstrap/Badge';
import {Col,Row, Container} from 'react-bootstrap';
/**
 * @author  정진호
 * @summary 게시판 리스트 Molecules 태그 목록 , 스플릿 단위로 끊지만 마지막에 ,적어줘야 전부 적용됨.(추후 수정)

 **/


const content = {
    display: "grid",
    maxWidth:"1140px",
    gridTemplateColumns: "5% 55% 20% 20%",
    
};

const titlecss = {
    fontSize : "17px",
    textDecoration : "none"
};

const imgcss = {
    width:"3.2rem",
    height:"3.2rem",
    borderRadius:"50%",
    marginRight:"0.5rem",
    overflow: "auto",
    top:"0",
    left: "0",
    padding:"0",
    marginTop:"0.1rem",
    gridColumnStart: 2,
    gridRow: "1/4",
    bottom: "8px",
    marginLeft : "10px",
};
const imgright = {
    paddingRight : "0px",
    textAlign : "right",
    maxWidth:"100px",
};
const colcss={
    paddingLeft: "0",
    paddingRight:"0",
    verticalAlign:"middle"
};
const tagcss = {
    marginRight : "0.2rem"
};
const seqcss ={
    marginRight : "1.5rem"
};

const BoardList = (props)=>{
    const taglist = [];
    if(props.hashtag !== null && props.hashtag !== "" && props.hashtag !== undefined && props.hashtag !== "null"){
        const list = props.hashtag.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
    }
    const taglistSet = [...new Set(taglist)];
    const hashtags = taglistSet.map((value)=>(<Badge key={value} variant="light" style={tagcss}>{value}</Badge>))
 
    return (
        <>
        
        <div className="div_Content" style = {content} id={props.seq}>
                <small style={seqcss}>{props.seq}</small>
            <div className="Question Content_item">
                <h6 style = {titlecss}>
                    <Link href={{pathname:props.path ,query: {seq : props.seq}}} as={"/content/"+props.seq}  replace>
                        <a style={titlecss} >{props.title}</a>
                    </Link> 
                </h6>
                <div className="Question tagLine">
                    <h6>{hashtags}</h6>
                </div>
            </div>
            <div className="Question Content_item Detail">
                
                    <Question question={props.view_count}/>
                    <Like like={props.like}/>
                    <Answer answer={props.answer}/>
                
            </div>
            <div className="Content_item_like">
                <Container>
                    <Row style={{verticalAlign:"middle"}} id="writerRow">
                        <Col style={imgright} id="userimg">
                        <UserImageComponent2 css={imgcss} imagepath={props.imagepath}/>
                        </Col>
                        <Col style={colcss} id="writer">
                        <small><Link href={{ pathname : "/developer/page", query:{userid : props.userid ? props.userid : ""}} } ><a>{props.id}</a></Link></small>
                        <DateCreatedComponentability label={props.day} reputation={props.reputation}></DateCreatedComponentability>
                        </Col>
                    </Row>
                 </Container>
            </div>
            
        </div>
        
        </>
        )
}
    

export const BoardListAll = (props)=>{
    const taglist = [];
    if(props.hashtag !== null && props.hashtag !== "" && props.hashtag !== undefined && props.hashtag !== "null"){
        const list = props.hashtag.split(',');
        for(var i=0; i<list.length; i++){
            taglist.push(list[i]);
        }
    }
    const taglistSet = [...new Set(taglist)];
    const hashtags = taglistSet.map((value)=>(<Badge key={value} variant="light" style={tagcss}>{value}</Badge>))
 
    return (
        <>
         
        <div className="div_Content" style = {content} id={props.seq}>
                <small style={seqcss}>{props.seq}</small>
            <div className="Question Content_item">
                <h6 style = {titlecss}><small style={{color:props.color}}><b>[{props.menu}] </b></small>
                    <Link href={{pathname:props.path ,query: {seq : props.seq} }} replace>
                        <a style={titlecss} onClick={props.onClick}>{props.title}</a>
                    </Link>
                </h6>
                <div className="Question tagLine">
                    <h6>{hashtags}</h6>
                </div>
            </div>
            <div className="Question Content_item Detail">
                
                    <Question question={props.view_count}/>
                    <Like like={props.like}/>
                    <Answer answer={props.answer}/>
                
            </div>
            <div className="Content_item_like">
                <Row style={{verticalAlign:"middle"}}>
                    <Col style={imgright}>
                    <UserImageComponent2 css={imgcss} imagepath={props.imagepath}/>
                    </Col>
                    <Col style={colcss}>
                    <small><Link href={{ pathname : "/developer/page", query:{userid : props.userid ? props.userid : ""}} } ><a onClick={props.onClick}>{props.id}</a></Link></small>
                    <DateCreatedComponentability label={props.day} reputation={props.reputation}></DateCreatedComponentability>
                    </Col>
                 </Row>
            </div>
            
        </div>
        
        </>
        )
}
 export default BoardList;