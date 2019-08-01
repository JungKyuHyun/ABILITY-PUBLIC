import React , {useState, useCallback} from 'react';
import { Row, Container, Col, Card } from 'react-bootstrap';
import ContentTitle from "./ContentTitle";
import {Recommend2} from "./Recommend";
import TagList from "./TagList";
import Link from 'next/link';
import {UserImageComponent2} from '../atoms/UserImageComponent';
import { AbilityComponent } from '../atoms/AbilityComponent';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import ko from 'react-timeago/lib/language-strings/ko';
import axios from 'axios';
import Router from 'next/router';
import Highlight from 'react-highlight';

const formatter = buildFormatter(ko);
const imgCss={
    padding:'0',
    borderRadius:"50%",
    width:"30px",
    height:"30px",
    marginRight:"0.5rem"
};

const rowcss = {
    paddingTop : "1.5rem",
    borderBottom : "1px solid #e2e2e2"
}



export const PostDetail = (props) => {
    const [likecount, setLikecount] = useState(props.likecount);

    const onClickUp = useCallback(() =>{
        setRecommandMain(1);
    },[likecount]);

    const onClickDown = useCallback(()=>{
        setRecommandMain(-1);
    },[likecount]);

    const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

        const setRecommandMain = useCallback((num)=>{
            if(!localStorage.getItem('userid')){
                
                swal({
                    text: "추천/비추천 기능은 로그인 후 이용이 가능합니다..",
                    title: num == 1?"추천 실패":"비추천 실패",
                    timer: "10000",
                    icon: "/static/image/Logo2.png"
                 });
                 return;
            }
            axios.get(backUrl,
            {
                params:{
                    seq:Router.query["seq"],
                    userid:localStorage.getItem('userid'),
                    counta:num
                }
            })
            .then((res)=>{
                if(res.data =="success"){
                    swal({
                        text: num == 1?"글을 추천 했습니다.":"글을 비추천 했습니다.",
                        title: num == 1?"능력 +1":"능력 -1",
                        timer: "5000",
                        icon: "/static/image/Logo2.png",
                    });
                    setLikecount(num == 1? likecount+1 : likecount-1);
                }else if(res.data=="plus"){
                    swal({
                        text: num == 1?"글 추천을 취소하였습니다.":"글을 비추천 했습니다.",
                        title: num == 1?"능력 -1":"능력 -1",
                        timer: "5000",
                        icon: "/static/image/Logo2.png",
                    });
                    setLikecount(likecount-1);
                }else if(res.data=="minus"){
                    swal("비추천 내역이 삭제 되었습니다.");
                    setLikecount(likecount+1);
                }else{
                    swal({
                        text: "이미 투표한 글입니다. 투표 내역을 삭제 하시겠습니까?",
                        title: num == 1?"추천 실패":"비추천 실패",
                        icon: "/static/image/Logo2.png",
                        buttons: true
                     })
                     .then((cancelok)=>{
                        if(cancelok){
                            setRecommandMain(0);
                        }else{
    
                        }
                     })
                }
            })
            .catch((res)=>{
                console.log(res);
            })
        },[likecount]);

        const onClickMark = useCallback((num)=>{
            if(!localStorage.getItem('userid')){
                swal({
                    text: "즐겨찾기(스크랩) 기능은 로그인 후 이용이 가능합니다.",
                    title: "게시물 즐겨찾기 추가 실패",
                    timer: "10000",
                    icon: "/static/image/Logo2.png"
                 });
                 return;
            }
            
            axios.get(backUrl,
            {
                params:{
                    seq:Router.query["seq"],
                    userid:localStorage.getItem('userid'),
                    num: num
                }
            })
            .then((res)=>{
                if(res.data =="1"){
                    swal({
                        text: "현재 글을 즐겨찾기에 추가했습니다.",
                        title: "즐겨찾기 추가 성공",
                        timer: "5000",
                        icon: "/static/image/Logo2.png",
                    });
                }else if(res.data=="success"){
                    swal("즐겨찾기 목록에서 삭제 되었습니다.");
                }else{
                    swal({
                        text: "이미 즐겨찾기한 글입니다. 즐겨찾기 내역을 삭제 하시겠습니까?",
                        title: "중복된 요청",
                        icon: "/static/image/Logo2.png",
                        buttons: true
                     })
                     .then((cancelok)=>{
                        if(cancelok){
                            onClickMark(1);
                        }
                     })
                }
            })
            .catch((res)=>{
                console.log(res);
            })
        
        },[]);
        return (
            <>
            <Card style={{paddingTop:"1.2rem"}}>
                <Container>
                  <Card.Title>
                        <Row style={rowcss}>
                            <ContentTitle id={props.id} seq={props.seq} title={props.title} userid={props.userid} path={"/question/modify?seq="+props.seq} onclick3={props.onclick3}/>
                        </Row>
                        <Row style={{justifyContent:"flex-end"}}>
                        <div style={{margin:"20px"}}>
                            <small style={{fontSize:"12px"}}>
                            <UserImageComponent2 imagepath={props.user_image} css={imgCss}/>
                                    <Link href={{pathname:"/developer/page",query:{userid:props.userid}}} as={"/developer/page/"+props.seq}>
                                            <a>{props.id}</a>
                                    </Link>&nbsp;
                                    <AbilityComponent val={props.reputation}/>&nbsp;
                            - <TimeAgo date={props.date_created} formatter={formatter} />
                            </small>
                        </div>
                  </Row>
                    </Card.Title>
                    <Row >
                        <Col md={11}>
                            <Card style={{paddingLeft:"0.7rem",paddingTop:"1.2rem",minHeight:"300px"}}>
                            
                                <Highlight innerHTML={true}>
                                    {props.content}
                                </Highlight>
                            </Card>
                            <div style={{marginTop:"1.2rem"}}>
                                <small>#태그 </small><TagList hashtag={props.hashtag} />
                             </div>
                        </Col>
                        <Col md={1}>
                        <Recommend2 count={likecount} onClickUp={onClickUp} 
                                        onClickDown={onClickDown} onClickMark={()=>onClickMark()}/>
                        </Col>
                        <Col>
                            <br></br>
                            <div>
                            {props.children}
                            <br /><br />
                            </div>
                        
                        </Col>
                    </Row>
                </Container>
            </Card>
                </>
        )
}

export default PostDetail;