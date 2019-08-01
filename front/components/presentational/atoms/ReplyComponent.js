import React, { Component, useState, useCallback, useEffect} from "react";
import Card from 'react-bootstrap/Card';
import { ProfileImageComponent } from "./ProfileImageComponent";
import { ButtonComponent, ButtonComponent2 } from "../atoms/ButtonComponent";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import axios from 'axios';
import ReplyComment from "../molecules/ReplyComment";
import { InputText } from "./InputboxComponent";
import { Recommend4 } from "../molecules/Recommend";
import {Badge} from 'react-bootstrap';
import dynamic from 'next/dynamic';
import Highlight from 'react-highlight'

const CkeditorOne2 = dynamic(() =>import('../atoms/CkeditorOne2'),{
  ssr : false
});


/**
 * @author  곽호원
 * @summary 댓글 컴포넌트  
 * 
 * @author 정진호
 * @version ReplyCompleteComponent 수정
 * */

const font = {
  padding: "0px",
  margin: "0px",
  paddingTop: "28px",
  paddingLeft: "0px",
  textAlign: "left",
  border: "0"
}

const datecss = {
  textAlign: "right",
  marginTop: "30px"
}
const buttoncss = {
  textAlign: "right",
  marginTop: "15px"
}
const textcss = {
  width : "100%",
  height : "120%",
  backgroundColor : "#e6e6e6",
  border : "1px solid #c6badf",
  paddingLeft : "20px",
  font : "#5f4b8b"

}

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";


export const ReplyComponent =  (props) => {
  const [likecount, setLikecount] = useState(0);
  const [userid, setUserid] = useState(0);
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
           seq:props.id,
           userid:localStorage.getItem('userid'),
           counta:num
       }
 
   })
   .then((res)=>{
       if(res.data =="success"){
            swal({
              text: num == 1?"댓글을 추천 했습니다.":"댓글을 추천을 취소 했습니다.",
              timer: "5000",
              icon: "/static/image/Logo2.png",
          });
           setLikecount(num == 1? likecount+1 : likecount-1);
       }else if(res.data=="plus"){
              swal({
                text: num == 1?"댓글을 추천 했습니다.":"댓글을 추천을 취소 했습니다.",
                timer: "5000",
                icon: "/static/image/Logo2.png",
            });
           setLikecount(likecount-1);
       }else if(res.data=="minus"){
           swal("비추천 내역이 삭제 되었습니다.");
           setLikecount(likecount+1);
       }else{
           swal({
               text: "이미 투표한 댓글입니다. 투표 내역을 삭제 하시겠습니까?",
               title: num == 1?"추천 실패":"비추천 실패",
               icon: "/static/image/Logo2.png",
               buttons: true
               })
               .then((cancelok)=>{
               if(cancelok){
                   setRecommandMain(0);
               }
               })
       }
   })
   .catch((res)=>{
       console.log(res);
   })
},[likecount]);

  const onClickUp = useCallback(() => {
    setLikecount(setRecommandMain(1)) 
  },[likecount]);


  useEffect(()=>{
    setLikecount(props.counta);
    setReplyid(props.id);
    setUserid(props.userid);
},[]);

  return (
    <Container>
      <Row style={{ paddingBottom: "8px", borderBottom: "1px solid #e2e2e2" }} >
        <Col md={2} style={{ verticalAlign: "middle", textAlign: "center", paddingTop: "20px" }} >
          <ProfileImageComponent css={{ width: "32px", height: "32px", border: "1px solid #CDCECF", margin: "0px!", marginRight: "0.5rem" }} user_image={props.user_image} />
          <br />
          <Link href={{ pathname: "/developer/page", query: { userid: props.userid } }}>
            <a>{props.nick_name}</a>

          </Link>
        </Col>
        {props.modify !== true || props.userid !== props.replyOwner || props.id !== props.targetid ?
          <>
            <Col md={4} style={{ verticalAlign: "middle", paddingTop: "20px" }}>
              <span>{props.comment_content}</span>
            </Col>
            <Col md={2} style={datecss}>
              <div>{props.date_created}</div>
            </Col>
            
            {props.userid == userid ?
              <Col md={4} style={buttoncss}>
                 <span onClick={onClickUp}>
                <Badge variant="primary" style={{marginRight:"0.5rem",backgroundColor:"#5F4B8B"}}>
                    <FontAwesomeIcon style={{width:"10px",height:"auto"}} icon={faThumbsUp}/>
                </Badge>
                {likecount}
            </span>
            
                &nbsp;&nbsp;
                {localStorage.getItem("userid") != userid ?
                ""
                :
                <>
                <span id={props.id} style={{ color: "rgb(247, 159, 31)", cursor: "pointer" }} onClick={props.onclick}>[삭제]</span>&nbsp;&nbsp;
                <span id={props.id} style={{ color: "rgb(6, 82, 221)", cursor: "pointer" }} onClick={props.modifyComment}>[수정]</span>
                </>
                }
              </Col>
              :
              <>
                <Col md={3}>
                </Col>
              </>
            }
          </>
          :
          <>
            <Col md={7}>
              <InputText defaultValue={props.comment_content} onChange={props.onChangeInput} ></InputText>
            </Col>
            <Col md={3} style={buttoncss}>
            <ButtonComponent id={props.id} onclick={props.onModifyCancel} name="취소" />&nbsp;&nbsp;
              <ButtonComponent id={props.id} onclick={props.modifyCommentOk} name="수정" />
            </Col>
          </>
        }

      </Row>
    </Container>
  )
}

const titlecss2 = {
  width: "100%",
  fontSize: "12px",
  paddingTop: "1rem"
}

const hrcss = {
  marginTop: "0px"
}
const cardcss = {
  padding: 0,
  margin: "0px 5px 10px 10px",
}
const rightcss = {
  width : "100%",
  textAlign: "right"
}


export class ReplyCompleteComponent extends Component {
  constructor(props) {
    super(props);

    const user_image = localStorage.getItem('user_image');
    const nick_name = localStorage.getItem('nick_name');
    const userid = localStorage.getItem('userid');
    this.state = {
      comments: [],
      user_image: user_image,
      nick_name: nick_name,
      userid: userid,
      seq: this.props.seq,
      id: this.props.id,
      comment: "",
      beforeReply : "",
      reply_content : props.reply_content
    };
    this.insertComment = this.insertComment.bind(this);
    this.getCommentList = this.getCommentList.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.onChangeCkeditor = this.onChangeCkeditor.bind(this);
  }
  async componentDidMount() {
    await this.getCommentList();
  }

  onChangeComment(e) {
    this.setState({
      comment: e.target.value
    })
  }

  onChangeCkeditor(e){
    this.state.setBeforeReply = e.editor.getData();
  }

 async getCommentList() {
    if (this.state.seq !== null && this.state.id !== null) {
      await axios.get(backUrl, {
        params: {
          seq: this.state.seq,
          reply_id: this.state.id
        }
      }).then((response) => {
        this.setState({
          comments: response.data
        })
      })
    } else {
      return;
    }
  }
  async insertComment() {
    const replyCommentpoint = backUrl;
    const userid = localStorage.getItem('userid');

    await axios.get(replyCommentpoint, {
      params: {
        userid: userid,
        seq: this.state.seq,
        comment_content: this.state.comment,
        reply_id: this.state.id,

      }
    }).then(() => {
      this.getCommentList();
    });
  }
  
  render() {
    
    let comment = this.state.comments;
    if (comment.length > 0) {
      return (
        <>
          <Row >
            <Col>
              <Card style={{ paddingTop: "1.2rem", marginBottom: "5px" }}>
                <Container>
                  <Row>
                    <Col md={4}>
                      
                      <ProfileImageComponent css={{ width: "32px", height: "32px", border: "1px solid #CDCECF", margin: "0px!", marginRight: "0.5rem" }} user_image={this.props.user_image} />
                        <Link href={{ pathname: "/developer/page", query: { userid: this.props.userid } }}>
                        <a>{this.props.nick_name}</a>
                      </Link>
                    </Col>   
                    <Col md={4} style={rightcss}>
                      <Card.Title style={titlecss2}>{this.props.date_created}</Card.Title>
                    </Col>
                    <Col md={4} style={rightcss}>

                      {localStorage.getItem("userid") == this.props.userid ?
                        <>
                          <span id={this.props.id} onClick={this.props.onclick} name="삭제" style={{ color: "rgb(247, 159, 31)", cursor: "pointer" }}>[삭제]</span>&nbsp;&nbsp;
              <span name="수정" id={this.props.id} onClick={this.props.getReplyListOne} style={{ color: "rgb(6, 82, 221)", cursor: "pointer" }}>[수정]</span>
                        </> : ""
                      }
                      
                    </Col>
                    <>
                    </>
                    
                    {this.props.isModify
                    ?
                    <>
                        <CkeditorOne2 onChange={this.props.onChangeCkeditor} data={this.props.reply_content2}/>
                          <Highlight innerHTML={true}>
                          {this.state.data}
                          </Highlight>
                        <div className="text-right" style={{marginRight:"0.5rem",textAlign:"right", width:"100%"}}>
                          <ButtonComponent name="취소" css={{marginTop:"0.3rem",marginRight:"0.3rem"}} onclick={this.props.onClickModifyCancel} variant="info"/>
                          <ButtonComponent name="답변 수정" id={this.props.id} css={{marginTop:"0.3rem"}} onclick={this.props.modifyReplyOk}/>
                        </div>
                    </>
                    :" " }
                  </Row>

                </Container>
                <br />
                <hr style={hrcss} />
                <Card.Body style={cardcss} >
                  <Row>
                <Col md={10}>
                <Highlight innerHTML={true}>
                  {this.props.reply_content}
                  </Highlight>
                </Col>
              <Col md={2}>
              <Recommend4 counta={this.props.usercounta} count={this.props.vote_count} userid={this.props.userid} replyid={this.props.id} />
             </Col>
             </Row>
                </Card.Body>
                <ReplyComment seq={this.props.seq} reply_id={this.props.id} />
              </Card>
              </Col>
          </Row>
        </>
      );
    } else {
      return (
        <>
          <Row>
            <Col md={12}>
              <Card style={{ paddingTop: "1.2rem", marginBottom: "5px" }}>

                <Container>
                  <Row>
                    <Col xs={4}>
                      <ProfileImageComponent css={{ width: "32px", height: "32px", border: "1px solid #CDCECF", margin: "0px!", marginRight: "0.5rem" }} user_image={this.props.user_image} />
                      <Link href={{ pathname: "/developer/page", query: { userid: this.props.userid } }}>
                    <a>{this.props.nick_name}</a>
                    </Link>
                     </Col>  
                    <Col xs={4} style={rightcss}>
                      <Card.Title style={titlecss2}>{this.props.date_created}</Card.Title>
                    </Col>
                    <Col xs={4} style={rightcss}>
                      {this.state.userid == this.props.userid ?
                        <>

                          <span id={this.props.id} onClick={this.props.onclick} name="삭제" style={{ color: "rgb(247, 159, 31)", cursor: "pointer" }}>[삭제]</span>&nbsp;&nbsp;
              <span name="수정" id={this.props.id} onClick={this.props.getReplyListOne} style={{ color: "rgb(6, 82, 221)", cursor: "pointer" }}>[수정]</span>
                        </> : ""
                      }
                    </Col>
                    {this.props.isModify && this.props.id == this.props.targetid
                    ?
                    <>
                        <CkeditorOne2 onChange={this.props.onChangeCkeditor} data={this.props.reply_content2}/>
                        <div style={rightcss} className="text-right" style={{marginRight:"1.2rem", width:"100%", textAlign:"right"}}>
                          <ButtonComponent name="취소" css={{marginTop:"0.3rem",marginRight:"0.3rem"}} onclick={this.props.onClickModifyCancel} variant="info"/>
                          <ButtonComponent name="답변 수정" id={this.props.id} css={{marginTop:"0.3rem"}} onclick={this.props.modifyReplyOk}/>
                        </div>
                    </>
                    :" " }
                  </Row>
                </Container>
                <br />
                <hr style={hrcss} />
                        
                <Card.Body style={cardcss} >
                <Row>
                <Col md={10}>
                  <Highlight innerHTML={true}>
                   {this.props.reply_content}
                   </Highlight>
             
                </Col>
              <Col md={2}>
             <Recommend4 counta={this.props.usercounta}count={this.props.vote_count} userid={this.props.userid} replyid={this.props.id} voter={this.props.voter} />
             </Col>
             </Row>
                </Card.Body>
                  {this.state.userid != undefined && this.state.userid != "" && this.state.userid != 0  ?
                <div style={{ display: "flex", backgroundColor: "#d6c286", backgroundColor: "rgba( 232, 226, 201, 0.5)", borderTop: "1px solid #e2e2e2" }}>
                  <Col xs={2} style={{ verticalAlign: "middle", textAlign: "center", paddingTop: "30px" }}>
                    <ProfileImageComponent css={{ width: "32px", height: "32px", border: "1px solid #CDCECF", margin: "0px!", marginRight: "0.5rem" }} user_image={this.state.user_image} />
                    <br />
                    <Link href={{ pathname: "/developer/page", query: { userid: this.state.userid } }}>
                    <a>{this.state.nick_name}</a>
                    </Link>
                  </Col>
                  <Col xs={9} style={{ paddingTop: "10px" }}>
                    <InputText content="댓글을 입력해주세요." value={this.state.comment} onChange={this.onChangeComment} />
                  </Col>
                  <Col xs={1} style={font}>
                    <ButtonComponent2 css={{ color: "#762873", border: "0.5px solid #762873" }} name="작성" onclick={this.insertComment} />
                  </Col>
                
                </div>
              :
              <div style={{backgroundColor:"#f2f2f2" , padding:"15px", border:"1px solid #c6badf"}}>
                <Row>
                            <Col md={1}>
                            <ProfileImageComponent css={{width:"32px",height:"32px",border:"1px solid #CDCECF",margin:"0px!",marginRight: "0.5rem" ,marginTop:"0.3rem" , marginLeft:"0.5rem"}} user_image={this.state.user_image} />  
                            </Col>
                            <Col md={11}>
                            <input type="text" value="댓글은 로그인 후 입력할 수 있습니다" readOnly style={textcss}/>
                            </Col>
                            </Row>
              </div>
                }
              </Card>
            </Col>
          </Row>
        </>
      )

    }
  }
}
