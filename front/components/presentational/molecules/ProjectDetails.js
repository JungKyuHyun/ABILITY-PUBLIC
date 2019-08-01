import React from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar, faShareAlt, faReply } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, InputGroup, FormControl, Card} from 'react-bootstrap';
import { AbilityComponent } from '../atoms/AbilityComponent';
import { UserImageComponent2 } from '../atoms/UserImageComponent';
import ContentTitle from './ContentTitle';
import { TagListBoard } from './TagList';
import { ButtonComponent } from '../atoms/ButtonComponent';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import ko from 'react-timeago/lib/language-strings/ko';
import { Recommend2 } from './Recommend';
import {_} from 'underscore';
import Router from 'next/router';
import PropTypes from "prop-types";
import Highlight from 'react-highlight';

/**
 * @author  신선하
 * @summary 비디오 카드 디테일
 * @usage 
 **/

const formatter = buildFormatter(ko);

const iconSize = {
    width:'14px', 
    height:'auto'
}

const imgCss={
    padding:'0',
    borderRadius:"50%",
    width:"30px",
    height:"30px",
    marginRight:"0.5rem"
};


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


export const TItleNModify = (props) => {
    return(
        <>
        <ContentTitle 
            seq={props.seq} 
            title={props.title} 
            userid={props.userid} 
            path={"/project/modify?seq="+props.seq} 
            onclick3={props.onclick3}
            />
        </>
    );
}


export const VideoId = (props) => {
    YouTube.propTypes = {
        videoId: PropTypes.string
      }
    return (
        <>
        <br/>        
        <div style={{background:'#FFF'}}>     
            <YouTube 
                videoId={props.file_path}
                id="작성자아이디"
                className="클래스네임"
                opts={props.style}
            />
        </div>        
        </>                  
    );
}


export const TitleViewCount =(props)=>{
    return(
        <>
        <Row>
            <div className="col-12"><br/>
                <h5>{props.title}</h5>                       
            </div>            
        </Row>  

        <Row style={{color:'darkgrey'}}>
            <div className="col-6">
                조회수 {props.view_count}
            </div>               
            <div className="col-6" 
                 style={{textAlign:'right'}}>
                <FontAwesomeIcon icon={faHeart} style={iconSize}/>
                    &nbsp;좋아요&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faStar} style={iconSize}/>
                    &nbsp;즐겨찾기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faShareAlt} style={iconSize}/>
                    &nbsp;링크복사
            </div>
        </Row>
        </>
    );
}

export const ReplyProjectDetail =(props)=>{
    return(
        <>
        <Row>
        <div className="col-12">                        
            댓글[10]개<br/><br/>        
            <div className="row">
                <div className="col-1">
                    <UserImageComponent2 
                        css={imgcss}
                        imagepath={props.imagepath} />
                </div> 
                <div className="col-11">
                    <InputGroup className="mb-3" >
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1" >
                            <FontAwesomeIcon icon={faReply}/>    
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        placeholder="댓글을 입력하세요"
                        aria-label="Username"
                        aria-describedby="basic-addon1"                        
                        />                    
                    </InputGroup>
                </div>
            </div>
        </div>
        </Row><br/>            
        </>
    );
}

export const ProjectDetail = (props) =>{
    return (
        <>        
       
        <Row>            
            <Col md={11} style={{textAlign:"left", paddingRight:'0'}}>
                <VideoId 
                    file_path={props.file_path}
                    onClick={props.onClick}
                    style={{width:'100%', height:'450px'}}
                    /><br/><br/>          
            </Col>
            <br/><br/>
            <Col md={1} className="text-left" style={{padding:"0"}}>
                <Recommend2 
                    count={props.count} 
                    onClickUp={props.onClickUp} 
                    onClickDown={props.onClickDown} 
                    style={{textAlign:"left"}}                    
                    />
            </Col>
        </Row>
        <Row style={{width:"99%"}}>
            <Col md={11} style={{paddingRight:"0"}}>
                <Card style={{border:"1px solid #c6badf!important",
                              width:'828.33px'}} id="replyvideo">
                    <Card.Header 
                        className="text-muted text-right" 
                        style={{padding:"0.4rem 1rem"}}
                        >
                    <UserImageComponent2 
                        imagepath={props.imagepath} 
                        css={imgCss}
                        />
                        <Link 
                            href={{pathname:"/developer/page",
                                   query:{userid:props.userid}}}
                                   as={"/developer/page/"+props.userid}>
                            <a>{props.nickname}</a>
                        </Link>&nbsp;
                        <AbilityComponent val={props.ability}/>&nbsp;
                        - <i><TimeAgo date={props.date} formatter={formatter} /></i>
                    </Card.Header>
                    <Card.Body style={{minHeight:"20rem"}}>
                        <Card.Text>
                            <Highlight innerHTML={true}>
                            {props.content}
                            </Highlight>
                        </Card.Text>
                    </Card.Body>                    
                </Card><br/>
            </Col>
            <Col md={1} className="text-left" style={{padding:"0"}}/>
        </Row><br/>
        </>
    );    
}

export const ProjectTitle2 = (props) => {
    
    return (
    <>        
    <Row style={rowcss}>
        <Col md={9}>
            <TagListBoard 
                hashtag={props.tags} 
                boardid={props.boardid} 
                viewcount={props.viewcount}
                />
            <h2>&nbsp;{props.title}</h2>
        </Col> 
        <Col md={3} style={colcss}>
        {  props.userid !== 0 && props.currentUserId !== 0 ?   <>       
            {   props.userid == props.currentUserId ?    
                    <div style={divcss}>
                        <ButtonComponent 
                            variant="info" 
                            css={button} 
                            name="삭제" 
                            onclick={props.onclick3}
                            />&nbsp;&nbsp;&nbsp;
                        <Link href={props.to ? props.to : "/"}>  
                            <ButtonComponent 
                                css={button} 
                                onclick={() =>Router.push("/project/modify?seq="+props.seq, '/project/modify')}  
                                name="수정"
                                />
                        </Link>
                    </div>
                : "" }
           </>
           : ""}
        </Col>            
    </Row>
    </>
    )}