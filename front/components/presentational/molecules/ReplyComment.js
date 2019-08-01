import React, { Component } from "react";
import { ProfileImageComponent } from "../atoms/ProfileImageComponent";
import {  Col, Row } from "react-bootstrap";
import axios from 'axios';
import { ReplyComponent } from "../atoms/ReplyComponent";
import { ButtonComponent2 } from "../atoms/ButtonComponent";

const col = {
    margin : "0px",
    padding : "0px"
}

const row = {
    width : "100%"
}
const font = {
    padding : "0px",
    margin : "0px",
    paddingTop : "20px",
    paddingLeft : "0px",
    textAlign : "left",
    border : "0"
}

const inputcss = {
    width : "100%",
    height : "36px"
}
const textcss = {
    width : "100%",
    height : "120%",
    backgroundColor : "#e6e6e6",
    border : "1px solid #c6badf",
    paddingLeft : "20px",
    font : "5f4b8b"

}

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

class ReplyComment extends Component {
    constructor(props) {
        super(props);
        
        const user_image = localStorage.getItem('user_image');
        const nick_name = localStorage.getItem('nick_name');
        const userid = localStorage.getItem('userid');
        this.state = ({
            comments: [],
            user_image : user_image,
            nick_name : nick_name,
            userid : userid,
            values : "",
            comment_content : "",
            comment_content2 : "",
            comment_content3 : "",
            modify : false,
            reply_id : "",
            id : "",
            replyOwner : "",
            targetid : ""
        });
        this.deleteComment = this.deleteComment.bind(this);
        this.insertComment = this.insertComment.bind(this);
        this.getCommentList = this.getCommentList.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.modifyCommentOk = this.modifyCommentOk.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.modifyComment = this.modifyComment.bind(this); 
        this.getCommentListOne = this.getCommentListOne.bind(this);
        this.onModifyCancel = this.onModifyCancel.bind(this);
    }
    
    async componentDidMount() {
        await this.getCommentList();
    }

    
    async getCommentList() {
        await axios.get(backUrl, {
            params: {
                seq: this.props.seq,
                reply_id : this.props.reply_id
            }
        }).then((response) => {
            this.setState({
                comments: response.data
            }) 
        })
    }
    onChangeHandler(e) {
        this.setState({
            values : e.target.value
        })
        
    }

    async getCommentListOne(e){
        await axios.get(backUrl, {
            params : {
                id : e.target.id
            }
        }).then((response)=>{
            this.setState({
              replyOwner : response.data.userid,
              comment_content : response.data.comment_content,
              modify : true
            }) 
        })
    }

    async insertComment() {
        let data = this.props.seq;
        let reply_id = this.props.reply_id;
        const replyCommentpoint = backUrl;
   
        const userid = localStorage.getItem('userid');
        
       await axios.get(replyCommentpoint, {
            params: {
                userid: userid,
                seq: data,
                comment_content: this.state.values,
                reply_id : reply_id
            }
        }).then(() => {
            this.getCommentList();
            this.setState({
                values : ""
            })
        });
    }

    async deleteComment(e) {
        let id = e.target.id;
        const willDelete = await swal({
            title: "삭제 하시겠습니까?",
            text: "해당 댓글을 삭제하시겠습니까?"
          });
          if(willDelete){
        await axios.get(backUrl, {
            params: {
                id: id
            }
        }).then(() => {
            swal("삭제완료 해당 댓글을 삭제 하였습니다.");
            this.getCommentList();
        })
    }
    }
    onChangeContent(e){
        this.setState({
            comment_content : e.target.value
        })
    }
    async modifyComment(e){
        await axios.get(backUrl, {
            params : {
              id : e.target.id
            }
        }).then((response)=>{
          this.setState({
            targetid : response.data.id,
            replyOwner : response.data.userid,
            comment_content : response.data.comment_content,
            modify : true
          })
        })
    }
    async modifyCommentOk(e){
        await axios.get(backUrl,{
          
          params : {
            id : e.target.id,
            comment_content : this.state.comment_content
          }
        }).then((response)=>{
          this.setState({
            modify : false,
            comment_content : this.state.comment_content,
          })
          this.getCommentList();
        })

      }

    onModifyCancel(){
        this.setState({
            modify : false
        })
      }

    render() {
        let comment = this.state.comments;
        if (comment.length > 0) {
            return (
                <>
                <div style={{backgroundColor:"#d6c286", backgroundColor:"rgba( 232, 226, 201, 0.3)",borderTop :"1px solid #e2e2e2"}}>
                    <div style={row}>
                        <Col xs={12} style={col}>
                            {comment.map((comment, index) => {
                                return (<ReplyComponent
                                    onclick={this.deleteComment} 
                                    userids = {this.state.userids}
                                    id={comment.id}
                                    userid={comment.userid}
                                    seq={this.props.seq}
                                    reply_id = {comment.reply_id}
                                    user_image={comment.user_image}
                                    nick_name={comment.nick_name}
                                    date_created={comment.date_created}
                                    onChangeInput={this.onChangeContent}
                                    modifyCommentOk={this.modifyCommentOk}
                                    replyOwner = {this.state.replyOwner}
                                    modify={this.state.modify}
                                    comment_content={comment.comment_content}
                                    comment_content2={this.state.comment_content2}
                                    comment_content3={this.state.comment_content3}
                                    modifyComment={this.modifyComment}
                                    getCommentListOne={this.getCommentListOne}
                                    targetid={this.state.targetid}
                                    counta = {comment.counta}
                                    onModifyCancel={this.onModifyCancel}
                                    userscounta = {this.state.userscounta}
                                    key={index} />
                                )
                            })}
                            
                        </Col>
                    </div>
                    {this.state.userid != undefined && this.state.userid != "" && this.state.userid != 0  ?
                    <div style={{display:"flex", backgroundColor:"#d6c286", backgroundColor:"rgba( 232, 226, 201, 0.3)"}}>
                        <Col xs={2} style={{verticalAlign:"middle",textAlign:"center",paddingTop:"20px"}}>
                            <ProfileImageComponent css={{width:"32px",height:"32px",border:"1px solid #CDCECF",margin:"0px!",marginRight: "0.5rem"}} user_image={this.state.user_image} />
                            <br/>{this.state.nick_name}
                        </Col>
                        <Col xs={9} style={{paddingTop:"22px",marginBottom:"1.2rem"}}>
                        <input maxLength="255" style={inputcss} type="text" id="replyComment" placeholder="댓글을 입력해주세요" onChange={this.onChangeHandler} value={this.state.values}/>
                        </Col>
                        <Col xs={1} style={font}>
                            <ButtonComponent2 css={{color:"#762873", border :"0.5px solid #762873"}} name="작성" onclick={this.insertComment}/>
                        </Col>
                        </div>
                        :
                        <div style={{backgroundColor:"#f2f2f2" , padding:"15px" , border:"1px solid #c6badf"}}>
                            <Row>
                            <Col md={1}>
                            <ProfileImageComponent css={{width:"32px",height:"32px",border:"1px solid #CDCECF",margin:"0px!",marginRight: "0.5rem" ,marginTop:"0.3rem", marginLeft:"0.5rem"}} user_image={this.state.user_image} />  
                            </Col>
                            <Col md={11}>
                            <input type="text" value="댓글은 로그인 후 입력할 수 있습니다" readOnly style={textcss}/>
                            </Col>
                            </Row>
                      </div>
                    }
                    </div>
                    
                </>
            )
        } else {
            return (
                <>
                <div style={{backgroundColor:"#d6c286", backgroundColor:"rgba( 232, 226, 201, 0.3)",borderTop :"1px solid #e2e2e2"}}>
                    <div style={row}>
                        <div style={{display:"flex"}}>
                        <Col xs={2} style={{verticalAlign:"middle",textAlign:"center",paddingTop:"20px"}}>
                            <ProfileImageComponent css={{width:"32px",height:"32px",border:"1px solid #CDCECF",margin:"0px!",marginRight: "0.5rem"}} user_image={this.state.user_image} />
                            <br/>
                            {this.state.nick_name}
                            
                        </Col>
                        <Col xs={9} style={{paddingTop:"22px",marginBottom:"1.2rem"}}>
                        <input style={inputcss} type="text" id="replyComment" placeholder="댓글을 입력해주세요" onChange={this.onChangeHandler} value={this.state.values}/>
                        </Col>
                        <Col xs={1} style={font}>
                            <ButtonComponent2 css={{color:"#762873", border :"0.5px solid #762873"}} name="작성" onclick={this.insertComment}/>
                        </Col>
                            </div>
                        </div>
                    </div>
                </>
            )
        }

    }
};

export default ReplyComment;