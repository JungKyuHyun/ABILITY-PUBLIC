import React, { Component } from 'react';
import axios from 'axios';
import {_} from 'underscore';
import Router from 'next/router';
import ReplyComplete from '../../components/presentational/molecules/ReplyComplete'
import PostDetail from '../../components/presentational/molecules/PostDetail'
import swal from 'sweetalert';
import { TitleAndButtonComponent } from '../../components/presentational/atoms/TitleComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from 'react-bootstrap';
/**
 * @author  곽호원
 * @summary 게시글 상세보기 컴포넌트  
 * @author  정진호
 * @version 세션 체크후 댓글, 답글 컴포넌트 생성 없으면 게시글만 보임.
 */

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

const plistEndPoint = backUrl;
const deleteBaord = backUrl;


class Content extends Component{
 
    constructor(props){
        super(props);

        this.state = {
            postlist : [],
            replys : [],
            comments : [],
            userlist : [],
            list : [],
            seq : 0, 
            userid : 0
        };
            this.delete = this.delete.bind(this);
      }

    async componentDidMount() {
        this.setState({
            seq : Router.query['seq'],
            userid : localStorage.getItem('userid')
        });
        const param = Router.query['seq'];
                 await axios.get(plistEndPoint,{
                     params : {
                        seq: param
                     }
                 }).then((response) => {
                    this.setState({
                        postlist : response.data
                    });
                 }) 
        const getComment = backUrl
                await axios.get(getComment,{
                    params : {
                        seq: param
                    }
                }).then((response) => {
                    this.setState({
                        comments : response.data.map(list=>({id : list.id , name : list.comment,image : list.image}))
                    });
                });
        const getReply = backUrl
                await axios.get(getReply,{
                    params : {
                        seq: param
                    }
                }).then((response) => {
                    this.setState({
                        replys : response.data.map(list=>({id : list.id, name : list.reply,image : list.image}))
                    });
                });
                this.setState({
                    userlist : [...this.state.comments, ...this.state.replys, {id : this.state.postlist.userid,name :this.state.postlist.nick_name, image : this.state.postlist.user_image}]
                });
                this.setState({
                    list : _.uniq(this.state.userlist,(item)=>{
                        return item.name;
                    })
                });
    } 
        async delete(){
            const willDelete = await swal({
                title: "삭제 하시겠습니까?",
                text: "해당 게시글을 삭제하시겠습니까?",
                icon: "/static/image/Logo2.png",
              });
                if(willDelete){
                    axios.get(deleteBaord,{
                        params : {
                            seq : this.state.seq
                        }
                    }).then(() => {
                        swal({
                            title: "삭제 완료",
                            text: "능력치가 -3 떨어졌습니다",
                            icon: "/static/image/Logo2.png",
                        });
                        Router.push('/question/board');
                    })
                }
        }

            render(){
                const seq = this.state.seq;
                const postlist = this.state.postlist;
                const list = this.state.list;
                if(postlist !== null && list.length > 0 && seq !== 0){
                return(
                <Container>
                    <TitleAndButtonComponent title="질의 응답" path="/question/write" name="글쓰기">
                        <FontAwesomeIcon icon={faQuestionCircle} style={{width:"27.73px"}} />
                    </TitleAndButtonComponent>
                        <PostDetail seq={seq}
                                    userid={postlist.userid}
                                    title={postlist.title} 
                                    id={postlist.nick_name}
                                    date_created={postlist.date_created}
                                    reputation={postlist.reputation}
                                    user_image={postlist.user_image}
                                    view_count={postlist.view_count} 
                                    likecount={postlist.likecount} 
                                    content={postlist.content} 
                                    hashtag={postlist.tags}
                                    onclick3={this.delete}>
                            <hr />
                            <ReplyComplete seq={seq} oninsert={this.insert} list={list} />
                        </PostDetail>
                </Container>
                    
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

export default Content;