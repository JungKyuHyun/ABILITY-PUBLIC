import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { ButtonComponent } from '../../presentational/atoms/ButtonComponent';
import  CkeditorOne  from "../../presentational/atoms/CkeditorOne";
import ContentTitle from "../../presentational/molecules/ContentTitle";
import Recommend from "../../presentational/molecules/Recommend";
import { ReplyCompleteComponent , ReplyComponent } from '../../presentational/atoms/ReplyComponent'
import { GridArea } from "../organisms/GridArea";
import TagList from "../../presentational/molecules/TagList"
import axios from 'axios';
import {_} from 'underscore';
/**
 * @author  곽호원
 * @summary 게시글 상세보기 컴포넌트  
 * @author  정진호
 * @version 세션 체크후 댓글, 답글 컴포넌트 생성 없으면 게시글만 보임.
 */

const buttoncss = {
    textAlign: "right"
}

const writercss = {
    textAlign: "right",
    marginRight: ".5rem"
}

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

let userid = window.sessionStorage.getItem('userid');
let data = "";

class Postcontent extends Component{
    constructor(props){
        super(props);

        this.state = {
            postlist : [],
            replys : [],
            comments : [],
            userlist : [],
            replysimage : [],
            commentsimage : [],
            list : [],
            insert : 0,
            seq : props.match.params.seq
        };
       
    }
    

    async componentDidMount() {
        data = this.state.seq;
                 await axios.get(plistEndPoint,{
                     params : {
                        seq:data
                     }
                 }).then((response) => {
                    this.setState({
                        postlist : response.data
                         
                    });
                 }) // ERROR;
        const getComment = backUrl
                await axios.get(getComment,{
                    params : {
                        seq:data
                    }
                }).then((response) => {
                    this.setState({
                        comments : response.data.map(list=>({id : list.id , name : list.comment,image : list.image}))
                    });
                    
                });
        const getReply = backUrl
                await axios.get(getReply,{
                    params : {
                        seq:data
                    }
                }).then((response) => {
                    this.setState({
                        replys : response.data.map(list=>({id : list.id, name : list.reply,image : list.image}))
                    });
                });
                this.setState({
                    userlist : [...this.state.comments, ...this.state.replys, {id : this.state.postlist.userid,name :this.state.postlist.nick_name, image : this.state.postlist.user_image}]
                });
                let result =[]

                result.push(_.uniq(this.state.userlist,(item,key,name)=>{
                    return item.name;
                }));

                this.setState({
                    list : _.uniq(this.state.userlist,(item,key,name)=>{
                        return item.name;
                    })
                });
    } 
            
        delete(){
            data = this.state.seq;
                axios.get(deleteBaord,{
                    params : {
                        seq : data
                    }
                }).then(() => {
                    alert(this.state.seq+'번 글 삭제 하였습니다.');
                    window.location.href = "/question"
                })
            }
        insert=(e)=> {
            let content = document.getElementById('ckvalue').innerHTML;


            axios.get(replyendpoint,{
                params : {
                    userid : 74,
                    seq : data,
                    reply_content : content
                }
            }).then(()=> {
                this.setState({
                    reply : this.state.reply
                })
                window.history.go(0);
            });
            
        }  
            render(){
                
                const postlist = this.state.postlist;
                const list = this.state.list;
 
        if(postlist !== null && list.length > 0){
                return(
                    <>
                  
                    <PostDetail seq={this.state.seq} title={postlist.title} id={postlist.nick_name} view_count={postlist.view_count} likecount={postlist.likecount} content={postlist.content} hashtag={postlist.hashtag} list={list} onClick={this.delete.bind(this)} oninsert={this.insert.bind()}/>
                    </>
                )
            
            }else {
                return (
                <>
                <h6> </h6>
                </>
                )
            }
        }    
    
}

const commentcss = {
    width : "100%",
    border: "1px solid #e2e2e2",
    padding : "1.1rem",
    display : "grid"
}
const contentcss ={
    backgroundColor :"#f8f9fa",
    paddingTop :"2rem",
    paddingLeft : "0.7rem",
    paddingBottom : "1rem",
    width : "100%"
}
const replycss ={
    display :"flex"
}
export const PostDetail = (props) => {
    
        function sessioncheck() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }
    
            if (mm < 10) {
                mm = '0' + mm
            }
    
            today = yyyy + '-' + mm + '-' + dd;
            if(userid !==null || userid !== "" || userid !== undefined){
                return(
                    <>
                    <ReplyCompleteComponent on={replycss} seq={props.seq}  date={today} />
                    <CkeditorOne list={props.list} image={props.image} /><br /> 
                    </>
                )
            }else{
                return(
                    <>
                    <br></br>
                    </>
                )
            }
        }

    
        return (
            <GridArea>
                <Container>
                    <ContentTitle title={props.title} to={"/modifyWrite/"+props.seq} onClick={props.onClick}/>
                    <hr />
                    <div style={writercss}>
                        <h6>작성자 : {props.id} </h6>
                        <i className="fas fa-eye"> {props.view_count}</i>
                    </div>
                    <Row>
                        <Recommend count={props.likecount}/>
                        <Col xs={10} >
                            <br />
                            <div style={contentcss} dangerouslySetInnerHTML={ {__html: props.content} } ></div>
                            <hr/>
                            <small>#태그 </small><TagList hashtag={props.hashtag} />
                            <hr/>
                            <div style={commentcss}>
                            <small>댓글</small>
                            <div></div>
                            <ReplyComponent/>
                            </div>
                            <br></br>
                            <div>
                           {sessioncheck()}
                            <br /><br />

                            </div>
                            <div style={buttoncss}>
                                <ButtonComponent name="목록"/>&nbsp;&nbsp;
                                <ButtonComponent name="답변 제출" onclick={props.oninsert} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </GridArea>
        )

}

export default Postcontent;