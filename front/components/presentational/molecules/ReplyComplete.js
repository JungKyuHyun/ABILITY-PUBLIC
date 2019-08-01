import React, {Component} from 'react';
import {ButtonComponent} from '../atoms/ButtonComponent';
import dynamic from 'next/dynamic'
import {ReplyCompleteComponent} from '../atoms/ReplyComponent';
import { Row,Col } from "react-bootstrap";
import axios from 'axios';
import Router from 'next/router';
import swal from 'sweetalert';

const buttoncss = {
    textAlign : 'right',
    marginTop : "1rem"
};

const CkeditorOne2 = dynamic(() =>import('../atoms/CkeditorOne2'),{
    ssr : false
});

const backUrl = process.env.NODE_ENV === 'production'? "?" : "?";

class ReplyComplete extends Component {
    constructor(props){
        super(props);
        this.state = ({
            replys : [],
            data : "<p></p>",
            seq : this.props.seq,
            userid : localStorage.getItem("userid"),
            modify : false,
            targetid : "",
            replyOwner : "",
            reply_content : "",
            reply_content2 : "",
            isModify : false,
            id : "",
            reputation: 0
        });
        this.delete = this.delete.bind(this);
        this.getList = this.getList.bind(this);
        this.insert = this.insert.bind(this);
        this.onChangeCk = this.onChangeCk.bind(this);
        this.getReplyListOne = this.getReplyListOne.bind(this);
        this.modifyReplyOk = this.modifyReplyOk.bind(this);
        this.onClickModifyCancel = this.onClickModifyCancel.bind(this);
        this.onChangeCkeditor = this.onChangeCkeditor.bind(this);
    }
     componentDidMount(){
         if(this.state.seq !== ""){
         this.getList();
         let userid = localStorage.getItem("userid");
         if(userid !== "" &&userid!==null && userid!==undefined){

         
         axios.get(backUrl+"/user/getreputation",{
             params : {
                 userid : Number(localStorage.getItem("userid"))
             }
         }).then((res)=>{
             this.setState({
                reputation : res.data.reputation
             })
         })
        }
         }else {
             return
         }
    }

    async getReplyListOne(e){
        await axios.get(backUrl, {
            params : {
              id : e.target.id
            }
        }).then((response)=>{
            this.setState({
            replyOwner : response.data.userid,
            reply_content2 : response.data.reply_content,
            id : response.data.id,
            targetid : response.data.id,
            isModify : true
          })
        })
    }

    async modifyReplyOk(e){

        let Forms = new FormData();
        Forms.append("id",e.target.id);
        Forms.append("reply_content",this.state.reply_content2);
       await axios({
            method :'put',
            baseURL : backUrl,
            data : Forms
        }).then((response)=>{
            this.setState({
                isModify : false,
                reply_content : this.state.reply_content2
                });
       }).catch((xhr)=>{
            swal({
                title: "등록 실패",
                text: "답글 양식에 맞지 않습니다.",
                icon: "/static/image/Logo2.png",
            });
     });
        this.getList();
      }
    async getList(){
        await axios.get(backUrl,{
            params : {
               seq: this.state.seq
            }
        }).then((response) => {
            this.setState({
                replys : response.data
           });
        }).catch(xhr =>{
            alert(xhr);
        })
      }
      async delete(e){
          let id = e.target.id;
        const willDelete = await swal({
            title: "삭제 하시겠습니까?",
            text: "해당 답변을 삭제하시겠습니까?"
          });

    if(willDelete){
        axios.get(backUrl,{
           params : {
             id : id
           }
         }).then(()=> {
            swal({
                title: "삭제 완료",
                text: "능력치가 -5 떨어졌습니다",
                icon: "/static/image/Logo2.png",
            });
           this.getList();
         })
        }
      } 

      
      onChangeCk(e){
          this.setState({
              data : e.editor.getData()
          })
        }

      onClickModifyCancel(){
        this.setState({
            isModify : false
        })
      }

      onChangeCkeditor(e){
          this.setState({
        reply_content2 : e.editor.getData()
        
    })
      }


      insert=()=> {
    
          if(this.state.data !== "" && this.state.data.trim().replace(/[&nbsp;]|[\s]/gi,"") !== "<></>"){       
                if(Number(this.state.reputation) >= 20){
                    const userid = localStorage.getItem('userid');
                    let Forms = new FormData();
                    Forms.append("userid",userid);
                    Forms.append("seq",this.state.seq);
                    Forms.append("reply_content",this.state.data);
                    axios({
                        method :'post',
                        baseURL : backUrl,
                        data : Forms
                    }).then(()=>{
                        this.setState({
                            reply : this.state.reply,
                            data : "<p></p>"
                        })
                        swal({
                            title: "등록 성공",
                            text: "능력치가 +5 올랐습니다.",
                            icon: "/static/image/Logo2.png",
                        });
                        this.getList();
                   }).catch((xhr)=>{
                     console.log(xhr);
                 });
            }else{
                swal({
                    title:"작성 실패",
                    text:"능력치 [20] 부터 작성이 가능합니다.",
                    icon:"/static/image/Logo2.png"
                })
            }

    }else{
        swal({
            title:"작성 실패",
            text:"빈칸은 입력이 불가능합니다.",
            icon:"/static/image/Logo2.png"
        })
        return;
    }
}  
    render() {
        let reply =this.state.replys;
        return(
            <>
            <Row>
                <Col xs={12}>
                    <small style={{paddingLeft:"10px", color:"#b5a5b5", marginBottom:"5px"}}>답글 ({reply.length})</small>
                    {reply.length > 0 ? 
                        reply.map((reply, index) => {
                        return (
                        <ReplyCompleteComponent userid={reply.userid}
                                                        onclick={this.delete}
                                                        seq={this.props.seq}
                                                        id={reply.id}
                                                        user_image={reply.user_image} 
                                                        nick_name={reply.nick_name} 
                                                        date_created={reply.date_created}
                                                        reply_content={reply.reply_content} key={index}
                                                        reply_content2={this.state.reply_content2}
                                                        vote_count = {reply.vote_count}
                                                        modify={this.state.modify}
                                                        getReplyListOne = {this.getReplyListOne}
                                                        modifyReplyOk = {this.modifyReplyOk}
                                                        isModify = {this.state.isModify}
                                                        targetid = {this.state.targetid}
                                                        onClickModifyCancel = {this.onClickModifyCancel}
                                                        onChangeCkeditor = {this.onChangeCkeditor}
                                                        />
                        )
                    })
                    : <div style={{textAlign:"center"}}>
                         <small>등록된 답변이 없습니다.</small>
                         <br/>
                         <br/>
                      </div>
                        }

                    <br/>
                         <br/>
                         {this.state.userid != undefined && this.state.userid != "" && this.state.userid != 0? 

                <CkeditorOne2 data={this.state.data} onChange={this.onChangeCk} list={this.props.list}/>
                        :
                        <h6></h6>
                    }
                    
                </Col>

                
                <Col xs={12} style={buttoncss}>
                <br></br>
                <br></br>
                <ButtonComponent onclick={() => Router.push('/question/board')} name="목록" />
                &nbsp;&nbsp;
                 {this.state.userid != undefined && this.state.userid != "" && this.state.userid != 0  ? 
                <ButtonComponent onclick={this.insert} name="답변 제출" />
                
                :
                <h6></h6>
               
            }   
                </Col>
            </Row>
            </>
        )
    }
};

export default ReplyComplete;